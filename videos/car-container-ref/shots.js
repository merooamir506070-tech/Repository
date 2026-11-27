// «إزاي بيدخلوا العربية جوه الكونتينر؟» — بأسلوب الفيديو المرجع (شاشة عمودية كاملة 360×640)
// المقياس من فوق: متر = 60 وحدة. من الجنب: متر = 50 وحدة.
var OL = "#2b2f36";                       // لون الخط
var ASPH = "#5b6169", ASPH2 = "#545a62", LANE = "#c9ccd0";
var BLUE = "#2e5f86", BLUE2 = "#244d6e", BLUE3 = "#3a73a0", FLOOR = "#7a5a40", FLOOR2 = "#6a4c35";
var SKY = "#dfe9f0", WHITE = "#f7f8fa", GLASS1 = "#28476a", GLASS2 = "#9db8cf";
var ZSKIN = "#e8a77f", ZSKIN2 = "#d48f68", ZHAIR = "#3a2a22", ZHOOD = "#e0782f", ZHOOD2 = "#c2611f", ZJEAN = "#3f5b7f";
function G(x, y, s, inner, rot) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ')' + (rot ? ' rotate(' + f(rot) + ')' : '') + (s != null && s !== 1 ? ' scale(' + s + ')' : '') + '">' + inner + '</g>'; }
function pill(text, x, y, u, u0, col, size) {   // كبسولة صغيرة غامقة فيها كلام (زي لافتات المرجع)
  var k = pop((u - u0) / 0.7); if (k <= 0) return ""; size = size || 13; col = col || "#23262b"; var w = text.length * size * 0.56 + 18;
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')"><rect x="' + f(-w / 2) + '" y="' + f(-size * 0.95) + '" width="' + f(w) + '" height="' + f(size * 1.6) + '" rx="' + f(size * 0.8) + '" fill="' + col + '" stroke="#eceae6" stroke-width="1.4"/><text x="0" y="' + f(size * 0.32) + '" text-anchor="middle" style="font:800 ' + size + 'px Noto Sans Arabic;fill:#fff">' + text + '</text></g>';
}
function dimLine(x1, y1, x2, y2, p, col) {   // سهم مقاس أصفر بسنّين
  p = clamp(p); if (p <= 0) return ""; col = col || "#f2c230";
  var mx = (x1 + x2) / 2, my = (y1 + y2) / 2, ax = lerp(mx, x1, p), ay = lerp(my, y1, p), bx = lerp(mx, x2, p), by = lerp(my, y2, p);
  var z = '<path d="M' + f(ax) + ' ' + f(ay) + ' L' + f(bx) + ' ' + f(by) + '" stroke="' + col + '" stroke-width="2.6"/>';
  var nx = -(y2 - y1), ny = x2 - x1, nl = Math.sqrt(nx * nx + ny * ny) || 1; nx = nx / nl * 7; ny = ny / nl * 7;
  if (p >= 1) z += '<path d="M' + f(x1 - nx) + ' ' + f(y1 - ny) + ' L' + f(x1 + nx) + ' ' + f(y1 + ny) + ' M' + f(x2 - nx) + ' ' + f(y2 - ny) + ' L' + f(x2 + nx) + ' ' + f(y2 + ny) + '" stroke="' + col + '" stroke-width="2.6"/>';
  return z;
}
function chipY(text, x, y, u, u0, size) {   // رقم في كبسولة صفرا
  var k = pop((u - u0) / 0.7); if (k <= 0) return ""; size = size || 14; var w = text.length * size * 0.58 + 18;
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')"><rect x="' + f(-w / 2) + '" y="' + f(-size * 0.95) + '" width="' + f(w) + '" height="' + f(size * 1.6) + '" rx="' + f(size * 0.8) + '" fill="#f2c230" stroke="' + OL + '" stroke-width="1.6"/><text x="0" y="' + f(size * 0.32) + '" text-anchor="middle" style="font:900 ' + size + 'px Noto Sans Arabic;fill:#23262b">' + text + '</text></g>';
}
function flash(x, y, t, r, col) { return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r * (1 + 0.15 * Math.sin(t * 9))) + '" fill="' + (col || "#ff5a4a") + '" opacity=".45" filter="url(#soft)"/>'; }

