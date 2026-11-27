// «إزاي الجنين بيتكوّن جوه رحم الأم؟» بستايل السكتش، اللوحة 640×800
// كل سطر ليه مشهد (من 0 لـ23)، والترجمة فوق اللوحة، والانتقال بين المشاهد crossfade.
var ROSE = "#e8b4a8", WOMB = "#efcfc2", FLESH = "#e9b9a0", RED2 = "#b8432c", YEL = "#f2c26a", CYTO = "#f6dcbc";

function bez(p, k) { var m = 1 - k; return [m * m * m * p[0] + 3 * m * m * k * p[2] + 3 * m * k * k * p[4] + k * k * k * p[6], m * m * m * p[1] + 3 * m * m * k * p[3] + 3 * m * k * k * p[5] + k * k * k * p[7]]; }
function g(x, y, s, inner, rot) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ')' + (rot ? ' rotate(' + f(rot) + ')' : '') + ' scale(' + (+s).toFixed(3) + ')">' + inner + '</g>'; }
function op(k, inner) { k = clamp(k); return k <= 0 ? "" : '<g opacity="' + k.toFixed(3) + '">' + inner + '</g>'; }

// ── البويضة: تاج من خلايا صغيرة + غلاف + سيتوبلازم + نواة
function egg(x, y, r, t, shell) {
  var s = "";
  for (var i = 0; i < 26; i++) { var a = i / 26 * 6.283 + t * 0.15, rr = r * 1.25 + Math.sin(t * 2 + i) * 3; s += circle(Math.cos(a) * rr, Math.sin(a) * rr, r * 0.11, YEL, false, 1.2); }
  s += circle(0, 0, r * 1.07, shell || "#fbf3dc", false, shell ? 4 : 2) + circle(0, 0, r * 0.92, CYTO, true, 1.5);
  s += circle(r * 0.18, -r * 0.12, r * 0.27, SKIN, false, 1.5) + circle(r * 0.18, -r * 0.12, r * 0.09, INK, false, 1);
  return g(x, y, 1, s);
}
// ── حيوان منوي: راس بيضاوي وديل بيتموّج
function sperm(x, y, a, t, s, col) {
  var d = "M0 0"; for (var k = 1; k <= 12; k++) d += " L" + f(-k * 6) + " " + f(Math.sin(k * 0.9 - t * 14) * k * 0.55);
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(a * 57.3) + ') scale(' + (s || 1) + ')"><path d="' + d + '" stroke="' + INK + '" stroke-width="1.8" fill="none" stroke-linecap="round"/><ellipse cx="6" cy="0" rx="10" ry="6.5" fill="' + (col || BONE) + '" stroke="' + INK + '" stroke-width="1.6"/></g>';
}
// ── الرحم والقنوات والمبايض (حوالين 320,430)
var TUBE_L = [238, 330, 190, 290, 140, 280, 105, 315], TUBE_R = [402, 330, 450, 290, 500, 280, 535, 315];
function tubePath(p) { return "M" + p[0] + " " + p[1] + " C" + p[2] + " " + p[3] + " " + p[4] + " " + p[5] + " " + p[6] + " " + p[7]; }
function uterus(t, glow) {
  var body = "M232 330 C226 280 414 280 408 330 C404 420 372 470 348 520 L348 590 L292 590 L292 520 C268 470 236 420 232 330 Z";
  var cav = "M262 335 C262 312 378 312 378 335 C374 400 350 445 330 490 L310 490 C290 445 266 400 262 335 Z";
  var s = "";
  [TUBE_L, TUBE_R].forEach(function (p) { s += '<path d="' + tubePath(p) + '" stroke="' + INK + '" stroke-width="22" fill="none" stroke-linecap="round"/><path d="' + tubePath(p) + '" stroke="' + ROSE + '" stroke-width="17" fill="none" stroke-linecap="round"/>'; });
  for (var i = 0; i < 5; i++) { var a = 1.9 + i * 0.35 + Math.sin(t * 2 + i) * 0.08; s += '<path d="M105 315 l' + f(Math.cos(a) * 26) + ' ' + f(Math.sin(a) * 26) + '" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/><path d="M640 0" />'; s += '<path d="M535 315 l' + f(-Math.cos(a) * 26) + ' ' + f(Math.sin(a) * 26) + '" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/>'; }
  s += '<ellipse cx="118" cy="380" rx="38" ry="26" fill="' + PUTTY + '" stroke="' + INK + '" stroke-width="2"/><ellipse cx="118" cy="380" rx="38" ry="26" fill="url(#hatch)"/>';
  s += '<ellipse cx="522" cy="380" rx="38" ry="26" fill="' + PUTTY + '" stroke="' + INK + '" stroke-width="2"/><ellipse cx="522" cy="380" rx="38" ry="26" fill="url(#hatch)"/>';
  s += shape(body, WOMB, true, 2.4) + '<path d="' + cav + '" fill="' + (glow ? "#f7e3d6" : "#f4dccf") + '" stroke="' + INK + '" stroke-width="1.5" stroke-dasharray="5 4"/>';
  return s;
}
// ── كورة خلايا (موريولا): n خلية متجمعة
function cluster(x, y, n, r, t, col) {
  var s = "", pos = n === 1 ? [[0, 0]] : n === 2 ? [[-0.5, 0], [0.5, 0]] : n === 4 ? [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]] : [[-0.55, -0.55], [0.15, -0.7], [0.7, -0.15], [0.55, 0.55], [-0.15, 0.7], [-0.7, 0.15], [0, 0], [0.1, -0.1]];
  var cr = n === 1 ? r : n === 2 ? r * 0.55 : n === 4 ? r * 0.5 : r * 0.42;
  s += circle(0, 0, r * 1.12, "#fbf3dc", false, 2);
  pos.forEach(function (p, i) { var w = Math.sin(t * 3 + i) * 1.5; s += circle(p[0] * r * 0.9 + w, p[1] * r * 0.9 - w, cr, col || CYTO, true, 1.6); });
  return g(x, y, 1, s);
}
// ── بلاستوسيست: حلقة خلايا + كتلة جوه (اللي هتبقى الجنين)
function blasto(x, y, r, t) {
  var s = circle(0, 0, r, "#fbf3dc", false, 2), n = 18;
  for (var i = 0; i < n; i++) { var a = i / n * 6.283 + t * 0.1; s += circle(Math.cos(a) * r * 0.86, Math.sin(a) * r * 0.86, r * 0.16, CYTO, false, 1.3); }
  for (var j = 0; j < 7; j++) { var b = j / 7 * 6.283; s += circle(r * 0.35 * Math.cos(b) * 0.6, -r * 0.42 + r * 0.25 * Math.sin(b) * 0.6, r * 0.17, ROSE, true, 1.3); }
  return g(x, y, 1 + Math.sin(t * 2.2) * 0.015, s);
}
// ── الجنين: stage 0 = شكل C صغير (أسبوع 5)، 1 = أسبوع 8، 2 = جنين كامل متكوّر
function fetus(x, y, s, t, stage, col) {
  col = col || FLESH; var b = Math.sin(t * 1.6) * 2, out = "";
  if (stage === 0) {
    out += shape("M0 -70 C60 -70 80 0 58 52 C40 92 0 104 -18 82 C6 74 28 40 22 0 C16 -34 -10 -40 -28 -28 C-34 -56 -18 -70 0 -70 Z", col, true, 2.2);
    for (var i = 0; i < 6; i++) out += circle(40 - i * 2, -30 + i * 18, 4, ROSE, false, 1);
    var hb = 1 + 0.25 * Math.max(0, Math.sin(t * 9));
    out += g(-2, 10, hb, circle(0, 0, 14, RED2, false, 1.6));
  } else {
    out += circle(-6, -58, stage === 1 ? 60 : 50, col, true, 2.2);
    out += shape("M-30 -16 C-66 34 -42 110 22 116 C76 120 86 62 64 12 C48 -22 6 -32 -30 -16 Z", col, true, 2.2);
    out += '<path d="M52 90 C30 120 -10 112 -28 92" stroke="' + INK + '" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M52 90 C30 120 -10 112 -28 92" stroke="' + col + '" stroke-width="16" fill="none" stroke-linecap="round"/>';
    out += '<path d="M-18 20 C-40 0 -44 -24 -36 -40" stroke="' + INK + '" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-18 20 C-40 0 -44 -24 -36 -40" stroke="' + col + '" stroke-width="12" fill="none" stroke-linecap="round"/>';
    for (var k = 0; k < 4; k++) out += '<path d="M-36 -40 l' + f(-6 + k * 4) + ' -12" stroke="' + INK + '" stroke-width="2.2" stroke-linecap="round"/>';
    out += '<path d="M-44 -62 q8 6 16 0" stroke="' + INK + '" stroke-width="2.2" fill="none"/>' + '<path d="M10 -64 q8 10 0 18" stroke="' + INK + '" stroke-width="2" fill="none"/>';
  }
  return g(x, y + b, s, out);
}
// ── قلب بينبض
function heartS(x, y, s, t, k) {
  var p = 1 + 0.12 * Math.max(0, Math.sin(t * 9)) * (k == null ? 1 : k);
  return g(x, y, s * p, '<circle r="60" fill="url(#glowO)" opacity=".5"/>' + shape("M0 30 C-50 0 -48 -40 -22 -42 C-8 -43 0 -30 0 -22 C0 -30 8 -43 22 -42 C48 -40 50 0 0 30 Z", RED2, true, 2.4));
}
// ── خط نبض (ECG) ماشي
function ecg(x, y, w, t, col) {
  var d = "", n = 80; for (var i = 0; i <= n; i++) { var px = x + w * i / n, ph = ((i / n * 3 - t * 0.9) % 1 + 1) % 1, v = ph > 0.45 && ph < 0.5 ? -40 : ph >= 0.5 && ph < 0.55 ? 22 : ph > 0.3 && ph < 0.38 ? -6 : 0; d += (i ? " L" : "M") + f(px) + " " + f(y + v); }
  return '<path d="' + d + '" stroke="' + (col || RED2) + '" stroke-width="3.2" fill="none" stroke-linejoin="round"/>';
}
// ── بصمة صباع: أقواس متداخلة بتترسم بـk، وseed بيغيّر شكلها
function fingerprint(x, y, s, k, seed) {
  var out = "", n = 11; seed = seed || 0;
  for (var i = 0; i < n; i++) {
    var rx = 12 + i * 9, ry = 16 + i * 11.5, sk = Math.sin(seed * 3 + i * 0.7) * (6 + i), kk = clamp(k * n - i * 0.8);
    if (kk <= 0) continue; var len = 2 * Math.PI * ry;
    out += '<path d="M' + f(-rx + sk * 0.3) + ' ' + f(ry * 0.5) + ' C' + f(-rx) + ' ' + f(-ry + sk) + ' ' + f(rx) + ' ' + f(-ry - sk) + ' ' + f(rx - sk * 0.3) + ' ' + f(ry * 0.5 + (seed ? sk * 0.4 : 0)) + '" stroke="' + INK + '" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="' + f(len * kk) + ' ' + f(len) + '"/>';
  }
  return g(x, y, s, out);
}
// ── ست حامل من الجنب (سيلويت مسطّح)
function mom(x, y, s, t, glow) {
  var body = "M-20 -250 C-40 -250 -48 -228 -42 -210 C-38 -196 -30 -190 -24 -186 L-30 -170 C-58 -160 -60 -120 -56 -80 C-54 -40 -40 -10 -36 20 C-34 60 -40 140 -36 230 L4 230 C6 170 10 120 14 80 C60 74 92 40 92 0 C92 -40 60 -70 26 -80 C24 -110 28 -150 10 -170 L4 -186 C14 -196 18 -214 14 -228 C8 -246 -4 -252 -20 -250 Z";
  var out = shape(body, PUTTY, true, 2.4);
  if (glow) out += '<circle cx="40" cy="0" r="' + f(70 + Math.sin(t * 3) * 6) + '" fill="url(#glowO)" opacity="' + f(0.55 * glow) + '"/>';
  return g(x, y + Math.sin(t * 1.4) * 2, s, out);
}
// ── ست حامل بخطوط كريمي على أسود (من الجنب، راسها لتحت، وإيديها شايلة البطن)
var CREAMLN = "#e2cfa8", LNCOL = CREAMLN;
function flow(d, k, w, n, spread, o) {   // خط رئيسي + خطوط موازية رفيعة زي ضربات الفرشاة، وk بيرسمه
  var s = ""; n = n || 4; spread = spread || 5;
  for (var i = 0; i < n; i++) { var off = (i - (n - 1) / 2) * spread; s += '<path d="' + d + '" transform="translate(' + f(off * 0.6) + ' ' + f(off * 0.3) + ')" pathLength="1" stroke-dasharray="' + f(clamp(k - i * 0.05)) + ' 1" stroke="' + LNCOL + '" stroke-width="' + f((w || 3) * (i === 0 ? 1 : 0.45)) + '" fill="none" stroke-linecap="round" opacity="' + f((o || 1) * (i === 0 ? 1 : 0.55)) + '"/>'; }
  return s;
}
function momLine(t, k, kb) {
  var b = Math.sin(t * 1.3) * 2, s = "";
  s += '<circle cx="440" cy="520" r="' + f(150 + Math.sin(t * 2.4) * 8) + '" fill="url(#glowW)" opacity="' + f(0.22 * kb) + '"/>';
  // الشعر والكعكة
  s += flow("M300 150 C300 90 380 70 410 120", k, 3.4, 5, 5) + flow("M300 150 C285 175 290 200 310 210", k, 3, 4, 4);
  s += flow("M262 176 C232 170 226 132 256 118 C286 104 306 130 300 152 C294 172 276 182 262 176 Z", k, 3, 5, 4) + flow("M250 140 C262 128 284 132 290 150", k, 2, 3, 3);
  // الوش من الجنب (باصة لتحت)
  s += flow("M406 118 C414 130 414 146 420 156 L430 170 C424 174 418 174 418 178 C422 184 418 188 414 190 C418 196 414 202 410 206 C404 216 388 222 368 222", k, 3, 3, 3);
  s += flow("M384 156 q10 6 20 0", k, 2.4, 2, 2);
  // الضهر لحد الرجل
  s += flow("M310 212 C300 250 280 300 272 360 C262 430 258 480 256 540 C252 600 236 650 250 720 C256 760 262 800 268 860", k, 4, 6, 6);
  // الرقبة والصدر والبطن والفخد
  s += flow("M340 228 C346 250 352 270 372 300 C400 330 418 360 404 384 C392 404 360 404 352 396", k, 3.6, 5, 5);
  s += flow("M360 404 C440 404 520 450 528 530 C536 610 480 650 420 650 C400 660 392 700 396 760 C398 800 402 840 404 860", kb > 0 ? Math.max(k, kb) : k, 4, 7, 6);
  // الدراع وإيدها تحت البطن
  s += flow("M318 262 C300 300 292 360 296 420 C300 470 330 520 380 560 C410 584 448 600 486 600 L512 590", k, 3.2, 5, 5);
  s += flow("M486 600 C500 604 516 600 522 592 M478 596 C496 590 510 582 516 576", k, 2.2, 2, 3);
  // الجنين جوه البطن
  if (kb > 0) s += '<g opacity="' + f(kb) + '">' + fetus(430, 520, 0.72, t, 2, "#1a1612").replace(/stroke="#2b2b2b"/g, 'stroke="' + CREAMLN + '"').replace(/fill="url\(#hatch\)"/g, 'fill="none"') + '</g>';
  return '<g transform="translate(0 ' + f(b) + ')">' + s + '</g>';
}
// ── بطن الأم من جوه: دايرة رحم والجنين جواها
function wombView(x, y, r, t, inner) {
  var id = "wv" + (++CLIPN);
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ')"><clipPath id="' + id + '"><circle r="' + r + '"/></clipPath><circle r="' + f(r + 14) + '" fill="' + WOMB + '" stroke="' + INK + '" stroke-width="2.4"/><circle r="' + f(r + 14) + '" fill="url(#hatch)"/><circle r="' + r + '" fill="#f6e6da" stroke="' + INK + '" stroke-width="1.6"/><g clip-path="url(#' + id + ')">' + inner + '</g></g>';
}
// ── الجدار (بطانة الرحم): طبقات وأوعية دموية
function wall(y, t) {
  var s = '<rect x="-600" y="' + y + '" width="1840" height="900" fill="' + ROSE + '"/><rect x="-600" y="' + y + '" width="1840" height="900" fill="url(#hatch)"/>';
  var d = "M-600 " + y; for (var x = -600; x <= 1240; x += 20) d += " L" + x + " " + f(y + Math.sin(x / 40 + t * 1.2) * 6);
  s += '<path d="' + d + '" stroke="' + INK + '" stroke-width="2.4" fill="none"/>';
  for (var i = 0; i < 7; i++) { var vx = 20 + i * 100; s += '<path d="M' + vx + ' ' + (y + 160) + ' C' + (vx + 30) + ' ' + (y + 110) + ' ' + (vx - 30) + ' ' + (y + 70) + ' ' + vx + ' ' + (y + 30) + '" stroke="' + RED2 + '" stroke-width="5" fill="none" stroke-linecap="round" opacity=".75"/>'; }
  return s;
}
// ── رئة بتتنفخ
function lung(x, y, s, t, side) {
  var k = 1 + 0.08 * Math.sin(t * 2.4);
  return g(x, y, s * k, shape("M0 -110 C" + (side * 30) + " -110 " + (side * 90) + " -60 " + (side * 90) + " 20 C" + (side * 90) + " 90 " + (side * 50) + " 110 " + (side * 10) + " 100 C" + (side * 4) + " 40 0 -40 0 -110 Z", "#e3a9a0", true, 2.4));
}
// ── توتة (للمقارنة بالحجم)
function berry(x, y, s, t) { var out = ""; for (var i = 0; i < 14; i++) { var a = i * 2.39996, rr = 8 + Math.sqrt(i) * 11; out += circle(Math.cos(a) * rr * 0.8, Math.sin(a) * rr, 13, "#b5485a", true, 1.6); } out += shape("M-14 -48 L0 -36 L14 -48 L8 -34 L-8 -34 Z", OLIVE, false, 1.6); return g(x, y + Math.sin(t * 2) * 2, s, out); }

