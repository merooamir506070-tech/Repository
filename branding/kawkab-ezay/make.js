// يرسم لوجو «كوكب إزاي» والغلاف والصورة الشخصية لفيسبوك: node make.js
const { chromium } = require('playwright');
const fs = require('fs');
const INK = '#1c1c1c', YEL = '#f2c230', NAVY = '#16223b';
const defs = `<defs>
 <radialGradient id="pl" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#7fd0f0"/><stop offset=".55" stop-color="#2b86b5"/><stop offset="1" stop-color="#123f66"/></radialGradient>
 <linearGradient id="ring" x1="0" x2="1"><stop offset="0" stop-color="#f7d860"/><stop offset=".5" stop-color="${YEL}"/><stop offset="1" stop-color="#d9a420"/></linearGradient>
 <radialGradient id="sp" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#24365a"/><stop offset="1" stop-color="${NAVY}"/></radialGradient>
 <clipPath id="pc"><circle r="150"/></clipPath>
 <filter id="soft"><feGaussianBlur stdDeviation="14"/></filter></defs>`;
// العلامة: كوكب بحلقة صفرا، وقمر على شكل علامة استفهام. المركز (0,0) ونصف القطر حوالي 260
function mark() {
  const ringBack = `<path d="M-250 10 A250 70 -14 0 1 250 -10" fill="none" stroke="${INK}" stroke-width="34" transform="rotate(-14)"/><path d="M-250 10 A250 70 -14 0 1 250 -10" fill="none" stroke="url(#ring)" stroke-width="22" transform="rotate(-14)"/>`;
  const ringFront = `<path d="M250 -10 A250 70 -14 0 1 -250 10" fill="none" stroke="${INK}" stroke-width="34" transform="rotate(-14)"/><path d="M250 -10 A250 70 -14 0 1 -250 10" fill="none" stroke="url(#ring)" stroke-width="22" transform="rotate(-14)"/>`;
  const land = `<g clip-path="url(#pc)"><path d="M-150 -40 C-110 -70 -70 -50 -60 -90 C-50 -130 -10 -140 20 -120 C10 -90 -30 -80 -20 -40 C-10 -10 -60 10 -90 0 C-120 -10 -140 10 -150 0 Z" fill="#6fae56" stroke="${INK}" stroke-width="5"/><path d="M40 20 C80 0 120 10 150 40 L150 110 C110 120 90 90 60 100 C30 110 20 70 40 20 Z" fill="#6fae56" stroke="${INK}" stroke-width="5"/><path d="M-70 70 C-40 60 -20 80 -30 110 C-50 130 -80 110 -70 70 Z" fill="#9dbb6e" stroke="${INK}" stroke-width="5"/><circle cx="40" cy="40" r="150" fill="#000" opacity=".18"/></g>`;
  const planet = `<circle r="150" fill="url(#pl)" stroke="${INK}" stroke-width="10"/>${land}<ellipse cx="-62" cy="-78" rx="36" ry="20" fill="#fff" opacity=".55" transform="rotate(-30 -62 -78)"/>`;
  const q = `<g transform="translate(205 -175) rotate(12)"><text x="0" y="0" text-anchor="middle" dominant-baseline="central" style="font:900 190px 'Noto Sans Arabic';fill:${YEL};stroke:${INK};stroke-width:12px;paint-order:stroke">؟</text></g>`;
  const stars = [[-230,-190,10],[-190,200,8],[240,170,9],[-260,-40,6],[120,-250,7]].map(([x,y,r])=>`<path d="M${x} ${y-r*2} L${x+r*.6} ${y} L${x} ${y+r*2} L${x-r*.6} ${y} Z M${x-r*2} ${y} L${x} ${y-r*.6} L${x+r*2} ${y} L${x} ${y+r*.6} Z" fill="#fff3b0"/>`).join('');
  return stars + ringBack + planet + ringFront + q;
}
function word(x, y, size, light) {
  const st = `font:900 ${size}px 'Noto Sans Arabic';stroke:${INK};stroke-width:${size*0.09}px;paint-order:stroke;stroke-linejoin:round`;
  return `<text x="${x}" y="${y}" text-anchor="middle" direction="rtl" style="${st}"><tspan style="fill:${light ? '#fff' : '#fbfbf7'}">كوكب </tspan><tspan style="fill:${YEL}">إزاي</tspan></text>`;
}
function space(w, h, seed) {
  let s = `<rect width="${w}" height="${h}" fill="url(#sp)"/>`;
  for (let i = 0; i < 140; i++) { const a = Math.sin(i * 12.9898 + seed) * 43758.5453, r = a - Math.floor(a), b = Math.sin(i * 78.233 + seed) * 12345.678, r2 = b - Math.floor(b); s += `<circle cx="${(r * w).toFixed(1)}" cy="${(r2 * h).toFixed(1)}" r="${(1 + (i % 4) * 0.7).toFixed(1)}" fill="#fff" opacity="${(0.25 + (i % 5) * 0.15).toFixed(2)}"/>`; }
  return s;
}
// أيقونات صغيرة بنفس ستايل الفيديو
const gear = (x, y, r) => { let t = ''; for (let i = 0; i < 8; i++) t += `<rect x="-${r*.18}" y="-${r*1.25}" width="${r*.36}" height="${r*.5}" rx="4" fill="#8a8f96" stroke="${INK}" stroke-width="5" transform="rotate(${i*45})"/>`; return `<g transform="translate(${x} ${y})">${t}<circle r="${r}" fill="#8a8f96" stroke="${INK}" stroke-width="6"/><circle r="${r*.38}" fill="${NAVY}" stroke="${INK}" stroke-width="5"/></g>`; };
const bulb = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-20" r="70" fill="${YEL}" opacity=".25" filter="url(#soft)"/><path d="M-40 -20 A40 40 0 1 1 40 -20 C40 5 22 15 20 35 H-20 C-22 15 -40 5 -40 -20 Z" fill="#fff3b0" stroke="${INK}" stroke-width="6"/><rect x="-22" y="35" width="44" height="26" rx="5" fill="#8a8f96" stroke="${INK}" stroke-width="5"/><path d="M-12 30 V0 L0 12 L12 0 V30" fill="none" stroke="#d9a420" stroke-width="5"/></g>`;
const ship = (x, y, s) => { const c = ['#c23a26', '#2f6f9f', YEL, '#4f8f5a', '#e8604a']; let b = ''; for (let i = 0; i < 5; i++) b += `<rect x="${-60 + i * 22}" y="-36" width="21" height="18" fill="${c[i]}" stroke="${INK}" stroke-width="2"/>`; return `<g transform="translate(${x} ${y}) scale(${s})">${b}<rect x="54" y="-58" width="20" height="40" fill="#f4f1e8" stroke="${INK}" stroke-width="2.4"/><path d="M-90 -18 H96 L80 14 H-78 Z" fill="#8f2618" stroke="${INK}" stroke-width="3"/></g>`; };
const rocket = (x, y, s) => `<g transform="translate(${x} ${y}) rotate(35) scale(${s})"><path d="M-12 40 L0 80 L12 40 Z" fill="#f28c28" stroke="${INK}" stroke-width="4"/><path d="M0 -70 C26 -44 26 20 18 44 H-18 C-26 20 -26 -44 0 -70 Z" fill="#f4f1e8" stroke="${INK}" stroke-width="5"/><circle cy="-14" r="12" fill="#7fc4ff" stroke="${INK}" stroke-width="4"/><path d="M-18 20 L-38 48 L-16 44 Z M18 20 L38 48 L16 44 Z" fill="#c23a26" stroke="${INK}" stroke-width="4"/></g>`;
const orbit = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="3" stroke-dasharray="10 12"/>`;

const pages = {
  // اللوجو: خلفية شفافة، العلامة فوق والاسم تحت
  'logo.png': [1600, 1600, true, `<g transform="translate(800 600) scale(1.75)">${mark()}</g>${word(800, 1360, 230)}`],
  // نفس اللوجو على خلفية غامقة (للمعاينة والاستخدام على أي حتة)
  'logo-dark.png': [1600, 1600, false, `${space(1600, 1600, 3)}<g transform="translate(800 600) scale(1.75)">${mark()}</g>${word(800, 1360, 230)}`],
  // الصورة الشخصية: العلامة بس في النص، عشان فيسبوك بيقصها دايرة
  'profile.png': [1080, 1080, false, `${space(1080, 1080, 7)}<circle cx="540" cy="540" r="470" fill="#24406a" opacity=".35"/><g transform="translate(530 560) scale(1.35)">${mark()}</g>`],
  // الغلاف 1640×624 (ضعف مقاس فيسبوك 820×312). الكلام في النص عشان الموبايل بيقص الأطراف
  // نفس الغلاف من غير أي كلام
  'cover-blank.png': [1640, 624, false, `${space(1640, 624, 11)}${orbit(820, 330, 760, 230)}${orbit(820, 330, 560, 170)}
    <g transform="translate(1390 320) scale(.78)">${mark()}</g>
    ${gear(300, 150, 46)}${bulb(220, 430, 0.9)}${ship(470, 520, 0.9)}${rocket(1130, 95, 0.6)}`],
  'cover.png': [1640, 624, false, `${space(1640, 624, 11)}${orbit(820, 330, 760, 230)}${orbit(820, 330, 560, 170)}
    <g transform="translate(1390 320) scale(.78)">${mark()}</g>
    ${gear(300, 150, 46)}${bulb(220, 430, 0.9)}${ship(470, 520, 0.9)}${rocket(1130, 95, 0.6)}
    ${word(770, 250, 120)}
    <text x="770" y="375" text-anchor="middle" direction="rtl" style="font:800 46px 'Noto Sans Arabic';fill:#fff">كل حاجة حواليك… <tspan style="fill:${YEL}">اتعملت إزاي؟</tspan></text>
    <text x="770" y="450" text-anchor="middle" direction="rtl" style="font:700 34px 'Noto Sans Arabic';fill:#bfe0ff">شرح بالمصري في دقيقتين</text>`],
};
(async () => {
  const b = await chromium.launch();
  for (const [name, [w, h, transparent, body]] of Object.entries(pages)) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const tmp = __dirname + '/.page.html';
    fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><link href="file://${__dirname}/fonts/fonts.css" rel="stylesheet"><style>html,body{margin:0;background:transparent}</style></head><body><svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs}${body}</svg></body></html>`);
    await p.goto('file://' + tmp);
    fs.unlinkSync(tmp);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: __dirname + '/' + name, omitBackground: transparent });
    console.log('✓', name);
  }
  await b.close();
})();
