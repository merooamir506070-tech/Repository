// صورة لكل مشهد لوحده بمقاس الفيديو (1080×1920)، من نص كل سطر (أو من آخره لو الكلام بيكمل).
// node stills.js <index.html> <out-dir>
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [, , html, dir] = process.argv;
(async () => {
  fs.mkdirSync(dir, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 360, height: 640 }, deviceScaleFactor: 3 });
  await p.route('**/*', r => r.request().url().startsWith('file:') ? r.continue() : r.abort());
  await p.goto('file://' + html);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const T = await p.evaluate(() => window.TIMING.lines.map(l => [l.start, l.end]));
  for (let i = 0; i < T.length; i++) {
    const t = T[i][0] + (T[i][1] - T[i][0]) * 0.9;
    await p.evaluate(t => renderAt(t), t);
    await p.screenshot({ path: path.join(dir, String(i + 1).padStart(2, '0') + '.png') });
  }
  await b.close();
  console.log(`✓ ${T.length} صورة في ${dir}`);
})();
