// «إزاي الميكروويف بيشتغل؟» بستايل الفيديو المرجع: عالم واحد مستمر (مطبخ + ميكروويف مقطع عرضي)،
// رسم كرتون بخط بني غامق، بطاقات أسماء غامقة بكلام أصفر، دواير صفرا، وعلامات ✓ و✗.
// العالم 360×640 (عمودي). الكلمة بتظهر تحت (y من 532 لـ575 على الشاشة)، فالمهم فوقها.
var O = "#2a211a";   // لون الخط
var YEL = "#f7c62f", RED = "#d23a2c";
function T(x, y, s, inner, rot) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ')' + (rot ? ' rotate(' + f(rot) + ')' : '') + ' scale(' + (s || 1) + ')">' + inner + '</g>'; }
function countTo(u, u0, dur, to) { return Math.round(to * ease((u - u0) / dur)).toLocaleString("en-US"); }
function txt(s, x, y, size, col, w) { return '<text x="' + f(x) + '" y="' + f(y) + '" text-anchor="middle" style="font:' + (w || 800) + ' ' + size + 'px Noto Sans Arabic;fill:' + col + '">' + s + '</text>'; }
function ltr(s, x, y, size, col, w) { return '<text x="' + f(x) + '" y="' + f(y) + '" text-anchor="middle" direction="ltr" style="font:' + (w || 900) + ' ' + size + 'px Noto Sans Arabic;fill:' + col + '">' + s + '</text>'; }

// ── بطاقات وعلامات بنفس شكل المرجع ─────────────────────────
// kind: "d" بطاقة غامقة بكلام أصفر | "r" بطاقة حمرا بكلام أبيض
function lbl(text, x, y, u, u0, kind, size) {
  var k = pop((u - u0) / 0.9); if (k <= 0) return ""; size = size || 13; var w = text.length * size * 0.55 + 20, h = size + 13;
  var bg = kind === "r" ? RED : "#2b2723", fg = kind === "r" ? "#fff" : YEL;
  return T(x, y, k.toFixed(3), '<rect x="' + f(-w / 2) + '" y="' + f(-h / 2) + '" width="' + f(w) + '" height="' + f(h) + '" rx="6" fill="' + bg + '" stroke="#fff" stroke-opacity=".5" stroke-width="1"/>' +
    '<path d="M-5 ' + f(h / 2 - 0.5) + ' L0 ' + f(h / 2 + 5) + ' L5 ' + f(h / 2 - 0.5) + ' Z" fill="' + bg + '"/>' + txt(text, 0, size * 0.36, size, fg, 800));
}
function ring(x, y, r, u, u0, t) {
  var k = ease((u - u0) / 0.5); if (k <= 0) return ""; var pr = r * (1 + 0.06 * Math.sin(t * 6));
  return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(pr * (1.6 - 0.6 * k)) + '" fill="none" stroke="' + YEL + '" stroke-width="3.5" opacity="' + f(k) + '"/>';
}
function steam(x, y, t, n, w, col) {
  var s = ""; n = n || 3; w = w || 30;
  for (var i = 0; i < n; i++) { var k = (t * 0.7 + i / n) % 1, xx = x - w / 2 + (i + 0.5) * w / n, yy = y - k * 40;
    s += '<path d="M' + f(xx) + ' ' + f(yy) + ' q6 -6 0 -12 q-6 -6 0 -12" stroke="' + (col || "#fff") + '" stroke-width="3" fill="none" stroke-linecap="round" opacity="' + f(Math.sin(k * 3.14) * 0.85) + '"/>'; }
  return s;
}

// ── المطبخ ───────────────────────────────────────────────
function kitchen(t, dark) {
  var s = '<rect x="-300" y="-300" width="960" height="720" fill="url(#kwall)"/>';
  for (var y = 160; y < 400; y += 22) s += '<path d="M-300 ' + y + ' H660" stroke="#d6c39d" stroke-width="1.2"/>';
  for (var y2 = 160; y2 < 400; y2 += 22) for (var x = -300 + ((y2 / 22) % 2) * 14; x < 660; x += 28) s += '<path d="M' + x + ' ' + y2 + ' v22" stroke="#d6c39d" stroke-width="1.2"/>';
  // شباك فيه سما وشمس وسحاب ماشي
  s += '<rect x="206" y="34" width="130" height="116" rx="6" fill="#f4ecdc" stroke="' + O + '" stroke-width="3"/><g clip-path="url(#kwin)"><rect x="200" y="30" width="140" height="120" fill="url(#ksky)"/>' +
    '<circle cx="300" cy="70" r="34" fill="#fff3c0" opacity=".6"/><circle cx="300" cy="70" r="18" fill="#ffe37a"/>' + clouds(t, 12, 70, 3, 0.95, 0.45) +
    '<path d="M200 150 V120 h16 v-14 h12 v14 h14 v-24 h18 v24 h10 v-10 h20 v10 h14 v-20 h16 v20 h20 V150 Z" fill="#c9cfd2"/></g>' +
    '<path d="M271 36 V148 M208 92 H334" stroke="' + O + '" stroke-width="3"/>';
  // دولاب فوق
  s += '<rect x="-40" y="-10" width="190" height="140" rx="4" fill="url(#kcab)" stroke="' + O + '" stroke-width="3"/><path d="M55 -10 V130" stroke="' + O + '" stroke-width="2.5"/><rect x="40" y="96" width="5" height="22" rx="2" fill="#e8e2d4" stroke="' + O + '" stroke-width="1.5"/><rect x="65" y="96" width="5" height="22" rx="2" fill="#e8e2d4" stroke="' + O + '" stroke-width="1.5"/>';
  // رخامة ودولاب تحت وأرضية
  s += '<rect x="-300" y="520" width="960" height="400" fill="url(#kfloor)"/>';
  for (var fx = -300; fx < 660; fx += 46) s += '<path d="M' + fx + ' 520 L' + f(fx - 40) + ' 700" stroke="#4e3a28" stroke-width="1.5" opacity=".6"/>';
  s += '<rect x="-300" y="412" width="960" height="108" fill="url(#kcab)" stroke="' + O + '" stroke-width="3"/>';
  for (var cx = -300; cx < 660; cx += 72) s += '<rect x="' + (cx + 6) + '" y="420" width="60" height="92" rx="3" fill="none" stroke="#3f5d6a" stroke-width="2"/><rect x="' + (cx + 52) + '" y="440" width="4" height="20" rx="2" fill="#e8e2d4"/>';
  s += '<rect x="-300" y="398" width="960" height="16" rx="3" fill="url(#kwood)" stroke="' + O + '" stroke-width="3"/>';
  // نبتة صغيرة بتتمايل
  var sw = Math.sin(t * 1.6) * 3;
  s += '<g><path d="M30 398 L26 372 H54 L50 398 Z" fill="#c2643a" stroke="' + O + '" stroke-width="2.5"/>' +
    '<path d="M40 372 Q' + f(30 + sw) + ' 350 ' + f(22 + sw) + ' 342 M40 372 Q' + f(42 + sw) + ' 346 ' + f(44 + sw) + ' 332 M40 372 Q' + f(52 + sw) + ' 352 ' + f(60 + sw) + ' 346" stroke="#4f8a3a" stroke-width="5" fill="none" stroke-linecap="round"/></g>';
  if (dark) s += '<rect x="-300" y="-300" width="960" height="1240" fill="#0d1530" opacity="' + f(dark) + '"/>';
  return s;
}

