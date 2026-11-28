// إزاي الدكتور بيشوف العضم جوه إيدك؟ — سكتش بملء الشاشة (عالم 360×640). الترجمة فوق (y من 30 لـ130)، فالرسم من y=150 لتحت.
function k_(u, a, d) { return ease((u - a) / (d || 0.6)); }
var XBG = "#1f2b36", XFL = "#8fb0c8", XBN = "#f6f2e6", GLASS = "#cfe0e8", LEAD = "#8d9399";

// ── هندسة الإيد (من فوق، كف لتحت، الصباع الكبير شمال). الرسغ عند (0,0) والصوابع لفوق ─────────────
function HG() {
  if (HG.c) return HG.c;
  var F = [[-30, -26, -60, -66, -42, [30, 24], 12, 26], [-18, -44, -30, -116, -7, [40, 25, 19], 11, 24], [-5, -46, -8, -122, -1, [44, 28, 20], 11.5, 25], [8, -44, 14, -116, 6, [40, 26, 19], 11, 24], [20, -40, 34, -104, 15, [31, 21, 16], 10, 21]];
  var carp = [], meta = [], phal = [], fingers = [];
  [[-24, -14], [-8, -12], [8, -12], [22, -14], [-26, -34], [-10, -36], [6, -36], [21, -34]].forEach(function (p, i) { carp.push({ c: p, r: i < 4 ? 8.5 : 8 }); });
  F.forEach(function (q, fi) {
    meta.push({ a: [q[0], q[1]], b: [q[2], q[3]], w: q[6] * 1.05, fi: fi });
    var x = q[2], y = q[3], a = q[4] * Math.PI / 180, pts = [[q[2], q[3]]];
    q[5].forEach(function (L, j) { var nx = x + Math.sin(a) * L, ny = y - Math.cos(a) * L; phal.push({ a: [x, y], b: [nx, ny], w: q[6] * (1 - j * 0.12), fi: fi, j: j }); x = nx; y = ny; pts.push([x, y]); });
    pts.push([x + Math.sin(a) * 6, y - Math.cos(a) * 6]);
    fingers.push({ pts: pts, w: q[7], base: fi === 0 ? [-34, -20] : null, ang: a });
  });
  var arm = [{ a: [-17, -2], b: [-21, 150], w: 15 }, { a: [16, -2], b: [20, 150], w: 12 }];
  return (HG.c = { carp: carp, meta: meta, phal: phal, fingers: fingers, arm: arm, count: carp.concat(meta, phal) });
}
function pl(pts) { return pts.map(function (p, i) { return (i ? "L" : "M") + f(p[0]) + " " + f(p[1]); }).join(" "); }
var PALM = "M-46 0 C-50 -40 -44 -90 -34 -118 Q0 -134 42 -108 C48 -80 47 -40 44 0 Z", ARM = "M-45 -14 L-47 170 L47 170 L45 -14 Z";
function fleshPaths(col, grow, ink) {   // كل لحم الإيد بلون واحد؛ grow = تخانة زيادة (للحد الأسود)
  var g = HG(), s = "", st = ' stroke="' + col + '" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  s += '<path d="' + ARM + '" fill="' + col + '" stroke="' + col + '" stroke-width="' + grow + '" stroke-linejoin="round"/>';
  s += '<path d="' + PALM + '" fill="' + col + '" stroke="' + col + '" stroke-width="' + grow + '" stroke-linejoin="round"/>';
  g.fingers.forEach(function (fg) { var pts = fg.base ? [fg.base].concat(fg.pts) : fg.pts; s += '<path d="' + pl(pts) + '"' + st + ' stroke-width="' + f(fg.w + grow) + '"/>'; });
  return s;
}
function boneD(b, col, ink, glow) {   // عضمة: خط مدوّر وعقدتين في الطرفين
  var d = "M" + f(b.a[0]) + " " + f(b.a[1]) + " L" + f(b.b[0]) + " " + f(b.b[1]), r = b.w * 0.62, s = "";
  if (ink) s += '<path d="' + d + '" stroke="' + INK + '" stroke-width="' + f(b.w + 3.4) + '" stroke-linecap="round"/>' + '<circle cx="' + f(b.a[0]) + '" cy="' + f(b.a[1]) + '" r="' + f(r + 1.7) + '" fill="' + INK + '"/><circle cx="' + f(b.b[0]) + '" cy="' + f(b.b[1]) + '" r="' + f(r + 1.7) + '" fill="' + INK + '"/>';
  s += '<path d="' + d + '" stroke="' + col + '" stroke-width="' + f(b.w) + '" stroke-linecap="round"/><circle cx="' + f(b.a[0]) + '" cy="' + f(b.a[1]) + '" r="' + f(r) + '" fill="' + col + '"/><circle cx="' + f(b.b[0]) + '" cy="' + f(b.b[1]) + '" r="' + f(r) + '" fill="' + col + '"/>';
  return s;
}
function carpD(c, col, ink) { return (ink ? '<circle cx="' + f(c.c[0]) + '" cy="' + f(c.c[1]) + '" r="' + f(c.r + 1.7) + '" fill="' + INK + '"/>' : "") + '<circle cx="' + f(c.c[0]) + '" cy="' + f(c.c[1]) + '" r="' + f(c.r) + '" fill="' + col + '"/>'; }
function bonesAll(col, ink, light) {
  var g = HG(), s = "";
  g.arm.forEach(function (b) { s += boneD(b, col, ink); });
  g.count.forEach(function (b, i) { var o = light ? light(i) : 1; if (o <= 0) return; var one = b.c ? carpD(b, col, ink) : boneD(b, col, ink); s += o < 1 ? '<g opacity="' + f(o) + '">' + one + '</g>' : one; });
  return s;
}
function ptOn(seg, k) { return [lerp(seg.a[0], seg.b[0], k), lerp(seg.a[1], seg.b[1], k)]; }
function crackPt() { return ptOn(HG().meta[2], 0.5); }
function ringPt() { return ptOn(HG().phal[7], 0.55); }   // الصباع اللي جنب الصغير، أول عُقلة
// صورة أشعة للإيد (من غير الخلفية). o: {reveal, light(i), crack 0..1, ring, bonesCol}
function xrayHand(x, y, s, t, o) {
  o = o || {}; var g = HG(), rv = o.reveal == null ? 1 : o.reveal, sw = Math.sin(t * 1.3) * 1.5;
  var r = '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ') rotate(' + f(sw) + ')">';
  r += '<g opacity="' + f(o.flesh == null ? 0.3 : o.flesh) + '">' + fleshPaths(XFL, 0) + '</g>';
  if (rv > 0) {
    r += '<g opacity="' + f(0.55 * rv) + '" filter="url(#soft2)">' + bonesAll("#ffffff", false, o.light) + '</g>';
    r += '<g opacity="' + f(rv) + '">' + bonesAll(o.bonesCol || XBN, false, o.light) + '</g>';
  }
  if (o.crack) { var c = crackPt(), k = clamp(o.crack); r += '<path d="M' + f(c[0] - 9 * k) + ' ' + f(c[1] - 2) + ' l4 3 l3 -4 l4 4 l' + f(4 * k) + ' -2" stroke="' + XBG + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>'; }
  if (o.ring) { var p = ringPt(), a = HG().phal[7]; var ang = Math.atan2(a.b[1] - a.a[1], a.b[0] - a.a[0]) * 180 / Math.PI + 90; r += '<g transform="translate(' + f(p[0]) + ' ' + f(p[1]) + ') rotate(' + f(ang) + ')"><rect x="-14" y="-4.5" width="28" height="9" rx="3" fill="#ffffff" filter="url(#soft2)"/><rect x="-13" y="-3.5" width="26" height="7" rx="3" fill="#ffffff"/></g>'; }
  return r + '</g>';
}
// إيد مرسومة سكتش (جلد بحد أسود). o: {bones 0..1 العضم بيبان جوه، ring, wave}
function handSketch(x, y, s, t, o) {
  o = o || {}; var k = clamp(o.bones || 0), sw = Math.sin(t * 1.6) * 1.8 + (o.rot || 0), g = HG();
  var r = '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ') rotate(' + f(sw) + ')">';
  r += fleshPaths(INK, 5) + '<g opacity="' + f(1 - 0.45 * k) + '">' + fleshPaths(o.skin || SKIN, 0) + '</g>';
  if (k < 0.5) g.fingers.forEach(function (fg) { var p = fg.pts[fg.pts.length - 2]; r += '<ellipse cx="' + f(p[0] + Math.sin(fg.ang) * 2) + '" cy="' + f(p[1] - Math.cos(fg.ang) * 2) + '" rx="' + f(fg.w * 0.26) + '" ry="' + f(fg.w * 0.34) + '" transform="rotate(' + f(fg.ang * 57.3) + ' ' + f(p[0]) + ' ' + f(p[1]) + ')" fill="' + BONE + '" stroke="' + INK + '" stroke-width="1.4" opacity="' + f(1 - 2 * k) + '"/>'; });
  if (k > 0) r += '<g opacity="' + f(k) + '">' + bonesAll(BONE, true) + '</g>';
  if (o.ring) { var p = ringPt(); r += '<ellipse cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" rx="14" ry="5" fill="#d9b24a" stroke="' + INK + '" stroke-width="1.8"/>'; }
  return r + '</g>';
}
function handShadow(x, y, s, t, col, op) { return '<g opacity="' + f(op) + '" transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ') rotate(' + f(Math.sin(t * 1.6) * 1.8) + ')">' + fleshPaths(col || INK, 0) + '</g>'; }
// فيلم الأشعة: مستطيل غامق وجواه حاجة
function film(x, y, w, h, inner, k, frame) {
  k = k == null ? 1 : pop(k); if (k <= 0) return ""; var id = "fm" + (++CLIPN);
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')">' + (frame ? R(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20, frame, 2.4, 6) : "") + '<clipPath id="' + id + '"><rect x="' + f(-w / 2) + '" y="' + f(-h / 2) + '" width="' + w + '" height="' + h + '" rx="6"/></clipPath><rect x="' + f(-w / 2) + '" y="' + f(-h / 2) + '" width="' + w + '" height="' + h + '" rx="6" fill="' + XBG + '"/><g clip-path="url(#' + id + ')">' + inner + '</g><rect x="' + f(-w / 2) + '" y="' + f(-h / 2) + '" width="' + w + '" height="' + h + '" rx="6" fill="none" stroke="' + INK + '" stroke-width="2.6"/></g>';
}
// ── الأجهزة ─────────────────────────────────────────────
function tube(x, y, s, t, on) {   // راس جهاز الأشعة معلّق من السقف
  var bl = on && Math.sin(t * 7) > 0, r = '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s || 1) + ')">';
  r += R(-8, -200, 16, 150, PUTTY, 2.2) + R(-60, -60, 120, 58, "#b8bcb6", 2.4, 10) + '<rect x="-60" y="-60" width="120" height="58" rx="10" fill="url(#hatch)"/>';
  r += sh2("M-30 -2 L30 -2 L22 26 L-22 26Z", "#9aa09a") + R(-24, 24, 48, 8, INK, 0, 2);
  r += c2(38, -40, 7, bl ? "#e0452c" : "#7a2e22", 2) + (bl ? '<circle cx="38" cy="-40" r="16" fill="url(#glowO)"/>' : "") + R(-44, -46, 60, 10, BONE, 1.6, 3) + ln2("M-40 -26 h44", 2, GREY);
  return r + '</g>';
}
function beams(x, y, x1, x2, y2, t, n, col, k, stopY) {   // أشعة متقطعة ماشية من (x,y) لتحت بين x1 وx2
  k = clamp(k == null ? 1 : k); if (k <= 0) return ""; n = n || 7; var s = '<g opacity="' + f(k) + '">';
  s += '<path d="M' + f(x - 18) + ' ' + f(y) + ' L' + f(x1) + ' ' + f(y2) + ' L' + f(x2) + ' ' + f(y2) + ' L' + f(x + 18) + ' ' + f(y) + 'Z" fill="' + (col || "#7fb0d8") + '" opacity=".16"/>';
  for (var i = 0; i < n; i++) { var ex = lerp(x1 + 8, x2 - 8, i / (n - 1)), ey = stopY ? stopY(ex) : y2; s += '<path d="M' + f(lerp(x - 14, x + 14, i / (n - 1))) + ' ' + f(y) + ' L' + f(ex) + ' ' + f(ey) + '" stroke="' + (col || BLUE) + '" stroke-width="2.4" stroke-dasharray="7 9" stroke-dashoffset="' + f(-t * 60) + '" stroke-linecap="round"/>'; }
  return s + '</g>';
}
function plate(x, y, w, t, glow) {   // لوح الأشعة من الجنب
  return (glow ? '<ellipse cx="' + f(x) + '" cy="' + f(y + 8) + '" rx="' + f(w * 0.6) + '" ry="22" fill="url(#glowB)" opacity="' + f(glow * (0.7 + 0.3 * Math.sin(t * 5))) + '"/>' : "") + R(x - w / 2, y, w, 18, "#5c6b78", 2.4, 4) + '<rect x="' + f(x - w / 2) + '" y="' + f(y) + '" width="' + w + '" height="18" fill="url(#hatchW)"/>' + R(x - w / 2 - 8, y + 18, w + 16, 10, PUTTY, 2, 3);
}
function sideHand(x, y, s, t) {   // إيد نايمة من الجنب على اللوح
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')">' + sh2("M-150 -4 L-150 -36 Q-60 -44 20 -40 Q60 -48 92 -34 Q130 -26 146 -14 Q150 -4 140 0 Z", SKIN) + ln2("M96 -14 q18 -4 34 2 M86 -24 q22 -6 44 2", 1.8, "#a5715a") + sh2("M10 -40 q8 -16 26 -12 q8 6 -6 16", SKIN) + '</g>';
}
function fikri(x, y, s, t, o) {   // الدكتور فكري: شعر منكوش، نضارة مدوّرة، قلم ورا ودنه، قميص أزرق، بالطو أبيض
  o = o || {}; var A = o.arms || [[-84, -170], [84, -170]], b = "";
  b += sh2("M-46 -170 L-48 -22 L-12 -22 L-4 -150 L4 -150 L12 -22 L48 -22 L46 -170Z", "#4b4642", 1) + shoes();
  b += limb(-64, -305, A[0][0], A[0][1], -14, "#f7f5ee", 22);
  b += sh2("M-60 -330 Q0 -346 60 -330 L74 -312 L76 -120 L-76 -120 L-74 -312Z", "#f7f5ee");
  b += sh2("M-22 -336 L0 -300 L22 -336 L14 -200 L-14 -200Z", "#7fa6c9") + sh2("M-24 -336 L0 -296 L-8 -200 L-30 -320Z", "#e9e6dc") + sh2("M24 -336 L0 -296 L8 -200 L30 -320Z", "#e9e6dc");
  b += ln2("M-26 -326 Q-40 -270 -18 -246", 3, "#3e4a52") + ln2("M26 -326 Q40 -270 18 -246", 3, "#3e4a52") + c2(0, -240, 9, "#b8bcb6", 2) + ln2("M-18 -246 Q0 -256 0 -249 M18 -246 Q0 -256 0 -249", 2.4, "#3e4a52");
  b += R(34, -280, 26, 30, "#f7f5ee", 1.8, 2) + ln2("M40 -282 v-14 M48 -282 v-10", 3, BLUE);
  b += limb(64, -305, A[1][0], A[1][1], 14, "#f7f5ee", 22);
  b += sh2("M-14 -334 v-18 h28 v18", SKIN) + c2(0, -400, 54, SKIN) + c2(-54, -398, 10, SKIN) + c2(54, -398, 10, SKIN);
  b += sh2("M-58 -392 L-66 -420 L-50 -418 L-56 -448 L-36 -436 L-30 -466 L-12 -446 L0 -474 L12 -448 L30 -468 L34 -438 L56 -450 L50 -420 L66 -422 L58 -392 Q40 -426 0 -424 Q-40 -426 -58 -392Z", "#4a3a30");
  b += '<g transform="translate(56 -420) rotate(-30)">' + R(-4, -22, 8, 40, "#e8c77a", 1.6) + sh2("M-4 18 L0 26 L4 18Z", SKIN, 0, 1.4) + '</g>';
  b += face(-392, t, o, false, 0.6);
  b += '<circle cx="-17" cy="-392" r="13" fill="none" stroke="' + INK + '" stroke-width="2.6"/><circle cx="17" cy="-392" r="13" fill="none" stroke="' + INK + '" stroke-width="2.6"/>' + ln2("M-4 -394 Q0 -398 4 -394 M-30 -394 L-50 -398 M30 -394 L50 -398", 2.4);
  return wrap(x, y, s, t, o, b);
}
function apron(x, y, s) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')">' + sh2("M-46 -336 Q0 -320 46 -336 L60 -310 L70 -120 Q0 -108 -70 -120 L-60 -310Z", LEAD, 1) + ln2("M-46 -336 Q-40 -360 -20 -352 M46 -336 Q40 -360 20 -352", 4, "#5d6369") + T("Pb", 0, -220, 34, "#3e4448", 900) + '</g>'; }
function lightbox(x, y, w, h, t, inner) { return R(x - w / 2 - 12, y - h / 2 - 12, w + 24, h + 24, "#b8bcb6", 2.4, 6) + '<rect x="' + f(x - w / 2 - 4) + '" y="' + f(y - h / 2 - 4) + '" width="' + (w + 8) + '" height="' + (h + 8) + '" fill="#eaf4f8" opacity="' + f(0.85 + 0.15 * Math.sin(t * 4)) + '"/>' + film(x, y, w, h, inner); }
function hospital(t) { return paper() + R(-200, 560, 760, 400, "#c9d6d0", 2.4) + '<rect x="-200" y="560" width="760" height="400" fill="url(#hatch)"/>' + R(250, 190, 70, 70, GLASS, 2.2, 4) + ln2("M285 190 v70 M250 225 h70", 2) + sh2("M268 300 h34 v14 h-34z", "#e0452c", 0, 1.8) + T("+", 285, 312, 16, "#fff", 900); }
function qmark(x, y, s, t) { return '<g transform="translate(' + f(x) + ' ' + f(y + Math.sin(t * 5 + x) * 4) + ') rotate(' + f(Math.sin(t * 3 + x) * 10) + ') scale(' + f(s) + ')">' + T("؟", 0, 18, 56, ORANGE, 900) + '</g>'; }
function star(x, y, r, t, col) { var k = 0.7 + 0.3 * Math.sin(t * 9 + x); return '<path transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(t * 90 % 360) + ') scale(' + f(k) + ')" d="M0 ' + (-r) + ' L' + f(r * .3) + ' ' + f(-r * .3) + ' L' + r + ' 0 L' + f(r * .3) + ' ' + f(r * .3) + ' L0 ' + r + ' L' + f(-r * .3) + ' ' + f(r * .3) + ' L' + (-r) + ' 0 L' + f(-r * .3) + ' ' + f(-r * .3) + 'Z" fill="' + (col || "#e8c77a") + '" stroke="' + INK + '" stroke-width="1.6"/>'; }
function eye(x, y, s, t) { var bl = ((t * 0.4) % 1) < 0.05; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')">' + (bl ? ln2("M-60 0 Q0 18 60 0", 3) : sh2("M-60 0 Q0 -46 60 0 Q0 46 -60 0Z", BONE) + c2(Math.sin(t * 1.5) * 8, 0, 22, BLUE) + c2(Math.sin(t * 1.5) * 8, 0, 10, INK, 0) + '<circle cx="' + f(Math.sin(t * 1.5) * 8 + 6) + '" cy="-6" r="4" fill="#fff"/>') + '</g>'; }
function brick(x, y, w, h) { var s = R(x, y, w, h, "#c98a64", 2.4); for (var r = 0; r * 20 < h; r++) { s += ln2("M" + f(x) + " " + f(y + r * 20) + " h" + w, 1.4, "#8a5a40"); for (var c = (r % 2) * 15; c < w; c += 30) s += ln2("M" + f(x + c) + " " + f(y + r * 20) + " v20", 1.4, "#8a5a40"); } return s + '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + w + '" height="' + h + '" fill="url(#hatch)"/>'; }
function crookes(x, y, s, t) { var g = 0.7 + 0.3 * Math.sin(t * 8); return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')"><ellipse rx="' + f(70 * g) + '" ry="' + f(50 * g) + '" fill="url(#glowG)"/>' + ln2("M-80 0 h22 M58 0 h22", 3) + '<ellipse rx="54" ry="34" fill="#dfeac4" stroke="' + INK + '" stroke-width="2.4" opacity=".9"/>' + '<ellipse cx="10" rx="22" ry="14" fill="#a9c46a" opacity="' + f(0.5 + 0.4 * g) + '"/>' + R(-58, -8, 14, 16, PUTTY, 2) + R(44, -8, 14, 16, PUTTY, 2) + ln2("M-28 -20 q10 -6 20 0", 2, "#fff") + '</g>'; }
function medal(x, y, s, t, k) { k = pop(k); if (k <= 0) return ""; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s * k) + ') rotate(' + f(Math.sin(t * 2) * 6) + ')"><circle r="' + f(72 + 6 * Math.sin(t * 4)) + '" fill="url(#glowW)"/>' + sh2("M-30 -110 L-12 -40 L12 -40 L30 -110Z", BLUE) + sh2("M-6 -110 L0 -40 L6 -110Z", ORANGE, 0, 1.4) + c2(0, 0, 46, "#d9b24a") + c2(0, 0, 34, "#e8c77a", 1.6) + T("نوبل", 0, 8, 20, INK, 900) + '</g>'; }
function flashlight(x, y, s, t) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')">' + R(-60, -14, 50, 28, "#46698a", 2.4, 5) + sh2("M-10 -14 L14 -24 L14 24 L-10 14Z", "#b8bcb6") + R(-46, -6, 14, 12, ORANGE, 1.6, 2) + '</g>'; }

