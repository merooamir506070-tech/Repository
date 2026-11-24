// «رادار السرعة» بستايل المرجع: رسم فلات عمودي مالي الشاشة، سما ضبابية، مدينة باهتة، وطريق سريع
// العالم هنا 360×640 (عمودي). الكلمة بتظهر في النص تقريباً (y من 318 لـ360)، فالحاجات المهمة فوقها أو تحتها.
var WV = "#e9f7ff";   // لون موجات الرادار
var CARC = ["#2f4f7a", "#b8382e", "#e9e6df", "#5b6e4a", "#7a7f86", "#c9a24a"];

// ── خلفيات ─────────────────────────────────────────────
function rSky(night) {
  return '<rect x="-300" y="-300" width="960" height="1240" fill="url(#' + (night ? "rnight" : "rsky") + ')"/>' +
    (night ? "" : '<circle cx="290" cy="110" r="150" fill="url(#rsun)"/>');
}
function skyline(base, seed, op, col) {   // أبراج باهتة ورا الضباب
  var s = '<g opacity="' + (op || 0.55) + '" fill="' + (col || "#9fb0bd") + '">', x = -120;
  for (var i = 0; x < 480; i++) {
    var w = 18 + hash(i + seed) * 26, h = 40 + hash(i * 3 + seed) * 120;
    if (i % 7 === 3) s += '<path d="M' + f(x) + ' ' + base + ' V' + f(base - h - 40) + ' Q' + f(x + w / 2 + 6) + ' ' + f(base - h - 95) + ' ' + f(x + w + 12) + ' ' + f(base - h - 40) + ' V' + base + ' Z"/>';   // برج بيضاوي
    else s += '<rect x="' + f(x) + '" y="' + f(base - h) + '" width="' + f(w) + '" height="' + f(h) + '"/>';
    x += w + 4 + hash(i + 50) * 10;
  }
  return s + '</g>';
}
function lowTown(base, seed) {   // بيوت واطية بيج بشبابيك ونخل
  var s = "", x = -100;
  for (var i = 0; x < 460; i++) {
    var w = 40 + hash(i + seed) * 40, h = 22 + hash(i * 2 + seed) * 22;
    s += '<rect x="' + f(x) + '" y="' + f(base - h) + '" width="' + f(w) + '" height="' + f(h) + '" fill="#d8c6a6"/><rect x="' + f(x) + '" y="' + f(base - h) + '" width="' + f(w) + '" height="4" fill="#c4b190"/>';
    for (var k = 0; k < 3; k++) s += '<rect x="' + f(x + 6 + k * (w - 12) / 3) + '" y="' + f(base - h + 9) + '" width="6" height="5" fill="#a99a80"/>';
    if (hash(i + 9) > 0.6) s += palm(x + w + 6, base, 0.8);
    x += w + 6;
  }
  return s;
}
function palm(x, y, s) {
  s = s || 1; var g = '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + s + ')"><path d="M-1.5 0 Q2 -20 0 -40 L3 -40 Q5 -20 1.5 0 Z" fill="#8a7458"/>';
  for (var a = 0; a < 6; a++) { var r = -2.6 + a * 0.45; g += '<path d="M1 -40 Q' + f(1 + Math.cos(r) * 14) + ' ' + f(-46 + Math.sin(r) * 10) + ' ' + f(1 + Math.cos(r) * 22) + ' ' + f(-38 + Math.sin(r) * 16) + '" stroke="#5f7a4a" stroke-width="3.5" fill="none" stroke-linecap="round"/>'; }
  return g + '</g>';
}
function sand(y, h) { return '<rect x="-300" y="' + y + '" width="960" height="' + (h || 700) + '" fill="url(#rsand)"/>'; }
function cones(y, t) { var s = ""; for (var x = -200; x < 560; x += 34) s += '<path d="M' + (x - 5) + ' ' + y + ' L' + x + ' ' + (y - 13) + ' L' + (x + 5) + ' ' + y + ' Z" fill="#e8742c"/><rect x="' + (x - 3) + '" y="' + (y - 8) + '" width="6" height="2.4" fill="#f4efe6"/><rect x="' + (x - 7) + '" y="' + y + '" width="14" height="2.5" fill="#55463a"/>'; return s; }
function highway(y, t, sp) {   // طريق سريع من الجنب بخطوط بتتحرك
  var s = '<rect x="-300" y="' + y + '" width="960" height="84" fill="url(#rasph)"/><rect x="-300" y="' + (y + 3) + '" width="960" height="2" fill="#e3c35a"/><rect x="-300" y="' + (y + 79) + '" width="960" height="2" fill="#d9d6cf"/>', off = ((t * (sp || 0)) % 44 + 44) % 44;
  for (var x = -300; x < 680; x += 44) s += '<rect x="' + f(x - off) + '" y="' + (y + 41) + '" width="22" height="2.5" fill="#e6e3dc"/>';
  return s + '<rect x="-300" y="' + (y + 84) + '" width="960" height="600" fill="#8f8577"/>';
}
// ── عربيات وأشكال فلات (من غير خط أسود، تظليل خفيف) ──────
function fcar(x, y, col, s, dir, t) {
  s = s || 1; dir = dir || 1; var a = (t * 600) % 360;
  var wh = function (cx) { return '<circle cx="' + cx + '" cy="0" r="9" fill="#26272a"/><circle cx="' + cx + '" cy="0" r="4" fill="#9a9ea3"/><rect x="' + (cx - 1) + '" y="-4" width="2" height="8" fill="#5a5e63" transform="rotate(' + f(a) + ' ' + cx + ' 0)"/>'; };
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s * dir) + ' ' + f(s) + ')"><ellipse cx="0" cy="9" rx="46" ry="3.5" fill="#000" opacity=".22"/>' +
    '<path d="M-46 -2 V-14 Q-45 -19 -36 -20 L-20 -21 L-8 -33 Q-5 -35 2 -35 L22 -35 Q27 -35 31 -30 L39 -21 L44 -20 Q48 -18 48 -11 V-2 Z" fill="' + col + '"/>' +
    '<path d="M-46 -2 V-14 Q-45 -19 -36 -20 L-20 -21 L-8 -33 Q-5 -35 2 -35 L22 -35 Q27 -35 31 -30 L39 -21 L44 -20 Q48 -18 48 -11 V-2 Z" fill="url(#rshade)"/>' +
    '<path d="M-16 -21 L-6 -31 L8 -31 L8 -21 Z M12 -21 V-31 L22 -31 Q25 -31 27 -28 L33 -21 Z" fill="url(#rglass)"/>' +
    '<rect x="43" y="-16" width="5" height="4" rx="1" fill="#fff4c8"/><rect x="-47" y="-16" width="4" height="4" fill="#d24a3a"/>' + wh(-28) + wh(30) + '</g>';
}
function traffic(t, y, sp, dir, seed, s) {   // صف عربيات رايح ناحية واحدة
  var out = ""; for (var i = 0; i < 4; i++) { var x = ((t * sp * dir + i * 190 + hash(i + seed) * 70) % 760 + 760) % 760 - 200; out += fcar(x, y, CARC[(i + seed) % CARC.length], s || 0.8, dir, t); } return out;
}
// عمود الرادار (فلات): صندوق بشريط أصفر، عدسة رادار وعدسة كاميرا، وفلاش لما fl > 0
function radar(x, y, s, t, fl) {
  s = s || 1; fl = fl || 0; var led = 0.4 + 0.6 * Math.abs(Math.sin(t * 4));
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + s + ')"><rect x="-4" y="-150" width="8" height="150" fill="url(#rconc)"/><rect x="-10" y="-4" width="20" height="5" fill="#6e6a62"/>' +
    '<rect x="-30" y="-200" width="60" height="54" rx="4" fill="#dcd6c9"/><rect x="-30" y="-200" width="60" height="54" rx="4" fill="url(#rshade)"/><rect x="-30" y="-200" width="60" height="9" rx="3" fill="url(#ryel)"/>' +
    '<circle cx="-12" cy="-168" r="11" fill="#3e444c"/><circle cx="-12" cy="-168" r="5" fill="#9fd8f0"/><rect x="3" y="-178" width="20" height="17" rx="3" fill="#f2efe8"/><circle cx="13" cy="-169.5" r="5" fill="#3e444c"/>' +
    '<circle cx="24" cy="-194" r="2.3" fill="#e2483a" opacity="' + f(led) + '"/>' +
    (fl > 0 ? '<circle cx="13" cy="-170" r="' + f(30 + fl * 70) + '" fill="#fffdf2" opacity="' + f(fl * 0.85) + '" filter="url(#soft)"/>' : '') + '</g>';
}
function flashK(u, u0) { var k = u - u0; return k < 0 || k > 0.5 ? 0 : 1 - k / 0.5; }
function whiteOut(k) { return k > 0 ? '<rect x="-300" y="-300" width="960" height="1240" fill="#fffdf4" opacity="' + f(k * 0.7) + '"/>' : ""; }
// قوس موجة فلات
function arcW(x, y, r, dir, col, op, w) {
  var x1 = x - dir * r * 0.35; return '<path d="M' + f(x1) + ' ' + f(y - r) + ' Q' + f(x + dir * r * 0.35) + ' ' + f(y) + ' ' + f(x1) + ' ' + f(y + r) + '" stroke="' + (col || WV) + '" stroke-width="' + (w || 4) + '" fill="none" stroke-linecap="round" opacity="' + f(op) + '"/>';
}
function waveTrain(x0, x1, y, t, gap, dir, col, r) {
  var s = "", len = Math.abs(x1 - x0), off = (t * 70) % gap;
  for (var p = off; p < len; p += gap) s += arcW(x0 + dir * p, y, (r || 16) + p * 0.06, dir, col, 0.95 - p / len * 0.6);
  return s;
}
function sineW(x, y, len, lam, amp, col, t, w) {
  var d = "", ph = t * 7; for (var i = 0; i <= len; i += 2) d += (i ? " L" : "M") + f(x + i) + " " + f(y + Math.sin(i / lam * 6.283 - ph) * amp);
  return '<path d="' + d + '" stroke="#000" stroke-opacity=".12" stroke-width="' + ((w || 4) + 4) + '" fill="none"/><path d="' + d + '" stroke="' + col + '" stroke-width="' + (w || 4) + '" fill="none" stroke-linecap="round"/>';
}
function arrowF(x1, y, x2, col, p) { p = clamp(p); if (p <= 0) return ""; var xe = lerp(x1, x2, p), dr = x2 > x1 ? 1 : -1; return '<path d="M' + f(x1) + ' ' + y + ' H' + f(xe - dr * 8) + '" stroke="' + col + '" stroke-width="6" stroke-linecap="round"/><path d="M' + f(xe + dr * 4) + ' ' + y + ' L' + f(xe - dr * 10) + ' ' + (y - 9) + ' L' + f(xe - dr * 10) + ' ' + (y + 9) + ' Z" fill="' + col + '"/>'; }
// لوحة طريق خضرا فوق الطريق (جسر لافتات) فيها رقم ديجيتال
function gantry(y, inner) {
  var ph = 494 - (y - 10);   // العواميد نازلة لحد الأرض جنب الطريق
  return '<rect x="20" y="' + (y - 10) + '" width="8" height="' + ph + '" fill="url(#rconc)"/><rect x="332" y="' + (y - 10) + '" width="8" height="' + ph + '" fill="url(#rconc)"/><rect x="14" y="' + (y - 16) + '" width="332" height="8" fill="#8f8b84"/>' +
    '<rect x="40" y="' + y + '" width="280" height="110" rx="6" fill="#2c6a4c"/><rect x="46" y="' + (y + 6) + '" width="268" height="98" rx="4" fill="none" stroke="#e9efe6" stroke-width="2"/>' + (inner || "");
}
function digits(x, y, txt, size, col) { return '<text x="' + f(x) + '" y="' + f(y) + '" text-anchor="middle" style="font:900 ' + size + 'px Noto Sans Arabic;fill:' + (col || "#f4f1e8") + ';letter-spacing:1px" direction="ltr">' + txt + '</text>'; }
function countTo(u, u0, dur, to) { return Math.round(to * ease((u - u0) / dur)).toLocaleString("en-US"); }
function speedoF(x, y, r, v, vmax, t) {
  var s = '<g transform="translate(' + f(x) + ' ' + f(y) + ')"><circle r="' + (r + 8) + '" fill="#26292e"/><circle r="' + r + '" fill="#15171a"/>';
  for (var i = 0; i <= 12; i++) { var b = (-210 + i * 20) * Math.PI / 180, l = i % 2 ? 7 : 13; s += '<path d="M' + f(Math.cos(b) * (r - 6)) + ' ' + f(Math.sin(b) * (r - 6)) + ' L' + f(Math.cos(b) * (r - 6 - l)) + ' ' + f(Math.sin(b) * (r - 6 - l)) + '" stroke="' + (i > 9 ? "#e2483a" : "#e8e4da") + '" stroke-width="2.5"/>'; }
  var c = (-210 + 240 * clamp(v / vmax) + Math.sin(t * 9) * 1.2) * Math.PI / 180;
  return s + '<path d="M0 0 L' + f(Math.cos(c) * (r - 14)) + ' ' + f(Math.sin(c) * (r - 14)) + '" stroke="#f0632e" stroke-width="4" stroke-linecap="round"/><circle r="7" fill="#3a3d42"/>' + digits(0, r * 0.55, Math.round(v), 22, "#f4f1e8") + '</g>';
}
// صورة المخالفة
function ticket(x, y, u, u0) {
  var k = pop((u - u0) / 0.8); if (k <= 0) return "";
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ') rotate(-4)"><rect x="-120" y="-80" width="240" height="160" fill="#f6f3ec"/><rect x="-110" y="-70" width="220" height="104" fill="#2f3943"/>' +
    fcar(0, 10, "#2f4f7a", 1.4, 1, 0) + '<rect x="-24" y="2" width="48" height="12" rx="2" fill="#f4f1e8"/>' + digits(0, 12, "427 XYZ", 9, "#222") +
    digits(-60, 62, "117 km/h", 18, "#c8392e") + digits(70, 62, "23:41", 14, "#3a3a3a") + '</g>';
}
// إسعاف فلات
function ambF(x, y, t, s) {
  s = s || 1; var on = Math.sin(t * 14) > 0, a = (t * 600) % 360;
  var wh = function (cx) { return '<circle cx="' + cx + '" r="9" fill="#26272a"/><circle cx="' + cx + '" r="4" fill="#9a9ea3"/>'; };
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + s + ')"><ellipse cy="9" rx="52" ry="4" fill="#000" opacity=".22"/>' +
    '<path d="M-52 -2 V-48 H18 L36 -26 L52 -22 V-2 Z" fill="#f3f1ea"/><path d="M-52 -2 V-48 H18 L36 -26 L52 -22 V-2 Z" fill="url(#rshade)"/><path d="M22 -44 L34 -28 H22 Z" fill="url(#rglass)"/>' +
    '<rect x="-52" y="-22" width="104" height="6" fill="#d23c31"/><path d="M-22 -40 H-14 V-34 H-8 V-26 H-14 V-20 H-22 V-26 H-28 V-34 H-22 Z" fill="#d23c31"/>' +
    '<rect x="-12" y="-55" width="11" height="7" rx="2" fill="' + (on ? "#ff4a3a" : "#7a2a22") + '"/><rect x="1" y="-55" width="11" height="7" rx="2" fill="' + (on ? "#24407a" : "#4aa8ff") + '"/>' +
    '<circle cx="' + (on ? -6 : 7) + '" cy="-52" r="16" fill="' + (on ? "#ff5a4a" : "#4aa8ff") + '" opacity=".35" filter="url(#soft)"/>' + wh(-32) + wh(32) + '</g>';
}
// قطر بخار قديم + ناس على شكل ظلال (من غير وشوش، زي المرجع)
function trainF(x, y, t, s) {
  s = s || 1; var sm = "";
  for (var i = 0; i < 4; i++) { var k = (t * 0.6 + i / 4) % 1; sm += '<circle cx="' + f(46 - k * 50) + '" cy="' + f(-66 - k * 50) + '" r="' + f(7 + k * 16) + '" fill="#efeae0" opacity="' + f(0.9 - k * 0.9) + '"/>'; }
  var wh = function (cx) { return '<circle cx="' + cx + '" cy="0" r="10" fill="#6e2a20"/><circle cx="' + cx + '" cy="0" r="3" fill="#2a2a2a"/>'; };
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + s + ')">' + sm + '<rect x="-150" y="-40" width="100" height="32" fill="#6c7f5a"/><rect x="-150" y="-40" width="100" height="32" fill="url(#rshade)"/>' +
    '<rect x="-38" y="-38" width="84" height="30" rx="3" fill="#3b4148"/><rect x="-38" y="-66" width="34" height="30" fill="#3b4148"/><rect x="36" y="-64" width="12" height="26" fill="#3b4148"/><rect x="-32" y="-60" width="22" height="13" fill="#f0dea8"/>' +
    wh(-130) + wh(-70) + wh(-18) + wh(28) + '</g>';
}
function figure(x, y, s, col) { s = s || 1; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + s + ')" fill="' + (col || "#4a4540") + '"><circle cx="0" cy="-34" r="6"/><path d="M-6 -26 H6 L7 -10 H4 L3 0 H-3 L-4 -10 H-7 Z"/></g>'; }
function horn(x, y, t) { return '<path d="M' + f(x) + ' ' + f(y) + ' h12 l8 -5 v12 l-8 -5 h-12 z" fill="#d6aa48" transform="rotate(' + f(Math.sin(t * 5) * 3) + ' ' + x + ' ' + y + ')"/>'; }
function notesF(x, y, t) { var s = ""; for (var i = 0; i < 3; i++) { var k = (t * 0.6 + i / 3) % 1; s += '<text x="' + f(x + k * 40) + '" y="' + f(y - k * 50) + '" style="font:900 20px Noto Sans Arabic;fill:#5a4a30" opacity="' + f(1 - k) + '">♪</text>'; } return s; }
function chipF(x, y, t) {
  var s = '<g transform="translate(' + f(x) + ' ' + f(y) + ')">';
  for (var i = -3; i <= 3; i++) s += '<rect x="' + (i * 13 - 2.5) + '" y="-58" width="5" height="116" fill="#c8a24e"/><rect x="-58" y="' + (i * 13 - 2.5) + '" width="116" height="5" fill="#c8a24e"/>';
  return s + '<rect x="-44" y="-44" width="88" height="88" rx="6" fill="#2b2f34"/><rect x="-44" y="-44" width="88" height="88" rx="6" fill="url(#rshade)"/><rect x="-26" y="-26" width="52" height="52" rx="3" fill="#3c4652" opacity="' + f(0.7 + 0.3 * Math.sin(t * 5)) + '"/></g>';
}
// طريق بالمنظور (زي أول لقطة في المرجع): بيقرب من الأفق لتحت
function perspRoad(hy, t) {
  var s = '<path d="M168 ' + hy + ' L192 ' + hy + ' L420 640 L-60 640 Z" fill="url(#rasph)"/><path d="M168 ' + hy + ' L-60 640 M192 ' + hy + ' L420 640" stroke="#e8e4da" stroke-width="3"/>';
  for (var i = 0; i < 10; i++) { var k = ((i / 10 + t * 0.35) % 1), z = k * k, y1 = hy + z * (640 - hy), y2 = hy + Math.min(1, (k + 0.04) * (k + 0.04)) * (640 - hy); s += '<path d="M' + f(180 - 1 - z * 3) + ' ' + f(y1) + ' L' + f(180 + 1 + z * 3) + ' ' + f(y1) + ' L' + f(180 + 1 + z * 3) + ' ' + f(y2) + ' L' + f(180 - 1 - z * 3) + ' ' + f(y2) + ' Z" fill="#e6c85a"/>'; }
  return s;
}
// عربية بالمنظور من ورا (جاية ناحيتنا أو رايحة): k من 0 (الأفق) لـ1 (تحت)
function pcar(k, hy, lane, col) {
  var z = 0.12 + k * k * 1.6, y = hy + k * k * (640 - hy), x = 180 + lane * (6 + k * k * 120), w = 34 * z, h = 22 * z;
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ')"><ellipse cx="0" cy="' + f(h * 0.05) + '" rx="' + f(w * 0.6) + '" ry="' + f(h * 0.12) + '" fill="#000" opacity=".25"/><path d="M' + f(-w / 2) + ' 0 V' + f(-h * 0.55) + ' L' + f(-w * 0.36) + ' ' + f(-h) + ' H' + f(w * 0.36) + ' L' + f(w / 2) + ' ' + f(-h * 0.55) + ' V0 Z" fill="' + col + '"/>' +
    '<path d="M' + f(-w * 0.3) + ' ' + f(-h * 0.62) + ' L' + f(-w * 0.24) + ' ' + f(-h * 0.92) + ' H' + f(w * 0.24) + ' L' + f(w * 0.3) + ' ' + f(-h * 0.62) + ' Z" fill="url(#rglass)"/><rect x="' + f(-w * 0.46) + '" y="' + f(-h * 0.42) + '" width="' + f(w * 0.16) + '" height="' + f(h * 0.12) + '" fill="#fff4c8"/><rect x="' + f(w * 0.3) + '" y="' + f(-h * 0.42) + '" width="' + f(w * 0.16) + '" height="' + f(h * 0.12) + '" fill="#fff4c8"/></g>';
}
// مشهد جانبي جاهز: سما، أبراج، بيوت، أقماع، وطريق
function sideScene(t, sp, seed) { return rSky() + skyline(400, seed || 3, 0.5) + skyline(410, (seed || 3) + 20, 0.35, "#b9bfc2") + lowTown(452, seed || 3) + sand(450, 40) + cones(486, t) + highway(490, t, sp || 0); }