// ── الأكل ────────────────────────────────────────────────
// heat: "split" (نص سخن ونص ساقع) | "even" (سخن كله) | "" (عادي)
function bowl(x, y, t, heat, sc) {
  var s = '<ellipse cx="0" cy="10" rx="30" ry="5" fill="#000" opacity=".18"/>' +
    '<path d="M-26 -6 Q-28 -30 0 -32 Q28 -30 26 -6 Z" fill="url(#rice)" stroke="' + O + '" stroke-width="2"/>';
  for (var i = 0; i < 14; i++) s += '<ellipse cx="' + f(-18 + hash(i) * 36) + '" cy="' + f(-10 - hash(i + 5) * 18) + '" rx="2.6" ry="1.2" fill="#fff" stroke="#d9d0bb" stroke-width=".6" transform="rotate(' + f(hash(i + 2) * 180) + ' ' + f(-18 + hash(i) * 36) + ' ' + f(-10 - hash(i + 5) * 18) + ')"/>';
  if (heat === "split") s += '<path d="M-26 -6 Q-28 -30 0 -32 V-6 Z" fill="#ff5a2a" opacity=".45"/><path d="M0 -32 Q28 -30 26 -6 H0 Z" fill="#4aa8ff" opacity=".5"/>' + steam(-12, -34, t, 2, 20);
  if (heat === "even") s += '<path d="M-26 -6 Q-28 -30 0 -32 Q28 -30 26 -6 Z" fill="#ff8a3a" opacity=".3"/>' + steam(0, -34, t, 3, 40);
  s += '<path d="M-32 -6 H32 Q30 10 0 12 Q-30 10 -32 -6 Z" fill="#f2f5f6" stroke="' + O + '" stroke-width="2.5"/><path d="M-31 -2 H31" stroke="#4a86c5" stroke-width="2.5"/>';
  return T(x, y, sc || 1, s);
}
function iceBlock(x, y, t, melt) {
  melt = melt || 0;
  return T(x, y, 1, '<path d="M-30 -2 L-26 -34 L24 -38 L30 -4 Z" fill="url(#ice)" stroke="' + O + '" stroke-width="2.5"/><path d="M-20 -28 L-6 -30 M8 -22 L20 -26" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' +
    (melt ? '<path d="M-30 -2 L-26 -34 L24 -38 L30 -4 Z" fill="#ff8a3a" opacity="' + f(melt * 0.35) + '"/>' : '') + '<ellipse cx="0" cy="0" rx="34" ry="4" fill="#9fd3f0" opacity=".6"/>');
}
function forkF(x, y) {
  return T(x, y, 1, '<path d="M-3 0 L-3 -26 M3 0 L3 -26" stroke="#9aa0a6" stroke-width="0"/><rect x="-2.5" y="-24" width="5" height="26" rx="2" fill="#b9bfc5" stroke="' + O + '" stroke-width="1.6"/>' +
    '<path d="M-9 -24 Q-9 -32 0 -32 Q9 -32 9 -24 Z" fill="#b9bfc5" stroke="' + O + '" stroke-width="1.6"/>' +
    [-7.5, -2.5, 2.5, 7.5].map(function (dx) { return '<rect x="' + f(dx - 1.3) + '" y="-50" width="2.6" height="20" rx="1.2" fill="#c9cfd5" stroke="' + O + '" stroke-width="1.2"/>'; }).join(""));
}
function sparks(x, y, t, n) {
  var s = ""; n = n || 4;
  for (var i = 0; i < n; i++) { var fl = hash(Math.floor(t * 14) + i * 7); if (fl < 0.35) continue; var a = -2.6 + i * 0.6 + fl * 0.4, l = 14 + fl * 14, px = x + Math.cos(a) * l, py = y + Math.sin(a) * l;
    s += '<path d="M' + f(x) + ' ' + f(y) + ' L' + f(lerp(x, px, 0.5) + 4) + ' ' + f(lerp(y, py, 0.5) - 3) + ' L' + f(px) + ' ' + f(py) + '" stroke="#bfe9ff" stroke-width="2.5" fill="none" stroke-linejoin="round"/>'; }
  return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="16" fill="#cfefff" opacity="' + f(0.3 + 0.4 * hash(Math.floor(t * 14))) + '" filter="url(#glow)"/>' + s;
}

