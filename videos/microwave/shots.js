// «إزاي الميكروويف بيسخّن الأكل؟» بستايل السكتش — اللوحة 640×800
// السطر 0 = كارت البداية (intro)، السطر 18 = كارت الملخص (outro)، والمشاهد من 1 لـ17.
var RED = "#b8432c", GLOW = "#f2d27a", STEEL = "#9a9a90";

// ── أشكال خاصة بالفيديو ──────────────────────────────────
// ميكروويف من قدّام: الشباك فيه طبق بيلف وأكل، ولوحة تحكم فيها عداد
function microwaveS(x, y, s, t, on, timer) {
  var spin = Math.sin(t * 1.6) * 40, g = '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">';
  g += R(-210, -140, 420, 280, PUTTY, 2.5, 16) + '<rect x="-210" y="-140" width="420" height="280" rx="16" fill="url(#hatch)"/>';
  g += R(-190, -118, 290, 236, "#3a3a32", 2, 8);
  if (on) g += '<rect x="-188" y="-116" width="286" height="232" rx="7" fill="' + GLOW + '" opacity="' + f(0.35 + 0.06 * Math.sin(t * 6)) + '"/>';
  g += '<ellipse cx="-45" cy="88" rx="115" ry="16" fill="' + BONE + '" stroke="' + INK + '" stroke-width="2"/>';
  g += bowlS(-45 + spin, 70, 0.9);
  g += R(112, -118, 80, 236, BONE, 2, 6) + R(122, -104, 60, 30, INK, 1.5, 4) + T(timer || "2:00", 152, -82, 18, "#9fd36a", 800);
  g += circle(152, -20, 20, PUTTY, true) + '<path d="M152 -20 L' + f(152 + Math.cos(t * 2) * 16) + ' ' + f(-20 + Math.sin(t * 2) * 16) + '" stroke="' + INK + '" stroke-width="2.5"/>';
  g += circle(152, 40, 12, ORANGE) + R(127, 70, 50, 22, PUTTY, 1.5, 4);
  return g + '</g>';
}
function bowlS(x, y, s) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">' + shape("M-50 -28 Q-46 14 0 16 Q46 14 50 -28 Z", BONE, false) + shape("M-50 -28 Q0 -46 50 -28 Q0 -16 -50 -28 Z", ORANGE, true) + '</g>'; }
function steam(x, y, t, n, h) { var s = ""; n = n || 3; for (var i = 0; i < n; i++) { var ph = (t * 0.6 + i / n) % 1, xx = x + (i - (n - 1) / 2) * 26; s += '<g opacity="' + f(1 - ph) + '">' + waveRay(xx, y - ph * 30, xx, y - (h || 90) - ph * 30, t + i, GREY, 6, 30, 1, 2.5) + '</g>'; } return s; }
// جزيء مية: أكسجين أزرق (سالب) وهيدروجينين (موجب)، ang بالدرجات
function waterMol(x, y, ang, s, signs) {
  var g = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(ang || 0) + ') scale(' + (s || 1) + ')">';
  g += '<path d="M0 0 L-22 18 M0 0 L22 18" stroke="' + INK + '" stroke-width="3"/>' + circle(-22, 18, 10, BONE) + circle(22, 18, 10, BONE) + circle(0, 0, 18, BLUE, true);
  if (signs) g += T("−", 0, 7, 22, "#fff", 900) + T("+", -22, 24, 15, RED, 900) + T("+", 22, 24, 15, RED, 900);
  return g + '</g>';
}
function magnetronS(x, y, s, t) {
  var g = '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">' + '<circle r="' + f(70 + Math.sin(t * 7) * 6) + '" fill="url(#glowO)" opacity=".7"/>';
  for (var i = -3; i <= 3; i++) g += R(i * 12 - 4, -62, 8, 124, STEEL, 1.2);
  g += circle(0, 0, 40, "#b5745a", true) + circle(0, 0, 16, ORANGE) + R(-14, 40, 28, 34, PUTTY, 1.5);
  return g + '</g>';
}
function flameS(x, y, s, t) { var w = Math.sin(t * 8) * 4; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">' + shape("M0 -70 C" + f(30 + w) + " -30 40 0 30 20 C20 40 -20 40 -30 20 C-40 0 " + f(-20 - w) + " -30 0 -70 Z", ORANGE, true) + shape("M0 -30 C14 -10 18 6 10 18 C4 26 -4 26 -10 18 C-18 6 -14 -10 0 -30 Z", GLOW) + '</g>'; }
function coilS(x, y, s, t) { var d = "M-60 0"; for (var i = 0; i < 6; i++) d += " q10 -30 20 0"; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')"><path d="' + d + ' l0 0" stroke="' + RED + '" stroke-width="7" fill="none" opacity="' + f(0.7 + 0.3 * Math.sin(t * 5)) + '"/><path d="' + d + '" stroke="' + INK + '" stroke-width="1.5" fill="none"/>' + R(-80, 10, 160, 20, PUTTY, 2) + '</g>'; }
function towerS(x, y, t) { var s = '<path d="M' + x + ' ' + y + ' L' + (x - 40) + ' ' + (y + 200) + ' M' + x + ' ' + y + ' L' + (x + 40) + ' ' + (y + 200) + ' M' + (x - 30) + ' ' + (y + 150) + ' L' + (x + 30) + ' ' + (y + 150) + ' M' + (x - 18) + ' ' + (y + 90) + ' L' + (x + 18) + ' ' + (y + 90) + '" stroke="' + INK + '" stroke-width="3"/>' + circle(x, y, 8, ORANGE); for (var i = 0; i < 3; i++) { var r = 20 + ((t * 30 + i * 25) % 75); s += '<path d="M' + f(x - r) + ' ' + f(y - r * 0.4) + ' Q' + x + ' ' + f(y - r * 1.2) + ' ' + f(x + r) + ' ' + f(y - r * 0.4) + '" stroke="' + BLUE + '" stroke-width="3" fill="none" opacity="' + f(1 - r / 95) + '"/>'; } return s; }
function magnetU(x, y, s) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">' + shape("M-50 -60 L-50 20 A50 50 0 0 0 50 20 L50 -60 L22 -60 L22 20 A22 22 0 0 1 -22 20 L-22 -60 Z", RED, true) + R(-50, -80, 28, 22, BONE, 2) + R(22, -80, 28, 22, BONE, 2) + T("N", -36, -63, 16, INK, 900) + T("S", 36, -63, 16, INK, 900) + '</g>'; }
function radarDish(x, y, s, t) { var a = Math.sin(t * 0.8) * 12; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">' + R(-12, 0, 24, 120, STEEL, 2) + R(-50, 120, 100, 20, PUTTY, 2) + '<g transform="rotate(' + f(a - 30) + ')">' + shape("M-90 -10 Q0 -80 90 -10 Q0 20 -90 -10 Z", PUTTY, true) + '<path d="M0 -30 L0 -90" stroke="' + INK + '" stroke-width="3"/>' + circle(0, -92, 6, ORANGE) + '</g></g>'; }
function fmt(n) { return Math.floor(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

// ── كارت البداية: ميكروويف شغال في المطبخ، والأكل بيطلع منه بخار
intro(function (t) {
  return dark("#2a2620") + R(0, 250, 580, 70, "#5a4a36", 0) + '<rect x="0" y="250" width="580" height="70" fill="url(#hatchW)"/>' + microwaveS(290, 150, 0.62, t, true, "1:" + ("0" + (59 - Math.floor(t * 3) % 60)).slice(-2)) + steam(262, 140, t, 3, 50) + ring(262, 150, 95, t, ease(t / 1.4));
});

// 1 — من غير نار ولا سخان
shot(1, camPush(320, 400, 1, 1.08), function (u, d, t) {
  return paper() + flameS(170, 230, 1.1, t) + coilS(470, 240, 1, t) + crossMark(170, 210, 1.3, (u - 1.3) / 0.6) + crossMark(470, 230, 1.3, (u - 2.3) / 0.6)
    + microwaveS(320, 540, 0.85, t, true) + label(170, 160, 270, 110, "نار", ORANGE, ease((u - 0.6) / 0.8)) + label(470, 220, 390, 130, "سخان", RED, ease((u - 1.6) / 0.8));
});
// 2 — الأكل سخن والطبق بارد
shot(2, camPush(320, 440, 1, 1.15), function (u, d, t) {
  return paper() + '<ellipse cx="320" cy="500" rx="220" ry="46" fill="' + BONE + '" stroke="' + INK + '" stroke-width="2.5"/><ellipse cx="320" cy="500" rx="220" ry="46" fill="url(#hatch)"/>' + bowlS(320, 450, 2) + steam(320, 380, t, 3, 120)
    + label(320, 420, 470, 250, "أكل سخن", ORANGE, ease((u - 0.3) / 0.8)) + label(480, 510, 520, 640, "طبق بارد؟", BLUE, ease((u - 0.9) / 0.8)) + T("؟", 140, 300, 120, ORANGE, 900);
});
// 3 — الـmagnetron جوه الجهاز
shot(3, camMove([320, 400, 0.95], [440, 330, 1.25]), function (u, d, t) {
  return paper() + R(70, 180, 500, 420, PUTTY, 2.5, 16) + R(100, 230, 300, 330, "#3a3a32", 2, 6) + '<rect x="100" y="230" width="300" height="330" fill="url(#hatchW)" opacity=".4"/>' + R(420, 210, 130, 370, BONE, 2, 6)
    + magnetronS(485, 330, 0.85, t) + T("قطاع من جوه", 250, 160, 22, GREY, 700) + label(470, 300, 560, 150, "magnetron", OLIVE, ease((u - 0.5) / 0.8), 24);
});
// 4 — موجات ميكروويف، قريبة من موجات الراديو
shot(4, camPan(260, 380, 400, 1.02), function (u, d, t) {
  var s = paper() + magnetronS(90, 300, 0.7, t);
  for (var i = 0; i < 3; i++) s += waveRay(140, 260 + i * 40, 600, 260 + i * 40, t + i * 0.4, ORANGE, 12, 60, ease((u - i * 0.2) / 1.2), 3);
  return s + label(360, 300, 420, 160, "موجات ميكروويف", ORANGE, ease((u - 0.8) / 0.8)) + towerS(470, 470, t) + label(470, 470, 300, 640, "موجات الراديو", BLUE, ease((u - 2.4) / 0.8));
});
// 5 — اتنين ونص مليار مرة في الثانية
shot(5, camPush(320, 400, 1, 1.1), function (u, d, t) {
  var n = 2.45e9 * ease(u / 2.6);
  return paper() + waveRay(30, 330, 610, 330, t * 3, ORANGE, 40, 34, ease(u / 0.8), 4) + numBox(fmt(n), 320, 520, (u - 0.4) / 0.6, 30) + T("مرة في الثانية", 320, 590, 26, INK, 800) + dots(t, 60, 640, 520, 60, 16, ORANGE, 60);
});
// 6 — الأكل مليان جزيئات مية
shot(6, camMove([260, 480, 1.0], [400, 340, 1.1]), function (u, d, t) {
  var inner = "";
  for (var i = 0; i < 14; i++) inner += waterMol(-110 + (i % 4) * 72 + Math.sin(t * 2 + i) * 6, -100 + Math.floor(i / 4) * 66 + Math.cos(t * 2 + i) * 6, i * 40 + t * 20, 0.8);
  return paper() + bowlS(220, 560, 2.4) + steam(220, 490, t, 3, 90) + '<path d="M260 520 L360 380" stroke="' + INK + '" stroke-width="1.5" stroke-dasharray="6 5"/>'
    + inset(430, 300, 150, '<rect x="-160" y="-160" width="320" height="320" fill="#f6e2c8"/>' + inner, (u - 0.4) / 0.7) + label(470, 400, 560, 520, "جزيئات مية", BLUE, ease((u - 1.2) / 0.8));
});
// 7 — جزيء المية زي مغناطيس صغير
shot(7, camPush(320, 400, 1, 1.1), function (u, d, t) {
  return paper() + waterMol(240, 360, Math.sin(t * 1.5) * 8, 3.2, true)
    + label(240, 340, 360, 220, "طرف سالب", BLUE, ease((u - 0.9) / 0.8)) + label(170, 430, 210, 600, "طرف موجب", RED, ease((u - 0.4) / 0.8))
    + magnetU(480, 470, 1.1) + T("=", 380, 400, 60, INK, 900) + label(480, 520, 520, 650, "مغناطيس صغير", OLIVE, ease((u - 3.2) / 0.8));
});
// 8 — الموجة بتلف الجزيئات يمين وشمال
shot(8, camPan(280, 360, 400, 1.05), function (u, d, t) {
  var s = paper() + waveRay(0, 200, 640, 200, t * 2, ORANGE, 30, 120, 1, 4), sw = Math.sin(t * 14) * 70;
  for (var i = 0; i < 9; i++) s += waterMol(130 + (i % 3) * 190, 340 + Math.floor(i / 3) * 140, sw + i * 10, 1.1);
  return s + arrow(250, 660, 390, 660, INK, 3, ease((u - 0.8) / 0.6)) + arrow(390, 700, 250, 700, INK, 3, ease((u - 1.2) / 0.6)) + label(320, 200, 460, 110, "الموجة", ORANGE, ease((u - 0.3) / 0.8));
});
// 9 — الاحتكاك بيطلع حرارة
shot(9, camPush(320, 420, 1, 1.12), function (u, d, t) {
  var k = ease((u - 1) / 2.5), s = paper() + '<rect x="-600" y="-600" width="1840" height="2000" fill="' + ORANGE + '" opacity="' + f(0.25 * k) + '"/>';
  for (var i = 0; i < 12; i++) { var j = 10 * Math.sin(t * 18 + i * 2); s += waterMol(140 + (i % 4) * 120 + j, 300 + Math.floor(i / 4) * 120 - j, Math.sin(t * 14 + i) * 70, 1); }
  for (var c = 0; c < 4; c++) s += '<g opacity="' + f(0.5 + 0.5 * Math.sin(t * 10 + c * 2)) + '">' + T("✶", 200 + c * 90, 360 + (c % 2) * 120, 26, ORANGE, 900) + '</g>';
  return s + arrows(t, 320, 640, 320, 140, 6, RED, 420) + numBox(Math.round(20 + 55 * k) + "°C", 320, 720, (u - 0.8) / 0.6, 26) + label(380, 420, 500, 140, "احتكاك = حرارة", ORANGE, ease((u - 2) / 0.8));
});
// 10 — الأكل يسخن والطبق الناشف بارد
shot(10, camPush(320, 420, 1.05, 1.12), function (u, d, t) {
  var s = paper() + shape("M80 520 L560 520 L520 600 L120 600 Z", BONE, true) + shape("M140 520 Q320 300 500 520 Z", "#f6c9a0", true);
  for (var i = 0; i < 8; i++) s += waterMol(200 + (i % 4) * 80, 470 - Math.floor(i / 4) * 60, Math.sin(t * 14 + i) * 70, 0.65);
  return s + arrows(t, 320, 400, 320, 220, 5, RED, 220) + label(400, 440, 520, 260, "أكل فيه مية = سخن", ORANGE, ease((u - 0.4) / 0.8)) + label(140, 580, 100, 690, "طبق ناشف = بارد", BLUE, ease((u - 2) / 0.8));
});
// 11 — الطبق اللي بيلف بيوزّع السخونية
shot(11, camPush(320, 420, 1, 1.08), function (u, d, t) {
  var s = paper() + T("منظر من فوق", 320, 130, 22, GREY, 700), spots = [[230, 330, RED], [420, 300, BLUE], [450, 500, RED], [210, 520, BLUE], [320, 420, RED]];
  s += circle(320, 420, 210, BONE, true);
  for (var i = 0; i < spots.length; i++) s += '<circle cx="' + spots[i][0] + '" cy="' + spots[i][1] + '" r="' + f(55 + 5 * Math.sin(t * 3 + i)) + '" fill="' + spots[i][2] + '" opacity=".28"/>';
  s += '<g transform="rotate(' + f(t * 40) + ' 320 420)">' + circle(320, 420, 140, "#f6c9a0", true) + '<path d="M320 420 L320 290" stroke="' + INK + '" stroke-width="3"/>' + circle(320, 290, 8, ORANGE) + '</g>';
  return s + label(230, 330, 170, 170, "حتة سخنة", RED, ease((u - 1.2) / 0.8)) + label(420, 300, 460, 170, "حتة باردة", BLUE, ease((u - 1.8) / 0.8)) + label(500, 480, 460, 690, "الطبق بيلف", OLIVE, ease((u - 0.4) / 0.8));
});
// 12 — ليه الموجات ما بتطلعش برّه؟
shot(12, camMove([300, 420, 1.1], [320, 400, 0.95]), function (u, d, t) {
  var s = paper() + R(60, 250, 360, 300, PUTTY, 2.5, 14) + R(80, 270, 320, 260, "#3a3a32", 2, 6);
  for (var i = 0; i < 3; i++) { var x0 = 100 + ((t * 120 + i * 100) % 280); s += waveRay(x0, 320 + i * 70, x0 + 50, 320 + i * 70, t, ORANGE, 8, 30, 1, 3); }
  return s + figure(540, 650, 1, t) + T("؟", 540, 340, 110, ORANGE, 900) + label(420, 400, 520, 200, "برّه؟", ORANGE, ease((u - 0.6) / 0.8));
});
// 13 — شبكة الباب: الخروم أصغر من الموجة
shot(13, camPush(320, 400, 1, 1.04), function (u, d, t) {
  var mesh = '<rect x="-160" y="-160" width="320" height="320" fill="#3a3a32"/>';
  for (var yy = -150; yy <= 150; yy += 22) for (var xx = -150; xx <= 150; xx += 22) mesh += '<circle cx="' + xx + '" cy="' + yy + '" r="7" fill="' + GLOW + '" opacity=".75"/>';
  return paper() + R(60, 120, 230, 260, PUTTY, 2.5, 10) + R(80, 140, 190, 220, "#3a3a32", 2, 4) + '<path d="M270 250 L330 300" stroke="' + INK + '" stroke-width="1.5" stroke-dasharray="6 5"/>' + inset(440, 330, 140, mesh, (u - 0.3) / 0.7)
    + label(440, 330, 560, 520, "شبكة معدن", OLIVE, ease((u - 0.8) / 0.8)) + waveRay(60, 590, 600, 590, t, ORANGE, 30, 260, ease((u - 1.8) / 1), 5)
    + numBox("خرم ≈ 1 مم", 180, 670, (u - 2.4) / 0.6, 20) + numBox("موجة ≈ 12 سم", 450, 670, (u - 2.8) / 0.6, 20);
});
// 14 — الموجة تتحبس جوه والنور يعدّي
shot(14, camPan(280, 360, 400, 1.05), function (u, d, t) {
  var s = paper() + R(-200, 160, 520, 480, "#3a3a32", 2, 6), k = (t * 0.6) % 1;
  for (var yy = 170; yy < 640; yy += 18) s += '<path d="M320 ' + yy + ' l0 10" stroke="' + STEEL + '" stroke-width="10"/>';
  s += '<path d="M320 160 L320 640" stroke="' + INK + '" stroke-width="2"/>' + waveRay(0, 300, 310, 300, t, ORANGE, 26, 120, 1, 5) + arrow(300, 360, 300 - 240 * k, 420, ORANGE, 4, 1);
  for (var i = 0; i < 4; i++) { var kk = (t * 0.8 + i / 4) % 1; s += arrow(240, 470 + i * 30, 240 + 340 * kk, 470 + i * 30, "#d9a23a", 2.5, 1); }
  return s + label(160, 300, 220, 130, "الموجة اتحبست", ORANGE, ease((u - 0.3) / 0.8)) + label(520, 500, 460, 690, "النور بيعدّي", "#b0841c", ease((u - 1.8) / 0.8));
});
// 15 — اتاكتشف بالصدفة سنة 1945
shot(15, camPush(320, 400, 1, 1.12), function (u, d, t) {
  return dark("#1e1c18") + '<rect x="-600" y="-600" width="1840" height="2000" fill="url(#hatchW)" opacity=".25"/>' + radarDish(320, 470, 1.2, t) + T("1945", 320, 260, 120, BONE, 900) + ring(320, 225, 150, t, ease((u - 3) / 1)) + T("بالصدفة", 320, 360, 40, ORANGE, 900);
});
// 16 — بيرسي سبنسر والشوكولاتة السايحة
shot(16, camMove([300, 420, 1.0], [360, 420, 1.1]), function (u, d, t) {
  var melt = ease((u - 2.2) / 2.4), choc = shape("M-60 -24 L60 -24 L60 24 L-60 24 Z", "#6b3e26", true) + '<path d="M-20 -24 L-20 24 M20 -24 L20 24" stroke="' + INK + '" stroke-width="1.5"/>';
  for (var i = 0; i < 3; i++) choc += '<path d="M' + (-40 + i * 40) + ' 24 q-6 ' + f(30 * melt) + ' 0 ' + f(50 * melt) + ' q6 -' + f(20 * melt) + ' 0 -' + f(50 * melt) + '" fill="#6b3e26" stroke="' + INK + '" stroke-width="1.5"/>';
  return paper() + magnetronS(130, 380, 0.8, t) + arrows(t, 180, 380, 300, 420, 4, ORANGE, 80) + figure(330, 640, 1.4, t, PUTTY) + '<path d="M345 520 L410 420" stroke="' + INK + '" stroke-width="1.5" stroke-dasharray="6 5"/>'
    + inset(480, 330, 110, '<rect x="-120" y="-120" width="240" height="240" fill="#e9d9b7"/>' + choc, (u - 1.6) / 0.6)
    + label(320, 440, 180, 180, "بيرسي سبنسر", OLIVE, ease((u - 0.4) / 0.8)) + label(130, 380, 80, 560, "رادار", BLUE, ease((u - 1.2) / 0.8)) + label(520, 380, 560, 520, "شوكولاتة سايحة", ORANGE, ease((u - 3) / 0.8));
});
// 17 — أول ميكروويف: قد راجل وأكتر من 300 كيلو
shot(17, camMove([320, 380, 1.1], [320, 420, 0.95]), function (u, d, t) {
  var k = ease(u / 1.2), h = 460 * k;
  return paper() + '<path d="M40 660 H600" stroke="' + INK + '" stroke-width="2"/>' + R(150, 660 - h, 200, h, PUTTY, 2.5, 6) + '<rect x="150" y="' + f(660 - h) + '" width="200" height="' + f(h) + '" fill="url(#hatch)"/>'
    + (k > 0.9 ? R(175, 230, 150, 90, "#3a3a32", 2, 4) + circle(250, 400, 18, BONE) + R(190, 460, 120, 40, BONE, 2) : "")
    + figure(460, 660, 1.75, t) + '<path d="M110 200 L110 660 M100 200 H120 M100 660 H120" stroke="' + ORANGE + '" stroke-width="2"/>' + T("≈1.8 م", 110, 185, 22, ORANGE, 800)
    + numBox("300+ kg", 250, 705, (u - 2.6) / 0.6, 26) + label(250, 300, 420, 140, "Radarange", OLIVE, ease((u - 1.4) / 0.8));
});

// ── كارت الملخص: magnetron → موجات → جزيئات مية → حرارة
outro(function (u, t) {
  return '<rect width="580" height="300" fill="' + PAPER + '"/>' + magnetronS(70, 140, 0.55, t) + waveRay(120, 140, 230, 140, t, ORANGE, 10, 40, ease(u / 0.8), 3)
    + waterMol(290, 135, Math.sin(t * 12) * 60, 1.4) + arrows(t, 350, 140, 430, 140, 4, RED, 50) + steam(500, 160, t, 3, 70) + bowlS(500, 180, 1.1)
    + callout("1", 70, 250, u / 0.6) + callout("2", 175, 250, (u - 0.3) / 0.6) + callout("3", 290, 250, (u - 0.6) / 0.6) + callout("4", 500, 250, (u - 0.9) / 0.6);
});