// ── المشاهد ─────────────────────────────────────────────

// 0 — الأم الحامل، ونور بينبض في بطنها، والكاميرا بتقرّب
// المشهد 0 ليه 4 اختيارات (window.V0 = "A" | "B" | "C" | "D")
function v0A(u, d, t) {   // سكتش على الورق: الست بالحبر، والبطن مقطوعة وباين الجنين جوه الرحم
  var k = ease(u / 1.4), kb = ease((u - 0.8) / 0.8);
  LNCOL = INK;
  var belly = "M360 404 C440 404 520 450 528 530 C536 610 480 650 420 650 C380 650 352 600 352 530 C352 470 352 430 360 404 Z";
  var s = paper() + op(k, shape(belly, WOMB, true, 0)) + momLine(t, k, 0).replace(/<circle[^>]*glowW[^>]*\/>/, "");
  s += op(kb, wombView(440, 525, 82, t, fetus(0, 6, 0.55, t, 2)));
  LNCOL = CREAMLN;
  return s + label(470, 450, 560, 330, "الرحم", OLIVE, ease((u - 1.2) / 0.6)) + label(440, 540, 560, 720, "الجنين", ORANGE, ease((u - 1.6) / 0.6));
}
function v0B(u, d, t) {   // جوه الرحم على طول: الجنين متكوّر والحبل السري والمشيمة
  var cord = [210, 250, 300, 300, 230, 420, 330, 470], s = paper() + '<circle cx="320" cy="430" r="' + f(330 + Math.sin(t * 2) * 6) + '" fill="url(#glowO)" opacity=".35"/>';
  var inner = shape("M-200 -110 C-200 -200 -110 -240 -40 -235 C-90 -190 -150 -140 -200 -110 Z", "#b85a5a", true, 2.4);
  inner += '<path d="M-120 -170 C-60 -120 -110 0 10 40" stroke="' + INK + '" stroke-width="24" fill="none"/><path d="M-120 -170 C-60 -120 -110 0 10 40" stroke="#e7c9a6" stroke-width="18" fill="none"/>';
  inner += fetus(50, 40, 1.35, t, 2);
  s += wombView(320, 440, 250, t, inner);
  return s + label(170, 300, 120, 130, "المشيمة", OLIVE, ease((u - 0.6) / 0.6)) + label(470, 470, 560, 740, "الجنين", ORANGE, ease((u - 1.1) / 0.6)) + label(120, 560, 90, 760, "الرحم", BLUE, ease((u - 1.6) / 0.6));
}
function v0C(u, d, t) {   // شاشة سونار: مروحة رمادي، والجنين بيبان من الحبوب، وخط المسح بيلف
  var s = dark("#070707"), fan = "M320 120 L80 560 C180 720 460 720 560 560 Z";
  s += '<path d="' + fan + '" fill="#1d1d1d" stroke="#555" stroke-width="2"/>';
  for (var i = 0; i < 260; i++) { var a = -0.5 + hash(i) * 1.0, r = 60 + hash(i + 7) * 520, x = 320 + Math.sin(a) * r, y = 120 + Math.cos(a) * r, fl = 0.15 + 0.35 * hash(i + Math.floor(t * 8)); if (y < 690) s += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(1.5 + hash(i + 3) * 2.5) + '" fill="#cfcfcf" opacity="' + f(fl) + '"/>'; }
  s += '<ellipse cx="330" cy="470" rx="170" ry="140" fill="#000" opacity=".75"/>';
  var k = ease((u - 0.4) / 1.4);
  s += op(k, fetus(330, 470, 1.15, t, 2, "#9a9a9a").replace(/stroke="#2b2b2b"/g, 'stroke="#e8e8e8"').replace(/fill="url\(#hatch\)"/g, 'fill="none"'));
  var sa = Math.sin(t * 1.4) * 0.48; s += '<path d="M320 120 L' + f(320 + Math.sin(sa) * 600) + ' ' + f(120 + Math.cos(sa) * 600) + '" stroke="#fff" stroke-width="2" opacity=".35"/>';
  s += T("12w 3d", 200, 110, 22, "#9adf9a", 700) + T("FHR 150 bpm", 200, 140, 20, "#9adf9a", 700) + ecg(380, 740, 220, t, "#9adf9a");
  return s;
}
function v0D(u, d, t) {   // لقطة قريبة: بطن كبيرة وإيدين شايلينها، ودايرة تكبير بتوري الجنين
  var s = paper() + shape("M60 120 C300 100 560 260 580 470 C600 680 420 800 200 820 L60 820 Z", "#e6c3ab", true, 2.6);
  s += shape("M120 700 C200 650 330 640 420 670 C460 684 470 706 440 716 C380 730 300 720 230 740 C180 752 140 760 120 760 Z", SKIN, false, 2.4);
  for (var i = 0; i < 3; i++) s += '<path d="M' + (300 + i * 40) + ' 676 q8 22 0 44" stroke="' + INK + '" stroke-width="1.6" fill="none"/>';
  s += op(ease((u - 0.5) / 0.6), inset(330, 470, 150, '<rect x="-200" y="-200" width="400" height="400" fill="#f6e6da"/>' + fetus(10, 10, 0.95, t, 2), 1));
  return s + ring(330, 470, 162, t, ease((u - 0.9) / 0.8)) + label(440, 400, 560, 160, "الجنين", ORANGE, ease((u - 1.4) / 0.6));
}
shot(0, camMove([320, 430, 1.0], [325, 440, 1.08]), function (u, d, t) {
  var v = window.V0 || "A";
  return v === "B" ? v0B(u, d, t) : v === "C" ? v0C(u, d, t) : v === "D" ? v0D(u, d, t) : v0A(u, d, t);
});