// ── زيزو (شخصية صغيرة مدورة بأسلوب المرجع، من غير كاب) ────────
// رجليه عند (x, y)، طوله 100×s. o: {mood: happy|worry|shock|n, arms: down|up|wave|reach|point, worker: true (عامل بخوذة وسديري), look: -1..1}
function face(mood, t, look) {
  var z = "", lx = (look || 0) * 4, blink = (t % 3.4) < 0.11;
  var eye = function (ex) {
    if (blink) return '<path d="M' + f(ex - 4) + ' -76 h8" stroke="' + OL + '" stroke-width="2" stroke-linecap="round"/>';
    if (mood === "happy") return '<path d="M' + f(ex - 4.5) + ' -75 Q' + f(ex) + ' -81 ' + f(ex + 4.5) + ' -75" stroke="' + OL + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    var r = mood === "shock" ? 4.2 : 3.4;
    return '<ellipse cx="' + f(ex) + '" cy="-76" rx="' + r + '" ry="' + f(r * 1.2) + '" fill="' + OL + '"/><circle cx="' + f(ex + 1.2) + '" cy="-77.6" r="1.2" fill="#fff"/>';
  };
  z += eye(-9 + lx) + eye(9 + lx);
  var by = mood === "worry" ? -86 : mood === "shock" ? -88 : -85, tilt = mood === "worry" ? 2 : 0;
  z += '<path d="M' + f(-13 + lx) + ' ' + f(by + tilt) + ' L' + f(-5 + lx) + ' ' + f(by - tilt) + ' M' + f(5 + lx) + ' ' + f(by - tilt) + ' L' + f(13 + lx) + ' ' + f(by + tilt) + '" stroke="' + ZHAIR + '" stroke-width="2.2" stroke-linecap="round"/>';
  z += '<ellipse cx="' + f(-15 + lx) + '" cy="-68" rx="4.5" ry="3" fill="#f07c78" opacity=".45"/><ellipse cx="' + f(15 + lx) + '" cy="-68" rx="4.5" ry="3" fill="#f07c78" opacity=".45"/>';
  if (mood === "shock") z += '<ellipse cx="' + f(lx) + '" cy="-63" rx="3.6" ry="4.6" fill="#5a2a24" stroke="' + OL + '" stroke-width="1.4"/>';
  else if (mood === "worry") z += '<path d="M' + f(-5 + lx) + ' -62 Q' + f(lx) + ' -66 ' + f(5 + lx) + ' -62" stroke="' + OL + '" stroke-width="2" fill="none" stroke-linecap="round"/>';
  else if (mood === "happy") z += '<path d="M' + f(-6 + lx) + ' -66 Q' + f(lx) + ' -58 ' + f(6 + lx) + ' -66 Z" fill="#5a2a24" stroke="' + OL + '" stroke-width="1.4" stroke-linejoin="round"/>';
  else z += '<path d="M' + f(-4 + lx) + ' -64 Q' + f(lx) + ' -61 ' + f(4 + lx) + ' -64" stroke="' + OL + '" stroke-width="2" fill="none" stroke-linecap="round"/>';
  return z;
}
function zHead(mood, t, look, worker) {
  var st = 'stroke="' + OL + '" stroke-width="2"', z = "";
  z += '<ellipse cx="-27" cy="-74" rx="5" ry="6" fill="' + ZSKIN + '" ' + st + '/><ellipse cx="27" cy="-74" rx="5" ry="6" fill="' + ZSKIN + '" ' + st + '/>';
  z += '<ellipse cx="0" cy="-76" rx="27" ry="26" fill="url(#zSkin)" ' + st + '/>';
  if (worker) {
    z += '<path d="M-29 -84 C-29 -112 29 -112 29 -84 Z" fill="#f6f6f2" ' + st + '/><rect x="-33" y="-87" width="66" height="6" rx="3" fill="#e9e9e4" ' + st + '/><circle cx="0" cy="-100" r="3.4" fill="#d9362b"/>';
  } else {
    z += '<path d="M-28 -78 C-32 -100 -14 -106 0 -106 C16 -106 32 -100 28 -78 C25 -86 21 -91 15 -93 C10 -88 2 -88 -3 -94 C-9 -88 -17 -89 -21 -94 C-25 -89 -27 -84 -28 -78 Z" fill="' + ZHAIR + '" ' + st + ' stroke-linejoin="round"/>';
    z += '<path d="M-10 -102 Q-2 -108 8 -103" stroke="#5a4234" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
  }
  return z + face(mood, t, look);
}
function zizo(x, y, s, t, o) {
  o = o || {}; var st = 'stroke="' + OL + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"', z = "", wk = o.worker;
  var cloth = wk ? "#ef7d22" : ZHOOD, cloth2 = wk ? "#cf641a" : ZHOOD2;
  var step = o.walk ? Math.sin(t * 12) * 3 : 0;
  z += '<rect x="' + f(-11 + step * 0.3) + '" y="-24" width="9" height="18" rx="4" fill="' + ZJEAN + '" ' + st + '/><rect x="' + f(2 - step * 0.3) + '" y="-24" width="9" height="18" rx="4" fill="' + ZJEAN + '" ' + st + '/>';
  z += '<ellipse cx="' + f(-7 + step) + '" cy="-4" rx="7.5" ry="4" fill="#fbfbf8" ' + st + '/><ellipse cx="' + f(7 - step) + '" cy="-4" rx="7.5" ry="4" fill="#fbfbf8" ' + st + '/>';
  var arms = o.arms || "down", wv = Math.sin(t * 8) * 8;
  var arm = function (sx) {
    var ex, ey;
    if (arms === "up") { ex = sx * 24; ey = -70 + (sx > 0 ? wv * 0.3 : -wv * 0.3); }
    else if (arms === "wave") { ex = sx * (sx > 0 ? 26 + wv * 0.4 : 22); ey = sx > 0 ? -68 : -30; }
    else if (arms === "reach") { ex = sx * 30; ey = -46 + Math.sin(t * 7 + sx) * 3; }
    else if (arms === "point") { ex = sx * (sx > 0 ? 32 : 20); ey = sx > 0 ? -50 : -30; }
    else { ex = sx * 21; ey = -28 + Math.sin(t * 3 + sx) * 1; }
    var d = 'M' + (sx * 13) + ' -44 Q' + f(sx * 22) + ' ' + f((-44 + ey) / 2) + ' ' + f(ex) + ' ' + f(ey);
    return '<path d="' + d + '" stroke="' + OL + '" stroke-width="9" fill="none" stroke-linecap="round"/><path d="' + d + '" stroke="' + cloth + '" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="' + f(ex) + '" cy="' + f(ey) + '" r="4" fill="' + ZSKIN + '" ' + st + '/>';
  };
  z += arm(-1) + arm(1);
  z += '<path d="M-17 -48 Q-19 -30 -16 -21 Q0 -17 16 -21 Q19 -30 17 -48 Q0 -54 -17 -48 Z" fill="' + cloth + '" ' + st + '/>';
  z += '<path d="M-16 -36 Q0 -32 16 -36" stroke="#000" stroke-opacity=".12" stroke-width="5" fill="none"/>';
  if (wk) z += '<path d="M-16 -33 H16 M-15 -26 H15" stroke="#f3f0d8" stroke-width="3"/>';
  else z += '<path d="M-5 -47 L-5 -38 M5 -47 L5 -38" stroke="#fbfbf8" stroke-width="1.6"/><path d="M-9 -29 H9" stroke="' + cloth2 + '" stroke-width="2"/>';
  z += zHead(o.mood || "happy", t, o.look, wk);
  var bob = (o.walk ? Math.abs(Math.sin(t * 12)) * -2 : Math.sin(t * 2.6 + x) * 0.8);
  return '<g transform="translate(' + f(x) + ' ' + f(y + bob * s) + ') scale(' + s + ')">' + z + '</g>';
}
// البادج الدايري تحت على الشمال: وش زيزو بيتفاعل مع كل سطر
var BADGE = ["worry", "n", "worry", "n", "happy", "n", "n", "n", "shock", "worry", "shock", "happy", "worry", "happy", "happy", "shock", "n", "happy", "happy", "happy", "n", "n", "worry", "happy"];
window.__badge = function (t, line, u) {
  var m = BADGE[line] || "n", k = pop(u / 0.6) || 1, bob = Math.sin(t * 2.2) * 1.2;
  return '<g transform="translate(46 ' + f(588 + bob) + ') scale(' + f(k) + ')"><circle r="31" fill="#f3e7d3" stroke="' + OL + '" stroke-width="2.4"/><clipPath id="bdg"><circle r="29"/></clipPath><g clip-path="url(#bdg)"><g transform="translate(0 62) scale(0.82)">' + zHead(m, t, 0, false) + '<path d="M-22 -50 Q0 -44 22 -50 L26 -20 L-26 -20 Z" fill="' + ZHOOD + '" stroke="' + OL + '" stroke-width="2"/></g></g></g>';
};