// ── المشاهد ─────────────────────────────────────────────
// 0 — طريق بالمنظور، عربيات جاية، وعمود رادار على اليمين بيضرب فلاش
shot(0, camMove([180, 330, 1.12], [180, 320, 1.0]), function (u, d, t) {
  var hy = 300, fk = flashK(u, 4.2), s = rSky() + skyline(hy, 7, 0.55) + sand(hy, 400) + perspRoad(hy, t);
  for (var i = 0; i < 4; i++) { var k = ((t * 0.12 + i / 4) % 1); s += pcar(k, hy, i % 2 ? 0.6 : -0.5, CARC[i]); }
  return s + radar(318, 600, 1.15, t, fk) + whiteOut(fk);
});
// 1 — من جوه العربية: العداد بيترعش، والطريق قدام في الإزاز
shot(1, camPush(180, 330, 1.0, 1.1), function (u, d, t) {
  var hy = 200, s = rSky() + skyline(hy, 2, 0.5) + sand(hy, 400) + perspRoad(hy, t * 1.6);
  return s + '<path d="M-300 330 Q180 300 660 330 V940 H-300 Z" fill="#2a2c30"/><path d="M-300 330 Q180 300 660 330 V350 Q180 322 -300 350 Z" fill="#3a3d42"/>' + speedoF(180, 470, 90, 92 + Math.sin(t * 2.6) * 6, 180, t) + radar(300, 300, 0.45, t);
});
// 2 — الرادار بيبعت موجات ناحية العربية
shot(2, camMove([210, 360, 1.15], [180, 330, 1.0]), function (u, d, t) {
  return sideScene(t, 0, 3) + radar(300, 486, 1.0, t) + waveTrain(270, 90, 330, t, 30, -1) + fcar(80, 522, "#c9a24a", 0.9, 1, t) + traffic(t, 556, 110, -1, 2, 0.75);
});
// 3 — الموجة بتخبط وترجع زي الصدى
shot(3, camPush(190, 330, 1.02, 1.12), function (u, d, t) {
  return sideScene(t, 0, 4) + radar(300, 486, 1.0, t) + waveTrain(270, 130, 300, t, 32, -1) + waveTrain(130, 270, 380, t + 0.4, 32, 1, "#f4cf5a", 14) + '<circle cx="128" cy="500" r="' + f(16 + 8 * Math.abs(Math.sin(t * 4))) + '" fill="#fff4c8" opacity=".5" filter="url(#soft)"/>' + fcar(110, 522, "#c9a24a", 0.9, 1, t);
});
// 4 — عربية جاية: الموجات بتتزنق وذبذبتها بتعلى
shot(4, camPan(170, 200, 330, 1.02), function (u, d, t) {
  var cx = lerp(30, 170, ease(u / d));
  return sideScene(t, 0, 5) + radar(320, 486, 1.0, t) + sineW(cx + 50, 230, 290 - cx, 12, 16, "#5fb7e2", t * 1.8, 4) + arrowF(cx - 10, 420, cx + 70, "#4f9a5a", ease(u / 1.2)) + fcar(cx, 522, "#b8382e", 0.95, 1, t);
});
// 5 — عربية بتبعد: الموجات بتتمط وذبذبتها بتقل
shot(5, camPan(200, 170, 330, 1.02), function (u, d, t) {
  var cx = lerp(200, 50, ease(u / d));
  return sideScene(t, 0, 6) + radar(320, 486, 1.0, t) + sineW(cx + 50, 230, 290 - cx, 70, 20, "#d9643a", t * 0.7, 4) + arrowF(cx + 30, 420, cx - 50, "#c8392e", ease(u / 1.2)) + fcar(cx, 522, "#5b6e4a", 0.95, -1, t);
});
// 6 — الإسعاف معدّية: الموجات قدامها متزنقة ووراها ممطوطة (تأثير دوبلر)
shot(6, camPan(140, 230, 330, 1.0), function (u, d, t) {
  var ax = lerp(-40, 400, u / d);
  return sideScene(t, 0, 8) + waveTrain(ax + 60, ax + 260, 250, t * 1.7, 14, 1, "#f4cf5a", 12) + waveTrain(ax - 60, ax - 260, 250, t * 0.6, 40, -1, "#f4cf5a", 12) + ambF(ax, 524, t, 1.0) + traffic(t, 556, 90, -1, 1, 0.75) + figure(220, 486, 1.0);
});
// 7 — سنة 1845: عازفين بوق على قطر، وناس على المحطة بتسمع
shot(7, camMove([150, 340, 1.12], [210, 330, 1.0]), function (u, d, t) {
  var tx = lerp(140, 330, u / d);
  return rSky() + '<rect x="-300" y="440" width="960" height="600" fill="url(#rgrass)"/>' + '<path d="M-300 440 Q0 400 200 430 T660 420 V450 H-300 Z" fill="#a89a64" opacity=".7"/>' +
    '<rect x="-300" y="518" width="960" height="4" fill="#6b5a46"/><rect x="-300" y="526" width="960" height="3" fill="#6b5a46"/>' +
    trainF(tx, 518, t, 1.0) + figure(tx - 120, 478, 0.9, "#3a3530") + horn(tx - 114, 450, t) + figure(tx - 85, 478, 0.9, "#3a3530") + horn(tx - 79, 450, t + 1) + notesF(tx - 70, 420, t) +
    '<rect x="20" y="560" width="120" height="10" fill="#8a7a62"/>' + figure(50, 560, 1.1) + figure(90, 560, 1.1, "#5a5048") + digits(180, 200, "1845", 44, "#5a4a36");
});
// 8 — لوحة الطريق: الموجة بتتذبذب 24 مليار مرة في الثانية
shot(8, camPush(180, 300, 1.0, 1.08), function (u, d, t) {
  return sideScene(t, 0, 9) + traffic(t, 524, 120, 1, 3, 0.8) + traffic(t, 556, 100, -1, 5, 0.75) + gantry(130, digits(180, 190, countTo(u, 0.5, 3.2, 24000000000), 26, "#f4f1e8") + digits(180, 226, "Hz", 18, "#cfe6d6")) + sineW(0, 290, 360, 6, 9, "#5fb7e2", t * 4, 2.5);
});
// 9 — على مية كيلو: الفرق 4,400 بس
shot(9, camPush(180, 330, 1.0, 1.06), function (u, d, t) {
  return sideScene(t, 0, 10) + gantry(110, digits(120, 175, countTo(u, 1.4, 2.0, 4400), 34, "#f4cf5a") + digits(250, 175, "Hz", 18, "#cfe6d6")) + speedoF(180, 520, 70, lerp(0, 100, ease(u / 1.6)), 180, t);
});
// 10 — الشريحة بتحوّل الفرق لسرعة في أقل من ثانية
shot(10, camPush(180, 320, 1.0, 1.1), function (u, d, t) {
  var s = '<rect x="-300" y="-300" width="960" height="1240" fill="#b9b4aa"/><rect x="-300" y="-300" width="960" height="1240" fill="url(#haze)"/>' + chipF(180, 200, t);
  for (var i = 0; i < 6; i++) { var k = (t * 1.3 + i / 6) % 1; s += '<circle cx="' + f(180 + Math.sin(i * 2) * 20) + '" cy="' + f(260 + k * 170) + '" r="4" fill="#3a8fbf" opacity="' + f(1 - k) + '"/>'; }
  return s + '<rect x="90" y="440" width="180" height="90" rx="8" fill="#22262b"/>' + digits(180, 503, countTo(u, 0.5, 0.8, 117), 52, "#e2483a");
});
// 11 — عدّيت الحد: فلاش، وصورة المخالفة
shot(11, camMove([200, 340, 1.0], [180, 320, 1.08]), function (u, d, t) {
  var fk = flashK(u, 1.4);
  return sideScene(t, 0, 11) + radar(300, 486, 1.0, t, fk) + fcar(lerp(20, 260, ease(u / 2)), 522, "#2f4f7a", 0.95, 1, t) + whiteOut(fk) + ticket(180, 190, u, 1.9);
});
// 12 — المرة الجاية: الطريق تاني، وموجة صغيرة راجعة من العربية
shot(12, camMove([180, 320, 1.1], [180, 330, 1.0]), function (u, d, t) {
  var hy = 300, fk = flashK(u, 5.6), s = rSky() + skyline(hy, 7, 0.55) + sand(hy, 400) + perspRoad(hy, t), k = 0.25 + 0.6 * ease(u / d);
  for (var i = 0; i < 3; i++) s += arcW(lerp(180, 300, ((t * 0.5 + i / 3) % 1)), lerp(hy + k * k * (640 - hy) - 20, 420, ((t * 0.5 + i / 3) % 1)), 12, 1, "#f4cf5a", 0.9, 4);
  return s + pcar(k, hy, -0.4, "#2f4f7a") + radar(318, 600, 1.15, t, fk) + whiteOut(fk * 0.6);
});
// 13 — الختام: المدينة وقت الغروب والرادار بينبض
shot(13, camPush(180, 320, 1.0, 1.08), function (u, d, t) {
  return sideScene(t, 0, 12) + traffic(t, 524, 100, 1, 2, 0.8) + traffic(t, 556, 80, -1, 4, 0.75) + radar(180, 486, 1.1, t) + pulse(180, 300, t, "#f4cf5a", 30);
});