// 1 — نقطة قلم صغيرة بتتحوّل لطفل
shot(1, camPan(260, 380, 420, 1.02), function (u, d, t) {
  var pen = g(150, 330, 1, shape("M-14 -150 L14 -150 L14 -20 L0 6 L-14 -20 Z", BLUE, true, 2) + R(-14, -170, 28, 22, INK, 1.5));
  var dotK = ease((u - 0.4) / 0.4);
  return paper() + pen + (dotK > 0 ? circle(150, 346, 3 + 2 * dotK, INK, false, 1) : "") + ring(150, 346, 26, t, ease((u - 0.7) / 0.7))
    + label(150, 372, 90, 470, "نقطة القلم", OLIVE, ease((u - 0.9) / 0.8))
    + arrow(210, 400, 330, 400, ORANGE, 4, ease((u - 1.6) / 0.8))
    + op(ease((u - 2.2) / 0.8), g(470, 420, pop((u - 2.2) / 0.9), fetus(0, 0, 0.9, t, 2)));
});

// 2 — البويضة أكبر خلية، وتحتها مسطرة
shot(2, camPush(320, 400, 1, 1.12), function (u, d, t) {
  var s = paper() + g(320, 360, pop(u / 0.9), egg(0, 0, 130, t));
  var k = ease((u - 1.8) / 1);
  s += '<path d="M190 600 H450" stroke="' + INK + '" stroke-width="2.2"/>';
  for (var i = 0; i <= 10; i++) s += '<path d="M' + (190 + i * 26) + ' 600 v' + (i % 5 ? -10 : -20) + '" stroke="' + INK + '" stroke-width="2"/>';
  return s + op(k, '<path d="M190 630 H450" stroke="' + ORANGE + '" stroke-width="3"/>' + numBox("0.1 مم", 320, 680, k)) + label(380, 290, 470, 170, "البويضة", ORANGE, ease((u - 0.5) / 0.8));
});

