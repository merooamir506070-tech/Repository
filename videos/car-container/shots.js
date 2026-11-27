// «إزاي بيدخلوا العربية جوه الكونتينر؟» — مشهد لكل سطر من script.txt
// المقياس في المشاهد الجانبية والعلوية: متر = 55 وحدة تقريباً
// ── ألوان ─────────────────────────────────────────────
var CTR = "#c4552e", CTR2 = "#8f3d22", CTR3 = "#a94826", WOOD = "#b07a44", WOOD2 = "#8d5d30";
var CARC = "#2f6f9f", CAR2 = "#e2b035", CAR3 = "#4f8f5a", RED = "#d63a2a";
var ZINK = "#3b2f2a", ZSKIN = "#d68d67", ZSKIN2 = "#c47a55", ZHAIR = "#3a2a22", ZHOOD = "#d0702f", ZHOOD2 = "#b25c22", ZJEAN = "#3f5b7f", ZSTRAP = "#2f5d7c";
function g(x, y, s, inner, rot) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ')' + (rot ? ' rotate(' + f(rot) + ')' : '') + (s && s !== 1 ? ' scale(' + s + ')' : '') + '">' + inner + '</g>'; }

// ── زيزو (من غير كاب، بأسلوب الرسم المسطّح) ─────────────
// رجليه عند (x, y). s = 0.15 تقريباً = طول إنسان جنب العربية. o: {mood:"happy"|"shock"|"worry", arms:"down"|"up"|"reach", upper:true (نص فوق بس)}
function zizo(x, y, s, t, o) {
  o = o || {};
  var st = 'stroke="' + ZINK + '" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"', z = "";
  var bob = Math.sin(t * 3) * 3;
  if (!o.upper) {
    z += '<path d="M-82 248 L-76 460 L-10 460 L-4 282 L4 282 L10 460 L76 460 L82 248 Z" fill="' + ZJEAN + '" ' + st + '/>';
    z += '<path d="M-80 458 L-8 458 Q0 474 -6 490 L-86 490 Q-94 472 -80 458 Z" fill="#f7f4ec" ' + st + '/>';
    z += '<path d="M80 458 L8 458 Q0 474 6 490 L86 490 Q94 472 80 458 Z" fill="#f7f4ec" ' + st + '/>';
  }
  var arms = o.arms || "down", wv = Math.sin(t * 7) * 10;
  var arm = function (sx) {
    var ex, ey, cx, cy;
    if (arms === "up") { ex = sx * (120 + wv * sx); ey = -150; cx = sx * 130; cy = -40; }
    else if (arms === "reach") { ex = sx * 170; ey = 40 + Math.sin(t * 6 + sx) * 15; cx = sx * 140; cy = 0; }
    else { ex = sx * 112; ey = 225; cx = sx * 128; cy = 120; }
    var d = 'M' + (sx * 92) + ' 20 Q' + f(cx) + ' ' + f(cy) + ' ' + f(ex) + ' ' + f(ey);
    return '<path d="' + d + '" fill="none" stroke="' + ZINK + '" stroke-width="52" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="' + ZHOOD + '" stroke-width="44" stroke-linecap="round"/><circle cx="' + f(ex) + '" cy="' + f(ey + (arms === "down" ? 27 : 0)) + '" r="20" fill="' + ZSKIN + '" ' + st + '/>';
  };
  z += arm(-1) + arm(1);
  z += '<path d="M-100 40 C-96 6 -60 -8 -30 -8 L30 -8 C60 -8 96 6 100 40 L104 250 Q0 262 -104 250 Z" fill="' + ZHOOD + '" ' + st + '/>';
  z += '<path d="M-58 168 L58 168 L70 226 L-70 226 Z" fill="none" stroke="' + ZHOOD2 + '" stroke-width="4"/>';
  z += '<path d="M-62 -4 Q-74 80 -64 170" fill="none" stroke="' + ZINK + '" stroke-width="22" stroke-linecap="round"/><path d="M-62 -4 Q-74 80 -64 170" fill="none" stroke="' + ZSTRAP + '" stroke-width="15" stroke-linecap="round"/>';
  z += '<path d="M62 -4 Q74 80 64 170" fill="none" stroke="' + ZINK + '" stroke-width="22" stroke-linecap="round"/><path d="M62 -4 Q74 80 64 170" fill="none" stroke="' + ZSTRAP + '" stroke-width="15" stroke-linecap="round"/>';
  z += '<rect x="-17" y="-40" width="34" height="40" fill="' + ZSKIN2 + '" ' + st + '/>';
  z += '<path d="M-48 -12 Q0 34 48 -12 Q38 6 0 10 Q-38 6 -48 -12 Z" fill="' + ZHOOD2 + '" ' + st + '/>';
  z += '<path d="M-12 16 L-14 70 M12 16 L14 70" stroke="#f4efe4" stroke-width="5" stroke-linecap="round"/>';
  z += '<circle cx="-60" cy="-98" r="15" fill="' + ZSKIN + '" ' + st + '/><circle cx="60" cy="-98" r="15" fill="' + ZSKIN + '" ' + st + '/>';
  z += '<ellipse cx="0" cy="-100" rx="60" ry="70" fill="' + ZSKIN + '" ' + st + '/>';
  z += '<path d="M-62 -100 C-70 -150 -40 -178 0 -178 C40 -178 70 -150 62 -100 C58 -118 52 -128 44 -132 C30 -122 6 -122 -8 -134 C-22 -124 -40 -126 -50 -134 C-56 -124 -59 -114 -62 -100 Z" fill="' + ZHAIR + '" ' + st + '/>';
  var mood = o.mood || "happy", blink = (t % 3.2) < 0.12;
  if (mood === "shock") {
    z += '<path d="M-36 -124 Q-24 -132 -12 -126 M12 -126 Q24 -132 36 -124" fill="none" stroke="' + ZHAIR + '" stroke-width="5" stroke-linecap="round"/>';
    z += blink ? '<path d="M-32 -100 h16 M16 -100 h16" stroke="' + ZINK + '" stroke-width="4"/>' : '<circle cx="-24" cy="-100" r="8" fill="' + ZINK + '"/><circle cx="24" cy="-100" r="8" fill="' + ZINK + '"/>';
    z += '<ellipse cx="0" cy="-52" rx="11" ry="14" fill="#4a2a24" ' + st + '/>';
  } else if (mood === "worry") {
    z += '<path d="M-36 -116 Q-24 -126 -12 -122 M12 -122 Q24 -126 36 -116" fill="none" stroke="' + ZHAIR + '" stroke-width="5" stroke-linecap="round"/>';
    z += blink ? '<path d="M-32 -100 h16 M16 -100 h16" stroke="' + ZINK + '" stroke-width="4"/>' : '<circle cx="-24" cy="-100" r="6" fill="' + ZINK + '"/><circle cx="24" cy="-100" r="6" fill="' + ZINK + '"/>';
    z += '<path d="M-16 -50 Q0 -62 16 -50" fill="none" stroke="' + ZINK + '" stroke-width="4.5" stroke-linecap="round"/>';
  } else {
    z += '<path d="M-36 -118 Q-24 -124 -12 -119 M12 -119 Q24 -124 36 -118" fill="none" stroke="' + ZHAIR + '" stroke-width="5" stroke-linecap="round"/>';
    z += '<path d="M-34 -98 Q-24 -108 -14 -98 M14 -98 Q24 -108 34 -98" fill="none" stroke="' + ZINK + '" stroke-width="4.5" stroke-linecap="round"/>';
    z += '<path d="M-20 -60 Q0 -34 20 -60 Z" fill="#4a2a24" ' + st + '/><path d="M-10 -46 Q0 -40 10 -46 Q0 -54 -10 -46 Z" fill="#d9605a"/>';
  }
  z += '<path d="M2 -88 Q9 -76 -2 -72" fill="none" stroke="' + ZINK + '" stroke-width="3.5" stroke-linecap="round"/>';
  z += '<circle cx="-36" cy="-74" r="9" fill="#e0716a" opacity=".45"/><circle cx="36" cy="-74" r="9" fill="#e0716a" opacity=".45"/>';
  return '<g transform="translate(' + f(x) + ' ' + f(y + bob * s) + ') scale(' + s + ') translate(0 -490)">' + z + '</g>';
}

