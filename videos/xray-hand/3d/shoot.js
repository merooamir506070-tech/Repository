const { chromium } = require('playwright');
(async () => { const [,, url, out, ...ts] = process.argv; const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2 }); p.on('console', m => console.log('console:', m.text())); p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto(url); await p.waitForFunction(() => window.READY, null, { timeout: 60000 }); await p.evaluate(() => document.fonts.ready);
  for (let i = 0; i < ts.length; i++) { await p.evaluate(t => renderAt(+t), ts[i]); await p.locator('#wrap').screenshot({ path: out.replace('%d', String(i).padStart(4, '0')) }); }
  await b.close(); })();
