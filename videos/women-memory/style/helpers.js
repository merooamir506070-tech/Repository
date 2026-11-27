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
function paper() { return '<rect x="-400" y="-400" width="1160" height="1440" fill="' + PAPER + '"/><rect x="-400" y="-400" width="1160" height="1440" fill="url(#grid)"/>'; }
function dark(col) { return '<rect x="-400" y="-400" width="1160" height="1440" fill="' + (col || "#141414") + '"/>'; }

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

// ── شخصيات الفيديو: زيزو (من غير كاب) والست (شعر مربوط) ─────────────
// zizo(x, y, s, t, o) / woman(...): الرجلين عند (x,y)، الطول حوالي 470×s.
// o = { mood: "happy"|"confused"|"smug"|"surprised"|"laugh"|"sad", talk: true, arms: [[hx,hy],[hx,hy]] (إيد يمين الشاشة/شمالها بالنسبة للجسم), look: -1..1, flip }
var HAIR = "#3a2a22", HOOD = ORANGE, HOOD2 = "#a9431f", DRESS = "#c9a23a";
function sh2(d, fill, h, sw) { return '<path d="' + d + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + (sw || 2.4) + '" stroke-linejoin="round" stroke-linecap="round"/>' + (h ? '<path d="' + d + '" fill="url(#hatch)"/>' : ""); }
function c2(x, y, r, fill, sw) { return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + (sw == null ? 2.4 : sw) + '"/>'; }
function ln2(d, w, col) { return '<path d="' + d + '" fill="none" stroke="' + (col || INK) + '" stroke-width="' + (w || 2.4) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
function limb(x1, y1, x2, y2, bend, col, w) {   // دراع/كم: خط تخين بحدّ أسود، وإيد في الآخر
  var mx = (x1 + x2) / 2 + bend, my = (y1 + y2) / 2, d = "M" + f(x1) + " " + f(y1) + " Q" + f(mx) + " " + f(my) + " " + f(x2) + " " + f(y2);
  return ln2(d, w + 5, INK) + ln2(d, w, col) + '<path d="' + d + '" fill="none" stroke="url(#hatch)" stroke-width="' + w + '"/>' + c2(x2, y2, 12, SKIN);
}
function face(y, t, o, lash, seed) {
  var m = o.mood || "happy", lk = (o.look || 0) * 5, blink = ((t * 0.31 + (seed || 0)) % 1) < 0.035, s = "";
  if (blink) s += ln2("M" + f(-23 + lk) + " " + y + " h12 M" + f(11 + lk) + " " + y + " h12", 3);
  else if (m === "laugh") s += ln2("M" + f(-24 + lk) + " " + (y + 2) + " q7 -9 14 0 M" + f(10 + lk) + " " + (y + 2) + " q7 -9 14 0", 3);
  else { var er = m === "surprised" ? 6 : 4.6; s += c2(-17 + lk, y, er, INK, 0) + c2(17 + lk, y, er, INK, 0) + '<circle cx="' + f(-15.5 + lk) + '" cy="' + (y - 1.5) + '" r="1.5" fill="#fff"/><circle cx="' + f(18.5 + lk) + '" cy="' + (y - 1.5) + '" r="1.5" fill="#fff"/>'; }
  var by = { happy: [-13, -18, -13], laugh: [-14, -19, -14], confused: [-11, -20, -17], smug: [-14, -14, -12], surprised: [-19, -25, -19], sad: [-17, -14, -11] }[m] || [-13, -18, -13];
  s += ln2("M-27 " + (y + by[0]) + " Q-17 " + (y + by[1]) + " -8 " + (y + by[2]) + " M8 " + (y + (m === "confused" ? by[0] : by[2])) + " Q17 " + (y + by[1]) + " 27 " + (y + (m === "confused" ? by[2] - 2 : by[0])), 2.6);
  if (lash) s += ln2("M" + f(-22 + lk) + " " + (y - 4) + " l-5 -3 M" + f(22 + lk) + " " + (y - 4) + " l5 -3", 2);
  s += ln2("M" + f(lk * 0.6) + " " + (y + 4) + " q-4 8 0 9", 2);
  var my = y + 22;
  if (o.talk) { var op = 2 + Math.abs(Math.sin(t * 13 + (seed || 0))) * 7; s += '<ellipse cx="0" cy="' + f(my) + '" rx="9" ry="' + f(op) + '" fill="#7a2e22" stroke="' + INK + '" stroke-width="2.2"/>'; }
  else if (m === "laugh") s += sh2("M-13 " + (my - 3) + " Q0 " + (my + 16) + " 13 " + (my - 3) + " Z", "#7a2e22", 0, 2.2);
  else if (m === "surprised") s += '<ellipse cx="0" cy="' + f(my) + '" rx="6" ry="8" fill="#7a2e22" stroke="' + INK + '" stroke-width="2.2"/>';
  else if (m === "confused") s += ln2("M-10 " + my + " q5 -4 10 0 t10 0", 2.4);
  else if (m === "smug") s += ln2("M-8 " + my + " Q4 " + (my + 6) + " 13 " + (my - 4), 2.6);
  else if (m === "sad") s += ln2("M-10 " + (my + 4) + " Q0 " + (my - 4) + " 10 " + (my + 4), 2.6);
  else s += ln2("M-11 " + (my - 2) + " Q0 " + (my + 7) + " 11 " + (my - 2), 2.6);
  s += '<ellipse cx="-29" cy="' + (y + 15) + '" rx="8" ry="5" fill="' + ORANGE + '" opacity=".28"/><ellipse cx="29" cy="' + (y + 15) + '" rx="8" ry="5" fill="' + ORANGE + '" opacity=".28"/>';
  return s;
}
function shoes() { return sh2("M-58 -6 q0 -18 20 -18 h22 q6 0 6 10 v14 h-48z", BONE) + sh2("M58 -6 q0 -18 -20 -18 h-22 q-6 0 -6 10 v14 h48z", BONE) + ln2("M-58 -4 h48 M58 -4 h-48", 3, GREY); }
function wrap(x, y, s, t, o, body) {
  var bob = Math.sin(t * 2.2 + (o.seed || 0)) * 2;
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s * (o.flip ? -1 : 1)) + ' ' + f(s) + ')"><ellipse cx="0" cy="2" rx="78" ry="10" fill="' + INK + '" opacity=".1"/><g transform="translate(0 ' + f(bob) + ')">' + body + '</g></g>';
}
function zizo(x, y, s, t, o) {
  o = o || {}; var A = o.arms || [[-84, -170], [84, -170]], b = "";
  if (!o.sit) b += sh2("M-48 -170 L-50 -22 L-12 -22 L-4 -150 L4 -150 L12 -22 L50 -22 L48 -170Z", BLUE, 1) + shoes();
  else b += sh2("M-48 -170 L-50 -120 L60 -120 L60 -22 L96 -22 L96 -90 Q96 -170 40 -170Z", BLUE, 1) + sh2("M60 -6 q0 -18 20 -18 h22 q6 0 6 10 v14 h-48z", BONE);
  b += limb(-64, -305, A[0][0], A[0][1], -14, HOOD, 22);
  b += sh2("M-60 -330 Q0 -350 60 -330 L72 -312 L62 -160 Q0 -150 -62 -160 L-72 -312Z", HOOD, 1);
  b += sh2("M-36 -330 Q0 -300 36 -330 Q0 -318 -36 -330Z", HOOD2) + ln2("M-10 -318 v40 M10 -318 v38", 2) + c2(-10, -277, 3, BONE, 1.5) + c2(10, -279, 3, BONE, 1.5);
  b += sh2("M-34 -232 h68 l8 52 h-84z", "#b84a25");
  if (o.wrinkled) b += ln2("M-40 -290 l10 8 l-6 8 M30 -260 l-8 10 l10 6 M-20 -200 l8 -8 l6 10", 2, HOOD2);
  b += limb(64, -305, A[1][0], A[1][1], 14, HOOD, 22);
  b += sh2("M-14 -334 v-18 h28 v18", SKIN);
  b += c2(0, -400, 54, SKIN) + c2(-54, -398, 10, SKIN) + c2(54, -398, 10, SKIN);
  b += sh2("M-57 -394 Q-64 -466 0 -464 Q64 -466 57 -394 Q50 -424 26 -420 Q14 -436 -2 -422 Q-16 -436 -32 -420 Q-50 -422 -57 -394Z", HAIR);
  b += face(-392, t, o, false, 0.3);
  return wrap(x, y, s, t, o, b);
}
function woman(x, y, s, t, o) {
  o = o || {}; var A = o.arms || [[-80, -168], [80, -168]], b = "";
  b += sh2("M-30 -112 L-30 -22 L-10 -22 L-10 -112Z M30 -112 L30 -22 L10 -22 L10 -112Z", SKIN) + shoes();
  b += limb(-58, -306, A[0][0], A[0][1], -14, BLUE, 20);
  b += sh2("M-52 -322 Q0 -336 52 -322 L64 -304 L54 -200 L86 -104 Q0 -90 -86 -104 L-54 -200 L-64 -304Z", DRESS, 1) + ln2("M-54 -200 Q0 -190 54 -200", 3);
  b += limb(58, -306, A[1][0], A[1][1], 14, BLUE, 20);
  b += sh2("M-14 -334 v-16 h28 v16", SKIN) + sh2("M-24 -326 Q0 -306 24 -326", SKIN, 0, 2);
  b += c2(0, -478, 22, HAIR) + c2(0, -400, 54, SKIN) + c2(-54, -396, 9, SKIN) + c2(54, -396, 9, SKIN) + c2(-54, -382, 3, ORANGE, 1.2) + c2(54, -382, 3, ORANGE, 1.2);
  b += sh2("M-58 -390 Q-66 -462 0 -460 Q66 -462 58 -390 Q50 -420 20 -426 Q-10 -410 -40 -418 Q-54 -408 -58 -390Z", HAIR);
  b += face(-388, t, o, true, 0.7);
  return wrap(x, y, s, t, o, b);
}
function kid(x, y, s, t, o) {   // طفل صغير: بنت (ضفيرتين) أو ولد
  o = o || {}; var girl = o.girl, b = "", col = girl ? "#b86a8a" : BLUE;
  b += sh2("M-22 -80 L-22 -20 L-6 -20 L-6 -80Z M22 -80 L22 -20 L6 -20 L6 -80Z", girl ? SKIN : "#4b4642") + sh2("M-40 -6 q0 -14 14 -14 h16 v14z", BONE) + sh2("M40 -6 q0 -14 -14 -14 h-16 v14z", BONE);
  b += limb(-38, -200, -54, -110, -8, col, 16) + limb(38, -200, 54, -110, 8, col, 16);
  b += sh2(girl ? "M-34 -214 Q0 -224 34 -214 L56 -80 Q0 -70 -56 -80Z" : "M-36 -214 Q0 -224 36 -214 L40 -84 Q0 -76 -40 -84Z", col, 1);
  b += c2(0, -262, 46, SKIN);
  if (girl) b += c2(-50, -250, 14, HAIR) + c2(50, -250, 14, HAIR);
  b += sh2("M-48 -258 Q-54 -318 0 -316 Q54 -318 48 -258 Q40 -290 0 -292 Q-40 -290 -48 -258Z", HAIR);
  b += '<g transform="translate(0 -258) scale(.8) translate(0 0)">' + face(0, t, o, girl, girl ? 0.2 : 0.9) + '</g>';
  return wrap(x, y, s, t, o, b);
}
// فقاعة كلام/تفكير: (x,y) نصها، w×h، والذيل رايح لـ(tx,ty). inner مرسوم حوالين 0,0
function bubble(x, y, w, h, tx, ty, inner, k, think) {
  k = pop(k == null ? 1 : k); if (k <= 0) return ""; var id = "bb" + (++CLIPN), s = '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')">';
  if (think) { var dx = tx - x, dy = ty - y; for (var i = 1; i <= 3; i++) s += c2(dx * (0.45 + i * 0.15), dy * (0.45 + i * 0.15), 9 - i * 2, BONE, 2); }
  else s += sh2("M" + f(-w * 0.12) + " " + f(h / 2 - 4) + " L" + f(tx - x) + " " + f(ty - y) + " L" + f(w * 0.12) + " " + f(h / 2 - 4) + "Z", BONE);
  s += '<rect x="' + f(-w / 2) + '" y="' + f(-h / 2) + '" width="' + w + '" height="' + h + '" rx="' + (think ? h / 2.4 : 16) + '" fill="' + BONE + '" stroke="' + INK + '" stroke-width="2.4"/>';
  s += '<clipPath id="' + id + '"><rect x="' + f(-w / 2 + 4) + '" y="' + f(-h / 2 + 4) + '" width="' + (w - 8) + '" height="' + (h - 8) + '" rx="' + (think ? h / 2.6 : 13) + '"/></clipPath><g clip-path="url(#' + id + ')">' + inner + '</g>';
  return s + '</g>';
}
// المخ من الجنب (المنظر الجانبي)، النص عند (x,y)، عرضه حوالي 260×s. o: {amy: 0..1 توهج اللوزة, hip: 0..1 توهج الهيبوكامبس, labels}
function brain(x, y, s, t, o) {
  o = o || {}; var b = "";
  b += sh2("M-120 10 C-140 -60 -90 -118 -20 -122 C40 -130 110 -100 126 -40 C138 0 120 40 90 52 C70 70 30 70 10 60 C-20 74 -70 70 -96 50 C-116 40 -124 28 -120 10Z", "#e8b9a8", 1);
  b += ln2("M-90 -70 q20 10 10 30 q-10 20 14 30 M-40 -110 q10 30 -10 50 q-12 16 10 30 M20 -118 q-14 24 6 40 q20 18 -4 36 M70 -98 q-16 22 4 40 q14 14 0 30 M-110 0 q30 -6 50 10 M40 20 q30 -10 60 6", 2.2, "#b07a6a");
  b += sh2("M60 52 C80 60 100 76 96 96 C90 110 70 104 64 86 C60 74 54 62 60 52Z", "#d9a796", 1);   // المخيخ
  b += sh2("M20 58 C26 80 30 110 22 140 L4 140 C8 110 6 82 0 62Z", "#d9a796");   // جذع المخ
  var a = clamp(o.amy || 0), h = clamp(o.hip || 0);
  if (h > 0) b += '<circle cx="30" cy="18" r="' + f(34 + 4 * Math.sin(t * 5)) + '" fill="url(#glowG)" opacity="' + f(h) + '"/>';
  b += sh2("M-4 6 C10 -6 34 -4 50 8 C62 18 58 34 44 30 C34 26 30 36 40 40", OLIVE, 0, 2.2);   // الهيبوكامبس (شكل حصان البحر)
  b += ln2("M-4 6 C10 -6 34 -4 50 8 C62 18 58 34 44 30 C34 26 30 36 40 40", 7, "#8aa04e");
  if (a > 0) b += '<circle cx="-14" cy="18" r="' + f(26 + 4 * Math.sin(t * 6)) + '" fill="url(#glowO)" opacity="' + f(a) + '"/>';
  var ps = 1 + 0.08 * a * Math.sin(t * 8);
  b += '<g transform="translate(-14 18) scale(' + f(ps) + ') rotate(-20)">' + sh2("M0 -12 C9 -12 12 0 8 8 C4 14 -4 14 -8 8 C-12 0 -9 -12 0 -12Z", ORANGE, 1, 2) + '</g>';
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')">' + b + '</g>';
}
// نقط الأماكن في المخ (للـlabel): بترجع [x,y] في إحداثيات المشهد
function brainPt(x, y, s, which) { var p = which === "amy" ? [-14, 18] : [36, 12]; return [x + p[0] * s, y + p[1] * s]; }