// ── عربية من الجنب: x = النص، y = الأرض. o: {roll (مسافة للعجل), win (0..1 الإزاز نازل), sunroof, hatch, hatchOpen (0..1), brake, noDriver, driverMood}
function carSide(x, y, s, col, t, o) {
  o = o || {}; var z = "", sw = 'stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"';
  var body = o.hatch
    ? 'M-110 -22 L-110 -50 Q-108 -58 -100 -60 L-84 -80 L40 -80 L66 -54 L100 -50 Q110 -48 110 -36 L110 -22 Q110 -14 100 -14 L-100 -14 Q-110 -14 -110 -22 Z'
    : 'M-110 -22 L-108 -44 Q-104 -50 -80 -52 L-50 -54 L-28 -80 L40 -80 L66 -54 L100 -50 Q110 -48 110 -36 L110 -22 Q110 -14 100 -14 L-100 -14 Q-110 -14 -110 -22 Z';
  z += '<path d="' + body + '" fill="' + col + '" ' + sw + '/>';
  z += '<path d="M-104 -36 L104 -36" stroke="#000" stroke-opacity=".18" stroke-width="5"/>';
  // سواق جوه (راس بس من الشباك)
  if (!o.noDriver) z += '<g clip-path="url(#carWinF)">' + zizo(30, 7, 0.12, t, { mood: o.driverMood || "happy", upper: true }) + '</g>';
  // الإزاز
  var winH = 19 * (1 - (o.win || 0));
  z += '<path d="M4 -75 L36 -75 L58 -56 L4 -56 Z" fill="none" stroke="' + INK + '" stroke-width="2.5"/>';
  if (winH > 0.5) z += '<path d="M4 ' + f(-56 - winH) + ' L' + f(58 - 22 * winH / 19) + ' ' + f(-56 - winH) + ' L58 -56 L4 -56 Z" fill="#bcd6e6" opacity=".75"/>';
  if (o.hatch) z += '<path d="M-80 -75 L-4 -75 L-4 -56 L-96 -56 Z" fill="#bcd6e6" stroke="' + INK + '" stroke-width="2.5"/>';
  else z += '<path d="M-24 -75 L-4 -75 L-4 -56 L-44 -56 Z" fill="#bcd6e6" stroke="' + INK + '" stroke-width="2.5"/>';
  if (o.sunroof) z += '<rect x="-8" y="-84" width="34" height="6" rx="2" fill="#26323c" stroke="' + INK + '" stroke-width="2"/>';
  z += '<path d="M0 -56 L0 -18 M60 -54 L62 -18" stroke="' + INK + '" stroke-width="2" opacity=".6"/>';
  z += '<rect x="12" y="-46" width="12" height="4" rx="2" fill="#26323c"/>';
  z += '<ellipse cx="106" cy="-40" rx="5" ry="6" fill="#fff6c8" stroke="' + INK + '" stroke-width="2"/>';
  z += '<rect x="-112" y="-46" width="6" height="10" rx="2" fill="' + (o.brake ? "#ff3b2a" : "#a82a1e") + '" stroke="' + INK + '" stroke-width="2"/>';
  if (o.brake) z += '<circle cx="-112" cy="-41" r="14" fill="#ff3b2a" opacity="' + f(0.35 + 0.2 * Math.sin(t * 10)) + '" filter="url(#glow)"/>';
  // شنطة الهاتشباك بتتفتح
  if (o.hatch && o.hatchOpen) {
    var a = lerp(131, 196, o.hatchOpen);
    z += '<path d="M-84 -80 L-110 -50 L-110 -22 L-104 -22 L-104 -48 L-80 -76 Z" fill="#26323c" opacity="' + f(o.hatchOpen) + '"/>';
    z += '<g transform="translate(-84 -80) rotate(' + f(a) + ')"><rect x="0" y="-4" width="44" height="9" rx="3" fill="' + col + '" ' + sw + '/><rect x="6" y="-2" width="26" height="4" fill="#bcd6e6"/></g>';
  }
  var rot = (o.roll || 0) / 18 * 57.3;
  [-70, 70].forEach(function (wx) {
    z += '<g transform="translate(' + wx + ' -14) rotate(' + f(rot) + ')"><circle r="18" fill="#26262a" stroke="' + INK + '" stroke-width="3"/><circle r="9" fill="#b9bec4" stroke="' + INK + '" stroke-width="2"/><path d="M-8 0 H8 M0 -8 V8" stroke="' + INK + '" stroke-width="2"/></g>';
  });
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">' + z + '</g>';
}

