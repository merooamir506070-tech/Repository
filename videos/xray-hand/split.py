# يقسم تسجيلات الأجزاء الخمسة لملف لكل سطر في voice/. الحدود متحددة بالسكتات (silencedetect + منحنى العلو).
import subprocess
CUTS = {  # الجزء: [(بداية، نهاية) لكل سطر] بالثواني
 1: [(0.00, 4.02), (4.43, 5.90), (6.22, 10.29), (10.63, 14.35), (14.52, 17.07)],
 2: [(0.00, 3.07), (3.57, 8.97), (9.36, 12.04)],
 3: [(0.00, 2.73), (3.13, 6.14), (6.44, 9.88), (10.23, 14.83), (15.52, 19.46)],
 4: [(0.00, 2.58), (2.89, 7.25), (7.72, 11.66)],
 5: [(0.00, 2.81), (3.15, 8.24), (8.66, 12.68)],
}
lines = [l.strip() for l in open('script.txt', encoding='utf-8') if l.strip()]
n = 0
for p, segs in CUTS.items():
    for a, b in segs:
        w = len(lines[n].split())
        print(f'p{p} L{n:2d} {a:6.2f}-{b:6.2f} {b-a:5.2f}s {w:2d}w {w/(b-a):4.1f}w/s  {lines[n][:40]}')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'parts/p{p}.wav', '-ss', f'{max(0, a-0.05):.3f}', '-to', f'{b+0.08:.3f}', '-c:a', 'pcm_s16le', f'voice/{n+1:02d}.wav'], check=True)
        n += 1
assert n == len(lines), (n, len(lines))
