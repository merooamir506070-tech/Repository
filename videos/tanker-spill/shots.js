// «إزاي تحمي نفسك من تسريب عربية بنزين» — كرتون مالي الشاشة العمودية.
// العالم هنا 360×640. الترجمة تحت (من y≈500)، فالمهم بين y = 60 و470.
// الشخصيات: زيزو (كاب برتقاني بالمقلوب، هودي برتقاني، جينز، كوتشي أبيض، شنطة ضهر) وفكري (شعر منكوش، نضارة مدورة، قلم ورا ودنه، قميص أزرق).

var SKIN = "#f2c79c", ORANGE = "#f08a24", VAP = "#8fdc6e";

// ── خلفيات ─────────────────────────────────────────────
function bgSky(kind) { return '<rect x="-300" y="-400" width="960" height="1440" fill="url(#sky-' + (kind || "day") + ')"/>'; }
function bgFill(c) { return '<rect x="-300" y="-400" width="960" height="1440" fill="' + c + '"/>'; }
function hillsFar(y) {
  return '<path d="M-300 ' + y + ' Q-150 ' + (y - 50) + ' 0 ' + (y - 10) + ' Q120 ' + (y - 60) + ' 240 ' + (y - 15) + ' Q380 ' + (y - 55) + ' 660 ' + (y - 5) + ' V' + (y + 40) + ' H-300 Z" fill="#c9b48a" opacity=".7"/>';
}
// طريق من الجنب: أسفلت من y لـy+70، وخطوط بتتحرك بسرعة sp، وتحته رمل
function road2(y, t, sp) {
  var s = '<rect x="-300" y="' + y + '" width="960" height="70" fill="url(#asph)"/><rect x="-300" y="' + (y - 4) + '" width="960" height="5" fill="#d9d4c8"/>', off = (((t * (sp || 0)) % 50) + 50) % 50;
  for (var x = -300; x < 700; x += 50) s += '<rect x="' + f(x - off) + '" y="' + (y + 33) + '" width="26" height="4" fill="#f2e6c8"/>';
  return s + '<rect x="-300" y="' + (y + 70) + '" width="960" height="700" fill="url(#sand)"/>';
}
function groundOnly(y) { return '<rect x="-300" y="' + y + '" width="960" height="900" fill="url(#sand)"/>'; }

// ── بنزين وبخار ونار ───────────────────────────────────
function puddle(x, y, w, k, t) {
  if (k <= 0) return ""; var rx = w * k, ry = Math.max(3, w * k * 0.16), wob = Math.sin(t * 3) * 1.5;
  return '<g><ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx="' + f(rx + wob) + '" ry="' + f(ry) + '" fill="url(#gas)" stroke="' + INK + '" stroke-width="2"/>' +
    '<ellipse cx="' + f(x + Math.sin(t * 1.3) * rx * 0.2) + '" cy="' + f(y - ry * 0.15) + '" rx="' + f(rx * 0.55) + '" ry="' + f(ry * 0.4) + '" fill="none" stroke="url(#sheen)" stroke-width="2.4" opacity=".75"/>' +
    '<ellipse cx="' + f(x - rx * 0.3) + '" cy="' + f(y - ry * 0.3) + '" rx="' + f(rx * 0.18) + '" ry="' + f(ry * 0.18) + '" fill="#fff" opacity=".45"/></g>';
}
// بخار: سحابة خضرا شفافة بتتموج. w عرض، h ارتفاع، op الشفافية
function vapor(x, y, w, h, t, op, seed) {
  var s = '<g opacity="' + f(op == null ? 0.55 : op) + '">'; seed = seed || 1;
  for (var i = 0; i < 9; i++) {
    var ph = (t * 0.5 + hash(i + seed)) % 1, xx = x + (hash(i * 3 + seed) - 0.5) * w + Math.sin(t * 1.7 + i) * 8, yy = y - ph * h, r = 10 + hash(i + 7 + seed) * w * 0.14 + ph * 12;
    s += '<circle cx="' + f(xx) + '" cy="' + f(yy) + '" r="' + f(r) + '" fill="' + VAP + '" opacity="' + f(1 - ph * 0.7) + '" filter="url(#soft2)"/>';
  }
  for (var j = 0; j < 3; j++) { var yy2 = y - 10 - j * h * 0.3, p = 'M' + f(x - w * 0.35) + ' ' + f(yy2); for (var k = 1; k <= 8; k++) p += ' L' + f(x - w * 0.35 + k * w * 0.09) + ' ' + f(yy2 + Math.sin(k * 1.3 + t * 3 + j) * 5); s += '<path d="' + p + '" stroke="#5fae45" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/>'; }
  return s + '</g>';
}
// بخار زاحف على الأرض: من x0 لـx1 (k من 0 لـ1 قد إيه وصل)
function creep(x0, x1, y, t, k, op) {
  var s = '<g opacity="' + f(op || 0.6) + '">', n = 14;
  for (var i = 0; i < n; i++) { var q = i / (n - 1); if (q > k) break; var xx = lerp(x0, x1, q) + Math.sin(t * 2 + i) * 5, r = 16 + hash(i) * 10 - q * 4; s += '<ellipse cx="' + f(xx) + '" cy="' + f(y - r * 0.4 + Math.sin(t * 2.5 + i * 0.8) * 2) + '" rx="' + f(r * 1.3) + '" ry="' + f(r * 0.55) + '" fill="' + VAP + '" filter="url(#soft2)"/>'; }
  return s + '</g>';
}
function flame(x, y, s, t, seed) {
  s = s || 1; seed = seed || 0; var a = Math.sin(t * 13 + seed) * 4, b = Math.sin(t * 9 + seed * 2) * 3;
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')"><ellipse cx="0" cy="-20" rx="34" ry="30" fill="#ffb02e" opacity=".35" filter="url(#soft)"/>' +
    '<path d="M-22 0 C-30 -20 -14 -34 -10 ' + f(-50 + a) + ' C-4 -36 0 -40 4 ' + f(-62 + b) + ' C10 -44 24 -34 22 -14 C24 -4 14 0 0 0 Z" fill="url(#fireG)" stroke="' + INK + '" stroke-width="2.2"/>' +
    '<path d="M-9 -2 C-12 -14 -4 -20 -2 ' + f(-30 + b) + ' C4 -20 10 -14 8 -4 Z" fill="#fff3a0"/></g>';
}
function spark(x, y, t, k) {   // شرارة بتلمع
  if (k <= 0) return ""; var s = "", n = 8;
  for (var i = 0; i < n; i++) { var a = i / n * 6.283 + t * 2, r1 = 4 * k, r2 = (14 + 8 * Math.abs(Math.sin(t * 20 + i))) * k; s += '<path d="M' + f(x + Math.cos(a) * r1) + ' ' + f(y + Math.sin(a) * r1) + ' L' + f(x + Math.cos(a) * r2) + ' ' + f(y + Math.sin(a) * r2) + '" stroke="#ffd23a" stroke-width="3" stroke-linecap="round"/>'; }
  return s + '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(5 * k) + '" fill="#fff8c8"/>';
}
function boom(x, y, r, t, k) {   // انفجار نار
  if (k <= 0) return ""; var s = '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r * k * 1.3) + '" fill="#ffb02e" opacity=".35" filter="url(#soft)"/>', d = "";
  for (var i = 0; i < 16; i++) { var a = i / 16 * 6.283, rr = r * k * (i % 2 ? 0.62 : 1) * (1 + 0.08 * Math.sin(t * 14 + i)); d += (i ? " L" : "M") + f(x + Math.cos(a) * rr) + " " + f(y + Math.sin(a) * rr); }
  return s + '<path d="' + d + ' Z" fill="url(#fireG)" stroke="' + INK + '" stroke-width="2.4"/>' + '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r * k * 0.3) + '" fill="#fff3a0"/>';
}
function drips(x, y0, y1, t) {   // نقط بنزين نازلة
  var s = ""; for (var i = 0; i < 4; i++) { var p = (t * 1.6 + i / 4) % 1, yy = lerp(y0, y1, p); s += '<ellipse cx="' + f(x + Math.sin(i) * 2) + '" cy="' + f(yy) + '" rx="2.6" ry="3.6" fill="#d9bf5e" stroke="' + INK + '" stroke-width="1"/>'; }
  return '<path d="M' + x + ' ' + y0 + ' Q' + (x + 3) + ' ' + f((y0 + y1) / 2) + ' ' + x + ' ' + y1 + '" stroke="#d9bf5e" stroke-width="3" opacity=".7"/>' + s;
}