// ── عربية من فوق، بصّة لليمين. o: {fold (0..1 المرايات مقفولة), door (درجات فتح الباب اللي فوق), brake, roofOpen}
function carTop(x, y, s, col, t, o) {
  o = o || {}; var z = "", sw = 'stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"';
  var mo = 11 * (1 - (o.fold || 0));
  [-1, 1].forEach(function (sd) {
    z += '<g transform="translate(36 ' + (sd * 48) + ') rotate(' + f(-sd * 70 * (o.fold || 0)) + ')"><rect x="-4" y="' + (sd > 0 ? 0 : -12) + '" width="10" height="12" rx="3" fill="' + col + '" ' + sw + '/></g>';
  });
  if (o.door) z += '<g transform="translate(34 -49) rotate(' + f(-o.door) + ')"><rect x="-56" y="-4" width="56" height="7" rx="3" fill="' + col + '" ' + sw + '/></g>';
  z += '<rect x="-110" y="-50" width="220" height="100" rx="26" fill="' + col + '" ' + sw + '/>';
  z += '<path d="M28 -40 L56 -34 L56 34 L28 40 Z" fill="#bcd6e6" stroke="' + INK + '" stroke-width="2.5"/>';
  z += '<path d="M-66 -36 L-50 -38 L-50 38 L-66 36 Z" fill="#bcd6e6" stroke="' + INK + '" stroke-width="2.5"/>';
  z += '<rect x="-50" y="-40" width="78" height="80" rx="8" fill="#fff" opacity=".18"/>';
  if (o.roofOpen) z += '<rect x="-14" y="-18" width="34" height="36" rx="4" fill="#26323c" stroke="' + INK + '" stroke-width="2"/>';
  z += '<path d="M-2 -50 V-44 M34 -50 V-44 M-2 50 V44 M34 50 V44" stroke="' + INK + '" stroke-width="2"/>';
  z += '<rect x="102" y="-40" width="8" height="14" rx="3" fill="#fff6c8" stroke="' + INK + '" stroke-width="2"/><rect x="102" y="26" width="8" height="14" rx="3" fill="#fff6c8" stroke="' + INK + '" stroke-width="2"/>';
  var bc = o.brake ? "#ff3b2a" : "#a82a1e";
  z += '<rect x="-110" y="-40" width="7" height="14" rx="3" fill="' + bc + '" stroke="' + INK + '" stroke-width="2"/><rect x="-110" y="26" width="7" height="14" rx="3" fill="' + bc + '" stroke="' + INK + '" stroke-width="2"/>';
  if (o.brake) z += '<circle cx="-112" cy="-33" r="12" fill="#ff3b2a" opacity="' + f(0.4 + 0.2 * Math.sin(t * 10)) + '" filter="url(#glow)"/><circle cx="-112" cy="33" r="12" fill="#ff3b2a" opacity="' + f(0.4 + 0.2 * Math.sin(t * 10)) + '" filter="url(#glow)"/>';
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + (s || 1) + ')">' + z + '</g>';
}

