"""يقسم ملفات الصوت الخمسة لـ21 جملة ويشيل السكتات.
لكل جزء: بنلاقي فترات الكلام، وبنختار السكتات اللي بين الجمل (أطول سكتات قريبة من المكان المتوقع حسب طول الجملة)،
وجوه الجملة الواحدة بنقصّر أي سكتة لـMAXIN ثانية. كل جملة بتتحفظ voice/NN.wav."""
import re, subprocess, sys, wave, os, json
D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PARTS = [3, 5, 4, 6, 3]
MAXIN = 0.16
lines = [l.strip() for l in open(os.path.join(D, "script.txt"), encoding="utf-8") if l.strip()]
SR = 48000
def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"], capture_output=True, check=True).stdout
    return raw
def segs(p):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", p, "-af", "silencedetect=noise=-38dB:d=0.12", "-f", "null", "-"], capture_output=True, text=True)
    st = [float(x) for x in re.findall(r"silence_start: (-?[\d.]+)", r.stderr)]
    en = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", r.stderr)]
    return st, en
report = []
li = 0
for pi, n in enumerate(PARTS):
    p = os.path.join(D, "raw", f"part{pi+1}.wav")
    raw = load(p); dur = len(raw) / 2 / SR
    st, en = segs(p)
    sil = list(zip(st, en + [dur] * (len(st) - len(en))))
    # فترات الكلام
    sp, cur = [], 0.0
    for a, b in sil:
        if a - cur > 0.05: sp.append([max(0, cur), a])
        cur = b
    if dur - cur > 0.05: sp.append([cur, dur])
    gaps = [(sp[i][1], sp[i + 1][0]) for i in range(len(sp) - 1)]
    speech_before = []; acc = 0
    for i in range(len(sp) - 1):
        acc += sp[i][1] - sp[i][0]; speech_before.append(acc)
    total = acc + sp[-1][1] - sp[-1][0]
    chars = [len(lines[li + k].replace(" ", "")) for k in range(n)]
    exp = []; c = 0
    for k in range(n - 1):
        c += chars[k]; exp.append(total * c / sum(chars))
    # DP: نختار n-1 سكتة بالترتيب
    G = len(gaps); NEG = -1e9
    def score(g, k): return (gaps[g][1] - gaps[g][0]) * 2.0 - abs(speech_before[g] - exp[k]) * 0.9
    best = [[NEG] * G for _ in range(n - 1)]; back = [[-1] * G for _ in range(n - 1)]
    for g in range(G): best[0][g] = score(g, 0)
    for k in range(1, n - 1):
        m, mi = NEG, -1
        for g in range(G):
            if g > 0 and best[k - 1][g - 1] > m: m, mi = best[k - 1][g - 1], g - 1
            if mi >= 0: best[k][g] = m + score(g, k); back[k][g] = mi
    g = max(range(G), key=lambda x: best[n - 2][x]); chosen = [g]
    for k in range(n - 2, 0, -1): g = back[k][g]; chosen.append(g)
    chosen = sorted(chosen)
    # نقسم فترات الكلام على الجمل
    bounds = [-1] + chosen + [len(sp) - 1]
    for k in range(n):
        pieces = sp[bounds[k] + 1: bounds[k + 1] + 1]
        out = b""; pad = 0.04
        for j, (a, b) in enumerate(pieces):
            a2 = max(0, a - pad); b2 = min(dur, b + pad)
            out += raw[int(a2 * SR) * 2: int(b2 * SR) * 2]
            if j < len(pieces) - 1:
                g = pieces[j + 1][0] - b
                out += b"\x00\x00" * int(min(MAXIN, max(0, g - 2 * pad)) * SR)
        fn = os.path.join(D, "voice", f"{li + 1:02d}.wav")
        with wave.open(fn, "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(out)
        report.append(f"part{pi+1} line{li:>2}  {pieces[0][0]:6.2f}-{pieces[-1][1]:6.2f}  -> {len(out)/2/SR:5.2f}s  | {lines[li][:45]}")
        li += 1
    report.append(f"   gaps chosen: " + ", ".join(f"{gaps[g][0]:.2f}({gaps[g][1]-gaps[g][0]:.2f}) exp@{e:.1f}/got@{speech_before[g]:.1f}" for g, e in zip(chosen, exp)))
print("\n".join(report))