// ── عربية من فوق، بصّة لفوق. o: {fold (المرايات), door (درجات فتح الباب الشمال), brake, lights, roof, straps (0..1), chocks (0..1)}
function carTop(x, y, s, t, o) {
  o = o || {}; var z = "", st = 'stroke="' + OL + '" stroke-width="2" stroke-linejoin="round"';
  if (o.lights) z += '<ellipse cx="0" cy="-158" rx="70" ry="34" fill="#ffe9a6" opacity="' + f(0.45 + 0.1 * Math.sin(t * 5)) + '" filter="url(#soft)"/>';
  [[-1, -88], [1, -88], [-1, 86], [1, 86]].forEach(function (w) { z += '<rect x="' + (w[0] * 56 - 8) + '" y="' + (w[1] - 20) + '" width="16" height="40" rx="5" fill="#2a2c31"/>'; });
  if (o.door) z += '<g transform="translate(-54 -46) rotate(' + f(-o.door) + ')"><path d="M0 0 L-6 0 L-6 74 L0 74 Z" fill="#e9ecef" ' + st + '/></g>';
  z += '<path d="M-54 -96 C-54 -128 -40 -140 0 -140 C40 -140 54 -128 54 -96 L54 104 C54 130 42 140 0 140 C-42 140 -54 130 -54 104 Z" fill="url(#carBody)" ' + st + '/>';
  z += '<path d="M-36 -120 Q0 -130 36 -120 M-44 -104 L-38 -74 M44 -104 L38 -74" stroke="#c9ced6" stroke-width="1.4" fill="none"/>';
  z += '<path d="M-42 -70 Q0 -80 42 -70 L36 -34 Q0 -38 -36 -34 Z" fill="url(#carGlass)" ' + st + '/>';
  z += '<rect x="-36" y="-34" width="72" height="80" rx="8" fill="' + (o.roof ? "#2a2f38" : "#fbfcfd") + '" ' + st + '/>';
  if (o.roof) z += '<rect x="-24" y="-24" width="48" height="40" rx="5" fill="url(#carGlass)" opacity=".5"/>';
  z += '<path d="M-36 46 Q0 50 36 46 L42 76 Q0 86 -42 76 Z" fill="url(#carGlass)" ' + st + '/>';
  z += '<path d="M-48 -30 L-40 -32 L-40 44 L-48 42 Z M48 -30 L40 -32 L40 44 L48 42 Z" fill="' + GLASS1 + '" opacity=".85"/>';
  z += '<path d="M-54 6 H-46 M54 6 H46" stroke="#b9c0c9" stroke-width="1.4"/>';
  [-1, 1].forEach(function (sd) { z += '<g transform="translate(' + (sd * 52) + ' -44) rotate(' + f(sd * (20 - 85 * (o.fold || 0))) + ')"><ellipse cx="' + (sd * 7) + '" cy="0" rx="8" ry="4.5" fill="#e9ecef" ' + st + '/></g>'; });
  z += '<ellipse cx="-34" cy="-134" rx="10" ry="4" fill="#ffe08a" ' + st + '/><ellipse cx="34" cy="-134" rx="10" ry="4" fill="#ffe08a" ' + st + '/>';
  var tl = o.brake ? "#ff2b1c" : "#c8322a";
  z += '<rect x="-44" y="132" width="20" height="6" rx="2" fill="' + tl + '" ' + st + '/><rect x="24" y="132" width="20" height="6" rx="2" fill="' + tl + '" ' + st + '/>';
  if (o.brake) z += '<ellipse cx="0" cy="150" rx="66" ry="20" fill="#ff3b2a" opacity="' + f(0.35 + 0.15 * Math.sin(t * 9)) + '" filter="url(#soft)"/>';
  if (o.straps) { var p = clamp(o.straps); [[-1, -88], [1, -88], [-1, 86], [1, 86]].forEach(function (w, i) { var xx = w[0] * 56, len = 34 * p; z += '<path d="M' + f(xx) + ' ' + (w[1] - 12) + ' L' + f(xx + w[0] * len) + ' ' + f(w[1] - 12 - len * 0.5) + ' M' + f(xx) + ' ' + (w[1] + 12) + ' L' + f(xx + w[0] * len) + ' ' + f(w[1] + 12 + len * 0.5) + '" stroke="#f2a51e" stroke-width="4" stroke-linecap="round"/>'; if (p > 0.9) z += '<circle cx="' + f(xx + w[0] * len) + '" cy="' + f(w[1] - 12 - len * 0.5) + '" r="3.4" fill="#9aa1aa" stroke="' + OL + '" stroke-width="1.4"/><circle cx="' + f(xx + w[0] * len) + '" cy="' + f(w[1] + 12 + len * 0.5) + '" r="3.4" fill="#9aa1aa" stroke="' + OL + '" stroke-width="1.4"/>'; }); }
  if (o.chocks) [[-1, -88], [1, -88], [-1, 86], [1, 86]].forEach(function (w, i) { var k = clamp(o.chocks * 4 - i); if (k <= 0) return; [-1, 1].forEach(function (e) { z += '<rect x="' + (w[0] * 56 - 10) + '" y="' + f(w[1] + e * 26 - 5 - (1 - k) * 30 * e) + '" width="20" height="10" rx="2" fill="#b07a44" stroke="' + OL + '" stroke-width="1.6" opacity="' + f(k) + '"/>'; }); });
  return G(x, y, s, z);
}
// الحاوية من فوق: بابها تحت (y0+len)، مقفولة فوق. العرض الداخلي 141 (2.35 م)
function ctrTop(cx, y0, len, w) {
  w = w || 141; var x0 = cx - w / 2, z = '<rect x="' + f(x0) + '" y="' + f(y0) + '" width="' + f(w) + '" height="' + f(len) + '" fill="' + FLOOR + '"/>';
  for (var i = y0 + 18; i < y0 + len; i += 18) z += '<path d="M' + f(x0) + ' ' + f(i) + ' H' + f(x0 + w) + '" stroke="' + FLOOR2 + '" stroke-width="1"/>';
  for (var j = x0 + 24; j < x0 + w; j += 24) z += '<path d="M' + f(j) + ' ' + f(y0) + ' V' + f(y0 + len) + '" stroke="' + FLOOR2 + '" stroke-width=".8" opacity=".6"/>';
  z += '<rect x="' + f(x0 - 8) + '" y="' + f(y0 - 8) + '" width="8" height="' + f(len + 8) + '" fill="' + BLUE + '" stroke="' + OL + '" stroke-width="1.8"/>';
  z += '<rect x="' + f(x0 + w) + '" y="' + f(y0 - 8) + '" width="8" height="' + f(len + 8) + '" fill="' + BLUE + '" stroke="' + OL + '" stroke-width="1.8"/>';
  z += '<rect x="' + f(x0 - 8) + '" y="' + f(y0 - 8) + '" width="' + f(w + 16) + '" height="8" fill="' + BLUE + '" stroke="' + OL + '" stroke-width="1.8"/>';
  return z;
}
function asphalt(t) {
  var z = '<rect x="-400" y="-400" width="1200" height="1500" fill="' + ASPH + '"/>';
  for (var x = -180; x < 600; x += 120) for (var y = -400; y < 1100; y += 70) z += '<rect x="' + x + '" y="' + y + '" width="3" height="34" fill="' + LANE + '" opacity=".55"/>';
  return z;
}
// ── منظر جانبي للميناء: سما وأوناش وحاويات بعيد وأرضية أسفلت من y
function harbor(t, y) {
  y = y || 380; var z = '<rect x="-400" y="-400" width="1200" height="' + (y + 400) + '" fill="' + SKY + '"/>';
  z += clouds(t, 6, 90, 4, 0.9, 0.8);
  for (var i = -2; i < 6; i++) { var cx = i * 90 + 20; z += '<g opacity=".55"><path d="M' + cx + ' ' + (y - 6) + ' L' + (cx + 6) + ' ' + (y - 110) + ' M' + (cx + 46) + ' ' + (y - 6) + ' L' + (cx + 40) + ' ' + (y - 110) + '" stroke="#9aa3ad" stroke-width="4"/><rect x="' + (cx - 14) + '" y="' + (y - 118) + '" width="80" height="8" fill="#a9b1ba"/><path d="M' + (cx - 14) + ' ' + (y - 114) + ' L' + (cx - 30) + ' ' + (y - 100) + '" stroke="#a9b1ba" stroke-width="3"/></g>'; }
  var cols = ["#7d9a6a", "#c9875a", "#6f86a8", "#a86a5a", "#8aa0b4", "#c2a35e"];
  for (var c = 0; c < 18; c++) for (var r = 0; r < 1 + (c * 7 % 3); r++) z += '<rect x="' + (-160 + c * 40) + '" y="' + (y - 18 - r * 14) + '" width="38" height="13" fill="' + cols[(c + r * 2) % 6] + '" opacity=".8"/>';
  z += '<rect x="-400" y="' + y + '" width="1200" height="800" fill="' + ASPH + '"/>';
  for (var k = -6; k < 10; k++) z += '<path d="M' + (180 + k * 30) + ' ' + y + ' L' + (180 + k * 140) + ' ' + (y + 500) + '" stroke="' + LANE + '" stroke-width="2" opacity=".35"/>';
  return z;
}
// الحاوية من الجنب (من بره): أرضيتها عند y، من x0
function ctrSide(x0, y, len, h, col) {
  h = h || 130; col = col || BLUE; var z = '<rect x="' + f(x0) + '" y="' + f(y - h) + '" width="' + f(len) + '" height="' + h + '" fill="' + col + '" stroke="' + OL + '" stroke-width="2"/>';
  for (var i = x0 + 8; i < x0 + len - 4; i += 10) z += '<rect x="' + f(i) + '" y="' + f(y - h + 6) + '" width="4" height="' + (h - 12) + '" fill="#000" opacity=".12"/>';
  z += '<rect x="' + f(x0) + '" y="' + f(y - h) + '" width="' + f(len) + '" height="6" fill="' + BLUE2 + '"/><rect x="' + f(x0) + '" y="' + f(y - 6) + '" width="' + f(len) + '" height="6" fill="' + BLUE2 + '"/>';
  return z;
}
// الحاوية مقطوعة من الجنب (نشوف جواها): أرضيتها عند y، ارتفاعها الداخلي 120 (2.39 م)، بابها مفتوح يمين
function ctrCut(x0, y, len, door) {
  var z = '<rect x="' + f(x0 - 8) + '" y="' + f(y - 128) + '" width="' + f(len + 16) + '" height="136" fill="' + BLUE + '" stroke="' + OL + '" stroke-width="2"/>';
  z += '<rect x="' + f(x0) + '" y="' + f(y - 120) + '" width="' + f(len) + '" height="120" fill="#c9d4de"/>';
  for (var i = x0 + 6; i < x0 + len; i += 12) z += '<rect x="' + f(i) + '" y="' + f(y - 120) + '" width="5" height="120" fill="#fff" opacity=".35"/>';
  z += '<rect x="' + f(x0) + '" y="' + f(y - 120) + '" width="' + f(len) + '" height="120" fill="url(#ctrIn)"/>';
  z += '<rect x="' + f(x0) + '" y="' + f(y - 5) + '" width="' + f(len) + '" height="5" fill="' + FLOOR + '"/>';
  if (door !== false) z += '<path d="M' + f(x0 + len + 8) + ' ' + f(y - 128) + ' l18 8 l0 124 l-18 4 Z" fill="' + BLUE3 + '" stroke="' + OL + '" stroke-width="2"/>';
  return z;
}
// عربية بيضا من الجنب، بصّة يمين. x = النص، y = الأرض. o: {roll, win, sunroof, hatch, hatchOpen, brake, driver (mood)}
function carSide(x, y, s, t, o) {
  o = o || {}; var z = "", st = 'stroke="' + OL + '" stroke-width="2" stroke-linejoin="round"', col = o.col || "url(#carSideBody)";
  var body = o.hatch
    ? 'M-110 -22 L-110 -50 Q-108 -58 -100 -60 L-84 -80 L40 -80 L66 -54 L100 -50 Q110 -48 110 -36 L110 -22 Q110 -14 100 -14 L-100 -14 Q-110 -14 -110 -22 Z'
    : 'M-110 -22 L-108 -44 Q-104 -50 -80 -52 L-50 -54 L-28 -80 L40 -80 L66 -54 L100 -50 Q110 -48 110 -36 L110 -22 Q110 -14 100 -14 L-100 -14 Q-110 -14 -110 -22 Z';
  z += '<ellipse cx="0" cy="-2" rx="112" ry="5" fill="#000" opacity=".18"/>';
  z += '<path d="' + body + '" fill="' + col + '" ' + st + '/>';
  z += '<path d="M-104 -34 L106 -34" stroke="#b9c0c9" stroke-width="1.4"/>';
  if (o.driver) z += '<g clip-path="url(#sideWin)">' + zizo(30, -32, 0.42, t, { mood: o.driver }) + '</g>';
  var wh = 19 * (1 - (o.win || 0));
  if (wh > 0.5) z += '<path d="M4 ' + f(-56 - wh) + ' L' + f(58 - 22 * wh / 19) + ' ' + f(-56 - wh) + ' L58 -56 L4 -56 Z" fill="url(#carGlass)" opacity=".8"/>';
  z += '<path d="M4 -75 L36 -75 L58 -56 L4 -56 Z" fill="none" ' + st + '/>';
  z += o.hatch ? '<path d="M-80 -75 L-4 -75 L-4 -56 L-96 -56 Z" fill="url(#carGlass)" ' + st + '/>' : '<path d="M-24 -75 L-4 -75 L-4 -56 L-44 -56 Z" fill="url(#carGlass)" ' + st + '/>';
  if (o.sunroof) z += '<rect x="-8" y="-83" width="34" height="5" rx="2" fill="#2a2f38" ' + st + '/>';
  z += '<path d="M0 -56 L0 -18 M60 -54 L62 -18" stroke="#9aa3ad" stroke-width="1.6"/><rect x="12" y="-46" width="11" height="3" rx="1.5" fill="#9aa3ad"/>';
  z += '<path d="M100 -46 L110 -44 L110 -36 L102 -36 Z" fill="#ffe08a" ' + st + '/>';
  z += '<rect x="-112" y="-46" width="7" height="10" rx="2" fill="' + (o.brake ? "#ff2b1c" : "#c8322a") + '" ' + st + '/>';
  if (o.brake) z += '<circle cx="-114" cy="-41" r="16" fill="#ff3b2a" opacity="' + f(0.4 + 0.2 * Math.sin(t * 10)) + '" filter="url(#soft)"/>';
  if (o.hatch && o.hatchOpen) {
    z += '<path d="M-84 -80 L-110 -50 L-110 -22 L-104 -22 L-104 -48 L-80 -76 Z" fill="#2a2f38" opacity="' + f(o.hatchOpen) + '"/>';
    z += '<g transform="translate(-84 -80) rotate(' + f(lerp(131, 196, o.hatchOpen)) + ')"><rect x="0" y="-4" width="44" height="8" rx="3" fill="#eef0f3" ' + st + '/><rect x="6" y="-2" width="26" height="4" fill="' + GLASS2 + '"/></g>';
  }
  var rot = (o.roll || 0) / 18 * 57.3;
  [-70, 70].forEach(function (wx) { z += '<g transform="translate(' + wx + ' -14) rotate(' + f(rot) + ')"><circle r="18" fill="#2a2c31" stroke="' + OL + '" stroke-width="2"/><circle r="10" fill="#d5dade" stroke="' + OL + '" stroke-width="1.6"/><path d="M-9 0 H9 M0 -9 V9" stroke="#8a929b" stroke-width="2"/></g>'; });
  return G(x, y, s, z);
}
function lyingZizo(x, y, s, t, mood, dir) { return G(x, y, 1, zizo(0, 0, s, t, { mood: mood, arms: "reach" }), dir > 0 ? 90 : -90); }   // زيزو نايم بيزحف (dir: 1 راسه يمين)

