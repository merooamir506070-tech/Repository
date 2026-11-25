// يرسم لوجو «كوكب إزاي» والغلاف والصورة الشخصية لفيسبوك: node make.js
const { chromium } = require('playwright');
const fs = require('fs');
// الألوان نفس ستايل الفيديو: سما نهار، بحر بتدرج أزرق، رمل، عناوين بفرشاة بيج، وخط أسود تخين حوالين كل حاجة
const INK = '#1c1c1c', YEL = '#f2c230', TAGC = '#e8c48e', TAGT = '#2b2016', SAND = '#d8b679';
const defs = `<defs>
 <radialGradient id="pl" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#7fd0f0"/><stop offset=".55" stop-color="#2b86b5"/><stop offset="1" stop-color="#123f66"/></radialGradient>
 <linearGradient id="ring" x1="0" x2="1"><stop offset="0" stop-color="#f7d860"/><stop offset=".5" stop-color="${YEL}"/><stop offset="1" stop-color="#d9a420"/></linearGradient>
 <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb7e0"/><stop offset=".55" stop-color="#b9d8ec"/><stop offset="1" stop-color="#f3dfc2"/></linearGradient>
 <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fb3d9"/><stop offset=".5" stop-color="#2b86b5"/><stop offset="1" stop-color="#123f66"/></linearGradient>
 <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a8f96"/><stop offset="1" stop-color="#4b5056"/></linearGradient>
 <clipPath id="pc"><circle r="150"/></clipPath>
 <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
 <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .45  0 0 0 0 .4  0 0 0 .08 0"/></filter>
 <path id="swash" d="M6 14 C40 4 120 2 196 8 C214 10 222 20 214 30 C206 44 140 46 70 44 C30 44 4 40 2 30 C0 24 2 18 6 14 Z"/></defs>`;
