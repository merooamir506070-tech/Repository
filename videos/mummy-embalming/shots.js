// «التحنيط خطوة بخطوة» — مشهد لكل سطر من script.txt
// ── أشكال خاصة بالفيديو ده ─────────────────────────────
var SKIN = "#c99a6b", LINEN = "#eadfc4", SAND = "#e3bf86", GOLD = "url(#gGold)", LAPIS = "#2f4f9f";
function G(x, y, s, inner, rot) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ')' + (rot ? ' rotate(' + f(rot) + ')' : '') + ' scale(' + f(s || 1) + ')">' + inner + '</g>'; }

// صحرا: كثبان رمل وحبيبات رمل طايرة
function desert(t, y) {
  var s = '<path d="M-400 ' + y + ' Q-100 ' + (y - 40) + ' 160 ' + (y - 10) + ' T720 ' + (y - 20) + ' T1100 ' + y + ' V700 H-400 Z" fill="#d9ad6e"/>' +
    '<path d="M-400 ' + (y + 30) + ' Q0 ' + (y + 5) + ' 320 ' + (y + 30) + ' T1100 ' + (y + 25) + ' V700 H-400 Z" fill="' + SAND + '" stroke="' + INK + '" stroke-width="2"/>';
  for (var i = 0; i < 26; i++) { var x = ((t * 70 + i * 47 + hash(i) * 200) % 900) - 130, yy = y - 10 + hash(i + 3) * 60 + Math.sin(t * 3 + i) * 5; s += '<circle cx="' + f(x) + '" cy="' + f(yy) + '" r="' + f(1 + hash(i + 8) * 1.6) + '" fill="#b98a4e" opacity=".7"/>'; }
  return s;
}
function pyramids(x, y, s) { return G(x, y, s, '<path d="M-90 0 L0 -110 L90 0 Z" fill="#e2b56e" stroke="' + INK + '" stroke-width="2.4"/><path d="M0 -110 L90 0 L30 0 Z" fill="#c8964f"/><path d="M60 0 L130 -80 L200 0 Z" fill="#e8c283" stroke="' + INK + '" stroke-width="2.4"/><path d="M130 -80 L200 0 L150 0 Z" fill="#cf9e5a"/>'); }

