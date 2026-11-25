// «إزاي الكاميرا بتلقط صورة؟» بستايل السكتش على الشاشة كلها — اللوحة 640×800 (والورق ممدود فوق وتحت)
// السطر 0 = كارت البداية (intro)، السطر 23 = كارت الملخص (outro)، والمشاهد من 1 لـ22.
var RED = "#b8432c", GREEN = "#5f8a3a", YEL = "#f2c26a";

// ── أشكال خاصة بالموضوع ───────────────────────────────────
function treeS(x, y, s) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">' + R(-10, -60, 20, 60, "#9a7a52", 2) + circle(0, -100, 55, OLIVE, true) + circle(-35, -80, 32, OLIVE, true) + circle(35, -80, 32, OLIVE, true) + '</g>'; }
function lensS(x, y, h, w) { h = h || 120; w = w || 40; return shape("M" + x + " " + (y - h) + " Q" + (x + w) + " " + y + " " + x + " " + (y + h) + " Q" + (x - w) + " " + y + " " + x + " " + (y - h) + " Z", "url(#glass)", true) + '<path d="M' + (x - 6) + ' ' + (y - h * 0.6) + ' Q' + (x - 14) + ' ' + y + ' ' + (x - 6) + ' ' + (y + h * 0.3) + '" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>'; }
// موبايل: inner مرسوم حوالين (0,0) جوه شاشة 160×300
function phoneS(x, y, s, inner) {
  var id = "ph" + (++CLIPN);
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">' + R(-92, -172, 184, 344, INK, 2, 26) + '<clipPath id="' + id + '"><rect x="-80" y="-150" width="160" height="300" rx="14"/></clipPath>' +
    '<rect x="-80" y="-150" width="160" height="300" rx="14" fill="' + BONE + '"/><g clip-path="url(#' + id + ')">' + (inner || "") + '</g>' + circle(0, -161, 4, "#555", false, 1) + '</g>';
}
function irisS(x, y, r, open, t) {   // فتحة العدسة بشفرات
  var o = r * open, s = circle(x, y, r, PUTTY, true, 2.4) + circle(x, y, o, "#1c1c1c", false, 1.5);
  for (var i = 0; i < 7; i++) { var a = i / 7 * 6.283 + t * 0.1; s += '<path d="M' + f(x + Math.cos(a) * o) + ' ' + f(y + Math.sin(a) * o) + ' L' + f(x + Math.cos(a + 1.1) * r * 0.97) + ' ' + f(y + Math.sin(a + 1.1) * r * 0.97) + '" stroke="' + INK + '" stroke-width="1.8"/>'; }
  return s;
}
function eyeS(x, y, t, s, pupil) { var lk = Math.sin(t) * 6; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">' + shape("M-90 0 Q0 -66 90 0 Q0 66 -90 0 Z", BONE) + circle(lk, 0, 32, BLUE, true) + circle(lk, 0, 32 * (pupil || 0.4), INK) + circle(lk + 8, -8, 4, "#fff", false, 0.5) + '</g>'; }
function photon(x, y, t, i) { return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="13" fill="url(#glowW)"/>' + circle(x, y, 5.5, YEL, false, 1.2); }
function electron(x, y, s) { s = s || 1; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + s + ')">' + circle(0, 0, 11, BLUE, false, 1.4) + '<path d="M-5 0 H5" stroke="#fff" stroke-width="2.4"/></g>'; }
// شبكة مربعات: col(i,j) بيرجع لون المربع
function gridS(x, y, n, m, c, col, sw) { var s = ""; for (var i = 0; i < n; i++) for (var j = 0; j < m; j++) s += R(x + j * c, y + i * c, c, c, col ? col(i, j) : BONE, sw == null ? 1.2 : sw); return s; }
function bayer(i, j) { return i % 2 === 0 ? (j % 2 === 0 ? RED : GREEN) : (j % 2 === 0 ? GREEN : BLUE); }
function chipS(x, y, s, t, txt) {
  var p = "", k; for (k = 0; k < 6; k++) { var o = -62 + k * 25; p += R(o - 5, -96, 10, 18, PUTTY, 1.4) + R(o - 5, 78, 10, 18, PUTTY, 1.4) + R(-96, o - 5, 18, 10, PUTTY, 1.4) + R(78, o - 5, 18, 10, PUTTY, 1.4); }
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">' + p + R(-80, -80, 160, 160, "#3a3a36", 2.4, 10) + R(-50, -50, 100, 100, "#55554e", 1.5, 6) + '<rect x="-50" y="-50" width="100" height="100" fill="url(#hatchW)"/>' + '<circle r="' + f(30 + 6 * Math.sin(t * 6)) + '" fill="url(#glowO)" opacity=".7"/>' + T(txt || "CPU", 0, 8, 22, "#fff", 800) + '</g>';
}
function clockS(x, y, r, t, k) {   // ساعة إيقاف
  var a = -Math.PI / 2 + k * 6.283, s = R(x - 12, y - r - 26, 24, 16, PUTTY, 2) + circle(x, y, r, BONE, false, 3) + circle(x, y, r * 0.86, "none", false, 1);
  for (var i = 0; i < 12; i++) { var b = i / 12 * 6.283; s += '<path d="M' + f(x + Math.cos(b) * r * 0.74) + ' ' + f(y + Math.sin(b) * r * 0.74) + ' L' + f(x + Math.cos(b) * r * 0.84) + ' ' + f(y + Math.sin(b) * r * 0.84) + '" stroke="' + INK + '" stroke-width="2"/>'; }
  return s + '<path d="M' + x + ' ' + y + ' L' + f(x + Math.cos(a) * r * 0.75) + ' ' + f(y + Math.sin(a) * r * 0.75) + '" stroke="' + ORANGE + '" stroke-width="4" stroke-linecap="round"/>' + circle(x, y, 6, INK);
}
function shutterBtn(x, y, r, press) { return circle(x, y, r * 1.25, "none", false, 3) + circle(x, y + press * 4, r * (1 - press * 0.08), BONE, true, 2.4); }
function photoMini(w, h, t) {   // صورة صغيرة: سما وشمس وشجرة، مرسومة حوالين (0,0)
  return '<rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" fill="#a9c2d4"/>' + '<rect x="' + (-w / 2) + '" y="' + (h * 0.2) + '" width="' + w + '" height="' + (h * 0.3) + '" fill="#b8b07e"/>' +
    circle(w * 0.25, -h * 0.25, h * 0.1, YEL, false, 1.5) + treeS(-w * 0.15, h * 0.25, h / 300);
}
function flash(x, y, t, period) { var k = ((t % period) / period); return k < 0.12 ? '<circle cx="' + x + '" cy="' + y + '" r="' + f(40 + 300 * k) + '" fill="url(#glowW)" opacity="' + f(1 - k / 0.12) + '"/>' : ""; }
function bigCam(x, y, s, t) {   // كاميرا كبيرة (DSLR) من الجنب
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">' + R(-110, -70, 220, 140, "#3a3a36", 2.4, 14) + R(-60, -98, 70, 30, "#3a3a36", 2.4, 6) + R(70, -84, 30, 14, PUTTY, 1.6, 3) +
    circle(10, 0, 58, PUTTY, true, 2.4) + circle(10, 0, 40, "url(#glass)", false, 2) + circle(10, 0, 18, "#1c1c1c", false, 1.5) + '</g>';
}
function fileS(x, y, s, inner) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">' + shape("M-80 -110 H40 L80 -70 V110 H-80 Z", "#fbf8ef") + shape("M40 -110 V-70 H80", PUTTY) + (inner || "") + '</g>'; }

// ── كارت البداية: موبايل بيصوّر شجرة، وفلاش، ودايرة حوالين الزرار
intro(function (t) {
  return '<rect width="580" height="320" fill="' + PAPER + '"/><rect width="580" height="320" fill="url(#grid)"/>' + treeS(110, 280, 1.1) + sunS(80, 70, 26, t) +
    arrows(t, 170, 180, 330, 170, 4, YEL, 60) + '<g transform="translate(400 165) rotate(-8)">' + phoneS(0, 0, 0.82, photoMini(160, 300, t)) + '</g>' + flash(400, 40, t, 1.4) + ring(400, 165, 150, t, ease(t / 1.2));
});

// 1 — نور بيدخل الموبايل ويتحول لصورة
shot(1, camPush(320, 400, 1, 1.08), function (u, d, t) {
  var k = ease((u - 1.5) / 1.5), s = paper() + sunS(110, 180, 45, t);
  for (var i = 0; i < 4; i++) s += waveRay(150, 230 + i * 18, 370, 360 + i * 18, t + i * 0.4, YEL, 6, 30, ease((u - i * 0.15) / 1), 3);
  var inner = '<rect x="-80" y="-150" width="160" height="300" fill="' + BONE + '"/><g opacity="' + f(k) + '">' + photoMini(160, 300, t) + '</g>';
  return s + phoneS(450, 420, 1, inner) + T("؟", 230, 600, 120, ORANGE, 900) + label(250, 300, 120, 470, "نور", BLUE, ease((u - 0.4) / 0.8)) + label(470, 330, 570, 210, "صورة", OLIVE, ease((u - 2.4) / 0.8));
});

// 2 — اللحظة اللي بتدوس فيها على الزرار
shot(2, camPush(320, 420, 1.05, 1.2), function (u, d, t) {
  var press = clamp(Math.sin(t * 5) * 1.4);
  return paper() + phoneS(320, 380, 1.3, photoMini(160, 300, t) + shutterBtn(0, 110, 22, press)) + '<g transform="translate(0 ' + f(press * 10) + ')">' + shape("M360 640 C350 580 345 560 335 545 C330 535 345 528 352 536 L372 560 L380 470 C382 455 402 455 404 470 L410 580 C440 600 450 640 440 690 Z", SKIN, true) + '</g>' +
    ring(320, 523, 52, t, ease((u - 0.3) / 0.8)) + T("؟", 140, 250, 90, ORANGE, 900) + T("؟", 510, 230, 70, ORANGE, 900);
});

// 3 — النور بيخبط في الحاجات ويرتد للكاميرا
shot(3, camPan(280, 360, 420, 1.0), function (u, d, t) {
  var s = paper() + sunS(110, 150, 50, t) + horizon2(560) + treeS(200, 560, 1) + circle(360, 530, 30, ORANGE, true);
  s += arrow(140, 190, 200, 420, YEL, 4, ease(u / 0.8)) + arrow(150, 180, 350, 490, YEL, 4, ease((u - 0.2) / 0.8));
  s += arrows(t, 240, 430, 520, 360, 3, YEL, 40) + arrows(t, 380, 510, 530, 420, 3, YEL, 30);
  return s + bigCam(560, 380, 0.6, t) + label(200, 500, 90, 640, "بيرتد", ORANGE, ease((u - 1.2) / 0.8));
});
function horizon2(y) { return '<rect x="-600" y="' + y + '" width="1840" height="1200" fill="#c9bf9f"/><rect x="-600" y="' + y + '" width="1840" height="1200" fill="url(#hatch)"/><path d="M-600 ' + y + ' H1240" stroke="' + INK + '" stroke-width="2"/>'; }

// 4 — العدسة بتلم النور وتركّزه (والصورة بتتقلب)
shot(4, camPush(320, 400, 1, 1.1), function (u, d, t) {
  var p1 = ease(u / 1.2), p2 = ease((u - 1) / 1.2), s = paper() + treeS(110, 520, 1.15);
  var top = [110, 340], bot = [110, 515], img1 = [530, 470], img2 = [530, 320], LP = [[320, 310], [320, 395], [320, 480]];
  for (var i = 0; i < 3; i++) {
    s += '<path d="M' + top[0] + ' ' + top[1] + ' L' + f(lerp(top[0], LP[i][0], p1)) + ' ' + f(lerp(top[1], LP[i][1], p1)) + '" stroke="' + ORANGE + '" stroke-width="2.5"/>';
    if (p2 > 0) s += '<path d="M' + LP[i][0] + ' ' + LP[i][1] + ' L' + f(lerp(LP[i][0], img1[0], p2)) + ' ' + f(lerp(LP[i][1], img1[1], p2)) + '" stroke="' + ORANGE + '" stroke-width="2.5"/>';
    s += '<path d="M' + bot[0] + ' ' + bot[1] + ' L' + f(lerp(bot[0], LP[i][0], p1)) + ' ' + f(lerp(bot[1], LP[i][1], p1)) + '" stroke="' + BLUE + '" stroke-width="2.5"/>';
    if (p2 > 0) s += '<path d="M' + LP[i][0] + ' ' + LP[i][1] + ' L' + f(lerp(LP[i][0], img2[0], p2)) + ' ' + f(lerp(LP[i][1], img2[1], p2)) + '" stroke="' + BLUE + '" stroke-width="2.5"/>';
  }
  s += lensS(320, 395, 130, 44) + R(528, 280, 14, 230, PUTTY, 2);
  if (p2 > 0.9) s += '<g opacity="' + f(clamp((p2 - 0.9) * 10)) + '" transform="translate(500 330) scale(0.55 -0.55)">' + treeS(0, 0, 1) + '</g>';
  for (var j = 0; j < 4; j++) { var k = (t * 0.6 + j / 4) % 1; s += photon(lerp(110, 320, k), lerp(380, 395, k) + Math.sin(j) * 40, t); }
  return s + label(320, 270, 420, 170, "العدسة", OLIVE, ease((u - 0.4) / 0.8)) + label(535, 520, 470, 640, "النور متركّز", ORANGE, ease((u - 2.4) / 0.8));
});

// 5 — فتحة الكاميرا الكبيرة زي حدقة العين
shot(5, camPush(320, 400, 1, 1.1), function (u, d, t) {
  var open = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.6));
  return paper() + irisS(320, 260, 140, open, t) + eyeS(320, 560, t, 1.2, open * 0.9) + bigCam(140, 680, 0.45, t) +
    label(320 + 140 * open * 0.7, 260 - 140 * open * 0.7, 520, 120, "الفتحة", OLIVE, ease((u - 0.5) / 0.8)) + label(330, 560, 520, 680, "حدقة العين", BLUE, ease((u - 1.8) / 0.8));
});

