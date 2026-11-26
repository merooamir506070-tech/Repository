/* ستايل السكتش («الرسم الهندسي»): ورق كريمي بمربعات، رسم مسطّح بخطوط رفيعة وتظليل مايل، وأسماء الأجزاء بخطوط إشارة.
   اللوحة (المشهد) عمودية: 640 عرض × 800 طول. كل دالة بترجع نص SVG. الشرح في API.md. */

// ── أدوات ────────────────────────────────────────────────
var LN = window.TIMING.lines;
function L(i) { return i >= LN.length ? window.TIMING.duration + 1.5 : LN[i].start; }
function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
function ease(x) { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
function lerp(a, b, k) { return a + (b - a) * k; }
function pop(u) { if (u <= 0) return 0; if (u < 0.22) return 1.12 * ease(u / 0.22); if (u < 0.36) return lerp(1.12, 1, (u - 0.22) / 0.14); return 1; }
function hash(i) { var x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
function f(n) { return (+n).toFixed(1); }
// الألوان: حبر، ورق، برتقالي (فعل أو خطر)، أزهر (مصطلح علمي)، زيتوني (اسم جزء)، رمادي فاتح، جلد، عضم
var INK = "#2b2b2b", PAPER = "#eee5d0", ORANGE = "#c4532c", BLUE = "#46698a", OLIVE = "#6b7d3c", PUTTY = "#cdc9bb", SKIN = "#d9a184", BONE = "#f4efe0", GREY = "#8a8070";
var CLIPN = 0;

// ── خلفيات ───────────────────────────────────────────────
function paper() { return '<rect x="-600" y="-600" width="1840" height="2000" fill="' + PAPER + '"/><rect x="-600" y="-600" width="1840" height="2000" fill="url(#grid)"/>'; }
function dark(col) { return '<rect x="-600" y="-600" width="1840" height="2000" fill="' + (col || "#141414") + '"/>'; }   // لوحة "صورة" سودا

// ── أشكال أساسية ─────────────────────────────────────────
// مستطيل بخط: (x, y, w, h, لون, سُمك الخط, تدوير الحواف)
function R(x, y, w, h, fill, sw, rx, ex) { return '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '"' + (rx ? ' rx="' + rx + '"' : "") + ' fill="' + fill + '" stroke="' + INK + '" stroke-width="' + (sw == null ? 2 : sw) + '"' + (ex || "") + '/>'; }
// شكل (مسار SVG) بلون + تظليل مايل فوقه
function shape(d, fill, hatched, sw) { return '<path d="' + d + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + (sw || 2) + '" stroke-linejoin="round"/>' + (hatched ? '<path d="' + d + '" fill="url(#hatch)"/>' : ""); }
function circle(x, y, r, fill, hatched, sw) { return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + (sw || 2) + '"/>' + (hatched ? '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '" fill="url(#hatch)"/>' : ""); }
function T(text, x, y, sz, col, w, anchor) { return '<text x="' + f(x) + '" y="' + f(y) + '" text-anchor="' + (anchor || "middle") + '" style="font:' + (w || 700) + ' ' + sz + 'px Noto Sans Arabic;fill:' + (col || INK) + '">' + text + '</text>'; }

// ── علامات الشرح ─────────────────────────────────────────
// اسم جزء بخط إشارة: نقطة على الجزء (px,py)، خط لـ(lx,ly)، والكلام بعده. k من 0 لـ1 بيرسمه (مثلاً ease((u - 0.5) / 0.8))
function label(px, py, lx, ly, text, col, k, sz) {
  k = clamp(k == null ? 1 : k); if (k <= 0) return ""; col = col || INK; sz = sz || 21;
  var ex = lerp(px, lx, clamp(k * 1.6)), ey = lerp(py, ly, clamp(k * 1.6)), left = lx < px, tw = text.length * sz * 0.5, tx = lx + (left ? -8 : 8), ty = ly + sz * 0.35;
  if (!left && lx + tw > 630) { left = true; tx = lx; ty = ly - 10; } else if (left && lx - tw < 10) { left = false; tx = lx; ty = ly - 10; }
  var s = '<circle cx="' + f(px) + '" cy="' + f(py) + '" r="4" fill="' + col + '" stroke="' + INK + '" stroke-width="1.2"/><path d="M' + f(px) + ' ' + f(py) + ' L' + f(ex) + ' ' + f(ey) + '" stroke="' + INK + '" stroke-width="1.4"/>';
  if (k > 0.55) s += '<g opacity="' + f(clamp((k - 0.55) / 0.3)) + '">' + T(text, tx, ty, sz, col, 700, left ? "start" : "end") + '</g>';
  return s;
}
function callout(n, x, y, k) { k = pop(k == null ? 1 : k); if (k <= 0) return ""; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')"><circle r="15" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="1.6"/>' + T(n, 0, 6, 16, INK, 700) + '</g>'; }   // دايرة برقم ① ② ③
function crossMark(x, y, s, k) { k = pop(k == null ? 1 : k); if (k <= 0) return ""; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k * (s || 1)) + ')"><path d="M-30 -30 L30 30 M30 -30 L-30 30" stroke="' + ORANGE + '" stroke-width="13" stroke-linecap="round"/></g>'; }   // ✗ كبيرة لفكرة غلط
function ring(x, y, r, t, k) { k = clamp(k == null ? 1 : k); if (k <= 0) return ""; var c = 2 * Math.PI * r; return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r + Math.sin(t * 4) * 2) + '" fill="none" stroke="' + ORANGE + '" stroke-width="4" stroke-dasharray="' + f(c * k) + ' ' + f(c) + '" transform="rotate(-90 ' + f(x) + ' ' + f(y) + ')"/>'; }   // دايرة حمرا بتترسم حوالين حاجة
function numBox(text, x, y, k, sz) { k = pop(k == null ? 1 : k); if (k <= 0) return ""; sz = sz || 22; var w = text.length * sz * 0.62 + 24; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')"><rect x="' + f(-w / 2) + '" y="' + f(-sz * 0.95) + '" width="' + f(w) + '" height="' + f(sz * 1.6) + '" rx="5" fill="' + INK + '"/><text x="0" y="' + f(sz * 0.32) + '" text-anchor="middle" style="font:800 ' + sz + 'px Noto Sans Arabic;fill:#fff;direction:ltr">' + text + '</text></g>'; }   // رقم في بوكس غامق
// موجة/شعاع متموّج من (x1,y1) لـ(x2,y2). p لحد فين اترسمت
function waveRay(x1, y1, x2, y2, t, col, a, wl, p, sw) {
  p = clamp(p == null ? 1 : p); if (p <= 0) return ""; var dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, d = "";
  for (var s = 0; s <= len * p; s += 4) { var o = Math.sin(s / (wl || 22) * Math.PI * 2 - t * 9) * (a || 7); d += (s ? " L" : "M") + f(x1 + ux * s - uy * o) + " " + f(y1 + uy * s + ux * o); }
  return '<path d="' + d + '" stroke="' + (col || BLUE) + '" stroke-width="' + (sw || 3) + '" fill="none" stroke-linecap="round"/>';
}
function arrow(x1, y1, x2, y2, col, w, p) {
  p = clamp(p == null ? 1 : p); if (p <= 0) return ""; var xe = lerp(x1, x2, p), ye = lerp(y1, y2, p), a = Math.atan2(ye - y1, xe - x1), h = (w || 3) * 3.2;
  return '<path d="M' + f(x1) + ' ' + f(y1) + ' L' + f(xe - Math.cos(a) * h * 0.6) + ' ' + f(ye - Math.sin(a) * h * 0.6) + '" stroke="' + (col || INK) + '" stroke-width="' + (w || 3) + '" stroke-linecap="round"/><path d="M' + f(xe) + ' ' + f(ye) + ' L' + f(xe - Math.cos(a - 0.45) * h) + ' ' + f(ye - Math.sin(a - 0.45) * h) + ' L' + f(xe - Math.cos(a + 0.45) * h) + ' ' + f(ye - Math.sin(a + 0.45) * h) + ' Z" fill="' + (col || INK) + '"/>';
}
function arrows(t, x1, y1, x2, y2, n, col, spread) {   // حزمة أسهم رفيعة ماشية (طاقة، هوا، حرارة)
  var s = "", dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len; n = n || 5; spread = spread || 60;
  for (var i = 0; i < n; i++) { var o = (i / (n - 1) - 0.5) * spread, u = ((t * 0.7 + hash(i)) % 1); s += arrow(x1 + nx * o, y1 + ny * o, x1 + nx * o + dx * (0.3 + 0.7 * u), y1 + ny * o + dy * (0.3 + 0.7 * u), col || ORANGE, 2, 1); }
  return s;
}
function dots(t, x, y, w, h, n, col, sp) {   // جزيئات صغيرة بتتحرك
  var s = ""; n = n || 30;
  for (var i = 0; i < n; i++) { var px = x + ((hash(i) * w + t * (sp || 20) * (hash(i + 3) - 0.3)) % w + w) % w, py = y + hash(i + 7) * h + Math.sin(t * 2 + i) * 5; s += '<circle cx="' + f(px) + '" cy="' + f(py) + '" r="' + f(2.5 + hash(i + 2) * 2) + '" fill="' + (col || BLUE) + '"/>'; }
  return s;
}
// دايرة تكبير لتفصيلة: inner مرسوم حوالين (0,0)
function inset(cx, cy, r, inner, k) { k = pop(k == null ? 1 : k); if (k <= 0) return ""; var id = "in" + (++CLIPN); return '<g transform="translate(' + f(cx) + ' ' + f(cy) + ') scale(' + f(k) + ')"><clipPath id="' + id + '"><circle r="' + r + '"/></clipPath><circle r="' + r + '" fill="' + PAPER + '"/><g clip-path="url(#' + id + ')">' + inner + '</g><circle r="' + r + '" fill="none" stroke="' + INK + '" stroke-width="2.4"/></g>'; }

// ── أشكال جاهزة ───────────────────────────────────────────
function figure(x, y, s, t, col) {   // شخص بشكل بسيط (من غير وش كرتوني)
  s = s || 1; col = col || PUTTY; var b = Math.sin(t * 2.4) * 1.5;
  return '<g transform="translate(' + f(x) + ' ' + f(y + b) + ') scale(' + s + ')">' + circle(0, -150, 24, SKIN) + shape("M-34 -118 C-40 -60 -36 -20 -30 0 H30 C36 -20 40 -60 34 -118 C20 -126 -20 -126 -34 -118 Z", col, true) + '</g>';
}
function lamp(x, y, t, on, s) { s = s || 1; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + s + ')">' + (on ? '<circle cy="-10" r="' + f(60 + Math.sin(t * 5) * 4) + '" fill="url(#glowW)"/>' : "") + circle(0, -10, 26, on ? "#fff3c8" : BONE) + R(-12, 14, 24, 20, PUTTY, 2) + '</g>'; }
function gearS(x, y, r, t, sp, col, teeth) {
  teeth = teeth || 10; var a = t * (sp || 1) * 57.3, d = "";
  for (var i = 0; i < teeth * 2; i++) { var ang = i / (teeth * 2) * 6.283, rr = i % 2 ? r : r * 1.18; d += (i ? " L" : "M") + f(Math.cos(ang) * rr) + " " + f(Math.sin(ang) * rr); }
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(a) + ')">' + shape(d + " Z", col || PUTTY, true) + circle(0, 0, r * 0.3, PAPER) + '</g>';
}
function sunS(x, y, r, t) { var s = '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r * 2.2) + '" fill="url(#glowO)" opacity=".6"/>'; for (var i = 0; i < 12; i++) { var a = i / 12 * 6.283 + t * 0.3; s += '<path d="M' + f(x + Math.cos(a) * r * 1.25) + ' ' + f(y + Math.sin(a) * r * 1.25) + ' L' + f(x + Math.cos(a) * r * 1.6) + ' ' + f(y + Math.sin(a) * r * 1.6) + '" stroke="' + ORANGE + '" stroke-width="3" stroke-linecap="round"/>'; } return s + circle(x, y, r, "#f2c26a", true); }
function globe(x, y, r, t) { var off = (t * 10) % (r * 2), land = ""; for (var i = -1; i < 3; i++) { var cx = -r + i * r * 1.1 + off; land += '<path d="M' + f(cx) + ' ' + f(-r * 0.3) + ' c' + f(r * 0.2) + ' ' + f(-r * 0.3) + ' ' + f(r * 0.5) + ' ' + f(-r * 0.2) + ' ' + f(r * 0.45) + ' ' + f(r * 0.1) + ' c' + f(-r * 0.05) + ' ' + f(r * 0.4) + ' ' + f(-r * 0.4) + ' ' + f(r * 0.6) + ' ' + f(-r * 0.45) + ' ' + f(r * 0.2) + ' Z" fill="' + OLIVE + '"/>'; } var id = "gl" + (++CLIPN); return '<g transform="translate(' + f(x) + ' ' + f(y) + ')"><clipPath id="' + id + '"><circle r="' + r + '"/></clipPath><circle r="' + r + '" fill="' + BLUE + '" opacity=".75"/><g clip-path="url(#' + id + ')">' + land + '<circle r="' + r + '" fill="url(#hatch)"/></g><circle r="' + r + '" fill="none" stroke="' + INK + '" stroke-width="2.4"/></g>'; }

// ── الشخصية الثابتة (المذيع المرسوم) ──────────────────────────
// guide(x, y, s, t, o): (x,y) = نص رجليه على الأرض، وطوله حوالي 320 لما s = 1.
// o = { who: "fikri" | "nour" | "ostaz" | "zizo" (الشخصية، والافتراضي GUIDE_WHO),
//       pose: "idle" | "point" | "wave" | "think" | "alarm" | "ok" | "stop",
//       mood: "happy" | "neutral" | "worried" | "surprised" (لكل pose مود افتراضي),
//       dir: 1 (بيشاور يمين) أو -1 (شمال), talk: true (بقه بيتحرك وهو بيتكلم), k: من 0 لـ1 لظهوره بـpop }
var GUIDE_WHO = "fikri";
var GUIDES = {
  fikri: { top: BLUE, legs: "#5b574d", shoes: INK, hair: "messy", glasses: "round", pencil: true },          // شاب بنضارة وقلم ورا ودنه
  nour:  { top: OLIVE, legs: "#5b574d", shoes: INK, hair: "hijab", skirt: true, blush: true, badge: true },  // بنت بطرحة برتقالي وكارنيه
  ostaz: { top: BONE, legs: "#5b574d", shoes: "#5a3a26", hair: "bald", glasses: "half", mustache: true, coat: true },   // أستاذ كبير ببالطو أبيض وشنب
  zizo:  { top: "#b8603a", legs: BLUE, shoes: BONE, hair: "cap", hoodie: true, bag: true }                     // شاب بكاب وهودي وشنطة
};
function guide(x, y, s, t, o) {
  o = o || {}; s = s || 1; var C = GUIDES[o.who || GUIDE_WHO] || GUIDES.fikri, pose = o.pose || "idle", dir = o.dir === -1 ? -1 : 1;
  var mood = o.mood || { alarm: "surprised", stop: "worried", think: "neutral", idle: "neutral" }[pose] || "happy";
  var k = o.k == null ? 1 : pop(o.k); if (k <= 0) return "";
  var bob = Math.sin(t * 2.4) * 2, shake = pose === "alarm" ? Math.sin(t * 30) * 2 : 0, LIFT = 46, sleeve = C.coat ? BONE : C.top;
  function arm(sx, sy, ex, ey, hx, hy) {
    var d = "M" + f(sx) + " " + f(sy) + " Q" + f(ex) + " " + f(ey) + " " + f(hx) + " " + f(hy);
    return '<path d="' + d + '" stroke="' + INK + '" stroke-width="17" fill="none" stroke-linecap="round"/><path d="' + d + '" stroke="' + sleeve + '" stroke-width="12" fill="none" stroke-linecap="round"/>';
  }
  function hand(hx, hy, r) { return circle(hx, hy, r || 9, SKIN, false, 2); }
  function finger(x1, y1, x2, y2) { var d = 'M' + f(x1) + ' ' + f(y1) + ' L' + f(x2) + ' ' + f(y2); return '<path d="' + d + '" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/><path d="' + d + '" stroke="' + SKIN + '" stroke-width="3.5" stroke-linecap="round"/>'; }
  var w1 = Math.sin(t * 3) * 3, back = "", front = "", Lsh = [-36, -160], Rsh = [36, -160];
  if (pose === "alarm") {
    back += arm(Lsh[0], Lsh[1], -80, -205, -64 + shake, -255) + hand(-64 + shake, -258, 10);
    back += arm(Rsh[0], Rsh[1], 80, -205, 64 - shake, -255) + hand(64 - shake, -258, 10);
  } else {
    var lh = pose === "think" ? [-6, -122] : [-48, -80 + w1];
    front += arm(Lsh[0], Lsh[1], pose === "think" ? -44 : -56, -118, lh[0], lh[1]) + hand(lh[0], lh[1]);
    if (pose === "point") { var px = 124 + Math.sin(t * 4) * 5, py = -180; front += arm(Rsh[0], Rsh[1], 84, -150, px, py) + finger(px + 6, py - 2, px + 26, py - 7) + hand(px, py); }
    else if (pose === "wave") { var wx = 76 + Math.sin(t * 9) * 12; back += arm(Rsh[0], Rsh[1], 80, -190, wx, -250) + hand(wx, -254, 11); }
    else if (pose === "think") { front += arm(Rsh[0], Rsh[1], 52, -118, 14, -170) + hand(14, -172, 9); }
    else if (pose === "ok") { var oy = -186 + Math.sin(t * 5) * 3; front += arm(Rsh[0], Rsh[1], 76, -130, 80, oy) + finger(80, oy - 6, 80, oy - 24) + hand(80, oy, 11); }
    else if (pose === "stop") { var sy = -192 + Math.sin(t * 6) * 2; front += arm(Rsh[0], Rsh[1], 82, -168, 102, sy) + '<g transform="translate(108 ' + f(sy - 6) + ')">' + finger(-8, -12, -9, -28) + finger(0, -12, 0, -32) + finger(8, -12, 9, -28) + finger(-12, 0, -22, -10) + R(-13, -16, 26, 30, SKIN, 2, 9) + '</g>'; }
    else { front += arm(Rsh[0], Rsh[1], 56, -118, 48, -80 - w1) + hand(48, -80 - w1); }
  }
  // الرجلين (طوال) والجزمة: بره جروب الجسم المرفوع
  var legs;
  if (C.skirt) legs = shape("M-38 -116 L-48 -6 H48 L38 -116 Z", C.legs, true) + shape("M-34 -8 H-6 V6 H-42 Q-44 -6 -34 -8 Z", C.shoes) + shape("M6 -8 H34 Q44 -6 42 6 H6 Z", C.shoes);
  else legs = '<path d="M-20 -116 V-8 M20 -116 V-8" stroke="' + INK + '" stroke-width="21" stroke-linecap="round"/><path d="M-20 -116 V-9 M20 -116 V-9" stroke="' + C.legs + '" stroke-width="16" stroke-linecap="round"/>'
    + shape("M-32 -6 H-8 V6 H-42 Q-44 -4 -32 -6 Z", C.shoes) + shape("M8 -6 H32 Q44 -4 42 6 H8 Z", C.shoes);
  // الجسم
  var body = "";
  if (C.bag) body += shape("M-44 -150 H44 V-80 H-44 Z", "#7a6a4a", true);   // الشنطة ورا ضهره
  body += shape("M-40 -158 Q0 -172 40 -158 Q50 -110 42 -66 H-42 Q-50 -110 -40 -158 Z", C.coat ? BLUE : C.top, !C.coat);
  if (C.coat) body += '<path d="M0 -164 L-6 -150 L0 -100 L6 -150 Z" fill="' + ORANGE + '" stroke="' + INK + '" stroke-width="1.6"/>'   // الكرافتة
    + shape("M-42 -160 Q-30 -168 -12 -166 L-6 -112 L-10 -2 H-50 Q-56 -90 -42 -160 Z", BONE, true) + shape("M42 -160 Q30 -168 12 -166 L6 -112 L10 -2 H50 Q56 -90 42 -160 Z", BONE, true)
    + R(22, -120, 18, 20, BONE, 1.6, 2) + '<path d="M27 -118 V-134 M33 -118 V-132" stroke-width="3.5" stroke="' + BLUE + '"/>';
  else if (C.hoodie) body += shape("M-30 -166 Q0 -150 30 -166 Q20 -150 0 -146 Q-20 -150 -30 -166 Z", C.top, false, 2) + '<path d="M-8 -150 V-124 M8 -150 V-124" stroke="' + BONE + '" stroke-width="2.5"/>' + shape("M-26 -98 H26 L30 -72 H-30 Z", C.top, false, 1.6)
    + (C.bag ? '<path d="M-36 -160 L-30 -70 M36 -160 L30 -70" stroke="#5a4a30" stroke-width="5"/>' : "");
  else if (C.hair === "hijab") body += (C.badge ? R(14, -132, 18, 24, BONE, 1.6, 2) + R(18, -126, 10, 8, BLUE, 0) + '<path d="M17 -112 H29" stroke="' + INK + '" stroke-width="1.5"/>' : "");
  else body += '<path d="M-13 -164 L0 -146 L13 -164 Z" stroke="' + INK + '" stroke-width="2" fill="' + BONE + '" stroke-linejoin="round"/><path d="M0 -146 V-70" stroke="' + INK + '" stroke-width="1.4"/>'
    + '<circle cx="0" cy="-128" r="2" fill="' + INK + '"/><circle cx="0" cy="-104" r="2" fill="' + INK + '"/><circle cx="0" cy="-80" r="2" fill="' + INK + '"/>'
    + '<path d="M-26 -132 V-148" stroke="' + ORANGE + '" stroke-width="3.5"/>' + R(-34, -136, 18, 18, C.top, 1.6, 2);
  // الراس
  var tilt = pose === "think" ? -7 : 0, blink = ((t + 0.7) % 3.4) < 0.13, eyeH = blink ? 0.6 : (mood === "surprised" ? 5.5 : 4.2);
  var look = pose === "point" || pose === "stop" ? 3 : Math.sin(t * 0.7) * 1.5, head = '<g transform="rotate(' + tilt + ' 0 -170)">';
  if (C.hair === "hijab") head += shape("M-50 -204 C-54 -268 54 -268 50 -204 C52 -172 40 -156 0 -152 C-40 -156 -52 -172 -50 -204 Z", ORANGE, true) + circle(0, -206, 34, SKIN)
    + '<path d="M-32 -224 Q0 -258 32 -224" stroke="' + ORANGE + '" stroke-width="9" fill="none"/><path d="M-34 -222 Q0 -260 34 -222" stroke="' + INK + '" stroke-width="1.6" fill="none"/>'
    + shape("M-46 -166 Q0 -138 46 -166 L42 -148 Q0 -124 -42 -148 Z", ORANGE, true);
  else {
    head += circle(-39, -208, 9, SKIN) + circle(39, -208, 9, SKIN);
    if (C.pencil) head += '<g transform="translate(40 -232) rotate(62)">' + R(-4, -24, 8, 44, "#e0a83c", 1.4) + shape("M-4 20 L0 30 L4 20 Z", BONE, false, 1.2) + '<path d="M-1 27 L0 30 L1 27" stroke="' + INK + '" stroke-width="2"/>' + R(-4, -30, 8, 7, ORANGE, 1.2) + '</g>';
    head += circle(0, -210, 40, SKIN);
    if (C.hair === "messy") head += shape("M-40 -214 C-50 -258 -12 -270 0 -254 C10 -274 50 -264 42 -220 C38 -232 28 -238 20 -230 C14 -244 -4 -244 -10 -232 C-18 -242 -34 -238 -40 -214 Z", INK);
    if (C.hair === "bald") head += shape("M-41 -200 C-46 -226 -38 -238 -30 -236 C-34 -226 -34 -214 -34 -200 Z", "#a39e92") + shape("M41 -200 C46 -226 38 -238 30 -236 C34 -226 34 -214 34 -200 Z", "#a39e92") + '<path d="M-14 -240 Q-4 -246 6 -242" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6"/>';
    if (C.hair === "cap") head += shape("M-38 -222 C-36 -228 -30 -226 -28 -220 C-24 -230 -16 -226 -16 -220 Z", INK) + shape("M-40 -220 C-42 -266 42 -266 40 -220 Z", ORANGE, true) + shape("M-38 -222 L-74 -218 Q-76 -210 -68 -210 L-38 -214 Z", "#9a3f20") + circle(0, -253, 4, ORANGE, false, 1.4);
  }
  if (C.glasses === "round") head += '<circle cx="-15" cy="-206" r="13" fill="' + BONE + '" fill-opacity=".5" stroke="' + INK + '" stroke-width="2.6"/><circle cx="15" cy="-206" r="13" fill="' + BONE + '" fill-opacity=".5" stroke="' + INK + '" stroke-width="2.6"/><path d="M-2 -207 Q0 -210 2 -207" stroke="' + INK + '" stroke-width="2.4" fill="none"/>';
  head += '<ellipse cx="' + f(-15 + look) + '" cy="-206" rx="3.6" ry="' + eyeH + '" fill="' + INK + '"/><ellipse cx="' + f(15 + look) + '" cy="-206" rx="3.6" ry="' + eyeH + '" fill="' + INK + '"/>';
  if (C.glasses === "half") head += '<path d="M-28 -204 H-4 Q-6 -192 -16 -192 Q-26 -192 -28 -204 Z M4 -204 H28 Q26 -192 16 -192 Q6 -192 4 -204 Z" fill="' + BONE + '" fill-opacity=".4" stroke="' + INK + '" stroke-width="2.4"/><path d="M-4 -204 H4" stroke="' + INK + '" stroke-width="2.4"/>';
  var brow = { neutral: "M-24 -226 L-8 -226 M8 -226 L24 -226", happy: "M-24 -225 Q-16 -230 -8 -226 M8 -226 Q16 -230 24 -225", worried: "M-24 -224 L-8 -230 M8 -230 L24 -224", surprised: "M-24 -232 Q-16 -238 -8 -233 M8 -233 Q16 -238 24 -232" }[mood];
  head += '<path d="' + brow + '" stroke="' + (C.hair === "bald" ? "#a39e92" : INK) + '" stroke-width="' + (C.hair === "bald" ? 4.5 : 3) + '" fill="none" stroke-linecap="round"/>';
  var mo = o.talk ? Math.abs(Math.sin(t * 13)) * 6 + 1 : 0, my = C.mustache ? 4 : 0;
  if (mood === "surprised") head += '<ellipse cx="0" cy="' + (-184 + my) + '" rx="6" ry="' + f(6 + mo * 0.4) + '" fill="' + INK + '"/>';
  else if (o.talk) head += '<ellipse cx="0" cy="' + (-185 + my) + '" rx="' + (mood === "happy" ? 9 : 7) + '" ry="' + f(mo) + '" fill="' + INK + '"/>';
  else head += '<g transform="translate(0 ' + my + ')"><path d="' + { happy: "M-11 -189 Q0 -178 11 -189", neutral: "M-8 -186 L8 -186", worried: "M-9 -183 Q0 -190 9 -183" }[mood] + '" stroke="' + INK + '" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>';
  if (C.mustache) head += shape("M-18 -188 Q-8 -198 0 -192 Q8 -198 18 -188 Q8 -186 0 -189 Q-8 -186 -18 -188 Z", "#a39e92", false, 1.6);
  if (mood === "happy" || C.blush) head += '<circle cx="-26" cy="-190" r="5" fill="' + ORANGE + '" opacity=".28"/><circle cx="26" cy="-190" r="5" fill="' + ORANGE + '" opacity=".28"/>';
  head += '</g>';
  // إضافات حسب الوضع
  var extra = "";
  if (pose === "alarm" || mood === "worried") { var dy = ((t * 0.8) % 1) * 14; extra += shape("M-48 " + f(-236 + dy) + " q-7 10 0 13 q7 -3 0 -13 Z", "#9fc3dc", false, 1.4); }
  if (pose === "alarm") extra += '<path d="M-84 -272 l-12 -10 M84 -272 l12 -10 M-98 -242 l-14 -2 M98 -242 l14 -2" stroke="' + ORANGE + '" stroke-width="3" stroke-linecap="round"/>';
  if (pose === "think") extra += circle(66, -232, 4, PAPER, false, 1.4) + circle(78, -248, 6, PAPER, false, 1.4) + '<g opacity="' + f(0.6 + 0.4 * Math.sin(t * 3)) + '" transform="scale(' + dir + ' 1)">' + T("؟", 92 * dir, -266 + Math.sin(t * 2) * 5, 40, ORANGE, 900) + '</g>';
  var shadow = '<ellipse cx="0" cy="5" rx="' + f(56 - bob) + '" ry="8" fill="' + INK + '" opacity=".12"/>';
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s * k * dir) + ' ' + f(s * k) + ')">' + shadow + '<g transform="translate(0 ' + f(bob * 0.4) + ')">' + legs + '</g><g transform="translate(0 ' + f(bob - LIFT) + ')">' + back + body + front + head + extra + '</g></g>';
}