// جسم نايم (الراس ناحية الشمال). o: shrink 0..1، wrap 0..1، mask، xray، skin، clear (شفاف)
function body(x, y, s, t, o) {
  o = o || {}; var k = o.shrink || 0, sy = 1 - 0.32 * k, col = o.skin || (k > 0.3 ? "#9a7046" : SKIN), id = "bc" + Math.round(x) + "_" + Math.round(y);
  var shape = '<circle cx="-96" cy="0" r="18"/><rect x="-80" y="-15" width="178" height="30" rx="14"/><ellipse cx="98" cy="-12" rx="7" ry="10"/>';
  var g = '<defs><clipPath id="' + id + '">' + shape + '</clipPath></defs>';
  g += '<g transform="scale(1 ' + f(sy) + ')">';
  g += '<g fill="' + col + '" stroke="' + INK + '" stroke-width="3" opacity="' + (o.clear ? .55 : 1) + '">' + shape + '</g>';
  if (!o.clear && !o.wrap) g += '<path d="M-70 -4 Q10 4 90 -4" stroke="#8a6040" stroke-width="2" fill="none" opacity=".5"/><path d="M-104 -6 h4 M-92 -6 h4" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"/>';
  if (k > 0.2) for (var i = 0; i < 6; i++) g += '<path d="M' + (-60 + i * 28) + ' -10 q6 6 0 12" stroke="#5a3a20" stroke-width="2" fill="none" opacity="' + f(k) + '"/>';
  if (o.wrap) {
    var w = clamp(o.wrap), x0 = 110 - w * 228;
    g += '<g clip-path="url(#' + id + ')"><rect x="' + f(x0) + '" y="-40" width="' + f(w * 228 + 10) + '" height="80" fill="' + LINEN + '"/>';
    for (var j = 0; j < 22; j++) { var bx = -118 + j * 11; if (bx > x0 - 6) g += '<path d="M' + bx + ' -30 L' + (bx + 14) + ' 30" stroke="#c9b48a" stroke-width="2"/>'; }
    g += '</g><g fill="none" stroke="' + INK + '" stroke-width="3">' + shape + '</g>';
    if (w < 1) g += '<path d="M' + f(x0) + ' -18 V18" stroke="#c9b48a" stroke-width="5"/>';
  }
  g += '</g>';
  if (o.mask) g += G(-96, 0, 0.62 * o.mask, maskFace(t), -90);
  return G(x, y, s, g);
}
// سرير التحنيط (ترابيزة على شكل أسد مبسّط)
function bed(x, y, s) { return G(x, y, s, '<rect x="-130" y="0" width="260" height="14" rx="4" fill="#b07a3e" stroke="' + INK + '" stroke-width="3"/><path d="M-118 14 V56 M118 14 V56" stroke="' + INK + '" stroke-width="9" stroke-linecap="round"/><path d="M-118 14 V56 M118 14 V56" stroke="#8a5a2a" stroke-width="5" stroke-linecap="round"/><circle cx="-136" cy="2" r="10" fill="#c9a04e" stroke="' + INK + '" stroke-width="2.4"/>'); }
// سندوتش (bad 0..1 بيبوظ)، ودبان حواليه
function sandwich(x, y, s, t, bad) {
  bad = bad || 0; var mold = bad > 0 ? '<g opacity="' + f(bad) + '"><circle cx="-18" cy="-14" r="8" fill="#7f9f4a"/><circle cx="14" cy="-18" r="6" fill="#6f8f3a"/><circle cx="26" cy="-6" r="5" fill="#8fae5a"/></g>' : "";
  var g = '<path d="M-46 0 Q-48 -30 0 -32 Q48 -30 46 0 Z" fill="#e8b874" stroke="' + INK + '" stroke-width="3"/><rect x="-48" y="-2" width="96" height="8" rx="3" fill="#6fae56" stroke="' + INK + '" stroke-width="2"/><rect x="-46" y="5" width="92" height="7" rx="3" fill="#d9604a" stroke="' + INK + '" stroke-width="2"/><path d="M-46 12 H46 Q44 26 0 26 Q-44 26 -46 12 Z" fill="#e8b874" stroke="' + INK + '" stroke-width="3"/>' + mold;
  for (var i = 0; bad > 0.3 && i < 3; i++) { var a = t * (3 + i) + i * 2, fx = Math.cos(a) * (50 + i * 8), fy = -30 + Math.sin(a * 1.3) * 22, w = Math.sin(t * 40 + i) * 3;
    g += '<ellipse cx="' + f(fx - 3) + '" cy="' + f(fy - 3 - w) + '" rx="4" ry="2.5" fill="#cfe1ec" opacity=".8"/><ellipse cx="' + f(fx + 3) + '" cy="' + f(fy - 3 + w) + '" rx="4" ry="2.5" fill="#cfe1ec" opacity=".8"/><circle cx="' + f(fx) + '" cy="' + f(fy) + '" r="3.2" fill="' + INK + '"/>'; }
  return G(x, y, s, g);
}
// فاترينة متحف فيها مومياء
function vitrine(x, y, s, t) { var sh = (t * 0.3) % 1; return G(x, y, s, '<rect x="-150" y="20" width="300" height="40" fill="#5a4a3a" stroke="' + INK + '" stroke-width="3"/>' + body(0, 0, 1.1, t, { wrap: 1, mask: 0 }) + '<rect x="-150" y="-60" width="300" height="80" fill="#cfe7f2" opacity=".28" stroke="' + INK + '" stroke-width="3"/><path d="M' + f(-150 + sh * 300) + ' -60 l-30 80" stroke="#fff" stroke-width="10" opacity=".35"/>'); }
// قطرات مية طالعة لفوق وبتتبخر
function vapor(x, y, t, n, col) { var s = ""; n = n || 6; for (var i = 0; i < n; i++) { var u = (t * 0.6 + hash(i)) % 1, px = x + (hash(i + 2) - 0.5) * 160 + Math.sin(t * 3 + i) * 6, py = y - u * 90; s += '<path d="M' + f(px) + ' ' + f(py - 7) + ' Q' + f(px + 5) + ' ' + f(py) + ' ' + f(px) + ' ' + f(py + 3) + ' Q' + f(px - 5) + ' ' + f(py) + ' ' + f(px) + ' ' + f(py - 7) + ' Z" fill="' + (col || "#5fb3e0") + '" stroke="' + INK + '" stroke-width="1.2" opacity="' + f(1 - u) + '"/>'; } return s; }
// هالة عفن خضرا
function rot(x, y, t, k) { var s = ""; for (var i = 0; i < 7; i++) { var u = (t * 0.4 + i / 7) % 1; s += '<circle cx="' + f(x - 90 + hash(i) * 180) + '" cy="' + f(y - u * 70) + '" r="' + f(10 + u * 18) + '" fill="#7fae3a" opacity="' + f((1 - u) * 0.5 * (k == null ? 1 : k)) + '" filter="url(#soft2)"/>'; } return s; }
// تاج ملك (فوق person)
function crown(x, y, s) { var st = ""; for (var i = 0; i < 4; i++) st += '<path d="M' + (-24 + i * 4) + ' ' + (-4 + i * 12) + ' h' + (8) + '" stroke="' + LAPIS + '" stroke-width="4"/><path d="M' + (16 - i * 4) + ' ' + (-4 + i * 12) + ' h8" stroke="' + LAPIS + '" stroke-width="4"/>'; return G(x, y, s, '<path d="M-26 46 L-24 -6 Q0 -30 24 -6 L26 46 L16 46 L14 4 Q0 -6 -14 4 L-16 46 Z" fill="' + GOLD + '" stroke="' + INK + '" stroke-width="2.4"/>' + st + '<path d="M0 -20 q4 -8 0 -12" stroke="#c23a26" stroke-width="4" fill="none"/>'); }
// تابوت على شكل إنسان (o.open 0..1 الغطا بيتشال)
function coffin(x, y, s, col, deco) {
  return G(x, y, s, '<path d="M-120 0 Q-128 -34 -96 -40 L60 -34 Q118 -30 122 0 Q118 30 60 34 L-96 40 Q-128 34 -120 0 Z" fill="' + col + '" stroke="' + INK + '" stroke-width="3.4"/>' +
    '<ellipse cx="-92" cy="0" rx="22" ry="26" fill="' + (deco || "#c9a04e") + '" stroke="' + INK + '" stroke-width="2.4"/>' +
    '<path d="M-60 -30 V30 M-20 -32 V32 M20 -33 V33" stroke="' + INK + '" stroke-width="1.6" opacity=".45"/><path d="M-60 0 H90" stroke="' + LAPIS + '" stroke-width="5" opacity=".7"/>');
}
// قناع جنائزي ذهبي بخطوط زرقا (r~1 = عرض 100)
function maskFace(t) {
  var sh = 0.5 + 0.5 * Math.sin(t * 2.5), s = '<path d="M-50 -40 Q-56 40 -40 70 L40 70 Q56 40 50 -40 Q0 -70 -50 -40 Z" fill="' + GOLD + '" stroke="' + INK + '" stroke-width="3"/>';
  for (var i = 0; i < 6; i++) s += '<path d="M' + (-50 + i * 3) + ' ' + (-30 + i * 16) + ' L' + (-34) + ' ' + (-30 + i * 16) + ' M' + (50 - i * 3) + ' ' + (-30 + i * 16) + ' L34 ' + (-30 + i * 16) + '" stroke="' + LAPIS + '" stroke-width="5"/>';
  s += '<ellipse cx="0" cy="8" rx="30" ry="38" fill="#e8c46a" stroke="' + INK + '" stroke-width="2.4"/>' +
    '<path d="M-20 -2 q8 -6 16 0 M4 -2 q8 -6 16 0" stroke="' + INK + '" stroke-width="3" fill="#fff"/><circle cx="-12" cy="-1" r="3" fill="' + INK + '"/><circle cx="12" cy="-1" r="3" fill="' + INK + '"/>' +
    '<path d="M-24 -10 h18 M6 -10 h18" stroke="' + LAPIS + '" stroke-width="3"/><path d="M0 4 v14 h-5" stroke="#9a7a2a" stroke-width="2.4" fill="none"/><path d="M-9 28 q9 5 18 0" stroke="#9a5a2a" stroke-width="3" fill="none"/>' +
    '<path d="M-6 46 h12 v26 h-12 Z" fill="' + LAPIS + '" stroke="' + INK + '" stroke-width="2"/><path d="M-14 -46 Q0 -60 14 -46" stroke="' + LAPIS + '" stroke-width="5" fill="none"/>' +
    '<ellipse cx="-20" cy="-30" rx="10" ry="22" fill="#fff" opacity="' + f(0.15 + sh * 0.3) + '" transform="rotate(20 -20 -30)"/>';
  return s;
}
// إناء كانوبي بغطا (kind: 0 إنسان، 1 قرد، 2 ابن آوى، 3 صقر)
function jar(x, y, s, kind, t) {
  var lid = ['<circle cx="0" cy="-74" r="18" fill="#e8c46a" stroke="' + INK + '" stroke-width="2.6"/><path d="M-18 -78 Q0 -100 18 -78" fill="' + LAPIS + '" stroke="' + INK + '" stroke-width="2"/>',
    '<circle cx="0" cy="-74" r="18" fill="#a88a6a" stroke="' + INK + '" stroke-width="2.6"/><ellipse cx="0" cy="-68" rx="10" ry="7" fill="#d9c2a2" stroke="' + INK + '" stroke-width="1.6"/>',
    '<path d="M-14 -60 L-14 -86 L-20 -104 L-6 -90 L6 -90 L20 -104 L14 -86 L14 -60 Z" fill="#3a3530" stroke="' + INK + '" stroke-width="2.6"/><path d="M0 -74 L22 -66 L0 -62 Z" fill="#3a3530" stroke="' + INK + '" stroke-width="2"/>',
    '<circle cx="0" cy="-74" r="17" fill="#8a6a40" stroke="' + INK + '" stroke-width="2.6"/><path d="M10 -76 L24 -70 L10 -66 Z" fill="#f2c230" stroke="' + INK + '" stroke-width="1.6"/><circle cx="4" cy="-78" r="3" fill="' + INK + '"/>'][kind || 0];
  var b = Math.sin((t || 0) * 2 + kind) * 2;
  return G(x, y + b, s, '<path d="M-24 -58 Q-34 -40 -30 -10 Q-26 0 0 0 Q26 0 30 -10 Q34 -40 24 -58 Z" fill="#e9e1cc" stroke="' + INK + '" stroke-width="3"/><path d="M-28 -36 H28 M-29 -24 H29" stroke="#8a7a5a" stroke-width="1.6"/>' + lid);
}
// قلب
function heart(x, y, s, t) { var k = 1 + 0.08 * Math.max(0, Math.sin(t * 7)); return G(x, y, s * k, '<path d="M0 18 C-30 -2 -26 -26 -10 -26 C-3 -26 0 -20 0 -16 C0 -20 3 -26 10 -26 C26 -26 30 -2 0 18 Z" fill="#d9483a" stroke="' + INK + '" stroke-width="2.6"/><ellipse cx="-11" cy="-15" rx="5" ry="3" fill="#fff" opacity=".6"/>'); }
// ميزان بكفتين (قلب قصاد ريشة)
function balance(x, y, s, t) {
  var a = Math.sin(t * 1.6) * 7, dx = Math.cos(a * Math.PI / 180) * 70, dy = Math.sin(a * Math.PI / 180) * 70;
  var pan = function (px, py, inner) { return '<path d="M' + f(px) + ' ' + f(py) + ' l-20 30 M' + f(px) + ' ' + f(py) + ' l20 30" stroke="' + INK + '" stroke-width="2"/><path d="M' + f(px - 26) + ' ' + f(py + 30) + ' Q' + f(px) + ' ' + f(py + 46) + ' ' + f(px + 26) + ' ' + f(py + 30) + ' Z" fill="' + GOLD + '" stroke="' + INK + '" stroke-width="2.4"/>' + inner; };
  return G(x, y, s, '<rect x="-5" y="-90" width="10" height="90" fill="' + GOLD + '" stroke="' + INK + '" stroke-width="2.4"/><rect x="-30" y="-6" width="60" height="10" rx="3" fill="#8a6a30" stroke="' + INK + '" stroke-width="2"/>' +
    '<path d="M' + f(-dx) + ' ' + f(-90 - dy) + ' L' + f(dx) + ' ' + f(-90 + dy) + '" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' +
    pan(-dx, -90 - dy, heart(-dx, -90 - dy + 22, 0.55, t)) + pan(dx, -90 + dy, '<path d="M' + f(dx) + ' ' + f(-90 + dy + 26) + ' q-8 -16 0 -34 q8 18 0 34" fill="#f4f1e8" stroke="' + INK + '" stroke-width="1.8"/>'));
}
// بكتيريا عايمة
function microbes(t, x, y, w, h, n) { var s = ""; for (var i = 0; i < (n || 8); i++) { var px = x + hash(i) * w + Math.sin(t * 2 + i) * 8, py = y + hash(i + 5) * h + Math.cos(t * 1.7 + i) * 6, r = Math.sin(t * 3 + i) * 15;
  s += '<g transform="translate(' + f(px) + ' ' + f(py) + ') rotate(' + f(r + i * 40) + ')"><rect x="-10" y="-5" width="20" height="10" rx="5" fill="#8fd16a" stroke="' + INK + '" stroke-width="1.6"/><path d="M10 0 q5 -4 9 0" stroke="' + INK + '" stroke-width="1.4" fill="none"/><circle cx="-3" cy="-1" r="1.6" fill="' + INK + '"/><circle cx="3" cy="-1" r="1.6" fill="' + INK + '"/></g>'; } return s; }
