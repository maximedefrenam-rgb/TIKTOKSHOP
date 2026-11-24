"""Musique électro énergique générée par code, une nouvelle par vidéo.

Usage :
  python3 scripts/gen_music.py --video <nom> [--seed N] [--bpm 124] [--key A] [--mode minor]

- Durée = durée de la vidéo (lue dans public/videos/<nom>/timings.json : durationSec + 0.5 s),
  ou forcée avec --duration.
- BPM, tonalité, mode, progression, motif de basse / charleston / accords tirés du seed
  (par défaut : seed dérivé du nom de la vidéo) pour que chaque vidéo sonne différemment.
- Sortie : public/videos/<nom>/music.wav (44,1 kHz, stéréo, fondu final de 1,5 s).
"""
import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

SR = 44100
ROOT = Path(__file__).resolve().parent.parent
NOTES = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5, "F#": 6, "G": 7, "G#": 8, "A": 9, "A#": 10, "B": 11}

PROGRESSIONS = {
    "minor": [[0, 8, 3, 10], [0, 5, 8, 7], [0, 10, 8, 10], [0, 3, 10, 8], [0, 8, 5, 7]],
    "major": [[0, 7, 9, 5], [9, 5, 0, 7], [0, 5, 9, 7], [0, 9, 5, 7]],
}
# qualité d'accord (tierce) selon le degré, en semitons depuis la tonique
MINOR_THIRD = {0: 3, 3: 4, 5: 3, 7: 4, 8: 4, 10: 4}
MAJOR_THIRD = {0: 4, 2: 3, 4: 3, 5: 4, 7: 4, 9: 3}


def midi_hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def lp(x, f, order=2):
    return sosfilt(butter(order, f, btype="lowpass", fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, btype="highpass", fs=SR, output="sos"), x)


def bp(x, lo, hi):
    return sosfilt(butter(2, [lo, hi], btype="bandpass", fs=SR, output="sos"), x)


def saw(freq, n, detune=0.0, phase=0.0):
    tt = np.arange(n) / SR
    return 2 * ((tt * freq * (1 + detune) + phase) % 1.0) - 1