// 6 — الموبايل فتحته ثابتة، فبيتحكم بالوقت
shot(6, camPush(320, 400, 1, 1.08), function (u, d, t) {
  var k = (t * 0.5) % 1, s = paper() + phoneS(180, 400, 1, '<rect x="-80" y="-150" width="160" height="300" fill="#3a3a36"/>' + circle(0, -90, 36, PUTTY, true) + circle(0, -90, 16, "#1c1c1c") + T("ثابتة", 0, 0, 26, "#fff", 800));
  s += clockS(460, 360, 110, t, k);
  for (var i = 0; i < 6; i++) { var q = (t * 0.9 + i / 6) % 1; if (k < 0.6) s += photon(lerp(620, 200, q), 200 + i * 30 - q * 80, t); }
  return s + numBox(k < 0.6 ? "مفتوح" : "مقفول", 460, 560, (u - 1) / 0.6, 26) + label(180, 310, 90, 160, "فتحة ثابتة", OLIVE, ease((u - 0.4) / 0.8)) + label(520, 290, 580, 160, "الوقت", ORANGE, ease((u - 1.6) / 0.8));
});

// 7 — النور بيوصل للحساس (sensor) في قلب الكاميرا
shot(7, camMove([320, 400, 0.95], [400, 400, 1.15]), function (u, d, t) {
  var s = paper() + R(60, 230, 520, 340, "#e3dccb", 2, 30) + '<rect x="60" y="230" width="520" height="340" rx="30" fill="url(#hatch)"/>' + lensS(170, 400, 120, 40);
  s += '<rect x="400" y="300" width="140" height="200" fill="url(#glowO)" opacity="' + f(0.5 + 0.3 * Math.sin(t * 4)) + '"/>' + R(430, 320, 80, 160, "#4a5a6a", 2.4, 4) + gridS(436, 326, 9, 4, 17, function () { return "#6b8299"; }, 0.6);
  for (var j = 0; j < 5; j++) { var k = (t * 0.7 + j / 5) % 1; s += photon(lerp(-40, 430, k), 400 + (j - 2) * lerp(50, 14, k), t); }
  return s + label(470, 330, 520, 160, "الحساس sensor", OLIVE, ease((u - 0.8) / 0.8)) + label(170, 300, 120, 160, "العدسة", GREY, ease((u - 0.2) / 0.8), 18);
});