// موج مية جوه الجسم
function waterIn(x, y, w, t, lvl) { var d = "M" + f(x) + " " + f(y); for (var i = 0; i <= w; i += 6) d += " L" + f(x + i) + " " + f(y - lvl + Math.sin(i / 18 - t * 4) * 3); d += " L" + f(x + w) + " " + f(y) + " Z"; return '<path d="' + d + '" fill="#4fa6d9" opacity=".75"/>'; }
// كوم ملح بحبيبات بتنزل (h 0..1)
function saltPile(x, y, w, h, t) {
  var s = '<path d="M' + f(x - w / 2) + ' ' + y + ' Q' + f(x - w / 4) + ' ' + f(y - 80 * h) + ' ' + x + ' ' + f(y - 96 * h) + ' Q' + f(x + w / 4) + ' ' + f(y - 80 * h) + ' ' + f(x + w / 2) + ' ' + y + ' Z" fill="#f6f4ee" stroke="' + INK + '" stroke-width="3"/>';
  for (var i = 0; i < 18; i++) { var u = (t * 0.9 + hash(i)) % 1; s += '<rect x="' + f(x - w / 3 + hash(i + 1) * w * 0.66) + '" y="' + f(y - 200 + u * (200 - 90 * h)) + '" width="4" height="4" fill="#fff" stroke="#9aa" stroke-width=".8" transform="rotate(45 ' + f(x) + ' ' + f(y) + ')" opacity="0"/>'; }
  for (var j = 0; j < 22; j++) { var uu = (t * 1.1 + hash(j + 30)) % 1; s += '<rect x="' + f(x - w / 3 + hash(j + 11) * w * 0.66) + '" y="' + f(y - 190 + uu * (190 - 90 * h)) + '" width="4" height="4" fill="#fff" stroke="#8a9" stroke-width=".8"/>'; }
  return s;
}
// جعران أزرق بجناحات بتتهز
function scarab(x, y, s, t) { var w = Math.sin(t * 6) * 8; return G(x, y, s, '<path d="M-14 -4 Q-60 ' + f(-30 - w) + ' -70 ' + f(-8 - w) + ' Q-40 4 -14 6 Z M14 -4 Q60 ' + f(-30 - w) + ' 70 ' + f(-8 - w) + ' Q40 4 14 6 Z" fill="#3a8fd9" stroke="' + INK + '" stroke-width="2.4"/><ellipse cx="0" cy="6" rx="18" ry="24" fill="#1f5f9f" stroke="' + INK + '" stroke-width="2.6"/><path d="M0 -14 V30" stroke="' + INK + '" stroke-width="2"/><circle cx="0" cy="-22" r="10" fill="#1f5f9f" stroke="' + INK + '" stroke-width="2.4"/><circle cx="0" cy="-38" r="9" fill="#e8443a" stroke="' + INK + '" stroke-width="2"/>'); }
// تميمة عين حورس
function eyeAmulet(x, y, s) { return G(x, y, s, '<path d="M-22 0 Q0 -18 22 0 Q0 14 -22 0 Z" fill="#f4f1e8" stroke="' + LAPIS + '" stroke-width="4"/><circle cx="0" cy="-1" r="6" fill="' + LAPIS + '"/><path d="M-22 -10 Q0 -26 24 -10 M-2 12 Q-4 26 6 30 M6 12 L20 26" stroke="' + LAPIS + '" stroke-width="4" fill="none" stroke-linecap="round"/>'); }
// طائر البا (طائر براس إنسان)
function baBird(x, y, s, t) { var w = Math.sin(t * 9) * 14; return G(x, y, s, '<path d="M-6 0 Q-40 ' + f(-20 - w) + ' -56 ' + f(-6 - w) + ' Q-30 6 -6 8 Z M6 0 Q40 ' + f(-20 - w) + ' 56 ' + f(-6 - w) + ' Q30 6 6 8 Z" fill="#c9a04e" stroke="' + INK + '" stroke-width="2.4"/><ellipse cx="0" cy="8" rx="16" ry="20" fill="#e8c283" stroke="' + INK + '" stroke-width="2.4"/>' + head(0, -18, 14, "curious", t) + '<path d="M-14 -28 Q0 -40 14 -28" stroke="' + LAPIS + '" stroke-width="4" fill="none"/>'); }
// مقبرة جوه: حيطان حجر وشعلتين
function tomb(t) {
  var s = fill("#3a2a1e") + '<rect x="-400" y="40" width="1440" height="220" fill="#6a4e34"/>';
  for (var i = 0; i < 18; i++) s += '<rect x="' + (-260 + i * 70) + '" y="' + (40 + (i % 3) * 70) + '" width="68" height="68" fill="none" stroke="#4a3624" stroke-width="2"/>';
  for (var j = 0; j < 12; j++) s += '<text x="' + (40 + j * 50) + '" y="' + (80 + (j % 2) * 26) + '" style="font:700 22px Noto Sans Arabic;fill:#c9a04e;opacity:.55">' + ["𓂀", "𓋹", "𓆣", "𓅓", "𓁹", "𓃭"][j % 6] + '</text>';
  return s + '<rect x="-400" y="260" width="1440" height="400" fill="#8a6a48" stroke="' + INK + '" stroke-width="2"/>' + torch(40, 200, t) + torch(600, 200, t + 1);
}
function torch(x, y, t) { var fl = Math.sin(t * 13) * 3 + Math.sin(t * 7) * 2; return '<circle cx="' + x + '" cy="' + (y - 34) + '" r="' + f(60 + fl * 3) + '" fill="#f7b24a" opacity=".22" filter="url(#soft)"/><rect x="' + (x - 5) + '" y="' + (y - 20) + '" width="10" height="44" fill="#6a4020" stroke="' + INK + '" stroke-width="2"/><path d="M' + (x - 12) + ' ' + (y - 20) + ' Q' + f(x - 10 + fl) + ' ' + f(y - 50 - fl) + ' ' + f(x + fl) + ' ' + f(y - 62 - fl * 2) + ' Q' + f(x + 12) + ' ' + (y - 40) + ' ' + (x + 12) + ' ' + (y - 20) + ' Z" fill="#f28c28" stroke="' + INK + '" stroke-width="2"/><path d="M' + (x - 5) + ' ' + (y - 22) + ' Q' + f(x + fl * 0.5) + ' ' + (y - 46) + ' ' + (x + 5) + ' ' + (y - 22) + ' Z" fill="#ffe27a"/>'; }
// ورشة التحنيط
function workshop(t) { return fill("#e9d6b0") + '<rect x="-400" y="250" width="1440" height="400" fill="#c9a87a" stroke="' + INK + '" stroke-width="2"/>' + '<path d="M80 40 h480" stroke="#c9a04e" stroke-width="6"/>' + torch(70, 200, t) + torch(570, 200, t + 2); }
// خطاف نحاس
function hook(x, y, s) { return G(x, y, s, '<path d="M0 0 H120" stroke="' + INK + '" stroke-width="8" stroke-linecap="round"/><path d="M0 0 H120" stroke="#c87a3a" stroke-width="5" stroke-linecap="round"/><path d="M0 0 q-10 -2 -12 -12" stroke="#c87a3a" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="110" y="-7" width="40" height="14" rx="6" fill="#7a5a3a" stroke="' + INK + '" stroke-width="2.4"/>'); }
// راس من الجنب (بروفايل) بمقطع فيه المخ
function profile(x, y, s, t, brainK) { return G(x, y, s, '<path d="M60 80 L60 40 Q90 40 92 20 L104 14 L92 4 Q98 -10 92 -24 Q96 -86 20 -92 Q-60 -92 -64 -20 Q-66 30 -30 50 L-30 80 Z" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="3.4"/>' +
  '<path d="M-44 -36 Q-40 -76 10 -78 Q70 -76 72 -32 Q50 -14 10 -14 Q-30 -14 -44 -36 Z" fill="#f2a0a8" stroke="' + INK + '" stroke-width="2.4" opacity="' + f(brainK) + '"/><path d="M-20 -50 q10 -12 20 0 q10 12 20 0 M0 -34 q10 -10 22 0" stroke="#c96a7a" stroke-width="2" fill="none" opacity="' + f(brainK) + '"/>' +
  '<circle cx="62" cy="-20" r="5" fill="' + INK + '"/><path d="M50 -34 q10 -6 22 0" stroke="' + INK + '" stroke-width="2.6" fill="none"/>'); }
