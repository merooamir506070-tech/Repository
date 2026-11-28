# يركّب مشاهد الـ3D (build/video3d.mp4) جوه فيديو السكتش (build/video.mp4) → build/video_mix.mp4
import json, re, subprocess
SCENES = (2, 4, 5, 10, 17)   # المشاهد اللي بتبقى 3D
t = json.loads(re.search(r'=\s*(\{.*\})', open('build/timing.js').read(), re.S).group(1)); L = t['lines']
st = lambda i: 0 if i == 0 else (L[i]['start'] if i < len(L) else t['duration'] + 1.5)
en = "+".join(f"between(t,{st(i):.3f},{st(i+1)-0.001:.3f})" for i in SCENES)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'build/video.mp4', '-i', 'build/video3d.mp4', '-filter_complex', f"[0:v][1:v]overlay=0:0:enable='{en}'[v]", '-map', '[v]', '-map', '0:a',
                '-c:v', 'libx264', '-crf', '19', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-c:a', 'copy', 'build/video_mix.mp4'], check=True)
