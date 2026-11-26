"""يحسب وقت بداية كل كلمة من الصوت نفسه (بيتخطى السكتات) ويكتب build/words.js.
شغّله بعد video.py timing:  python3 words.py"""
import json, re, wave, os, numpy as np
D = os.path.dirname(os.path.abspath(__file__)); B = os.path.join(D, "build")
T = json.loads(open(os.path.join(B, "timing.js"), encoding="utf-8").read().split("=", 1)[1].rstrip().rstrip(";"))
w = wave.open(os.path.join(B, "voice.wav")); sr = w.getframerate(); ch = w.getnchannels()
a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32)
if ch > 1: a = a.reshape(-1, ch).mean(1)
HOP = int(sr * 0.01); out = []
for l in T["lines"]:
    seg = a[int(l["start"] * sr):int(l["end"] * sr)]
    n = max(1, len(seg) // HOP); rms = np.sqrt((seg[:n * HOP].reshape(n, HOP) ** 2).mean(1) + 1e-9)
    on = rms > 0.12 * np.percentile(rms, 95)
    # سكتة أقل من 120ms تتحسب كلام
    i = 0
    while i < n:
        if not on[i]:
            j = i
            while j < n and not on[j]: j += 1
            if j - i < 12 and i > 0 and j < n: on[i:j] = True
            i = j
        else: i += 1
    cum = np.concatenate([[0], np.cumsum(on)]); tot_v = max(1, cum[-1])
    words = l["text"].split(); wt = [len(re.sub(r"[^\w]", "", x)) + 1 for x in words]; tot = sum(wt); acc = 0; st = []
    for x in wt:
        target = acc / tot * tot_v; k = int(np.searchsorted(cum, target, side="right")) - 1
        # أول فريم فيه كلام بعد النقطة دي
        while k < n and not on[min(k, n - 1)]: k += 1
        st.append(round(l["start"] + min(k, n) * 0.01, 3)); acc += x
    out.append(st)
open(os.path.join(B, "words.js"), "w").write("window.WORDS = " + json.dumps(out) + ";\n")
print("✓ build/words.js:", sum(len(x) for x in out), "كلمة")