// ── عربية البنزين (من الجنب). over = مقلوبة ─────────────
function wheel(x, y, r, t, spin) { var a = (t * (spin || 0) * 360) % 360; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(a) + ')"><circle r="' + r + '" fill="#26272a" stroke="' + INK + '" stroke-width="2"/><circle r="' + f(r * 0.45) + '" fill="#a9aeb3"/><path d="M0 ' + f(-r * 0.45) + ' V' + f(r * 0.45) + ' M' + f(-r * 0.45) + ' 0 H' + f(r * 0.45) + '" stroke="#5a5e63" stroke-width="2"/></g>'; }
function tanker(x, y, s, t, over) {
  s = s || 1; var body =
    '<rect x="-96" y="-12" width="176" height="8" fill="#3a3d42" stroke="' + INK + '" stroke-width="2"/>' +
    '<rect x="-100" y="-66" width="136" height="54" rx="26" fill="url(#tank)" stroke="' + INK + '" stroke-width="2.6"/>' +
    '<rect x="-100" y="-44" width="136" height="9" fill="' + ORANGE + '"/>' +
    '<path d="M-44 -30 l9 -9 l9 9 l-9 9 Z" fill="#d83a26" stroke="' + INK + '" stroke-width="1.5"/><path d="M-35 -25 c-3 -3 -2 -6 0 -9 c2 3 3 6 0 9" fill="#fff"/>' +
    (over ? '' : '<text x="-4" y="-50" text-anchor="middle" style="font:900 13px Noto Sans Arabic;fill:#c23a26">بنزين</text>') +
    '<path d="M40 -12 V-50 Q40 -58 48 -58 H66 Q74 -58 78 -48 L84 -30 V-12 Z" fill="url(#cab)" stroke="' + INK + '" stroke-width="2.6"/>' +
    '<path d="M50 -52 H64 Q69 -52 71 -46 L75 -34 H50 Z" fill="url(#gGlass)" stroke="' + INK + '" stroke-width="1.8"/>' +
    '<rect x="80" y="-24" width="6" height="5" fill="#fff4c8" stroke="' + INK + '" stroke-width="1"/>' +
    wheel(-70, -2, 10, t, 0) + wheel(-44, -2, 10, t, 0) + wheel(62, -2, 10, t, 0);
  var tr = over ? ' rotate(172 -8 -33)' : '';
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')' + tr + '">' + body + '</g>' + (over ? '<ellipse cx="' + f(x) + '" cy="' + f(y + 2) + '" rx="' + f(100 * s) + '" ry="' + f(5 * s) + '" fill="#000" opacity=".2"/><text x="' + f(x + 22 * s) + '" y="' + f(y - 22 * s) + '" text-anchor="middle" style="font:900 ' + f(13 * s) + 'px Noto Sans Arabic;fill:#c23a26">بنزين</text>' : '');
}
// عربية ملاكي من الجنب، وفيها السواق (driver: "zizo" أو null). dir = 1 بصة يمين
function carS(x, y, s, t, o) {
  o = o || {}; s = s || 1; var col = o.col || "url(#carRed)", spin = o.spin || 0, dir = o.dir || 1, drv = "";
  if (o.driver) drv = '<g transform="translate(6 -40)">' + faceHead(0, 0, 10, o.mood || "n", t, 1, o.driver) + '</g>';
  var beam = o.lights ? '<path d="M60 -25 L120 -40 L120 -8 Z" fill="#fff4c8" opacity="' + f(0.35 + 0.1 * Math.sin(t * 6)) + '" filter="url(#soft2)"/>' : '';
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s * dir) + ' ' + f(s) + ')"><ellipse cx="0" cy="2" rx="62" ry="4" fill="#000" opacity=".2"/>' +
    '<path d="M-60 -8 V-26 Q-58 -32 -46 -33 L-28 -34 L-14 -52 Q-10 -56 -2 -56 H24 Q31 -56 36 -50 L48 -34 L56 -32 Q62 -30 62 -20 V-8 Z" fill="' + col + '" stroke="' + INK + '" stroke-width="2.6"/>' +
    '<path d="M-24 -34 L-12 -50 H8 V-34 Z" fill="url(#gGlass)" stroke="' + INK + '" stroke-width="1.8"/>' +
    '<path d="M12 -34 V-50 H24 Q28 -50 31 -46 L40 -34 Z" fill="url(#gGlass)" stroke="' + INK + '" stroke-width="1.8"/>' + drv +
    '<rect x="56" y="-28" width="6" height="5" rx="1" fill="#fff4c8" stroke="' + INK + '" stroke-width="1"/><rect x="-61" y="-28" width="5" height="5" fill="#d24a3a" stroke="' + INK + '" stroke-width="1"/>' +
    wheel(-36, -6, 11, t, spin) + wheel(38, -6, 11, t, spin) + beam + '</g>';
}