// 8 — الحساس متقسم لملايين المربعات (pixels)
shot(8, function (u, d) { var k = ease(u / d); return [lerp(320, 360, k), lerp(400, 370, k), lerp(0.9, 2.2, k)]; }, function (u, d, t) {
  var s = paper() + R(120, 160, 400, 480, "#4a5a6a", 3, 6);
  s += gridS(130, 170, 24, 20, 19, function (i, j) { var v = 0.5 + 0.5 * Math.sin(i * 0.6 + j * 0.4 + t * 2); return "rgb(" + Math.round(90 + 60 * v) + "," + Math.round(110 + 60 * v) + "," + Math.round(130 + 60 * v) + ")"; }, 0.5);
  return s + '<rect x="358" y="360" width="19" height="19" fill="none" stroke="' + ORANGE + '" stroke-width="' + f(3 - u * 0.3) + '"/>' + label(367, 369, 420, 300, "pixel", ORANGE, ease((u - 1.5) / 0.8), 12);
});

// 9 — من 12 لـ50 مليون pixel
shot(9, camPush(320, 400, 1, 1.08), function (u, d, t) {
  var k = ease((u - 0.8) / 2.2), n = Math.round(lerp(12, 50, k)), s = paper();
  for (var i = 0; i < 16; i++) for (var j = 0; j < 13; j++) { var on = (i * 13 + j) / 208 < 0.24 + 0.76 * k; s += '<rect x="' + (110 + j * 32) + '" y="' + (160 + i * 22) + '" width="26" height="17" fill="' + (on ? ((i + j) % 2 ? "#6b8299" : "#8aa0b4") : "#ddd4bf") + '" stroke="' + INK + '" stroke-width=".6"/>'; }
  return s + numBox(n + ",000,000", 320, 590, (u - 0.3) / 0.6, 40) + T("pixel", 320, 670, 30, BLUE, 800);
});

