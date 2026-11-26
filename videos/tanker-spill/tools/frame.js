// node frame.js <index.html> <out.png> <t>  — لقطة واحدة بدقة 2x
const { chromium } = require('playwright');
const [, , html, out, t] = process.argv;
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 360, height: 640 }, deviceScaleFactor: 1.5 });
  await p.goto('file://' + html); await p.evaluate(() => document.fonts.ready); await p.evaluate(t => renderAt(t), +t); await p.screenshot({ path: out }); await b.close(); })();