// 3 — المبيض بيطلّع البويضة في قناة فالوب، وعداد اليوم
shot(3, camMove([280, 380, 1.15], [240, 360, 1.3]), function (u, d, t) {
  var k = ease((u - 0.8) / (d - 1.4)), e;
  var pts = [TUBE_L[6], TUBE_L[7], TUBE_L[4], TUBE_L[5], TUBE_L[2], TUBE_L[3], TUBE_L[0], TUBE_L[1]];
  e = k <= 0 ? [118, 380] : bez(pts, k * 0.75);
  var hours = Math.floor(clamp((u - 2.5) / (d - 2.8)) * 24);
  return paper() + uterus(t) + circle(e[0], e[1] + (k <= 0 ? -ease(u / 0.8) * 20 : 0), 11, CYTO, false, 1.6) + circle(e[0], e[1], 18, "none", false, 0)
    + label(118, 395, 90, 500, "المبيض", OLIVE, ease((u - 0.3) / 0.8)) + label(170, 290, 170, 200, "قناة فالوب", BLUE, ease((u - 1.4) / 0.8))
    + op(ease((u - 2.4) / 0.5), numBox(hours + " / 24 ساعة", 330, 650, 1));
});

// 4 — سباق ملايين الحيوانات المنوية
shot(4, camPan(300, 340, 420, 1.05), function (u, d, t) {
  var s = paper() + '<path d="M-600 760 C100 700 540 700 1240 760" stroke="' + INK + '" stroke-width="2" fill="' + ROSE + '" opacity=".5"/>';
  for (var i = 0; i < 46; i++) { var lane = hash(i), sp = 60 + hash(i + 9) * 70, y = 760 - ((t * sp + hash(i + 3) * 900) % 900), x = 40 + lane * 560 + Math.sin(t * 2 + i) * 14; s += sperm(x, y, -1.5708 + Math.sin(t * 3 + i) * 0.15, t + i, 0.9); }
  return s + numBox("ملايين", 320, 140, (u - 0.8) / 0.8) + arrows(t, 600, 600, 600, 250, 3, ORANGE, 30);
});

