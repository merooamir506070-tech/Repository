// يطلع كل مشهد كفيديو قصير لوحده بصوته (للمراجعة قبل الفيديو النهائي)
// node clips.js <index.html> <voice.wav> <outdir> [from] [to]
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const [, , html, audio, outdir, from, to] = process.argv;
const FPS = 30, SCALE = 2;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 360, height: 640 }, deviceScaleFactor: SCALE });
  await p.goto('file://' + html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const T = await p.evaluate(() => window.TIMING.lines.map(l => l.start)), end = await p.evaluate(() => window.VIDEO_END);
  const a0 = +(from || 0), a1 = to != null ? +to : T.length - 1;
  for (let i = a0; i <= a1; i++) {
    const s = i === 0 ? 0 : T[i] - 0.05, e = i + 1 < T.length ? T[i + 1] - 0.05 : end + 0.8, N = Math.ceil((e - s) * FPS);
    const out = `${outdir}/scene-${String(i + 1).padStart(2, '0')}.mp4`;
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-ss', String(s), '-t', String(N / FPS), '-i', audio,
      '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '21', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let k = 0; k < N; k++) {
      await p.evaluate(t => renderAt(t), s + k / FPS);
      const buf = await p.screenshot({ type: 'jpeg', quality: 90 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
    console.log('✓', out, (e - s).toFixed(1) + 's');
  }
  await b.close();
})();