// ── الشخصيات ───────────────────────────────────────────
// راس بلون البشرة: who = "zizo" (كاب برتقاني بالمقلوب) أو "fikri" (شعر منكوش ونضارة وقلم) أو "guy"
function faceHead(x, y, r, mood, t, look, who) {
  var h = head(x, y, r, mood, t, look).replace('fill="#fbfbf7"', 'fill="' + SKIN + '"').replace('fill="#fff" opacity=".8"', 'fill="#fff" opacity=".25"'), k = r / 22, ex = x + (look || 0) * r * 0.12;
  var ears = '<circle cx="' + f(x - r) + '" cy="' + f(y + 2 * k) + '" r="' + f(5 * k) + '" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="' + f(2 * k) + '"/><circle cx="' + f(x + r) + '" cy="' + f(y + 2 * k) + '" r="' + f(5 * k) + '" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="' + f(2 * k) + '"/>';
  var top = "";
  if (who === "zizo") top = '<path d="M' + f(x - 21 * k) + ' ' + f(y - 7 * k) + ' C' + f(x - 22 * k) + ' ' + f(y - 32 * k) + ' ' + f(x + 22 * k) + ' ' + f(y - 32 * k) + ' ' + f(x + 21 * k) + ' ' + f(y - 7 * k) + ' Z" fill="' + ORANGE + '" stroke="' + INK + '" stroke-width="' + f(2.4 * k) + '"/>' +
      '<path d="M' + f(x - 18 * k) + ' ' + f(y - 11 * k) + ' Q' + f(x - 32 * k) + ' ' + f(y - 12 * k) + ' ' + f(x - 38 * k) + ' ' + f(y - 6 * k) + '" stroke="' + INK + '" stroke-width="' + f(8 * k) + '" stroke-linecap="round" fill="none"/><path d="M' + f(x - 18 * k) + ' ' + f(y - 11 * k) + ' Q' + f(x - 32 * k) + ' ' + f(y - 12 * k) + ' ' + f(x - 38 * k) + ' ' + f(y - 6 * k) + '" stroke="#d66f12" stroke-width="' + f(5 * k) + '" stroke-linecap="round" fill="none"/>' +
      '<circle cx="' + f(x) + '" cy="' + f(y - 25 * k) + '" r="' + f(2.4 * k) + '" fill="#d66f12" stroke="' + INK + '" stroke-width="' + f(1.2 * k) + '"/>';
  else if (who === "fikri") {
    var hp = 'M' + f(x - 22 * k) + ' ' + f(y - 2 * k);
    for (var i = 0; i <= 10; i++) { var a = Math.PI + i / 10 * Math.PI, rr = (i % 2 ? 24 : 31) * k; hp += ' L' + f(x + Math.cos(a) * rr + Math.sin(t * 2 + i) * 0.8) + ' ' + f(y - 4 * k + Math.sin(a) * rr); }
    top = '<path d="' + hp + ' Q' + f(x) + ' ' + f(y - 16 * k) + ' ' + f(x - 22 * k) + ' ' + f(y - 2 * k) + ' Z" fill="#3b2a1e" stroke="' + INK + '" stroke-width="' + f(2 * k) + '"/>' +
      '<g transform="rotate(-35 ' + f(x + 22 * k) + ' ' + f(y - 6 * k) + ')"><rect x="' + f(x + 12 * k) + '" y="' + f(y - 8 * k) + '" width="' + f(24 * k) + '" height="' + f(4.5 * k) + '" fill="#f2c230" stroke="' + INK + '" stroke-width="' + f(1.2 * k) + '"/><path d="M' + f(x + 36 * k) + ' ' + f(y - 8 * k) + ' l' + f(5 * k) + ' ' + f(2.2 * k) + ' l' + f(-5 * k) + ' ' + f(2.3 * k) + ' Z" fill="#e8c9a0" stroke="' + INK + '" stroke-width="' + f(1 * k) + '"/></g>';
  }
  var gl = who === "fikri" ? '<circle cx="' + f(ex - 7 * k) + '" cy="' + f(y - 2 * k) + '" r="' + f(7 * k) + '" fill="#cfe8f5" fill-opacity=".25" stroke="' + INK + '" stroke-width="' + f(2 * k) + '"/><circle cx="' + f(ex + 7 * k) + '" cy="' + f(y - 2 * k) + '" r="' + f(7 * k) + '" fill="#cfe8f5" fill-opacity=".25" stroke="' + INK + '" stroke-width="' + f(2 * k) + '"/><path d="M' + f(ex - 1 * k) + ' ' + f(y - 2 * k) + ' h' + f(2 * k) + '" stroke="' + INK + '" stroke-width="' + f(2 * k) + '"/>' : "";
  if (who === "guy") top = '<path d="M' + f(x - 21 * k) + ' ' + f(y - 6 * k) + ' C' + f(x - 20 * k) + ' ' + f(y - 26 * k) + ' ' + f(x + 20 * k) + ' ' + f(y - 26 * k) + ' ' + f(x + 21 * k) + ' ' + f(y - 6 * k) + ' Q' + f(x) + ' ' + f(y - 14 * k) + ' ' + f(x - 21 * k) + ' ' + f(y - 6 * k) + ' Z" fill="#2a2420"/>';
  return ears + h + top + gl;
}
// شخصية كاملة رجليها عند (x, y). o: who, mood, pose ("stand"|"point"|"wave"|"think"|"cheer"|"phone"|"smoke"|"shiver"|"back"), s, look, walk (سرعة المشي)
function hero(x, y, t, o) {
  o = o || {}; var who = o.who || "zizo", sc = o.s || 1, Z = who === "zizo", F = who === "fikri";
  var top = Z ? ORANGE : F ? "#3d7bd1" : (o.shirt || "#8a6f9e"), pants = Z ? "#3b5f8f" : F ? "#4a4d55" : "#5a4e44", shoe = Z ? "#fbfbf7" : F ? "#7a4a2a" : "#2a2420";
  var wk = o.walk ? Math.sin(t * 9) * 7 : 0, bob = o.walk ? Math.abs(Math.sin(t * 9)) * -2 : Math.sin(t * 3.1 + x) * 1.2, shv = o.pose === "shiver" ? Math.sin(t * 40) * 1.5 : 0;
  var s = '<g transform="translate(' + f(x + shv) + ' ' + f(y + bob) + ') scale(' + f(sc * (o.flip ? -1 : 1)) + ' ' + f(sc) + ')"><ellipse cx="0" cy="2" rx="24" ry="4" fill="#000" opacity=".18"/>';
  s += '<path d="M-8 -38 L' + f(-10 - wk) + ' -4 M8 -38 L' + f(10 + wk) + ' -4" stroke="' + INK + '" stroke-width="11" stroke-linecap="round"/><path d="M-8 -38 L' + f(-10 - wk) + ' -4 M8 -38 L' + f(10 + wk) + ' -4" stroke="' + pants + '" stroke-width="7.5" stroke-linecap="round"/>';
  s += '<ellipse cx="' + f(-12 - wk) + '" cy="-2" rx="9" ry="5" fill="' + shoe + '" stroke="' + INK + '" stroke-width="2"/><ellipse cx="' + f(12 + wk) + '" cy="-2" rx="9" ry="5" fill="' + shoe + '" stroke="' + INK + '" stroke-width="2"/>';
  if (Z) s += '<rect x="-28" y="-80" width="56" height="40" rx="9" fill="#3d6b5a" stroke="' + INK + '" stroke-width="2.4"/>';   // الشنطة ورا الضهر
  s += '<path d="M-22 -36 C-24 -70 -14 -80 0 -80 C14 -80 24 -70 22 -36 Z" fill="' + top + '" stroke="' + INK + '" stroke-width="2.5"/>';
  if (Z) s += '<path d="M-10 -50 H10 V-42 H-10 Z" fill="#d66f12" stroke="' + INK + '" stroke-width="1.6"/><path d="M-4 -78 v10 M4 -78 v10" stroke="#fbfbf7" stroke-width="2"/><path d="M-15 -78 L-12 -40 M15 -78 L12 -40" stroke="#2c4f42" stroke-width="3.5"/>';
  if (F) s += '<path d="M-6 -80 L0 -70 L6 -80" stroke="' + INK + '" stroke-width="2" fill="#fbfbf7"/><circle cx="0" cy="-60" r="1.6" fill="' + INK + '"/><circle cx="0" cy="-50" r="1.6" fill="' + INK + '"/>';
  var p = o.pose || "stand", w = Math.sin(t * 6) * 18;
  var arm = function (sx, ex, ey) { return '<path d="M' + sx + ' -70 Q' + f((sx + ex) / 2) + ' ' + f((-70 + ey) / 2 + 6) + ' ' + f(ex) + ' ' + f(ey) + '" stroke="' + INK + '" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M' + sx + ' -70 Q' + f((sx + ex) / 2) + ' ' + f((-70 + ey) / 2 + 6) + ' ' + f(ex) + ' ' + f(ey) + '" stroke="' + top + '" stroke-width="7.5" fill="none" stroke-linecap="round"/><circle cx="' + f(ex) + '" cy="' + f(ey) + '" r="5" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="1.6"/>'; };
  var extra = "";
  if (p === "point") s += arm(-16, -28, -40) + arm(16, 52, -80 + Math.sin(t * 2) * 3);
  else if (p === "wave") s += arm(-16, -40 - w * 0.4, -110 + Math.abs(w) * 0.2) + arm(16, 40 + w * 0.4, -110 + Math.abs(w) * 0.2);
  else if (p === "think") s += arm(-16, -28, -40) + arm(16, 6, -92);
  else if (p === "cheer") s += arm(-16, -34 - w * 0.2, -112) + arm(16, 34 + w * 0.2, -112);
  else if (p === "phone") { s += arm(-16, -28, -40) + arm(16, 18, -100); extra = '<rect x="12" y="-118" width="12" height="22" rx="3" fill="#1c1c1c" stroke="' + INK + '" stroke-width="1.5"/><rect x="14" y="-115" width="8" height="14" fill="#6fd0ff"/>'; }
  else if (p === "smoke") { s += arm(-16, -28, -40) + arm(16, 22, -92); extra = '<rect x="22" y="-95" width="16" height="3.5" fill="#fbfbf7" stroke="' + INK + '" stroke-width="1"/><circle cx="38" cy="-93.5" r="2.5" fill="#ff7a2e"/>' + smoke(39, -98, t); }
  else if (p === "shiver") s += arm(-16, 10, -56) + arm(16, -10, -56);
  else if (p === "back") s += arm(-16, -30, -60 + w * 0.2) + arm(16, 38, -70 - w * 0.2);
  else s += arm(-16, -26, -38) + arm(16, 26, -38);
  s += faceHead(0, -100, 22, o.mood || "n", t, o.look, who) + extra;
  return s + '</g>';
}
function smoke(x, y, t) { var s = ""; for (var i = 0; i < 4; i++) { var p = (t * 0.6 + i / 4) % 1; s += '<circle cx="' + f(x + Math.sin(p * 6 + i) * 5) + '" cy="' + f(y - p * 40) + '" r="' + f(3 + p * 7) + '" fill="#d8d8d8" opacity="' + f(0.7 * (1 - p)) + '"/>'; } return s; }

