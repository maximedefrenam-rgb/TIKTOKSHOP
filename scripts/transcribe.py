"""Secours si l'endpoint « with timestamps » ne renvoie rien : faster-whisper (small, fr).
   pip install faster-whisper
   python3 scripts/transcribe.py --video <nom> --take <n>
"""
import argparse, json, subprocess
from pathlib import Path
from faster_whisper import WhisperModel

ap = argparse.ArgumentParser(); ap.add_argument("--video", required=True); ap.add_argument("--take", default="1")
a = ap.parse_args()
d = Path(__file__).resolve().parent.parent / "public" / "videos" / a.video
mp3 = d / f"voix-prise{a.take}.mp3"
segs, _ = WhisperModel("small", compute_type="int8").transcribe(str(mp3), language="fr", word_timestamps=True)
words = [{"word": w.word.strip().strip(".,!?…«»"), "start": round(w.start, 3), "end": round(w.end, 3)} for s in segs for w in s.words]
dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(mp3)]))
(d / f"timings-prise{a.take}.json").write_text(json.dumps({"words": words, "durationSec": round(dur, 3), "source": "whisper"}, ensure_ascii=False, indent=1))
print(f"{len(words)} mots, {dur:.2f}s")
