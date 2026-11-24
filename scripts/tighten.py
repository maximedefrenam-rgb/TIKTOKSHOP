"""Resserre une prise de voix sans la régénérer (0 crédit) :
raccourcit les silences trop longs puis accélère légèrement (hauteur conservée), en recalculant les timings.

  python3 scripts/tighten.py --video <nom> --take 1 [--max-gap 0.10] [--tempo 1.18]
  → remplace voix-prise<n>.mp3 / timings-prise<n>.json (originaux gardés en *-brut.*)
"""
import argparse
import json
import shutil
import subprocess
from pathlib import Path

import numpy as np
from scipy.io import wavfile

SR = 44100
ROOT = Path(__file__).resolve().parent.parent

ap = argparse.ArgumentParser()
ap.add_argument("--video", required=True)
ap.add_argument("--take", default="1")
ap.add_argument("--max-gap", type=float, default=0.10)
ap.add_argument("--tempo", type=float, default=1.18)
a = ap.parse_args()

d = ROOT / "public" / "videos" / a.video
mp3, tj = d / f"voix-prise{a.take}.mp3", d / f"timings-prise{a.take}.json"
raw_mp3, raw_tj = d / f"voix-prise{a.take}-brut.mp3", d / f"timings-prise{a.take}-brut.json"
if not raw_mp3.exists():
    shutil.copy(mp3, raw_mp3)
    shutil.copy(tj, raw_tj)

tmp = d / "_tmp.wav"
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(raw_mp3), "-ac", "1", "-ar", str(SR), str(tmp)], check=True)
_, x = wavfile.read(tmp)
x = x.astype(np.float32) / 32768
T = json.loads(raw_tj.read_text())
words = T["words"]

# énergie par fenêtres de 10 ms pour ne couper que du vrai silence
win = int(0.01 * SR)
rms = np.sqrt(np.convolve(x ** 2, np.ones(win) / win, mode="same"))

cuts = []  # (début, fin) en secondes à retirer
# On ne raccourcit que les plages réellement silencieuses (les rires, souffles, « gasps » sont conservés).
thr = 0.012
quiet = rms < thr
# entre deux mots, les respirations (niveau faible) sont aussi raccourcies
breath_thr = 0.045
for k in range(len(words) - 1):
    g0, g1 = int((words[k]["end"] + 0.03) * SR), int((words[k + 1]["start"] - 0.03) * SR)
    if g1 > g0:
        quiet[g0:g1] |= rms[g0:g1] < breath_thr
i, n = 0, len(quiet)
first_word = words[0]["start"]
while i < n:
    if not quiet[i]:
        i += 1
        continue
    j = i
    while j < n and quiet[j]:
        j += 1
    t0, t1 = i / SR, j / SR
    keep = 0.05 if t1 <= first_word else a.max_gap
    # ne jamais couper à l'intérieur d'un mot
    inside = any(w["start"] + 0.03 < t1 and w["end"] - 0.03 > t0 and (t1 - t0) < (w["end"] - w["start"]) for w in words)
    if not inside and (t1 - t0) > keep + 0.03:
        c0 = t0 + keep / 2
        cuts.append((c0, c0 + (t1 - t0) - keep))
    i = j

# reconstruction avec fondus de 8 ms
fade = int(0.008 * SR)
pieces, pos = [], 0
for c0, c1 in cuts:
    i0, i1 = int(c0 * SR), int(c1 * SR)
    seg = x[pos:i0].copy()
    if len(seg) > fade:
        seg[-fade:] *= np.linspace(1, 0, fade)
    pieces.append(seg)
    pos = i1
    nxt = x[pos:pos + fade]
    x[pos:pos + len(nxt)] = nxt * np.linspace(0, 1, len(nxt))
pieces.append(x[pos:])
y = np.concatenate(pieces)


def remap(t):
    shift = sum(min(c1, t) - c0 for c0, c1 in cuts if t > c0)
    return (t - shift) / a.tempo


new_words = [{"word": w["word"], "start": round(remap(w["start"]), 3), "end": round(remap(w["end"]), 3)} for w in words]
wavfile.write(tmp, SR, (np.clip(y, -1, 1) * 32767).astype(np.int16))
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(tmp), "-filter:a", f"atempo={a.tempo}",
                "-c:a", "libmp3lame", "-b:a", "160k", str(mp3)], check=True)
tmp.unlink()
dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(mp3)]))
tj.write_text(json.dumps({"words": new_words, "durationSec": round(dur, 3), "model": T.get("model"),
                          "tightened": {"maxGap": a.max_gap, "tempo": a.tempo, "cuts": len(cuts)}}, ensure_ascii=False, indent=1))
print(f"prise {a.take} : {T['durationSec']:.1f}s → {dur:.1f}s ({len(cuts)} silences raccourcis, tempo ×{a.tempo})")