// ── الكونتينر من جوه (مقطع جانبي): أرضيته عند y، من x0 لـx0+len، ارتفاعه 132، والباب المفتوح يمين
function ctrIn(x0, y, len, t, doors) {
  var z = '<rect x="' + f(x0 - 10) + '" y="' + f(y - 142) + '" width="' + f(len + 20) + '" height="160" fill="' + CTR + '" stroke="' + INK + '" stroke-width="3"/>';
  z += '<rect x="' + f(x0) + '" y="' + f(y - 132) + '" width="' + f(len) + '" height="132" fill="' + CTR2 + '"/>';
  for (var i = x0 + 12; i < x0 + len; i += 16) z += '<rect x="' + f(i) + '" y="' + f(y - 132) + '" width="6" height="132" fill="#000" opacity=".12"/>';
  z += '<rect x="' + f(x0) + '" y="' + f(y - 132) + '" width="' + f(len) + '" height="132" fill="url(#ctrShade)"/>';
  z += '<rect x="' + f(x0) + '" y="' + f(y) + '" width="' + f(len) + '" height="8" fill="' + WOOD + '" stroke="' + INK + '" stroke-width="2"/>';
  if (doors !== false) z += '<path d="M' + f(x0 + len + 10) + ' ' + f(y - 142) + ' l26 10 l0 150 l-26 -2 Z" fill="' + CTR3 + '" stroke="' + INK + '" stroke-width="3"/>';
  return z;
}
// الكونتينر من بره (جنب)، من x0، أرضيته عند y
function ctrOut(x0, y, len, h, col) {
  h = h || 140; col = col || CTR;
  var z = '<rect x="' + f(x0) + '" y="' + f(y - h) + '" width="' + f(len) + '" height="' + h + '" fill="' + col + '" stroke="' + INK + '" stroke-width="3"/>';
  for (var i = x0 + 10; i < x0 + len - 6; i += 12) z += '<rect x="' + f(i) + '" y="' + f(y - h + 8) + '" width="5" height="' + (h - 16) + '" fill="#000" opacity=".13"/>';
  z += '<rect x="' + f(x0) + '" y="' + f(y - h) + '" width="' + f(len) + '" height="8" fill="#000" opacity=".15"/>';
  return z;
}
// الكونتينر من فوق (مقطع): الحيطان فوق وتحت، مقفول شمال، مفتوح يمين. العرض الداخلي w
function ctrTop(x0, yc, len, w) {
  var z = '<rect x="' + f(x0) + '" y="' + f(yc - w / 2) + '" width="' + f(len) + '" height="' + f(w) + '" fill="' + WOOD + '"/>';
  for (var i = yc - w / 2 + 12; i < yc + w / 2; i += 14) z += '<path d="M' + f(x0) + ' ' + f(i) + ' H' + f(x0 + len) + '" stroke="' + WOOD2 + '" stroke-width="1.5" opacity=".6"/>';
  z += '<rect x="' + f(x0 - 12) + '" y="' + f(yc - w / 2 - 12) + '" width="' + f(len + 12) + '" height="12" fill="' + CTR + '" stroke="' + INK + '" stroke-width="3"/>';
  z += '<rect x="' + f(x0 - 12) + '" y="' + f(yc + w / 2) + '" width="' + f(len + 12) + '" height="12" fill="' + CTR + '" stroke="' + INK + '" stroke-width="3"/>';
  z += '<rect x="' + f(x0 - 12) + '" y="' + f(yc - w / 2) + '" width="12" height="' + f(w) + '" fill="' + CTR + '" stroke="' + INK + '" stroke-width="3"/>';
  return z;
}
// سهم مقاس بسنّين من الناحيتين
function dim(x1, y1, x2, y2, col, p) {
  p = clamp(p == null ? 1 : p); if (p <= 0) return "";
  var mx = (x1 + x2) / 2, my = (y1 + y2) / 2, ax = lerp(mx, x1, p), ay = lerp(my, y1, p), bx = lerp(mx, x2, p), by = lerp(my, y2, p);
  var z = '<path d="M' + f(ax) + ' ' + f(ay) + ' L' + f(bx) + ' ' + f(by) + '" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/><path d="M' + f(ax) + ' ' + f(ay) + ' L' + f(bx) + ' ' + f(by) + '" stroke="' + col + '" stroke-width="4" stroke-linecap="round"/>';
  var nx = -(y2 - y1), ny = x2 - x1, nl = Math.sqrt(nx * nx + ny * ny) || 1; nx = nx / nl * 9; ny = ny / nl * 9;
  if (p >= 1) z += '<path d="M' + f(x1 - nx) + ' ' + f(y1 - ny) + ' L' + f(x1 + nx) + ' ' + f(y1 + ny) + ' M' + f(x2 - nx) + ' ' + f(y2 - ny) + ' L' + f(x2 + nx) + ' ' + f(y2 + ny) + '" stroke="' + col + '" stroke-width="4" stroke-linecap="round"/>';
  return z;
}
function chip(text, x, y, u, u0, col, size) {   // رقم في كارت أبيض بيظهر بنطّة
  var k = pop((u - u0) / 0.8); if (k <= 0) return ""; size = size || 22; var w = text.length * size * 0.55 + 26;
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')"><rect x="' + f(-w / 2) + '" y="' + f(-size * 0.95) + '" width="' + f(w) + '" height="' + f(size * 1.6) + '" rx="10" fill="#fbfaf4" stroke="' + INK + '" stroke-width="3"/>' + label(text, 0, size * 0.35, size, col || INK, 900) + '</g>';
}
// ونش ميناء (جانتري) بيتحرك ترولي فوق
function crane(x, y, t, s) {
  var z = '<path d="M-60 0 L-50 -170 M60 0 L50 -170" stroke="#e2b035" stroke-width="10"/><path d="M-60 0 L-50 -170 M60 0 L50 -170" stroke="' + INK + '" stroke-width="2" opacity=".5"/>';
  z += '<rect x="-120" y="-182" width="260" height="16" fill="#e2b035" stroke="' + INK + '" stroke-width="3"/>';
  for (var i = -110; i < 135; i += 20) z += '<path d="M' + i + ' -182 l10 16" stroke="' + INK + '" stroke-width="1.6" opacity=".5"/>';
  var tx = Math.sin(t * 0.6) * 60;
  z += '<rect x="' + f(tx - 14) + '" y="-170" width="28" height="12" fill="#8a8f96" stroke="' + INK + '" stroke-width="2"/><path d="M' + f(tx) + ' -158 V-110" stroke="' + INK + '" stroke-width="2"/>';
  return g(x, y, s || 1, z);
}
function ship(x, y, t, s, rock) {   // مركب حاويات بيتمايل
  var a = Math.sin(t * 1.3) * (rock || 3), z = "";
  var cols = [CTR, "#2f6f9f", "#4f8f5a", "#e2b035", "#8f2618"];
  for (var r = 0; r < 3; r++) for (var c = 0; c < 6; c++) z += '<rect x="' + (-150 + c * 46) + '" y="' + (-62 - r * 22) + '" width="44" height="20" fill="' + cols[(r * 3 + c) % 5] + '" stroke="' + INK + '" stroke-width="2"/>';
  z += '<rect x="130" y="-110" width="34" height="50" fill="#f4f1e8" stroke="' + INK + '" stroke-width="3"/><rect x="136" y="-102" width="22" height="8" fill="#26323c"/>';
  z += '<path d="M-190 -40 L200 -40 L176 20 L-170 20 Z" fill="#26323c" stroke="' + INK + '" stroke-width="3"/><path d="M-184 -2 L188 -2" stroke="#c23a26" stroke-width="8"/>';
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(a) + ') scale(' + (s || 1) + ')">' + z + '</g>';
}
function ground(y, col) { return '<rect x="-400" y="' + y + '" width="1440" height="400" fill="' + (col || "#9aa0a6") + '"/><path d="M-400 ' + y + ' H1040" stroke="' + INK + '" stroke-width="3"/>'; }
function port(t) { return sky("day") + clouds(t, 12, 40, 4, 0.9) + sea(t, 250) + '<rect x="-400" y="268" width="1440" height="200" fill="#9aa0a6"/><path d="M-400 268 H1040" stroke="' + INK + '" stroke-width="3"/>'; }
function shedBg(t) { return fill("#d8cdb6") + '<rect x="-400" y="-300" width="1440" height="560" fill="#cfc3aa"/>' + (function () { var s = ""; for (var i = -400; i < 1040; i += 60) s += '<rect x="' + i + '" y="-300" width="4" height="560" fill="#bfb398"/>'; return s; })() + ground(260, "#a7a39b"); }

// ══ المشاهد ══════════════════════════════════════════

// 0) عربية في الميناء رايحة ناحية كونتينر مفتوح، وزيزو مستغرب
shot(0, camPush(320, 190, 1, 1.12), function (u, d, t) {
  var cx = lerp(-60, 170, ease(u / d));
  return port(t) + crane(470, 268, t, 0.9) + ctrOut(360, 290, 250, 130, CTR) + '<rect x="600" y="166" width="14" height="124" fill="' + CTR2 + '" stroke="' + INK + '" stroke-width="3"/>'
    + carSide(cx, 300, 0.75, CARC, t, { roll: cx }) + zizo(310, 300, 0.14, t, { mood: "worry" }) + qmark(310, 160, t, 40)
    + tag("الكونتينر", 485, 120, u, 0.9, -3) + tag("والسواق؟", 170, 110, u, 2.6, 3);
});