const sparkle = (x, y, r) => `<path d="M${x} ${y-r*2} L${x+r*.6} ${y} L${x} ${y+r*2} L${x-r*.6} ${y} Z M${x-r*2} ${y} L${x} ${y-r*.6} L${x+r*2} ${y} L${x} ${y+r*.6} Z" fill="${YEL}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
// العلامة: كوكب بحلقة صفرا، وقمر على شكل علامة استفهام. المركز (0,0) ونصف القطر حوالي 260
function mark() {
  const arc = (d) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="34" transform="rotate(-14)"/><path d="${d}" fill="none" stroke="url(#ring)" stroke-width="22" transform="rotate(-14)"/>`;
  const land = `<g clip-path="url(#pc)"><path d="M-150 -40 C-110 -70 -70 -50 -60 -90 C-50 -130 -10 -140 20 -120 C10 -90 -30 -80 -20 -40 C-10 -10 -60 10 -90 0 C-120 -10 -140 10 -150 0 Z" fill="#6fae56" stroke="${INK}" stroke-width="5"/><path d="M40 20 C80 0 120 10 150 40 L150 110 C110 120 90 90 60 100 C30 110 20 70 40 20 Z" fill="#6fae56" stroke="${INK}" stroke-width="5"/><path d="M-70 70 C-40 60 -20 80 -30 110 C-50 130 -80 110 -70 70 Z" fill="#9dbb6e" stroke="${INK}" stroke-width="5"/><circle cx="40" cy="40" r="150" fill="#000" opacity=".18"/></g>`;
  const planet = `<circle r="150" fill="url(#pl)" stroke="${INK}" stroke-width="10"/>${land}<ellipse cx="-62" cy="-78" rx="36" ry="20" fill="#fff" opacity=".55" transform="rotate(-30 -62 -78)"/>`;
  const q = `<g transform="translate(205 -175) rotate(12)"><text x="0" y="0" text-anchor="middle" dominant-baseline="central" style="font:900 190px 'Noto Sans Arabic';fill:${YEL};stroke:${INK};stroke-width:12px;paint-order:stroke">؟</text></g>`;
  const stars = [[-230,-190,10],[-190,200,8],[240,170,9],[-260,-40,6],[120,-250,7]].map(([x,y,r]) => sparkle(x, y, r)).join('');
  return stars + arc('M-250 10 A250 70 -14 0 1 250 -10') + planet + arc('M250 -10 A250 70 -14 0 1 -250 10') + q;
}
function word(x, y, size) {
  const st = `font:900 ${size}px 'Noto Sans Arabic';stroke:${INK};stroke-width:${size*0.09}px;paint-order:stroke;stroke-linejoin:round`;
  return `<text x="${x}" y="${y}" text-anchor="middle" direction="rtl" style="${st}"><tspan style="fill:#fbfbf7">كوكب </tspan><tspan style="fill:${YEL}">إزاي</tspan></text>`;
}
// عنوان بفرشاة بيج زي عناوين الفيديو
function tag(text, x, y, size, rot, col) {
  const w = text.length * size * 0.52 + 50;
  return `<g transform="translate(${x} ${y}) rotate(${rot || -2})"><use href="#swash" fill="${col || TAGC}" transform="translate(${-w / 2} ${-size * 0.95}) scale(${w / 220} ${size * 1.6 / 46})"/><text x="0" y="${size * 0.35}" text-anchor="middle" direction="rtl" style="font:800 ${size}px 'Noto Sans Arabic';fill:${TAGT}">${text}</text></g>`;
}
// سحابة كرتون
const cloud = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" opacity=".95"><path d="M-70 20 C-90 20 -92 -8 -66 -10 C-64 -36 -30 -42 -16 -24 C-4 -50 40 -46 44 -14 C70 -18 82 14 60 20 Z" fill="#fbfbf7" stroke="${INK}" stroke-width="3"/></g>`;
const sun = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r * 1.8}" fill="#f7d24a" opacity=".45" filter="url(#soft)"/><circle cx="${x}" cy="${y}" r="${r}" fill="#f7d24a" stroke="${INK}" stroke-width="3"/>`;
const bird = (x, y, s) => `<path d="M${x - 10 * s} ${y} q${5 * s} ${-6 * s} ${10 * s} 0 q${5 * s} ${-6 * s} ${10 * s} 0" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
// بحر بموج من y لتحت
function sea(w, h, y) {
  let d = `M0 ${y}`; for (let x = 0; x <= w; x += 20) d += ` L${x} ${(y + Math.sin(x * 0.04) * 6 + Math.sin(x * 0.11) * 3).toFixed(1)}`;
  return `<path d="${d} V${h} H0 Z" fill="url(#sea)" stroke="${INK}" stroke-width="3"/><path d="${d} V${y + 18} H0 Z" fill="#8fd0ee" opacity=".7"/>`;
}
// الخلفية الأساسية: سما نهار وشمس وسحاب، والبحر تحت
function scene(w, h, seaY, o) {
  o = o || {};
  let s = `<rect width="${w}" height="${h}" fill="url(#sky)"/>` + sun(o.sunX || w * 0.12, o.sunY || h * 0.16, o.sunR || 34);
  (o.clouds || []).forEach(([x, y, sc]) => s += cloud(x, y, sc));
  (o.birds || []).forEach(([x, y]) => s += bird(x, y, 1.6));
  return s + sea(w, h, seaY);
}
const grain = (w, h) => `<rect width="${w}" height="${h}" filter="url(#grain)"/>`;
// أيقونات صغيرة بنفس ستايل الفيديو
const gear = (x, y, r) => { let t = ''; for (let i = 0; i < 8; i++) t += `<rect x="-${r*.18}" y="-${r*1.25}" width="${r*.36}" height="${r*.5}" rx="4" fill="#8a8f96" stroke="${INK}" stroke-width="5" transform="rotate(${i*45})"/>`; return `<g transform="translate(${x} ${y})">${t}<circle r="${r}" fill="url(#metal)" stroke="${INK}" stroke-width="6"/><circle r="${r*.38}" fill="#b9d8ec" stroke="${INK}" stroke-width="5"/></g>`; };
const bulb = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-20" r="70" fill="${YEL}" opacity=".35" filter="url(#soft)"/><path d="M-40 -20 A40 40 0 1 1 40 -20 C40 5 22 15 20 35 H-20 C-22 15 -40 5 -40 -20 Z" fill="#fff3b0" stroke="${INK}" stroke-width="6"/><rect x="-22" y="35" width="44" height="26" rx="5" fill="url(#metal)" stroke="${INK}" stroke-width="5"/><path d="M-12 30 V0 L0 12 L12 0 V30" fill="none" stroke="#d9a420" stroke-width="5"/></g>`;
const ship = (x, y, s) => { const c = ['#c23a26', '#2f6f9f', YEL, '#4f8f5a', '#e8604a', '#2f6f9f']; let b = ''; for (let i = 0; i < 6; i++) b += `<rect x="${-70 + i * 22}" y="-36" width="21" height="18" fill="${c[i]}" stroke="${INK}" stroke-width="2"/>`; for (let j = 0; j < 4; j++) b += `<rect x="${-60 + j * 22}" y="-54" width="21" height="18" fill="${c[(j + 3) % 6]}" stroke="${INK}" stroke-width="2"/>`; return `<g transform="translate(${x} ${y}) scale(${s})">${b}<rect x="56" y="-62" width="22" height="44" fill="#f4f1e8" stroke="${INK}" stroke-width="2.4"/><rect x="60" y="-56" width="14" height="6" fill="#cfe1ec"/><path d="M-96 -18 H100 L84 14 H-84 Z" fill="#8f2618" stroke="${INK}" stroke-width="3"/><path d="M-90 -6 H96" stroke="#f4f1e8" stroke-width="3"/></g>`; };
const rocket = (x, y, s) => `<g transform="translate(${x} ${y}) rotate(35) scale(${s})"><path d="M-12 40 L0 80 L12 40 Z" fill="#f28c28" stroke="${INK}" stroke-width="4"/><path d="M0 -70 C26 -44 26 20 18 44 H-18 C-26 20 -26 -44 0 -70 Z" fill="#f4f1e8" stroke="${INK}" stroke-width="5"/><circle cy="-14" r="12" fill="#7fc4ff" stroke="${INK}" stroke-width="4"/><path d="M-18 20 L-38 48 L-16 44 Z M18 20 L38 48 L16 44 Z" fill="#c23a26" stroke="${INK}" stroke-width="4"/></g>`;
const fish = (x, y, s, col) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 0 C-6 -9 8 -9 14 0 C8 9 -6 9 -14 0 Z" fill="${col}" stroke="${INK}" stroke-width="1.8"/><path d="M-14 0 L-22 -7 L-22 7 Z" fill="${col}" stroke="${INK}" stroke-width="1.8"/><circle cx="7" cy="-2" r="1.8" fill="${INK}"/></g>`;
const orbit = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${INK}" stroke-opacity=".22" stroke-width="3" stroke-dasharray="10 12"/>`;