// ══ المشاهد ══════════════════════════════════════════

// 0) قدام الحاوية المفتوحة، وعربية بيضا جوه، وزيزو بيسأل
shot(0, camPush(180, 340, 1.0, 1.12), function (u, d, t) {
  var z = harbor(t, 420);
  z += '<rect x="-60" y="250" width="110" height="170" fill="' + BLUE + '" stroke="' + OL + '" stroke-width="2"/><rect x="310" y="250" width="110" height="170" fill="' + BLUE + '" stroke="' + OL + '" stroke-width="2"/>';
  z += '<rect x="60" y="240" width="240" height="180" fill="' + BLUE2 + '" stroke="' + OL + '" stroke-width="2.4"/><path d="M72 252 L288 252 L240 300 L120 300 Z" fill="#1d3a52"/><path d="M72 252 L120 300 L120 380 L72 412 Z M288 252 L240 300 L240 380 L288 412 Z" fill="#274c6b"/><path d="M120 380 L240 380 L288 412 L72 412 Z" fill="' + FLOOR + '"/><rect x="120" y="300" width="120" height="80" fill="#16293a"/>';
  var cz = lerp(0.7, 1, ease(u / 2.5));
  z += G(180, 396, cz, '<rect x="-56" y="-60" width="112" height="56" rx="12" fill="url(#carBody)" stroke="' + OL + '" stroke-width="2"/><path d="M-40 -82 L40 -82 L50 -58 L-50 -58 Z" fill="url(#carGlass)" stroke="' + OL + '" stroke-width="2"/><rect x="-52" y="-42" width="20" height="9" rx="3" fill="#ff3b2a"/><rect x="32" y="-42" width="20" height="9" rx="3" fill="#ff3b2a"/><rect x="-16" y="-26" width="32" height="10" rx="2" fill="#fff" stroke="' + OL + '" stroke-width="1.4"/><rect x="-50" y="-6" width="16" height="10" rx="3" fill="#2a2c31"/><rect x="34" y="-6" width="16" height="10" rx="3" fill="#2a2c31"/>');
  z += '<rect x="-20" y="410" width="400" height="10" fill="#000" opacity=".1"/>';
  z += zizo(78, 470, 1.1, t, { mood: "worry", arms: "point", look: 1 }) + qmark(100, 330, t, 34, "#d9362b");
  return z;
});

