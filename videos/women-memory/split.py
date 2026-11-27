import re,subprocess,sys
counts=[4,5,5,5,6]; n=0
lines=[l.strip() for l in open('script.txt',encoding='utf-8') if l.strip()]
for p,c in enumerate(counts,1):
    f=f'parts/p{p}.wav'
    dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout)
    for ms in (0.35,0.28,0.22,0.16,0.12,0.08):
        r=subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af',f'silencedetect=noise=-35dB:d={ms}','-f','null','-'],capture_output=True,text=True).stderr
        st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',r)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',r)]
        segs=[];cur=0.0
        for i,s in enumerate(st):
            if s-cur>0.12: segs.append([cur,s])
            cur=en[i] if i<len(en) else dur
        if dur-cur>0.12: segs.append([cur,dur])
        if len(segs)>=c: break
    while len(segs)>c:
        k=min(range(len(segs)-1),key=lambda j:segs[j+1][0]-segs[j][1]); segs[k][1]=segs[k+1][1]; del segs[k+1]
    for j,(a,b) in enumerate(segs):
        words=len(lines[n].split())
        print(f'p{p} L{n:2d} {a:6.2f}-{b:6.2f} {b-a:5.2f}s {words:2d}w {words/(b-a):4.1f}w/s  {lines[n][:40]}')
        a2=max(0,a-0.05); b2=min(dur,b+0.08)
        subprocess.run(['ffmpeg','-v','error','-y','-i',f,'-ss',f'{a2:.3f}','-to',f'{b2:.3f}','-c:a','pcm_s16le',f'voice/{n+1:02d}.wav'],check=True)
        n+=1
    if len(segs)<c: print('!! part',p,'only',len(segs))