// ── الميكروويف (مقطع عرضي) ─────────────────────────────────
// o: on, cut (0..1 يبان المجنترون), door (0..1 مفتوح), mesh (الباب الإزاز قافل), food: rice|ice|fork|none, heat,
//    waves (0..1), bounce (0..1), stand (0..1 أماكن سخنة وساقعة), disp (النص على الشاشة), orbit (الأكل بيلف بعيد عن النص)
var CX = 191, CY = 318;   // نص الكابينة
function mw(t, o) {
  o = o || {}; var on = !!o.on, s = "";
  s += '<ellipse cx="222" cy="402" rx="132" ry="5" fill="#000" opacity=".2"/>';
  s += '<rect x="96" y="232" width="252" height="168" rx="12" fill="url(#mwbody)" stroke="' + O + '" stroke-width="3"/>';
  s += '<rect x="112" y="250" width="158" height="136" rx="4" fill="url(#' + (on ? "mwglow" : "mwoff") + ')" stroke="' + O + '" stroke-width="2.5"/>';
  s += '<g clip-path="url(#cav)"><path d="M112 250 L128 264 H254 L270 250 M112 386 L128 372 H254 L270 386 M128 264 V372 M254 264 V372" stroke="' + (on ? "#c9a85a" : "#8f897e") + '" stroke-width="1.5" fill="none"/>';
  // أماكن سخنة وساقعة (موجات واقفة)
  if (o.stand) { for (var i = 0; i < 5; i++) for (var j = 0; j < 3; j++) { var hx = 131 + i * 30, hy = 280 + j * 36, hot = (i + j) % 2 === 0, pk = 0.75 + 0.25 * Math.sin(t * 5 + i + j);
      s += '<circle cx="' + hx + '" cy="' + hy + '" r="' + f(17 * pk) + '" fill="url(#' + (hot ? "hot" : "cold") + ')" opacity="' + f(o.stand) + '"/>'; } }
  // موجات داخلة من فتحة فوق يمين
  if (o.waves) for (var w = 0; w < 3; w++) { var yy = 286 + w * 30, d = "", ph = t * 9 + w;
    for (var x = 262; x >= 120; x -= 3) d += (x === 262 ? "M" : " L") + x + " " + f(yy + Math.sin(x * 0.12 + ph) * 6);
    s += '<path d="' + d + '" stroke="' + YEL + '" stroke-width="3" fill="none" opacity="' + f(o.waves * (0.65 + 0.3 * Math.sin(t * 4 + w))) + '" stroke-linecap="round"/>'; }
  // موجة بتخبط في الحيطان وترتد
  if (o.bounce) { var pth = "M266 262 L118 300 L262 336 L118 372 L262 380", dash = (t * 160) % 400;
    s += '<path d="' + pth + '" stroke="' + YEL + '" stroke-width="3.5" fill="none" stroke-dasharray="40 14" stroke-dashoffset="' + f(-dash) + '" opacity="' + f(o.bounce) + '" stroke-linejoin="round"/>';
    [[118, 300], [262, 336], [118, 372]].forEach(function (p, k) { var fl = 0.5 + 0.5 * Math.sin(t * 6 + k * 2); s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + f(5 + fl * 5) + '" fill="#fff6c8" opacity="' + f(o.bounce * fl) + '"/>'; }); }
  s += '</g>';
  // الطبق اللي بيلف
  var spin = o.spin == null ? on : o.spin, ang = spin ? t * 1.6 : 0;
  s += '<ellipse cx="' + CX + '" cy="376" rx="64" ry="9" fill="#e6f0f4" fill-opacity=".85" stroke="' + O + '" stroke-width="2"/>';
  for (var m = 0; m < 3; m++) { var a = ang + m * 2.094, mx = CX + Math.cos(a) * 52, my = 376 + Math.sin(a) * 6; if (Math.sin(a) > -0.2) s += '<circle cx="' + f(mx) + '" cy="' + f(my) + '" r="2.2" fill="#9fb7c2"/>'; }
  var orb = o.orbit || 0, fx = CX + Math.cos(ang) * orb, fy = 372 + Math.sin(ang) * orb * 0.12;
  if (o.food === "rice" || o.food == null) s += bowl(fx, fy, t, o.heat || "");
  if (o.food === "ice") s += iceBlock(fx, fy + 2, t, o.melt);
  if (o.food === "fork") s += bowl(fx - 6, fy, t, "") + T(fx + 18, fy - 22, 1, forkF(0, 0), 18) + (on ? sparks(fx + 30, fy - 64, t, 5) : "");
  // اللمبة جوه
  if (on) s += '<rect x="112" y="250" width="158" height="136" fill="#fff4c0" opacity="' + f(0.08 + 0.04 * Math.sin(t * 9)) + '"/>';
  // الباب الإزاز (الشبكة)
  if (o.mesh) s += '<rect x="112" y="250" width="158" height="136" rx="4" fill="#1d2a33" opacity=".28"/><rect x="112" y="250" width="158" height="136" rx="4" fill="url(#mesh)" opacity=".55"/><rect x="104" y="242" width="174" height="152" rx="8" fill="none" stroke="#bdb7ac" stroke-width="6"/><rect x="104" y="242" width="174" height="152" rx="8" fill="none" stroke="' + O + '" stroke-width="2"/>';
  if (o.door) { var k = ease(o.door), dw = 178 * (1 - 0.82 * k);
    s += '<path d="M100 240 L' + f(100 + dw) + ' ' + f(240 - k * 26) + ' L' + f(100 + dw) + ' ' + f(398 + k * 26) + ' L100 398 Z" fill="#cfd2d0" stroke="' + O + '" stroke-width="2.5"/>' +
      '<path d="M' + f(100 + dw * 0.1) + ' ' + f(250 - k * 20) + ' L' + f(100 + dw * 0.9) + ' ' + f(250 - k * 22) + ' L' + f(100 + dw * 0.9) + ' ' + f(388 + k * 22) + ' L' + f(100 + dw * 0.1) + ' ' + f(388 + k * 20) + ' Z" fill="url(#mesh)" opacity=".7"/>'; }
  // اللوحة: شاشة وزراير
  var pk2 = 1 - (o.cut || 0);
  s += '<g opacity="' + f(pk2) + '"><rect x="282" y="250" width="54" height="24" rx="3" fill="#18241c" stroke="' + O + '" stroke-width="2"/>' + ltr(o.disp == null ? (on ? "1:30" : "12:00") : o.disp, 309, 268, 14, "#7dffa0") +
    [0, 1, 2].map(function (r) { return [0, 1, 2].map(function (c) { return '<rect x="' + (285 + c * 17) + '" y="' + (284 + r * 14) + '" width="13" height="9" rx="2" fill="#e5e2db" stroke="' + O + '" stroke-width="1.3"/>'; }).join(""); }).join("") +
    '<circle cx="309" cy="352" r="14" fill="#d9d5cc" stroke="' + O + '" stroke-width="2"/><path d="M309 352 L' + f(309 + Math.cos(on ? t * 0.8 : 0) * 10) + ' ' + f(352 + Math.sin(on ? t * 0.8 : 0) * 10) + '" stroke="' + O + '" stroke-width="2.5" stroke-linecap="round"/></g>';
  if (o.cut) s += '<g opacity="' + f(o.cut) + '">' + magnetron(t, on, o.def) + '</g>';
  s += '<path d="M278 236 V396" stroke="' + O + '" stroke-width="2.5"/>';
  return s;
}
// المجنترون جوه الجنب اليمين + ممر الموجات (waveguide) لحد الكابينة
function magnetron(t, on, def) {
  var live = on && (!def || Math.sin(t * 2.2) > 0);
  var s = '<rect x="280" y="238" width="64" height="158" fill="#3a3f45"/>' +
    '<rect x="262" y="256" width="44" height="16" fill="#a9aeb3" stroke="' + O + '" stroke-width="2"/>' +
    '<rect x="292" y="276" width="34" height="56" rx="4" fill="url(#mag)" stroke="' + O + '" stroke-width="2"/>';
  for (var y = 284; y < 330; y += 6) s += '<path d="M288 ' + y + ' H330" stroke="#6e737a" stroke-width="2.4"/>';
  s += '<rect x="290" y="270" width="38" height="8" rx="3" fill="#c0392b" stroke="' + O + '" stroke-width="1.5"/><rect x="290" y="330" width="38" height="8" rx="3" fill="#c0392b" stroke="' + O + '" stroke-width="1.5"/>' +
    '<rect x="304" y="262" width="10" height="10" rx="3" fill="#d9dde0" stroke="' + O + '" stroke-width="1.5"/>' +
    '<path d="M296 360 h26 M300 368 h18" stroke="#8a8f96" stroke-width="3"/>';
  if (live) { s += '<circle cx="309" cy="304" r="22" fill="#ffd24a" opacity="' + f(0.25 + 0.15 * Math.sin(t * 12)) + '" filter="url(#glow)"/>';
    for (var i = 0; i < 3; i++) { var k = (t * 1.6 + i / 3) % 1; s += '<path d="M' + f(300 - k * 40) + ' 258 q3 6 0 12" stroke="' + YEL + '" stroke-width="3" fill="none" opacity="' + f(1 - k) + '"/>'; } }
  return s;
}