// 1) الحاوية من فوق فاضية: عرضها 2.35 م
shot(1, camPush(180, 330, 1.05, 1.18), function (u, d, t) {
  return asphalt(t) + ctrTop(180, 40, 640) + dimLine(110, 200, 250, 200, ease((u - 0.5) / 1.2)) + chipY("2.35 م", 180, 236, u, 1.5, 16) + pill("عرض الحاوية من جوه", 180, 470, u, 0.4);
});

// 2) العربية بتدخل: عرضها 1.80 م، والباب مش لاقي مكان
shot(2, camPush(180, 330, 1.0, 1.12), function (u, d, t) {
  var cy = lerp(820, 380, ease(u / 2)), door = u > 3.2 ? Math.min(12, (u - 3.2) * 24) : 0;
  var gl = 0.25 + 0.2 * Math.sin(t * 6);
  return asphalt(t) + ctrTop(180, 40, 640) + '<rect x="110" y="230" width="16" height="300" fill="#d9362b" opacity="' + f(gl * clamp(u - 2.4)) + '"/><rect x="234" y="230" width="16" height="300" fill="#d9362b" opacity="' + f(gl * clamp(u - 2.4)) + '"/>'
    + carTop(180, cy, 1, t, { door: door }) + dimLine(126, cy + 10, 234, cy + 10, ease((u - 1.8) / 1)) + chipY("1.80 م", 180, cy + 44, u, 2.3, 15)
    + (door > 10 ? flash(116, cy - 40, t, 14) : "") + cross(80, cy - 50, u, 3.8, 0.7);
});

// 3) الونش بينزّل الحاوية جنب رصيف تحميل على نفس الارتفاع
shot(3, camPush(180, 330, 1.0, 1.08), function (u, d, t) {
  var hy = lerp(200, 400, ease((u - 0.3) / 2.4)), z = harbor(t, 400);
  z += '<path d="M-60 400 L-60 300 L120 300 L120 400 Z" fill="#a7adb4" stroke="' + OL + '" stroke-width="2"/><path d="M-60 308 H120" stroke="#f2c230" stroke-width="5" stroke-dasharray="12 8"/>';
  z += '<path d="M130 40 L130 400 M340 40 L340 400" stroke="#e2b035" stroke-width="10"/><rect x="100" y="30" width="270" height="16" fill="#e2b035" stroke="' + OL + '" stroke-width="2"/>';
  z += '<path d="M240 46 V' + f(hy - 100) + '" stroke="' + OL + '" stroke-width="2"/><path d="M150 ' + f(hy - 100) + ' L240 ' + f(hy - 120) + ' L330 ' + f(hy - 100) + '" stroke="' + OL + '" stroke-width="1.6" fill="none"/>';
  z += ctrSide(130, hy, 210, 100);
  return z + pill("رصيف تحميل", 70, 455, u, 2.6, "#23262b", 14) + (u > 2.8 ? arrow(110, 330, 150, 330, "#f2c230", 4, ease((u - 2.8) / 0.6)) : "");
});