// الغلاف 1640×624 (ضعف مقاس فيسبوك 820×312). الكلام في النص عشان الموبايل بيقص الأطراف
const coverArt = `${scene(1640, 624, 470, { sunX: 120, sunY: 90, sunR: 40, clouds: [[420, 70, 1.1], [980, 60, 0.9], [1580, 120, 0.8], [700, 160, 0.6]], birds: [[560, 110], [600, 95], [1080, 150]] })}
    ${orbit(820, 300, 760, 230)}${orbit(820, 300, 560, 170)}
    ${fish(300, 560, 1.6, '#f2a03a')}${fish(1000, 585, 1.4, '#e8604a')}${fish(760, 540, 1.2, YEL)}
    <g transform="translate(1390 300) scale(.78)">${mark()}</g>
    ${gear(330, 170, 46)}${bulb(150, 330, 0.9)}${ship(330, 470, 0.95)}${rocket(1130, 95, 0.6)}`;
const pages = {
  // اللوجو: خلفية شفافة، العلامة فوق والاسم تحت
  'logo.png': [1600, 1600, true, `<g transform="translate(800 600) scale(1.75)">${mark()}</g>${word(800, 1360, 230)}`],
  // نفس اللوجو على خلفية سما وبحر زي الفيديو
  'logo-sky.png': [1600, 1600, false, `${scene(1600, 1600, 1150, { sunX: 220, sunY: 230, sunR: 60, clouds: [[1250, 220, 1.6], [400, 1000, 1.2]] })}<g transform="translate(800 600) scale(1.75)">${mark()}</g>${word(800, 1360, 230)}${grain(1600, 1600)}`],
  // الصورة الشخصية: العلامة بس في النص، عشان فيسبوك بيقصها دايرة
  'profile.png': [1080, 1080, false, `${scene(1080, 1080, 820, { sunX: 250, sunY: 250, sunR: 46, clouds: [[180, 520, 1.0]] })}${fish(380, 930, 2, '#f2a03a')}${fish(700, 960, 1.6, '#e8604a')}<g transform="translate(530 540) scale(1.35)">${mark()}</g>${grain(1080, 1080)}`],
  // نفس الغلاف من غير أي كلام
  'cover-blank.png': [1640, 624, false, coverArt + grain(1640, 624)],
  'cover.png': [1640, 624, false, `${coverArt}
    ${word(770, 235, 120)}
    ${tag('كل حاجة حواليك… اتعملت إزاي؟', 770, 345, 42, -2)}
    ${tag('شرح بالمصري في دقيقتين', 770, 428, 30, 2, '#f4f1e8')}${grain(1640, 624)}`],
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