// فرشة بتدهن
function brush(x, y, s, a) { return G(x, y, s, '<rect x="-6" y="-80" width="12" height="60" rx="5" fill="#a06a3a" stroke="' + INK + '" stroke-width="2.4"/><path d="M-10 -22 H10 L12 6 Q0 14 -12 6 Z" fill="#c98a2a" stroke="' + INK + '" stroke-width="2.4"/>', a); }
// رول كتان
function linenRoll(x, y, s, r) { return G(x, y, s, '<circle r="14" fill="' + LINEN + '" stroke="' + INK + '" stroke-width="2.4"/><circle r="5" fill="#c9b48a" stroke="' + INK + '" stroke-width="1.6"/><path d="M0 14 H40" stroke="' + LINEN + '" stroke-width="10"/><path d="M0 9 H40 M0 19 H40" stroke="' + INK + '" stroke-width="1.6"/>', r); }
// حرامي بكشاف
function thief(x, y, t) { var a = Math.sin(t * 2) * 12; return person(x, y, t, { mood: "worry", pose: "point", shirt: "#2a2a2a", s: 0.9 }) + '<g transform="translate(' + f(x + 46) + ' ' + f(y - 70) + ') rotate(' + f(a) + ')"><path d="M0 0 L240 -60 L240 60 Z" fill="#fff3b0" opacity=".28"/></g>' + '<rect x="' + f(x - 22) + '" y="' + f(y - 116) + '" width="44" height="10" fill="#1c1c1c"/>'; }
// هاون بيطحن
function mortar(x, y, s, t) { var a = Math.sin(t * 6) * 18; return G(x, y, s, '<path d="M-44 -30 H44 Q40 20 0 22 Q-40 20 -44 -30 Z" fill="#9a9a92" stroke="' + INK + '" stroke-width="3"/><ellipse cx="0" cy="-30" rx="44" ry="9" fill="#6a5a4a" stroke="' + INK + '" stroke-width="2.4"/><g transform="rotate(' + f(a) + ' 0 -26)"><rect x="-7" y="-96" width="14" height="72" rx="7" fill="#b8b4ac" stroke="' + INK + '" stroke-width="2.6"/></g>'); }
// برطمان صيدلية
function potJar(x, y, s, col) { return G(x, y, s, '<rect x="-20" y="-50" width="40" height="50" rx="8" fill="' + col + '" stroke="' + INK + '" stroke-width="2.4"/><rect x="-14" y="-58" width="28" height="10" rx="3" fill="#7a5a3a" stroke="' + INK + '" stroke-width="2"/><rect x="-16" y="-34" width="32" height="16" fill="#f4f1e8" stroke="' + INK + '" stroke-width="1.4"/>'); }
// كاهن بقناع أنوبيس (person + راس ابن آوى)
function priest(x, y, t, pose) { return person(x, y, t, { mood: "n", pose: pose || "stand", shirt: "#f4f1e8", s: 0.9 }); }
// تقويم بيقلب
function calendar(x, y, n) { return G(x, y, 1, '<rect x="-50" y="-56" width="100" height="100" rx="8" fill="#fff" stroke="' + INK + '" stroke-width="3"/><rect x="-50" y="-56" width="100" height="26" rx="8" fill="#c23a26" stroke="' + INK + '" stroke-width="3"/>' + '<text x="0" y="24" text-anchor="middle" style="font:900 44px Noto Sans Arabic;fill:' + INK + '">' + n + '</text><text x="0" y="-36" text-anchor="middle" style="font:800 14px Noto Sans Arabic;fill:#fff">يوم</text>'); }
function weight(x, y, s, txt) { return G(x, y, s, '<path d="M-36 0 L-26 -50 H26 L36 0 Z" fill="#4b5056" stroke="' + INK + '" stroke-width="3"/><path d="M-12 -50 Q0 -70 12 -50" stroke="' + INK + '" stroke-width="5" fill="none"/><text x="0" y="-16" text-anchor="middle" style="font:900 14px Noto Sans Arabic;fill:#fff">' + txt + '</text>'); }
function icon(x, y, u, u0, inner) { var k = pop((u - u0) / 0.8); if (k <= 0) return ""; return G(x, y, k, '<circle r="34" fill="#fff8e8" stroke="' + INK + '" stroke-width="3"/>' + inner); }