// 4) رامبة حديد والعربية بتطلع عليها لجوه
shot(4, camPush(200, 360, 1.15, 1.3), function (u, d, t) {
  var cx = lerp(470, 120, ease(u / d)), lift = clamp((350 - cx) / 60) * 18 * (cx > 290 ? 1 : 1), tilt = cx > 290 && cx < 355 ? -9 : 0;
  var z = harbor(t, 400) + ctrCut(-150, 382, 440, false) + '<path d="M290 382 L355 400 L290 400 Z" fill="#9aa1aa" stroke="' + OL + '" stroke-width="2"/>';
  for (var i = 298; i < 352; i += 9) z += '<path d="M' + i + ' ' + f(383 + (i - 290) * 0.27) + ' l0 3" stroke="' + OL + '" stroke-width="1.4"/>';
  z += G(cx, 400 - Math.min(18, lift), 1, carSide(0, 0, 0.8, t, { roll: -cx }), tilt);
  return z + pill("رامبة حديد", 320, 440, u, 0.8) + pulse(320, 390, t, "#f2c230", 8);
});

// 5) المرايات بتتقفل
shot(5, camPush(180, 250, 1.7, 1.9), function (u, d, t) {
  return asphalt(t) + carTop(180, 340, 1, t, { fold: ease((u - 0.8) / 1.4) }) + pulse(116, 296, t, "#f2c230", 7) + pulse(244, 296, t, "#f2c230", 7) + pill("المرايات", 180, 220, u, 0.5) + chipY("كل سنتي فارق", 180, 380, u, 2.6, 13);
});

// 6) عداد البنزين بينزل للربع (فوق كبوت العربية)
shot(6, camPush(180, 330, 1.25, 1.35), function (u, d, t) {
  var lvl = lerp(0.9, 0.25, ease((u - 0.4) / 2)), a = lerp(-70, 70, lvl) + Math.sin(t * 8) * 1.2, z = asphalt(t) + carTop(180, 340, 1, t, {});
  var gz = '<path d="M-70 0 A70 70 0 0 1 70 0 Z" fill="#23262b" stroke="#eceae6" stroke-width="3"/>';
  for (var i = 0; i <= 4; i++) { var aa = (-70 + i * 35) * Math.PI / 180; gz += '<path d="M' + f(Math.sin(aa) * 50) + ' ' + f(-Math.cos(aa) * 50) + ' L' + f(Math.sin(aa) * 62) + ' ' + f(-Math.cos(aa) * 62) + '" stroke="#fff" stroke-width="3"/>'; }
  gz += label("E", -52, -8, 14, "#ff5a4a") + label("F", 52, -8, 14, "#fff") + '<path d="M-58 -2 A58 58 0 0 1 -40 -42" stroke="#f2c230" stroke-width="5" fill="none"/>';
  gz += '<g transform="rotate(' + f(a) + ')"><path d="M-3 0 L0 -54 L3 0 Z" fill="#ff5a4a"/></g><circle r="7" fill="#9aa1aa" stroke="' + OL + '" stroke-width="1.6"/>';
  z += G(180, 340, 1, gz);
  return z + pill("ربع التانك", 180, 230, u, 2.2) + (u > 2.4 ? pulse(140, 310, t, "#f2c230", 9) : "");
});

// 7) العربية بتدخل بالراحة، وعامل عند الباب بيوجّهها
shot(7, camPush(180, 380, 1.0, 1.12), function (u, d, t) {
  var cy = lerp(700, 330, ease(u / d));
  return asphalt(t) + ctrTop(180, 40, 520) + carTop(180, cy, 1, t, { lights: true, fold: 1 }) + zizo(285, 600, 0.9, t, { worker: true, arms: "wave", mood: "n", look: -1 })
    + pill("بالراحة جدًا", 180, 235, u, 0.8) + arrow(300, 520, 300, 420, "#f2c230", 4, ease((u - 1.2) / 0.8));
});

// 8) الفراغ على الجنبين أقل من عشرين سنتي
shot(8, camPush(180, 330, 1.25, 1.5), function (u, d, t) {
  var gl = 0.35 + 0.3 * Math.sin(t * 6);
  return asphalt(t) + ctrTop(180, 40, 640) + '<rect x="110" y="200" width="16" height="280" fill="#d9362b" opacity="' + f(gl * clamp(u - 0.6)) + '"/><rect x="234" y="200" width="16" height="280" fill="#d9362b" opacity="' + f(gl * clamp(u - 0.6)) + '"/>'
    + carTop(180, 340, 1, t, { fold: 1 }) + chipY("أقل من 20 سم", 118, 520, u, 1.6, 12) + chipY("أقل من 20 سم", 242, 170, u, 2.2, 12);
});

// 9) العربية وصلت لآخر الحاوية وفرملت
shot(9, camPush(180, 260, 1.0, 1.18), function (u, d, t) {
  var cy = lerp(380, 200, ease(u / 2));
  return asphalt(t) + ctrTop(180, 40, 640) + carTop(180, cy, 1, t, { fold: 1, brake: u > 1.8 }) + (u > 2.2 ? qmark(285, 160, t, 34, "#d9362b") : "") + pill("المشكلة الحقيقية", 180, 420, u, 2.2, "#d9362b");
});

// 10) الباب بيتفتح كام سنتي ويخبط في الحيطة
shot(10, camPush(150, 200, 1.9, 2.15), function (u, d, t) {
  var tries = u > 0.5 ? Math.abs(Math.sin((u - 0.5) * 3)) : 0, door = Math.min(10, tries * 13);
  return asphalt(t) + ctrTop(180, 40, 640) + carTop(180, 200, 1, t, { fold: 1, door: door }) + (door > 9 ? flash(115, 160, t, 10, "#f2c230") : "") + chipY("كام سنتي بس", 150, 300, u, 1.2, 12) + cross(210, 120, u, 2.4, 0.55);
});

// 11) زي الأفلام: هيخرج من الشباك
shot(11, camPush(220, 340, 1.5, 1.75), function (u, d, t) {
  var z = harbor(t, 420) + ctrCut(-120, 400, 440) + carSide(200, 400, 1, t, { win: ease((u - 0.8) / 1.5), driver: "happy" });
  z += '<g transform="translate(300 270) rotate(-8)"><rect x="-22" y="-6" width="44" height="28" fill="#23262b" stroke="' + OL + '" stroke-width="2"/><g transform="rotate(' + f(-16 + Math.abs(Math.sin(t * 4)) * 16) + ' -22 -6)"><rect x="-22" y="-14" width="44" height="8" fill="#f7f8fa" stroke="' + OL + '" stroke-width="2"/></g></g>';
  return z + pill("من الشباك", 180, 250, u, 2.4) + sparkle(300, 270, t, "#f2c230", 4);
});

