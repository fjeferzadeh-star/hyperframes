"""Synthesises the episode's sound effects that the bundled library lacks.

Writes assets/sfx/<name>.mp3. Deterministic (seeded noise). Run: python3 tools/sfx.py
"""
import os
import subprocess
import tempfile
import wave

import numpy as np

SR = 48000
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "sfx")
rng = np.random.default_rng(20261125)


def t_axis(d):
    return np.arange(int(SR * d)) / SR


def noise(d, color="white"):
    n = rng.standard_normal(int(SR * d))
    if color == "pink":
        f = np.fft.rfft(n)
        f /= np.sqrt(np.maximum(np.arange(len(f)), 1))
        n = np.fft.irfft(f, len(n))
    elif color == "brown":
        n = np.cumsum(n)
        n -= np.convolve(n, np.ones(4801) / 4801, mode="same")
    return n / (np.max(np.abs(n)) + 1e-9)


def lowpass(x, fc):
    f = np.fft.rfft(x)
    fr = np.fft.rfftfreq(len(x), 1 / SR)
    f *= 1 / np.sqrt(1 + (fr / fc) ** 4)
    return np.fft.irfft(f, len(x))


def bandpass(x, fc, q=2.0):
    f = np.fft.rfft(x)
    fr = np.fft.rfftfreq(len(x), 1 / SR)
    bw = fc / q
    f *= np.exp(-(((fr - fc) / bw) ** 2))
    return np.fft.irfft(f, len(x))


def env(d, a=0.005, r=0.2, hold=0.0):
    t = t_axis(d)
    e = np.minimum(1, t / max(a, 1e-4))
    e *= np.where(t > a + hold, np.exp(-(t - a - hold) / max(r, 1e-4)), 1)
    return e


def place(base, clip, at):
    i = int(at * SR)
    j = min(len(base), i + len(clip))
    base[i:j] += clip[: j - i]
    return base


def norm(x, peak=0.89):
    return x / (np.max(np.abs(x)) + 1e-9) * peak


def write(name, x, stereo_width=0.0):
    x = norm(x)
    left = x
    right = np.roll(x, int(stereo_width * SR)) if stereo_width else x
    pcm = (np.stack([left, right], 1) * 32767).astype("<i2")
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        path = tmp.name
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    dst = os.path.join(OUT, name + ".mp3")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", path, "-b:a", "96k", dst], check=True)
    os.remove(path)
    print("wrote", dst, f"{len(x) / SR:.2f}s")


os.makedirs(OUT, exist_ok=True)

# Birdsong: short rising chirps in two voices.
d = 3.2
x = np.zeros(int(SR * d))
for k, (start, base) in enumerate([(0.1, 3200), (0.45, 3900), (0.6, 3300), (1.2, 4200), (1.35, 3500), (2.0, 3800), (2.2, 4400), (2.6, 3300)]):
    cd = 0.09 + 0.03 * (k % 3)
    t = t_axis(cd)
    f = base + 2200 * t / cd
    chirp = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / cd) ** 2
    place(x, chirp * (0.6 + 0.4 * (k % 2)), start)
    place(x, chirp * 0.5, start + cd + 0.03)
write("birds", x, 0.004)

# Wind: brown noise, slow swells.
d = 14
t = t_axis(d)
x = lowpass(noise(d, "brown"), 520) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.17 * t) ** 2)
x[: SR] *= np.linspace(0, 1, SR)
x[-SR:] *= np.linspace(1, 0, SR)
write("wind", x, 0.01)

# Microphone tap: low thump plus a click.
d = 0.35
t = t_axis(d)
x = np.sin(2 * np.pi * 95 * t) * env(d, 0.002, 0.06) + 0.5 * bandpass(noise(d), 2500) * env(d, 0.001, 0.01)
write("mictap", x)

# Feedback squeal.
d = 0.95
t = t_axis(d)
f = 2500 + 450 * t
x = np.sin(2 * np.pi * np.cumsum(f) / SR) * (1 - np.exp(-t * 25)) * np.exp(-t * 1.2) * (1 + 0.25 * np.sin(2 * np.pi * 9 * t))
write("feedback", x * 0.7)

# A whole formation slamming heels together: many boot hits spread over ~70 ms.
d = 0.8
x = np.zeros(int(SR * d))
hit_d = 0.25
for k in range(14):
    h = lowpass(noise(hit_d), 1400 + 80 * k) * env(hit_d, 0.001, 0.045) + 0.8 * np.sin(2 * np.pi * (70 + 3 * k) * t_axis(hit_d)) * env(hit_d, 0.001, 0.07)
    place(x, h * (0.7 + 0.3 * rng.random()), 0.005 * k + 0.01 * rng.random())
write("stomp", x, 0.003)

