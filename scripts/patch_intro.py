"""Remplace le début d'une voix validée par un court extrait régénéré (ex. un mot mal prononcé), sans régénérer le reste.

  1. Générer l'extrait : mettre le texte dans videos/<patch>/voix.txt puis
     npm run tts -- --video <patch> --take 1 && python3 scripts/tighten.py --video <patch> --take 1
  2. python3 scripts/patch_intro.py --video <nom> --patch <patch> --until-word <mot> [--nth 1]
     → l'extrait remplace tout ce qui précède <mot> dans public/videos/<nom>/voice.mp3 ; timings.json recalculé.
     Sauvegardes : voice-avant-patch.mp3 / timings-avant-patch.json.
"""
import argparse
import json
import re
import shutil
import subprocess
import unicodedata
from pathlib import Path

import numpy as np
from scipy.io import wavfile

SR = 44100
ROOT = Path(__file__).resolve().parent.parent


def norm(s):
    return re.sub(r"[^a-z0-9']", "", unicodedata.normalize("NFD", s.lower()).encode("ascii", "ignore").decode())


def load(mp3):
    tmp = mp3.with_suffix(".tmp.wav")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(mp3), "-ac", "1", "-ar", str(SR), str(tmp)], check=True)
    _, x = wavfile.read(tmp)
    tmp.unlink()
    return x.astype(np.float32) / 32768


ap = argparse.ArgumentParser()
ap.add_argument("--video", required=True)
ap.add_argument("--patch", required=True)
ap.add_argument("--until-word", required=True)
ap.add_argument("--nth", type=int, default=1)
a = ap.parse_args()

vd = ROOT / "public" / "videos" / a.video
pd = ROOT / "public" / "videos" / a.patch
if not (vd / "voice-avant-patch.mp3").exists():
    shutil.copy(vd / "voice.mp3", vd / "voice-avant-patch.mp3")
    shutil.copy(vd / "timings.json", vd / "timings-avant-patch.json")

voice = load(vd / "voice-avant-patch.mp3")
T = json.loads((vd / "timings-avant-patch.json").read_text())
patch = load(pd / "voix-prise1.mp3")
P = json.loads((pd / "timings-prise1.json").read_text())

q = norm(a.until_word)
hits = [i for i, w in enumerate(T["words"]) if norm(w["word"]) == q]
k = hits[a.nth - 1]
cut = T["words"][k]["start"] - 0.03

p0 = max(0.0, P["words"][0]["start"] - 0.04)
p1 = P["words"][-1]["end"] + 0.05
seg = patch[int(p0 * SR): int(p1 * SR)]
rest = voice[int(cut * SR):]
fade = int(0.01 * SR)
seg[-fade:] *= np.linspace(1, 0, fade)
rest[:fade] *= np.linspace(0, 1, fade)
lead = np.zeros(int(0.08 * SR), dtype=np.float32)
y = np.concatenate([lead, seg, rest])

off_patch = len(lead) / SR - p0
off_rest = (len(lead) + len(seg)) / SR - cut
words = [{"word": w["word"], "start": round(w["start"] + off_patch, 3), "end": round(w["end"] + off_patch, 3)} for w in P["words"]]
words += [{"word": w["word"], "start": round(w["start"] + off_rest, 3), "end": round(w["end"] + off_rest, 3)} for w in T["words"][k:]]

tmp = vd / "_patch.wav"
wavfile.write(tmp, SR, (np.clip(y, -1, 1) * 32767).astype(np.int16))
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(tmp), "-c:a", "libmp3lame", "-b:a", "160k", str(vd / "voice.mp3")], check=True)
tmp.unlink()
dur = round(len(y) / SR, 3)
(vd / "timings.json").write_text(json.dumps({"words": words, "durationSec": dur, "patched": a.patch}, ensure_ascii=False, indent=1))
print(f"{a.video} : début remplacé jusqu'à « {T['words'][k]['word']} » → {dur}s ; premiers mots :",
      " ".join(f"{w['word']}@{w['start']}" for w in words[:6]))