// 5 — من الملايين كام مية بيوصلوا، وواحد بس بيدخل
shot(5, camPush(330, 420, 1, 1.15), function (u, d, t) {
  var s = paper() + egg(330, 400, 120, t), n = Math.round(lerp(14, 6, clamp((u - 0.5) / 2)));
  for (var i = 0; i < n; i++) { var a = i / 14 * 6.283 + 0.3 + Math.sin(t + i) * 0.05, r = 210 + Math.sin(t * 4 + i) * 6; s += sperm(330 + Math.cos(a) * r, 400 + Math.sin(a) * r, a + Math.PI, t + i, 0.95); }
  var k = ease((u - 2.6) / 1.4), wx = lerp(330 - 260, 330 - 125, k);
  s += sperm(wx, 400, 0, t, 1.15, YEL);
  return s + numBox("مئات", 160, 150, (u - 0.4) / 0.6) + op(ease((u - 2.8) / 0.6), numBox("1", 500, 150, 1, 30)) + label(wx + 10, 400, 150, 640, "واحد بس", ORANGE, ease((u - 3) / 0.8));
});

// 6 — البويضة بتقفل غلافها، والباقيين بيرتدوا
shot(6, camPush(320, 400, 1.1, 1.0), function (u, d, t) {
  var k = ease((u - 0.6) / 0.8), s = paper() + '<circle cx="320" cy="400" r="' + f(150 + 20 * k) + '" fill="url(#glowO)" opacity="' + f(0.5 * k) + '"/>' + egg(320, 400, 120, t, k > 0.5 ? "#f2c26a" : null);
  if (k > 0) s += '<circle cx="320" cy="400" r="130" fill="none" stroke="' + ORANGE + '" stroke-width="' + f(6 * k) + '"/>';
  for (var i = 0; i < 6; i++) { var a = i / 6 * 6.283 + 0.5, bo = 205 + 40 * clamp((u - 1.2) / 1) + Math.sin(t * 6 + i) * 6; s += sperm(320 + Math.cos(a) * bo, 400 + Math.sin(a) * bo, a + Math.PI, t + i, 0.9); }
  return s + op(ease((u - 1.4) / 0.4), crossMark(320 + Math.cos(0.5) * 250, 400 + Math.sin(0.5) * 250, 0.7, 1)) + label(410, 310, 520, 150, "بتقفل بابها", ORANGE, ease((u - 0.9) / 0.8));
});