// ── 0: وقعت على إيدك، ودخلت المستشفى، والدكتور شاف عضمك ─────────
shot(0, function (u, d) { return u < 1.9 ? [180, 400, lerp(1.0, 1.1, ease(u / 1.9))] : [180, 360, lerp(1.0, 1.12, ease((u - 1.9) / 2.4))]; }, function (u, d, t) {
  if (u < 1.9) {
    var kf = k_(u, 0.2, 0.6), s = paper() + R(-200, 600, 760, 400, "#d8c9a6", 2.4) + '<rect x="-200" y="600" width="760" height="400" fill="url(#hatch)"/>';
    s += sh2("M250 604 q20 -16 40 -4 q-6 -16 18 -10 q-4 10 -18 14 q-20 10 -40 0z", "#e8c77a");
    s += '<g transform="rotate(' + f(-58 * kf) + ' 250 600)">' + zizo(250, 600, 0.5, t, { mood: kf > 0.6 ? "surprised" : "happy", arms: kf > 0.5 ? [[-130, -60], [120, -290]] : [[-84, -170], [84, -170]] }) + '</g>';
    if (u > 0.85) { var ks = k_(u, 0.85, 0.3); s += '<g opacity="' + f(ks) + '">' + star(110, 540, 12, t) + star(80, 500, 9, t) + star(140, 492, 8, t) + T("آه!", 100, 440, 30, ORANGE, 900) + '</g>'; }
    return s;
  }
  var v = u - 1.9, s2 = hospital(t);
  s2 += lightbox(110, 300, 130, 180, t, xrayHand(0, 55, 0.62, t, { reveal: k_(v, 0.2, 0.6) }));
  s2 += fikri(270, 600, 0.5, t, { mood: "happy", talk: true, arms: [[-150, -330], [84, -170]] });
  s2 += R(80, 560, 90, 14, "#8a8070", 2.2, 3) + ln2("M90 574 V610 M160 574 V610", 4) + zizo(120, 610, 0.36, t, { sit: true, mood: "surprised", look: -1, arms: [[-60, -240], [70, -200]] });
  s2 += '<rect x="-200" y="-200" width="760" height="1040" fill="#fff" opacity="' + f(1 - clamp(v / 0.25)) + '"/>';
  return s2;
});
// ── 1: إزاي حاجة تعدّي من جلدك ولحمك؟ ─────────────────────
shot(1, camPush(180, 400, 1.0, 1.08), function (u, d, t) {
  var s = paper() + handSketch(200, 470, 1.15, t, {});
  for (var i = 0; i < 3; i++) { var yy = 300 + i * 70, p = (t * 0.8 + i * 0.33) % 1; s += arrow(-10, yy, lerp(10, 120, ease(p)), yy, ORANGE, 3, 1); if (p > 0.8) s += star(132, yy, 8, t, ORANGE); }
  s += qmark(310, 250, 1.0, t) + qmark(60, 560, 0.8, t);
  return s;
});
// ── 2: السر في الأشعة السينية، أو إكس راي ─────────────────
shot(2, camPush(180, 380, 1.08, 1.0), function (u, d, t) {
  var s = paper() + tube(180, 250, 1.0, t, true);
  s += beams(180, 282, 80, 280, 540, t, 7, BLUE, k_(u, 0.3, 0.5));
  s += sideHand(180, 540, 0.75, t) + plate(180, 540, 240, t, k_(u, 0.6, 0.5));
  s += label(225, 400, 250, 330, "إكس راي", ORANGE, k_(u, 1.6, 0.8), 20);
  return s;
});
// ── 3: نوع من الضوء، بس عينك ما تقدرش تشوفه ─────────────────
shot(3, camPush(180, 380, 1.0, 1.08), function (u, d, t) {
  var s = paper(), C = ["#c0392b", "#e67e22", "#e8c77a", "#6b9d3c", "#46698a", "#6a4c93"], k = k_(u, 0.2, 0.8);
  for (var i = 0; i < 6; i++) { var x = 340 - (i + 1) * 40; if (k * 6 > i) s += '<rect x="' + f(x) + '" y="230" width="40" height="44" fill="' + C[i] + '" stroke="' + INK + '" stroke-width="2"/>'; }
  if (k > 0.9) s += '<rect x="10" y="230" width="90" height="44" fill="' + BONE + '" stroke="' + INK + '" stroke-width="2" stroke-dasharray="6 5"/>' + T("إكس راي", 55, 259, 17, BLUE, 900);
  s += waveRay(340, 205, 10, 205, t, INK, 6, 30, k, 2) + T("الضوء اللي بنشوفه", 240, 310, 16, INK, 700);
  s += eye(200, 450, 1.1, t);
  s += ln2("M200 405 L55 290", 2.2, GREY).replace('fill="none"', 'fill="none" stroke-dasharray="6 6"');
  s += crossMark(110, 360, 0.55, k_(u, 1.8, 0.4));
  return s;
});
// ── 4: بتعدّي من حاجات الضوء العادي بيقف عندها ───────────────
shot(4, camPush(180, 400, 1.0, 1.06), function (u, d, t) {
  var s = paper() + brick(160, 220, 44, 380);
  for (var i = 0; i < 3; i++) { var p = (t * 0.9 + i / 3) % 1, y = 280 + i * 20; s += arrow(lerp(10, 156, ease(p)) - 50, y, lerp(10, 156, ease(p)), y, "#e8a63a", 3, 1); }
  s += star(156, 300, 10, t, "#e8c77a") + T("ضوء عادي", 80, 250, 17, "#a9741a", 800);
  s += waveRay(0, 470, 360 * clamp(0.3 + k_(u, 0.3, 1.4)), 470, t, BLUE, 8, 26, 1, 3.4) + '<circle cx="182" cy="470" r="' + f(26 + 4 * Math.sin(t * 6)) + '" fill="url(#glowB)"/>';
  s += T("إكس راي", 270, 430, 18, BLUE, 900) + arrow(250, 520, 320, 520, BLUE, 3, k_(u, 1.2, 0.5));
  return s;
});
// ── 5: الأشعة على إيدك، ووراها لوح حساس ───────────────────
shot(5, camPush(180, 400, 1.0, 1.1), function (u, d, t) {
  var s = paper() + tube(180, 240, 1.0, t, true) + beams(180, 272, 40, 320, 500, t, 8, BLUE, k_(u, 0.2, 0.5));
  s += sideHand(180, 500, 1.0, t) + plate(180, 500, 300, t, k_(u, 1.0, 0.6));
  s += label(260, 512, 300, 590, "لوح حساس", BLUE, k_(u, 1.4, 0.8), 19);
  return s;
});
// ── 6 و7: قطاع في الإيد: اللحم (مية) والعضم (كالسيوم) ─────────────
function slab(u, t, boneK, stopOnBone) {
  var s = paper() + R(30, 330, 300, 140, SKIN, 2.6, 40) + '<rect x="30" y="330" width="300" height="140" rx="40" fill="url(#hatch)" opacity=".5"/>';
  s += '<g opacity="' + f(0.25 + 0.75 * boneK) + '">' + R(60, 380, 240, 40, BONE, 2.4, 20) + '</g>';
  for (var i = 0; i < 9; i++) {
    var x = 55 + i * 31, onBone = x > 70 && x < 290, p = (t * 0.7 + hash(i)) % 1, y = lerp(180, 560, p);
    if (stopOnBone && onBone) { y = lerp(180, 380, ((t * 0.9 + hash(i)) % 1)); s += ln2("M" + x + " 180 L" + x + " " + f(y), 2.4, BLUE); if (y > 372) s += star(x, 380, 7, t, "#7fb0d8"); }
    else s += '<path d="M' + x + ' 180 L' + x + ' 560" stroke="' + BLUE + '" stroke-width="2.4" stroke-dasharray="7 9" stroke-dashoffset="' + f(-t * 60 - i * 5) + '"/><circle cx="' + x + '" cy="' + f(y) + '" r="4" fill="' + BLUE + '"/>';
  }
  return s;
}
shot(6, camPush(180, 400, 1.0, 1.08), function (u, d, t) {
  var s = slab(u, t, 0, false);
  for (var i = 0; i < 10; i++) { var x = 50 + hash(i) * 260, y = (hash(i + 4) > 0.5 ? 350 : 445) + Math.sin(t * 3 + i) * 5; s += '<path transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(pop(k_(u, 0.3 + i * 0.08, 0.4))) + ')" d="M0 -9 Q7 0 5 4 Q0 10 -5 4 Q-7 0 0 -9Z" fill="#7fb0d8" stroke="' + INK + '" stroke-width="1.2"/>'; }
  s += numBox("مية", 180, 520, k_(u, 0.6, 0.4), 20) + label(250, 345, 300, 260, "لحم", INK, k_(u, 1.6, 0.6), 18);
  return s;
});
shot(7, camPush(180, 400, 1.06, 1.14), function (u, d, t) {
  var s = slab(u, t, 1, true);
  for (var i = 0; i < 6; i++) s += '<g opacity="' + f(k_(u, 0.4 + i * 0.12, 0.3)) + '">' + c2(85 + i * 38, 400 + Math.sin(t * 4 + i) * 3, 10, "#a9c46a", 1.4) + T("Ca", 85 + i * 38, 405, 11, INK, 800) + '</g>';
  s += label(180, 420, 120, 540, "عضم", INK, k_(u, 1.2, 0.6), 19) + numBox("كالسيوم", 250, 545, k_(u, 0.6, 0.4), 18);
  return s;
});
// ── 8: اللوح بيسوّد مكان ما الأشعة وصلت ───────────────────
function plateTop(u, t, dark, bonesWhite) {
  var id = "pt" + (++CLIPN), h = 380 * dark, s = paper() + R(40, 190, 280, 400, "#eae3cc", 2.6, 8);
  s += '<clipPath id="' + id + '"><rect x="40" y="190" width="280" height="' + f(h) + '" rx="8"/></clipPath><g clip-path="url(#' + id + ')"><rect x="40" y="190" width="280" height="400" fill="' + XBG + '"/>' + xrayHand(180, 420, 1.0, t, { flesh: 0.32, bonesCol: "#eae3cc", reveal: bonesWhite }) + '</g>';
  s += '<rect x="40" y="190" width="280" height="400" rx="8" fill="none" stroke="' + INK + '" stroke-width="2.6"/>';
  return s;
}
shot(8, camPush(180, 390, 1.0, 1.05), function (u, d, t) {
  var dk = clamp(k_(u, 0.2, 2.0) + 0.02), s = plateTop(u, t, dk, 1);
  for (var i = 0; i < 12; i++) { var x = 55 + i * 23, y = 190 + 380 * dk - 30 + ((t * 120 + i * 37) % 30); s += '<circle cx="' + x + '" cy="' + f(y) + '" r="3.5" fill="' + BLUE + '"/>'; }
  s += label(80, 240, 70, 175, "أشعة وصلت", BLUE, k_(u, 1.6, 0.6), 16);
  return s;
});
// ── 9: الحتت اللي العضم حجبها بتفضل بيضا ─────────────────────
shot(9, camPush(180, 400, 1.0, 1.12), function (u, d, t) {
  var s = plateTop(u, t, 1, 1), w = k_(u, 0.6, 1.0);
  s += '<g opacity="' + f(w * (0.7 + 0.3 * Math.sin(t * 5))) + '">' + xrayHand(180, 420, 1.0, t, { flesh: 0, reveal: 1 }) + '</g>';
  var p = ptOn(HG().meta[2], 0.4); s += label(180 + p[0], 420 + p[1], 300, 560, "بيضا", ORANGE, k_(u, 1.4, 0.6), 19);
  return s;
});
// ── 10: اللي بتشوفه ضل العضم ──────────────────────────────
shot(10, camPush(180, 400, 1.0, 1.06), function (u, d, t) {
  var s = paper() + R(220, 190, 130, 400, "#e4dcc4", 2.4) + flashlight(70, 400, 1.0, t);
  s += '<path d="M84 384 L300 230 L300 570 L84 416Z" fill="url(#glowW)" opacity="' + f(0.8 + 0.2 * Math.sin(t * 6)) + '"/>';
  var m = k_(u, 1.8, 0.8);
  s += handShadow(290, 410, 0.95, t, INK, 0.55 * (1 - m));
  s += '<g opacity="' + f(m) + '">' + film(285, 390, 120, 300, xrayHand(0, 30, 0.9, t, {})) + '</g>';
  s += handSketch(140, 430, 0.62, t, {});
  s += label(260, 330, 200, 600, "ضل العضم", ORANGE, k_(u, 2.2, 0.6), 19);
  return s;
});
// ── 11: الكسر: خط أسود رفيع جوه الأبيض ──────────────────────
shot(11, function (u, d) { var c = crackPt(), k = ease(clamp((u - 0.6) / 1.6)); return [lerp(180, 180 + c[0] * 1.15, k), lerp(380, 430 + c[1] * 1.15, k), lerp(1.0, 2.0, k)]; }, function (u, d, t) {
  var s = paper() + film(180, 400, 300, 420, xrayHand(0, 30, 1.15, t, { crack: k_(u, 1.6, 0.8) }));
  var c = crackPt(), cx = 180 + c[0] * 1.15, cy = 430 + c[1] * 1.15;
  s += ring(cx, cy, 16, t, k_(u, 2.6, 0.6)) + arrow(cx + 50, cy + 30, cx + 18, cy + 8, ORANGE, 2.4, k_(u, 2.8, 0.4) * (Math.sin(t * 8) > -0.3 ? 1 : 0));
  return s;
});
// ── 12: سبعة وعشرين عضمة في إيد واحدة ──────────────────────
shot(12, camPush(180, 400, 1.0, 1.04), function (u, d, t) {
  var n = Math.floor(27 * clamp((u - 0.3) / 2.4)), s = paper();
  s += film(180, 410, 300, 400, xrayHand(0, 30, 1.1, t, { light: function (i) { return i < n ? 1 : 0.18; } }));
  s += numBox(String(n), 290, 580, n > 0 ? 1 : 0, 24);
  return s;
});
// ── 13: أول صورة أشعة في التاريخ ───────────────────────────
shot(13, camPush(180, 400, 1.08, 1.0), function (u, d, t) {
  var sep = k_(u, 0.2, 1.4), s = paper();
  s += film(180, 400, 220, 300, xrayHand(0, 30, 0.85, t, { ring: true }), 1, "#b98a5a");
  s += '<rect x="60" y="240" width="240" height="320" fill="#a8763a" opacity="' + f(0.35 * sep) + '"/>';
  var a = -t * 8; s += '<g transform="translate(290 220)">' + c2(0, 0, 30, BONE) + ln2("M0 0 L" + f(Math.sin(a) * 22) + " " + f(-Math.cos(a) * 22), 2.6, ORANGE) + ln2("M0 0 L" + f(Math.sin(a / 12) * 14) + " " + f(-Math.cos(a / 12) * 14), 3.4) + '</g>' + arrow(330, 260, 300, 270, INK, 2, 1);
  s += numBox("أول صورة أشعة", 180, 598, k_(u, 1.2, 0.4), 22);
  return s;
});
// ── 14: سنة 1895 رونتجن صوّر إيد مراته ─────────────────────
var RONT = { g: "m", beard: true, hairCol: "#6b625a", top: "#3e3a36", bottom: "#2b2b2b", seed: 0.2 }, BERTHA = { g: "f", hair: "bun", top: "#6d4a5e", bottom: "#6d4a5e", hairCol: "#4a3326", seed: 0.8 };
function lab(t) { return paper() + '<rect x="-200" y="-200" width="760" height="1040" fill="#a8763a" opacity=".18"/>' + R(-200, 590, 760, 400, "#b98a5a", 2.4) + '<rect x="-200" y="590" width="760" height="400" fill="url(#hatch)"/>'; }
function rg(o, extra) { var r = {}; for (var k in o) r[k] = o[k]; for (var k2 in extra) r[k2] = extra[k2]; return r; }
shot(14, camPush(180, 420, 1.0, 1.08), function (u, d, t) {
  var s = lab(t) + R(150, 470, 210, 16, "#8a5a3a", 2.4) + ln2("M170 486 V590 M340 486 V590", 5);
  s += crookes(250, 290, 0.8, t) + ln2("M250 318 V440", 2, GREY) + beams(250, 320, 200, 300, 462, t, 5, "#6b7d3c", 0.8);
  s += R(195, 456, 110, 14, "#5c6b78", 2) + sideHand(262, 456, 0.38, t);
  s += person(80, 600, 0.48, t, rg(RONT, { mood: "happy", arms: [[-84, -170], [120, -300]] }));
  s += person(300, 600, 0.42, t, rg(BERTHA, { mood: "happy", flip: true, arms: [[-84, -170], [-130, -280]] }));
  s += numBox("1895", 90, 250, k_(u, 0.3, 0.4), 26);
  return s;
});
// ── 15: شافت عضمها وخاتمها وقالت: أنا شفت موتي ─────────────────
shot(15, camPush(180, 400, 1.0, 1.1), function (u, d, t) {
  var s = lab(t) + film(110, 340, 170, 260, xrayHand(0, 30, 0.7, t, { ring: true }), k_(u, 0, 0.4), "#b98a5a");
  var p = ringPt(); s += label(110 + p[0] * 0.7, 370 + p[1] * 0.7, 40, 520, "خاتم", ORANGE, k_(u, 0.6, 0.6), 18);
  s += person(270, 610, 0.5, t, rg(BERTHA, { mood: "surprised", flip: true, arms: [[-100, -330], [100, -330]] }));
  s += bubble(250, 220, 110, 66, 262, 300, T("!!", 0, 14, 40, ORANGE, 900), k_(u, 1.5, 0.4));
  return s;
});
// ── 16: سمّاها إكس لأنه ماكانش عارف هي إيه ─────────────────────
shot(16, camPush(180, 400, 1.0, 1.06), function (u, d, t) {
  var s = lab(t), k = pop(k_(u, 0.2, 0.5));
  s += '<g transform="translate(220 320) rotate(' + f(t * 40 % 360) + ') scale(' + f(k) + ')">' + T("X", 0, 52, 150, BLUE, 900) + '</g>';
  s += qmark(110, 240, 0.9, t) + qmark(320, 220, 0.7, t) + qmark(330, 450, 0.8, t);
  s += person(100, 610, 0.46, t, rg(RONT, { mood: "confused", arms: [[-100, -330], [84, -170]] }));
  return s;
});
// ── 17: أول نوبل، ورفض يسجّلها باسمه علشان الناس كلها ─────────────
shot(17, function (u, d) { return u < 2.4 ? [180, 380, 1.05] : [180, 400, lerp(1.05, 0.95, ease((u - 2.4) / 2))]; }, function (u, d, t) {
  var s = lab(t);
  if (u < 2.4) {
    s += medal(180, 280, 1.0, t, k_(u, 0.1, 0.5)) + numBox("1901", 180, 380, k_(u, 0.5, 0.4), 22);
    s += person(100, 610, 0.36, t, rg(RONT, { mood: "happy", arms: [[-84, -170], [130, -230]] }));
    var kp = k_(u, 1.3, 0.4); s += '<g transform="translate(260 520) rotate(' + f(8 + 10 * kp) + ')">' + R(-40, -50, 80, 100, BONE, 2, 3) + T("براءة", 0, -18, 16, INK, 800) + T("اختراع", 0, 4, 16, INK, 800) + '</g>' + crossMark(260, 520, 0.8, kp);
    return s;
  }
  var v = u - 2.4; s += globe(180, 400, 90, t);
  for (var i = 0; i < 6; i++) { var a = i / 6 * 6.283 + t * 0.4, k = pop(k_(v, 0.2 + i * 0.15, 0.4)); if (k > 0) s += '<g transform="translate(' + f(180 + Math.cos(a) * 140) + ' ' + f(400 + Math.sin(a) * 150) + ') scale(' + f(k * 0.6) + ')">' + R(-34, -40, 68, 80, "#b8bcb6", 2, 6) + R(-24, -30, 48, 60, XBG, 1.6, 4) + '<g transform="translate(0 6) scale(.26)">' + bonesAll(XBN, false) + '</g></g>'; }
  return s;
});
// ── 18: مريلة رصاص، الأشعة ما تعرفش تعدّي منها ──────────────────
shot(18, camPush(180, 420, 1.0, 1.1), function (u, d, t) {
  var s = hospital(t) + tube(170, 230, 0.8, t, true);
  s += zizo(180, 610, 0.52, t, { mood: "smug", arms: [[-84, -170], [84, -170]] }) + apron(180, 610, 0.52);
  for (var i = 0; i < 5; i++) { var x = 140 + i * 20, p = (t * 1.1 + i * 0.21) % 1, y = lerp(255, 470, p); s += ln2("M" + f(170 + (x - 180) * 0.2) + " 255 L" + f(x) + " " + f(y), 2.4, BLUE); if (p > 0.88) s += star(x, 470, 7, t, "#7fb0d8") + arrow(x, 470, x + (i - 2) * 16, 440, BLUE, 2, 1); }
  s += label(215, 520, 270, 590, "رصاص", ORANGE, k_(u, 1.4, 0.6), 19);
  return s;
});
