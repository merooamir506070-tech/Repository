// «رادار السرعة بيعرف سرعتك إزاي؟» — مشهد لكل سطر من script.txt
// ── أشكال خاصة بالفيديو ده ─────────────────────────────
var RW = "#3fb6e8";   // لون موجة الرادار
// عربية كبيرة من الجنب (بوزها ناحية اليمين لو dir=1)، عجلها بيلف
function bigCar(x, y, col, s, t, dir) {
  s = s || 1; dir = dir || 1; var a = (t * 520) % 360;
  var wheel = function (cx) { return '<g transform="translate(' + cx + ' 0)"><circle r="17" fill="#222" stroke="' + INK + '" stroke-width="3"/><circle r="8" fill="#b9bec4" stroke="' + INK + '" stroke-width="2"/><path d="M-8 0 H8 M0 -8 V8" stroke="' + INK + '" stroke-width="2" transform="rotate(' + f(a * dir) + ')"/></g>'; };
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s * dir) + ' ' + f(s) + ')">' +
    '<ellipse cx="0" cy="18" rx="88" ry="7" fill="#000" opacity=".25"/>' +
    '<path d="M-86 0 L-86 -26 Q-84 -34 -70 -36 L-40 -38 L-18 -62 Q-12 -66 0 -66 L36 -66 Q46 -66 54 -56 L70 -38 L80 -36 Q90 -32 90 -20 L90 0 Z" fill="' + col + '" stroke="' + INK + '" stroke-width="3.4" stroke-linejoin="round"/>' +
    '<path d="M-30 -38 L-12 -58 L14 -58 L14 -38 Z M22 -38 L22 -58 L42 -58 Q48 -58 52 -52 L62 -38 Z" fill="url(#gGlass)" stroke="' + INK + '" stroke-width="2.4"/>' +
    '<path d="M-80 -18 H84" stroke="#fff" stroke-width="3" opacity=".35"/>' +
    '<rect x="80" y="-30" width="10" height="8" rx="2" fill="#fff3b0" stroke="' + INK + '" stroke-width="1.6"/>' +
    '<rect x="-88" y="-30" width="7" height="8" rx="2" fill="#e8443a" stroke="' + INK + '" stroke-width="1.6"/>' +
    wheel(-52) + wheel(56) + '</g>';
}
// عمود الرادار: صندوق فيه طبق الرادار وعدسة الكاميرا، وبيضرب فلاش لما fl > 0
function radarPole(x, y, t, fl, s) {
  s = s || 1; fl = fl || 0; var led = 0.5 + 0.5 * Math.sin(t * 8);
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + s + ')">' +
    '<rect x="-7" y="-150" width="14" height="150" fill="url(#gMetal)" stroke="' + INK + '" stroke-width="3"/>' +
    '<rect x="-46" y="-215" width="92" height="70" rx="8" fill="#e9e4d6" stroke="' + INK + '" stroke-width="3.4"/>' +
    '<rect x="-46" y="-215" width="92" height="14" rx="6" fill="#f2c230" stroke="' + INK + '" stroke-width="2.4"/>' +
    '<circle cx="-18" cy="-170" r="16" fill="#3a4048" stroke="' + INK + '" stroke-width="3"/><circle cx="-18" cy="-170" r="7" fill="' + RW + '"/>' +
    '<rect x="6" y="-184" width="30" height="26" rx="5" fill="#fff" stroke="' + INK + '" stroke-width="2.4"/>' +
    '<circle cx="36" cy="-206" r="3.5" fill="#e8443a" opacity="' + f(led) + '"/>' +
    (fl > 0 ? '<circle cx="21" cy="-171" r="' + f(40 + fl * 60) + '" fill="#fff" opacity="' + f(fl * 0.9) + '" filter="url(#glow)"/>' : '') + '</g>';
}
// قوة الفلاش: نبضة سريعة عند الثانية u0
function flashK(u, u0) { var k = u - u0; return k < 0 || k > 0.5 ? 0 : 1 - k / 0.5; }
function whiteOut(k) { return k > 0 ? '<rect x="-400" y="-300" width="1440" height="960" fill="#fff" opacity="' + f(k * 0.75) + '"/>' : ""; }
// قوس موجة (زي ")" لو dir=1) عند x
function arcW(x, y, r, dir, col, op, w) {
  var x1 = x - dir * r * 0.35, d = 'M' + f(x1) + ' ' + f(y - r) + ' Q' + f(x + dir * r * 0.35) + ' ' + f(y) + ' ' + f(x1) + ' ' + f(y + r);
  return '<path d="' + d + '" stroke="' + INK + '" stroke-width="' + ((w || 5) + 3) + '" fill="none" stroke-linecap="round" opacity="' + f(op) + '"/><path d="' + d + '" stroke="' + (col || RW) + '" stroke-width="' + (w || 5) + '" fill="none" stroke-linecap="round" opacity="' + f(op) + '"/>';
}
// موجات خارجة من x0 ماشية لحد x1 (بالمسافة gap بين كل موجة)
function waveTrain(x0, x1, y, t, gap, dir, col, r) {
  var s = "", len = Math.abs(x1 - x0), off = (t * 90) % gap;
  for (var p = off; p < len; p += gap) s += arcW(x0 + dir * p, y, (r || 26) + p * 0.05, dir, col, 1 - p / len * 0.7);
  return s;
}
// موجة جيبية طول موجتها بيتغير (لتأثير الزنقة والمط)
function sineW(x, y, len, lam, amp, col, t, w) {
  var d = "", ph = t * 7;
  for (var i = 0; i <= len; i += 3) d += (i ? " L" : "M") + f(x + i) + " " + f(y + Math.sin(i / lam * 6.283 - ph) * amp);
  return '<path d="' + d + '" stroke="' + INK + '" stroke-width="' + ((w || 5) + 3) + '" fill="none" stroke-linecap="round"/><path d="' + d + '" stroke="' + col + '" stroke-width="' + (w || 5) + '" fill="none" stroke-linecap="round"/>';
}
// عداد سرعة بإبرة
function speedo(x, y, r, v, vmax, t) {
  var a = -210 + 240 * clamp(v / vmax) + Math.sin(t * 9) * 1.5, s = '<g transform="translate(' + f(x) + ' ' + f(y) + ')"><circle r="' + r + '" fill="#1f2630" stroke="' + INK + '" stroke-width="4"/><circle r="' + f(r - 6) + '" fill="none" stroke="#3a4552" stroke-width="2"/>';
  for (var i = 0; i <= 12; i++) { var b = (-210 + i * 20) * Math.PI / 180; s += '<path d="M' + f(Math.cos(b) * (r - 10)) + ' ' + f(Math.sin(b) * (r - 10)) + ' L' + f(Math.cos(b) * (r - (i % 2 ? 16 : 22))) + ' ' + f(Math.sin(b) * (r - (i % 2 ? 16 : 22))) + '" stroke="' + (i > 9 ? "#e8443a" : "#e9e4d6") + '" stroke-width="3"/>'; }
  var c = a * Math.PI / 180;
  return s + '<path d="M0 0 L' + f(Math.cos(c) * (r - 18)) + ' ' + f(Math.sin(c) * (r - 18)) + '" stroke="#e8443a" stroke-width="5" stroke-linecap="round"/><circle r="8" fill="#e9e4d6" stroke="' + INK + '" stroke-width="2"/></g>';
}
// عربية إسعاف
function ambulance(x, y, t, s) {
  s = s || 1; var on = Math.sin(t * 14) > 0, a = (t * 520) % 360;
  var wheel = function (cx) { return '<g transform="translate(' + cx + ' 0)"><circle r="15" fill="#222" stroke="' + INK + '" stroke-width="3"/><circle r="6" fill="#b9bec4"/><path d="M-6 0 H6" stroke="' + INK + '" stroke-width="2" transform="rotate(' + f(a) + ')"/></g>'; };
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + s + ')"><ellipse cy="16" rx="90" ry="7" fill="#000" opacity=".25"/>' +
    '<path d="M-90 0 V-80 H30 L60 -44 L90 -36 V0 Z" fill="#f7f5ef" stroke="' + INK + '" stroke-width="3.4" stroke-linejoin="round"/>' +
    '<path d="M36 -72 L58 -46 H36 Z" fill="url(#gGlass)" stroke="' + INK + '" stroke-width="2.4"/>' +
    '<rect x="-90" y="-36" width="180" height="10" fill="#e8443a"/>' +
    '<path d="M-38 -66 H-22 V-56 H-12 V-42 H-22 V-32 H-38 V-42 H-48 V-56 H-38 Z" fill="#e8443a" stroke="' + INK + '" stroke-width="2"/>' +
    '<rect x="-20" y="-92" width="20" height="12" rx="3" fill="' + (on ? "#e8443a" : "#7a2a22") + '" stroke="' + INK + '" stroke-width="2"/><rect x="2" y="-92" width="20" height="12" rx="3" fill="' + (on ? "#2a4a8a" : "#3fa0ff") + '" stroke="' + INK + '" stroke-width="2"/>' +
    '<circle cx="' + (on ? -10 : 12) + '" cy="-86" r="26" fill="' + (on ? "#ff5a4a" : "#4aa8ff") + '" opacity=".35" filter="url(#soft)"/>' +
    wheel(-55) + wheel(55) + '</g>';
}
// قطر بخار
function train(x, y, t, s) {
  s = s || 1; var a = (t * 400) % 360, sm = "";
  for (var i = 0; i < 4; i++) { var k = (t * 0.7 + i / 4) % 1; sm += '<circle cx="' + f(70 + k * -60) + '" cy="' + f(-110 - k * 70) + '" r="' + f(10 + k * 22) + '" fill="#eef0f2" stroke="' + INK + '" stroke-width="2" opacity="' + f(1 - k) + '"/>'; }
  var wheel = function (cx) { return '<g transform="translate(' + cx + ' 0)"><circle r="16" fill="#8f2618" stroke="' + INK + '" stroke-width="3"/><path d="M-14 0 H14 M0 -14 V14" stroke="' + INK + '" stroke-width="2" transform="rotate(' + f(a) + ')"/></g>'; };
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + s + ')">' + sm +
    '<rect x="-200" y="-62" width="150" height="50" rx="4" fill="#5f8a4f" stroke="' + INK + '" stroke-width="3"/>' +
    '<rect x="-40" y="-60" width="120" height="48" rx="6" fill="#2f3a44" stroke="' + INK + '" stroke-width="3"/><rect x="-40" y="-100" width="50" height="44" fill="#2f3a44" stroke="' + INK + '" stroke-width="3"/>' +
    '<rect x="58" y="-96" width="20" height="38" fill="#2f3a44" stroke="' + INK + '" stroke-width="3"/><rect x="-32" y="-92" width="32" height="20" fill="#ffe8a0" stroke="' + INK + '" stroke-width="2"/>' +
    wheel(-170) + wheel(-80) + wheel(-20) + wheel(50) + '</g>';
}
// بوق نحاس في إيد العازف
function trumpet(x, y, t) { var b = Math.sin(t * 6) * 2; return '<g transform="translate(' + f(x) + ' ' + f(y + b) + ')"><path d="M0 0 H34 L50 -10 V12 L34 2 H0 Z" fill="url(#gGold)" stroke="' + INK + '" stroke-width="2.4"/></g>'; }
// نوتة موسيقية طايرة
function notes(x, y, t, n) {
  var s = ""; for (var i = 0; i < (n || 3); i++) { var k = (t * 0.6 + i / 3) % 1; s += '<text x="' + f(x + k * 60) + '" y="' + f(y - k * 60) + '" style="font:900 26px Noto Sans Arabic;fill:#f2c230;stroke:' + INK + ';stroke-width:2;paint-order:stroke" opacity="' + f(1 - k) + '">♪</text>'; }
  return s;
}
// شريحة إلكترونية بتلمع
function chip(x, y, t) {
  var s = '<g transform="translate(' + f(x) + ' ' + f(y) + ')">';
  for (var i = -3; i <= 3; i++) s += '<rect x="' + (i * 14 - 3) + '" y="-62" width="6" height="124" fill="#c9a24a" stroke="' + INK + '" stroke-width="1.4"/><rect x="-62" y="' + (i * 14 - 3) + '" width="124" height="6" fill="#c9a24a" stroke="' + INK + '" stroke-width="1.4"/>';
  return s + '<rect x="-48" y="-48" width="96" height="96" rx="8" fill="#2b2f34" stroke="' + INK + '" stroke-width="3.4"/><rect x="-30" y="-30" width="60" height="60" rx="4" fill="#3a4552" stroke="' + RW + '" stroke-width="2" opacity="' + f(0.6 + 0.4 * Math.sin(t * 5)) + '"/></g>';
}
// صورة الكاميرا: العربية واللوحة وبيانات السرعة
function snapshot(x, y, u, u0) {
  var k = pop((u - u0) / 0.9); if (k <= 0) return "";
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ') rotate(-3)"><rect x="-150" y="-95" width="300" height="190" fill="#fff" stroke="' + INK + '" stroke-width="3"/><rect x="-138" y="-83" width="276" height="120" fill="#2a3440"/>' +
    bigCar(0, 16, "#2f6f9f", 0.85, 0, 1) +
    '<rect x="-40" y="-6" width="80" height="22" rx="3" fill="#f4f1e8" stroke="' + INK + '" stroke-width="2" transform="translate(0 0)"/><text x="0" y="11" text-anchor="middle" style="font:900 15px Noto Sans Arabic;fill:' + INK + '">ر ص د ٤٢٧</text>' +
    '<text x="-128" y="66" style="font:900 22px Noto Sans Arabic;fill:#e8443a">117 km/h</text><text x="128" y="66" text-anchor="end" style="font:800 16px Noto Sans Arabic;fill:' + INK + '">23:41</text></g>';
}
// خلفية الطريق بالليل
function nightRoad(t) { return sky("night") + stars(t) + moon(520, 60) + city(t, 250, 90, "#2a3550", "#ffe8a0", 5, true) + '<rect x="-400" y="250" width="1440" height="400" fill="#2d3a2a"/>' + '<rect x="-400" y="262" width="1440" height="76" fill="url(#road)"/>' + laneMarks(t, 298, 0); }
function laneMarks(t, y, sp) { var s = "", off = (t * (sp || 0)) % 60; for (var x = -400; x < 1060; x += 60) s += '<rect x="' + f(x - off) + '" y="' + y + '" width="30" height="4" fill="#f2e6c8" opacity=".8"/>'; return s; }