// 12) بيطلع من الشباك نايم، يزحف، وبعدين يقف برا
shot(12, camPush(230, 340, 1.5, 1.7), function (u, d, t) {
  var k = ease((u - 0.3) / 2.8), out = u > 3.3;
  var z = harbor(t, 420) + ctrCut(-120, 400, 440) + carSide(200, 400, 1, t, { win: 1 });
  if (!out) z += '<g clip-path="url(#winOut)">' + lyingZizo(lerp(160, 300, k), 335 + Math.sin(t * 9) * 1, 0.42, t, "worry", 1) + '</g>';
  else z += zizo(372, 400, 0.48, t, { mood: "happy", arms: "up" });
  return z + pill("يزحف", 180, 250, u, 1.2) + arrow(230, 285, 290, 285, "#f2c230", 4, ease((u - 1.4) / 0.8));
});

// 13) من فتحة السقف، يزحف فوق العربية وينزل
shot(13, camPush(220, 330, 1.45, 1.65), function (u, d, t) {
  var up = ease((u - 0.4) / 1.4), walk = ease((u - 2.0) / 1.8), drop = ease((u - 3.9) / 0.9);
  var z = harbor(t, 420) + ctrCut(-120, 400, 440);
  if (walk <= 0) z += '<g clip-path="url(#roofCut)">' + zizo(209, lerp(370, 322, up), 0.42, t, { mood: "happy", arms: "up" }) + '</g>';
  z += carSide(200, 400, 1, t, { sunroof: true });
  if (walk > 0 && drop <= 0) z += lyingZizo(lerp(160, 205, walk), 310 + Math.sin(t * 10), 0.4, t, "happy", 1);
  if (drop > 0) z += zizo(lerp(300, 372, drop), lerp(330, 400, drop) - Math.sin(drop * 3.14) * 10, 0.46, t, { mood: "happy", arms: drop > 0.9 ? "up" : "reach" });
  return z + pill("فتحة سقف", 180, 250, u, 0.8);
});

// 14) هاتشباك: يخرج من الشنطة
shot(14, camPush(170, 340, 1.4, 1.55), function (u, d, t) {
  var op = ease((u - 0.6) / 1.2), k = ease((u - 1.9) / 1.8), stand = u > 3.9;
  var z = harbor(t, 420) + ctrCut(0, 400, 420, false) + '<rect x="-400" y="260" width="392" height="160" fill="' + SKY + '"/>';
  z += carSide(230, 400, 1, t, { hatch: true, hatchOpen: op });
  if (!stand && k > 0) z += '<g clip-path="url(#hatchOut)">' + lyingZizo(lerp(150, 70, k), 350 + Math.sin(t * 9), 0.4, t, "happy", -1) + '</g>';
  if (stand) z += zizo(70, 400, 0.48, t, { mood: "happy", arms: "up" });
  return z + pill("من الشنطة", 150, 250, u, 1.2) + arrow(110, 290, 50, 290, "#f2c230", 4, ease((u - 2.2) / 0.8));
});

// 15) الحاوية الأربعين قدم: 12 متر (الكاميرا بتمشي معاها)
shot(15, camPan(60, 300, 330, 1.0), function (u, d, t) {
  return harbor(t, 420) + ctrSide(-180, 410, 600, 130) + dimLine(-180, 250, 420, 250, ease((u - 0.5) / 1.6)) + chipY("12 متر", 120, 340, u, 1.9, 20) + pill("40 قدم", 120, 210, u, 0.5);
});

// 16) عربيتين أو تلاتة ورا بعض
shot(16, camPush(180, 340, 0.95, 1.0), function (u, d, t) {
  var z = harbor(t, 420) + ctrCut(-170, 400, 700, false), cols = ["url(#carSideBody)", "#d9534a", "#3f78b5"];
  for (var i = 0; i < 3; i++) { var k = ease((u - i * 0.8) / 1.4), cx = lerp(560, -110 + i * 180, k); z += carSide(cx, 400, 0.72, t, { roll: -cx, col: cols[i] }); }
  return z + counter(180, 230, u, 0.5, 2.4, 1, 3, " عربيات", 24, "#23262b");
});

// 17) الراكات: سكك حديد مايلة
shot(17, camPush(180, 340, 1.0, 1.1), function (u, d, t) {
  var p = ease((u - 0.6) / 1.6), z = harbor(t, 420) + ctrCut(-150, 400, 660, false);
  [[-120, 70], [140, 330]].forEach(function (r) {
    var x1 = r[0], x2 = lerp(r[0], r[1], p), y1 = 392, y2 = lerp(392, 320, p);
    z += '<path d="M' + x1 + ' ' + y1 + ' L' + f(x2) + ' ' + f(y2) + '" stroke="' + OL + '" stroke-width="9" stroke-linecap="round"/><path d="M' + x1 + ' ' + y1 + ' L' + f(x2) + ' ' + f(y2) + '" stroke="#f2c230" stroke-width="5" stroke-linecap="round"/><path d="M' + f(x2) + ' ' + f(y2) + ' L' + f(x2) + ' 400" stroke="#9aa1aa" stroke-width="5"/>';
  });
  return z + pill("الراكات", 180, 250, u, 1.2) + sparkle(230, 330, t, "#f2c230", 4);
});

// 18) العربية تطلع على الراك، وقدامها يترفع
shot(18, camPush(180, 340, 1.1, 1.22), function (u, d, t) {
  var cx = lerp(440, 160, ease(u / 1.8)), a = -22 * ease((u - 2.2) / 1.6), z = harbor(t, 420) + ctrCut(-150, 400, 660, false);
  z += '<g transform="translate(' + f(cx - 80) + ' 394) rotate(' + f(a) + ')"><rect x="0" y="-4" width="200" height="7" fill="#f2c230" stroke="' + OL + '" stroke-width="2"/>' + carSide(80, -4, 0.75, t, { roll: -cx }) + '</g>';
  z += '<path d="M' + f(cx + 105) + ' ' + f(394 + Math.sin(a * Math.PI / 180) * 185) + ' L' + f(cx + 105) + ' 400" stroke="#9aa1aa" stroke-width="6"/>';
  return z + (u > 2.2 ? arrow(cx + 140, 380, cx + 140, 300, "#f2c230", 4, ease((u - 2.2) / 0.8)) : "") + pill("قدامها لفوق", 180, 250, u, 2.6);
});