// 1) الكونتينر من فوق: العرض الداخلي
shot(1, camPush(320, 180, 1.05, 1.15), function (u, d, t) {
  return fill("#e9e2d2") + ctrTop(80, 180, 640, 130) + dim(250, 120, 250, 240, "#f2c230", ease((u - 0.6) / 1.2))
    + chip("2.35 م", 340, 186, u, 1.6, INK, 24) + pulse(250, 120, t, "#f2c230", 8) + pulse(250, 240, t, "#f2c230", 8)
    + tag("من جوه", 250, 70, u, 0.5, -2);
});

// 2) العربية جوه: عرضها 1.80، والباب مش لاقي مكان
shot(2, camPush(300, 180, 1, 1.12), function (u, d, t) {
  var cx = lerp(820, 330, ease(u / 1.8)), door = u > 2.8 ? Math.min(14, (u - 2.8) * 25) + Math.sin(t * 18) * (u > 3.4 ? 1.5 : 0) : 0;
  return fill("#e9e2d2") + ctrTop(80, 180, 640, 130) + carTop(cx, 180, 0.9, CARC, t, { door: door })
    + dim(cx + 130, 135, cx + 130, 225, "#3a8fd9", ease((u - 1.6) / 1))
    + chip("1.80 م", cx + 200, 186, u, 2.2, "#2f6f9f", 22) + cross(cx + 10, 110, u, 3.6, 0.8);
});

// 3) الونش بينزّل الكونتينر جنب رصيف تحميل على نفس الارتفاع
shot(3, camPush(320, 200, 1, 1.08), function (u, d, t) {
  var hy = lerp(150, 290, ease((u - 0.3) / 2.2));
  return port(t) + '<path d="M60 290 L60 220 L250 220 L250 290 Z" fill="#b9b3a6" stroke="' + INK + '" stroke-width="3"/>' + '<path d="M60 230 H250" stroke="#f2c230" stroke-width="6" stroke-dasharray="14 10"/>'
    + crane(400, 290, 0, 1.05) + '<path d="M330 ' + f(hy - 145) + ' L400 ' + f(hy - 190) + ' L470 ' + f(hy - 145) + '" stroke="' + INK + '" stroke-width="2" fill="none"/>'
    + ctrOut(255, hy, 290, 70, CTR)
    + tag("رصيف تحميل", 155, 180, u, 2.4, -3) + (u > 2.6 ? arrow(250, 200, 300, 200, "#f2c230", 5, ease((u - 2.6) / 0.6)) : "");
});

