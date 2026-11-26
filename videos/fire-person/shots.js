// «تعمل إيه لو حد ولّع قدامك؟» بستايل السكتش، اللوحة 640×800
// زيزو (الشخصية الثابتة) بيشرح، وفكري هو اللي النار مسكت فيه.
// السطر 0 = كارت البداية، والسطر 20 = كارت الملخص، والمشاهد من 1 لـ19.
var FIRE1 = "#f2c26a", FIRE2 = "#e8792f", RED = "#b8432c", BURN = "#d9755a", GY = 690;

// وقت كلمة رقم w في السطر line (بالثواني من أول السطر)، عشان الرسم يتزامن مع الكلام
function wk(line, w) { var l = LN[line]; return l && l.w && l.w[w] != null ? l.w[w] - l.start : 0; }
function kw(line, w, u, dur) { return ease((u - wk(line, w)) / (dur || 0.5)); }

// ── النار ───────────────────────────────────────────────
function flame(x, y, h, t, sd) {
  sd = sd || 0; if (h <= 2) return "";
  var w = h * 0.42, hh = h * (1 + Math.sin(t * 9 + sd * 3) * 0.12 + Math.sin(t * 13 + sd) * 0.06), sw = Math.sin(t * 6 + sd * 2) * w * 0.35;
  var d = "M" + f(x - w) + " " + f(y) + " C" + f(x - w * 1.1) + " " + f(y - hh * 0.45) + " " + f(x - w * 0.2 + sw * 0.5) + " " + f(y - hh * 0.55) + " " + f(x + sw) + " " + f(y - hh)
        + " C" + f(x + w * 0.3 + sw * 0.5) + " " + f(y - hh * 0.55) + " " + f(x + w * 1.1) + " " + f(y - hh * 0.45) + " " + f(x + w) + " " + f(y) + " Z";
  var hi = hh * 0.55, wi = w * 0.5, di = "M" + f(x - wi) + " " + f(y) + " C" + f(x - wi) + " " + f(y - hi * 0.5) + " " + f(x + sw * 0.6) + " " + f(y - hi * 0.7) + " " + f(x + sw * 0.6) + " " + f(y - hi)
        + " C" + f(x + wi * 0.6) + " " + f(y - hi * 0.5) + " " + f(x + wi) + " " + f(y - hi * 0.3) + " " + f(x + wi) + " " + f(y) + " Z";
  return shape(d, FIRE2, false, 1.8) + '<path d="' + di + '" fill="' + FIRE1 + '"/>';
}
// نار على جسم شخص واقف (نفس إحداثيات guide: الرجلين عند 0,0). k = قوة النار من 0 لـ1
function bodyFire(t, k) {
  if (k <= 0.02) return "";
  var P = [[-30, -112, 80], [2, -124, 100], [30, -110, 84], [-38, -160, 66], [36, -168, 72], [-6, -176, 60], [-22, -80, 56], [24, -84, 60]], s = '<circle cx="0" cy="-150" r="' + f(130 * k) + '" fill="url(#glowO)" opacity=".7"/>';
  for (var i = 0; i < P.length; i++) s += flame(P[i][0], P[i][1] + 30, P[i][2] * k, t, i);
  return s;
}
// فكري والنار ماسكة فيه. lie من 0 (واقف) لـ1 (نايم على الأرض وراسه ناحية الشمال)، roll = حركة التقليب
function fikri(x, y, s, t, o) {
  o = o || {}; var lie = o.lie || 0, roll = o.roll || 0;
  var tr = 'translate(' + f(x + Math.sin(t * 4.5) * 46 * roll) + ' ' + f(y - 48 * lie * s) + ') rotate(' + f(-90 * lie + Math.sin(t * 9) * 7 * roll) + ') scale(' + s + ')';
  return '<g transform="' + tr + '">' + guide(0, 0, 1, t, { who: "fikri", pose: o.pose || "alarm", mood: o.mood }) + bodyFire(t, o.fire == null ? 1 : o.fire) + '</g>';
}
function smoke(x, y, t, n, k) {
  var s = ""; n = n || 6; k = k == null ? 1 : k;
  for (var i = 0; i < n; i++) { var p = (t * 0.45 + i / n) % 1; s += '<circle cx="' + f(x + Math.sin(p * 6 + i) * 24 + (hash(i) - 0.5) * 60) + '" cy="' + f(y - p * 260) + '" r="' + f(14 + p * 30) + '" fill="' + GREY + '" opacity="' + f((1 - p) * 0.35 * k) + '"/>'; }
  return s;
}
// ── الشارع والأرض ───────────────────────────────────────
function ground(gy) { return '<rect x="-600" y="' + gy + '" width="1840" height="900" fill="#d8ccb0"/><rect x="-600" y="' + gy + '" width="1840" height="900" fill="url(#hatch)"/><path d="M-600 ' + gy + ' H1240" stroke="' + INK + '" stroke-width="2"/>'; }
function street(t) {
  var s = paper();
  var B = [[-120, 300, 150], [40, 220, 120], [170, 330, 140], [320, 250, 130], [460, 300, 150], [620, 240, 140]];
  for (var i = 0; i < B.length; i++) {
    var b = B[i], top = GY - b[1];
    s += R(b[0], top, b[2], b[1], PUTTY, 1.6) + '<rect x="' + b[0] + '" y="' + top + '" width="' + b[2] + '" height="' + b[1] + '" fill="url(#hatch)"/>';
    for (var r = top + 24; r < GY - 40; r += 48) for (var c = b[0] + 18; c < b[0] + b[2] - 30; c += 40) s += R(c, r, 20, 26, ((r + c + Math.floor(t)) % 7) ? BONE : "#f6e3a8", 1.2);
  }
  return s + ground(GY);
}
// ── أدوات صغيرة ─────────────────────────────────────────
function bubble(x, y, r, inner, k) { k = pop(k); if (k <= 0) return ""; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')">' + circle(0, 0, r, BONE, false, 2.4) + inner + '</g>'; }
function bucket() { return shape("M-30 -18 L30 -18 L22 32 L-22 32 Z", PUTTY, true) + '<path d="M-30 -18 Q0 -60 30 -18" stroke="' + INK + '" stroke-width="2.4" fill="none"/>' + '<ellipse cx="0" cy="-18" rx="30" ry="7" fill="' + BLUE + '" stroke="' + INK + '" stroke-width="2"/>'; }
function pullHand(t) { return R(-6, -16, 38, 30, SKIN, 2, 12) + arrow(-4, 0, -46 - Math.sin(t * 6) * 6, 0, ORANGE, 5, 1); }
function frozen(t) { return figure(0, 40, 0.42, t, PUTTY) + '<rect x="-30" y="-36" width="60" height="78" rx="6" fill="#bcd7e8" opacity=".55" stroke="' + BLUE + '" stroke-width="2"/><path d="M-18 -26 L-6 -30" stroke="#fff" stroke-width="3"/>'; }
function stopwatch(x, y, r, t, sp) {
  var a = t * (sp || 4), s = R(x - 8, y - r - 22, 16, 16, PUTTY, 2) + circle(x, y, r, BONE, false, 3);
  for (var i = 0; i < 12; i++) { var b = i / 12 * 6.283; s += '<path d="M' + f(x + Math.cos(b) * r * 0.8) + ' ' + f(y + Math.sin(b) * r * 0.8) + ' L' + f(x + Math.cos(b) * r * 0.92) + ' ' + f(y + Math.sin(b) * r * 0.92) + '" stroke="' + INK + '" stroke-width="2"/>'; }
  return s + '<path d="M' + x + ' ' + y + ' L' + f(x + Math.sin(a) * r * 0.75) + ' ' + f(y - Math.cos(a) * r * 0.75) + '" stroke="' + ORANGE + '" stroke-width="4" stroke-linecap="round"/>' + circle(x, y, 5, INK);
}
function forearm(x, y, w, burn) {   // دراع نايم بالعرض، وعليه حرق
  return shape("M" + x + " " + (y - 34) + " H" + (x + w) + " Q" + (x + w + 40) + " " + y + " " + (x + w) + " " + (y + 34) + " H" + x + " Z", SKIN) + (burn ? '<ellipse cx="' + f(x + w * 0.55) + '" cy="' + y + '" rx="60" ry="22" fill="' + BURN + '" opacity=".85"/><ellipse cx="' + f(x + w * 0.55) + '" cy="' + y + '" rx="36" ry="12" fill="' + RED + '" opacity=".5"/>' : "")
    + R(x + w + 10, y - 26, 8, 12, BONE, 1.2, 3) + R(x + w + 14, y - 8, 8, 12, BONE, 1.2, 3);
}
function blanket(x1, y1, x2, y2, t, col) {   // بطانية بحافة متموجة
  var d = "M" + f(x1) + " " + f(y1) + " L" + f(x2) + " " + f(y1);
  for (var yy = y1; yy <= y2; yy += 20) d += " L" + f(x2 + Math.sin(t * 5 + yy * 0.05) * 6) + " " + f(yy);
  d += " L" + f(x1) + " " + f(y2) + " Z";
  return shape(d, col || OLIVE, true) + '<path d="M' + f(x1 + 12) + ' ' + f(y1 + 12) + ' H' + f(x2 - 12) + '" stroke="' + BONE + '" stroke-width="2" stroke-dasharray="6 6"/>';
}
function check(x, y, k) { k = pop(k); if (k <= 0) return ""; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')"><circle r="22" fill="' + OLIVE + '" stroke="' + INK + '" stroke-width="2"/><path d="M-10 0 L-3 8 L11 -8" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g>'; }
function bigWord(text, x, y, sz, col, k, t) { k = pop(k); if (k <= 0) return ""; var sh = Math.sin(t * 40) * 2 * (k > 0.99 ? 1 : 0); return '<g transform="translate(' + f(x + sh) + ' ' + f(y) + ') scale(' + f(k) + ')">' + T(text, 3, 4, sz, INK, 900) + T(text, 0, 0, sz, col || ORANGE, 900) + '</g>'; }