// 10 — كل pixel بيعد النور اللي وقع عليه (زي جردل بيتملي)
shot(10, camPush(320, 420, 1, 1.12), function (u, d, t) {
  var lvl = clamp(u / d) * 0.85, s = paper(), top = 300, h = 300;
  for (var i = 0; i < 8; i++) { var q = (t * 1.1 + i / 8) % 1; s += photon(250 + hash(i) * 140, lerp(80, top + h * (1 - lvl), q), t); }
  s += '<rect x="230" y="' + f(top + h * (1 - lvl)) + '" width="180" height="' + f(h * lvl) + '" fill="' + YEL + '" opacity=".75"/><rect x="230" y="' + f(top + h * (1 - lvl)) + '" width="180" height="' + f(h * lvl) + '" fill="url(#hatch)"/>';
  s += '<path d="M230 ' + top + ' V' + (top + h) + ' H410 V' + top + '" stroke="' + INK + '" stroke-width="4" fill="none"/>';
  return s + numBox(String(Math.round(lvl * 1000)), 520, 450, (u - 0.6) / 0.6, 28) + label(410, 520, 520, 640, "pixel واحد", OLIVE, ease((u - 0.3) / 0.8)) + label(320, 200, 120, 160, "نور", BLUE, ease((u - 1) / 0.8));
});