// ── المشاهد ─────────────────────────────────────────────
// 0 — عربية ماشية بالليل، تعدّي جنب عمود الرادار، وفلاش أبيض
shot(0, camMove([300, 220, 1.1], [360, 200, 1.0]), function (u, d, t) {
  var cx = lerp(-60, 420, ease(u / 4.6)), fk = flashK(u, 4.2);
  return nightRoad(t) + laneMarks(t, 298, 160) + radarPole(500, 268, t, fk) + bigCar(cx, 310, "#2f6f9f", 1.05, t, 1) + tag("فلاش!", 470, 70, u, 4.3, -4, 26, "#fff3b0") + whiteOut(fk);
});
// 1 — السواق مستغرب وعداد السرعة بيترعش
shot(1, camPush(320, 190, 1, 1.12), function (u, d, t) {
  return fill("#1b2230") + '<rect x="-400" y="250" width="1440" height="400" fill="#2a2f38"/>' + speedo(420, 180, 90, 88 + Math.sin(t * 3) * 6, 180, t) + person(180, 330, t, { mood: "curious", pose: "think", look: 1, shirt: "#2f6f9f" }) + qmark(560, 110, t, 80) + tag("عرف سرعتك إزاي؟", 330, 60, u, 0.5, -2, 22);
});
// 2 — الرادار بيبعت موجات ناحية العربية
shot(2, camMove([400, 200, 1.15], [320, 190, 1.0]), function (u, d, t) {
  return nightRoad(t) + radarPole(540, 268, t) + waveTrain(500, 270, 180, t, 46, -1) + bigCar(190, 310, "#e2b035", 0.95, t, 1) + tag("موجات راديو", 330, 70, u, 0.6, -3, 22, "#bfe0ff") + tag("بسرعة النور", 330, 120, u, 2.6, 2, 18);
});
// 3 — الموجة بتخبط في العربية وترجع زي الصدى
shot(3, camPush(330, 200, 1.05, 1.15), function (u, d, t) {
  return nightRoad(t) + radarPole(540, 268, t) + waveTrain(500, 230, 160, t, 54, -1) + waveTrain(230, 500, 230, t + 0.3, 54, 1, "#f2c230", 22) + bigCar(170, 310, "#e2b035", 0.95, t, 1) + pulse(240, 250, t, "#f2c230", 36) + tag("بترجع زي الصدى", 360, 70, u, 1.0, -2, 22);
});
// 4 — عربية جاية: الموجات بتتزنق وذبذبتها بتعلى
shot(4, camPan(280, 360, 180, 1.05), function (u, d, t) {
  var cx = lerp(60, 230, ease(u / d));
  return fill("#eaf3f8") + '<rect x="-400" y="292" width="1440" height="80" fill="url(#road)"/>' + radarPole(580, 300, t, 0, 0.8) + sineW(cx + 70, 160, 470 - cx, 18, 22, RW, t * 1.6, 5) + bigCar(cx, 330, "#e8443a", 0.95, t, 1) + arrow(cx - 20, 250, cx + 80, 250, "#4f9f5a", 7, ease(u / 1.2)) + tag("بتتزنق ← ذبذبة أعلى", 320, 70, u, 0.8, -2, 21);
});
// 5 — عربية بتبعد: الموجات بتتمط وذبذبتها بتقل
shot(5, camPan(360, 280, 180, 1.05), function (u, d, t) {
  var cx = lerp(260, 80, ease(u / d));
  return fill("#f8efe8") + '<rect x="-400" y="292" width="1440" height="80" fill="url(#road)"/>' + radarPole(580, 300, t, 0, 0.8) + sineW(cx + 90, 160, 470 - cx, 90, 26, "#e8443a", t * 0.8, 5) + bigCar(cx, 330, "#4f8f5a", 0.95, t, -1) + arrow(cx + 20, 250, cx - 80, 250, "#e8443a", 7, ease(u / 1.2)) + tag("بتتمط ← ذبذبة أقل", 320, 70, u, 0.6, 2, 21);
});
// 6 — تأثير دوبلر: الإسعاف معدّية وصوتها بيتغير
shot(6, camPan(240, 400, 190, 1.05), function (u, d, t) {
  var ax = lerp(-80, 640, u / d);
  return sky("dusk") + city(t, 260, 100, "#b9a89a", "#fff6d0", 2) + '<rect x="-400" y="260" width="1440" height="80" fill="url(#road)"/>' + laneMarks(t, 298, 0) + '<rect x="-400" y="338" width="1440" height="200" fill="#c9c2b4"/>' +
    waveTrain(ax + 90, ax + 340, 200, t * 1.6, 22, 1, "#f2c230", 18) + waveTrain(ax - 90, ax - 340, 200, t * 0.7, 60, -1, "#f2c230", 18) + ambulance(ax, 312, t, 0.9) +
    person(330, 380, t, { mood: "shock", pose: "stand", look: ax > 330 ? 1 : -1, s: 0.8 }) + tag("تأثير دوبلر", 320, 70, u, 0.9, -3, 26);
});
// 7 — سنة 1845: عازفين بوق على قطر، والناس بتسمع
shot(7, camMove([220, 200, 1.1], [380, 190, 1.0]), function (u, d, t) {
  var tx = lerp(200, 520, u / d);
  return sky("day") + sun(80, 60, 26) + clouds(t, 18, 30, 5, 0.9) + grass(t, 280) + '<rect x="-400" y="276" width="1440" height="8" fill="#6a5040"/>' +
    train(tx, 276, t, 0.8) + person(tx - 120, 228, t, { mood: "happy", pose: "stand", s: 0.45, shirt: "#8f2618" }) + trumpet(tx - 112, 192, t) + notes(tx - 70, 180, t) +
    person(120, 350, t, { mood: "curious", pose: "think", s: 0.7, look: 1 }) + tag("1845", 330, 70, u, 0.5, -3, 30) + tag("عازفين بوق على قطر!", 330, 120, u, 2.4, 2, 19);
});
// 8 — موجة بتتذبذب أربعة وعشرين مليار مرة في الثانية
shot(8, camPush(320, 180, 1, 1.15), function (u, d, t) {
  return fill("#101826") + stars(t) + sineW(40, 210, 560, 9, 18, RW, t * 4, 3) + '<circle cx="320" cy="210" r="120" fill="' + RW + '" opacity=".12" filter="url(#soft)"/>' + counter(320, 120, u, 0.4, 3.2, 0, 24000000000, "", 44, "#f2c230") + tag("مرة في الثانية!", 320, 310, u, 3.4, -2, 22, "#bfe0ff");
});
// 9 — على مية كيلو: الذبذبة بتتغير 4,400 بس
shot(9, camPan(260, 380, 190, 1.05), function (u, d, t) {
  return fill("#1b2230") + speedo(170, 190, 100, lerp(0, 100, ease(u / 1.6)), 180, t) + label("100 km/h", 170, 330, 24, "#fff") +
    '<rect x="320" y="110" width="250" height="140" rx="14" fill="#0f141c" stroke="' + INK + '" stroke-width="4"/>' + counter(445, 200, u, 1.4, 2.0, 0, 4400, "", 50, "#4fe08a") + label("فرق الذبذبة", 445, 140, 18, "#9fb2c4") + tag("فرق صغير جداً", 445, 300, u, 3.0, -2, 20);
});
// 10 — الجهاز بيحوّل الفرق لسرعة في أقل من ثانية
shot(10, camPush(320, 190, 1, 1.12), function (u, d, t) {
  var s = fill("#16202c") + chip(220, 190, t);
  for (var i = 0; i < 5; i++) { var k = (t * 1.4 + i / 5) % 1; s += '<circle cx="' + f(300 + k * 160) + '" cy="' + f(190 + Math.sin(i * 2) * 20) + '" r="5" fill="' + RW + '" opacity="' + f(1 - k) + '"/>'; }
  return s + '<rect x="440" y="140" width="140" height="100" rx="12" fill="#0f141c" stroke="' + INK + '" stroke-width="4"/>' + counter(510, 210, u, 0.6, 0.8, 0, 117, "", 52, "#e8443a") + tag("أقل من ثانية", 320, 70, u, 1.6, -3, 22);
});
// 11 — عدّيت الحد: فلاش وصورة للوحة والسرعة والوقت
shot(11, camMove([360, 200, 1.0], [330, 190, 1.1]), function (u, d, t) {
  var fk = flashK(u, 1.4);
  return nightRoad(t) + laneMarks(t, 298, 200) + radarPole(540, 268, t, fk) + bigCar(lerp(150, 400, ease(u / 2)), 310, "#2f6f9f", 1.05, t, 1) + whiteOut(fk) + snapshot(300, 160, u, 1.9) + tag("الحد المسموح", 470, 60, u, 0.3, 3, 18, "#ff9a8a");
});
// 12 — المرة الجاية: نفس الطريق، وموجة صغيرة راجعة من العربية
shot(12, camMove([320, 210, 1.15], [340, 190, 1.0]), function (u, d, t) {
  var cx = lerp(80, 300, ease(u / d)), fk = flashK(u, 5.6);
  return nightRoad(t) + laneMarks(t, 298, 120) + radarPole(500, 268, t, fk) + waveTrain(cx + 80, 470, 200, t, 50, 1, "#f2c230", 20) + bigCar(cx, 310, "#2f6f9f", 1.05, t, 1) + tag("الموجة بتحكي سرعتك", 320, 70, u, 1.2, -2, 21) + whiteOut(fk * 0.6);
});
// 13 — الختام
shot(13, camPush(320, 180, 1, 1.12), function (u, d, t) {
  return sky("dusk") + clouds(t, 20, 30, 4, 0.8) + grass(t, 290) + radarPole(500, 300, t, 0, 0.8) + pulse(500, 140, t, RW, 40) + person(250, 330, t, { mood: "happy", pose: "wave", look: 1 }) + bubble(330, 140, "قولولنا!", u, 0.3, 22) + qmark(440, 120, t, 60);
});