// ── المشاهد ─────────────────────────────────────────────
// 0: سندوتش بايظ قصاد مومياء في متحف
shot(0, camPush(320, 190, 1, 1.12), function (u, d, t) {
  return room(t, "#e9dcc4", "#b99a76") + sandwich(150, 230, 1.3, t, clamp(u / 2)) + vitrine(450, 230, 0.9, t) +
    tag("يومين", 150, 120, u, 0.8, -4) + counter(450, 120, u, 3.5, 2.5, 0, 3000, " سنة", 30, "#c23a26");
});
// 1: سر ولا سحر؟
shot(1, camPush(320, 200, 1.05, 1.15), function (u, d, t) {
  return fill("#2a3a5a") + stars(t) + pyramids(260, 300, 1) + '<rect x="-400" y="300" width="1440" height="200" fill="#c8964f"/>' + person(180, 300, t, { mood: "curious", pose: "think" }) +
    qmark(400, 170, t, 100) + sparkle(400, 140, t, "#fff3b0", 8) + tag("سر؟", 300, 70, u, 0.6, -5) + tag("ولا سحر؟", 480, 90, u, 2.2, 4);
});
// 2: نبني التحنيط خطوة خطوة
shot(2, camPush(320, 220, 1.1, 1), function (u, d, t) {
  var s = workshop(t) + bed(320, 240, 1) + person(520, 250, t, { mood: "happy", pose: "wave", shirt: "#f4f1e8" });
  for (var i = 0; i < 4; i++) s += icon(215 + i * 70, 185, u, 0.6 + i * 0.4, '<text y="10" text-anchor="middle" style="font:900 26px Noto Sans Arabic;fill:#c23a26">' + (i + 1) + '</text>');
  return s + tag("خطوة خطوة", 320, 95, u, 1.0);
});
// 3: رمل الصحرا بينشف الجسم
shot(3, camPush(320, 220, 1, 1.12), function (u, d, t) {
  return sky("day") + sun(520, 70, 34, "#f7c84a") + pyramids(100, 220, 0.6) + desert(t, 240) + body(330, 262, 0.9, t, { skin: "#b07a4e" }) +
    '<path d="M180 266 Q330 252 480 266 Q330 286 180 266" fill="' + SAND + '" opacity=".8"/>' + vapor(330, 240, t, 8) + tag("ينشف لوحده", 330, 120, u, 1.6);
});
// 4: الملك عايز تابوت، والجسم بيتحلل
shot(4, camMove([320, 200, 1], [360, 230, 1.15]), function (u, d, t) {
  return workshop(t) + coffin(470, 160, 0.6, "#8a5a2a") + person(160, 290, t, { mood: "happy", pose: "point", shirt: "#f4f1e8" }) + crown(160, 190, 1) +
    bed(360, 260, 0.9) + body(360, 246, 0.8, t, {}) + rot(360, 240, t, clamp((u - 2.5) / 1.5)) + cross(360, 170, u, 4.2) + tag("يتحلل!", 360, 110, u, 4.5, 3, 26, "#b9d98a");
});
// 5: الأعضاء + فتحة في الجنب الشمال
shot(5, camPush(330, 230, 1, 1.25), function (u, d, t) {
  var g = 0.6 + 0.4 * Math.sin(t * 5), cut = ease((u - 4.5) / 1.2);
  return workshop(t) + bed(330, 260, 1) + body(330, 244, 1, t, { clear: true }) +
    '<g opacity="' + f(g) + '"><ellipse cx="300" cy="240" rx="18" ry="9" fill="#9a3a2a"/><ellipse cx="340" cy="246" rx="16" ry="8" fill="#d98a6a"/><path d="M360 240 q10 -10 20 0 q10 10 20 0" stroke="#e8a08a" stroke-width="7" fill="none"/><ellipse cx="270" cy="236" rx="14" ry="8" fill="#e88a9a"/></g>' +
    pulse(330, 242, t, "#e8443a", 40) + '<path d="M300 232 L' + f(300 + 60 * cut) + ' 232" stroke="#c23a26" stroke-width="4" stroke-dasharray="6 4"/>' + tag("الأعضاء", 230, 120, u, 1.0) + tag("الجنب الشمال", 430, 140, u, 4.8, 4);
});
// 6: المخ من الأنف بخطاف
shot(6, camPush(300, 180, 1, 1.15), function (u, d, t) {
  var k = ease((u - 1) / 2), wig = Math.sin(t * 8) * 4;
  return fill("#e9d6b0") + profile(260, 200, 1.4, t, 1 - clamp((u - 3) / 2) * 0.7) + hook(400 - 150 * k + wig, 205, 1) + arrow(520, 150, 420, 196, "#f2c230", 6, ease((u - 0.5) / 1)) + tag("من الأنف", 470, 90, u, 1.2, -3, 26);
});
// 7: القلب في مكانه + الميزان
shot(7, camMove([260, 220, 1.2], [400, 190, 1]), function (u, d, t) {
  return workshop(t) + bed(220, 270, 0.8) + body(220, 257, 0.75, t, { clear: true }) + heart(200, 252, 0.6, t) + pulse(200, 252, t, "#e8443a", 26) +
    balance(470, 260, 1, t) + tag("مركز العقل", 220, 150, u, 1.8) + tag("هيتوزن", 470, 70, u, 5.0, 4);
});
// 8: أربع أواني كانوبية
shot(8, camPush(320, 220, 1.05, 1), function (u, d, t) {
  var s = workshop(t), names = ["الكبد", "الرئة", "المعدة", "الأمعاء"];
  for (var i = 0; i < 4; i++) { var k = pop((u - 1 - i * 0.8) / 0.8); if (k > 0) s += G(155 + i * 110, 270, k, jar(0, 0, 1, i, t) + label(names[i], 0, 26, 17, INK, 900)); }
  return s + tag("أربع أواني كانوبية", 320, 110, u, 0.6);
});
// 9: الجسم مليان مية وبكتيريا
shot(9, camPush(320, 210, 1, 1.12), function (u, d, t) {
  var lvl = 18 * ease(u / 2);
  return fill("#cfe3ee") + '<g transform="translate(320 220) scale(1.6)"><defs><clipPath id="bw"><circle cx="-96" cy="0" r="18"/><rect x="-80" y="-15" width="178" height="30" rx="14"/></clipPath></defs><g clip-path="url(#bw)">' + waterIn(-120, 20, 230, t, lvl) + '</g></g>' +
    body(320, 220, 1.6, t, { clear: true }) + microbes(t, 180, 190, 300, 50, 9) + counter(320, 110, u, 2.0, 1.8, 0, 60, "٪ مية", 32, "#4fa6d9") + tag("أكل للبكتيريا", 320, 310, u, 4.5, 2, 22, "#b9d98a");
});
// 10: ملح النطرون أربعين يوم
shot(10, camPush(320, 220, 1, 1.12), function (u, d, t) {
  var h = ease(u / 2.5), days = Math.min(40, Math.floor(clamp((u - 3) / 2.6) * 40));
  return workshop(t) + bed(320, 270, 1) + body(320, 254, 1, t, { skin: "#a8784c" }) + saltPile(320, 270, 280, h, t) + vapor(320, 200, t, 5) +
    tag("ملح النطرون", 200, 80, u, 0.8) + calendar(500, 110, days || 1);
});
// 11: الجسم انكمش
shot(11, camPush(320, 230, 1, 1.2), function (u, d, t) {
  var k = ease(u / 2.5);
  return workshop(t) + bed(300, 270, 1) + body(300, 254, 1, t, { shrink: k }) + person(530, 270, t, { mood: "shock", pose: "stand", shirt: "#f4f1e8" }) + tag("منكمش ومكرمش", 300, 110, u, 1.4, -3, 24);
});
// 12: حشو بالكتان والنشارة
shot(12, camPush(300, 230, 1.1, 1), function (u, d, t) {
  var k = ease((u - 1.5) / 2.5), s = workshop(t) + bed(300, 270, 1) + body(300, 254, 1, t, { shrink: 1 - k });
  for (var i = 0; i < 4; i++) { var p = ((u * 0.7 + i * 0.25) % 1); s += linenRoll(lerp(560, 320, p), lerp(130, 240, p) - Math.sin(p * 3.14) * 40, 0.9, p * 360); }
  return s + tag("يرجعله شكله", 300, 90, u, 3.0);
});
// 13: دهان بالزيت والراتنج
shot(13, camPush(320, 240, 1, 1.25), function (u, d, t) {
  var bx = 220 + ((Math.sin(t * 2) + 1) / 2) * 200, shine = clamp((u - 2) / 2);
  var cracks = '<g stroke="#5a3a20" stroke-width="2" fill="none" opacity="' + f(1 - shine) + '"><path d="M250 248 l8 6 l-4 6 M330 252 l10 -4 l4 6 M390 246 l-6 8"/></g>';
  return workshop(t) + bed(320, 270, 1) + body(320, 254, 1, t, { skin: "#a8784c" }) + cracks +
    '<rect x="230" y="240" width="' + f(180 * shine) + '" height="10" rx="5" fill="#fff" opacity=".45"/>' + brush(bx, 226, 1, -20) + sparkle(bx, 240, t, "#fff3b0", 4) + tag("زي الورنيش", 320, 100, u, 3.5);
});
// 14: لف بالكتان، مئات الأمتار
shot(14, camPush(320, 230, 1, 1.12), function (u, d, t) {
  var w = ease(u / (d * 0.85));
  return workshop(t) + bed(320, 270, 1) + body(320, 254, 1, t, { wrap: w }) + linenRoll(lerp(440, 210, w), 220 + Math.sin(t * 6) * 10, 0.8, t * 200) +
    counter(460, 130, u, 1.5, 3.5, 0, 400, " متر", 30, "#c23a26") + tag("مئات الأمتار", 220, 120, u, 4.0);
});
// 15: تمايم والجعران
shot(15, camPush(320, 220, 1, 1.2), function (u, d, t) {
  return tomb(t) + bed(320, 280, 1) + body(320, 264, 1, t, { wrap: 1 }) + eyeAmulet(250, 250, 0.6 * pop((u - 0.8) / 0.8)) + eyeAmulet(400, 252, 0.6 * pop((u - 1.4) / 0.8)) +
    scarab(320, lerp(120, 230, ease((u - 2.4) / 1.5)), 0.9, t) + sparkle(320, 230, t, "#9fd0ff", 6) + tag("الجعران", 460, 120, u, 3.0, -3, 26, "#9fc7f0");
});
// 16: الوش اتغطى، الروح هتعرفه إزاي؟
shot(16, camPush(240, 220, 1.1, 1.25), function (u, d, t) {
  var a = t * 1.2;
  return tomb(t) + bed(320, 280, 1) + body(320, 264, 1, t, { wrap: 1 }) + baBird(200 + Math.cos(a) * 60, 175 + Math.sin(a * 2) * 15, 0.9, t) + qmark(430, 150, t, 80) + tag("الوش اتغطى", 330, 110, u, 0.8, -3);
});
// 17: قناع دهب عشرة كيلو
shot(17, camPush(320, 190, 1.2, 1), function (u, d, t) {
  var k = pop((u - 0.6) / 1);
  return tomb(t) + G(320, 180, 1.35 * (k || 0.001), maskFace(t)) + sparkle(320, 160, t, "#fff3b0", 9) + (u > 3.2 ? weight(500, 300, 1.2 * pop((u - 3.2) / 0.8), "١٠ كجم") : "") + tag("قناع دهب", 150, 80, u, 2.4);
});
// 18: توابيت جوه بعض والحرامية
shot(18, camMove([300, 200, 1], [340, 210, 1.12]), function (u, d, t) {
  var s = tomb(t) + thief(90, 300, t);
  var cols = ["#8a5a2a", "#a06a3a", GOLD];
  for (var i = 0; i < 3; i++) { var k = ease((u - 1.5 - i * 0.9) / 0.8); if (k > 0) s += coffin(360, 220, (1.25 - i * 0.22) * (0.6 + 0.4 * k), cols[i], i === 2 ? "#e8c46a" : "#c9a04e"); }
  return s + tag("توابيت جوه بعض", 360, 70, u, 1.4) + (u > 5 ? weight(520, 315, pop((u - 5) / 0.8), "١١٠ كجم") : "");
});
// 19: تابوت حجري ومقبرة في الجبل
shot(19, camMove([320, 230, 1.2], [320, 170, 0.92]), function (u, d, t) {
  var lid = ease((u - 0.8) / 1.5);
  return sky("dusk") + sun(520, 90, 30, "#f7a24a") + '<path d="M-400 300 L-60 60 L120 180 L320 40 L560 190 L760 90 L1100 300 Z" fill="#b8865a" stroke="' + INK + '" stroke-width="3"/>' +
    '<path d="M300 300 V250 Q320 236 340 250 V300 Z" fill="#2a1a10" stroke="' + INK + '" stroke-width="2.4"/>' + desert(t, 300) +
    G(320, 210, 0.55, '<rect x="-150" y="-30" width="300" height="80" rx="6" fill="#9a9a92" stroke="' + INK + '" stroke-width="3"/>' + coffin(0, 0, 0.9, GOLD, "#e8c46a") + '<rect x="-160" y="' + f(-130 + lid * 90) + '" width="320" height="26" rx="6" fill="#b8b4ac" stroke="' + INK + '" stroke-width="3"/>') +
    tag("تابوت حجري", 180, 70, u, 1.0) + tag("مستخبية في الجبل", 470, 120, u, 2.8, 4, 20);
});
// 20: سبعين يوم مع الكهنة
shot(20, camPush(320, 220, 1, 1.1), function (u, d, t) {
  var days = Math.max(1, Math.min(70, Math.floor(clamp((u - 0.8) / 2.6) * 70)));
  return workshop(t) + bed(300, 270, 1) + body(300, 254, 1, t, { wrap: 1, mask: 1 }) + priest(130, 280, t, "point") + priest(470, 280, t, "think") + calendar(520, 110, days) + tag("سبعين يوم", 260, 80, u, 1.2);
});
// 21: أوروبا بتطحن المومياوات كدوا
shot(21, camPush(320, 220, 1, 1.15), function (u, d, t) {
  var s = fill("#5a3e2a") + '<rect x="-400" y="270" width="1440" height="400" fill="#8a6a48" stroke="' + INK + '" stroke-width="2"/>';
  for (var r = 0; r < 2; r++) { s += '<rect x="60" y="' + (120 + r * 80) + '" width="520" height="10" fill="#a06a3a" stroke="' + INK + '" stroke-width="2"/>'; for (var i = 0; i < 7; i++) s += potJar(90 + i * 75, 120 + r * 80, 0.8, ["#3a8fd9", "#4f9f5a", "#c98a2a", "#8a4fc4"][(i + r) % 4]); }
  s += '<rect x="230" y="250" width="200" height="20" fill="#6a4020" stroke="' + INK + '" stroke-width="2.4"/>' + mortar(330, 248, 0.8, t) + label("MUMMIA", 330, 236, 12, "#3a2a1e", 900);
  return s + person(520, 300, t, { mood: "shock", pose: "point", shirt: "#7a3a2a" }) + tag("بيطحنوا المومياوات", 300, 100, u, 1.2, -3, 22) + tag("كدوا!", 520, 140, u, 3.8, 6, 28, "#f2a0a0");
});
// 22: المنظومة كاملة
shot(22, camPush(320, 200, 1.1, 1), function (u, d, t) {
  var s = fill("#f3e6c8"), xs = [90, 182, 274, 366, 458, 550];
  var icons = [
    '<path d="M-24 10 Q0 -14 24 10 Z" fill="' + SAND + '" stroke="' + INK + '" stroke-width="2"/>',
    jar(0, 20, 0.45, 0, t),
    '<path d="M-22 14 Q0 -26 22 14 Z" fill="#fff" stroke="' + INK + '" stroke-width="2"/>',
    linenRoll(-8, 0, 0.9, 0),
    G(0, 0, 0.36, maskFace(t)),
    coffin(0, 0, 0.22, GOLD, "#e8c46a")];
  var names = ["تنشيف", "الأعضاء", "النطرون", "الكتان", "القناع", "التوابيت"];
  for (var i = 0; i < 6; i++) { s += icon(xs[i], 170, u, 0.3 + i * 0.45, icons[i]); if (u > 0.5 + i * 0.45) s += label(names[i], xs[i], 226, 15, INK, 900); if (i < 5) s += arrow(xs[i] + 36, 170, xs[i + 1] - 36, 170, "#c23a26", 3, ease((u - 0.6 - i * 0.45) / 0.4)); }
  return s + pulse(320, 170, t, "#f2c230", 160) + tag("منظومة كاملة", 320, 80, u, 2.0) + check(320, 290, u, 3.5, 1.2);
});
// 23: السندوتش تاني قصاد المومياء
shot(23, camMove([320, 210, 1.15], [320, 200, 1]), function (u, d, t) {
  return room(t, "#e9dcc4", "#b99a76") + sandwich(140, 240, 1.2, t, 1) + cross(140, 150, u, 0.8) + vitrine(450, 240, 0.85, t) + check(450, 150, u, 1.4) +
    tag("ملح + كتان + صبر", 300, 95, u, 3.0, -2, 24);
});
// 24: الختام
shot(24, camPush(320, 190, 1, 1.12), function (u, d, t) {
  return fill("#2a3a5a") + stars(t) + pyramids(230, 330, 0.9) + qmark(320, 200, t, 120) + pulse(320, 160, t, "#f2c230", 70) + tag("المرة الجاية؟", 320, 290, u, 0.6, -2, 26);
});
