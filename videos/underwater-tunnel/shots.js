// «إزاي بيبنوا نفق تحت البحر؟»: مشهد لكل سطر من script.txt
// اللوحة هنا طولية: الجزء الظاهر من العالم تقريباً x من 0 لـ640، وy من -167 لـ527 (المركز 320، 180).
// المقطع العرضي ثابت تقريباً في كل المشاهد: سما فوق، سطح البحر عند y≈20، القاع عند y≈300، والصخر تحته.

// ── ألوان ─────────────────────────────────────────────
var SAND = "#d8b679", ROCK = "#8a6f55", ROCK2 = "#6e5642", CONC = "#cfc9bc", CONC2 = "#a9a294", YEL = "#f2c230", ORG = "#f28c28", WATER = "#2b86b5";

// ── أشكال خاصة بالفيديو ده ─────────────────────────────
function rnd(n) { return f(n); }
function g(x, y, s, inner, rot) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ')' + (rot ? ' rotate(' + f(rot) + ')' : '') + ' scale(' + (s || 1) + ')">' + inner + '</g>'; }

// قاع البحر: رمل وتحته طبقات صخر فيها زلط
function seabed(t, bed) {
  var d = "M-400 " + bed;
  for (var x = -400; x <= 1040; x += 40) d += " L" + x + " " + f(bed + Math.sin(x * 0.03) * 6);
  var s = '<rect x="-400" y="' + (bed + 34) + '" width="1440" height="700" fill="' + ROCK + '"/>' +
    '<rect x="-400" y="' + (bed + 200) + '" width="1440" height="600" fill="' + ROCK2 + '"/>' +
    '<path d="' + d + ' L1040 ' + (bed + 40) + ' L-400 ' + (bed + 40) + ' Z" fill="' + SAND + '" stroke="' + INK + '" stroke-width="3"/>';
  for (var i = 0; i < 70; i++) { var px = -300 + hash(i) * 1240, py = bed + 50 + hash(i + 9) * 330; s += '<ellipse cx="' + f(px) + '" cy="' + f(py) + '" rx="' + f(5 + hash(i + 3) * 9) + '" ry="' + f(3 + hash(i + 4) * 5) + '" fill="' + (i % 2 ? "#9b8064" : "#5e4a38") + '" opacity=".8"/>'; }
  return s;
}
// زرع بحري بيتمايل على القاع
function weeds(t, bed) {
  var s = "";
  for (var i = 0; i < 14; i++) { var x = -60 + i * 56 + hash(i) * 20, h = 26 + hash(i + 2) * 30, sw = Math.sin(t * 1.8 + i) * 8; s += '<path d="M' + f(x) + ' ' + f(bed + 4) + ' q' + f(sw) + ' ' + f(-h / 2) + ' ' + f(sw * 0.4) + ' ' + f(-h) + '" stroke="#3f8a5a" stroke-width="5" fill="none" stroke-linecap="round"/>'; }
  return s;
}
// سمك بيعوم
function fishes(t, y0, y1, n) {
  var s = ""; n = n || 6;
  for (var i = 0; i < n; i++) {
    var dir = i % 2 ? 1 : -1, sp = 30 + hash(i) * 30, x = ((t * sp * dir + i * 260) % 1100 + 1100) % 1100 - 230, y = y0 + hash(i + 5) * (y1 - y0) + Math.sin(t * 2 + i) * 6, col = ["#f2a03a", "#f2c230", "#e8604a", "#7fc4ff"][i % 4];
    s += '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + dir + ' 1)"><path d="M-14 0 C-6 -9 8 -9 14 0 C8 9 -6 9 -14 0 Z" fill="' + col + '" stroke="' + INK + '" stroke-width="1.8"/><path d="M-14 0 L-22 -7 L-22 7 Z" fill="' + col + '" stroke="' + INK + '" stroke-width="1.8"/><circle cx="7" cy="-2" r="1.8" fill="' + INK + '"/></g>';
  }
  return s;
}
// فقاقيع طالعة لفوق
function bubbles(t, x, y, n, h) {
  var s = ""; n = n || 6; h = h || 120;
  for (var i = 0; i < n; i++) { var k = (t * 0.5 + hash(i)) % 1; s += '<circle cx="' + f(x + Math.sin(t * 3 + i) * 6 + (hash(i + 1) - 0.5) * 30) + '" cy="' + f(y - k * h) + '" r="' + f(3 + hash(i + 2) * 4) + '" fill="#e8f6ff" fill-opacity=".35" stroke="#fff" stroke-width="1.5" opacity="' + f(1 - k) + '"/>'; }
  return s;
}
// العالم كله: سما + بحر + قاع (surf = سطح المية، bed = القاع)
function world(t, surf, bed, o) {
  o = o || {}; surf = surf == null ? 20 : surf; bed = bed == null ? 300 : bed;
  var s = sky(o.sky || "day") + (o.sun === false ? "" : sun(520, surf - 110, 26)) + clouds(t, 14, surf - 150, 4, 0.9) + birds(t, surf - 80, 30);
  s += sea(t, surf) + '<rect x="-400" y="' + (surf + 120) + '" width="1440" height="' + (bed - surf) + '" fill="#123f66" opacity=".25"/>';
  s += fishes(t, surf + 50, bed - 40, o.fish == null ? 5 : o.fish) + seabed(t, bed) + weeds(t, bed);
  return s;
}
// مركب شحن على السطح بيتهز مع الموج
function ship(x, y, t, s) {
  var bob = Math.sin(t * 2.2 + x) * 2.5, rot = Math.sin(t * 1.6 + x) * 1.6, c = ["#c23a26", "#2f6f9f", YEL, "#4f8f5a", "#e8604a", "#2f6f9f"], box = "";
  for (var i = 0; i < 6; i++) box += '<rect x="' + (-70 + i * 22) + '" y="-36" width="21" height="18" fill="' + c[i] + '" stroke="' + INK + '" stroke-width="1.6"/>';
  for (var j = 0; j < 4; j++) box += '<rect x="' + (-60 + j * 22) + '" y="-54" width="21" height="18" fill="' + c[(j + 3) % 6] + '" stroke="' + INK + '" stroke-width="1.6"/>';
  return g(x, y + bob, s, box + '<rect x="56" y="-62" width="22" height="44" fill="#f4f1e8" stroke="' + INK + '" stroke-width="2"/><rect x="60" y="-56" width="14" height="6" fill="#cfe1ec"/><path d="M-96 -18 H100 L84 14 H-84 Z" fill="#8f2618" stroke="' + INK + '" stroke-width="2.6"/><path d="M-90 -6 H96" stroke="#f4f1e8" stroke-width="3"/>' + '<path d="M66 -62 v-14" stroke="' + INK + '" stroke-width="3"/>', rot);
}
// قاطرة صغيرة
function tug(x, y, t, s, flip) {
  var bob = Math.sin(t * 3 + x) * 2.5;
  return '<g transform="translate(' + f(x) + ' ' + f(y + bob) + ') scale(' + f((s || 1) * (flip ? -1 : 1)) + ' ' + (s || 1) + ')"><path d="M-40 -8 H40 L30 12 H-34 Z" fill="#c23a26" stroke="' + INK + '" stroke-width="2.4"/><rect x="-16" y="-30" width="30" height="22" fill="#f4f1e8" stroke="' + INK + '" stroke-width="2"/><rect x="-10" y="-24" width="8" height="7" fill="#cfe1ec"/><rect x="2" y="-24" width="8" height="7" fill="#cfe1ec"/><rect x="-6" y="-44" width="8" height="14" fill="' + INK + '"/>' + '<circle cx="-2" cy="' + f(-52 - ((t * 20) % 16)) + '" r="' + f(4 + ((t * 20) % 16) / 3) + '" fill="#ddd" opacity="' + f(0.8 - ((t * 20) % 16) / 24) + '"/></g>';
}
// نفق خرسانة (طولي) من x1 لـx2، ونصه عند y، وجواه عربيات ماشية ونور
function tube(t, x1, x2, y, h, o) {
  o = o || {}; h = h || 70; var w = x2 - x1, s = "";
  s += '<rect x="' + f(x1) + '" y="' + f(y - h / 2) + '" width="' + f(w) + '" height="' + f(h) + '" rx="' + f(h / 2) + '" fill="' + CONC + '" stroke="' + INK + '" stroke-width="3.2"/>';
  s += '<rect x="' + f(x1 + 8) + '" y="' + f(y - h / 2 + 9) + '" width="' + f(w - 16) + '" height="' + f(h - 18) + '" rx="' + f(h / 2 - 9) + '" fill="#3c3f45"/>';
  for (var lx = x1 + 30; lx < x2 - 20; lx += 46) { var on = ((t * 3 + lx * 0.05) % 2) < 1.6; s += '<rect x="' + f(lx) + '" y="' + f(y - h / 2 + 12) + '" width="16" height="4" rx="2" fill="' + (on ? "#fff3b0" : "#9a9070") + '"/>'; }
  s += '<rect x="' + f(x1 + 10) + '" y="' + f(y + h / 2 - 16) + '" width="' + f(w - 20) + '" height="5" fill="#6d6a66"/>';
  if (o.cars !== false) for (var i = 0; i < 4; i++) { var dir = i % 2 ? 1 : -1, cx = x1 + 30 + ((t * 70 * dir + i * (w / 4)) % (w - 60) + (w - 60)) % (w - 60); s += '<g transform="translate(' + f(cx) + ' ' + f(y + h / 2 - 18) + ') scale(' + dir + ' 1)">' + car(0, 0, ["#2f6f9f", "#e2b035", "#f4f1e8", "#4f8f5a"][i], 1.1) + '</g>'; }
  return s;
}
// ماكينة الحفر TBM من الجنب: x = طرف العجلة قدام، dir = 1 يعني رايحة يمين
function tbm(x, y, t, s, dir) {
  dir = dir || 1; var sp = "", spin = t * 4;
  for (var i = 0; i < 6; i++) { var yy = Math.sin(spin + i * 1.05) * 46; sp += '<path d="M-6 ' + f(yy) + ' h12" stroke="' + INK + '" stroke-width="3" opacity="' + f(0.4 + 0.6 * Math.abs(Math.cos(spin + i * 1.05))) + '"/>'; }
  var body = '<rect x="-250" y="-48" width="236" height="96" fill="url(#gMetal)" stroke="' + INK + '" stroke-width="3"/>' +
    '<rect x="-250" y="-48" width="236" height="20" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2"/>' +
    '<path d="M-200 -28 V48 M-140 -28 V48 M-80 -28 V48" stroke="' + INK + '" stroke-width="1.6" opacity=".5"/>' +
    '<rect x="-24" y="-56" width="26" height="112" rx="8" fill="' + ORG + '" stroke="' + INK + '" stroke-width="3"/>' + sp +
    '<circle cx="-170" cy="-38" r="5" fill="' + ((t * 2) % 1 < 0.5 ? "#ff5a3a" : "#7a2a1a") + '" stroke="' + INK + '" stroke-width="1.5"/>' +
    '<circle cx="-110" cy="-38" r="5" fill="' + ((t * 2 + 0.5) % 1 < 0.5 ? "#ff5a3a" : "#7a2a1a") + '" stroke="' + INK + '" stroke-width="1.5"/>' +
    '<text x="-130" y="16" text-anchor="middle" style="font:900 30px Noto Sans Arabic;fill:' + INK + '" transform="scale(' + dir + ' 1)' + (dir < 0 ? ' translate(260 0)' : '') + '">TBM</text>';
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f((s || 1) * dir) + ' ' + (s || 1) + ')">' + body + '</g>';
}
// وش العجلة من قدام: بتلف وعليها سكاكين
function cutter(x, y, r, t) {
  var s = '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r + 10) + '" fill="#5e4a38" stroke="' + INK + '" stroke-width="3"/>' + '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '" fill="' + ORG + '" stroke="' + INK + '" stroke-width="4"/>', a0 = t * 1.6;
  for (var i = 0; i < 6; i++) {
    var a = a0 + i * 1.047, ex = x + Math.cos(a) * r * 0.95, ey = y + Math.sin(a) * r * 0.95;
    s += '<path d="M' + f(x) + ' ' + f(y) + ' L' + f(ex) + ' ' + f(ey) + '" stroke="#c76a1a" stroke-width="22" stroke-linecap="round"/><path d="M' + f(x) + ' ' + f(y) + ' L' + f(ex) + ' ' + f(ey) + '" stroke="' + INK + '" stroke-width="2" opacity=".4"/>';
    for (var k = 1; k <= 3; k++) { var cx = x + Math.cos(a) * r * k * 0.28, cy = y + Math.sin(a) * r * k * 0.28; s += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="9" fill="url(#gMetal)" stroke="' + INK + '" stroke-width="2"/><circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="3" fill="#ddd"/>'; }
  }
  return s + '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r * 0.16) + '" fill="url(#gMetal)" stroke="' + INK + '" stroke-width="3"/>';
}
// حتت صخر طايرة من نقطة
function debris(x, y, t, n, spread) {
  var s = ""; n = n || 12; spread = spread || 160;
  for (var i = 0; i < n; i++) { var k = (t * 1.3 + hash(i)) % 1, a = hash(i + 3) * 6.283, d = k * spread; s += '<rect x="' + f(x + Math.cos(a) * d) + '" y="' + f(y + Math.sin(a) * d + k * k * 40) + '" width="' + f(6 + hash(i) * 8) + '" height="' + f(5 + hash(i + 1) * 6) + '" fill="' + (i % 2 ? "#9b8064" : "#6e5642") + '" stroke="' + INK + '" stroke-width="1.2" transform="rotate(' + f(t * 200 + i * 40) + ' ' + f(x + Math.cos(a) * d) + ' ' + f(y + Math.sin(a) * d) + ')" opacity="' + f(1 - k) + '"/>'; }
  return s;
}
// حلقات خرسانة (نفق محفور) من x1 لـx2 وراء الماكينة، n = عدد الحلقات الظاهرة
function rings(x1, x2, y, h, n) {
  var s = '<rect x="' + f(x1) + '" y="' + f(y - h / 2) + '" width="' + f(x2 - x1) + '" height="' + f(h) + '" fill="#4a4c52"/>', step = 26;
  for (var i = 0; i < n; i++) { var x = x2 - (i + 1) * step; if (x < x1) break; s += '<rect x="' + f(x) + '" y="' + f(y - h / 2) + '" width="' + (step - 2) + '" height="14" fill="' + CONC + '" stroke="' + INK + '" stroke-width="1.8"/><rect x="' + f(x) + '" y="' + f(y + h / 2 - 14) + '" width="' + (step - 2) + '" height="14" fill="' + CONC + '" stroke="' + INK + '" stroke-width="1.8"/>'; }
  return s;
}
// سير بيشيل طين
function conveyor(x1, x2, y, t) {
  var s = '<rect x="' + f(x1) + '" y="' + f(y) + '" width="' + f(x2 - x1) + '" height="12" rx="6" fill="#3a3a3a" stroke="' + INK + '" stroke-width="2"/>';
  for (var x = x1 + 10; x < x2; x += 40) s += '<circle cx="' + f(x) + '" cy="' + f(y + 6) + '" r="4" fill="#888"/><path d="M' + f(x) + ' ' + f(y + 12) + ' v22" stroke="#555" stroke-width="3"/>';
  var w = x2 - x1;
  for (var i = 0; i < 10; i++) { var cx = x1 + ((t * 60 + i * w / 10) % w); s += '<ellipse cx="' + f(cx) + '" cy="' + f(y - 6) + '" rx="13" ry="8" fill="#7a5a3a" stroke="' + INK + '" stroke-width="1.6"/>'; }
  return s;
}
// قطعة نفق جاهزة للتغريق: صندوق خرسانة مقفول من الناحيتين
function element(x, y, w, h, o) {
  o = o || {}; var s = '<rect x="' + f(x - w / 2) + '" y="' + f(y - h / 2) + '" width="' + f(w) + '" height="' + f(h) + '" rx="10" fill="' + CONC + '" stroke="' + INK + '" stroke-width="3.2"/>';
  s += '<rect x="' + f(x - w / 2) + '" y="' + f(y + h / 2 - 12) + '" width="' + f(w) + '" height="12" fill="' + CONC2 + '" opacity=".7"/>';
  for (var i = 1; i < 4; i++) s += '<path d="M' + f(x - w / 2 + i * w / 4) + ' ' + f(y - h / 2 + 4) + ' v' + f(h - 8) + '" stroke="' + INK + '" stroke-width="1.4" opacity=".35"/>';
  if (o.ends !== false) s += '<rect x="' + f(x - w / 2 - 8) + '" y="' + f(y - h / 2 + 4) + '" width="12" height="' + f(h - 8) + '" rx="3" fill="#c23a26" stroke="' + INK + '" stroke-width="2.4"/><rect x="' + f(x + w / 2 - 4) + '" y="' + f(y - h / 2 + 4) + '" width="12" height="' + f(h - 8) + '" rx="3" fill="#c23a26" stroke="' + INK + '" stroke-width="2.4"/>';
  return s;
}
// غطاس
function diver(x, y, t, flip) {
  var kick = Math.sin(t * 6) * 10;
  return '<g transform="translate(' + f(x) + ' ' + f(y + Math.sin(t * 2 + x) * 5) + ') scale(' + (flip ? -1 : 1) + ' 1)"><rect x="-26" y="-18" width="20" height="10" rx="5" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2"/><path d="M-30 0 C-20 -10 18 -10 26 0 C18 8 -20 8 -30 0 Z" fill="#1c1c1c"/><circle cx="30" cy="-4" r="11" fill="#fbfbf7" stroke="' + INK + '" stroke-width="2.4"/><rect x="28" y="-10" width="12" height="9" rx="3" fill="#7fc4ff" stroke="' + INK + '" stroke-width="2"/><path d="M-30 0 L-48 ' + f(-6 + kick) + ' M-30 2 L-48 ' + f(8 - kick) + '" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/><path d="M-52 ' + f(-10 + kick) + ' l-10 4 l4 6 Z M-52 ' + f(4 - kick) + ' l-10 4 l4 6 Z" fill="' + ORG + '" stroke="' + INK + '" stroke-width="1.5"/><path d="M14 2 L34 14" stroke="#1c1c1c" stroke-width="5" stroke-linecap="round"/></g>' + bubbles(t, x + 34, y - 10, 4, 80);
}
// روبوت تحت المية (ROV)
function rov(x, y, t) {
  var prop = Math.sin(t * 30) * 8;
  return '<g transform="translate(' + f(x) + ' ' + f(y + Math.sin(t * 1.7) * 4) + ')"><rect x="-34" y="-22" width="68" height="40" rx="6" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2.6"/><rect x="-34" y="-22" width="68" height="10" fill="#e2b035" stroke="' + INK + '" stroke-width="2"/><circle cx="22" cy="2" r="8" fill="#cfe1ec" stroke="' + INK + '" stroke-width="2"/><circle cx="22" cy="2" r="3" fill="' + ((t * 2) % 1 < 0.5 ? "#ff5a3a" : "#333") + '"/><path d="M-34 0 h-10 M-44 ' + f(-prop) + ' v' + f(prop * 2) + '" stroke="' + INK + '" stroke-width="3"/><path d="M0 -22 C0 -60 -30 -80 -30 -140" stroke="' + INK + '" stroke-width="2" fill="none" stroke-dasharray="6 4"/><path d="M34 14 l16 10 l8 -6" stroke="' + INK + '" stroke-width="4" fill="none" stroke-linecap="round"/></g>';
}
// كراكة: مركب عليه ونش بيكبش من القاع
function dredger(x, surf, t, grabY) {
  var gy = grabY, open = Math.sin(t * 2) > 0 ? 8 : 2;
  return ship(x, surf, t, 0.9).replace(/<rect x="-?\d+" y="-(36|54)"[^>]*\/>/g, "") +
    '<path d="M' + f(x - 20) + ' ' + f(surf - 20) + ' L' + f(x - 20) + ' ' + f(surf - 110) + ' L' + f(x - 110) + ' ' + f(surf - 60) + '" stroke="' + YEL + '" stroke-width="9" fill="none" stroke-linejoin="round"/><path d="M' + f(x - 20) + ' ' + f(surf - 110) + ' L' + f(x - 110) + ' ' + f(surf - 60) + '" stroke="' + INK + '" stroke-width="2" fill="none"/>' +
    '<path d="M' + f(x - 110) + ' ' + f(surf - 60) + ' V' + f(gy - 16) + '" stroke="' + INK + '" stroke-width="2.5"/>' +
    '<path d="M' + f(x - 124 - open) + ' ' + f(gy) + ' L' + f(x - 110) + ' ' + f(gy - 18) + ' L' + f(x - 96 + open) + ' ' + f(gy) + ' Q' + f(x - 110) + ' ' + f(gy + 14) + ' ' + f(x - 124 - open) + ' ' + f(gy) + ' Z" fill="url(#gMetal)" stroke="' + INK + '" stroke-width="2.4"/>';
}
// سحابة طين
function mud(x, y, t, r) { var s = ""; for (var i = 0; i < 6; i++) { var a = i * 1.05 + t * 0.6, rr = (r || 40) * (0.6 + 0.4 * Math.sin(t * 1.5 + i)); s += '<circle cx="' + f(x + Math.cos(a) * rr * 0.7) + '" cy="' + f(y + Math.sin(a) * rr * 0.4) + '" r="' + f(rr * 0.6) + '" fill="#b89a70" opacity=".45" filter="url(#soft)"/>'; } return s; }
// طلمبة ومروحة
function pump(x, y, t) { var k = (t * 1.5) % 1; return '<g transform="translate(' + f(x) + ' ' + f(y) + ')"><rect x="-26" y="-34" width="52" height="34" rx="6" fill="#2f6f9f" stroke="' + INK + '" stroke-width="2.6"/><circle cx="0" cy="-17" r="10" fill="url(#gMetal)" stroke="' + INK + '" stroke-width="2"/><path d="M0 -17 L' + f(Math.cos(t * 9) * 9) + ' ' + f(-17 + Math.sin(t * 9) * 9) + '" stroke="' + INK + '" stroke-width="2.5"/><path d="M26 -20 H46 V-70" stroke="#5a5f66" stroke-width="8" fill="none"/></g>' + '<path d="M' + f(x - 50) + ' ' + f(y - 4 - k * 0) + ' q4 ' + f(-8) + ' 8 0 q-4 6 -8 0" fill="#7fc4ff" opacity="' + f(1 - k) + '" transform="translate(' + f(k * 30) + ' 0)"/>'; }
function fan(x, y, r, t) { var s = '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '" fill="#3c3f45" stroke="' + INK + '" stroke-width="3"/>'; for (var i = 0; i < 4; i++) { var a = t * 8 + i * 1.571; s += '<path d="M' + f(x) + ' ' + f(y) + ' Q' + f(x + Math.cos(a) * r * 0.8 + Math.cos(a + 1.2) * r * 0.3) + ' ' + f(y + Math.sin(a) * r * 0.8 + Math.sin(a + 1.2) * r * 0.3) + ' ' + f(x + Math.cos(a + 0.5) * r * 0.85) + ' ' + f(y + Math.sin(a + 0.5) * r * 0.85) + ' Z" fill="#cfd6de" stroke="' + INK + '" stroke-width="1.6"/>'; } return s + '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r * 0.15) + '" fill="' + INK + '"/>'; }
// علم بيرفرف: "uk" أو "fr"
function flag(x, y, kind, t) {
  var w = Math.sin(t * 4) * 3, inner;
  if (kind === "fr") inner = '<rect x="0" y="0" width="20" height="40" fill="#2f4fa0"/><rect x="20" y="0" width="20" height="40" fill="#fff"/><rect x="40" y="0" width="20" height="40" fill="#d23a30"/>';
  else inner = '<rect width="60" height="40" fill="#24407f"/><path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" stroke-width="7"/><path d="M0 0 L60 40 M60 0 L0 40" stroke="#c8202e" stroke-width="2.5"/><path d="M30 0 V40 M0 20 H60" stroke="#fff" stroke-width="12"/><path d="M30 0 V40 M0 20 H60" stroke="#c8202e" stroke-width="7"/>';
  return '<path d="M' + f(x) + ' ' + f(y + 60) + ' V' + f(y - 4) + '" stroke="' + INK + '" stroke-width="4"/><g transform="translate(' + f(x + 2) + ' ' + f(y) + ') skewY(' + f(w) + ')">' + inner + '<rect width="60" height="40" fill="none" stroke="' + INK + '" stroke-width="2.4"/></g>';
}
// مسطرة صغيرة بتنبض
function ruler(x, y, w, t, txt) {
  var k = 1 + Math.sin(t * 5) * 0.04, s = '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')"><rect x="' + f(-w / 2) + '" y="-14" width="' + f(w) + '" height="28" rx="3" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2.4"/>';
  for (var i = 0; i <= 10; i++) s += '<path d="M' + f(-w / 2 + 6 + i * (w - 12) / 10) + ' -14 v' + (i % 5 ? 8 : 14) + '" stroke="' + INK + '" stroke-width="1.8"/>';
  return s + (txt ? '<text x="0" y="10" text-anchor="middle" style="font:900 13px Noto Sans Arabic;fill:' + INK + '">' + txt + '</text>' : '') + '</g>';
}
// ميزان بكفتين بيتهز
function balance(x, y, t, tilt) {
  var a = (tilt || 0) + Math.sin(t * 2.4) * 3, r = a * Math.PI / 180, lx = x - Math.cos(r) * 80, ly = y - Math.sin(r) * 80, rx = x + Math.cos(r) * 80, ry = y + Math.sin(r) * 80;
  return '<path d="M' + f(x) + ' ' + f(y) + ' V' + f(y + 90) + ' M' + f(x - 34) + ' ' + f(y + 90) + ' H' + f(x + 34) + '" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/><path d="M' + f(lx) + ' ' + f(ly) + ' L' + f(rx) + ' ' + f(ry) + '" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/>' +
    '<path d="M' + f(lx) + ' ' + f(ly) + ' l-24 40 h48 Z" fill="none" stroke="' + INK + '" stroke-width="2"/><path d="M' + f(lx - 30) + ' ' + f(ly + 40) + ' h60 q-30 18 -60 0" fill="#7a5a3a" stroke="' + INK + '" stroke-width="2.4"/>' +
    '<path d="M' + f(rx) + ' ' + f(ry) + ' l-24 40 h48 Z" fill="none" stroke="' + INK + '" stroke-width="2"/><path d="M' + f(rx - 30) + ' ' + f(ry + 40) + ' h60 q-30 18 -60 0" fill="' + WATER + '" stroke="' + INK + '" stroke-width="2.4"/>' +
    '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="8" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2.4"/>';
}
// الشمس والقمر بيلفوا (يوم بيعدي)
function dayCycle(t, cx, cy, r) { var a = t * 1.2; return sun(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.5, 22) + moon(cx - Math.cos(a) * r, cy - Math.sin(a) * r * 0.5); }
// المشهد الأساسي: قناة السويس ومركب فوق والنفق تحت
function canalScene(t) {
  return world(t, 20, 250) + ship(300, 20, t, 1.15) + tug(560, 22, t, 0.7, true) + tube(t, -200, 840, 400, 86) +
    '<path d="M-400 250 C-200 230 -120 170 -60 20 L-400 20 Z" fill="' + SAND + '" stroke="' + INK + '" stroke-width="3"/>' + '<path d="M1040 250 C840 230 760 170 700 20 L1040 20 Z" fill="' + SAND + '" stroke="' + INK + '" stroke-width="3"/>';
}

// ── المشاهد ─────────────────────────────────────────────
// 0: حاجة نعرفها: مركب فوق في القناة، وعربيات بتعدي في نفق تحته
shot(0, camMove([320, 230, 1.12], [320, 180, 1.0]), function (u, d, t) {
  return canalScene(t) + tag("قناة السويس", 320, -82, u, 0.5, -3, 28) + tag("سينا ←", 520, 470, u, 2.2, 2, 22, "#bfe0ff");
});
// 1: واحد بيحفر في القاع والمية بتغرّقه
shot(1, camPush(320, 200, 1, 1.12), function (u, d, t) {
  var lvl = Math.max(0, 1 - u / d) * 110, hole = '<path d="M200 300 L230 470 H410 L440 300 Z" fill="#4a3a2c" stroke="' + INK + '" stroke-width="3"/>' + '<rect x="214" y="' + f(360 + lvl) + '" width="212" height="' + f(130 - lvl) + '" fill="' + WATER + '" opacity=".85"/>';
  return world(t, 20, 300) + hole + person(320, 470 - (110 - lvl) * 0.2, t, { mood: "shock", hat: "hard", pose: "cheer" }) + bubbles(t, 320, 330, 8, 140) + arrow(200, 160, 260, 320, "#7fc4ff", 8, ease(u / 1)) + arrow(440, 160, 380, 320, "#7fc4ff", 8, ease(u / 1)) + qmark(520, 220, t, 110) + tag("تحفر تحت المية؟", 320, -82, u, 0.4, -3, 28);
});
// 2: وزن البحر كله ضاغط على النفق
shot(2, camPush(320, 220, 1, 1.1), function (u, d, t) {
  var s = world(t, -40, 300) + tube(t, -100, 740, 400, 80);
  for (var i = 0; i < 5; i++) { var x = 120 + i * 100, k = (t * 0.9 + i * 0.2) % 1; s += arrow(x, 20 + k * 40, x, 120 + k * 120, "#ffffff", 7, 1) ; }
  return s + tag("وزن البحر كله!", 320, -82, u, 0.8, -3, 30) + qmark(560, 260, t, 80);
});
// 3: طريقتين: الأولى الحفر تحت القاع
shot(3, camPush(320, 220, 1, 1.08), function (u, d, t) {
  var hl = 0.6 + 0.4 * Math.abs(Math.sin(t * 3));
  return world(t, 20, 260) + '<rect x="60" y="330" width="520" height="110" rx="20" fill="none" stroke="' + YEL + '" stroke-width="6" stroke-dasharray="16 10" opacity="' + f(hl) + '"/>' + rings(80, 420, 385, 74, 14) + tbm(540, 385, t, 0.55) + debris(560, 385, t, 8, 60) +
    tag("١", 120, 120, u, 0.3, 0, 40) + tag("٢", 520, 120, u, 0.6, 0, 40, "#bfe0ff") + tag("الأولى: نحفر تحت القاع", 320, 490, u, 1.4, -2, 24);
});
// 4: ماكينة الـTBM
shot(4, camMove([200, 260, 1.15], [330, 250, 1.0]), function (u, d, t) {
  var x = 360 + u * 20;
  return world(t, -60, 140, { fish: 3 }) + rings(-300, x - 250, 280, 150, 30) + tbm(x + 140, 280, t, 1.25) + debris(x + 150, 280, t, 14, 120) + pulse(x + 140, 280, t, YEL, 80) + tag("TBM", 330, 420, u, 0.5, -3, 40) + tag("ماكينة حفر الأنفاق", 330, 480, u, 1.6, 2, 24, "#bfe0ff");
});
// 5: وش العجلة بالسكاكين بيطحن الصخر
shot(5, camPush(320, 190, 1, 1.15), function (u, d, t) {
  return fill(ROCK2) + seabed(t, -400) + cutter(320, 190, 190, t) + debris(320, 190, t, 22, 300) + tag("سكاكين فولاذ", 320, -82, u, 0.8, -3, 30) + tag("بتطحن الصخر", 320, 460, u, 2.2, 2, 24, "#bfe0ff");
});
// 6: وراها على طول بتتركب حلقات خرسانة
shot(6, camPan(260, 360, 230, 1.05), function (u, d, t) {
  var n = Math.floor(u * 3.2) + 2, arm = Math.sin(t * 3) * 30;
  return fill(ROCK) + seabed(t, -500) + rings(-200, 300, 230, 170, n) + tbm(600, 230, t, 1.4) + '<path d="M300 230 L' + f(270 + arm) + ' ' + f(170 + arm * 0.3) + '" stroke="' + YEL + '" stroke-width="14" stroke-linecap="round"/><rect x="' + f(250 + arm) + '" y="' + f(150 + arm * 0.3) + '" width="26" height="18" fill="' + CONC + '" stroke="' + INK + '" stroke-width="2"/>' + tag("حلقات خرسانة", 260, 60, u, 0.8, -3, 30) + tag("قبل ما المية تدخل", 260, 410, u, 3.0, 2, 24, "#bfe0ff");
});
// 7: الماكينة بتضغط على التربة بنفس ضغط المية
shot(7, camPush(320, 210, 1, 1.08), function (u, d, t) {
  var k = 0.5 + 0.5 * Math.sin(t * 4);
  return world(t, -80, 120, { fish: 3 }) + rings(-300, 0, 330, 130, 10) + tbm(200, 330, t, 1) + arrow(220, 330, 300 + k * 10, 330, ORG, 10, 1) + arrow(470, 330, 390 - k * 10, 330, "#7fc4ff", 10, 1) + '<text x="345" y="344" text-anchor="middle" style="font:900 40px Noto Sans Arabic;fill:#fff;stroke:' + INK + ';stroke-width:4;paint-order:stroke">=</text>' + balance(320, -40, t, 0) + tag("نفس الضغط", 320, 470, u, 1.2, -3, 28);
});
// 8: الطين بيطلع على سيور لبره
shot(8, camPan(380, 260, 240, 1.05), function (u, d, t) {
  return fill(ROCK) + seabed(t, -500) + rings(-300, 640, 230, 200, 40) + conveyor(-200, 600, 260, t) + tbm(800, 230, t, 1.5) + arrow(400, 150, 100, 150, YEL, 9, ease(u / 1.5)) + tag("سيور لبره النفق", 260, 60, u, 0.7, -3, 28) + person(160, 330, t, { hat: "hard", mood: "happy", pose: "point", s: 0.9, shirt: ORG });
});
// 9: الحفر بطيء: عشرين لتلاتين متر في اليوم
shot(9, camPush(320, 200, 1, 1.1), function (u, d, t) {
  return sky("day") + dayCycle(t, 320, -60, 230) + clouds(t, 30, -120, 4, 0.8) + '<rect x="-400" y="40" width="1440" height="600" fill="' + ROCK + '"/>' + seabed(t, 40) + rings(-200, 180 + u * 8, 260, 110, 20) + tbm(330 + u * 8, 260, t, 0.75) + counter(320, 160, u, 0.8, 2.5, 0, 30, " متر", 62) + label("في اليوم بس", 320, 205, 26, "#fff", 900) + tag("بطيء!", 320, 420, u, 0.4, -3, 30);
});
// 10: الطريقة التانية: تبني على الأرض وتغرّق
shot(10, camPush(320, 220, 1, 1.08), function (u, d, t) {
  var drop = ease(clamp((u - 1.8) / 1.6)), y = lerp(15, 330, drop);
  return world(t, 120, 400) + '<path d="M-400 120 H140 L180 100 V60 H-400 Z" fill="' + SAND + '" stroke="' + INK + '" stroke-width="3"/>' + element(lerp(20, 380, drop), y, 260, 90) + (drop > 0.05 && drop < 0.6 ? bubbles(t, 380, 200, 10, 120) : "") + tag("٢", 120, -78, u, 0.2, 0, 40, "#bfe0ff") + tag("تبنيه وتغرّقه!", 320, 470, u, 0.9, -3, 30) + qmark(520, -40, t, 90);
});
// 11: كراكة بتحفر خندق في القاع
shot(11, camPush(320, 200, 1, 1.1), function (u, d, t) {
  var gy = 300 + Math.sin(t * 1.6) * 40;
  return world(t, 0, 320) + '<path d="M60 324 C120 324 140 400 200 400 H440 C500 400 520 324 580 324 Z" fill="#6e5642" stroke="' + INK + '" stroke-width="3"/>' + dredger(400, 0, t, gy) + mud(300, 370, t, 60) + tag("خندق في القاع", 320, 470, u, 0.6, -3, 28);
});
// 12: حوض جاف بيصبّوا فيه قطع النفق
shot(12, camPush(320, 210, 1, 1.1), function (u, d, t) {
  var fillH = clamp(u / d) * 120, hook = Math.sin(t * 1.4) * 20;
  return sky("day") + sun(520, -100, 26) + clouds(t, 14, -140, 4, 0.9) + sea(t, 120).replace('x="-400"', 'x="560"') + '<rect x="-400" y="120" width="960" height="600" fill="' + SAND + '"/>' + '<path d="M40 140 V400 H520 V140" fill="#bdb6a4" stroke="' + INK + '" stroke-width="4"/>' +
    element(280, 340, 420, 110) + '<rect x="70" y="' + f(395 - fillH * 0.4) + '" width="420" height="' + f(fillH * 0.4) + '" fill="#8f8a7f" opacity=".5"/>' +
    '<path d="M560 400 V-60 H160" stroke="' + YEL + '" stroke-width="12" fill="none"/><path d="M' + f(240 + hook) + ' -60 V180" stroke="' + INK + '" stroke-width="2.5"/><rect x="' + f(222 + hook) + '" y="180" width="36" height="40" fill="#8a8f96" stroke="' + INK + '" stroke-width="2"/>' +
    person(130, 270, t, { hat: "hard", s: 0.55, shirt: ORG, pose: "point" }) + person(430, 270, t, { hat: "hard", s: 0.55, shirt: ORG, mood: "happy" }) + tag("حوض جاف", 300, 470, u, 0.6, -3, 28) + tag("مقفولة من الناحيتين", 300, 70, u, 2.6, 2, 22, "#bfe0ff");
});
// 13: القطعة بتعوم والقاطرات بتسحبها
shot(13, camPan(260, 380, 140, 1.05), function (u, d, t) {
  var x = 300 + u * 12;
  return world(t, 120, 450) + element(x, 140, 300, 70) + tug(x + 290, 118, t, 1) + tug(x - 300, 118, t, 1, true) + '<path d="M' + f(x + 158) + ' 130 Q' + f(x + 210) + ' 150 ' + f(x + 254) + ' 112" stroke="' + INK + '" stroke-width="3" fill="none"/><path d="M' + f(x - 158) + ' 130 Q' + f(x - 210) + ' 150 ' + f(x - 254) + ' 112" stroke="' + INK + '" stroke-width="3" fill="none"/>' + tag("بتعوم زي المركب!", 320, -78, u, 0.5, -3, 30);
});
// 14: الخزانات بتتملي مية والقطعة بتنزل للخندق
shot(14, camMove([320, 160, 1.05], [320, 260, 1.05]), function (u, d, t) {
  var k = ease(clamp(u / d)), y = lerp(40, 340, k), tank = clamp(u / (d * 0.6));
  return world(t, 20, 380) + '<path d="M60 384 C120 384 130 410 170 410 H470 C510 410 520 384 580 384 Z" fill="#6e5642" stroke="' + INK + '" stroke-width="3"/>' + element(320, y, 300, 90) +
    '<rect x="200" y="' + f(y - 28) + '" width="70" height="56" fill="none" stroke="' + INK + '" stroke-width="2.4"/><rect x="370" y="' + f(y - 28) + '" width="70" height="56" fill="none" stroke="' + INK + '" stroke-width="2.4"/>' +
    '<rect x="201" y="' + f(y + 28 - 56 * tank) + '" width="68" height="' + f(56 * tank) + '" fill="' + WATER + '"/><rect x="371" y="' + f(y + 28 - 56 * tank) + '" width="68" height="' + f(56 * tank) + '" fill="' + WATER + '"/>' +
    bubbles(t, 320, y - 50, 8, 100) + arrow(560, y - 60, 560, y + 40, YEL, 8, 1) + tag("خزانات مية", 320, y - 110, u, 0.8, -3, 26);
});
// 15: غطاسين وروبوت بيظبطوها بالسنتي
shot(15, camPush(320, 250, 1, 1.15), function (u, d, t) {
  var gap = lerp(40, 14, ease(u / d));
  return world(t, -120, 380, { fish: 3 }) + element(170 - gap / 2, 320, 300, 100, { ends: false }) + element(470 + gap / 2, 320, 300, 100, { ends: false }) + diver(200, 180, t) + diver(470, 140, t, true) + rov(400, 230, t) + ruler(320, 420, 140, t, "سم") + pulse(320, 320, t, YEL, 50) + tag("بالسنتي", 320, -60, u, 0.6, -3, 30);
});
// 16: يشفطوا المية من الوصلة وضغط البحر يقفلها
shot(16, camPush(320, 240, 1.05, 1.2), function (u, d, t) {
  var k = ease(clamp((u - 0.8) / 3)), gap = lerp(60, 6, k), water = 1 - clamp(u / 2.5);
  return world(t, -120, 400, { fish: 2 }) + element(170 - gap / 2, 300, 300, 110, { ends: false }) + element(470 + gap / 2, 300, 300, 110, { ends: false }) +
    '<rect x="' + f(320 - gap / 2) + '" y="' + f(355 - 110 * water) + '" width="' + f(gap) + '" height="' + f(110 * water) + '" fill="' + WATER + '"/>' + pump(320, 210, t) +
    arrow(-10, 300, 60 + k * 30, 300, "#7fc4ff", 12, 1) + arrow(650, 300, 580 - k * 30, 300, "#7fc4ff", 12, 1) + (k > 0.95 ? sparkle(320, 300, t) : "") + tag("ضغط البحر بيقفلها", 320, 470, u, 1.4, -3, 26);
});
// 17: كل قطعة وزنها حوالي تمانين ألف طن
shot(17, camPush(320, 200, 1, 1.1), function (u, d, t) {
  var sag = Math.sin(t * 3) * 3;
  return world(t, -140, 420, { fish: 4 }) + '<rect x="70" y="' + f(330 + sag) + '" width="500" height="22" rx="6" fill="url(#gMetal)" stroke="' + INK + '" stroke-width="3"/><path d="M320 352 V420 M260 420 H380" stroke="' + INK + '" stroke-width="10" stroke-linecap="round"/>' + element(320, 270 + sag, 460, 110) +
    counter(320, 90, u, 0.8, 2.8, 0, 80000, " طن", 58) + tag("هونج كونج وماكاو", 320, -60, u, 0.4, -3, 26) + label("كل قطعة!", 320, 140, 26, "#fff", 900);
});
// 18: خريطة نفق المانش بين إنجلترا وفرنسا
shot(18, camPush(320, 180, 1, 1.08), function (u, d, t) {
  var p = ease(clamp((u - 1) / 3)), y1 = -60, y2 = 420, ye = lerp(y1, y2, p);
  return fill("#2b86b5") + sea(t, -400) + '<path d="M-400 -400 H1040 V-40 C900 -10 700 20 500 -20 C380 -50 240 0 120 -30 C0 -60 -200 -30 -400 -10 Z" fill="#8fbf6a" stroke="' + INK + '" stroke-width="3"/>' +
    '<path d="M-400 700 H1040 V380 C880 360 720 420 520 400 C400 390 260 450 120 410 C0 380 -200 420 -400 400 Z" fill="#b5c97a" stroke="' + INK + '" stroke-width="3"/>' + fishes(t, 60, 320, 3) + ship(500, 180, t, 0.6) +
    '<path d="M300 ' + y1 + ' L' + f(lerp(300, 340, p)) + ' ' + f(ye) + '" stroke="' + INK + '" stroke-width="14" stroke-linecap="round"/><path d="M300 ' + y1 + ' L' + f(lerp(300, 340, p)) + ' ' + f(ye) + '" stroke="' + YEL + '" stroke-width="8" stroke-linecap="round" stroke-dasharray="16 8"/>' +
    flag(130, -140, "uk", t) + label("إنجلترا", 260, -110, 30, INK, 900) + flag(470, 440, "fr", t) + label("فرنسا", 380, 480, 30, INK, 900) +
    counter(150, 200, u, 2.0, 2, 0, 50, " كم", 46) + counter(150, 260, u, 5.0, 2, 0, 38, " تحت البحر", 30, "#bfe0ff");
});
// 19: الإنجليز من ناحية والفرنساويين من الناحية التانية
shot(19, camPush(320, 220, 1, 1.08), function (u, d, t) {
  var k = clamp(u / d);
  return world(t, -100, 160, { fish: 3 }) + rings(-300, 90 + k * 60, 340, 110, 24) + tbm(180 + k * 60, 340, t, 0.8) + '<g transform="translate(640 0) scale(-1 1)">' + rings(-300, 90 + k * 60, 340, 110, 24) + '</g>' + tbm(460 - k * 60, 340, t, 0.8, -1) + debris(330, 340, t, 10, 50) +
    flag(60, 200, "uk", t) + flag(520, 200, "fr", t) + tag("من الناحيتين", 320, 470, u, 0.8, -3, 28);
});
// 20: اتقابلوا في النص بفرق أقل من نص متر
shot(20, camPush(320, 240, 1, 1.15), function (u, d, t) {
  var br = clamp(u / 1.2);
  return fill(ROCK) + seabed(t, -500) + rings(-300, 300, 300, 200, 30) + '<g transform="translate(640 0) scale(-1 1)">' + rings(-300, 300, 300, 200, 30) + '</g>' +
    (br < 1 ? '<rect x="290" y="200" width="60" height="200" fill="#6e5642" stroke="' + INK + '" stroke-width="3" opacity="' + f(1 - br) + '"/>' : "") + debris(320, 300, t, 10, 90) +
    person(260, 390, t, { hat: "hard", mood: "happy", pose: "point", shirt: "#24407f", look: 1 }) + person(380, 390, t, { hat: "hard", mood: "happy", pose: "wave", shirt: "#2f4fa0", look: -1 }) +
    label("سنة ١٩٩٠", 320, 50, 46, YEL, 900) + ruler(320, 110, 220, t, "أقل من نص متر!") + sparkle(320, 260, t) + tag("فرق صغير جداً!", 320, 470, u, 2.2, -3, 26);
});
// 21: طلمبات ومراوح شغالة ليل ونهار
shot(21, camPush(320, 220, 1, 1.1), function (u, d, t) {
  return fill("#2a2c30") + tube(t, -200, 840, 330, 200) + fan(180, 160, 52, t) + fan(460, 160, 52, t) + pump(210, 450, t) + pump(470, 450, t) + dayCycle(t, 320, -100, 140) + tag("طلمبات ومراوح", 320, 40, u, 0.8, -3, 28) + label("ليل ونهار", 320, -20, 26, "#fff", 900);
});
// 22: نرجع للقناة: فوقك بحر كامل
shot(22, camMove([320, 380, 1.25], [320, 160, 1.0]), function (u, d, t) {
  return canalScene(t) + pulse(320, 400, t, YEL, 60) + arrow(320, 330, 320, 120, "#fff", 9, ease(u / 3)) + tag("فوقك بحر كامل", 320, -82, u, 1.5, -3, 28);
});
// 23: الختام
shot(23, camPush(320, 200, 1, 1.1), function (u, d, t) {
  return world(t, 260, 470, { fish: 4 }) + ship(470, 260, t, 0.8) + person(220, 250, t, { mood: "happy", pose: "wave", hat: "hard", shirt: ORG }) + bubble(360, 0, "نشرحلكم إيه؟", u, 0.6, 26) + qmark(540, 120, t, 90) + tag("قولولنا!", 320, 400, u, 0.2, -3, 32);
});
