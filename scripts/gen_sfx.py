"""Bibliothèque d'effets sonores du compte, générée par code (numpy + scipy).

Usage : python3 scripts/gen_sfx.py   ->  public/sfx/{whoosh,impact,pop,tick,ding,riser}.wav
À lancer une seule fois : les fichiers sont réutilisés sur toutes les vidéos.
"""
from pathlib import Path

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

SR = 44100
OUT = Path(__file__).resolve().parent.parent / "public" / "sfx"
rng = np.random.default_rng(7)


def t(dur):
    return np.arange(int(SR * dur)) / SR


def filt(x, kind, f):
    sos = butter(4, f, btype=kind, fs=SR, output="sos")
    return sosfilt(sos, x)


def norm(x, peak=0.9):
    m = np.max(np.abs(x)) or 1.0
    return x / m * peak


def fade(x, fin=0.003, fout=0.01):
    n_in, n_out = int(SR * fin), int(SR * fout)
    env = np.ones_like(x)
    if n_in:
        env[:n_in] = np.linspace(0, 1, n_in)
    if n_out:
        env[-n_out:] = np.linspace(1, 0, n_out)
    return x * env


def stereo(l, r=None):
    r = l if r is None else r
    return np.stack([l, r], axis=1)


def save(name, x):
    OUT.mkdir(parents=True, exist_ok=True)
    data = (np.clip(x, -1, 1) * 32767).astype(np.int16)
    wavfile.write(OUT / f"{name}.wav", SR, data)
    print(f"  {name}.wav  {len(x) / SR:.2f}s")


def whoosh():
    dur = 0.45
    tt = t(dur)
    n = rng.standard_normal(len(tt))
    # bande passante qui balaie de 300 Hz à 5 kHz puis redescend (filtre par blocs)
    out = np.zeros_like(n)
    block = 512
    for i in range(0, len(n), block):
        p = i / len(n)
        fc = 300 + 4700 * np.sin(np.pi * p) ** 1.5
        seg = n[max(0, i - 2048): i + block]
        y = filt(seg, "bandpass", [fc * 0.6, min(fc * 1.6, 20000)])
        out[i: i + block] = y[-len(n[i: i + block]):]
    env = np.sin(np.pi * np.clip(tt / dur, 0, 1)) ** 2
    x = norm(out * env)
    pan = np.linspace(-0.6, 0.6, len(x))
    return stereo(x * (1 - pan) / 1.6, x * (1 + pan) / 1.6)


def impact():
    dur = 1.1
    tt = t(dur)
    f = 40 + 110 * np.exp(-tt * 18)
    phase = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(phase) * np.exp(-tt * 3.2)
    click = filt(rng.standard_normal(len(tt)), "lowpass", 2500) * np.exp(-tt * 60) * 0.6
    sub = np.sin(2 * np.pi * 35 * tt) * np.exp(-tt * 2.5) * 0.4
    x = np.tanh((body + click + sub) * 1.8)
    return stereo(norm(fade(x, 0.001, 0.08)))


def pop():
    dur = 0.12
    tt = t(dur)
    f = 900 * np.exp(-tt * 25) + 350
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 45)
    return stereo(norm(fade(x, 0.0005, 0.01)))


def tick():
    dur = 0.05
    tt = t(dur)
    x = filt(rng.standard_normal(len(tt)), "bandpass", [2500, 7000]) * np.exp(-tt * 180)
    x += np.sin(2 * np.pi * 3200 * tt) * np.exp(-tt * 200) * 0.5
    return stereo(norm(fade(x, 0.0002, 0.005)))


def ding():
    # caisse enregistreuse : clic mécanique + tiroir + cloche à deux notes
    dur = 1.4
    tt = t(dur)
    x = np.zeros_like(tt)
    clk = filt(rng.standard_normal(len(tt)), "bandpass", [1500, 6000]) * np.exp(-tt * 120) * 0.5
    x += clk
    drawer_t = tt - 0.05
    drawer = filt(rng.standard_normal(len(tt)), "bandpass", [400, 1800]) * np.exp(-np.clip(drawer_t, 0, None) * 25) * (drawer_t > 0) * 0.25
    x += drawer

    def bell(f0, start, amp):
        tb = np.clip(tt - start, 0, None)
        on = tt >= start
        partials = [(1, 1), (2.76, 0.45), (5.4, 0.25), (8.93, 0.12)]
        s = sum(a * np.sin(2 * np.pi * f0 * r * tb) * np.exp(-tb * (2.2 + r)) for r, a in partials)
        return s * on * amp

    x += bell(1568, 0.08, 0.8)   # G6
    x += bell(2093, 0.20, 0.9)   # C7
    return stereo(norm(fade(x, 0.0005, 0.1)))


def riser():
    dur = 1.6
    tt = t(dur)
    p = tt / dur
    f = 180 * (2 ** (p * 3.2))
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.5 * np.sin(2 * np.pi * np.cumsum(f * 1.5) / SR)
    noise = rng.standard_normal(len(tt))
    out = np.zeros_like(noise)
    block = 512
    for i in range(0, len(noise), block):
        fc = 400 + 9000 * (i / len(noise)) ** 2
        seg = noise[max(0, i - 2048): i + block]
        y = filt(seg, "bandpass", [fc * 0.7, min(fc * 1.4, 20000)])
        out[i: i + block] = y[-len(noise[i: i + block]):]
    env = p ** 2.2
    x = (tone * 0.35 + norm(out) * 0.8) * env
    x = fade(x, 0.01, 0.006)
    return stereo(norm(x), norm(np.roll(x, 90)))


if __name__ == "__main__":
    print(f"Génération des effets dans {OUT}")
    for name, fn in [("whoosh", whoosh), ("impact", impact), ("pop", pop),
                     ("tick", tick), ("ding", ding), ("riser", riser)]:
        save(name, fn())
