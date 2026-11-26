// «إزاي غسالة الأطباق بتشتغل؟» — سكتش بمنظور 3D، اللوحة 640×800
// السطر 0 = كارت البداية (intro)، السطر 16 = كارت الملخص (outro)، والمشاهد من 1 لـ15.
var WATER = "#8fb4cf", WATERD = "#46698a", HOT = "#c4532c", STEEL = "#dcd8cc", STEELD = "#b7b2a3", STEELT = "#ebe8df", DIRTY = "#9a8f6c", FOOD = "#b58a4a";

// ── محرك 3D صغير: إسقاط بمنظور مائل، والكاميرا بتلف (yaw) وبتميل (pitch) ──
var V = { yaw: 0.5, pitch: 0.42, s: 1, cx: 320, cy: 560 };
function view(yaw, pitch, s, cx, cy) { V = { yaw: yaw, pitch: pitch, s: s || 1, cx: cx == null ? 320 : cx, cy: cy == null ? 560 : cy }; }
function P(x, y, z) { var c = Math.cos(V.yaw), sn = Math.sin(V.yaw), X = x * c + z * sn, Z = -x * sn + z * c, cp = Math.cos(V.pitch), sp = Math.sin(V.pitch); return [V.cx + X * V.s, V.cy - (y * cp + Z * sp) * V.s, Z * cp - y * sp]; }
function vis(n) { var sn = Math.sin(V.yaw), c = Math.cos(V.yaw), cp = Math.cos(V.pitch), sp = Math.sin(V.pitch); return n[0] * (-sn * cp) + n[1] * (-sp) + n[2] * (c * cp) < 0; }
function pth(list, open) { var d = ""; for (var i = 0; i < list.length; i++) { var p = P(list[i][0], list[i][1], list[i][2]); d += (i ? " L" : "M") + f(p[0]) + " " + f(p[1]); } return d + (open ? "" : " Z"); }
function face(list, fill, hatched, sw, op) { var d = pth(list); return '<path d="' + d + '" fill="' + fill + '"' + (op != null ? ' fill-opacity="' + op + '"' : "") + ' stroke="' + INK + '" stroke-width="' + (sw == null ? 2 : sw) + '" stroke-linejoin="round"/>' + (hatched ? '<path d="' + d + '" fill="url(#hatch)"/>' : ""); }
function line3(a, b, col, w, ex) { return '<path d="' + pth([a, b], true) + '" stroke="' + (col || INK) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" fill="none"' + (ex || "") + '/>'; }
function poly3(list, col, w, ex) { return '<path d="' + pth(list, true) + '" stroke="' + (col || INK) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round" fill="none"' + (ex || "") + '/>'; }
function flow3(list, t, col, w, sp) { return poly3(list, col || WATERD, w || 5, ' stroke-dasharray="14 12" stroke-dashoffset="' + f(-t * (sp || 90)) + '"'); }   // مية ماشية في ماسورة
function pipe3(list, w) { return poly3(list, INK, (w || 14) + 3) + poly3(list, STEELD, w || 14); }
function S(x, y, z) { return P(x, y, z); }   // نقطة على الشاشة (للأسماء)
function lab3(p3, dx, dy, text, col, k, sz) { var p = P(p3[0], p3[1], p3[2]); return label(p[0], p[1], p[0] + dx, p[1] + dy, text, col, k, sz); }
// صندوق (بيلف حوالين المحور الرأسي بـ rot): الوشوش اللي باينة بس بتترسم
function box(cx, cy, cz, hx, hy, hz, col, o) {
  o = o || {}; var r = o.rot || 0, c = Math.cos(r), s = Math.sin(r), out = "";
  function W(a, b, d) { return [cx + a * hx * c + d * hz * s, cy + b * hy, cz - a * hx * s + d * hz * c]; }
  var F = [[[0, 1, 0], [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1]], o.top || col, false],
           [[0, -1, 0], [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]], o.side || col, true],
           [[0, 0, -1], [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1]], col, !!o.hf],
           [[0, 0, 1], [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]], col, !!o.hf],
           [[-1, 0, 0], [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]], o.side || col, o.hs !== false],
           [[1, 0, 0], [[1, -1, -1], [1, -1, 1], [1, 1, 1], [1, 1, -1]], o.side || col, o.hs !== false]];
  for (var i = 0; i < 6; i++) { var n = F[i][0], nn = [n[0] * c + n[2] * s, n[1], -n[0] * s + n[2] * c]; if (vis(nn)) out += face(F[i][1].map(function (q) { return W(q[0], q[1], q[2]); }), F[i][2], F[i][3], o.sw, o.op); }
  return out;
}
// اسطوانة رأسية (كوباية، فلتر، غطا)
function cyl(x, y0, z, r, h, col, o) {
  o = o || {}; var n = 18, out = "", top = [];
  for (var i = 0; i < n; i++) {
    var a0 = i / n * 6.283, a1 = (i + 1) / n * 6.283, am = (a0 + a1) / 2;
    if (vis([Math.cos(am), 0, Math.sin(am)])) out += '<path d="' + pth([[x + Math.cos(a0) * r, y0, z + Math.sin(a0) * r], [x + Math.cos(a1) * r, y0, z + Math.sin(a1) * r], [x + Math.cos(a1) * r, y0 + h, z + Math.sin(a1) * r], [x + Math.cos(a0) * r, y0 + h, z + Math.sin(a0) * r]]) + '" fill="' + col + '"' + (o.op != null ? ' fill-opacity="' + o.op + '"' : "") + ' stroke="' + col + '" stroke-width="1"/>';
    top.push([x + Math.cos(a0) * r, y0 + h, z + Math.sin(a0) * r]);
  }
  var bot = top.map(function (q) { return [q[0], y0, q[2]]; });
  return out + (o.hatch ? '<path d="' + pth(bot) + '" fill="url(#hatch)"/>' : "") + poly3(bot.concat([bot[0]]), INK, 1.6) + face(top, o.top || col, false, 1.8, o.op);
}
// دايرة في مستوى (وشها لقدام z أو لفوق y)
function disc(cx, cy, cz, r, plane, n) { var a = [], i; n = n || 22; for (i = 0; i < n; i++) { var g = i / n * 6.283; a.push(plane === "y" ? [cx + Math.cos(g) * r, cy, cz + Math.sin(g) * r] : plane === "x" ? [cx, cy + Math.sin(g) * r, cz + Math.cos(g) * r] : [cx + Math.cos(g) * r, cy + Math.sin(g) * r, cz]); } return a; }
function plate(x, y, z, r, dirt, t) {
  var s = face(disc(x, y, z, r, "z"), BONE, false, 1.8) + face(disc(x, y, z, r * 0.62, "z"), "#f9f6ec", false, 1);
  if (dirt) for (var i = 0; i < 3; i++) { var a = hash(i + x) * 6.28, rr = r * 0.4 * hash(i + 2 + z); s += face(disc(x + Math.cos(a) * rr, y + Math.sin(a) * rr, z - 1, r * 0.13 * dirt, "z", 10), FOOD, true, 1); }
  return s;
}