// 11 — النور بيطلّع إلكترونات، وكل ما يزيد تزيد
shot(11, camPush(320, 400, 1, 1.1), function (u, d, t) {
  var k = clamp(u / d), s = paper() + R(160, 380, 320, 60, "#6b8299", 2.4) + '<rect x="160" y="380" width="320" height="60" fill="url(#hatch)"/>', n = Math.floor(3 + k * 14);
  for (var i = 0; i < 5; i++) { var q = (t * 1.2 + i / 5) % 1; s += photon(200 + i * 60, lerp(120, 380, q), t); }
  for (var j = 0; j < n; j++) s += electron(180 + (j % 9) * 35, 480 + Math.floor(j / 9) * 32 + Math.sin(t * 4 + j) * 3, 1);
  s += R(540, 300, 40, 300, BONE, 2) + '<rect x="542" y="' + f(598 - 296 * k) + '" width="36" height="' + f(296 * k) + '" fill="' + BLUE + '"/>';
  return s + label(260, 120, 120, 200, "نور", ORANGE, ease((u - 0.3) / 0.8)) + label(250, 490, 120, 640, "إلكترونات", BLUE, ease((u - 1.2) / 0.8));
});

// 12 — التأثير الكهروضوئي = نوبل أينشتاين، مش النسبية
shot(12, camPush(320, 400, 1, 1.08), function (u, d, t) {
  var s = paper() + figure(160, 560, 1.15, t, PUTTY) + '<g transform="translate(160 ' + f(420 + Math.sin(t * 2) * 4) + ')">' + '<path d="M-14 -44 L0 -10 L14 -44" stroke="' + RED + '" stroke-width="6" fill="none"/>' + circle(0, 10, 26, YEL, true, 2.4) + T("1921", 0, 17, 15, INK, 800) + '</g>';
  s += R(300, 220, 280, 110, BONE, 2, 10) + T("التأثير", 440, 265, 28, BLUE, 900) + T("الكهروضوئي", 440, 305, 28, BLUE, 900) + callout("✓", 560, 222, (u - 1) / 0.6);
  s += R(300, 400, 280, 90, BONE, 2, 10) + T("النسبية", 440, 458, 30, GREY, 800) + crossMark(440, 445, 1.1, (u - 3.2) / 0.6);
  return s + label(160, 400, 120, 160, "أينشتاين", OLIVE, ease((u - 0.3) / 0.8)) + T("جايزة نوبل", 160, 650, 24, ORANGE, 800);
});