// ── مكبّر (دايرة زووم) ──────────────────────────────────────
// C = [x,y,z] الكاميرا، sx/sy = مكانه على الشاشة، inner = رسم بإحداثيات من مركزه (r = 100)
var LZ = 0;
function lens(C, sx, sy, r, inner, k, px, py) {
  if (k <= 0) return ""; LZ++; var wx = C[0] + (sx - 180) / C[2], wy = C[1] + (sy - 320) / C[2], sc = r / 100 / C[2] * pop(k), id = "lz" + LZ;
  var line = px != null ? '<path d="M' + f(px) + ' ' + f(py) + ' L' + f(wx) + ' ' + f(wy + r / C[2] * 0.9) + '" stroke="#fff" stroke-width="' + f(3 / C[2]) + '" stroke-dasharray="' + f(6 / C[2]) + ' ' + f(5 / C[2]) + '" opacity=".9"/><circle cx="' + f(px) + '" cy="' + f(py) + '" r="' + f(6 / C[2]) + '" fill="none" stroke="#fff" stroke-width="' + f(2.5 / C[2]) + '"/>' : '';
  return line + T(wx, wy, f(sc), '<clipPath id="' + id + '"><circle r="100"/></clipPath><circle r="104" fill="#000" opacity=".25" transform="translate(3 5)"/><circle r="100" fill="url(#lensbg)"/><g clip-path="url(#' + id + ')">' + inner + '</g><circle r="100" fill="none" stroke="#fff" stroke-width="7"/><circle r="100" fill="none" stroke="' + O + '" stroke-width="2.5"/>');
}
// جزيء مية: O أحمر (سالب) وH أبيض (موجب)
function water(x, y, a, s, frozen) {
  return T(x, y, s || 1, '<g transform="rotate(' + f(a) + ')"><circle cx="-12" cy="13" r="9" fill="#f4f4f0" stroke="' + O + '" stroke-width="2"/><circle cx="12" cy="13" r="9" fill="#f4f4f0" stroke="' + O + '" stroke-width="2"/>' +
    '<circle r="15" fill="' + (frozen ? "#7fb0d8" : "#e0503a") + '" stroke="' + O + '" stroke-width="2"/>' + ltr("−", 0, 6, 18, "#fff") + ltr("+", -12, 18, 12, "#2b3a4a") + ltr("+", 12, 18, 12, "#2b3a4a") + '</g>');
}
function fieldArrow(t, y, hz) { var dir = Math.sin(t * (hz || 3) * 3.1416) > 0 ? 1 : -1; return arrow(-dir * 60, y, dir * 60, y, YEL, 5, 1); }
function thermo(x, y, lev, s) {
  return T(x, y, s || 1, '<rect x="-7" y="-60" width="14" height="66" rx="7" fill="#fff" stroke="' + O + '" stroke-width="2.5"/><circle cy="12" r="12" fill="' + RED + '" stroke="' + O + '" stroke-width="2.5"/><rect x="-3.5" y="' + f(6 - 60 * lev) + '" width="7" height="' + f(60 * lev + 2) + '" fill="' + RED + '"/>');
}

