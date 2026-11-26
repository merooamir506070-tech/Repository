// «إزاي الست الفرعونية كانت بتعرف إنها حامل؟» بستايل السكتش — اللوحة 640×800
// السطر 0 = كارت البداية (intro)، السطر 24 = كارت الملخص (outro)، والمشاهد من 1 لـ23.
var SAND = "#d8c9a3", STONE = "#cbb98f", WIG = "#3a2f28", WHEAT = "#c98f2e", BARLEY = "#b9a76a", LINEN = "#e2d6b6", RED = "#b8432c", LEAF = "#7f9a45";

// ── أدوات رسم خاصة بالفيديو ده ─────────────────────────────
function numBoxR(text, x, y, k, sz) { k = pop(k == null ? 1 : k); if (k <= 0) return ""; sz = sz || 22; var w = text.length * sz * 0.58 + 28; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')"><rect x="' + f(-w / 2) + '" y="' + f(-sz * 0.95) + '" width="' + f(w) + '" height="' + f(sz * 1.6) + '" rx="5" fill="' + INK + '"/><text x="0" y="' + f(sz * 0.32) + '" text-anchor="middle" style="font:800 ' + sz + 'px Noto Sans Arabic;fill:#fff;direction:rtl;unicode-bidi:plaintext">' + text + '</text></g>'; }
function G(x, y, s, inner, rot) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ')' + (rot ? ' rotate(' + f(rot) + ')' : "") + ' scale(' + f(s == null ? 1 : s) + ')">' + inner + '</g>'; }
function stroke(d, col, w, ex) { return '<path d="' + d + '" fill="none" stroke="' + (col || INK) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (ex || "") + '/>'; }
function limb(d, col) { return stroke(d, INK, 14) + stroke(d, col || SKIN, 10); }
function desert(y) { return '<rect x="-600" y="' + y + '" width="1840" height="1200" fill="' + SAND + '"/><rect x="-600" y="' + y + '" width="1840" height="1200" fill="url(#hatch)"/>' + stroke("M-600 " + y + " H1240", INK, 2); }
function pyramid(x, y, w, h) { return shape("M" + f(x - w / 2) + " " + f(y) + " L" + f(x) + " " + f(y - h) + " L" + f(x + w / 2) + " " + f(y) + " Z", STONE) + shape("M" + f(x) + " " + f(y - h) + " L" + f(x + w / 2) + " " + f(y) + " L" + f(x + w * 0.12) + " " + f(y) + " Z", "#b5a274", true); }
function stoneWall() {   // جدار معبد: حجارة بخطوط
  var s = '<rect x="-600" y="-600" width="1840" height="2000" fill="' + SAND + '"/>';
  for (var r = 0; r < 22; r++) { var yy = -600 + r * 90; s += stroke("M-600 " + yy + " H1240", "#a8946a", 1.4); for (var c = 0; c < 18; c++) { var xx = -600 + c * 130 + (r % 2) * 65; s += stroke("M" + xx + " " + yy + " V" + (yy + 90), "#a8946a", 1.4); } }
  return s + '<rect x="-600" y="-600" width="1840" height="2000" fill="url(#hatch)" opacity=".5"/>';
}
// ست فرعونية مرسومة على الجدار (بروفايل ناحية اليمين). الأصل عند رجليها، وطولها حوالي 320
function wallWoman(x, y, s, t) {
  var a = Math.sin(t * 1.6) * 6;
  var g = limb("M-20 -200 L-30 -110") +
    shape("M-28 -202 L28 -202 L40 0 L-32 0 Z", BONE, true) +
    stroke("M-22 -120 L30 -120", GREY, 1.2) +
    '<ellipse cx="-12" cy="2" rx="14" ry="5" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="1.6"/><ellipse cx="20" cy="2" rx="14" ry="5" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="1.6"/>' +
    R(-8, -238, 16, 22, SKIN, 1.8) +
    '<ellipse cx="0" cy="-206" rx="40" ry="15" fill="' + BLUE + '" stroke="' + INK + '" stroke-width="2"/><ellipse cx="0" cy="-206" rx="30" ry="9" fill="' + ORANGE + '" stroke="' + INK + '" stroke-width="1.2"/><ellipse cx="0" cy="-208" rx="18" ry="5" fill="' + OLIVE + '" stroke="' + INK + '" stroke-width="1"/>' +
    shape("M-10 -296 C10 -300 22 -287 24 -272 L31 -263 L24 -259 C25 -249 18 -239 6 -237 L-10 -237 Z", SKIN) +
    shape("M-36 -278 C-36 -308 22 -312 22 -284 L10 -284 L8 -252 L-10 -230 L-38 -230 Z", WIG, false) +
    stroke("M-30 -250 H4", "#5a4a3e", 1.2) + stroke("M-32 -264 H6", "#5a4a3e", 1.2) +
    shape("M9 -273 Q15 -278 21 -273 Q15 -269 9 -273 Z", INK, false, 1) + stroke("M21 -273 L27 -275", INK, 1.6) +
    limb("M20 -200 L48 " + f(-160 - a) + " L66 " + f(-178 - a));
  return G(x, y, s, g);
}
function ankh(x, y, s) { return G(x, y, s, stroke("M0 -30 C-13 -30 -13 -9 0 -6 C13 -9 13 -30 0 -30 Z M-15 -4 H15 M0 -6 V26", INK, 3.5)); }
function eyeGlyph(x, y, s) { return G(x, y, s, stroke("M-22 0 Q0 -16 22 0 Q0 12 -22 0 Z M22 0 H30 M-6 6 L-12 22 M4 7 Q10 18 18 16", INK, 3) + circle(0, -1, 5, INK)); }
function birdGlyph(x, y, s) { return G(x, y, s, stroke("M-20 10 Q-10 -14 8 -12 L18 -18 L16 -8 Q14 10 -2 12 Z M-20 10 L-30 18 M0 12 V24 M6 12 V24", INK, 3)); }
function glyphRow(x, y, n, k) { var s = "", F = [ankh, eyeGlyph, birdGlyph]; for (var i = 0; i < n; i++) if (k > i / n) s += F[i % 3](x + i * 62, y, 0.85); return s; }
// بردية بتتفرد: w العرض الكامل، k من 0 لـ1
function papyrus(x, y, w, h, k, t, glyphs) {
  var ww = Math.max(30, w * clamp(k)), s = R(x - ww / 2, y - h / 2, ww, h, "#e9d9a8", 2, 3) + '<rect x="' + f(x - ww / 2) + '" y="' + f(y - h / 2) + '" width="' + f(ww) + '" height="' + f(h) + '" fill="url(#hatch)" opacity=".5"/>';
  for (var i = 0; i < 6; i++) s += stroke("M" + f(x - ww / 2 + 10) + " " + f(y - h / 2 + 20 + i * (h - 30) / 6) + " H" + f(x + ww / 2 - 10), "#c9b37a", 1);
  if (glyphs && k > 0.6) { var g = ""; for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) { var j = r * 4 + c; if ((t * 3) % 14 > j || k >= 1 && t > 99) g += [ankh, eyeGlyph, birdGlyph][j % 3](x - ww / 2 + 50 + c * (ww - 100) / 3, y - h / 2 + 55 + r * (h - 90) / 2.4, 0.6); } s += '<g opacity="' + f(clamp((k - 0.6) / 0.4)) + '">' + g + '</g>'; }
  return s + R(x - ww / 2 - 14, y - h / 2 - 8, 18, h + 16, "#c9a86a", 2, 8) + R(x + ww / 2 - 4, y - h / 2 - 8, 18, h + 16, "#c9a86a", 2, 8);
}
// شوال قماش، open = مفتوح وباين الحبوب
function sack(x, y, s, grain, open, t, tag) {
  var sw = Math.sin(t * 2 + x) * 1.5;
  var g = shape("M-60 70 C-74 20 -64 -30 -40 -46 C-28 -52 28 -52 40 -46 C64 -30 74 20 60 70 Z", LINEN, true) + stroke("M-30 -20 Q-36 20 -26 60 M24 -24 Q34 10 30 58 M-6 40 Q2 52 10 44", "#a89870", 1.4);
  if (open) g += shape("M-40 -46 Q0 -92 40 -46 Z", grain, false, 1.6) + '<ellipse cx="0" cy="-46" rx="46" ry="10" fill="none" stroke="' + INK + '" stroke-width="5"/><ellipse cx="0" cy="-46" rx="46" ry="10" fill="none" stroke="' + LINEN + '" stroke-width="3"/>' + stroke("M-18 -60 l6 -3 M4 -70 l6 2 M14 -56 l5 -4 M-6 -54 l-5 -3", INK, 1.2);
  else g += shape("M-26 -48 L-38 -88 L-16 -74 L0 -96 L16 -74 L38 -88 L26 -48 Z", LINEN, true, 1.8) + stroke("M-30 -50 Q0 -42 30 -50", ORANGE, 5);
  if (tag) g += T(tag, 0, 30, 24, INK, 800);
  return G(x, y + sw, s, g);
}
function grainsFalling(x, y, t, col, n) { var s = ""; for (var i = 0; i < (n || 8); i++) { var k = (t * 0.9 + hash(i)) % 1; s += '<ellipse cx="' + f(x + (hash(i + 2) - 0.5) * 70 + Math.sin(i + t) * 6) + '" cy="' + f(y + k * 120) + '" rx="5" ry="2.6" fill="' + col + '" stroke="' + INK + '" stroke-width=".8" opacity="' + f(1 - k * 0.6) + '"/>'; } return s; }
// نبتة: k من 0 لـ1 طولها
function sprout(x, y, k, t, hgt) {
  k = clamp(k); if (k <= 0) return ""; hgt = (hgt || 110) * k; var sw = Math.sin(t * 2 + x * 0.1) * 6 * k, tx = x + sw, ty = y - hgt;
  var s = stroke("M" + f(x) + " " + f(y) + " Q" + f(x + sw * 0.3) + " " + f(y - hgt * 0.5) + " " + f(tx) + " " + f(ty), LEAF, 5);
  if (k > 0.35) { var lk = clamp((k - 0.35) / 0.4), mx = x + sw * 0.4, my = y - hgt * 0.55; s += shape("M" + f(mx) + " " + f(my) + " q" + f(-26 * lk) + " " + f(-6 * lk) + " " + f(-36 * lk) + " " + f(-28 * lk) + " q" + f(22 * lk) + " " + f(0) + " " + f(36 * lk) + " " + f(28 * lk) + " Z", LEAF, false, 1.5) + shape("M" + f(mx) + " " + f(my - 8) + " q" + f(26 * lk) + " " + f(-6 * lk) + " " + f(36 * lk) + " " + f(-26 * lk) + " q" + f(-22 * lk) + " 0 " + f(-36 * lk) + " " + f(26 * lk) + " Z", LEAF, false, 1.5); }
  return s + '<ellipse cx="' + f(tx) + '" cy="' + f(ty) + '" rx="' + f(5 * k) + '" ry="' + f(9 * k) + '" fill="' + LEAF + '" stroke="' + INK + '" stroke-width="1.2"/>';
}
function sprouts(x, y, k, t, n, hgt) { var s = ""; n = n || 3; for (var i = 0; i < n; i++) s += sprout(x + (i - (n - 1) / 2) * 24, y + Math.abs(i - (n - 1) / 2) * 4, k - i * 0.12, t + i, (hgt || 100) * (0.8 + hash(i + x) * 0.4)); return s; }
function maleSym(x, y, r, col, k) { k = pop(k == null ? 1 : k); if (k <= 0) return ""; return G(x, y, k, '<circle cx="-6" cy="6" r="' + r + '" fill="' + PAPER + '" stroke="' + col + '" stroke-width="7"/>' + stroke("M" + f(r * 0.5) + " " + f(-r * 0.5) + " L" + f(r * 1.3) + " " + f(-r * 1.3) + " M" + f(r * 0.6) + " " + f(-r * 1.3) + " H" + f(r * 1.3) + " V" + f(-r * 0.6), col, 7)); }
function femaleSym(x, y, r, col, k) { k = pop(k == null ? 1 : k); if (k <= 0) return ""; return G(x, y, k, '<circle cx="0" cy="' + f(-r * 0.5) + '" r="' + r + '" fill="' + PAPER + '" stroke="' + col + '" stroke-width="7"/>' + stroke("M0 " + f(r * 0.5) + " V" + f(r * 1.6) + " M" + f(-r * 0.55) + " " + f(r * 1.1) + " H" + f(r * 0.55), col, 7)); }
// شريط حمل: k1 و k2 بيظهروا الخطين
function testStrip(x, y, s, k1, k2, t, rot) {
  var g = R(-34, -150, 68, 300, "#fbf8ef", 2.4, 30) + R(-34, 60, 68, 90, "#9fb8cc", 2.4, 0, ' opacity=".9"') + R(-20, -95, 40, 110, "#f4efe0", 2, 6) +
    '<rect x="-14" y="-70" width="28" height="7" rx="2" fill="' + RED + '" opacity="' + f(clamp(k1)) + '"/><rect x="-14" y="-36" width="28" height="7" rx="2" fill="' + RED + '" opacity="' + f(clamp(k2)) + '"/>' +
    circle(0, 40, 9, PAPER, false, 1.6);
  return G(x, y, s, g, rot);
}
function heart(x, y, s, t) { var b = 1 + 0.08 * Math.sin(t * 7); return G(x, y, s * b, shape("M0 18 C-40 -8 -26 -40 0 -22 C26 -40 40 -8 0 18 Z", RED, true)); }
function drop(x, y, s) { return G(x, y, s, shape("M0 -14 C6 -4 10 2 10 6 A10 10 0 0 1 -10 6 C-10 2 -6 -4 0 -14 Z", "#9fb8cc")); }
function jar(x, y, s) { return G(x, y, s, shape("M-30 -60 H30 L24 -48 C52 -30 52 40 22 60 H-22 C-52 40 -52 -30 -24 -48 Z", "#b5683c", true) + stroke("M-36 -10 H36", INK, 1.5)); }
function flask(x, y, s, t, col) {
  var g = shape("M-14 -90 H14 V-40 L58 60 Q62 72 50 72 H-50 Q-62 72 -58 60 L-14 -40 Z", "url(#glass)") + shape("M-36 14 H36 L58 60 Q62 72 50 72 H-50 Q-62 72 -58 60 Z", col || "#c7a640", false, 1.5);
  for (var i = 0; i < 6; i++) { var k = (t * 0.8 + hash(i)) % 1; g += '<circle cx="' + f((hash(i + 1) - 0.5) * 50 * (1 - k * 0.7)) + '" cy="' + f(60 - k * 130) + '" r="' + f(3 + hash(i) * 3) + '" fill="none" stroke="' + INK + '" stroke-width="1.2" opacity="' + f(1 - k) + '"/>'; }
  return G(x, y, s, g);
}
function tube(x, y, s, col, lvl) { return G(x, y, s, R(-14, -80, 28, 160, "url(#glass)", 2, 12) + R(-12, 80 - 150 * (lvl || 0.5), 24, 150 * (lvl || 0.5) - 2, col, 1.2, 10) + R(-18, -88, 36, 10, PUTTY, 2, 3)); }
function tray(x, y, w, col) { return R(x - w / 2, y, w, 34, col || "#8a6a48", 2, 6) + '<rect x="' + f(x - w / 2) + '" y="' + f(y) + '" width="' + f(w) + '" height="34" fill="url(#hatch)"/>'; }
function bigBang(x, y, t, k) { k = pop(k); if (k <= 0) return ""; var s = ""; for (var i = 0; i < 12; i++) { var a = i / 12 * 6.283 + t * 0.4, r1 = 120 + 10 * Math.sin(t * 6 + i), r2 = r1 + 50; s += stroke("M" + f(Math.cos(a) * r1) + " " + f(Math.sin(a) * r1) + " L" + f(Math.cos(a) * r2) + " " + f(Math.sin(a) * r2), ORANGE, 6); } return G(x, y, k, s + T("!", 0, 70, 240, ORANGE, 900)); }
function stamp(x, y, text, k, t) { k = pop(k); if (k <= 0) return ""; return G(x, y, k * (1 + 0.02 * Math.sin(t * 5)), '<rect x="-150" y="-50" width="300" height="100" rx="10" fill="none" stroke="' + RED + '" stroke-width="7"/><rect x="-138" y="-38" width="276" height="76" rx="6" fill="none" stroke="' + RED + '" stroke-width="2"/>' + T(text, 0, 22, 60, RED, 900), -12); }
function dayTicks(x, y, n, k) { var s = ""; for (var i = 0; i < 3; i++) { var on = n > i; s += R(x + (2 - i) * 90 - 34, y - 34, 68, 68, on ? BONE : PAPER, 2, 8) + (on ? T(["١", "٢", "٣"][i], x + (2 - i) * 90, y + 16, 40, ORANGE, 900) : ""); } return s; }
function gauge(x, y, r, v) {
  var a0 = Math.PI, a1 = Math.PI + Math.PI * v, d = "M" + f(x - r) + " " + f(y) + " A" + r + " " + r + " 0 0 1 " + f(x + r) + " " + f(y);
  var e = "M" + f(x - r) + " " + f(y) + " A" + r + " " + r + " 0 0 1 " + f(x + Math.cos(a1) * r) + " " + f(y + Math.sin(a1) * r);
  return stroke(d, PUTTY, 34) + stroke(d, INK, 1.5, ' transform="translate(0 17)"') + (v > 0.01 ? stroke(e, OLIVE, 30) : "") + stroke("M" + f(x) + " " + f(y) + " L" + f(x + Math.cos(a1) * (r - 40)) + " " + f(y + Math.sin(a1) * (r - 40)), INK, 5) + circle(x, y, 12, INK) + T(Math.round(v * 100) + "%", x, y + 80, 64, OLIVE, 900);
}