// 4) رامبة حديد والعجل بيطلع عليها
shot(4, camPush(330, 220, 1.05, 1.2), function (u, d, t) {
  var k = ease(u / d), cx = lerp(620, 300, k), lift = clamp((560 - cx) / 90) * 22, tilt = cx > 470 && cx < 560 ? -8 : 0;
  return shedBg(t) + ctrIn(60, 238, 400, t, false) + '<path d="M470 238 L560 260 L470 260 Z" fill="#8a8f96" stroke="' + INK + '" stroke-width="3"/>'
    + (function () { var s = ""; for (var i = 480; i < 555; i += 12) s += '<path d="M' + i + ' ' + f(240 + (i - 470) * 0.24) + ' l0 4" stroke="' + INK + '" stroke-width="2"/>'; return s; })()
    + '<g transform="translate(' + f(cx) + ' ' + f(260 - lift) + ') rotate(' + f(tilt) + ')">' + carSide(0, 0, 0.75, CARC, t, { roll: -cx }).replace(/^<g transform="translate\([^)]*\)/, '<g transform="translate(0 0)') + '</g>'
    + tag("رامبة حديد", 520, 300, u, 0.8, 2) + pulse(500, 248, t, "#f2c230", 10);
});

// 5) المرايات بتتقفل
shot(5, camPush(330, 180, 1.4, 1.6), function (u, d, t) {
  var fold = ease((u - 0.8) / 1.4);
  return fill("#e9e2d2") + ctrTop(-200, 180, 900, 130) + carTop(280, 180, 1, CAR3, t, { fold: fold })
    + pulse(315, 125, t, "#f2c230", 8) + pulse(315, 235, t, "#f2c230", 8) + tag("المرايات", 300, 85, u, 0.6, -2) + chip("كل سنتي فارق", 420, 290, u, 2.6, "#c23a26", 18);
});

// 6) عداد البنزين بينزل للربع
shot(6, camPush(320, 190, 1, 1.1), function (u, d, t) {
  var lvl = lerp(0.9, 0.25, ease((u - 0.4) / 2)), a = lerp(-80, 80, lvl) + Math.sin(t * 8) * 1.2, z = "";
  z += '<circle cx="320" cy="210" r="130" fill="#26262a" stroke="' + INK + '" stroke-width="5"/><circle cx="320" cy="210" r="118" fill="#1b1d22"/>';
  for (var i = 0; i <= 4; i++) { var aa = (-80 + i * 40) * Math.PI / 180; z += '<path d="M' + f(320 + Math.sin(aa) * 92) + ' ' + f(210 - Math.cos(aa) * 92) + ' L' + f(320 + Math.sin(aa) * 110) + ' ' + f(210 - Math.cos(aa) * 110) + '" stroke="#f4f1e8" stroke-width="5"/>'; }
  z += label("E", 222, 200, 26, "#e8443a") + label("F", 418, 200, 26, "#f4f1e8") + label("½", 320, 112, 20, "#f4f1e8") + label("¼", 255, 136, 20, "#f2c230");
  z += '<g transform="translate(320 210) rotate(' + f(a) + ')"><path d="M-5 0 L0 -100 L5 0 Z" fill="#f28c28" stroke="' + INK + '" stroke-width="2"/></g><circle cx="320" cy="210" r="14" fill="#8a8f96" stroke="' + INK + '" stroke-width="3"/>';
  z += '<path d="M300 260 h40 v34 h-40 z M340 268 l10 6 v16" fill="none" stroke="#f4f1e8" stroke-width="4"/>';
  return fill("#3a4250") + z + tag("ربع التانك", 520, 90, u, 2.2, 3) + (u > 2.4 ? pulse(255, 130, t, "#f2c230", 12) : "");
});

// 7) السواق بيدخل بالراحة، وواحد برا بيوجهه
shot(7, camPush(380, 220, 1.05, 1.15), function (u, d, t) {
  var cx = lerp(600, 380, ease(u / d));
  return shedBg(t) + ctrIn(40, 260, 470, t) + carSide(cx, 260, 0.75, CARC, t, { roll: -cx })
    + person(580, 262, t, { s: 0.7, pose: "wave", hat: "hard", shirt: "#e2b035", mood: "n", look: -1 })
    + tag("بالراحة جدًا", 300, 112, u, 0.8, -2) + arrow(560, 120, 500, 120, "#f2c230", 5, ease((u - 1.4) / 0.8));
});

// 8) من فوق: المسافة على الجنبين أقل من عشرين سنتي
shot(8, camPush(330, 180, 1.15, 1.35), function (u, d, t) {
  var gl = 0.5 + 0.4 * Math.sin(t * 6);
  return fill("#e9e2d2") + ctrTop(40, 180, 640, 130) + carTop(330, 180, 1.0, CARC, t, { fold: 1 })
    + '<rect x="220" y="116" width="220" height="14" fill="#e8443a" opacity="' + f(gl * clamp(u - 0.6)) + '"/><rect x="220" y="230" width="220" height="14" fill="#e8443a" opacity="' + f(gl * clamp(u - 0.6)) + '"/>'
    + chip("أقل من 20 سم", 330, 300, u, 1.8, "#c23a26", 20) + chip("أقل من 20 سم", 330, 66, u, 2.2, "#c23a26", 20);
});

// 9) العربية وصلت للآخر وفرملت
shot(9, camPush(260, 220, 1.05, 1.2), function (u, d, t) {
  var cx = lerp(330, 170, ease(u / 2));
  return shedBg(t) + ctrIn(40, 260, 470, t) + carSide(cx, 260, 0.75, CARC, t, { roll: -cx, brake: u > 1.8, driverMood: u > 2.2 ? "worry" : "happy" })
    + (u > 2.4 ? qmark(cx, 110, t, 44, "#f2c230") : "") + tag("المشكلة", 420, 80, u, 2.2, -3, 23, "#e8443a");
});

// 10) الباب بيخبط في الحيطة بعد كام سنتي
shot(10, camPush(360, 160, 1.4, 1.7), function (u, d, t) {
  var tries = u > 0.5 ? Math.abs(Math.sin((u - 0.5) * 3.2)) : 0, door = Math.min(12, tries * 14);
  return fill("#e9e2d2") + ctrTop(40, 180, 640, 130) + carTop(330, 180, 1.0, CARC, t, { fold: 1, door: door })
    + (door > 10 ? '<circle cx="320" cy="116" r="10" fill="#f2c230" opacity=".8" filter="url(#glow)"/>' : "")
    + chip("كام سنتي بس", 330, 290, u, 1.2, "#c23a26", 20) + cross(250, 70, u, 2.4, 0.8);
});

// 11) زي الأفلام: بيخرج من الشباك
shot(11, camPush(400, 200, 1.4, 1.75), function (u, d, t) {
  return shedBg(t) + ctrIn(40, 260, 470, t) + carSide(330, 260, 0.75, CARC, t, { win: ease((u - 0.8) / 1.5), driverMood: "happy" })
    + '<g transform="translate(530 150) rotate(-8)"><rect x="-34" y="-8" width="68" height="44" fill="#26262a" stroke="' + INK + '" stroke-width="3"/><g transform="rotate(' + f(-18 + Math.abs(Math.sin(t * 4)) * 18) + ' -34 -8)"><rect x="-34" y="-20" width="68" height="12" fill="#f4f1e8" stroke="' + INK + '" stroke-width="3"/></g></g>'
    + tag("الشباك", 290, 125, u, 2.4, 3) + sparkle(530, 150, t, "#f2c230", 5);
});

// 12) بيطلع من الشباك نايم على جنبه، وبعدين يقف برا العربية
shot(12, camPush(380, 200, 1.35, 1.55), function (u, d, t) {
  var k = ease((u - 0.3) / 2.8), out = u > 3.3;
  var z = shedBg(t) + ctrIn(40, 260, 470, t) + carSide(330, 260, 0.75, CARC, t, { win: 1, noDriver: true });
  if (!out) z += '<g clip-path="url(#winOut)">' + g(lerp(290, 400, k), 211 + Math.sin(t * 9) * 1.2, 1, zizo(0, 0, 0.11, t, { mood: "worry", arms: "reach" }), 90) + '</g>';
  else z += zizo(470, 262, 0.12, t, { mood: "happy", arms: "up" });
  return z + tag("يزحف", 300, 120, u, 1.2, -3) + arrow(360, 150, 460, 150, "#f2c230", 5, ease((u - 1.4) / 0.8));
});

// 13) من فتحة السقف، يزحف فوق العربية، وينزل عند الباب
shot(13, camPush(400, 190, 1.25, 1.45), function (u, d, t) {
  var up = ease((u - 0.4) / 1.4), walk = ease((u - 2.0) / 1.8), drop = ease((u - 3.9) / 0.9);
  var z = shedBg(t) + ctrIn(40, 260, 470, t);
  if (walk <= 0) z += '<g clip-path="url(#roofCut)">' + zizo(335, lerp(240, 212, up), 0.11, t, { mood: "happy", arms: "up" }) + '</g>';
  z += carSide(330, 260, 0.75, CAR2, t, { sunroof: true, noDriver: true });
  if (walk > 0 && drop <= 0) z += g(lerp(290, 335, walk), 188 + Math.sin(t * 10) * 1.5, 1, zizo(0, 0, 0.11, t, { mood: "happy", arms: "reach" }), 90);
  if (drop > 0) z += zizo(lerp(430, 470, drop), lerp(215, 262, drop) - Math.sin(drop * 3.14) * 10, 0.12, t, { mood: "happy", arms: drop > 0.9 ? "up" : "reach" });
  return z + tag("فتحة سقف", 300, 112, u, 0.8, -2) + arrow(330, 150, 450, 150, "#f2c230", 5, ease((u - 2.2) / 0.8));
});

// 14) هاتشباك: بينط ورا ويخرج من الشنطة
shot(14, camPush(250, 200, 1.25, 1.45), function (u, d, t) {
  var op = ease((u - 0.6) / 1.2), k = ease((u - 1.9) / 1.8), stand = u > 3.9;
  var z = shedBg(t) + ctrIn(150, 260, 400, t, false) + '<rect x="-400" y="118" width="540" height="160" fill="#d8cdb6"/>';
  z += carSide(380, 260, 0.75, CAR3, t, { hatch: true, hatchOpen: op, noDriver: true });
  if (!stand && k > 0) z += '<g clip-path="url(#hatchOut)">' + g(lerp(370, 300, k), 222 + Math.sin(t * 9) * 1.2, 1, zizo(0, 0, 0.11, t, { mood: "happy", arms: "reach" }), -90) + '</g>';
  if (stand) z += zizo(240, 262, 0.12, t, { mood: "happy", arms: "up" });
  return z + tag("الشنطة", 230, 120, u, 1.2, 3) + arrow(320, 150, 250, 150, "#f2c230", 5, ease((u - 2.2) / 0.8));
});

// 15) الكونتينر الأربعين قدم: 12 متر
shot(15, camPan(200, 440, 190, 1.05), function (u, d, t) {
  return port(t) + ctrOut(-20, 280, 660, 150, "#2f6f9f") + dim(-20, 105, 640, 105, "#f2c230", ease((u - 0.6) / 1.5))
    + chip("12 متر", 320, 200, u, 2, INK, 28) + tag("40 قدم", 120, 60, u, 0.6, -3);
});

// 16) عربيتين أو تلاتة ورا بعض
shot(16, camPush(320, 210, 1, 1.05), function (u, d, t) {
  var z = shedBg(t) + ctrIn(20, 260, 600, t, false), cols = [CARC, CAR2, CAR3];
  for (var i = 0; i < 3; i++) { var k = ease((u - i * 0.8) / 1.4), cx = lerp(780, 120 + i * 185, k); z += carSide(cx, 260, 0.75, cols[i], t, { roll: -cx }); }
  return z + counter(320, 90, u, 0.5, 2.4, 1, 3, " عربيات", 28, "#f2c230");
});

// 17) الراكات: سكك حديد مايلة
shot(17, camPush(320, 200, 1.05, 1.18), function (u, d, t) {
  var p = ease((u - 0.6) / 1.6), z = shedBg(t) + ctrIn(40, 260, 560, t, false);
  [[90, 300], [350, 560]].forEach(function (r) {
    var x1 = r[0], x2 = lerp(r[0], r[1], p), y1 = 252, y2 = lerp(252, 175, p);
    z += '<path d="M' + x1 + ' ' + y1 + ' L' + f(x2) + ' ' + f(y2) + '" stroke="' + INK + '" stroke-width="12" stroke-linecap="round"/><path d="M' + x1 + ' ' + y1 + ' L' + f(x2) + ' ' + f(y2) + '" stroke="#e2b035" stroke-width="7" stroke-linecap="round"/>';
    z += '<path d="M' + f(x2) + ' ' + f(y2) + ' L' + f(x2) + ' 260" stroke="#8a8f96" stroke-width="7"/>';
  });
  return z + tag("الراكات", 320, 80, u, 1.2, -2) + sparkle(300, 175, t, "#f2c230", 4);
});

// 18) العربية تطلع على الراك وقدامها يترفع
shot(18, camPush(300, 200, 1.1, 1.25), function (u, d, t) {
  var cx = lerp(600, 290, ease(u / 1.8)), a = -24 * ease((u - 2.2) / 1.6), lift = -a * 2.2;
  var z = shedBg(t) + ctrIn(40, 260, 560, t, false);
  z += '<g transform="translate(' + f(cx - 80) + ' 252) rotate(' + f(a) + ')"><rect x="0" y="-4" width="200" height="8" fill="#e2b035" stroke="' + INK + '" stroke-width="3"/>' + carSide(80, -4, 0.75, CARC, t, { roll: -cx }) + '</g>';
  z += '<path d="M' + f(cx + 110) + ' ' + f(252 - lift * 1.6) + ' L' + f(cx + 110) + ' 260" stroke="#8a8f96" stroke-width="8"/>';
  return z + (u > 2.2 ? arrow(cx + 150, 230, cx + 150, 150, "#f2c230", 5, ease((u - 2.2) / 0.8)) : "") + tag("مايلة", 470, 90, u, 2.8, 3);
});

// 19) عربية تانية تحتها، والعدد يبقى أربعة
shot(19, camPush(320, 190, 1.0, 1.1), function (u, d, t) {
  var z = shedBg(t) + ctrIn(20, 260, 600, t, false);
  [[150, CARC], [440, CAR3]].forEach(function (c) { z += '<g transform="translate(' + (c[0] - 80) + ' 252) rotate(-24)"><rect x="0" y="-4" width="200" height="8" fill="#e2b035" stroke="' + INK + '" stroke-width="3"/>' + carSide(80, -4, 0.75, c[1], t, { noDriver: true }) + '</g><path d="M' + (c[0] + 98) + ' 172 L' + (c[0] + 98) + ' 260" stroke="#8a8f96" stroke-width="8"/>'; });
  var k1 = ease((u - 0.3) / 1.6), k2 = ease((u - 1.3) / 1.6);
  z += carSide(lerp(780, 190, k1), 262, 0.62, CAR2, t, { roll: -k1 * 600 }) + carSide(lerp(900, 470, k2), 262, 0.62, "#8f2618", t, { roll: -k2 * 400 });
  return z + chip(u > 3.2 ? "4 عربيات" : "2 عربيات", 320, 70, u, 0.4, u > 3.2 ? "#4f9f5a" : INK, 26) + (u > 3.2 ? sparkle(320, 70, t, "#f2c230", 6) : "");
});

// 20) حزام بيتشد على العجلة
shot(20, camPush(320, 190, 1.05, 1.15), function (u, d, t) {
  var tight = ease((u - 0.8) / 2.4), sag = (1 - tight) * 30, rk = Math.sin(t * 9) * (tight < 1 && u > 0.8 ? 14 : 0), z = shedBg(t);
  z += '<rect x="-400" y="270" width="1440" height="30" fill="' + WOOD + '"/>';
  z += '<g transform="translate(320 180) rotate(' + f(t * 2) + ')"><circle r="90" fill="#26262a" stroke="' + INK + '" stroke-width="4"/><circle r="50" fill="#b9bec4" stroke="' + INK + '" stroke-width="3"/>';
  for (var i = 0; i < 5; i++) z += '<path d="M0 0 L' + f(Math.cos(i * 1.2566) * 44) + ' ' + f(Math.sin(i * 1.2566) * 44) + '" stroke="#8a8f96" stroke-width="10"/>';
  z += '<circle r="12" fill="#8a8f96" stroke="' + INK + '" stroke-width="2"/></g>';
  z += '<path d="M180 276 Q' + f(230 - sag) + ' ' + f(140 - sag) + ' 320 ' + f(90 - sag * 0.3) + ' Q' + f(410 + sag) + ' ' + f(140 - sag) + ' 460 276" fill="none" stroke="' + INK + '" stroke-width="17"/>';
  z += '<path d="M180 276 Q' + f(230 - sag) + ' ' + f(140 - sag) + ' 320 ' + f(90 - sag * 0.3) + ' Q' + f(410 + sag) + ' ' + f(140 - sag) + ' 460 276" fill="none" stroke="#f2c230" stroke-width="12"/>';
  z += '<rect x="168" y="266" width="24" height="14" fill="#8a8f96" stroke="' + INK + '" stroke-width="2"/><rect x="448" y="266" width="24" height="14" fill="#8a8f96" stroke="' + INK + '" stroke-width="2"/>';
  z += '<g transform="translate(424 220) rotate(' + f(-30 + rk) + ')"><rect x="-8" y="-40" width="16" height="44" rx="4" fill="#c23a26" stroke="' + INK + '" stroke-width="2.5"/></g>';
  return z + tag("حزام مشدود", 150, 80, u, 1.6, -3) + bar(470, 70, 120, 14, tight, "#4f9f5a", "#e8e4da");
});

// 21) قطع خشب بتتدق قدام وورا العجل
shot(21, camPush(320, 200, 1.05, 1.15), function (u, d, t) {
  var hit = (t * 2.2) % 1, ha = hit < 0.7 ? lerp(-60, 10, ease(hit / 0.7)) : lerp(10, -60, (hit - 0.7) / 0.3), z = shedBg(t);
  z += '<rect x="-400" y="270" width="1440" height="30" fill="' + WOOD + '"/>';
  z += '<g transform="translate(320 200)"><circle r="70" fill="#26262a" stroke="' + INK + '" stroke-width="4"/><circle r="38" fill="#b9bec4" stroke="' + INK + '" stroke-width="3"/></g>';
  [[220, 1], [420, -1]].forEach(function (w) { z += '<path d="M' + (w[0] - 30) + ' 270 L' + (w[0] + 30) + ' 270 L' + (w[0] + w[1] * 30) + ' 232 Z" fill="#d9a35f" stroke="' + INK + '" stroke-width="3"/>'; });
  z += '<g transform="translate(470 150) rotate(' + f(ha) + ')"><rect x="-5" y="0" width="10" height="90" rx="3" fill="#7a5a3a" stroke="' + INK + '" stroke-width="2.5"/><rect x="-24" y="80" width="48" height="22" rx="3" fill="#8a8f96" stroke="' + INK + '" stroke-width="2.5"/></g>';
  return z + (hit > 0.65 && hit < 0.8 ? sparkle(430, 240, t, "#f2c230", 4) : "") + tag("قطع خشب", 200, 80, u, 0.8, -3);
});

// 22) المركب بيتمايل في البحر
shot(22, camPush(320, 190, 1, 1.1), function (u, d, t) {
  var a = Math.sin(t * 1.3) * 5;
  var z = sky("dusk") + clouds(t, 18, 40, 4, 0.7) + sea(t, 230) + ship(320, 240, t, 0.9, 5);
  z += '<g transform="translate(520 100)"><circle r="62" fill="#fbfaf4" stroke="' + INK + '" stroke-width="4"/><g clip-path="url(#insetClip)">' + ctrIn(-70, 40, 140, t, false) + carSide(Math.sin(t * 1.3) * 10, 40, 0.42, CARC, t, { noDriver: true }) + '</g></g>';
  return z + tag("بتتمايل", 160, 80, u, 0.8, -3) + (u > 2 ? cross(565, 150, u, 2.2, 0.6) : "");
});

// 23) الباب بيتقفل وعليه سيل
shot(23, camPush(320, 190, 1.0, 1.15), function (u, d, t) {
  var cl = ease((u - 0.2) / 1.6), z = shedBg(t);
  z += '<rect x="150" y="50" width="340" height="210" fill="' + CTR2 + '" stroke="' + INK + '" stroke-width="3"/>';
  [[150, 1], [490, -1]].forEach(function (s) {
    var w = 170 * lerp(0.15, 1, cl);
    z += '<rect x="' + f(s[1] > 0 ? s[0] : s[0] - w) + '" y="50" width="' + f(w) + '" height="210" fill="' + CTR + '" stroke="' + INK + '" stroke-width="3"/>';
    for (var i = 1; i < 6; i++) { var xx = s[1] > 0 ? s[0] + w * i / 6 : s[0] - w * i / 6; z += '<path d="M' + f(xx) + ' 60 V250" stroke="#000" stroke-opacity=".15" stroke-width="5"/>'; }
  });
  if (cl > 0.95) {
    z += '<path d="M300 70 V240 M340 70 V240" stroke="#8a8f96" stroke-width="7"/><rect x="290" y="150" width="60" height="16" rx="4" fill="#8a8f96" stroke="' + INK + '" stroke-width="2.5"/>';
    var k = pop((u - 2.2) / 0.8);
    if (k > 0) z += '<g transform="translate(320 178) scale(' + f(k) + ')"><rect x="-8" y="-6" width="16" height="40" rx="4" fill="#e8443a" stroke="' + INK + '" stroke-width="2.5"/><rect x="-20" y="22" width="40" height="18" rx="4" fill="#f4f1e8" stroke="' + INK + '" stroke-width="2.5"/>' + label("0457", 0, 36, 12, INK, 800) + '</g>' + pulse(320, 200, t, "#f2c230", 12);
  }
  return z + tag("سيل", 450, 300, u, 2.4, 3) + tag("بلد الوصول", 170, 300, u, 3.2, -3, 21, "#f2c230");
});