// 13 — الـpixel بيحس بالكمية بس، مش بالألوان
shot(13, camPush(320, 400, 1, 1.1), function (u, d, t) {
  var s = paper() + gridS(140, 170, 6, 6, 60, function (i, j) { var v = Math.round(110 + 110 * (0.5 + 0.5 * Math.sin(i * 1.3 + j * 0.9 + t * 1.5))); return "rgb(" + v + "," + v + "," + v + ")"; }, 1.4);
  var cols = [RED, ORANGE, YEL, GREEN, BLUE];
  for (var i = 0; i < 5; i++) s += circle(170 + i * 75, 600, 26, cols[i], false, 2);
  return s + crossMark(320, 600, 1.6, (u - 2.2) / 0.6) + label(200, 200, 110, 120, "رمادي بس", GREY, ease((u - 0.6) / 0.8));
});

// 14 — فلتر صغير فوق كل pixel: أحمر أو أخضر أو أزرق
shot(14, camPush(320, 400, 1, 1.1), function (u, d, t) {
  var s = paper() + gridS(140, 220, 6, 6, 60, function () { return "#9a9a9a"; }, 1.4);
  for (var i = 0; i < 6; i++) for (var j = 0; j < 6; j++) {
    var k = ease((u - 0.4 - (i * 6 + j) * 0.05) / 0.4), y = lerp(-200, 220 + i * 60, k);
    if (k > 0) s += '<rect x="' + (140 + j * 60) + '" y="' + f(y) + '" width="60" height="60" fill="' + bayer(i, j) + '" opacity=".88" stroke="' + INK + '" stroke-width="1.4"/>';
  }
  return s + label(170, 250, 110, 150, "فلتر", OLIVE, ease((u - 1) / 0.8)) + T("أحمر · أخضر · أزرق", 320, 650, 30, INK, 800) + dots(t, 140, 600, 360, 20, 10, YEL, 40);
});

// 15 — الفلاتر الخضرا ضعف، لأن العين بتحس بالأخضر أكتر
shot(15, camPush(320, 400, 1, 1.08), function (u, d, t) {
  var pulse = 0.5 + 0.5 * Math.sin(t * 5), s = paper();
  for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) { var c = bayer(i, j), g = c === GREEN; s += '<rect x="' + (120 + j * 70) + '" y="' + (160 + i * 70) + '" width="70" height="70" fill="' + c + '" opacity="' + (g ? f(0.6 + 0.4 * pulse) : ".35") + '" stroke="' + INK + '" stroke-width="1.4"/>'; }
  s += numBox("×2", 520, 300, (u - 0.6) / 0.6, 40) + '<circle cx="320" cy="580" r="' + f(110 + pulse * 10) + '" fill="' + GREEN + '" opacity=".18"/>' + eyeS(320, 580, t, 1.1, 0.4);
  return s + label(390, 580, 520, 680, "عينك", OLIVE, ease((u - 2) / 0.8));
});

