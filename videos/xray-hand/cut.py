# يقطع build/video.mp4 لمقطع لكل سطر (من بداية السطر لبداية اللي بعده) في build/clips/
import json, re, subprocess, os
t = json.loads(re.search(r'=\s*(\{.*\})', open('build/timing.js', encoding='utf-8').read(), re.S).group(1))
L, dur = t['lines'], t['duration']; os.makedirs('build/clips', exist_ok=True)
PARTS = [5, 3, 5, 3, 3]; part = [p for p, c in enumerate(PARTS, 1) for _ in range(c)]
for i, l in enumerate(L):
    a = 0 if i == 0 else l['start'] - 0.02; b = L[i + 1]['start'] - 0.02 if i + 1 < len(L) else dur + 1.5
    out = f'build/clips/p{part[i]}_scene{i:02d}.mp4'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{a:.3f}', '-to', f'{b:.3f}', '-i', 'build/video.mp4', '-c:v', 'libx264', '-crf', '20', '-preset', 'veryfast', '-c:a', 'aac', '-b:a', '160k', out], check=True)
    print(out, f'{b - a:.1f}s')