def place(track, sample, pos, gain=1.0):
    i = int(pos * SR)
    if i >= len(track):
        return
    j = min(len(track), i + len(sample))
    track[i:j] += sample[: j - i] * gain


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", required=True)
    ap.add_argument("--seed", type=int)
    ap.add_argument("--bpm", type=float)
    ap.add_argument("--key")
    ap.add_argument("--mode", choices=["minor", "major"])
    ap.add_argument("--duration", type=float)
    args = ap.parse_args()

    seed = args.seed if args.seed is not None else int(hashlib.md5(args.video.encode()).hexdigest()[:8], 16)
    rng = np.random.default_rng(seed)

    vdir = ROOT / "public" / "videos" / args.video
    if args.duration:
        duration = args.duration
    else:
        timings = json.loads((vdir / "timings.json").read_text())
        duration = timings["durationSec"] + 0.5

    bpm = args.bpm or float(rng.choice([120, 122, 124, 125, 126, 128, 130]))
    key = args.key or str(rng.choice(list(NOTES)))
    mode = args.mode or ("minor" if rng.random() < 0.7 else "major")
    prog = PROGRESSIONS[mode][rng.integers(len(PROGRESSIONS[mode]))]
    bass_pattern = int(rng.integers(3))   # 0 offbeat 8th, 1 rolling 16th, 2 syncopé
    hat_pattern = int(rng.integers(3))    # 0 offbeat, 1 16th, 2 offbeat + open hat
    chord_pattern = int(rng.integers(3))  # 0 stabs, 1 pad pompé, 2 stabs syncopés
    swing = float(rng.choice([0.0, 0.0, 0.08]))

    beat = 60.0 / bpm
    n = int(duration * SR)
    tonic = 36 + NOTES[key]  # octave basse
    print(f"seed={seed} bpm={bpm} tonalité={key} {mode} prog={prog} "
          f"basse={bass_pattern} charley={hat_pattern} accords={chord_pattern} swing={swing}")

    kick = np.zeros(n); clap = np.zeros(n); hats = np.zeros(n)
    bass = np.zeros(n); chords_l = np.zeros(n); chords_r = np.zeros(n)

    # --- échantillons ---
    kt = np.arange(int(0.35 * SR)) / SR
    kf = 45 + 110 * np.exp(-kt * 35)
    k_s = np.sin(2 * np.pi * np.cumsum(kf) / SR) * np.exp(-kt * 9)
    k_s += np.exp(-kt * 300) * 0.3 * rng.standard_normal(len(kt))
    k_s = np.tanh(k_s * 1.6)

    ct = np.arange(int(0.25 * SR)) / SR
    noise = rng.standard_normal(len(ct))
    env = np.zeros_like(ct)
    for off in (0.0, 0.011, 0.022):
        env += (ct >= off) * np.exp(-np.clip(ct - off, 0, None) * (90 if off < 0.02 else 18))
    c_s = bp(noise * env, 900, 3000)

    ht = np.arange(int(0.06 * SR)) / SR
    h_s = hp(rng.standard_normal(len(ht)), 7000, 4) * np.exp(-ht * 90)
    ot = np.arange(int(0.25 * SR)) / SR
    o_s = hp(rng.standard_normal(len(ot)), 6000, 4) * np.exp(-ot * 14)

    total_beats = int(np.ceil(duration / beat)) + 1
    for b in range(total_beats):
        tb = b * beat
        place(kick, k_s, tb)
        if b % 4 in (1, 3):
            place(clap, c_s, tb, 0.8)
        # charleston
        off = tb + beat / 2 + swing * beat / 2
        if hat_pattern == 0:
            place(hats, h_s, off, 0.7)
        elif hat_pattern == 1:
            for s in range(4):
                place(hats, h_s, tb + s * beat / 4 + (swing * beat / 4 if s % 2 else 0),
                      [0.35, 0.25, 0.7, 0.25][s])
        else:
            place(hats, o_s if b % 2 else h_s, off, 0.55)
            place(hats, h_s, tb + 3 * beat / 4, 0.3)

    # --- basse & accords ---
    bar = 4 * beat
    third_map = MINOR_THIRD if mode == "minor" else MAJOR_THIRD
    for bi in range(int(np.ceil(duration / bar)) + 1):
        deg = prog[bi % len(prog)]
        root = tonic + deg
        t0 = bi * bar
        # basse
        if bass_pattern == 0:
            hits = [(b + 0.5, 0.45) for b in range(4)]
        elif bass_pattern == 1:
            hits = [(b + s / 4, 0.2) for b in range(4) for s in (1, 2, 3)]
        else:
            hits = [(0.5, 0.4), (1.5, 0.3), (1.75, 0.2), (2.5, 0.4), (3.25, 0.2), (3.5, 0.4)]
        for pos, length in hits:
            ln = int(length * beat * SR)
            tt = np.arange(ln) / SR
            f = midi_hz(root)
            s = saw(f, ln) * 0.6 + np.sin(2 * np.pi * f * tt) * 0.7
            s *= np.minimum(1, tt * 400) * np.exp(-tt * 6)
            place(bass, s, t0 + pos * beat)
        # accords (tonique, tierce, quinte, une octave au-dessus de la basse + 1)
        third = third_map.get(deg % 12, 3 if mode == "minor" else 4)
        notes = [root + 24, root + 24 + third, root + 24 + 7]
        if chord_pattern == 1:
            stabs = [(0, 4.0)]
        elif chord_pattern == 0:
            stabs = [(0, 0.5), (1.5, 0.5), (3.0, 0.5)]
        else:
            stabs = [(0.5, 0.4), (1.25, 0.4), (2.5, 0.4), (3.5, 0.4)]
        for pos, length in stabs:
            ln = int(length * beat * SR)
            tt = np.arange(ln) / SR
            l = sum(saw(midi_hz(m), ln, -0.004, 0.1 * i) for i, m in enumerate(notes))
            r = sum(saw(midi_hz(m), ln, 0.004, 0.3 * i) for i, m in enumerate(notes))
            env = np.minimum(1, tt * 200) * (np.exp(-tt * 1.2) if chord_pattern == 1 else np.exp(-tt * 7))
            env *= np.minimum(1, (ln - np.arange(ln)) / (0.01 * SR))
            place(chords_l, l * env, t0 + pos * beat)
            place(chords_r, r * env, t0 + pos * beat)

    bass = lp(bass, 380)
    chords_l = lp(chords_l, 2200); chords_r = lp(chords_r, 2200)

    # sidechain sur basse + accords
    tt = np.arange(n) / SR
    phase = (tt % beat) / beat
    pump = 0.25 + 0.75 * np.clip(phase / 0.45, 0, 1) ** 0.7

    def m(x, g):
        return x / (np.max(np.abs(x)) or 1) * g

    L = m(kick, 0.9) + m(clap, 0.35) + m(hats, 0.18) * 0.8 + m(bass, 0.55) * pump + m(chords_l, 0.22) * pump
    R = m(kick, 0.9) + m(clap, 0.35) + m(hats, 0.18) * 1.0 + m(bass, 0.55) * pump + m(chords_r, 0.22) * pump
    mix = np.stack([L, R], axis=1)
    mix = np.tanh(mix * 1.2)

    fade_len = int(min(1.5, duration / 4) * SR)
    mix[-fade_len:] *= np.linspace(1, 0, fade_len)[:, None] ** 1.5
    mix[: int(0.005 * SR)] *= np.linspace(0, 1, int(0.005 * SR))[:, None]
    mix = mix / np.max(np.abs(mix)) * 0.89

    vdir.mkdir(parents=True, exist_ok=True)
    out = vdir / "music.wav"
    wavfile.write(out, SR, (mix * 32767).astype(np.int16))
    print(f"-> {out.relative_to(ROOT)} ({duration:.2f}s)")


if __name__ == "__main__":
    main()
