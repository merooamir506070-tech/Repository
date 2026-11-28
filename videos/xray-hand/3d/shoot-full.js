// node 3d/shoot-full.js <out-pattern.png> t1 t2 ...  |  node 3d/shoot-full.js --frames <from> <to> <dir>
// بيفتح 3d/full.html من فولدر الفيديو (من غير سيرفر) ويصوّر فريمات 1080×1920
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' };
(async () => {
  const a = process.argv.slice(2); let shots = [];
  if (a[0] === '--frames') { const [from, to, dir] = [+a[1], +a[2], a[3]]; fs.mkdirSync(dir, { recursive: true }); for (let i = from; i < to; i++) shots.push([i / 30, path.join(dir, String(i).padStart(5, '0') + '.png')]); }
  else shots = a.slice(1).map((t, i) => [+t, a[0].replace('%d', String(i).padStart(4, '0'))]);
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2 });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.route('http://v.local/**', r => { const f = path.join(ROOT, decodeURIComponent(new URL(r.request().url()).pathname)); try { r.fulfill({ body: fs.readFileSync(f), contentType: TYPES[path.extname(f)] || 'application/octet-stream' }); } catch (e) { r.fulfill({ status: 404, body: '' }); } });
  await p.goto('http://v.local/3d/full.html'); await p.waitForFunction(() => window.READY, null, { timeout: 120000 }); await p.evaluate(() => document.fonts.ready);
  for (const [t, out] of shots) { if (fs.existsSync(out)) continue; await p.evaluate(t => renderAt(t), t); await p.locator('#wrap').screenshot({ path: out }); }
  await b.close();
})();