# Crowd shout "SAĞ OL!": formant-filtered noise, two vowels.
d = 1.9
t = t_axis(d)
n = noise(d, "pink")
vowel_a = bandpass(n, 750, 2.5) + 0.7 * bandpass(n, 1250, 3) + 0.3 * bandpass(n, 2600, 4)
vowel_o = bandpass(n, 500, 2.5) + 0.6 * bandpass(n, 900, 3) + 0.2 * bandpass(n, 2400, 4)
mix = np.where(t < 0.55, vowel_a, vowel_o)
shape = np.minimum(1, t / 0.05) * np.where(t > 1.1, np.exp(-(t - 1.1) / 0.25), 1) * np.where((t > 0.5) & (t < 0.62), 0.55, 1)
x = mix * shape * (1 + 0.15 * np.sin(2 * np.pi * 11 * t)) + 0.4 * lowpass(n, 300) * shape
write("crowd", x, 0.012)

# Marching: boots on asphalt, two per second, slightly ragged.
d = 7
x = np.zeros(int(SR * d))
for k in range(14):
    h = lowpass(noise(0.2), 1100) * env(0.2, 0.001, 0.04) + 0.6 * np.sin(2 * np.pi * 80 * t_axis(0.2)) * env(0.2, 0.001, 0.05)
    place(x, h, 0.1 + k * 0.5 + 0.012 * rng.standard_normal())
    place(x, h * 0.5, 0.13 + k * 0.5 + 0.02 * rng.random())
write("march", x, 0.004)

# Footsteps indoors.
d = 2.8
x = np.zeros(int(SR * d))
for k in range(7):
    h = lowpass(noise(0.15), 900) * env(0.15, 0.001, 0.03) + 0.5 * np.sin(2 * np.pi * 110 * t_axis(0.15)) * env(0.15, 0.001, 0.04)
    place(x, h * (0.8 if k % 2 else 1), 0.05 + k * 0.4)
write("steps", x)

# Door: short creak then latch.
d = 0.9
t = t_axis(d)
creak = np.sin(2 * np.pi * np.cumsum(240 + 60 * np.sin(2 * np.pi * 23 * t) + 80 * t) / SR) * np.sin(np.pi * np.minimum(t / 0.55, 1)) * (t < 0.55)
latch = np.zeros_like(t)
place(latch, lowpass(noise(0.2), 2000) * env(0.2, 0.001, 0.03), 0.6)
write("door", 0.35 * creak + latch)

# Clock ticking.
d = 5
x = np.zeros(int(SR * d))
for k in range(5):
    tick = bandpass(noise(0.05), 3500, 3) * env(0.05, 0.0005, 0.008)
    place(x, tick * (1 if k % 2 == 0 else 0.7), 0.2 + k)
write("tick", x)

# Car engine, steady cruise.
d = 34
t = t_axis(d)
x = 0.7 * lowpass(noise(d, "brown"), 170) + 0.25 * np.sin(2 * np.pi * 46 * t) * (1 + 0.3 * np.sin(2 * np.pi * 7 * t)) + 0.1 * lowpass(noise(d), 900)
x[: SR] *= np.linspace(0, 1, SR)
x[-SR * 2 :] *= np.linspace(1, 0, SR * 2)
write("engine", x)

# Phone ringtone: two-tone trill, two bursts.
d = 1.8
t = t_axis(d)
tone = np.where((t * 12.5).astype(int) % 2 == 0, np.sin(2 * np.pi * 1318 * t), np.sin(2 * np.pi * 1568 * t))
gate = (((t % 0.9) < 0.6)).astype(float)
x = tone * gate * 0.6
write("ring", x)

# Call ended: three short beeps.
d = 0.75
t = t_axis(d)
x = np.sin(2 * np.pi * 480 * t) * ((t % 0.25) < 0.13)
write("hangup", x * 0.5)

# Punch smack.
d = 0.5
t = t_axis(d)
x = bandpass(noise(d), 1600, 1.2) * env(d, 0.0008, 0.03) + 1.1 * np.sin(2 * np.pi * np.cumsum(140 - 80 * t) / SR) * env(d, 0.001, 0.09)
write("smack", x)

# Crash into metal bins.
d = 1.6
t = t_axis(d)
metal = sum(np.sin(2 * np.pi * f * t + p) * np.exp(-t * dec) for f, p, dec in [(523, 0.1, 3.5), (1397, 1.3, 4.5), (2211, 2.1, 6), (3150, 0.7, 7), (871, 2.7, 4)])
x = 0.9 * lowpass(noise(d), 3000) * env(d, 0.001, 0.12) + 0.35 * metal + 0.6 * np.sin(2 * np.pi * 70 * t) * env(d, 0.001, 0.1)
write("crash", x, 0.006)

# Dizzy tweets (stars circling a knocked-out head).
d = 2.2
x = np.zeros(int(SR * d))
for k in range(6):
    cd = 0.12
    tt = t_axis(cd)
    f = 3000 + 1500 * np.sin(np.pi * tt / cd)
    place(x, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / cd), 0.1 + k * 0.33)
write("tweet", x * 0.6)

# Night city ambience: distant traffic hum.
d = 13
t = t_axis(d)
x = 0.8 * lowpass(noise(d, "pink"), 650) * (0.8 + 0.2 * np.sin(2 * np.pi * 0.11 * t))
x[: SR] *= np.linspace(0, 1, SR)
x[-SR:] *= np.linspace(1, 0, SR)
write("city", x, 0.01)