// ── غسالة الأطباق: الدولاب x من -160 لـ160، y من 0 لـ420، z من -150 (قدام) لـ150 (ورا) ──
// o: {closed, water (0..1), hot (0..1), arm (زاوية), jets (0..1), upJets, flow, plates, dirt, cups, fill (عمود مية), drain, steam, inlet}
function dishwasher(o, t) {
  o = o || {}; var s = "";
  s += box(0, -16, 0, 162, 16, 150, "#6f6a5e", { top: "#6f6a5e", side: "#5d594f" });   // القاعدة
  if (o.closed) {
    s += box(0, 210, 0, 160, 210, 150, STEEL, { top: STEELT, side: STEELD, hs: true });
    s += face([[-160, 378, -151], [160, 378, -151], [160, 420, -151], [-160, 420, -151]], "#bdb8aa", true, 1.6);
    var lit = 0.5 + 0.5 * Math.sin(t * 5); var lp = P(110, 399, -152);
    s += '<circle cx="' + f(lp[0]) + '" cy="' + f(lp[1]) + '" r="' + f(16 * V.s) + '" fill="#9fd08a" opacity="' + f(0.25 * lit) + '"/>' + face(disc(110, 399, -152, 6, "z", 12), lit > 0.5 ? "#8fc46f" : "#6b7d3c", false, 1.2);
    s += line3([-90, 360, -158], [90, 360, -158], INK, 7 * V.s) + line3([-90, 360, -158], [90, 360, -158], STEELT, 4 * V.s);
    for (var k = 0; k < 3; k++) s += face(disc(-110 + k * 28, 399, -152, 6, "z", 10), PUTTY, false, 1);
    return s;
  }
  // الجدران من جوه (قطاع)
  s += face([[-160, 0, 150], [160, 0, 150], [160, 420, 150], [-160, 420, 150]], "#e3dfd3", true, 2);
  if (vis([1, 0, 0])) s += face([[-160, 0, -150], [-160, 0, 150], [-160, 420, 150], [-160, 420, -150]], "#d6d1c3", true, 2);
  else s += face([[160, 0, -150], [160, 0, 150], [160, 420, 150], [160, 420, -150]], "#d6d1c3", true, 2);
  s += face([[-160, 20, -150], [160, 20, -150], [160, 20, 150], [-160, 20, 150]], "#cfc9b9", false, 2);
  s += face([[-160, 0, -150], [160, 0, -150], [160, 20, -150], [-160, 20, -150]], STEELD, true, 1.6);
  // بخار متكثف على الجدار
  if (o.cond) for (var q = 0; q < 14; q++) { var qx = -140 + hash(q) * 280, qy = 400 - ((t * 40 * (0.5 + hash(q + 3)) + hash(q + 9) * 380) % 380) * o.cond; s += face(disc(qx, qy, 149, 4 + hash(q + 1) * 3, "z", 8), WATER, false, 1); }
  // الماسورة من الطلمبة لورا ولفوق للدراع اللي فوق
  var pp = [[0, -10, 60], [0, -10, 140], [0, 215, 140], [0, 215, 20]];
  s += pipe3(pp, 14); if (o.flow) s += flow3(pp, t, WATERD, 5);
  if (o.inlet) { var ip = [[-160, 40, 110], [-120, 40, 110], [-60, 30, 40]]; s += pipe3([[-200, 40, 110], [-160, 40, 110]], 12) + (o.inlet > 0 ? flow3(ip, t, WATERD, 4) : ""); }
  // الحوض الصغير والسخان والفلتر
  var wl = o.water == null ? 0.6 : o.water;
  s += face([[-60, 20, -60], [60, 20, -60], [60, 20, 60], [-60, 20, 60]], "#a9a392", true, 1.6);
  if (wl > 0) s += box(0, 20 + 8 * wl, 0, 58, 8 * wl + 0.1, 58, o.dirtyWater ? "#9aa29a" : WATER, { top: o.dirtyWater ? "#aab0a6" : "#a9c6dc", side: o.dirtyWater ? "#8a9289" : "#7da3c0", hs: false, sw: 1.2, op: 0.9 });
  if (wl > 0) for (var w = 0; w < 3; w++) { var rr = 14 + ((t * 18 + w * 14) % 42); s += poly3(disc(0, 21 + 16 * wl, 0, rr, "y", 20).concat([[rr, 21 + 16 * wl, 0]]), "#fff", 1.2, ' opacity="' + f(0.7 * (1 - rr / 56)) + '"'); }
  var hk = o.hot || 0, hp = [[-120, 28, -100], [120, 28, -100], [120, 28, 100], [-120, 28, 100], [-120, 28, -100]];
  if (hk > 0) s += poly3(hp, ORANGE, 16, ' opacity="' + f(0.3 * hk) + '" filter="url(#soft2)"');
  s += poly3(hp, INK, 8) + poly3(hp, hk > 0.05 ? (hk > 0.6 ? "#d9643a" : "#a9705a") : "#8a8070", 5);
  s += cyl(0, 20, 0, 22, 30, "#a8a291", { hatch: true, top: "#c9c3b3" });
  if (o.food) for (var fdi = 0; fdi < 6; fdi++) { var fa = fdi / 6 * 6.28 + 0.4; s += face(disc(Math.cos(fa) * 22, 34 + hash(fdi) * 12, Math.sin(fa) * 22 - 1, 5, "z", 7), FOOD, true, 1); }
  // الرفوف
  var rk = function (y) { var r = ""; for (var i = -2; i <= 2; i++) r += line3([i * 70, y, -140], [i * 70, y, 140], GREY, 1.4); for (var j = -2; j <= 2; j++) r += line3([-150, y, j * 65], [150, y, j * 65], GREY, 1.4); return r; };
  s += rk(70);
  // الدراع اللي تحت
  var a = o.arm == null ? t * 2.2 : o.arm;
  s += sprayArm(0, 50, 0, 125, a, o.jets || 0, t, 1);
  if (o.plates !== false) { for (var pz = 110; pz >= -110; pz -= 44) { s += plate(-75, 135, pz, 58, o.dirt, t) + plate(75, 135, pz + 10, 58, o.dirt, t); } }
  s += rk(240);
  if (o.cups !== false) for (var cz = 100; cz >= -100; cz -= 66) for (var cx = -100; cx <= 100; cx += 66) s += cyl(cx, 245, cz, 22, 46, "#c9d8e0", { op: 0.92, top: "#dce7ec" });
  s += sprayArm(0, 222, 20, 105, -a * 1.2 + 1, o.upJets || 0, t, -1);
  if (o.fill) s += box(0, 20 + 200 * o.fill, 0, 158, 200 * o.fill, 148, WATER, { top: "#a9c6dc", side: "#7da3c0", op: 0.55, sw: 1.4, hs: false });
  if (o.steam) for (var st = 0; st < 6; st++) { var sx = -120 + st * 48, ph = (t * 0.6 + hash(st)) % 1; var p0 = P(sx, 180 + ph * 200, 0); s += '<path d="M' + f(p0[0]) + ' ' + f(p0[1] + 40) + ' q 10 -20 0 -40 q -10 -20 0 -40" stroke="#fff" stroke-width="' + f(5 * V.s) + '" fill="none" opacity="' + f(o.steam * (1 - ph)) + '" stroke-linecap="round"/>'; }
  if (o.drain) { var dp = [[0, -10, 0], [0, -10, -80], [220, -10, -80]]; s += pipe3(dp, 12) + flow3(dp, t, o.drain > 0 ? "#8a8f86" : WATERD, 4, 110); }
  // الجدار اليمين من برة والإطار
  if (vis([1, 0, 0])) s += face([[160, 0, -150], [160, 0, 150], [160, 420, 150], [160, 420, -150]], STEEL, true, 2.2, o.xray ? 0.35 : 1);
  else s += face([[-160, 0, -150], [-160, 0, 150], [-160, 420, 150], [-160, 420, -150]], STEEL, true, 2.2, o.xray ? 0.35 : 1);
  s += poly3([[-160, 0, -150], [-160, 420, -150], [160, 420, -150], [160, 0, -150]], INK, 3) + poly3([[-160, 420, -150], [-160, 420, 150], [160, 420, 150], [160, 420, -150]], INK, 1.6, ' stroke-dasharray="7 6"');
  return s;
}
// دراع رش بيلف: خروم مايلة وجيتات مية
function sprayArm(x, y, z, len, a, jets, t, dir) {
  var s = box(x, y, z, len, 5, 13, PUTTY, { rot: a, top: "#dcd8cc", side: "#a8a291", sw: 1.6 }) + cyl(x, y - 6, z, 16, 14, "#a8a291", { top: "#c9c3b3" });
  var c = Math.cos(a), sn = Math.sin(a);
  for (var i = -3; i <= 3; i++) {
    if (!i) continue; var d = i / 3 * len * 0.9, nx = x + d * c, nz = z - d * sn;
    s += face(disc(nx, y + 5.5 * dir, nz, 4, "y", 8), INK, false, 0.8);
    if (jets > 0) {
      var tx = -sn * (i > 0 ? 1 : -1), tz = -c * (i > 0 ? 1 : -1), L = 150 * jets;
      for (var k = 0; k < 2; k++) {
        var e = [nx + tx * 40 * (k + 1) * 0.5, y + dir * L * (0.7 + 0.3 * k), nz + tz * 40 * (k + 1) * 0.5];
        s += line3([nx, y + 6 * dir, nz], e, "#6f9cc0", 3.2, ' stroke-dasharray="10 9" stroke-dashoffset="' + f(-t * 160 - i * 7) + '" opacity=".9"');
      }
    }
  }
  return s;
}
// حوض مطبخ وحنفية
function sinkUnit(x, t, flow) {
  var s = box(x, 205, 0, 170, 205, 150, "#d8cdb0", { top: "#e6dcc2", side: "#c4b897" });
  s += face([[x - 110, 411, -90], [x + 110, 411, -90], [x + 110, 411, 90], [x - 110, 411, 90]], "#7d7a70", true, 2);
  s += face(disc(x, 412, 10, 14, "y", 14), "#2b2b2b", false, 1.2);
  var fp = [[x, 411, 120], [x, 520, 120], [x, 530, 80], [x, 505, 40]];
  s += poly3(fp, INK, 15) + poly3(fp, STEELT, 10);
  if (flow) {
    var a = P(x, 500, 40), b = P(x, 412, 10), d = "";
    for (var i = 0; i <= 14; i++) { var k = i / 14; d += (i ? " L" : "M") + f(lerp(a[0], b[0], k) + Math.sin(k * 12 - t * 14) * 3 * V.s) + " " + f(lerp(a[1], b[1], k)); }
    s += '<path d="' + d + '" stroke="#6f9cc0" stroke-width="' + f(11 * V.s) + '" fill="none" stroke-linecap="round"/><path d="' + d + '" stroke="#fff" stroke-width="' + f(2 * V.s) + '" fill="none" opacity=".7" stroke-dasharray="6 10" stroke-dashoffset="' + f(-t * 90) + '"/>';
    for (var j = 0; j < 6; j++) { var g = j / 6 * 6.28 + t * 3, r = 10 + ((t * 40 + j * 9) % 34); var p = P(x + Math.cos(g) * r, 412, 10 + Math.sin(g) * r); s += circle(p[0], p[1], 3 * V.s, "#6f9cc0", false, 0.8); }
  }
  return s;
}
// جركن مية
function jerry(x, y, z, sc, txt) {
  var s = box(x, y + 55 * sc, z, 38 * sc, 55 * sc, 24 * sc, "#6d93b3", { top: "#9ab8cf", side: "#557a99" });
  s += poly3([[x - 22 * sc, y + 110 * sc, z], [x - 18 * sc, y + 132 * sc, z], [x + 10 * sc, y + 132 * sc, z], [x + 14 * sc, y + 110 * sc, z]], INK, 7 * sc * V.s) + poly3([[x - 22 * sc, y + 110 * sc, z], [x - 18 * sc, y + 132 * sc, z], [x + 10 * sc, y + 132 * sc, z], [x + 14 * sc, y + 110 * sc, z]], "#9ab8cf", 4 * sc * V.s);
  s += cyl(x + 26 * sc, y + 110 * sc, z, 8 * sc, 12 * sc, ORANGE, { top: "#e07a50" });
  if (txt) { var p = P(x, y + 55 * sc, z - 24 * sc); s += T(txt, p[0], p[1] + 8 * V.s * sc, 22 * V.s * sc, "#fff", 900); }
  return s;
}
function qmark(x, y, sz, t, col) { var k = Math.cos(t * 3); return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(Math.abs(k) < 0.15 ? 0.15 : k) + ' 1)">' + T("؟", 0, sz * 0.35, sz, col || ORANGE, 900) + '</g>'; }
function thermo(x, y, k, t) {
  var h = 220, v = clamp(k);
  return R(x - 16, y - h, 32, h, BONE, 2, 16) + circle(x, y + 14, 26, HOT, true) + R(x - 7, y - h * 0.9 * v - 4, 14, h * 0.9 * v + 10, HOT, 0, 4) +
    [0, 0.33, 0.66, 1].map(function (q) { return '<path d="M' + (x + 16) + ' ' + f(y - h * 0.9 * q) + ' h10" stroke="' + INK + '" stroke-width="2"/>'; }).join("") + T(Math.round(60 * v) + "°", x + 34, y - h * 0.9 * v + 8, 30, HOT, 900, "start");
}
function bubbles(t, x, y, w, h, n) { var s = ""; for (var i = 0; i < n; i++) { var ph = (t * (0.6 + hash(i) * 0.6) + hash(i + 4)) % 1; s += '<circle cx="' + f(x + hash(i + 1) * w + Math.sin(t * 3 + i) * 4) + '" cy="' + f(y - ph * h) + '" r="' + f(3 + hash(i + 2) * 5) + '" fill="none" stroke="' + WATERD + '" stroke-width="1.6" opacity="' + f(1 - ph) + '"/>'; } return s; }
function loopArrows(cx, cy, r, t, col, n) { var s = ""; n = n || 4; for (var i = 0; i < n; i++) { var a0 = t * 1.6 + i / n * 6.283, a1 = a0 + 6.283 / n * 0.7, d = ""; for (var j = 0; j <= 10; j++) { var g = lerp(a0, a1, j / 10); d += (j ? " L" : "M") + f(cx + Math.cos(g) * r) + " " + f(cy + Math.sin(g) * r * 0.55); } s += '<path d="' + d + '" stroke="' + col + '" stroke-width="6" fill="none" stroke-linecap="round"/>'; var ex = cx + Math.cos(a1) * r, ey = cy + Math.sin(a1) * r * 0.55, ta = Math.atan2(Math.cos(a1) * r * 0.55, -Math.sin(a1) * r); s += '<path d="M' + f(ex + Math.cos(ta) * 14) + ' ' + f(ey + Math.sin(ta) * 14) + ' L' + f(ex + Math.cos(ta + 2.4) * 12) + ' ' + f(ey + Math.sin(ta + 2.4) * 12) + ' L' + f(ex + Math.cos(ta - 2.4) * 12) + ' ' + f(ey + Math.sin(ta - 2.4) * 12) + ' Z" fill="' + col + '"/>'; } return s; }
function sw(u, d, a, b) { return lerp(a, b, ease(u / d)); }   // قيمة بتتغير بنعومة على طول المشهد