// 7 — نواتين بيقربوا لبعض: نص من الأم ونص من الأب
shot(7, camPush(320, 400, 1, 1.1), function (u, d, t) {
  var k = ease((u - 0.6) / (d - 1.2)), s = paper() + circle(320, 400, 200, "#fbf3dc", false, 2.2) + circle(320, 400, 185, CYTO, true, 1.4);
  var lx = lerp(220, 300, k), rx = lerp(420, 340, k);
  s += circle(lx, 400, 48, "#e8a0a8", true, 2) + circle(rx, 400, 48, "#9fb8d6", true, 2);
  if (k > 0.85) s += ring(320, 400, 90, t, ease((k - 0.85) / 0.15));
  return s + label(lx, 380, 150, 170, "من الأم", RED2, ease((u - 0.4) / 0.8)) + label(rx, 380, 500, 170, "من الأب", BLUE, ease((u - 1) / 0.8)) + op(ease((u - 2.8) / 0.6), numBox("أول خلية", 320, 680, 1));
});

// 8 — الانقسام: 1 ← 2 ← 4 ← 8 وهي ماشية في القناة
shot(8, camPan(160, 480, 420, 1.0), function (u, d, t) {
  var s = paper() + '<path d="M-200 470 C100 380 400 520 900 430" stroke="' + INK + '" stroke-width="150" fill="none"/><path d="M-200 470 C100 380 400 520 900 430" stroke="' + ROSE + '" stroke-width="144" fill="none"/>';
  var stages = [[80, 1], [250, 2], [420, 4], [590, 8]];
  stages.forEach(function (st, i) { var k = (u - 0.4 - i * (d - 1.2) / 4) / 0.7; if (k > 0) s += g(st[0], 450 + Math.sin(st[0] / 120) * 10, pop(k), cluster(0, 0, st[1], 46, t)) + op(ease(k), T(String(st[1]), st[0], 560, 34, ORANGE, 900)); if (i && k > 0) s += arrow(st[0] - 120, 450, st[0] - 65, 450, INK, 2.5, ease(k)); });
  return s + arrows(t, 150, 300, 600, 300, 3, BLUE, 30) + T("ناحية الرحم ←", 470, 250, 30, BLUE, 800);
});

// 9 — بعد خمس أيام بتوصل الرحم كورة فيها 100 خلية
shot(9, camMove([320, 420, 1.05], [320, 430, 1.25]), function (u, d, t) {
  var k = ease((u - 0.3) / 2.2), p = bez([TUBE_R[6], TUBE_R[7], TUBE_R[4], TUBE_R[5], TUBE_R[2], TUBE_R[3], TUBE_R[0], TUBE_R[1]], 0.7 + 0.3 * clamp(k * 1.6)), x = k < 0.6 ? p[0] : lerp(402, 320, (k - 0.6) / 0.4), y = k < 0.6 ? p[1] : lerp(330, 380, (k - 0.6) / 0.4);
  var days = 1 + Math.floor(clamp(u / 2.4) * 4);
  return paper() + uterus(t, true) + blasto(x, y, 26 + 6 * k, t) + numBox("يوم " + days, 320, 170, (u - 0.1) / 0.5)
    + op(ease((u - 2.8) / 0.6), inset(500, 600, 95, blasto(0, 0, 70, t), 1)) + label(450, 560, 450, 470, "≈ 100 خلية", ORANGE, ease((u - 3.2) / 0.8));
});

// 10 — الكورة بتغرز نفسها في جدار الرحم
shot(10, camPush(320, 440, 1, 1.15), function (u, d, t) {
  var k = ease((u - 0.4) / 2.4), y = lerp(260, 470, k);
  return paper() + '<rect x="-600" y="-600" width="1840" height="2000" fill="#f6e6da"/>' + wall(480, t) + blasto(320, y, 62, t) + (k > 0.9 ? ring(320, 470, 90, t, ease((k - 0.9) / 0.1)) : "")
    + label(140, 520, 110, 680, "جدار الرحم", OLIVE, ease((u - 0.8) / 0.8)) + arrow(320, 140, 320, 200, INK, 3, ease(u / 0.5) * (1 - k));
});

// 11 — المشيمة بتتكوّن: أكل وأكسجين
shot(11, camPush(320, 400, 1, 1.1), function (u, d, t) {
  var k = ease((u - 0.2) / 1.2), s = paper() + '<rect x="-600" y="-600" width="1840" height="2000" fill="#f6e6da"/>';
  s += '<rect x="-600" y="-710" width="1840" height="900" fill="' + ROSE + '"/><rect x="-600" y="-710" width="1840" height="900" fill="url(#hatch)"/><path d="M-600 190 H1240" stroke="' + INK + '" stroke-width="2.4"/>';
  s += g(320, 190, k, shape("M-220 0 C-200 110 200 110 220 0 Z", "#b85a5a", true, 2.6));
  for (var i = 0; i < 6; i++) s += '<path d="M' + (140 + i * 72) + ' 20 C' + (150 + i * 72) + ' 80 ' + (110 + i * 72) + ' 120 ' + (140 + i * 72) + ' 200" stroke="' + RED2 + '" stroke-width="4" fill="none" opacity="' + f(0.8 * k) + '"/>';
  for (var j = 0; j < 14; j++) { var ph = ((t * 0.5 + hash(j)) % 1), x = 150 + hash(j + 2) * 340, y = 300 + ph * 380; s += circle(x, y, 9, j % 2 ? BLUE : ORANGE, false, 1.4); }
  return s + label(320, 250, 500, 130, "المشيمة", OLIVE, ease((u - 0.8) / 0.8)) + op(ease((u - 2.2) / 0.6), circle(120, 690, 10, ORANGE, false, 1.4) + T("أكل", 150, 698, 24, ORANGE, 800, "start") + circle(420, 690, 10, BLUE, false, 1.4) + T("أكسجين", 450, 698, 24, BLUE, 800, "start"));
});