// ── أيقونات وأشكال ─────────────────────────────────────
function thermo(x, y, val, s) {   // ترمومتر: val من -50 لـ40
  s = s || 1; var h = 200, k = (val + 50) / 90, lvl = h * clamp(k);
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')"><rect x="-16" y="' + (-h - 20) + '" width="32" height="' + (h + 20) + '" rx="16" fill="#f4f6f8" stroke="' + INK + '" stroke-width="3"/>' +
    '<rect x="-7" y="' + f(-lvl) + '" width="14" height="' + f(lvl + 6) + '" fill="#3d8be0"/><circle cx="0" cy="18" r="24" fill="#3d8be0" stroke="' + INK + '" stroke-width="3"/>' +
    [40, 20, 0, -20, -40].map(function (v) { var yy = -h * (v + 50) / 90; return '<path d="M16 ' + f(yy) + ' h10" stroke="' + INK + '" stroke-width="2"/><text x="30" y="' + f(yy + 5) + '" style="font:800 13px Noto Sans Arabic;fill:' + INK + '" direction="ltr">' + v + '</text>'; }).join("") + '</g>';
}
function snow(t, n) { var s = ""; for (var i = 0; i < (n || 30); i++) { var x = -40 + hash(i) * 440 + Math.sin(t + i) * 10, y = ((hash(i + 3) * 700 + t * (30 + hash(i + 5) * 30)) % 700) - 40; s += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(1.5 + hash(i + 8) * 2.5) + '" fill="#fff" opacity=".9"/>'; } return s; }
function flag(x, y, t, dir) {   // علم بيرفرف ناحية dir
  dir = dir || 1; var p = 'M' + x + ' ' + (y - 120);
  for (var i = 1; i <= 6; i++) p += ' L' + f(x + dir * i * 12) + ' ' + f(y - 120 + Math.sin(t * 8 - i) * 4 * i / 6);
  for (var j = 6; j >= 1; j--) p += ' L' + f(x + dir * j * 12) + ' ' + f(y - 90 + Math.sin(t * 8 - j) * 4 * j / 6);
  return '<path d="M' + x + ' ' + y + ' V' + (y - 124) + '" stroke="' + INK + '" stroke-width="4"/><path d="' + p + ' L' + x + ' ' + (y - 90) + ' Z" fill="#e2573e" stroke="' + INK + '" stroke-width="2.2"/>';
}
function windLines(t, y0, y1, dir, n) {
  var s = ""; dir = dir || 1; n = n || 7;
  for (var i = 0; i < n; i++) { var y = lerp(y0, y1, i / (n - 1)), p = (t * 0.7 + hash(i)) % 1, x = dir > 0 ? lerp(-60, 420, p) : lerp(420, -60, p), L2 = 50 + hash(i + 2) * 40;
    s += '<path d="M' + f(x) + ' ' + f(y) + ' q' + f(dir * L2 * 0.5) + ' -8 ' + f(dir * L2) + ' 0 q' + f(dir * 10) + ' 6 ' + f(dir * 4) + ' 10" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity="' + f(Math.sin(p * Math.PI) * 0.9) + '"/>'; }
  return s;
}
function card(x, y, w, h, col) { return '<rect x="' + f(x - w / 2) + '" y="' + f(y - h / 2) + '" width="' + w + '" height="' + h + '" rx="18" fill="' + (col || "url(#paper)") + '" stroke="' + INK + '" stroke-width="3"/>'; }
function chip(text, x, y, u, u0, col, ic) {   // كارت صغير بيطلع بنطّة
  var k = pop((u - u0) / 0.9); if (k <= 0) return ""; var w = text.length * 13 + 80;
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')"><rect x="' + f(-w / 2) + '" y="-21" width="' + f(w) + '" height="42" rx="21" fill="' + (col || "#fff") + '" stroke="' + INK + '" stroke-width="2.6"/>' +
    '<text x="-14" y="7" text-anchor="middle" style="font:900 19px Noto Sans Arabic;fill:' + INK + '">' + text + '</text><g transform="translate(' + f(w / 2 - 22) + ' 0)">' + (ic || '<circle r="13" fill="#4f9f5a" stroke="' + INK + '" stroke-width="2"/><path d="M-6 0 L-2 5 L7 -5" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round"/>') + '</g></g>';
}
function cigarette(x, y, t, s) { s = s || 1; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(-20) scale(' + f(s) + ')"><rect x="-40" y="-7" width="62" height="14" rx="3" fill="#fbfbf7" stroke="' + INK + '" stroke-width="2.4"/><rect x="-40" y="-7" width="20" height="14" rx="3" fill="#e09a4a" stroke="' + INK + '" stroke-width="2.4"/><rect x="20" y="-7" width="8" height="14" fill="#ff7a2e" stroke="' + INK + '" stroke-width="2"/></g>' + smoke(x + 26 * s, y - 16 * s, t); }
function lighter(x, y, t, s) { s = s || 1; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')"><rect x="-18" y="-20" width="36" height="52" rx="7" fill="#3d7bd1" stroke="' + INK + '" stroke-width="2.6"/><rect x="-14" y="-32" width="28" height="13" rx="3" fill="url(#gMetal)" stroke="' + INK + '" stroke-width="2.2"/></g>' + flame(x + 2 * s, y - 32 * s, 0.6 * s, t, 3); }
function match(x, y, t, s) { s = s || 1; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(15) scale(' + f(s) + ')"><rect x="-4" y="-20" width="8" height="58" rx="2" fill="#e9c98a" stroke="' + INK + '" stroke-width="2.2"/><ellipse cx="0" cy="-22" rx="7" ry="9" fill="#c23a26" stroke="' + INK + '" stroke-width="2.2"/></g>' + flame(x - 5 * s, y - 28 * s, 0.7 * s, t, 5); }
function keyIcon(x, y, a, s) { s = s || 1; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(a) + ') scale(' + f(s) + ')"><circle cx="0" cy="-26" r="16" fill="url(#gGold)" stroke="' + INK + '" stroke-width="2.6"/><circle cx="0" cy="-30" r="5" fill="#2b2016"/><path d="M-5 -12 V30 H5 V24 H11 V18 H5 V12 H11 V6 H5 V-12 Z" fill="url(#gGold)" stroke="' + INK + '" stroke-width="2.4"/></g>'; }
function clock(x, y, r, t) {
  var a = (Math.floor(t * 2) * 30) % 360, b = t * 8 % 360, s = '<g transform="translate(' + f(x) + ' ' + f(y) + ')"><circle r="' + r + '" fill="#fbfbf7" stroke="' + INK + '" stroke-width="3.5"/>';
  for (var i = 0; i < 12; i++) { var q = i / 12 * 6.283; s += '<path d="M' + f(Math.cos(q) * r * 0.78) + ' ' + f(Math.sin(q) * r * 0.78) + ' L' + f(Math.cos(q) * r * 0.9) + ' ' + f(Math.sin(q) * r * 0.9) + '" stroke="' + INK + '" stroke-width="2.4"/>'; }
  return s + '<path d="M0 0 L0 ' + f(-r * 0.5) + '" stroke="' + INK + '" stroke-width="4" stroke-linecap="round" transform="rotate(' + f(b) + ')"/><path d="M0 0 L0 ' + f(-r * 0.75) + '" stroke="#c23a26" stroke-width="2.6" stroke-linecap="round" transform="rotate(' + f(a) + ')"/><circle r="4" fill="' + INK + '"/></g>';
}
function fireTruck(x, y, s, t) {
  s = s || 1; var on = Math.floor(t * 6) % 2;
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')"><ellipse cx="0" cy="2" rx="96" ry="5" fill="#000" opacity=".2"/>' +
    '<rect x="-90" y="-62" width="120" height="54" rx="6" fill="#d8322a" stroke="' + INK + '" stroke-width="2.6"/><path d="M30 -8 V-56 Q30 -62 38 -62 H62 Q72 -62 78 -50 L88 -30 V-8 Z" fill="#d8322a" stroke="' + INK + '" stroke-width="2.6"/>' +
    '<path d="M40 -56 H62 Q68 -56 72 -48 L78 -34 H40 Z" fill="url(#gGlass)" stroke="' + INK + '" stroke-width="1.8"/><rect x="-86" y="-74" width="110" height="7" fill="url(#gMetal)" stroke="' + INK + '" stroke-width="1.8"/>' +
    '<path d="M-80 -70 L20 -70" stroke="' + INK + '" stroke-width="1.6" stroke-dasharray="6 6"/><rect x="-90" y="-30" width="120" height="6" fill="#fbfbf7"/>' +
    '<rect x="44" y="-72" width="10" height="9" rx="2" fill="' + (on ? "#4fb3ff" : "#ff4a3a") + '" stroke="' + INK + '" stroke-width="1.5"/><rect x="58" y="-72" width="10" height="9" rx="2" fill="' + (on ? "#ff4a3a" : "#4fb3ff") + '" stroke="' + INK + '" stroke-width="1.5"/>' +
    '<circle cx="49" cy="-68" r="' + (on ? 16 : 6) + '" fill="#4fb3ff" opacity=".35" filter="url(#soft2)"/>' +
    wheel(-60, -4, 12, t, 1.5) + wheel(-30, -4, 12, t, 1.5) + wheel(60, -4, 12, t, 1.5) + '</g>';
}
function ambIcon(x, y, s) { s = s || 1; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')"><rect x="-34" y="-30" width="68" height="40" rx="6" fill="#fbfbf7" stroke="' + INK + '" stroke-width="2.6"/><path d="M-6 -20 h12 v8 h8 v12 h-8 v8 h-12 v-8 h-8 v-12 h8 Z" fill="#d8322a"/><circle cx="-18" cy="12" r="7" fill="#26272a"/><circle cx="18" cy="12" r="7" fill="#26272a"/></g>'; }
function people(x0, y, t, n, mood, dx) {   // ناس من بعيد
  var s = ""; for (var i = 0; i < n; i++) s += hero(x0 + i * (dx || 28) + Math.sin(i * 7) * 6, y + (i % 2) * 8, t + i, { who: "guy", s: 0.42, mood: mood || "worry", shirt: ["#8a6f9e", "#5f9a6a", "#c97a4a", "#4f7fa8"][i % 4], look: -0.5 });
  return s;
}
function hill(x, y, w, h) { return '<path d="M' + f(x - w) + ' ' + f(y + h) + ' Q' + f(x - w * 0.5) + ' ' + f(y) + ' ' + f(x) + ' ' + f(y) + ' Q' + f(x + w * 0.5) + ' ' + f(y) + ' ' + f(x + w) + ' ' + f(y + h) + ' Z" fill="#a8bd6e" stroke="' + INK + '" stroke-width="3"/>'; }
function bigNum(text, x, y, size, col, k) { if (k <= 0) return ""; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')"><text x="0" y="0" text-anchor="middle" direction="ltr" style="font:900 ' + size + 'px Noto Sans Arabic;fill:' + (col || "#ffd23a") + ';stroke:' + INK + ';stroke-width:5;paint-order:stroke">' + text + '</text></g>'; }
function distArrow(x1, x2, y, label2, k, col) {   // سهم مسافة بسنّين
  if (k <= 0) return ""; var xe = lerp(x1, x2, k);
  return '<path d="M' + f(x1) + ' ' + y + ' H' + f(xe) + '" stroke="' + INK + '" stroke-width="7"/><path d="M' + f(x1) + ' ' + y + ' H' + f(xe) + '" stroke="' + (col || "#ffd23a") + '" stroke-width="4"/>' +
    '<path d="M' + f(x1) + ' ' + (y - 10) + ' V' + (y + 10) + ' M' + f(xe) + ' ' + (y - 10) + ' V' + (y + 10) + '" stroke="' + INK + '" stroke-width="4"/>' + (k > 0.6 ? bigNum(label2, (x1 + xe) / 2, y - 14, 30, col, pop((k - 0.6) / 0.4)) : "");
}

// ── المشاهد ────────────────────────────────────────────
// 0: زيزو سايق والعربية البنزين مقلوبة قدامه والبنزين بيجري
shot(0, camMove([170, 370, 1.3], [205, 378, 1.45]), function (u, d, t) {
  var cx = lerp(-60, 95, ease(u / 3.2)), sp = u < 3.2 ? 2 * (1 - u / 3.2) : 0;
  return bgSky("day") + sun(300, 110, 26) + clouds(t, 12, 70, 4, 0.9, 0.6) + hillsFar(345) + road2(350, t, 0) +
    carS(cx, 402, 0.8, t, { driver: "zizo", mood: u > 3 ? "shock" : "n", spin: sp, lights: true }) +
    tanker(262, 400, 0.75, t, true) + drips(193, 392, 406, t) + puddle(240, 408, 90, 0.35 + 0.65 * ease(u / d), t) + vapor(240, 404, 120, 60, t, 0.25 + 0.2 * ease(u / d)) + tag("عربية بنزين مقلوبة!", 210, 270, u, 3.4, -3, 18, "#f08a24");
});
// 1: تقف ولا تعدّي؟
shot(1, camPush(180, 320, 1.05, 1.15), function (u, d, t) {
  var look = Math.sin(u * 3) > 0 ? 0.7 : -0.7;
  return bgSky("day") + clouds(t, 12, 70, 4, 0.9, 0.6) + road2(380, t, 0) + tanker(330, 418, 0.7, t, true) + puddle(300, 428, 70, 1, t) +
    carS(120, 430, 1.9, t, { driver: "zizo", mood: "curious" }) +
    bubble(95, 170, "أقف؟", u, 0.2, 24) + bubble(255, 220, "أعدّي؟", u, 1.0, 24) + qmark(180, 120 + Math.sin(t * 2) * 4, t, 70, "#ffd23a").replace("<text", "<text opacity=\"" + f(clamp((u - 1.5) / 0.5)) + "\"");
});
// 2: ليه ناس بتموت وهي بعيدة؟
shot(2, camMove([230, 385, 1.6], [185, 370, 1.3]), function (u, d, t) {
  return bgSky("day") + clouds(t, 12, 60, 4, 0.9, 0.6) + hillsFar(350) + road2(360, t, 0) + tanker(300, 400, 0.55, t, true) + puddle(290, 408, 60, 1, t) +
    creep(290, 80, 410, t, 0.3 + 0.7 * ease(u / d), 0.45) + people(62, 430, t, 4, "worry") + qmark(185, 300, t, 90, "#ffd23a") +
    arrow(250, 300, 110, 300, "#8fdc6e", 6, ease((u - 0.8) / 1.5));
});
// 3: الخطر مش البنزين السايل، الخطر البخار
shot(3, camPush(180, 330, 1.0, 1.12), function (u, d, t) {
  return bgSky("day") + groundOnly(360) + '<rect x="-300" y="360" width="960" height="900" fill="url(#asph)"/>' +
    puddle(180, 420, 150, 1, t) + vapor(180, 410, 220, 230 * clamp(0.3 + u / 3), t, clamp(0.3 + u / 3) * 0.75) +
    cross(70, 455, u, 2.0, 1.1) + tag("مش السايل", 150, 462, u, 2.0, -2, 18, "#e8c48e") +
    (u > 3.6 ? pulse(180, 250, t, "#c23a26", 90) : "") + tag("البخار!", 180, 120, u, 3.6, -3, 34, "#f08a24");
});
// 4: بيتبخر حتى في البرد، يولّع تحت الصفر بأربعين
shot(4, camPush(180, 320, 1.0, 1.08), function (u, d, t) {
  var v = lerp(25, -43, ease((u - 0.8) / 3.5));
  return '<rect x="-300" y="-400" width="960" height="1440" fill="url(#cold)"/>' + snow(t, 40) + '<rect x="-300" y="400" width="960" height="900" fill="#e8eef3"/><rect x="-300" y="398" width="960" height="5" fill="#fff"/>' +
    puddle(160, 425, 60, 1, t) + vapor(160, 420, 100, 160, t, 0.6) + hero(62, 445, t, { who: "zizo", mood: "worry", pose: "shiver", s: 0.65 }) +
    thermo(270, 330, v, 0.9) + bigNum("-40°", 270, 120, 46, "#3d8be0", pop((u - 3.4) / 0.8));
});
// 5: البخار أتقل من الهوا وبيزحف على الأرض
shot(5, camPan(230, 160, 375, 1.3), function (u, d, t) {
  return bgSky("day") + clouds(t, 12, 70, 3, 0.9, 0.6) + hillsFar(350) + road2(360, t, 0) + tanker(300, 398, 0.6, t, true) + puddle(290, 408, 60, 1, t) +
    carS(30, 420, 0.6, t, { col: "#e2b035" }) + creep(290, -20, 412, t, ease(u / (d * 0.8)), 0.6) +
    arrow(300, 450, 60, 450, "#8fdc6e", 7, ease((u - 0.6) / 2.5)) + tag("أتقل من الهوا", 195, 225, u, 0.6, -3, 24, "#e8c48e") +
    arrow(195, 255, 195, 330, "#8fdc6e", 6, ease((u - 1) / 1.2));
});
// 6: واحد ونص في المية بس يكفي
shot(6, camPush(180, 300, 1.0, 1.1), function (u, d, t) {
  var pct = lerp(0, 1.5, ease((u - 0.4) / 1.8)), boomK = clamp((u - 3.6) / 0.35), dots = "";
  for (var i = 0; i < 60; i++) { var gx = 70 + hash(i) * 220 + Math.sin(t * 2 + i) * 5, gy = 130 + hash(i + 5) * 220 + Math.cos(t * 1.7 + i) * 5; dots += '<circle cx="' + f(gx) + '" cy="' + f(gy) + '" r="' + (i < 3 ? 7 : 4) + '" fill="' + (i < 3 ? VAP : "#9cc8ee") + '" stroke="' + (i < 3 ? "#3f8a2a" : "none") + '" stroke-width="2"/>'; }
  return bgFill("#24384f") + '<rect x="50" y="110" width="260" height="260" rx="24" fill="#3b5674" stroke="' + INK + '" stroke-width="4"/>' + dots +
    bigNum(pct.toFixed(1) + "%", 180, 440, 60, "#8fdc6e", clamp(u / 0.4)) + spark(250, 330, t, clamp((u - 3.0) / 0.3)) + boom(180, 240, 140, t, boomK);
});
// 7: النار ممكن تولّع من سيجارة بعيد أو من موتور عربيتك
shot(7, camMove([185, 380, 1.25], [175, 385, 1.3]), function (u, d, t) {
  var reach = ease(u / 2.4), fire = clamp((u - 2.6) / 1.6);
  return bgSky("dusk") + hillsFar(350) + road2(360, t, 0) + tanker(320, 396, 0.5, t, true) + puddle(310, 406, 50, 1, t) +
    creep(310, 62, 412, t, reach, 0.55) + hero(55, 440, t, { who: "guy", s: 0.5, pose: "smoke", mood: u > 2.6 ? "shock" : "n" }) +
    carS(160, 432, 0.55, t, { col: "#4f8f5a" }) + '<path d="M120 420 q-8 -10 0 -20 q8 -10 0 -20" stroke="#ff7a2e" stroke-width="3" fill="none" opacity="' + f(0.5 + 0.5 * Math.sin(t * 8)) + '"/>' +
    (fire > 0 ? flame(lerp(62, 310, fire), 412, 0.6, t, 1) + flame(lerp(62, 310, fire * 0.6), 412, 0.45, t, 2) + flame(62, 412, 0.5, t, 3) : "") +
    spark(68, 412, t, u > 2.4 && u < 3 ? 1 : 0);
});
// 8: ما تعدّيش فوق البنزين أو جوه البخار
shot(8, camPush(195, 345, 1.0, 1.06), function (u, d, t) {
  var cx = lerp(-60, 70, ease(u / 1.8));
  return bgSky("day") + road2(370, t, 0) +
    carS(cx, 418, 1.1, t, { driver: "zizo", mood: u > 1.8 ? "worry" : "n", spin: u < 1.8 ? 1.5 : 0, lights: true }) +
    tanker(292, 412, 0.55, t, true) + puddle(232, 420, 90, 1, t) + vapor(232, 414, 140, 140, t, 0.55) +
    (u > 1.6 ? '<path d="M150 300 V440" stroke="#c23a26" stroke-width="5" stroke-dasharray="10 8"/>' : "") + cross(232, 250, u, 1.8, 2.2) + tag("ما تعدّيش!", 180, 130, u, 1.0, -3, 30, "#e8c48e");
});
// 9: اقف بعيد، تلتمية متر، ولو فيه نار تمنمية
shot(9, camMove([180, 350, 1.15], [180, 345, 1.08]), function (u, d, t) {
  var fireK = clamp((u - 2.3) / 0.5);
  return bgSky("day") + clouds(t, 10, 60, 3, 0.9, 0.5) + hillsFar(350) + road2(380, t, 0) + carS(45, 425, 0.55, t, { driver: "zizo", mood: "n", lights: true }) + tanker(285, 425, 0.45, t, true) + puddle(268, 430, 45, 1, t) +
    (fireK > 0 ? flame(268, 415, 0.9 * fireK, t, 1) + flame(298, 417, 0.7 * fireK, t, 4) : "") +
    distArrow(260, 95, 310, "300 م", ease((u - 0.4) / 1.4), "#ffd23a") + distArrow(260, 25, 240, "800 م", ease((u - 2.6) / 1.4), "#ff7a2e");
});
// 10: اقف عكس اتجاه الهوا
shot(10, camPush(185, 345, 1.12, 1.2), function (u, d, t) {
  return bgSky("day") + clouds(t, 30, 70, 4, 0.9, 0.6) + groundOnly(400) + windLines(t, 150, 380, 1, 7) +
    flag(150, 400, t, 1) + hero(70, 440, t, { who: "zizo", mood: "happy", pose: "point", s: 0.75 }) + tanker(290, 430, 0.42, t, true) + puddle(290, 440, 40, 1, t) +
    creep(290, 400, 430, t, 1, 0.5) + arrow(60, 170, 300, 170, "#fff", 7, ease((u - 0.6) / 1.6)) + tag("الهوا", 180, 130, u, 0.8, -3, 24, "#e8c48e") + check(70, 260, u, 2.4, 1.1);
});
// 11: اقف في حتة عالية، البنزين بينزل للواطي
shot(11, camPush(180, 320, 1.0, 1.1), function (u, d, t) {
  var flow = ease(u / 2.5);
  return bgSky("day") + clouds(t, 12, 70, 3, 0.9, 0.6) + groundOnly(430) + hill(80, 230, 240, 220) +
    hero(80, 236, t, { who: "zizo", mood: "happy", pose: "cheer", s: 0.7 }) +
    '<path d="M200 330 Q250 380 300 430" stroke="#d9bf5e" stroke-width="' + f(6 * flow + 1) + '" fill="none" stroke-linecap="round"/>' + puddle(300, 440, 70, 0.3 + 0.7 * flow, t) + vapor(300, 436, 90, 70, t, 0.5) +
    arrow(150, 330, 250, 420, "#8fdc6e", 6, ease((u - 0.8) / 1.4)) + check(150, 170, u, 1.4, 1.1) + cross(300, 360, u, 2.6, 1);
});
// 12: اطفي الموتور، الموتور السخن والشكمان ممكن يولّعوا البخار
shot(12, camPush(180, 300, 1.0, 1.08), function (u, d, t) {
  var turn = ease((u - 0.4) / 0.7), cool = ease((u - 1.2) / 2), needle = lerp(-40 + Math.sin(t * 30) * 4, -130, turn);
  var heat = ""; for (var i = 0; i < 3; i++) { var p = (t * 0.9 + i / 3) % 1; heat += '<path d="M' + (230 + i * 22) + ' ' + f(430 - p * 50) + ' q6 -8 0 -16 q-6 -8 0 -16" stroke="#ff7a2e" stroke-width="3" fill="none" opacity="' + f((1 - p) * (1 - cool)) + '"/>'; }
  return bgFill("#2a2f36") + '<path d="M-100 60 H460 V300 Q180 270 -100 300 Z" fill="url(#dash)" stroke="' + INK + '" stroke-width="3"/>' +
    '<circle cx="110" cy="170" r="70" fill="#14171b" stroke="#6a717a" stroke-width="4"/><path d="M110 170 L' + f(110 + Math.cos(needle * Math.PI / 180) * 58) + ' ' + f(170 + Math.sin(needle * Math.PI / 180) * 58) + '" stroke="#ff4a3a" stroke-width="5" stroke-linecap="round"/><circle cx="110" cy="170" r="8" fill="#6a717a"/>' +
    '<circle cx="260" cy="190" r="30" fill="#14171b" stroke="#6a717a" stroke-width="4"/>' + keyIcon(260, 205, lerp(0, -90, turn), 1) +
    '<rect x="160" y="410" width="160" height="26" rx="13" fill="' + (cool < 0.5 ? "#c9502e" : "#6f7d8a") + '" stroke="' + INK + '" stroke-width="3"/><rect x="160" y="410" width="160" height="26" rx="13" fill="#4f8fd0" opacity="' + f(cool) + '"/>' + heat +
    tag("اطفي الموتور", 180, 330, u, 0.8, -3, 24, "#e8c48e");
});
// 13: اقفل الشبابيك والتكييف على الدوران الداخلي
shot(13, camPush(180, 300, 1.0, 1.06), function (u, d, t) {
  var g = ease((u - 0.4) / 1.6), wy = lerp(260, 120, g);
  return bgSky("day") + vapor(60, 330, 120, 200, t, 0.45) + vapor(300, 330, 120, 200, t, 0.45, 5) +
    '<rect x="20" y="100" width="320" height="280" rx="30" fill="#2c5f99" stroke="' + INK + '" stroke-width="4"/><rect x="40" y="120" width="280" height="140" rx="16" fill="#cfe1ec" stroke="' + INK + '" stroke-width="3"/>' +
    faceHead(120, 210, 26, "worry", t, 0.3, "zizo") + faceHead(240, 210, 26, "n", t, -0.3, "fikri") +
    '<rect x="40" y="' + f(wy) + '" width="280" height="' + f(260 - wy) + '" fill="url(#gGlass)" opacity=".75" stroke="' + INK + '" stroke-width="2"/>' +
    '<rect x="40" y="260" width="280" height="110" fill="#2c5f99"/>' +
    '<g transform="translate(180 320)"><circle r="34" fill="#14171b" stroke="#6a717a" stroke-width="3"/><path d="M-14 6 h28 l-4 -10 h-20 Z" fill="#fbfbf7"/><g transform="rotate(' + f(t * 160) + ')"><path d="M-22 -4 A22 22 0 0 1 18 -12" stroke="#6fd0ff" stroke-width="4" fill="none"/><path d="M18 -12 l2 -9 l6 8 Z" fill="#6fd0ff"/><path d="M22 4 A22 22 0 0 1 -18 12" stroke="#6fd0ff" stroke-width="4" fill="none"/><path d="M-18 12 l-2 9 l-6 -8 Z" fill="#6fd0ff"/></g></g>' +
    check(250, 320, u, 2.6, 0.9);
});
// 14: ممنوع سجاير ولا ولّاعة ولا أي نار
shot(14, camPush(180, 300, 1.0, 1.06), function (u, d, t) {
  var a = pop((u - 0.1) / 0.8), b = pop((u - 1.3) / 0.8), c = pop((u - 2.5) / 0.8);
  return bgFill("#3a2a24") + '<circle cx="180" cy="300" r="260" fill="#5a3a2c" opacity=".6" filter="url(#soft)"/>' +
    (a > 0 ? '<g transform="translate(180 140) scale(' + f(a) + ')">' + cigarette(0, 0, t, 1.3) + '</g>' : "") + cross(250, 160, u, 0.6, 1.1) +
    (b > 0 ? '<g transform="translate(90 330) scale(' + f(b) + ')">' + lighter(0, 0, t, 1.2) + '</g>' : "") + cross(140, 360, u, 1.8, 1.1) +
    (c > 0 ? '<g transform="translate(270 340) scale(' + f(c) + ')">' + match(0, 0, t, 1.2) + '</g>' : "") + cross(320, 370, u, 3.0, 1.1);
});
// 15: المطافي ١٨٠، والإسعاف ١٢٣
shot(15, camPush(180, 300, 1.0, 1.08), function (u, d, t) {
  return bgSky("day") + groundOnly(440) + hero(80, 460, t, { who: "fikri", mood: "n", pose: "phone", s: 1.1 }) +
    card(250, 200, 190, 130, "#fff") + fireTruck(250, 225, 0.7, t * 0.3) + bigNum("180", 250, 175, 42, "#d8322a", pop((u - 0.3) / 0.8)) +
    card(250, 370, 190, 120, "#fff") + ambIcon(250, 395, 1) + bigNum("123", 250, 350, 42, "#d8322a", pop((u - 1.9) / 0.8)) +
    pulse(118, 350, t, "#6fd0ff", 26);
});
// 16: قولّهم المكان بالظبط، وإنها عربية بنزين، وإن فيه تسريب
shot(16, camPush(180, 290, 1.0, 1.06), function (u, d, t) {
  var grid = ""; for (var i = 0; i < 6; i++) grid += '<path d="M' + (40 + i * 56) + ' 70 V300 M30 ' + (80 + i * 44) + ' H330" stroke="#e2d6b8" stroke-width="3"/>';
  var pinY = 170 - 30 * Math.abs(Math.sin(t * 3));
  return bgFill("#e9e1cc") + card(180, 185, 300, 240, "#f6efdf") + grid + '<path d="M30 200 Q180 150 330 230" stroke="#9aa0a6" stroke-width="16" fill="none"/>' +
    pulse(180, 185, t, "#c23a26", 30) + '<g transform="translate(180 ' + f(pinY + 15) + ')"><path d="M0 0 C-22 -26 -18 -48 0 -48 C18 -48 22 -26 0 0 Z" fill="#c23a26" stroke="' + INK + '" stroke-width="2.6"/><circle cy="-32" r="7" fill="#fff"/></g>' +
    chip("المكان بالظبط", 180, 330, u, 0.2) + chip("عربية بنزين", 180, 378, u, 1.4) + chip("فيه تسريب", 180, 426, u, 2.6);
});
// 17: لو شميت ريحة بنزين أو دخت، ابعد أكتر
shot(17, camMove([200, 320, 1.1], [150, 320, 1.0]), function (u, d, t) {
  var back = ease((u - 1.8) / 1.8), x = lerp(220, 70, back);
  var stink = ""; for (var i = 0; i < 3; i++) stink += '<path d="M' + f(x + 30 + i * 12) + ' ' + f(300 - i * 4) + ' q8 -12 0 -24 q-8 -12 0 -24" stroke="#5fae45" stroke-width="3" fill="none" opacity="' + f(0.8 * (1 - back)) + '"/>';
  return bgSky("day") + groundOnly(430) + vapor(320, 440, 160, 220, t, 0.55) + puddle(320, 445, 70, 1, t) +
    hero(x, 450, t, { who: "zizo", mood: back > 0.05 ? "worry" : "dizzy", pose: back > 0.05 ? "back" : "think", s: 0.9, walk: back > 0.05 && back < 0.98, flip: back > 0.05 }) + stink +
    arrow(200, 160, 60, 160, "#ffd23a", 8, ease((u - 1.8) / 1.2)) + tag("ابعد!", 130, 110, u, 2.0, -3, 30, "#e8c48e");
});
// 18: ما تقرّبش تصوّر، وسيب الشغل للمطافي
shot(18, camPush(180, 320, 1.0, 1.06), function (u, d, t) {
  var ft = ease((u - 2.4) / 2), pk = clamp(1 - (u - 2.2) / 0.4);
  return bgSky("day") + clouds(t, 12, 70, 3, 0.9, 0.5) + hillsFar(350) + road2(370, t, 0) + tanker(240, 408, 0.55, t, true) + puddle(230, 416, 60, 1, t) + vapor(230, 412, 90, 80, t, 0.4) +
    fireTruck(lerp(520, 100, ft), 440, 0.6, t * (ft < 1 ? 1 : 0)) +
    (pk > 0 ? '<g opacity="' + f(pk) + '">' + phone(180, 230, t, 0.75, '<rect width="120" height="220" fill="#7fb7e0"/><rect y="140" width="120" height="80" fill="#5e5b57"/><circle cx="16" cy="18" r="' + (Math.floor(t * 3) % 2 ? 5 : 0) + '" fill="#ff3a2a"/>' + tanker(70, 160, 0.3, t, true)) + '</g>' + cross(240, 140, u, 0.7, 1.3) : "") +
    tag("سيبها للمطافي", 180, 120, u, 3.0, -3, 26, "#e8c48e");
});
// 19: نبّه الناس اللي حواليك يبعدوا، الثانية بتفرق
shot(19, camPush(180, 330, 1.0, 1.06), function (u, d, t) {
  var go = ease(u / d);
  return bgSky("day") + groundOnly(430) + vapor(340, 440, 120, 160, t, 0.45) +
    hero(220, 455, t, { who: "zizo", mood: "shock", pose: "wave", s: 0.9 }) + hero(130 - go * 60, 450, t, { who: "fikri", mood: "worry", s: 0.65, walk: true, flip: true }) +
    people(40 - go * 90, 450, t * 1.3, 3, "worry") + clock(285, 140, 46, t) + arrow(150, 290, 30, 290, "#ffd23a", 7, ease((u - 0.4) / 1.2));
});
// 20: افتكر: ابعد، عكس الهوا، في العالي، اطفي الموتور، واتصل
shot(20, camPush(180, 300, 1.0, 1.04), function (u, d, t) {
  var tt = [1.6, 2.4, 3.3, 4.2, 5.4], cells = [
    ["ابعد", 260, 150, '<path d="M14 0 H-14 M-4 -10 L-14 0 L-4 10" stroke="' + INK + '" stroke-width="5" fill="none" stroke-linecap="round"/>'],
    ["عكس الهوا", 100, 150, '<path d="M-16 -6 q10 -6 22 0 q6 4 2 8 M-16 6 q12 -4 26 2" stroke="#3d8be0" stroke-width="4" fill="none" stroke-linecap="round"/>'],
    ["في العالي", 260, 270, '<path d="M-18 10 Q0 -14 18 10 Z" fill="#a8bd6e" stroke="' + INK + '" stroke-width="2.4"/><circle cx="0" cy="-6" r="4" fill="' + ORANGE + '"/>'],
    ["اطفي الموتور", 100, 270, keyIcon(0, 4, 0, 0.45)],
    ["اتصل", 180, 390, '<rect x="-9" y="-15" width="18" height="30" rx="4" fill="#1c1c1c"/><rect x="-6" y="-11" width="12" height="20" fill="#6fd0ff"/>']];
  var s = bgSky("day") + clouds(t, 12, 60, 3, 0.9, 0.5) + tag("افتكر", 180, 70, u, 0.8, -3, 30, "#f08a24");
  cells.forEach(function (c, i) { var k = pop((u - tt[i]) / 0.9); if (k <= 0) return; s += '<g transform="translate(' + c[1] + ' ' + c[2] + ') scale(' + f(k) + ')"><rect x="-74" y="-48" width="148" height="96" rx="20" fill="#fff" stroke="' + INK + '" stroke-width="3"/><circle cx="0" cy="-18" r="20" fill="#fdf1d6" stroke="' + INK + '" stroke-width="2"/><g transform="translate(0 -18)">' + c[3] + '</g><text x="0" y="30" text-anchor="middle" style="font:900 18px Noto Sans Arabic;fill:' + INK + '">' + c[0] + '</text><circle cx="58" cy="-34" r="11" fill="' + ORANGE + '" stroke="' + INK + '" stroke-width="2"/><text x="58" y="-29" text-anchor="middle" style="font:900 13px Noto Sans Arabic;fill:#fff">' + (i + 1) + '</text></g>'; });
  return s + hero(40, 490, t, { who: "zizo", mood: "happy", pose: "cheer", s: 0.55 }) + hero(320, 490, t, { who: "fikri", mood: "happy", pose: "wave", s: 0.55 });
});