// 16 — الغالق: بيحدد النور هيفضل داخل قد إيه
shot(16, camPush(320, 400, 1, 1.1), function (u, d, t) {
  var k = 0.5 + 0.5 * Math.sin(t * 2.6), h = 170 * (1 - k), s = paper() + R(170, 230, 300, 340, "#4a5a6a", 2.4) + gridS(180, 240, 8, 7, 40, function () { return "#6b8299"; }, 0.6);
  if (k > 0.3) for (var j = 0; j < 4; j++) { var q = (t * 1.1 + j / 4) % 1; s += photon(lerp(320, 220 + j * 60, q), lerp(60, 400, q), t); }
  s += R(160, 220, 320, h, "#2f2f2c", 2.4) + '<rect x="160" y="220" width="320" height="' + f(h) + '" fill="url(#hatchW)"/>' + R(160, 580 - h, 320, h, "#2f2f2c", 2.4) + '<rect x="160" y="' + f(580 - h) + '" width="320" height="' + f(h) + '" fill="url(#hatchW)"/>';
  return s + label(470, 220 + h / 2, 560, 140, "الغالق", OLIVE, ease((u - 0.5) / 0.8)) + label(470, 520, 560, 660, "الحساس", GREY, ease((u - 1.5) / 0.8), 18);
});

// 17 — جزء من ألف من الثانية
shot(17, camPush(320, 400, 1, 1.12), function (u, d, t) {
  return paper() + flash(320, 360, t, 0.8) + clockS(320, 340, 150, t, (t * 3) % 1) + numBox("1/1000 ثانية", 320, 600, (u - 0.8) / 0.6, 36) + dots(t, 100, 660, 440, 40, 12, ORANGE, 60);
});

// 18 — المعالج بيقرا الأرقام ويحسب اللون الحقيقي
shot(18, camPan(280, 360, 400, 1.0), function (u, d, t) {
  var s = paper() + gridS(60, 300, 4, 4, 40, function (i, j) { return bayer(i, j); }, 1);
  for (var i = 0; i < 6; i++) { var q = (t * 0.9 + i / 6) % 1; s += T(String(Math.floor(hash(i + Math.floor(t)) * 255)), lerp(230, 330, q), 330 + i * 22, 16, BLUE, 700); }
  s += chipS(400, 380, 0.9, t, "CPU");
  var k = ease((u - 1.5) / 1.5); s += '<g opacity="' + f(k) + '" transform="translate(560 380)">' + photoMini(110, 160, t) + '<rect x="-55" y="-80" width="110" height="160" fill="none" stroke="' + INK + '" stroke-width="2"/></g>';
  return s + arrow(490, 380, 495 + 0 * k, 380, INK, 3, 1) + label(400, 300, 420, 160, "المعالج", OLIVE, ease((u - 0.4) / 0.8)) + label(140, 460, 120, 600, "pixels", BLUE, ease((u - 1) / 0.8), 18);
});

// 19 — كذا صورة ورا بعض بتتدمج في صورة أوضح
shot(19, camPush(320, 400, 1, 1.1), function (u, d, t) {
  var k = ease((u - 1.5) / 2), s = paper();
  for (var i = 4; i >= 0; i--) { var o = (i - 2) * 46 * (1 - k); s += '<g transform="translate(' + f(320 + o) + ' ' + f(380 - o * 0.6) + ')" opacity="' + f(lerp(0.55, 1, k)) + '">' + photoMini(240, 330, t) + '<rect x="-120" y="-165" width="240" height="330" fill="none" stroke="' + INK + '" stroke-width="2"/></g>'; }
  return s + numBox("×5", 520, 200, (u - 0.5) / 0.6, 30) + (k > 0.95 ? callout("✓", 470, 580, (u - 3.5) / 0.6) : "") + flash(320, 380, t, 0.9);
});