// ── كارت البداية: فكري النار ماسكة فيه وزيزو مخضوض
intro(function (t) {
  return '<rect width="580" height="320" fill="' + PAPER + '"/><rect width="580" height="320" fill="url(#grid)"/><rect x="0" y="292" width="580" height="40" fill="#d8ccb0"/><path d="M0 292 H580" stroke="' + INK + '" stroke-width="2"/>'
    + smoke(200, 120, t, 5, 0.8) + fikri(200, 296, 0.66, t, {}) + guide(420, 296, 0.66, t, { pose: "alarm", dir: -1 });
});

// 1 — تجري تجيب ميه؟ تشده؟ ولا تتجمد؟
shot(1, camPush(320, 420, 1, 1.06), function (u, d, t) {
  var b = function (i) { return Math.sin(t * 2 + i) * 6; };
  return paper() + ground(GY) + guide(320, GY, 0.95, t, { pose: "think" })
    + bubble(165, 230 + b(0), 60, bucket(), (u - wk(1, 1)) / 0.4) + numBox("ميه؟", 165, 330 + b(0), (u - wk(1, 1) - 0.2) / 0.4)
    + bubble(320, 150 + b(1), 60, pullHand(t), (u - wk(1, 3)) / 0.4) + numBox("تشده؟", 320, 262 + b(1), (u - wk(1, 3) - 0.2) / 0.4)
    + bubble(475, 230 + b(2), 60, frozen(t), (u - wk(1, 7)) / 0.4) + numBox("تتجمد؟", 475, 330 + b(2), (u - wk(1, 7) - 0.2) / 0.4);
});
// 2 — وهو نفسه يعمل إيه في الثواني دي؟
shot(2, camPush(300, 430, 1.02, 1.12), function (u, d, t) {
  return street(t) + smoke(250, 360, t, 6) + fikri(250, GY, 0.95, t, {}) + stopwatch(500, 250, 62, t, 6)
    + label(500, 316, 470, 400, "الثواني", ORANGE, kw(2, 5, u, 0.7), 26);
});
// 3 — أول غلطة: إنه بيجري
shot(3, camPan(240, 400, 430, 1.0), function (u, d, t) {
  var x = 120 + u * 85, by = -Math.abs(Math.sin(t * 9)) * 14, s = street(t);
  for (var i = 0; i < 4; i++) s += '<path d="M' + f(x - 90 - i * 18) + ' ' + f(GY - 240 + i * 50) + ' H' + f(x - 160 - i * 18) + '" stroke="' + INK + '" stroke-width="3" stroke-linecap="round" opacity=".5"/>';
  return s + smoke(x - 60, GY - 260, t, 6) + fikri(x, GY + by, 0.92, t, { fire: 1.15 }) + numBox("غلطة!", 470, 170, (u - wk(3, 1)) / 0.4, 30) + crossMark(470, 330, 1.6, (u - wk(3, 7)) / 0.4);
});
// 4 — الجري بيدخّل هوا، والأكسجين أكل النار
shot(4, camPush(320, 440, 1, 1.1), function (u, d, t) {
  var g = 1 + 0.7 * ease((u - wk(4, 9)) / 1.4);
  return paper() + ground(600) + '<circle cx="320" cy="470" r="' + f(150 * g) + '" fill="url(#glowO)" opacity=".7"/>'
    + flame(320, 600, 190 * g, t, 1) + flame(250, 600, 120 * g, t, 2) + flame(390, 600, 130 * g, t, 3)
    + arrows(t, 20, 380, 220, 520, 6, BLUE, 120) + arrows(t, 620, 380, 420, 520, 6, BLUE, 120)
    + label(130, 440, 170, 300, "هوا", BLUE, kw(4, 2, u, 0.7), 28) + numBox("O₂ = أكسجين", 320, 160, (u - wk(4, 6)) / 0.4, 28) + bigWord("أسرع!", 500, 700, 48, ORANGE, (u - wk(4, 11)) / 0.35, t);
});
// 5 — النار بتطلع لفوق ناحية الوش والنَفَس
shot(5, camMove([320, 470, 1.0], [320, 380, 1.12]), function (u, d, t) {
  var fy = GY - 256 * 0.95;
  return paper() + ground(GY) + smoke(320, 300, t, 6) + fikri(320, GY, 0.95, t, {})
    + arrow(490, 640, 490, 300, ORANGE, 6, kw(5, 1, u, 0.8)) + T("لفوق", 490, 270, 30, ORANGE, 900)
    + ring(320, fy, 66, t, kw(5, 9, u, 0.7)) + label(340, fy - 20, 250, 200, "وشه ونَفَسه", OLIVE, kw(5, 10, u, 0.8), 26);
});
// 6 — اقف!
shot(6, camPush(320, 440, 1.04, 1.1), function (u, d, t) {
  var k = (u - wk(6, 6)) / 0.35, s = street(t) + guide(160, GY, 0.95, t, { pose: "stop", talk: true }) + smoke(470, 360, t, 5) + fikri(470, GY, 0.88, t, { pose: "idle", mood: "worried" });
  if (k > 0) for (var i = 0; i < 6; i++) { var a = -2.6 + i * 0.4, r = 120 + ((t * 2 + i / 6) % 1) * 30; s += '<path d="M' + f(330 + Math.cos(a) * r) + ' ' + f(210 + Math.sin(a) * r * 0.6) + ' L' + f(330 + Math.cos(a) * (r + 30)) + ' ' + f(210 + Math.sin(a) * (r + 30) * 0.6) + '" stroke="' + ORANGE + '" stroke-width="5" stroke-linecap="round"/>'; }
  return s + bigWord("اقف!", 330, 240, 120, ORANGE, k, t);
});
// 7 — انزل على الأرض وغطي وشك
shot(7, camPush(330, 520, 1.0, 1.08), function (u, d, t) {
  var lie = ease((u - wk(7, 1)) / 0.7);
  return paper() + ground(GY) + smoke(330, 520, t, 5) + fikri(440, GY, 0.95, t, { lie: lie }) + arrow(180, 250, 180, 420, ORANGE, 6, kw(7, 1, u, 0.5)) + T("انزل", 180, 220, 34, ORANGE, 900)
    + label(440 - 256 * 0.95 + 10, GY - 50, 330, 470, "غطي وشك", OLIVE, kw(7, 5, u, 0.7), 26) + guide(530, GY, 0.55, t, { pose: "point", dir: -1 });
});
// 8 — اتقلب يمين وشمال
shot(8, camPush(320, 560, 1.05, 1.12), function (u, d, t) {
  var side = Math.sin(t * 4.5);
  return paper() + ground(GY) + smoke(320, 540, t, 6, 1 - 0.5 * ease(u / d)) + fikri(440, GY, 0.95, t, { lie: 1, roll: 1, fire: 1 - 0.5 * ease(u / d) })
    + '<g opacity="' + f(0.4 + 0.6 * Math.max(0, side)) + '">' + arrow(380, 420, 540, 420, BLUE, 6, 1) + '</g><g opacity="' + f(0.4 + 0.6 * Math.max(0, -side)) + '">' + arrow(260, 420, 100, 420, BLUE, 6, 1) + '</g>'
    + bigWord("اتقلب", 320, 300, 64, ORANGE, (u - wk(8, 1)) / 0.35, t);
});
// 9 — التقليب بيخنق النار ويقطع عنها الهوا
shot(9, camPush(320, 520, 1.0, 1.1), function (u, d, t) {
  var k = 1 - 0.85 * ease(u / d), s = paper() + ground(GY);
  for (var i = 0; i < 4; i++) s += arrow(140 + i * 120, 220, 160 + i * 110, 380, BLUE, 4, ease((u - 0.2 - i * 0.1) / 0.6));
  return s + smoke(380, 520, t, 8, 1.2) + fikri(440, GY, 0.95, t, { lie: 1, roll: 0.5, fire: k }) + crossMark(320, 300, 1.5, (u - wk(9, 7)) / 0.4)
    + label(330, GY - 40, 400, 200, "بيخنق النار", ORANGE, kw(9, 2, u, 0.8), 26);
});
// 10 — بطانية أو جاكيت تقيل من القطن أو الصوف
shot(10, camPush(320, 430, 1.0, 1.06), function (u, d, t) {
  var x = 320, y = GY, s = 0.95, hy = y - (258 + 46) * s;
  return paper() + ground(GY) + blanket(x - 120, hy - 10, x + 120, hy + 190, t, OLIVE) + guide(x, y, s, t, { pose: "hold" })
    + label(x - 100, hy + 60, 210, 140, "بطانية", OLIVE, kw(10, 2, u, 0.7), 26)
    + check(160, 560, (u - wk(10, 7)) / 0.4) + T("قطن", 160, 615, 26, OLIVE, 900) + check(480, 560, (u - wk(10, 9)) / 0.4) + T("صوف", 480, 615, 26, OLIVE, 900);
});
// 11 — من الكتاف ونازل ناحية الرجلين
shot(11, camPush(320, 540, 1.04, 1.1), function (u, d, t) {
  var p = ease((u - wk(11, 1)) / (d * 0.7)), x0 = 440 - 256 * 0.95 + 40, x1 = x0 + 40 + p * 250;
  return paper() + ground(GY) + smoke(400 + p * 60, 520, t, 5, 1 - p * 0.6) + fikri(440, GY, 0.95, t, { lie: 1, fire: 1 - 0.8 * p })
    + blanket(x0, GY - 120, x1, GY + 6, t, OLIVE) + arrow(x0, 470, 520, 470, ORANGE, 6, kw(11, 3, u, 1.2))
    + label(x0 + 10, GY - 100, 240, 330, "الكتاف", OLIVE, kw(11, 3, u, 0.7), 26) + label(500, GY - 50, 470, 330, "الرجلين", OLIVE, kw(11, 6, u, 0.7), 26);
});
// 12 — ما تستخدمش البوليستر: بيسيح ويلزق
shot(12, camPush(320, 420, 1.0, 1.1), function (u, d, t) {
  var m = ease((u - 0.4) / (d * 0.8)), s = paper() + ground(640) + '<circle cx="320" cy="560" r="120" fill="url(#glowO)" opacity=".6"/>' + flame(320, 640, 150, t, 1) + flame(250, 640, 90, t, 2) + flame(390, 640, 100, t, 3);
  var dd = "M180 260 H460 V420";
  for (var i = 0; i < 7; i++) { var x = 460 - i * 40, L = 10 + (40 + 50 * hash(i)) * m * (0.7 + 0.3 * Math.sin(t * 2 + i)); dd += " Q" + f(x - 10) + " " + f(420 + L) + " " + f(x - 20) + " 420 Q" + f(x - 30) + " 420 " + f(x - 40) + " 420"; }
  s += shape(dd + " L180 420 Z", "#9b8fc4", true);
  return s + numBox("بوليستر", 320, 230, (u - wk(12, 4)) / 0.4, 26) + crossMark(320, 340, 1.8, (u - wk(12, 4) - 0.3) / 0.4) + label(430, 440, 380, 560, "بيسيح", ORANGE, kw(12, 8, u, 0.7), 26);
});
// 13 — كلم الإسعاف على 123
shot(13, camPush(340, 420, 1.0, 1.08), function (u, d, t) {
  var s = paper() + ground(GY) + guide(185, GY, 0.85, t, { pose: "point", talk: true });
  for (var i = 0; i < 3; i++) { var p = (t * 0.9 + i / 3) % 1; s += '<circle cx="440" cy="330" r="' + f(150 + p * 90) + '" fill="none" stroke="' + ORANGE + '" stroke-width="3" opacity="' + f(1 - p) + '"/>'; }
  return s + R(365, 190, 150, 280, INK, 2, 22) + R(377, 214, 126, 222, BONE, 1.5, 6) + T("الإسعاف", 440, 260, 22, GREY, 800)
    + '<g transform="translate(440 350) scale(' + f(pop((u - wk(13, 7)) / 0.4)) + ')">' + T("123", 0, 0, 58, RED, 900) + '</g>' + circle(440, 405, 16, OLIVE) + circle(440, 450, 6, PUTTY, false, 1.2);
});
// 14 — ميه جارية عادية 20 دقيقة
shot(14, camPush(300, 400, 1.0, 1.08), function (u, d, t) {
  var s = paper() + R(120, 120, 180, 30, PUTTY, 2, 6) + R(270, 120, 30, 80, PUTTY, 2, 6) + R(255, 110, 60, 16, GREY, 2, 4) + '<rect x="268" y="200" width="34" height="230" fill="#9fc3dc" opacity=".75"/>';
  for (var i = 0; i < 6; i++) { var p = (t * 2 + i / 6) % 1; s += '<path d="M' + f(276 + (i % 3) * 8) + ' ' + f(210 + p * 210) + ' v18" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'; }
  s += forearm(100, 460, 360, true);
  for (var j = 0; j < 6; j++) { var q = (t * 1.6 + j / 6) % 1, a = j % 2 ? 1 : -1; s += circle(285 + a * (20 + q * 90), 430 - Math.sin(q * 3.14) * 60, 5, "#9fc3dc", false, 1); }
  return s + stopwatch(460, 640, 56, t, 3) + numBox("20 دقيقة", 290, 640, (u - wk(14, 7)) / 0.4, 28) + label(300, 470, 230, 580, "ميه عادية", BLUE, kw(14, 5, u, 0.7), 24);
});
// 15 — لا تلج ولا زبدة ولا معجون سنان
shot(15, camPush(320, 420, 1.0, 1.06), function (u, d, t) {
  var b = function (i) { return Math.sin(t * 2 + i) * 6; }, s = paper() + ground(GY) + guide(320, GY, 0.72, t, { pose: "stop" });
  var ice = R(-40, -40, 80, 80, "#cfe4f0", 2, 8) + '<path d="M-26 -26 L-8 -30 M-28 -10 L-24 -24" stroke="#fff" stroke-width="4"/>';
  var butter = '<ellipse cx="0" cy="28" rx="56" ry="14" fill="' + BONE + '" stroke="' + INK + '" stroke-width="2"/>' + shape("M-36 -10 L28 -22 L40 18 L-28 28 Z", "#f3d77a", true);
  var paste = '<g transform="rotate(-20)">' + shape("M-56 -18 H34 L46 -8 V8 L34 18 H-56 Z", BONE, false) + R(46, -9, 18, 18, BLUE, 2, 3) + R(-40, -12, 50, 24, BLUE, 0, 3) + '</g>';
  var items = [[155, ice, 2], [320, butter, 4], [485, paste, 6]];
  for (var i = 0; i < 3; i++) {
    var k = (u - wk(15, items[i][2])) / 0.4, y = 260 + b(i);
    s += bubble(items[i][0], y, 70, items[i][1], k) + crossMark(items[i][0], y, 1.3, k - 0.9);
  }
  return s;
});
// 16 — ما تشدّش الهدوم اللازقة، سيبها للدكتور
shot(16, camPush(320, 400, 1.0, 1.08), function (u, d, t) {
  var hx = 420 - Math.sin(t * 3) * 10 - 30 * ease((u - wk(16, 1)) / 0.5);
  return paper() + forearm(90, 330, 330, true) + shape("M180 300 L230 292 L270 306 L300 296 L320 312 L306 340 L320 364 L280 372 L240 362 L196 370 L178 350 L188 330 Z", BLUE, true)
    + R(hx, 280, 80, 56, SKIN, 2, 20) + arrow(hx + 90, 308, hx + 170, 308, ORANGE, 5, 1) + crossMark(360, 310, 1.4, (u - wk(16, 1) - 0.3) / 0.4)
    + label(250, 330, 260, 200, "لازقة", ORANGE, kw(16, 5, u, 0.6), 26)
    + '<g transform="translate(320 590) scale(' + f(pop((u - wk(16, 8)) / 0.4)) + ')">' + circle(0, 0, 74, BONE, false, 3) + R(-16, -48, 32, 96, RED, 0, 4) + R(-48, -16, 96, 32, RED, 0, 4) + '</g>' + label(380, 600, 470, 700, "الدكتور", OLIVE, kw(16, 8, u, 0.7), 26);
});
// 17 — اقلع الخواتم والساعة: مكان الحرق بيورم
shot(17, camPush(320, 420, 1.0, 1.06), function (u, d, t) {
  var sw = 1 + 0.07 * ease((u - wk(17, 8)) / 0.8) + 0.015 * Math.sin(t * 5), rk = ease((u - wk(17, 2)) / 0.8), wkk = ease((u - wk(17, 4)) / 0.8), s = paper();
  s += '<g transform="translate(320 470) scale(' + f(sw) + ')">' + R(-60, 120, 120, 200, SKIN, 2, 20);
  for (var i = 0; i < 4; i++) s += R(-80 + i * 42, -180 + Math.abs(i - 1.5) * 18, 36, 140, SKIN, 2, 18);
  s += R(-130, -40, 60, 120, SKIN, 2, 26) + R(-90, -80, 180, 220, SKIN, 2, 40) + '<ellipse cx="10" cy="20" rx="44" ry="30" fill="' + BURN + '" opacity=".8"/></g>';
  s += '<g transform="translate(0 ' + f(-260 * rk) + ') rotate(' + f(rk * 140) + ' 278 370)" opacity="' + f(1 - rk * 0.6) + '"><ellipse cx="278" cy="370" rx="24" ry="9" fill="none" stroke="#e0a83c" stroke-width="7"/><ellipse cx="278" cy="370" rx="24" ry="9" fill="none" stroke="' + INK + '" stroke-width="1.4"/></g>';
  s += '<g transform="translate(' + f(260 * wkk) + ' ' + f(160 * wkk) + ')">' + R(250, 600, 140, 34, INK, 2, 8) + circle(320, 617, 30, BONE, false, 3) + '<path d="M320 617 L320 597 M320 617 L334 624" stroke="' + INK + '" stroke-width="3"/></g>';
  return s + label(278, 370, 470, 200, "الخواتم", OLIVE, kw(17, 2, u, 0.6), 26) + bigWord("بيورم!", 180, 700, 44, ORANGE, (u - wk(17, 8)) / 0.35, t);
});
// 18 — غطّيه بالسلوفان من غير ما تلفه جامد
shot(18, camPush(320, 420, 1.0, 1.06), function (u, d, t) {
  var p = ease((u - wk(18, 1)) / 1.4), w = 40 + 380 * p, sh = 110 + ((t * 120) % 400);
  return paper() + forearm(100, 400, 340, true) + '<rect x="110" y="330" width="' + f(w) + '" height="140" rx="10" fill="#dfeef5" opacity=".55" stroke="' + BLUE + '" stroke-width="2" stroke-dasharray="8 5"/>'
    + (sh < 110 + w ? '<path d="M' + f(sh) + ' 336 l-30 128" stroke="#fff" stroke-width="6" opacity=".8"/>' : "")
    + label(260, 345, 220, 210, "سلوفان", BLUE, kw(18, 2, u, 0.6), 28) + check(470, 560, (u - wk(18, 9)) / 0.4) + T("خفيف من غير لف جامد", 320, 640, 28, OLIVE, 900) + guide(160, 780, 0.42, t, { pose: "ok" });
});
// 19 — تلات كلمات: اقف، انزل، اتقلب
shot(19, camPush(320, 400, 1.0, 1.04), function (u, d, t) {
  var s = paper(), W = [["اقف", 10, 0], ["انزل", 11, 0.85], ["اتقلب", 12, 1]], zk = 1 - ease((u - wk(19, 9)) / 0.4);
  if (zk > 0) s += '<g opacity="' + f(zk) + '">' + ground(GY) + guide(320, GY, 0.95, t, { pose: "think" }) + '</g>';
  for (var i = 0; i < 3; i++) {
    var k = pop((u - wk(19, W[i][1])) / 0.4); if (k <= 0) continue;
    var y = 170 + i * 220;
    s += '<g transform="translate(320 ' + y + ') scale(' + f(k) + ') translate(-320 ' + (-y) + ')">' + R(95, y - 95, 450, 190, BONE, 2.4, 14) + callout(String(i + 1), 130, y - 60, 1)
      + '<g clip-path="none">' + (i === 0 ? fikri(450, y + 82, 0.5, t, { pose: "idle", mood: "worried", fire: 0.6 }) : fikri(505, y + 60, 0.45, t, { lie: 1, roll: i === 2 ? 1 : 0, fire: 0.5 })) + '</g>'
      + T(W[i][0], 250, y + 22, 66, ORANGE, 900) + '</g>';
  }
  return s;
});
// كارت الملخص: فكري بقى كويس وزيزو مبسوط
outro(function (u, t) {
  return '<rect width="580" height="300" fill="' + PAPER + '"/><rect width="580" height="300" fill="url(#grid)"/><rect x="0" y="270" width="580" height="40" fill="#d8ccb0"/><path d="M0 270 H580" stroke="' + INK + '" stroke-width="2"/>'
    + guide(210, 272, 0.6, t, { who: "fikri", pose: "ok" }) + guide(380, 272, 0.6, t, { pose: "wave", dir: -1 }) + callout("1", 60, 60, u / 0.4) + callout("2", 110, 60, (u - 0.2) / 0.4) + callout("3", 160, 60, (u - 0.4) / 0.4);
});