// ── 0: كارت البداية — المطبخ بيلف: حنفية مفتوحة وغسالة أطباق قافلة
intro(function (t) {
  var k = ease((t - 0.3) / 3.0);
  view(lerp(-0.6, 0.42, k), lerp(0.3, 0.42, k), lerp(0.4, 0.52, k), lerp(370, 300, k), 250);
  var s = '<rect width="580" height="320" fill="' + PAPER + '"/><rect width="580" height="320" fill="url(#grid)"/>';
  s += face([[-520, -32, -200], [440, -32, -200], [440, -32, 260], [-520, -32, 260]], "#d9cfb6", true, 1.2);
  s += sinkUnit(-380, t, true) + dishwasher({ closed: true }, t);
  s += qmark(290, 48, 70, t, ORANGE);
  return s;
});

// 1 — الباب بيطير ويبان قطاع الغسالة من جوه، والكاميرا بتدخل بين الرفوف
shot(1, camMove([320, 420, 0.95], [320, 400, 1.15]), function (u, d, t) {
  view(sw(u, d, 0.15, 0.62), 0.4, 1.12, 320, 600);
  var s = paper() + dishwasher({ jets: 0, water: 0, plates: true, cups: true }, t);
  var dk = ease(u / 1.1);
  if (dk < 1) s += '<g opacity="' + f(1 - dk) + '">' + box(0, 210 + dk * 260, -150 - dk * 260, 160, 210, 8, STEEL, { top: STEELT, side: STEELD }) + '</g>';
  for (var i = 0; i < 4; i++) { var p = P(-100 + i * 70, 220 + Math.sin(t * 3 + i) * 10, -60); s += qmark(p[0], p[1] - 10 * pop((u - 0.8 - i * 0.2) / 0.5), 44 * pop((u - 0.8 - i * 0.2) / 0.5), t + i, ORANGE); }
  var lp = P(-75, 135, -110); return s + label(lp[0], lp[1], 360, 95, "كل طبق واقف مكانه", OLIVE, ease((u - 1.4) / 0.8), 24);
});
// 2 — هل بتتملي مية؟ لأ
shot(2, camMove([320, 330, 1.0], [320, 430, 1.05]), function (u, d, t) {
  view(sw(u, d, 0.7, 0.35), sw(u, d, 0.5, 0.36), 1.08, 320, 610);
  var fl = u < 2 ? ease(u / 1.6) * 0.95 : 0.95 * (1 - ease((u - 2) / 0.5)), s = paper();
  s += dishwasher({ water: 0, fill: fl > 0.01 ? fl : 0, plates: true }, t);
  if (u > 1.7) { var p = P(0, 220, -150); s += crossMark(p[0], p[1], 2.6, (u - 1.9) / 0.5); }
  return s + T("مليانة مية؟", 320, 90, 40, INK, 900);
});
// 3 — أربعة لتر بس بيتجمعوا في حوض صغير تحت
shot(3, camMove([200, 600, 1.45], [330, 600, 1.25]), function (u, d, t) {
  view(sw(u, d, 0.25, 0.55), 0.5, 1.15, 320, 620);
  var s = paper() + dishwasher({ water: ease((u - 0.6) / 2.4), inlet: 1, plates: false, cups: false, jets: 0 }, t);
  var p = P(0, 40, -60);
  return s + numBox("٤ لتر", p[0] + 120, p[1] + 70, (u - 2) / 0.7, 30) + lab3([-180, 40, 110], -10, -110, "المية داخلة", BLUE, ease((u - 0.3) / 0.8)) + (function () { var h = P(40, 36, -58); return label(h[0], h[1], 400, 760, "حوض صغير", OLIVE, ease((u - 1.5) / 0.8), 26); })();
});
// 4 — السخان بيسخن المية لستين درجة
shot(4, camPush(300, 560, 1.6, 1.85), function (u, d, t) {
  view(0.45 + sw(u, d, -0.25, 0.25), 0.55, 1.2, 320, 640);
  var hk = ease(u / 2.2), s = paper() + dishwasher({ water: 1, hot: hk, plates: false, cups: false }, t);
  var p = P(0, 30, 0);
  s += bubbles(t, p[0] - 90, p[1] - 10, 180, 120 * hk + 10, Math.round(14 * hk));
  s += arrows(t, p[0] - 60, p[1] - 30, p[0] - 60, p[1] - 150, 4, ORANGE, 120);
  return s + '<g transform="translate(445 600) scale(.5) translate(-445 -600)">' + thermo(445, 600, hk, t) + '</g>' + (function () { var h = P(-120, 28, -100); return label(h[0], h[1], 170, 380, "سخان", OLIVE, ease((u - 0.3) / 0.8), 26); })();
});
// 5 — الطلمبة بتزق المية لفوق في الماسورة
shot(5, camMove([320, 640, 1.35], [320, 300, 1.05]), function (u, d, t) {
  view(sw(u, d, 1.1, 0.9), 0.32, 1.05, 320, 640);
  var s = paper() + dishwasher({ water: 0.8, hot: 1, flow: 1, plates: false, cups: true, xray: true }, t);
  var pc = P(0, -10, 60);
  s += '<g transform="translate(' + f(pc[0]) + ' ' + f(pc[1]) + ')">' + circle(0, 0, 34, "#8a8070", true) + gearS(0, 0, 22, t, 9, STEELT, 6) + '</g>';
  return s + label(pc[0], pc[1], pc[0] - 130, pc[1] - 50, "طلمبة", OLIVE, ease((u - 0.2) / 0.7), 26) + lab3([0, 215, 140], 60, -60, "ضغط عالي ⬆", ORANGE, ease((u - 1.1) / 0.7), 24);
});
// 6 — دراع الرش من قريب: خروم صغيرة مايلة
shot(6, camPush(320, 430, 1.35, 1.6), function (u, d, t) {
  view(0.4 + u * 0.12, sw(u, d, 0.75, 1.05), 2.1, 320, 520);
  var a = 0.4 + u * 0.4, s = paper() + face([[-160, 20, -150], [160, 20, -150], [160, 20, 150], [-160, 20, 150]], "#cfc9b9", true, 2);
  s += sprayArm(0, 50, 0, 125, a, ease((u - 0.8) / 1) * 0.35, t, 1);
  var c = Math.cos(a), sn = Math.sin(a);
  var n1 = [ (125 * 0.9) * c, 56, -(125 * 0.9) * sn ];
  return s + inset(420, 290, 80, '<g transform="rotate(-25)">' + R(-90, -18, 180, 36, PUTTY, 2) + [-45, 0, 45].map(function (x) { return '<path d="M' + x + ' -6 l 14 -10" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' + arrow(x + 10, -14, x + 40, -70, "#6f9cc0", 3, ease((u - 1.2) / 0.8)); }).join("") + '</g>', (u - 0.9) / 0.6) + (function () { var h = P(n1[0], n1[1], n1[2]); return label(h[0], h[1], 190, 620, "خروم مايلة", ORANGE, ease((u - 0.5) / 0.8), 26); })();
});
// 7 — الخروم المايلة بتخلي الدراع يلف لوحده من غير موتور
shot(7, camPush(320, 420, 1.3, 1.5), function (u, d, t) {
  view(-t * 0.9, 0.95, 1.9, 320, 540);
  var a = t * 4.5, s = paper() + face([[-160, 20, -150], [160, 20, -150], [160, 20, 150], [-160, 20, 150]], "#cfc9b9", true, 2) + sprayArm(0, 50, 0, 125, a, 0.25, t, 1);
  var c = Math.cos(a), sn = Math.sin(a);
  [1, -1].forEach(function (sg) { var e = P(sg * 110 * c, 52, -sg * 110 * sn), tg = P(sg * 110 * c + sg * sn * 70, 52, -sg * 110 * sn + sg * c * 70); s += arrow(e[0], e[1], tg[0], tg[1], ORANGE, 5, ease((u - 0.5) / 0.6)); });
  s += '<g transform="translate(430 590) scale(.8)">' + R(-55, -35, 110, 70, PUTTY, 2, 8) + gearS(0, 0, 20, 0, 0, STEELD, 8) + T("موتور", 0, 62, 22, GREY, 800) + '</g>' + crossMark(430, 590, 1.1, (u - 1.6) / 0.5);
  return s + T("بيلف لوحده!", 320, 210, 38, ORANGE, 900);
});
// 8 — المية بتضرب الأطباق من كل ناحية
shot(8, camMove([250, 430, 1.1], [390, 400, 1.2]), function (u, d, t) {
  view(sw(u, d, -0.45, 0.55), 0.38, 1.1, 320, 610);
  var s = paper() + dishwasher({ jets: 1, upJets: 0.8, water: 0.7, hot: 1, flow: 1, dirt: 1 - ease(u / 3) }, t);
  for (var i = 0; i < 16; i++) { var ph = (t * 1.3 + hash(i)) % 1, p = P(-140 + hash(i + 2) * 280, 200 - ph * 160, -120 + hash(i + 5) * 200); s += '<ellipse cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" rx="3" ry="6" fill="#6f9cc0"/>'; }
  var a1 = P(0, 50, 0), a2 = P(0, 222, 20); return s + label(a1[0], a1[1], 430, 720, "رش من تحت", BLUE, ease((u - 0.4) / 0.7), 24) + label(a2[0], a2[1], 430, 110, "ورش من فوق", BLUE, ease((u - 1.2) / 0.7), 24);
});
// 9 — الفلتر بيمسك البواقي، والمية بتلف في دايرة
shot(9, camMove([320, 560, 2.0], [320, 400, 1.0]), function (u, d, t) {
  var k = ease((u - 1.4) / 1.6);
  view(0.5 + u * 0.06, lerp(0.62, 0.4, k), 1.08, 320, 610);
  var s = paper() + dishwasher({ water: 0.8, food: 1, flow: 1, jets: 0.9 * k, plates: k > 0.35, cups: k > 0.2, xray: true }, t);
  if (k > 0) { var lp = [[0, 30, 0], [0, -10, 0], [0, -10, 140], [0, 215, 140], [0, 215, 20], [0, 60, 0]]; s += poly3(lp, ORANGE, 4, ' stroke-dasharray="16 12" stroke-dashoffset="' + f(-t * 120) + '" opacity="' + f(k) + '"'); }
  return s + (function () { var h = P(20, 44, -18); return label(h[0], h[1], 420, 690, "فلتر", OLIVE, ease((u - 0.3) / 0.7), 28); })() + (k > 0.3 ? numBox("نفس المية × عشرات المرات", 320, 80, (u - 2.2) / 0.6, 24) : "");
});
// 10 — الإنزيمات بتفكك بقايا البيض والرز (ماكرو على سطح الطبق)
shot(10, camPan(250, 390, 420, 1.15), function (u, d, t) {
  view(0.3 + Math.sin(t * 0.5) * 0.08, 0.95, 1.0, 320, 470);
  var s = paper() + face([[-420, 0, -320], [420, 0, -320], [420, 0, 320], [-420, 0, 320]], BONE, false, 2);
  for (var g = -4; g <= 4; g++) s += line3([g * 90, 0, -320], [g * 90, 0, 320], "#e5dcc5", 1) + line3([-420, 0, g * 70], [420, 0, g * 70], "#e5dcc5", 1);
  var blobs = [[-180, -90, 70, "#e8c65a", "بيض"], [140, 60, 60, "#f4f0e2", "رز"], [-40, 170, 50, "#e8c65a", ""], [220, -160, 46, "#f4f0e2", ""]];
  blobs.forEach(function (b, i) {
    var k = 1 - ease((u - 1 - i * 0.4) / 2.2), r = b[2] * k;
    if (r > 2) { s += face(disc(b[0], 2, b[1], r, "y", 16), b[3], true, 1.6); s += face(disc(b[0], 2 + r * 0.5, b[1], r * 0.55, "y", 12), b[3], false, 1.2); }
    for (var j = 0; j < 3; j++) { var a = t * 2 + j * 2.1 + i, ex = b[0] + Math.cos(a) * (b[2] + 18), ez = b[1] + Math.sin(a) * (b[2] + 18), p = P(ex, 8, ez); s += '<g transform="translate(' + f(p[0]) + ' ' + f(p[1]) + ') rotate(' + f(a * 57 + 90) + ')">' + '<path d="M0 0 L-12 -16 M0 0 L12 -16" stroke="' + BLUE + '" stroke-width="' + f(4 + 3 * Math.abs(Math.sin(t * 8 + j))) + '" stroke-linecap="round"/>' + circle(0, 0, 7, BLUE, false, 1.4) + '</g>'; }
    if (b[4]) { var lp = P(b[0], 4, b[1]); s += label(lp[0], lp[1], i ? 470 : 200, 230, b[4], INK, ease((u - 0.3 - i * 0.4) / 0.7), 24); }
  });
  for (var c = 0; c < 18; c++) { var ph = (t * 0.5 + hash(c)) % 1, p = P(-300 + hash(c + 1) * 600, ph * 140, -250 + hash(c + 3) * 500); s += circle(p[0], p[1], 3, FOOD, false, 0.6); }
  return s + T("إنزيمات", 320, 110, 40, BLUE, 900);
});
// 11 — المية الوسخة بتتصرف ومية نضيفة بتدخل للشطف
shot(11, camPush(320, 560, 1.4, 1.6), function (u, d, t) {
  view(0.3 + u * 0.15, 0.62, 1.2, 320, 640);
  var k = ease((u - 1.5) / 0.8), s = paper();
  s += dishwasher({ water: u < 1.5 ? 1 - u / 1.6 : ease((u - 1.6) / 1.2), dirtyWater: u < 1.5, drain: u < 1.6 ? 1 : 0, inlet: u > 1.5 ? 1 : 0, plates: false, cups: false }, t);
  if (u < 1.6) { var c = P(0, 30, 0), sp = ""; for (var i = 0; i < 40; i++) { var g = i * 0.45 - t * 6, r = 50 - i * 1.1; sp += (i ? " L" : "M") + f(c[0] + Math.cos(g) * r * V.s) + " " + f(c[1] + Math.sin(g) * r * 0.45 * V.s); } s += '<path d="' + sp + '" stroke="#6f7468" stroke-width="3" fill="none"/>'; }
  return s + (u < 1.6 ? lab3([140, -10, -80], 20, 120, "مية وسخة لبرة", GREY, ease((u - 0.2) / 0.6), 24) : lab3([-180, 40, 110], 0, -120, "مية نضيفة", BLUE, ease((u - 1.7) / 0.6), 24));
});
// 12 — مادة اللمعان: كوبايتين بيلفوا
shot(12, camPush(320, 420, 1.0, 1.12), function (u, d, t) {
  view(-0.5 + u * 0.3, 0.35, 1.0, 320, 560);
  var s = paper() + face([[-300, 0, -200], [300, 0, -200], [300, 0, 200], [-300, 0, 200]], "#d9cfb6", true, 1.4);
  s += cyl(-130, 0, 0, 70, 230, "#cfe0ea", { op: 0.8, top: "#e3eef3" }) + cyl(130, 0, 0, 70, 230, "#cfe0ea", { op: 0.8, top: "#e3eef3" });
  var lc = P(-130, 100, 0), rc = P(130, 100, 0);
  for (var i = 0; i < 14; i++) s += circle(lc[0] - 45 + hash(i) * 90, lc[1] - 70 + hash(i + 3) * 160, 5 + hash(i + 1) * 4, "#a9c6dc", false, 1);
  var k = ease((u - 1.4) / 1.2); s += '<path d="M' + f(rc[0] - 50) + ' ' + f(rc[1] - 80) + ' Q' + f(rc[0]) + ' ' + f(rc[1] - 70 + 160 * k) + ' ' + f(rc[0] + 50) + ' ' + f(rc[1] - 80) + '" stroke="#6f9cc0" stroke-width="5" fill="none" opacity="' + f(1 - k) + '"/>';
  var dy = ease(u / 1) * 260; s += '<path d="M320 ' + f(40 + dy) + ' q -18 26 0 34 q 18 -8 0 -34 Z" fill="#e0b040" stroke="' + INK + '" stroke-width="2" opacity="' + f(1 - ease((u - 1) / 0.3)) + '"/>';
  return s + crossMark(lc[0], lc[1] - 170, 0.9, (u - 0.8) / 0.4) + '<g transform="translate(' + f(rc[0]) + ' ' + f(rc[1] - 190) + ') scale(2.2)">' + callout("✓", 0, 0, (u - 2) / 0.5) + '</g>' + label(rc[0] + 30, rc[1] - 40, 470, 650, "من غير بقع", OLIVE, ease((u - 2.3) / 0.7), 24) + T("مادة اللمعان", 320, 90, 36, OLIVE, 900);
});
// 13 — التجفيف: البخار بيطلع ويتكثف على الجدران
shot(13, camMove([320, 520, 1.05], [320, 380, 1.15]), function (u, d, t) {
  view(sw(u, d, 0.6, 0.25), 0.36, 1.1, 320, 610);
  var s = paper() + dishwasher({ water: 0.2, steam: 1, cond: 1, plates: true, cups: true }, t);
  var h1 = P(-75, 200, -110), h2 = P(-150, 300, 149); return s + label(h1[0], h1[1], 250, 720, "أطباق سخنة", ORANGE, ease((u - 0.3) / 0.7), 24) + label(h2[0], h2[1], 330, 70, "بيتكثف على الجدار", BLUE, ease((u - 1.4) / 0.7), 24);
});
// 14 — السر: الغسالة بتلف نفس المية، والحنفية بتروح على البلاعة
shot(14, camMove([320, 420, 1.15], [320, 410, 0.95]), function (u, d, t) {
  view(sw(u, d, 0.55, 0.2), 0.42, 0.62, 400, 560);
  var s = paper() + face([[-640, -32, -220], [460, -32, -220], [460, -32, 260], [-640, -32, 260]], "#d9cfb6", true, 1.2);
  s += sinkUnit(-330, t, true) + dishwasher({ water: 0.6, flow: 1, jets: 1, upJets: 0.7, xray: true }, t);
  var c = P(0, 200, 0), dr = P(-330, 380, 10);
  s += loopArrows(c[0], c[1], 150, t, ORANGE, 4);
  s += arrow(dr[0], dr[1] - 40, dr[0], dr[1] + 160, BLUE, 6, ease((u - 2.6) / 0.8));
  return s + T("بتلف نفس المية", c[0], 120, 30, ORANGE, 900) + T("على البلاعة", dr[0] - 40, dr[1] + 215, 28, BLUE, 900);
});
// 15 — الدورة كلها حوالي عشرة لتر
shot(15, camPush(320, 450, 1.0, 1.15), function (u, d, t) {
  view(-0.35 + u * 0.15, 0.4, 0.78, 230, 560);
  var s = paper() + face([[-300, -32, -220], [600, -32, -220], [600, -32, 260], [-300, -32, 260]], "#d9cfb6", true, 1.2) + dishwasher({ closed: true }, t);
  var k = pop((u - 0.3) / 0.6);
  if (k > 0) s += jerry(330, -32 + (1 - k) * 200, -40, 1.5, "١٠ لتر");
  return s + numBox("≈ ١٠ لتر", 320, 110, (u - 1) / 0.6, 34);
});

// ── كارت الملخص: جركن واحد للغسالة، وخمسة للحنفية بيترصّوا فوق بعض
outro(function (u, t) {
  view(0.35 + Math.sin(t * 0.6) * 0.1, 0.38, 0.48, 150, 222);
  var s = '<rect width="580" height="300" fill="' + PAPER + '"/><rect width="580" height="300" fill="url(#grid)"/>';
  s += dishwasher({ closed: true }, t) + jerry(230, -32, -60, 1.1, "١٠");
  V.cx = 430;
  for (var i = 0; i < 5; i++) { var k = pop((u - 0.2 - i * 0.35) / 0.45); if (k > 0) s += jerry(0, -32 + i * 112 * 0.72 + (1 - k) * 120, 0, 0.72, "١٠"); }
  var n = Math.min(5, Math.max(1, Math.ceil((u - 0.2) / 0.35)));
  return s + T("الغسالة", 150, 292, 22, INK, 800) + T("بإيدك", 430, 292, 22, INK, 800) + numBox("٠١٢٣٤٥"[n] + "٠ لتر", 300, 28, (u - 0.2) / 0.4, 22);
});