// 19) عربية تانية تحتها، والعدد يبقى أربعة
shot(19, camPush(180, 340, 0.95, 1.02), function (u, d, t) {
  var z = harbor(t, 420) + ctrCut(-170, 400, 700, false);
  [[-60, "url(#carSideBody)"], [230, "#3f78b5"]].forEach(function (c) { z += '<g transform="translate(' + (c[0] - 80) + ' 394) rotate(-22)"><rect x="0" y="-4" width="200" height="7" fill="#f2c230" stroke="' + OL + '" stroke-width="2"/>' + carSide(80, -4, 0.72, t, { col: c[1] }) + '</g><path d="M' + (c[0] + 105) + ' 325 L' + (c[0] + 105) + ' 400" stroke="#9aa1aa" stroke-width="6"/>'; });
  var k1 = ease((u - 0.3) / 1.6), k2 = ease((u - 1.3) / 1.6);
  z += carSide(lerp(560, -20, k1), 402, 0.58, t, { roll: -k1 * 600, col: "#d9534a" }) + carSide(lerp(680, 270, k2), 402, 0.58, t, { roll: -k2 * 400, col: "#5b9a5a" });
  return z + chipY(u > 3.2 ? "4 عربيات" : "2 عربيات", 180, 230, u, 0.4, 20) + (u > 3.2 ? sparkle(180, 230, t, "#f2c230", 6) : "");
});

// 20) أحزمة على كل عجلة بتتشد
shot(20, camPush(180, 330, 1.15, 1.3), function (u, d, t) {
  var p = ease((u - 0.6) / 2.4);
  return asphalt(t) + ctrTop(180, 40, 640) + carTop(180, 340, 1, t, { fold: 1, straps: p }) + pill("حزام على كل عجلة", 180, 515, u, 1.4) + bar(130, 540, 100, 10, p, "#5b9a5a", "#eceae6");
});

// 21) قطع خشب قدام وورا العجل
shot(21, camPush(180, 330, 1.15, 1.3), function (u, d, t) {
  var p = ease((u - 0.3) / 3.0), hit = (t * 2.4) % 1, ha = hit < 0.7 ? lerp(-50, 10, ease(hit / 0.7)) : lerp(10, -50, (hit - 0.7) / 0.3);
  var hx = p < 0.25 ? 100 : p < 0.5 ? 260 : p < 0.75 ? 100 : 260, hy = p < 0.5 ? 210 : 390;
  return asphalt(t) + ctrTop(180, 40, 640) + carTop(180, 340, 1, t, { fold: 1, straps: 1, chocks: p })
    + G(hx, hy, 1, '<g transform="rotate(' + f(ha) + ')"><rect x="-3" y="-44" width="6" height="44" rx="2" fill="#8a5a34" stroke="' + OL + '" stroke-width="1.6"/><rect x="-12" y="-52" width="24" height="12" rx="2" fill="#9aa1aa" stroke="' + OL + '" stroke-width="1.6"/></g>')
    + pill("قطع خشب", 180, 515, u, 0.8);
});

// 22) المركب بيتمايل في البحر، وجواه العربية متربطة
shot(22, camPush(180, 330, 1.0, 1.08), function (u, d, t) {
  var a = Math.sin(t * 1.3) * 5, z = '<rect x="-400" y="-400" width="1200" height="800" fill="' + SKY + '"/>' + clouds(t, 10, 120, 4, 0.9, 0.8) + sea(t, 420);
  var cols = [BLUE, "#c9875a", "#7d9a6a", "#a86a5a", "#6f86a8"], sz = "";
  for (var r = 0; r < 3; r++) for (var c = 0; c < 6; c++) sz += '<rect x="' + (-120 + c * 40) + '" y="' + (-58 - r * 18) + '" width="38" height="16" fill="' + cols[(r * 2 + c) % 5] + '" stroke="' + OL + '" stroke-width="1.4"/>';
  sz += '<rect x="110" y="-100" width="26" height="44" fill="#eef0f3" stroke="' + OL + '" stroke-width="2"/><rect x="114" y="-94" width="18" height="6" fill="#2a2f38"/>';
  sz += '<path d="M-150 -40 L160 -40 L140 14 L-134 14 Z" fill="#2a2f38" stroke="' + OL + '" stroke-width="2"/><path d="M-146 -4 L150 -4" stroke="#d9362b" stroke-width="6"/>';
  z += '<g transform="translate(180 440) rotate(' + f(a) + ')">' + sz + '</g>';
  z += '<g transform="translate(250 250)"><circle r="54" fill="#f3e7d3" stroke="' + OL + '" stroke-width="2.4"/><clipPath id="inset"><circle r="52"/></clipPath><g clip-path="url(#inset)"><g transform="rotate(' + f(a) + ')">' + ctrCut(-70, 34, 140, false) + carSide(Math.sin(t * 1.3) * 6, 34, 0.42, t, {}) + '</g></g></g>';
  return z + pill("بتتمايل", 110, 220, u, 0.8) + (u > 2 ? cross(292, 292, u, 2.2, 0.5) : "");
});

// 23) الباب بيتقفل وعليه سيل برقم
shot(23, camPush(180, 330, 1.0, 1.12), function (u, d, t) {
  var cl = ease((u - 0.2) / 1.6), z = harbor(t, 520);
  z += '<rect x="20" y="130" width="320" height="400" fill="#16293a" stroke="' + OL + '" stroke-width="2.4"/>';
  [[20, 1], [340, -1]].forEach(function (s) {
    var w = 160 * lerp(0.15, 1, cl), x = s[1] > 0 ? s[0] : s[0] - w;
    z += '<rect x="' + f(x) + '" y="130" width="' + f(w) + '" height="400" fill="' + BLUE + '" stroke="' + OL + '" stroke-width="2"/>';
    for (var i = 1; i < 6; i++) { var xx = s[1] > 0 ? s[0] + w * i / 6 : s[0] - w * i / 6; z += '<path d="M' + f(xx) + ' 140 V520" stroke="#000" stroke-opacity=".14" stroke-width="5"/>'; }
  });
  if (cl > 0.95) {
    z += '<path d="M150 140 V520 M210 140 V520" stroke="#c9ced6" stroke-width="5"/><rect x="140" y="320" width="80" height="12" rx="3" fill="#9aa1aa" stroke="' + OL + '" stroke-width="2"/>';
    var k = pop((u - 2.2) / 0.8);
    if (k > 0) z += '<g transform="translate(180 344) scale(' + f(k) + ')"><rect x="-5" y="-6" width="10" height="36" rx="3" fill="#d9362b" stroke="' + OL + '" stroke-width="1.6"/><rect x="-14" y="26" width="28" height="44" rx="4" fill="#f2c230" stroke="' + OL + '" stroke-width="1.6"/><text x="0" y="52" text-anchor="middle" transform="rotate(-90 0 48)" style="font:800 10px Noto Sans Arabic;fill:#23262b">0457</text></g>' + pulse(180, 380, t, "#f2c230", 12);
  }
  return z + pill("سيل برقم", 268, 460, u, 2.4) + pill("بلد الوصول", 180, 550, u, 3.2, "#d9362b");
});