// 12 — الحبل السري: خرطوم بيوصل الأكل للجنين
shot(12, camMove([300, 380, 1.05], [340, 430, 1.15]), function (u, d, t) {
  var cord = [150, 160, 260, 260, 120, 420, 290, 500], k = ease((u - 0.3) / 1.2), s = wombView(320, 420, 280, t, "");
  s = paper() + s + shape("M40 110 C70 30 260 30 280 120 C200 170 100 170 40 110 Z", "#b85a5a", true, 2.4);
  var d1 = "M" + cord[0] + " " + cord[1] + " C" + cord[2] + " " + cord[3] + " " + cord[4] + " " + cord[5] + " " + cord[6] + " " + cord[7];
  s += '<path d="' + d1 + '" stroke="' + INK + '" stroke-width="26" fill="none" stroke-dasharray="' + f(900 * k) + ' 900"/><path d="' + d1 + '" stroke="#e7c9a6" stroke-width="20" fill="none" stroke-dasharray="' + f(900 * k) + ' 900"/>';
  if (k > 0.95) for (var i = 0; i < 6; i++) { var p = bez(cord, ((t * 0.45 + i / 6) % 1)); s += circle(p[0], p[1], 6, i % 2 ? BLUE : ORANGE, false, 1); }
  return s + fetus(380, 520, 0.85, t, 1) + label(205, 330, 260, 720, "الحبل السري", ORANGE, ease((u - 1.2) / 0.8)) + label(160, 100, 420, 120, "المشيمة", OLIVE, ease((u - 0.4) / 0.6));
});

// 13 — الخلايا بتتقسم شغلانات: جلد، عضم، أعصاب
shot(13, camPush(320, 410, 1, 1.08), function (u, d, t) {
  var s = paper(), groups = [[160, 300, "#e9b9a0", "جلد", ORANGE], [480, 300, BONE, "عضم", OLIVE], [320, 560, "#9fb8d6", "أعصاب", BLUE]];
  groups.forEach(function (gp, i) {
    var k = ease((u - 0.6 - i * 0.9) / 0.9);
    for (var j = 0; j < 7; j++) { var a = j / 7 * 6.283 + t * 0.2, r = j ? 46 : 0, hx = lerp(320 + Math.cos(j + i * 2) * 60, gp[0] + Math.cos(a) * r, k), hy = lerp(420 + Math.sin(j + i * 2) * 60, gp[1] + Math.sin(a) * r, k); s += circle(hx, hy, 24, k > 0.5 ? gp[2] : CYTO, true, 1.6); }
    if (i === 2 && k > 0.6) for (var m = 0; m < 4; m++) s += '<path d="M' + (320 + m * 20 - 30) + ' 590 q10 40 -10 80" stroke="' + BLUE + '" stroke-width="3" fill="none"/>';
    s += op(ease((k - 0.6) / 0.4), T(gp[3], gp[0], gp[1] - 92, 32, gp[4], 900));
  });
  return s;
});

// 14 — الأسبوع الخامس: أنبوبة بتدق = أول دقات القلب
shot(14, camPush(320, 380, 1, 1.15), function (u, d, t) {
  return paper() + g(320, 340, 1, '<circle r="150" fill="#f6e6da" stroke="' + INK + '" stroke-width="2"/>') + fetus(320, 340, 1.7, t, 0)
    + numBox("الأسبوع 5", 320, 130, (u - 0.2) / 0.6) + op(ease((u - 2) / 0.6), ecg(90, 620, 460, t)) + label(316, 357, 400, 540, "القلب بيدق", RED2, ease((u - 2.4) / 0.8));
});

// 15 — المفاجأة: القلب بيدق قبل ما المخ يكمل
shot(15, camPush(320, 400, 1.02, 1.1), function (u, d, t) {
  var k = clamp((u - 0.8) / (d - 0.6)) * 0.6;
  var brain = "M-90 20 C-110 -40 -70 -90 -20 -84 C0 -110 60 -104 76 -70 C116 -60 118 10 86 30 C70 60 -60 64 -90 20 Z";
  return paper() + heartS(170, 380, 1.6, t) + T("القلب", 170, 520, 30, RED2, 900)
    + '<g transform="translate(470 370) scale(1.25)"><path d="' + brain + '" fill="none" stroke="' + INK + '" stroke-width="2.4" stroke-dasharray="' + f(700 * k) + ' 700"/><path d="' + brain + '" fill="none" stroke="' + GREY + '" stroke-width="1.2" stroke-dasharray="6 6"/></g>' + T("المخ", 470, 520, 30, BLUE, 900)
    + op(ease((u - 1.6) / 0.6), T("لسه بيتكوّن…", 470, 565, 22, GREY, 700)) + op(ease((u - 0.3) / 0.5), numBox("!", 320, 170, 1, 34)) + ring(170, 380, 120, t, ease((u - 2.4) / 0.8));
});

// 16 — الأسبوع التامن: قد حبة التوت، وفيه إيدين ورجلين
shot(16, camPan(260, 380, 420, 1.05), function (u, d, t) {
  return paper() + g(220, 420, pop(u / 0.8), fetus(0, 0, 1.2, t, 1)) + op(ease((u - 1.6) / 0.6), T("≈", 380, 440, 60, INK, 900)) + g(500, 430, pop((u - 1.8) / 0.8), berry(0, 0, 1.6, t))
    + numBox("الأسبوع 8", 320, 140, (u - 0.2) / 0.6) + label(500, 460, 420, 640, "حبة توت", RED2, ease((u - 2.4) / 0.8)) + label(178, 362, 120, 650, "صوابع صغيرة", OLIVE, ease((u - 3.4) / 0.8));
});

// 17 — من الشهر التالت: البصمة بتترسم
shot(17, camPush(320, 400, 1, 1.18), function (u, d, t) {
  var tip = shape("M210 760 L210 330 C210 200 430 200 430 330 L430 760 Z", FLESH, true, 2.4);
  return paper() + tip + fingerprint(320, 360, 1.1, (u - 0.6) / (d - 1.6), 0) + numBox("الشهر 3", 320, 130, (u - 0.2) / 0.6) + label(390, 300, 520, 200, "بصمة", ORANGE, ease((u - 2.6) / 0.8));
});