// ── شخص ─────────────────────────────────────────────────
function guy(x, y, t, mood, pose, s, look) { return person(x, y, t, { mood: mood || "n", pose: pose || "stand", s: s || 1.05, shirt: "#3f78b8", look: look || 0.6 }); }
function spoon(x, y, rot) { return T(x, y, 1, '<rect x="-2" y="-26" width="4" height="26" rx="2" fill="#c9cfd5" stroke="' + O + '" stroke-width="1.4"/><ellipse cx="0" cy="-30" rx="6" ry="8" fill="#c9cfd5" stroke="' + O + '" stroke-width="1.4"/>', rot || 0); }

// ── كاميرات ─────────────────────────────────────────────
var WIDE = [180, 318, 1], MW = [220, 318, 1.38], CAV = [191, 318, 1.85], PAN = [300, 318, 1.9];
function stay(c) { return function () { return c; }; }

// ═══════════════ المشاهد ═══════════════
// 0: الطبق: أول معلقة سخنة نار، والتانية ساقعة تلج
shot(0, camMove([150, 330, 1.15], [180, 322, 1.25]), function (u, d, t) {
  var hot = u < d * 0.5;
  return kitchen(t) + mw(t, { on: false, disp: "0:00", mesh: false, door: 1, food: "none" }) +
    bowl(150, 396, t, "split", 1.2) + guy(70, 516, t, hot ? "shock" : "worry", "point", 1.1) + spoon(hot ? 132 : 178, 352, hot ? -20 : 20) +
    (hot ? lbl("سخن نار!", 112, 300, u, 0.5, "r") + steam(132, 330, t, 2, 16) : lbl("ساقع تلج!", 190, 300, u, d * 0.5 + 0.2, "r") + '<circle cx="178" cy="324" r="12" fill="#bfe6ff" opacity=".7"/>') +
    lbl("دقيقتين", 286, 222, u, 0.9);
});
// 1: كوكب إزاي
shot(1, camMove([180, 300, 1.2], WIDE), function (u, d, t) {
  return kitchen(t) + mw(t, { on: true, mesh: true }) + guy(58, 516, t, "happy", "wave") + lbl("كوكب إزاي", 222, 196, u, 0.3, "r", 15) + lbl("إزاي الميكروويف بيشتغل؟", 200, 166, u, 1.2);
});
// 2: من غير نار؟ وليه حتة تسخن وحتة لأ؟
shot(2, camPush(200, 330, 1.35, 1.5), function (u, d, t) {
  var fire = '<path d="M0 0 C-14 -6 -12 -22 -4 -30 C-4 -20 4 -20 2 -36 C14 -26 16 -8 0 0 Z" fill="#ff7a2a" stroke="' + O + '" stroke-width="2"/>';
  return kitchen(t) + mw(t, { on: true, heat: "split" }) + T(150, 222, 1, fire) + cross(166, 206, u, 0.6, 0.55) +
    lbl("سخن", 160, 300, u, d * 0.5, "r") + lbl("ساقع", 222, 300, u, d * 0.5 + 0.3) + qmark(300, 210, t, 60, YEL);
});
// 3: المجنترون
shot(3, camMove(MW, PAN), function (u, d, t) {
  return kitchen(t) + mw(t, { on: true, cut: ease(u / 1.2), waves: clamp((u - 1.5) / 1) }) + ring(309, 304, 30, u, 1.4, t) + lbl("المجنترون", 309, 254, u, 1.6);
});
// 4: 2,450,000,000 مرة في الثانية
shot(4, stay([210, 300, 1.4]), function (u, d, t) {
  var n = countTo(u, 0.3, 2.2, 2450000000);
  return kitchen(t) + mw(t, { on: true, cut: 1, waves: 1 }) +
    '<rect x="92" y="150" width="236" height="64" rx="10" fill="#2b2723" opacity=".92"/>' + ltr(n, 210, 186, 24, YEL) + txt("مرة في الثانية", 210, 206, 12, "#fff", 700) + ring(309, 304, 30, u, 0.2, t);
});
// 5: جزيء المية: طرف موجب وطرف سالب
var C5 = [191, 330, 1.6];
shot(5, stay(C5), function (u, d, t) {
  var inner = water(0, 0, Math.sin(t * 1.5) * 10, 2.4) + lbl("سالب −", -46, -62, u, 1.6, "r", 12) + lbl("موجب +", 52, 62, u, 2.4, "d", 12);
  return kitchen(t) + mw(t, { on: true, waves: 0.5 }) + lens(C5, 180, 190, 120, inner, clamp(u / 0.6), CX, 350) + lbl("جزيء مية", 180, 300 / 1 - 0, u, 0.8);
});
// 6: الجزيئات بتلف مع الموجة
shot(6, stay(C5), function (u, d, t) {
  var dir = Math.sin(t * 2 * 3.1416) > 0 ? 1 : -1, inner = fieldArrow(t, -66, 2), mols = "";
  for (var i = 0; i < 6; i++) { var mx = -55 + (i % 3) * 55, my = -6 + Math.floor(i / 3) * 52, tgt = dir > 0 ? -90 : 90; mols += water(mx, my, tgt + Math.sin(t * 20 + i) * 8, 0.95); }
  return kitchen(t) + mw(t, { on: true, waves: 0.5 }) + lens(C5, 180, 190, 120, inner + mols, 1, CX, 350) + lbl("بتلف", 180, 84, u, 0.8);
});
// 7: احتكاك ← سخونية
shot(7, stay(C5), function (u, d, t) {
  var heat = clamp(u / d), mols = "";
  for (var i = 0; i < 7; i++) { var mx = -60 + (i % 4) * 40 + (Math.floor(i / 4) ? 20 : 0), my = -30 + Math.floor(i / 4) * 52; mols += water(mx + Math.sin(t * 30 + i) * 3, my + Math.cos(t * 27 + i) * 3, t * 400 + i * 50, 0.8); }
  var inner = '<circle r="100" fill="#ff5a2a" opacity="' + f(heat * 0.45) + '"/>' + mols + sparkle(0, 0, t, "#ffd2a0", 5);
  return kitchen(t) + mw(t, { on: true, heat: u > d * 0.5 ? "even" : "" }) + lens(C5, 180, 190, 120, inner, 1, CX, 350) +
    thermo(312, 220, 0.2 + heat * 0.75, 1) + lbl("احتكاك", 120, 84, u, 0.5) + lbl("سخونية", 240, 84, u, d * 0.55, "r");
});
// 8: الموجات بتخبط في الحيطان وترتد
shot(8, camPush(CAV[0], CAV[1], 1.6, 1.85), function (u, d, t) {
  return kitchen(t) + mw(t, { on: true, cut: 1, bounce: clamp(u / 0.8), food: "none" }) + lbl("حديد", 120, 262, u, 0.8) + lbl("بترتد!", 191, 236, u, 1.6, "r");
});
// 9: أماكن سخنة وأماكن مفيهاش حاجة
shot(9, stay(CAV), function (u, d, t) {
  return kitchen(t) + mw(t, { on: true, stand: clamp(u / 1.2), food: "none" }) + lbl("سخن", 131, 262, u, 1.2, "r") + lbl("ولا حاجة", 226, 262, u, 2.2);
});
// 10: المسافة ست سنتي
shot(10, stay(CAV), function (u, d, t) {
  var k = ease((u - 0.4) / 1);
  return kitchen(t) + mw(t, { on: true, stand: 1, food: "none" }) +
    '<path d="M131 280 V264 M' + f(131 + 60 * k) + ' 280 V264 M131 268 H' + f(131 + 60 * k) + '" stroke="#fff" stroke-width="2.5"/>' + lbl("6 سم", 161, 250, u, 1.3, "d", 12);
});
// 11: الطبق بيلف
shot(11, camMove(CAV, [200, 322, 1.6]), function (u, d, t) {
  return kitchen(t) + mw(t, { on: true, stand: 0.7, orbit: 30, heat: u > d * 0.6 ? "even" : "" }) +
    '<path d="M150 392 A44 8 0 0 0 232 392" stroke="' + YEL + '" stroke-width="3" fill="none" stroke-dasharray="8 6" stroke-dashoffset="' + f(-t * 30) + '"/>' +
    lbl("طبق بيلف", 191, 410, u, 0.6) + check(250, 270, u, d * 0.6, 0.6);
});
// 12: هتخرج من الباب وتسخّنك؟
shot(12, camMove(WIDE, [160, 330, 1.25]), function (u, d, t) {
  return kitchen(t) + mw(t, { on: true, mesh: true }) + guy(64, 516, t, "worry", "think", 1.15, 1) +
    arrow(150, 316, 92, 330, RED, 4, ease((u - 0.6) / 0.8)) + lbl("هتخرج؟", 110, 290, u, 1.2, "r") + qmark(120, 250, t, 40, YEL);
});
// 13: شبكة حديد جوه الإزاز
var C13 = [170, 316, 1.7];
shot(13, camMove(MW, C13), function (u, d, t) {
  var inner = '<rect x="-100" y="-100" width="200" height="200" fill="#a8b0b4"/>';
  for (var y = -90; y <= 90; y += 22) for (var x = -90 + ((y + 90) / 22 % 2) * 11; x <= 90; x += 22) inner += '<circle cx="' + x + '" cy="' + y + '" r="7" fill="#1a242b"/>';
  return kitchen(t) + mw(t, { on: true, mesh: true }) + ring(150, 318, 22, u, 0.4, t) + lens(C13, 180, 170, 105, inner, clamp((u - 0.8) / 0.6), 150, 318) + lbl("شبكة حديد", 180, 286, u, 1.4);
});
// 14: موجة 12 سم مش بتعدي من خرم أقل من 2 مم
shot(14, stay(C13), function (u, d, t) {
  var inner = '<rect x="-100" y="-100" width="200" height="200" fill="#26323c"/><rect x="-6" y="-100" width="12" height="200" fill="#a8b0b4"/>';
  for (var y = -90; y <= 90; y += 16) inner += '<rect x="-6" y="' + (y - 2.5) + '" width="12" height="5" fill="#1a242b"/>';
  var dd = "", hit = (t * 1.2) % 1;
  for (var x = -100; x <= -8; x += 2) dd += (x === -100 ? "M" : " L") + x + " " + f(Math.sin(x * 0.05 - t * 6) * 26);
  inner += '<path d="' + dd + '" stroke="' + YEL + '" stroke-width="5" fill="none"/>' + '<circle cx="-8" cy="0" r="' + f(8 + hit * 16) + '" fill="none" stroke="#fff" stroke-width="3" opacity="' + f(1 - hit) + '"/>';
  inner += lbl("12 سم", -52, -58, u, 0.5, "d", 13) + lbl("أقل من 2 مم", 48, 58, u, 1.4, "d", 12) + cross(50, -30, u, 2.2, 0.8);
  return kitchen(t) + mw(t, { on: true, mesh: true }) + lens(C13, 180, 170, 105, inner, 1, 150, 318);
});
// 15: النور بيعدّي فبتشوف الأكل
shot(15, camMove(C13, [150, 330, 1.25]), function (u, d, t) {
  var k = (t * 1.5) % 1, beams = "";
  for (var i = 0; i < 3; i++) { var kk = (k + i / 3) % 1; beams += '<path d="M' + f(150 - kk * 70) + ' ' + f(330 - kk * 30) + ' l-10 -4" stroke="#fff6b0" stroke-width="3" stroke-linecap="round" opacity="' + f(1 - kk) + '"/>'; }
  return kitchen(t) + mw(t, { on: true, mesh: true }) + beams + guy(62, 516, t, "happy", "point", 1.15, 1) + lbl("النور بيعدّي", 110, 280, u, 0.8) + check(160, 250, u, 1.6, 0.6);
});
// 16: فتحت الباب؟ مفتاح أمان بيقطع الموجات
shot(16, camPush(220, 318, 1.3, 1.45), function (u, d, t) {
  var open = ease((u - 0.5) / 0.8);
  return kitchen(t) + mw(t, { on: open < 0.3, cut: 1, waves: 1 - open, door: open, disp: open > 0.3 ? "STOP" : "1:30" }) +
    '<rect x="272" y="306" width="10" height="20" rx="2" fill="' + (open > 0.3 ? RED : "#4f9f5a") + '" stroke="' + O + '" stroke-width="1.5"/>' + ring(277, 316, 14, u, 1.2, t) + lbl("مفتاح أمان", 277, 216, u, 1.4) + check(320, 216, u, 2.2, 0.55);
});
// 17: شوكة حديد = شرار
shot(17, camMove(MW, [196, 320, 1.8]), function (u, d, t) {
  return kitchen(t) + mw(t, { on: true, food: "fork" }) + lbl("شرار!", 240, 262, u, 1.2, "r") + cross(150, 262, u, 2, 0.6);
});
// 18: التلج: الجزيئات متكتفة مش بتعرف تلف
shot(18, stay(C5), function (u, d, t) {
  var mols = "";
  for (var i = 0; i < 6; i++) { var mx = -55 + (i % 3) * 55, my = -26 + Math.floor(i / 3) * 52; mols += water(mx + Math.sin(t * 6 + i) * 1, my, (i % 2 ? 180 : 0) + Math.sin(t * 8 + i) * 4, 0.9, true); }
  var inner = '<rect x="-100" y="-100" width="200" height="200" fill="#bfe3f7" opacity=".35"/><path d="M-80 -52 H80 M-80 0 H80 M-80 52 H80 M-55 -80 V80 M0 -80 V80 M55 -80 V80" stroke="#e8f7ff" stroke-width="2" opacity=".6"/>' + mols + fieldArrow(t, -76, 2);
  return kitchen(t) + mw(t, { on: true, food: "ice" }) + lens(C5, 180, 190, 120, inner, clamp(u / 0.6), CX, 352) + lbl("تلج", 180, 300, u, 0.6) + cross(250, 110, u, 1.8, 0.6);
});
// 19: فك التلج: يشغّل ويطفي
shot(19, camMove(PAN, [230, 318, 1.4]), function (u, d, t) {
  var live = Math.sin(t * 2.2) > 0;
  return kitchen(t) + mw(t, { on: true, cut: 1, def: true, food: "ice", melt: clamp(u / d), disp: "DEF", waves: live ? 1 : 0 }) +
    lbl(live ? "تشغيل" : "إطفاء", 309, 250, u, 0.4, live ? "d" : "r") + ring(309, 304, 28, u, 0.2, t) + lbl("فك التلج", 230, 216, u, 1.0);
});
// 20: الصدفة: شوكولاتة ساحت جنب رادار
function lab(t) {
  var s = '<rect x="-300" y="-300" width="960" height="1240" fill="#c7cdb8"/><rect x="-300" y="440" width="960" height="500" fill="#6e6a5e"/><path d="M-300 440 H660" stroke="' + O + '" stroke-width="3"/>';
  s += '<rect x="180" y="200" width="150" height="240" rx="6" fill="#7f8a7a" stroke="' + O + '" stroke-width="3"/><rect x="196" y="218" width="118" height="70" rx="4" fill="#1d2a24" stroke="' + O + '" stroke-width="2"/>';
  var sw = (t * 1.3) % 1; s += '<path d="M206 252 L' + f(206 + sw * 98) + ' 252" stroke="#7dffa0" stroke-width="2"/><circle cx="' + f(206 + sw * 98) + '" cy="252" r="3" fill="#7dffa0"/>';
  for (var i = 0; i < 3; i++) s += '<circle cx="' + (214 + i * 40) + '" cy="320" r="13" fill="#d9d5cc" stroke="' + O + '" stroke-width="2"/><path d="M' + (214 + i * 40) + ' 320 l' + f(Math.cos(t + i) * 9) + ' ' + f(Math.sin(t + i) * 9) + '" stroke="' + O + '" stroke-width="2"/>';
  s += '<rect x="230" y="360" width="50" height="60" rx="4" fill="url(#mag)" stroke="' + O + '" stroke-width="2"/><circle cx="255" cy="390" r="18" fill="#ffd24a" opacity="' + f(0.3 + 0.2 * Math.sin(t * 10)) + '" filter="url(#glow)"/>';
  s += '<path d="M255 200 V150" stroke="' + O + '" stroke-width="4"/>' + T(255, 140, 1, '<path d="M-50 -10 Q0 40 50 -10" fill="#b9bfb0" stroke="' + O + '" stroke-width="3"/>', Math.sin(t * 0.8) * 12);
  return s;
}
var C20 = [180, 330, 1];
shot(20, stay(C20), function (u, d, t) {
  var melt = clamp((u - 1.5) / 2.5), inner = '<rect x="-100" y="-100" width="200" height="200" fill="#5d7d9a"/>' +
    '<path d="M-60 -40 H60 V' + f(20 + melt * 10) + ' Q30 ' + f(30 + melt * 40) + ' 0 ' + f(22 + melt * 20) + ' Q-30 ' + f(30 + melt * 30) + ' -60 ' + f(20 + melt * 8) + ' Z" fill="url(#choc)" stroke="' + O + '" stroke-width="3"/>' +
    '<path d="M-60 -10 H60 M-20 -40 V20 M20 -40 V20" stroke="#3a1f0e" stroke-width="2" opacity="' + f(1 - melt) + '"/>';
  return lab(t) + person(110, 516, t, { mood: u > 3 ? "shock" : "curious", pose: "stand", s: 1.25, shirt: "#e9e4d6", look: 1 }) +
    '<rect x="116" y="430" width="16" height="12" fill="#6b3d1f"/>' + lens(C20, 120, 200, 95, inner, clamp((u - 0.8) / 0.6), 124, 436) +
    lbl("رادار", 255, 104, u, 0.4) + lbl("ساحت!", 120, 316, u, 3, "r");
});
// 21: خرافة: من جوه لبرة؟
function chunk(x, y, t, mode, k) {
  var s = '<rect x="-90" y="-50" width="180" height="100" rx="26" fill="' + (mode === "real" ? "url(#meat)" : "#d79a8a") + '" stroke="' + O + '" stroke-width="3"/>';
  if (mode === "myth") { s += '<circle r="' + f(20 + k * 30) + '" fill="url(#hot)"/>'; for (var a = 0; a < 4; a++) { var ang = a * 1.5708; s += arrow(Math.cos(ang) * 12, Math.sin(ang) * 12, Math.cos(ang) * 62, Math.sin(ang) * 36, YEL, 3.5, k); } }
  if (mode === "real") { s += arrow(-86, 0, -58, 0, YEL, 3.5, k) + arrow(86, 0, 58, 0, YEL, 3.5, k);
    for (var i = 0; i < 3; i++) { var kk = (t * 0.8 + i / 3) % 1; s += '<circle cx="' + f(-60 + kk * 50) + '" cy="' + (-24 + i * 24) + '" r="4" fill="#ff8a3a" opacity="' + f(1 - kk) + '"/><circle cx="' + f(60 - kk * 50) + '" cy="' + (-24 + i * 24) + '" r="4" fill="#ff8a3a" opacity="' + f(1 - kk) + '"/>'; } }
  return T(x, y, 1, s);
}
shot(21, camPush(180, 300, 1.15, 1.25), function (u, d, t) {
  return kitchen(t, 0.15) + mw(t, { on: true, mesh: true }) + chunk(180, 180, t, "myth", ease((u - 0.3) / 1.2)) + lbl("من جوه لبرة؟", 180, 110, u, 0.5) + cross(270, 140, u, 1.8, 0.7) + lbl("خرافة", 270, 104, u, 2, "r");
});
// 22: الموجات بتدخل سنتي أو اتنين بس والباقي بالتوصيل
shot(22, stay([180, 300, 1.25]), function (u, d, t) {
  return kitchen(t, 0.15) + mw(t, { on: true, mesh: true }) + chunk(180, 180, t, "real", ease((u - 0.3) / 0.8)) +
    '<path d="M94 236 V244 H124 V236" stroke="#fff" stroke-width="2.5" fill="none"/>' + lbl("2 سم", 109, 262, u, 0.9, "d", 12) + lbl("بالتوصيل", 180, 110, u, d * 0.5) + check(260, 116, u, d * 0.6, 0.6);
});
// 23: قلّب في النص وسيبه دقيقة
shot(23, camMove([170, 330, 1.2], WIDE), function (u, d, t) {
  var half = u < d * 0.45, left = Math.max(0, 60 - Math.floor((u - d * 0.45) / (d * 0.55) * 60));
  return kitchen(t) + mw(t, { on: false, door: half ? 1 : 0, mesh: !half, heat: "even", disp: half ? "0:45" : "0:" + (left < 10 ? "0" : "") + left }) +
    guy(64, 516, t, "happy", half ? "point" : "stand", 1.1) + (half ? spoon(186 + Math.sin(t * 8) * 8, 352, Math.sin(t * 8) * 25) + lbl("قلّب", 190, 222, u, 0.4) : lbl("استنى دقيقة", 309, 222, u, d * 0.45 + 0.2));
});
// 24: ومبروك
shot(24, camPush(160, 330, 1.05, 1.2), function (u, d, t) {
  return kitchen(t) + mw(t, { on: false, door: 1, food: "none", disp: "0:00" }) + bowl(176, 396, t, "even", 1.2) + guy(70, 516, t, "happy", "cheer", 1.1) + sparkle(176, 340, t, "#fff3b0", 6) + check(250, 300, u, 1, 0.7);
});
// 25: قولولنا
shot(25, camPush(200, 300, 1, 1.1), function (u, d, t) {
  return kitchen(t) + mw(t, { on: true, mesh: true, disp: "?" }) + guy(58, 516, t, "happy", "wave") + lbl("قولولنا!", 222, 200, u, 0.3, "r", 18) + qmark(300, 170, t, 50, YEL);
});