var SKIN2 = "#c98e6c", HAIR = "#4a3426", WHITE = "#f7f3e8";
function P(d, fill, sw, hatched) { return shape(d, fill, hatched, sw || 2.2); }
function limbS(d, col, w) { w = w || 22; return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + (w + 4) + '" stroke-linecap="round" stroke-linejoin="round"/><path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
function eyesF(lash, glasses) {
  var s = '<ellipse cx="-12" cy="-300" rx="4" ry="5" fill="' + INK + '"/><ellipse cx="12" cy="-300" rx="4" ry="5" fill="' + INK + '"/>';
  if (lash) s += stroke("M-19 -301 Q-12 -308 -4 -302 L0 -304 M19 -301 Q12 -308 4 -302 M-19 -301 L-25 -304 M19 -301 L25 -304", INK, 2);
  if (glasses) s += '<circle cx="-13" cy="-300" r="11" fill="none" stroke="' + INK + '" stroke-width="2.4"/><circle cx="13" cy="-300" r="11" fill="none" stroke="' + INK + '" stroke-width="2.4"/>' + stroke("M-2 -301 H2 M-24 -302 L-34 -305 M24 -302 L34 -305", INK, 2);
  return s;
}
function faceF(o) {
  o = o || {}; var s = circle(0, -292, 36, o.skin || SKIN);
  s += eyesF(o.lash, o.glasses) + stroke("M-19 -314 Q-12 -318 -5 -314 M19 -314 Q12 -318 5 -314", o.brow || INK, 2.4) + stroke("M0 -296 L-3 -284 L2 -283", INK, 1.6);
  s += o.mus ? P("M-14 -273 Q0 -280 14 -273 Q8 -270 0 -272 Q-8 -270 -14 -273 Z", o.mus, 1.2) + stroke("M-8 -266 Q0 -262 8 -266", INK, 2) : stroke("M-9 -272 Q0 -265 9 -272", o.lip || INK, 2.4);
  return s;
}
function legs(col, shoe) { return limbS("M-14 -120 L-16 -14", col, 22) + limbS("M14 -120 L16 -14", col, 22) + '<ellipse cx="-20" cy="-6" rx="17" ry="8" fill="' + (shoe || INK) + '" stroke="' + INK + '" stroke-width="2"/><ellipse cx="20" cy="-6" rx="17" ry="8" fill="' + (shoe || INK) + '" stroke="' + INK + '" stroke-width="2"/>'; }
function feetBare(sk) { return '<ellipse cx="-16" cy="-6" rx="15" ry="7" fill="' + sk + '" stroke="' + INK + '" stroke-width="2"/><ellipse cx="16" cy="-6" rx="15" ry="7" fill="' + sk + '" stroke="' + INK + '" stroke-width="2"/>'; }
function collar(y) { return '<ellipse cx="0" cy="' + y + '" rx="52" ry="20" fill="' + BLUE + '" stroke="' + INK + '" stroke-width="2"/><ellipse cx="0" cy="' + (y - 2) + '" rx="40" ry="13" fill="' + ORANGE + '" stroke="' + INK + '" stroke-width="1.4"/><ellipse cx="0" cy="' + (y - 4) + '" rx="26" ry="7" fill="' + OLIVE + '" stroke="' + INK + '" stroke-width="1.2"/>'; }


// ست مصرية بطرحة وحامل، ماسكة شريط الحمل في إيدها المرفوعة (الأصل عند رجليها)
function womanHijabPreg(t, strip) {
  var b = Math.sin(t * 1.6) * 2;
  return legs(INK, "#5a4a3e") +
    P("M-48 -228 L44 -228 C52 -204 96 -176 92 -124 C88 -92 62 -84 58 -60 L56 -14 L-56 -14 C-60 -60 -58 -150 -48 -228 Z", "#46698a", 2.2, true) +
    stroke("M30 -196 C70 -178 84 -140 70 -104", "#2f4c66", 2) + stroke("M-8 -200 V-14", INK, 1.2) +
    limbS("M44 -220 L74 " + f(-176 + b) + " L50 " + f(-140 + b), "#46698a", 20) + circle(48, -138 + b, 10, SKIN) +
    limbS("M-46 -220 L-104 -176 L-104 -246", "#46698a", 20) + circle(-104, -252, 10, SKIN) + (strip || "") +
    P("M-46 -296 C-50 -350 50 -350 46 -296 L58 -226 C30 -210 -30 -210 -58 -226 Z", "#b5683c", 2.2, true) + faceF({ lash: true, lip: "#8a3a2a" }) +
    stroke("M-38 -300 C-38 -332 38 -332 38 -300", "#b5683c", 6);
}
// 0 — النهارده الست بتعرف إنها حامل بشريط من الصيدلية
shot(0, camPush(320, 420, 1, 1.06), function (u, d, t) {
  var k1 = ease((u - 0.6) / 0.5), k2 = ease((u - 1.5) / 0.5), glow = 0.55 + 0.45 * Math.sin(t * 6);
  var small = testStrip(-104, -282, 0.28, k1, k2, t, -8);
  var big = testStrip(0, 64, 1.6, k1, k2, t, 0) + (k1 > 0.5 ? '<ellipse cx="0" cy="-48" rx="44" ry="20" fill="url(#glowO)" opacity="' + f(0.6 * glow) + '"/>' : "") + (k2 > 0.5 ? '<ellipse cx="0" cy="6" rx="44" ry="20" fill="url(#glowO)" opacity="' + f(0.6 * glow) + '"/>' : "") +
    '<rect x="-22.4" y="-53.6" width="44.8" height="11.2" rx="3" fill="' + RED + '" opacity="' + f(k1) + '"/><rect x="-22.4" y="0.8" width="44.8" height="11.2" rx="3" fill="' + RED + '" opacity="' + f(k2) + '"/>';
  return paper() + R(-600, 640, 1840, 600, "#d9cfb6", 2) + '<rect x="-600" y="640" width="1840" height="600" fill="url(#hatch)"/>' +
    G(420, 720, 1.3, womanHijabPreg(t, small)) +
    stroke("M282 352 L240 290", INK, 1.6, ' stroke-dasharray="6 5"') +
    inset(165, 200, 125, big, (u - 0.2) / 0.6) + ring(165, 179, 56, t, ease((u - 2.2) / 0.8)) +
    label(470, 560, 270, 640, "حامل", ORANGE, ease((u - 2.8) / 0.7), 28);
});

// 1 — من أكتر من تلات تلاف سنة: الصحرا والأهرامات
shot(1, camPan(260, 380, 420, 1.05), function (u, d, t) {
  var sx = 120 + u * 40;
  return paper() + '<rect x="-600" y="-600" width="1840" height="1100" fill="#f3d9a0" opacity=".5"/>' + sunS(sx, 170, 46, t) + pyramid(220, 560, 300, 200) + pyramid(450, 560, 360, 250) + pyramid(600, 560, 200, 130) + desert(560) +
    numBoxR("أكتر من 3000 سنة", 330, 680, (u - 0.6) / 0.8, 30);
});
// 2 — السؤال: الست الفرعونية مرسومة على جدار المعبد
shot(2, camPush(320, 420, 1, 1.1), function (u, d, t) {
  var q1 = 1 + 0.1 * Math.sin(t * 5), q2 = 1 + 0.1 * Math.sin(t * 5 + 2);
  return stoneWall() + '<circle cx="80" cy="200" r="' + f(150 + 14 * Math.sin(t * 9) + 6 * Math.sin(t * 23)) + '" fill="url(#glowO)" opacity=".45"/>' + wallWoman(260, 640, 1.35, t) +
    glyphRow(80, 720, 3, 1) + G(470, 260, pop(u / 0.5) * q1, T("؟", 0, 40, 130, ORANGE, 900)) + G(530, 470, pop((u - 2.2) / 0.5) * q2, T("؟", 0, 40, 110, BLUE, 900));
});
// 3 — بردية برلين الطبية
shot(3, camPush(320, 400, 1, 1.12), function (u, d, t) {
  return paper() + papyrus(320, 380, 480, 360, ease(u / 1.4), t * 1.6, true) + label(320, 560, 320, 650, "بردية برلين الطبية", OLIVE, ease((u - 1.8) / 0.8), 26);
});
// 4 — عمرها حوالي 3300 سنة: عدّاد بيلف
shot(4, camPush(320, 400, 1.02, 1.1), function (u, d, t) {
  var n = Math.round(3300 * ease(u / 1.8));
  return paper() + '<g opacity=".55">' + papyrus(320, 300, 420, 260, 1, t, true) + '</g>' + numBoxR(n + " سنة", 320, 520, 1, 46) + T("حوالي 1300 قبل الميلاد", 320, 640, 26, GREY, 700);
});
// 5 — كيسين قماش صغيرين
shot(5, camPush(320, 420, 1, 1.1), function (u, d, t) {
  var y1 = lerp(-200, 470, ease(u / 0.7)), y2 = lerp(-200, 470, ease((u - 0.5) / 0.7));
  return paper() + desert(540) + sack(210, y1, 1.3, WHEAT, false, t) + sack(430, y2, 1.3, BARLEY, false, t) + label(470, 420, 560, 260, "كيس قماش", OLIVE, ease((u - 1.8) / 0.8));
});
// 6 — قمح وشعير
shot(6, camPush(320, 430, 1, 1.12), function (u, d, t) {
  return paper() + desert(540) + sack(200, 470, 1.3, WHEAT, true, t, "قمح") + sack(440, 470, 1.3, BARLEY, true, t, "شعير") +
    (u > 0.3 ? grainsFalling(200, 230, t, WHEAT) : "") + (u > 1.6 ? grainsFalling(440, 230, t, BARLEY) : "") +
    label(200, 390, 110, 640, "قمح", WHEAT, ease((u - 0.5) / 0.7), 32) + label(440, 390, 540, 640, "شعير", OLIVE, ease((u - 1.8) / 0.7), 32);
});
// 7 — كل يوم: نقط مية بتنزل على الكيسين جنب الجرة
shot(7, camPan(290, 350, 430, 1.06), function (u, d, t) {
  var s = paper() + desert(560) + jar(560, 500, 1.1) + sack(190, 490, 1.15, WHEAT, true, t, "قمح") + sack(380, 490, 1.15, BARLEY, true, t, "شعير");
  for (var i = 0; i < 6; i++) { var k = (t * 1.2 + i / 6) % 1, xx = i % 2 ? 380 : 190; s += drop(xx + (hash(i) - 0.5) * 50, 180 + k * 220, 1.2); }
  return s + numBox("كل يوم", 300, 160, (u - 1.2) / 0.6, 30);
});
// 8 — تستنى كام يوم: الشمس بتطلع وتغيب
shot(8, camPush(320, 400, 1, 1.06), function (u, d, t) {
  var day = u / d * 3, a = (day % 1) * Math.PI, sx = 320 - Math.cos(a) * 250, sy = 470 - Math.sin(a) * 300;
  return paper() + '<rect x="-600" y="-600" width="1840" height="1100" fill="#1b2a3a" opacity="' + f(0.35 * (1 - Math.sin(a))) + '"/>' + sunS(sx, sy, 38, t) + desert(500) + sack(220, 600, 0.9, WHEAT, true, t, "قمح") + sack(420, 600, 0.9, BARLEY, true, t, "شعير") + dayTicks(230, 140, Math.floor(day) + 1, 1);
});
// 9 — ما نبتتش: مفيش حمل
shot(9, camPush(320, 430, 1, 1.1), function (u, d, t) {
  return paper() + desert(560) + sack(210, 490, 1.25, WHEAT, true, t, "قمح") + sack(430, 490, 1.25, BARLEY, true, t, "شعير") + dots(t, 120, 520, 400, 40, 10, "#b5a274", 8) +
    crossMark(320, 280, 2, (u - 0.6) / 0.5) + label(430, 440, 540, 660, "مفيش حمل", ORANGE, ease((u - 1.6) / 0.8), 28);
});
// 10 — نبتت: مبروك
shot(10, camPush(320, 420, 1, 1.1), function (u, d, t) {
  var k = ease(u / 1.8);
  return paper() + desert(580) + sack(200, 510, 1.2, WHEAT, true, t, "قمح") + sack(440, 510, 1.2, BARLEY, true, t, "شعير") + sprouts(200, 440, k, t, 3) + sprouts(440, 440, k, t, 3) +
    (u > 1.8 ? heart(320, 200, 2 * pop((u - 1.8) / 0.5), t) : "") + label(320, 230, 470, 120, "حامل!", ORANGE, ease((u - 2.4) / 0.7), 30);
});
// 11 — الجزء الأغرب
shot(11, camPush(320, 470, 1, 1.25), function (u, d, t) {
  var s = paper() + desert(580) + sack(220, 510, 1.2, WHEAT, true, t, "قمح") + sack(420, 510, 1.2, BARLEY, true, t, "شعير") + '<rect x="-600" y="-600" width="1840" height="2000" fill="#141414" opacity="' + f(0.35 * ease(u / 1)) + '"/>';
  for (var i = 0; i < 7; i++) { var k = (t * 0.7 + hash(i)) % 1, sc = Math.sin(k * Math.PI); s += G(120 + hash(i + 3) * 400, 200 + hash(i + 8) * 220, sc, shape("M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z", "#f2c26a", false, 1)); }
  return s + ring(320, 440, 190, t, ease((u - 0.4) / 1.2));
});
// 12 — الشعير نبت الأول: ولد
shot(12, camPush(320, 420, 1, 1.08), function (u, d, t) {
  return paper() + desert(600) + sack(200, 530, 1.15, WHEAT, true, t, "قمح") + sack(440, 530, 1.15, BARLEY, true, t, "شعير") + sprouts(440, 462, ease(u / 1.4), t, 3, 150) +
    label(470, 560, 520, 700, "شعير", OLIVE, ease((u - 0.3) / 0.7), 28) + maleSym(200, 230, 46, BLUE, (u - 1.6) / 0.5) + label(200, 290, 80, 380, "ولد", BLUE, ease((u - 2) / 0.6), 32);
});
// 13 — القمح نبت الأول: بنت
shot(13, camPush(320, 420, 1, 1.08), function (u, d, t) {
  return paper() + desert(600) + sack(200, 530, 1.15, WHEAT, true, t, "قمح") + sack(440, 530, 1.15, BARLEY, true, t, "شعير") + sprouts(200, 462, ease(u / 1.4), t, 3, 150) +
    label(170, 560, 120, 700, "قمح", WHEAT, ease((u - 0.3) / 0.7), 28) + femaleSym(440, 220, 42, ORANGE, (u - 1.6) / 0.5) + label(440, 300, 560, 380, "بنت", ORANGE, ease((u - 2) / 0.6), 32);
});
// 14 — الناس فاكراه خرافة
shot(14, camPush(320, 400, 1.05, 1.12), function (u, d, t) {
  return paper() + papyrus(320, 380, 460, 320, 1 - 0.75 * ease((u - 0.2) / 1.2), t, true) + stamp(320, 400, "خرافة؟", (u - 1.6) / 0.5, t);
});
// 15 — سنة 1963، علماء في القاهرة
shot(15, camPan(280, 360, 420, 1.06), function (u, d, t) {
  var blink = Math.sin(t * 6) > 0;
  return paper() + R(-600, 560, 1840, 600, "#b39b7a", 2) + '<rect x="-600" y="560" width="1840" height="600" fill="url(#hatch)"/>' + lamp(320, 150, t, blink, 1.3) +
    flask(180, 490, 1.1, t, "#c7a640") + flask(470, 490, 0.9, t + 1, "#9fb8cc") + tube(330, 480, 0.9, OLIVE, 0.6) +
    numBox("1963", 320, 670, (u - 0.4) / 0.6, 40) + label(470, 430, 560, 300, "القاهرة", OLIVE, ease((u - 3.4) / 0.8), 28);
});
// 16 — تلات مجموعات عينات
shot(16, camPan(260, 380, 400, 1.04), function (u, d, t) {
  var s = paper() + R(60, 560, 520, 30, "#8a6a48", 2, 4);
  var G3 = [["حوامل", ORANGE, 150, 0.4], ["مش حوامل", BLUE, 320, 1.6], ["رجالة", GREY, 490, 3]];
  for (var g = 0; g < 3; g++) { var k = (u - G3[g][3]) / 0.5; if (k <= 0) continue; for (var j = 0; j < 3; j++) s += G(G3[g][2] + (j - 1) * 40, 470, pop(k), tube(0, 0, 0.75, G3[g][1], 0.45 + 0.05 * Math.sin(t * 3 + j))); s += '<g opacity="' + f(clamp(k)) + '">' + T(G3[g][0], G3[g][2], 640, 26, G3[g][1], 800) + '</g>'; }
  return s;
});
// 17 — مفاجأة للكل
shot(17, camPush(320, 400, 1, 1.15), function (u, d, t) {
  return paper() + bigBang(320, 380, t, u / 0.5) + dots(t, 80, 600, 480, 80, 18, ORANGE, 30);
});
// 18 — حوالي 70% من عينات الحوامل نبّتت
shot(18, camPush(320, 420, 1, 1.06), function (u, d, t) {
  var v = 0.7 * ease(u / 2);
  return paper() + gauge(320, 360, 190, v) + tray(320, 600, 460, null) + sprouts(320, 600, ease((u - 0.8) / 1.6), t, 7, 80) + label(520, 600, 560, 720, "عينات الحوامل", ORANGE, ease((u - 1.6) / 0.8), 24);
});
// 19 — الرجالة والستات اللي مش حوامل ما نبّتتش
shot(19, camPan(250, 390, 400, 1.04), function (u, d, t) {
  return paper() + tray(320, 230, 440) + sprouts(320, 230, 1, t, 7, 70) + T("حوامل", 320, 300, 24, ORANGE, 800) +
    tray(320, 420, 440) + dots(t, 120, 405, 400, 14, 10, "#b5a274", 4) + crossMark(560, 420, 0.8, (u - 0.6) / 0.5) + T("مش حوامل", 320, 490, 24, BLUE, 800) +
    tray(320, 610, 440) + dots(t, 120, 595, 400, 14, 10, "#b5a274", 4) + crossMark(560, 610, 0.8, (u - 1.2) / 0.5) + T("رجالة", 320, 680, 24, GREY, 800);
});
// 20 — الهرمونات بتنزل في البول وبتساعد البذرة تنبت
shot(20, camMove([320, 330, 1.0], [320, 470, 1.12]), function (u, d, t) {
  var s = paper() + tube(320, 200, 1.1, "#e6cf6a", 0.6) + desert(600) + '<ellipse cx="320" cy="600" rx="34" ry="18" fill="' + WHEAT + '" stroke="' + INK + '" stroke-width="2"/>';
  for (var i = 0; i < 14; i++) { var k = (t * 0.6 + hash(i)) % 1; s += '<circle cx="' + f(320 + Math.sin(k * 9 + i) * 40 * (1 - k)) + '" cy="' + f(300 + k * 290) + '" r="' + f(6 + hash(i) * 3) + '" fill="url(#glowO)"/><circle cx="' + f(320 + Math.sin(k * 9 + i) * 40 * (1 - k)) + '" cy="' + f(300 + k * 290) + '" r="3.5" fill="' + ORANGE + '"/>'; }
  return s + sprout(320, 590, ease((u - 2.5) / 2), t, 150) + label(345, 360, 480, 300, "هرمونات", BLUE, ease((u - 1) / 0.8), 28) + label(345, 600, 470, 700, "البذرة", OLIVE, ease((u - 3.4) / 0.8), 26);
});
// 21 — ولد ولا بنت: تخمين زي رمي العملة
shot(21, camPush(320, 400, 1, 1.1), function (u, d, t) {
  var c = Math.cos(t * 7), y = 360 - Math.abs(Math.sin(t * 2.2)) * 120, sym = c > 0 ? maleSym(0, 0, 30, BLUE, 1) : femaleSym(0, 6, 28, ORANGE, 1);
  return paper() + '<ellipse cx="320" cy="640" rx="' + f(90 - (360 - y) * 0.3) + '" ry="14" fill="' + INK + '" opacity=".15"/>' +
    '<g transform="translate(320 ' + f(y) + ') scale(' + f(Math.max(0.06, Math.abs(c))) + ' 1)"><circle r="110" fill="#e6c36a" stroke="' + INK + '" stroke-width="3"/><circle r="92" fill="url(#hatch)" stroke="' + INK + '" stroke-width="1.5"/>' + sym + '</g>' +
    numBox("بالصدفة", 320, 140, (u - 2.4) / 0.6, 32);
});
// 22 — الطريقة سافرت من مصر لأوروبا
shot(22, camMove([360, 500, 1.0], [300, 360, 1.05]), function (u, d, t) {
  var s = paper() + '<rect x="-600" y="-600" width="1840" height="2000" fill="#9fb8cc" opacity=".55"/>' +
    shape("M-600 -600 H1240 V250 C1000 300 860 210 720 260 C600 300 520 220 420 280 C330 330 240 250 120 290 C40 320 -100 270 -600 300 Z", "#d7cba8", true) +
    shape("M-600 1400 H1240 V560 C1000 540 880 600 720 560 C600 530 520 600 380 570 C260 540 120 600 -600 580 Z", SAND, true) +
    T("أوروبا", 260, 180, 30, OLIVE, 800) + T("مصر", 470, 660, 30, ORANGE, 800) + T("البحر المتوسط", 320, 430, 20, BLUE, 700);
  var p = ease((u - 0.4) / 2.2), path = "M470 580 Q420 420 260 250";
  s += '<path d="' + path + '" fill="none" stroke="' + ORANGE + '" stroke-width="5" pathLength="1" style="stroke-dasharray:' + f(p) + ' 1"/>';
  s += circle(470, 580, 10, ORANGE) + (p > 0.95 ? circle(260, 250, 10 + 3 * Math.sin(t * 6), OLIVE) : "");
  return s + numBox("مئات السنين", 320, 760, (u - 3.2) / 0.6, 26);
});
// 23 — شريط الحمل النهارده بيدوّر على hCG
shot(23, camPush(320, 400, 1, 1.12), function (u, d, t) {
  var s = paper() + testStrip(250, 410, 1.25, ease((u - 0.6) / 0.6), ease((u - 1.4) / 0.6), t, 0);
  for (var i = 0; i < 8; i++) { var k = (t * 0.5 + hash(i)) % 1; s += '<circle cx="' + f(250 + Math.sin(i + t) * 20) + '" cy="' + f(560 - k * 150) + '" r="5" fill="' + ORANGE + '" opacity="' + f(1 - k) + '"/>'; }
  return s + ring(250, 340, 70, t, ease((u - 2.2) / 1)) + label(280, 330, 430, 250, "hCG", BLUE, ease((u - 3.6) / 0.8), 44);
});

// ── كارت الملخص: الست الفرعونية على الجدار وقدامها شريط الحمل
outro(function (u, t) {
  return stoneWall() + '<rect width="580" height="300" fill="#f3b46a" opacity="' + f(0.25 + 0.08 * Math.sin(t * 1.2)) + '"/>' +
    wallWoman(170, 290, 0.85, t) + glyphRow(300, 70, 3, 1) + testStrip(420, 175, 0.6, 1, 1, t, 10 * Math.sin(t)) + callout("1", 230, 240, u / 0.5) + callout("2", 470, 230, (u - 0.5) / 0.5);
});