// 20 — أول صورة في التاريخ: 1826، وحوالي 8 ساعات
shot(20, camMove([320, 420, 1.05], [320, 380, 0.95]), function (u, d, t) {
  var sa = -Math.PI + clamp(u / d) * Math.PI, s = dark("#1f2530") + '<rect x="-600" y="560" width="1840" height="800" fill="#2f2a22"/>';
  s += sunS(320 + Math.cos(sa) * 240, 420 + Math.sin(sa) * 280, 30, t);
  s += '<path d="M150 560 L180 700 M210 560 L210 700 M270 560 L240 700" stroke="#c9b48a" stroke-width="5"/>' + R(120, 460, 180, 110, "#8a6a42", 2.4, 4) + '<rect x="120" y="460" width="180" height="110" fill="url(#hatchW)"/>' + R(300, 490, 50, 50, "#6a5236", 2.4) + circle(350, 515, 18, "url(#glass)");
  var hg = clamp(u / d);
  s += '<g transform="translate(500 620)">' + shape("M-34 -60 H34 L4 0 L34 60 H-34 L-4 0 Z", "rgba(255,255,255,.15)", false, 2.4) + '<path d="M' + f(-28 * (1 - hg)) + ' ' + f(-54 + 50 * hg) + ' H' + f(28 * (1 - hg)) + ' L0 -4 Z" fill="' + YEL + '"/><path d="M' + f(-28 * hg) + ' ' + f(56 - 46 * hg) + ' H' + f(28 * hg) + ' L28 56 H-28 Z" fill="' + YEL + '"/><path d="M0 -4 V56" stroke="' + YEL + '" stroke-width="2" opacity="' + f(0.5 + 0.5 * Math.sin(t * 20)) + '"/></g>';
  return s + numBox("1826", 210, 220, (u - 1.5) / 0.6, 40) + numBox("≈ 8 ساعات", 460, 300, (u - 5) / 0.6, 30);
});

// 21 — كله أرقام في ملف، والأرقام دي هي الصورة
shot(21, camPush(320, 400, 1, 1.1), function (u, d, t) {
  var s = paper(), k = ease((u - 2.5) / 1.5);
  for (var i = 0; i < 14; i++) { var q = (t * 0.7 + hash(i)) % 1; s += T(hash(i + Math.floor(t * 2)) > 0.5 ? "1" : "0", 120 + hash(i + 9) * 400, lerp(60, 320, q), 30, BLUE, 800); }
  var inner = '<g opacity="' + f(1 - k) + '">' + T("0101", 0, -20, 28, BLUE, 800) + T("1100", 0, 20, 28, BLUE, 800) + T("0110", 0, 60, 28, BLUE, 800) + '</g><g opacity="' + f(k) + '" transform="translate(0 10)">' + photoMini(130, 170, t) + '</g>';
  return s + fileS(320, 470, 1.2, inner) + label(410, 360, 520, 240, "ملف", OLIVE, ease((u - 0.8) / 0.8)) + T("photo.jpg", 320, 650, 24, GREY, 700);
});

// 22 — ارجع للموبايل: ملايين الـpixels في أقل من غمضة عين
shot(22, camMove([320, 400, 1.15], [320, 400, 0.95]), function (u, d, t) {
  var g = ""; for (var i = 0; i < 15; i++) for (var j = 0; j < 8; j++) g += '<rect x="' + (-80 + j * 20) + '" y="' + (-150 + i * 20) + '" width="20" height="20" fill="none" stroke="' + ORANGE + '" stroke-width="1" opacity="' + f(0.25 + 0.25 * Math.sin(t * 6 + i + j)) + '"/>';
  return paper() + treeS(120, 600, 1.1) + sunS(110, 160, 36, t) + phoneS(400, 400, 1.2, photoMini(160, 300, t) + g) + flash(400, 200, t, 1.3) +
    eyeS(140, 300, t, 0.6, 0.3 + 0.3 * Math.abs(Math.sin(t * 3))) + label(400, 300, 520, 140, "ملايين pixels", ORANGE, ease((u - 1.5) / 0.8));
});

// ── كارت الملخص: العدسة ← الحساس ← الفلاتر ← المعالج
outro(function (u, t) {
  var s = '<rect width="580" height="300" fill="' + PAPER + '"/><rect width="580" height="300" fill="url(#grid)"/>';
  s += lensS(70, 150, 70, 26) + gridS(170, 100, 5, 4, 20, function () { return "#6b8299"; }, 0.6) + gridS(290, 100, 5, 4, 20, bayer, 0.6) + chipS(470, 150, 0.6, t, "CPU");
  s += arrows(t, 100, 150, 160, 150, 2, YEL, 20) + arrow(260, 150, 285, 150, INK, 3, 1) + arrow(375, 150, 405, 150, INK, 3, 1);
  return s + callout("1", 70, 250, u / 0.4) + callout("2", 210, 250, (u - 0.2) / 0.4) + callout("3", 330, 250, (u - 0.4) / 0.4) + callout("4", 470, 250, (u - 0.6) / 0.4);
});