// 18 — حتى التوأم بصماتهم مختلفة
shot(18, camPush(320, 400, 1, 1.08), function (u, d, t) {
  var k = (u - 0.3) / 1.6;
  return paper() + circle(170, 400, 150, "#f3d3bf", true, 2) + circle(470, 400, 150, "#f3d3bf", true, 2) + fingerprint(170, 400, 0.95, k, 0) + fingerprint(470, 400, 0.95, k, 2.3)
    + op(ease((u - 2) / 0.5), T("≠", 320, 430, 90, ORANGE, 900)) + T("توأم ١", 170, 620, 26, BLUE, 800) + T("توأم ٢", 470, 620, 26, BLUE, 800) + op(ease((u - 3) / 0.6), arrows(t, 120, 690, 520, 690, 3, OLIVE, 20));
});

// 19 — الشهر الخامس: أول ركلة
shot(19, camPush(330, 420, 1.05, 1.2), function (u, d, t) {
  var kick = Math.max(0, Math.sin((u - 1) * 3.2)), on = u > 1;
  var s = paper() + mom(260, 470, 1.3, t, 0.5) + wombView(330, 470, 80, t, fetus(0, 0, 0.55, t, 2));
  if (on) s += '<circle cx="' + f(400 + 6 * kick) + '" cy="430" r="' + f(14 + 26 * kick) + '" fill="none" stroke="' + ORANGE + '" stroke-width="4" opacity="' + f(kick) + '"/><circle cx="406" cy="430" r="' + f(40 + 36 * kick) + '" fill="none" stroke="' + ORANGE + '" stroke-width="2.4" opacity="' + f(kick * 0.6) + '"/>';
  return s + numBox("الشهر 5", 320, 140, (u - 0.2) / 0.6) + label(420, 420, 470, 300, "ركلة!", ORANGE, ease((u - 1.4) / 0.8));
});

// 20 — الشهر السادس: بيسمع دقات قلب أمه وصوتها
shot(20, camPush(320, 440, 1, 1.12), function (u, d, t) {
  var s = paper() + wombView(320, 500, 190, t, fetus(10, 20, 1.15, t, 2)) + heartS(320, 190, 0.9, t);
  for (var i = 0; i < 3; i++) { var ph = ((t * 0.6 + i / 3) % 1); s += '<path d="M' + f(250 - ph * 60) + ' ' + f(250 + ph * 120) + ' Q320 ' + f(290 + ph * 120) + ' ' + f(390 + ph * 60) + ' ' + f(250 + ph * 120) + '" stroke="' + BLUE + '" stroke-width="3.5" fill="none" opacity="' + f(1 - ph) + '"/>'; }
  return s + numBox("الشهر 6", 120, 120, (u - 0.2) / 0.6) + label(370, 190, 420, 110, "قلب الأم", RED2, ease((u - 1.2) / 0.8)) + label(290, 440, 110, 700, "بيسمع", BLUE, ease((u - 2) / 0.8));
});

// 21 — الشهور الأخيرة: الرئتين بتجهز والوزن بيزيد
shot(21, camPush(320, 400, 1, 1.08), function (u, d, t) {
  var w = clamp((u - 1.4) / (d - 1.6)), s = paper() + lung(255, 330, 1.25, t, -1) + lung(385, 330, 1.25, t, 1) + '<path d="M320 160 V250 M320 250 L270 280 M320 250 L370 280" stroke="' + INK + '" stroke-width="8" stroke-linecap="round"/>';
  s += R(140, 560, 360, 34, PAPER, 2, 6) + R(142, 562, 356 * w, 30, ORANGE, 0, 5) + T("الوزن", 320, 640, 26, ORANGE, 800);
  return s + label(200, 330, 90, 220, "الرئتين", BLUE, ease((u - 0.4) / 0.8)) + arrows(t, 520, 520, 520, 300, 3, OLIVE, 24);
});

// 22 — تسع شهور: من خلية واحدة لتريليونات، وحوالي 3 كيلو
shot(22, camMove([320, 400, 1.0], [320, 420, 1.1]), function (u, d, t) {
  var k = clamp((u - 0.8) / 2.4), n = Math.floor(Math.pow(10, k * 12));
  var s = paper() + numBox("9 شهور", 320, 130, (u - 0.1) / 0.6) + circle(150, 330, 18, CYTO, true, 1.6) + T("1", 150, 290, 30, INK, 900) + arrow(190, 330, 300, 330, ORANGE, 4, ease((u - 0.6) / 0.6));
  for (var i = 0; i < 40 * k; i++) s += circle(330 + hash(i) * 230, 250 + hash(i + 4) * 170, 9 + Math.sin(t * 3 + i), CYTO, false, 1);
  s += op(ease((u - 0.8) / 0.4), numBox(k < 1 ? n.toLocaleString("en") : "تريليونات", 440, 470, 1, 24));
  var w = ease((u - 3.2) / 1); s += op(w, R(200, 640, 240, 16, PUTTY, 2, 4) + '<path d="M320 640 V600" stroke="' + INK + '" stroke-width="3"/>' + R(250, 560, 140, 40, INK, 2, 6) + T("≈ 3 كيلو", 320, 590, 22, "#fff", 800));
  return s;
});

// 23 — كل واحد فينا بدأ نقطة، واتبنى حتة حتة
shot(23, camMove([320, 420, 1.25], [320, 410, 0.95]), function (u, d, t) {
  var k = ease((u - 0.6) / (d - 2.2));
  var s = paper() + circle(320, 420, lerp(5, 0, clamp(k * 3)), INK, false, 1);
  s += op(ease((k - 0.15) / 0.3), wombView(320, 420, lerp(60, 220, k), t, fetus(0, 10, lerp(0.3, 1.35, k), t, k < 0.4 ? 0 : 2)));
  for (var i = 0; i < 8; i++) { var a = i / 8 * 6.283 + t * 0.3, r = lerp(80, 290, k); s += op(k, circle(320 + Math.cos(a) * r, 420 + Math.sin(a) * r, 8, i % 2 ? ORANGE : BLUE, false, 1)); }
  return s + ring(320, 420, lerp(30, 250, k), t, ease(u / 0.9));
});
