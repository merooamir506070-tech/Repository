// ليه الست ممكن تفتكر موقف حصل من سنين؟ — سكتش بملء الشاشة (عالم 360×640). الترجمة فوق (y من 30 لـ130)، فالرسم من y=150 لتحت.
var W2 = 360;

// ── أدوات المشاهد ──────────────────────────────────────
function k_(u, a, d) { return ease((u - a) / (d || 0.6)); }
function room(t) {   // الصالة: حيطة، شباك، أباجورة، كنبة، تلفزيون
  var s = paper() + R(-200, 520, 760, 400, "#d8c9a6", 2.4) + '<rect x="-200" y="520" width="760" height="400" fill="url(#hatch)"/>';
  s += R(30, 200, 110, 120, "#cfe0e8", 2.4, 4) + ln2("M85 200 v120 M30 260 h110", 2.4) + sh2("M24 196 h122 v10 h-122z", PUTTY);
  s += '<circle cx="300" cy="250" r="' + f(36 + Math.sin(t * 3) * 3) + '" fill="url(#glowW)"/>' + sh2("M282 226 h36 l10 34 h-56z", "#e8c77a", 1) + ln2("M300 260 v120", 3) + sh2("M284 380 h32 v8 h-32z", PUTTY);
  return s;
}
function sofa(x, y) { return sh2("M" + (x - 110) + " " + (y - 40) + " h220 v50 h-220z", OLIVE, 1) + sh2("M" + (x - 110) + " " + (y - 110) + " h220 v74 h-220z", "#7d8f48", 1) + sh2("M" + (x - 128) + " " + (y - 70) + " h22 v80 h-22z", "#5d6d32") + sh2("M" + (x + 106) + " " + (y - 70) + " h22 v80 h-22z", "#5d6d32") + ln2("M" + (x - 100) + " " + (y + 10) + " v14 M" + (x + 100) + " " + (y + 10) + " v14", 4); }
function clock(x, y, r, t, sp) { var a = t * (sp || 1) * 6, b = t * (sp || 1) * 0.5; return '<g transform="translate(' + f(x) + ' ' + f(y) + ')">' + c2(0, 0, r, BONE) + ln2("M0 0 L" + f(Math.sin(a) * r * 0.8) + " " + f(-Math.cos(a) * r * 0.8), 2.2, ORANGE) + ln2("M0 0 L" + f(Math.sin(b) * r * 0.55) + " " + f(-Math.cos(b) * r * 0.55), 3) + c2(0, 0, 2.5, INK, 0) + '</g>'; }
function memory(t, wr) {   // جوه الفقاعة: زيزو صغير بقميص مكرمش، وساعة
  return '<rect x="-200" y="-200" width="400" height="400" fill="#f0e6c8"/>' + zizo(-20, 84, 0.25, t, { mood: "sad", shirt: true, arms: [[-80, -200], [84, -170]] }) + clock(50, -20, 20, t, 8);
}
function sparkle(x, y, r, t, col) { var k = 0.6 + 0.4 * Math.sin(t * 6 + x); return '<path transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')" d="M0 ' + (-r) + ' Q2 -2 ' + r + ' 0 Q2 2 0 ' + r + ' Q-2 2 ' + (-r) + ' 0 Q-2 -2 0 ' + (-r) + 'Z" fill="' + (col || ORANGE) + '"/>'; }
function qmark(x, y, s, t) { return '<g transform="translate(' + f(x) + ' ' + f(y + Math.sin(t * 5) * 4) + ') rotate(' + f(Math.sin(t * 3) * 10) + ') scale(' + f(s) + ')">' + T("؟", 0, 18, 56, ORANGE, 900) + '</g>'; }
function emo(x, y, r, kind, k) {   // وش صغير لمشاعر: happy / sad / shock
  k = pop(k); if (k <= 0) return ""; var col = { happy: "#f2c26a", sad: "#9fb8cc", shock: "#e88a6a" }[kind], s = c2(0, 0, r, col);
  s += c2(-r * 0.32, -r * 0.15, r * 0.1, INK, 0) + c2(r * 0.32, -r * 0.15, r * 0.1, INK, 0);
  s += kind === "happy" ? ln2("M" + f(-r * .4) + " " + f(r * .2) + " Q0 " + f(r * .6) + " " + f(r * .4) + " " + f(r * .2), 2.4) : kind === "sad" ? ln2("M" + f(-r * .35) + " " + f(r * .45) + " Q0 " + f(r * .15) + " " + f(r * .35) + " " + f(r * .45), 2.4) + '<path d="M' + f(r * .4) + ' 0 q-4 8 0 10 q4 -2 0 -10z" fill="' + BLUE + '"/>' : '<ellipse cy="' + f(r * .38) + '" rx="' + f(r * .16) + '" ry="' + f(r * .22) + '" fill="#7a2e22"/>';
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(k) + ')">' + s + '</g>';
}
function photo(x, y, w, h, inner, rot) { var id = "ph" + (++CLIPN); return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot || 0) + ')"><rect x="' + f(-w / 2 - 8) + '" y="' + f(-h / 2 - 8) + '" width="' + (w + 16) + '" height="' + (h + 30) + '" fill="' + BONE + '" stroke="' + INK + '" stroke-width="2.2"/><clipPath id="' + id + '"><rect x="' + f(-w / 2) + '" y="' + f(-h / 2) + '" width="' + w + '" height="' + h + '"/></clipPath><g clip-path="url(#' + id + ')">' + inner + '</g><rect x="' + f(-w / 2) + '" y="' + f(-h / 2) + '" width="' + w + '" height="' + h + '" fill="none" stroke="' + INK + '" stroke-width="1.6"/></g>'; }
function head(x, y, s, t, inner) {   // راس الست من الجنب وجواها حاجة (قطاع)
  var id = "hd" + (++CLIPN), d = "M-70 60 C-100 0 -96 -90 -20 -110 C50 -124 104 -80 100 -10 C98 20 112 30 108 44 L92 50 C96 70 84 84 60 84 L40 120 L-50 120 C-50 100 -60 80 -70 60Z";
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')">' + sh2(d, SKIN) + '<clipPath id="' + id + '"><path d="' + d + '"/></clipPath><g clip-path="url(#' + id + ')">' + inner + '</g>' + sh2("M-70 60 C-110 -10 -90 -110 -10 -116 C60 -122 100 -80 98 -40 C70 -60 30 -70 0 -40 C-30 -10 -40 30 -70 60Z", HAIR) + c2(-70, -90, 22, HAIR) + c2(70, 0, 4, INK, 0) + '</g>';
}
function drawer(x, y, w, h, k, lab) { return '<g transform="translate(' + f(x + k * 18) + ' ' + f(y) + ')">' + R(0, 0, w, h, "#b98a5a", 2) + '<rect width="' + w + '" height="' + h + '" fill="url(#hatch)"/>' + R(w / 2 - 10, h / 2 - 3, 20, 6, PUTTY, 1.5, 3) + (lab ? T(lab, w / 2, -4, 10, INK, 700) : "") + '</g>'; }
function stamp(x, y, text, k) { k = clamp(k); if (k <= 0) return ""; var sc = 1.8 - 0.8 * ease(k); return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(-10) scale(' + f(sc) + ')" opacity="' + f(Math.min(1, k * 2)) + '"><rect x="-58" y="-26" width="116" height="52" rx="8" fill="none" stroke="' + ORANGE + '" stroke-width="5"/>' + T(text, 0, 13, 32, ORANGE, 900) + '</g>'; }
function seahorse(x, y, s, t) { return '<g transform="translate(' + f(x) + ' ' + f(y + Math.sin(t * 2) * 6) + ') scale(' + f(s) + ')">' + sh2("M0 -60 C24 -64 30 -40 16 -30 C30 -20 30 10 14 24 C4 34 6 50 20 54 C30 56 32 44 24 40", "none", 0, 9) + sh2("M0 -60 C24 -64 30 -40 16 -30 C30 -20 30 10 14 24 C4 34 6 50 20 54 C30 56 32 44 24 40", "none", 0, 2) + ln2("M0 -60 C24 -64 30 -40 16 -30 C30 -20 30 10 14 24 C4 34 6 50 20 54 C30 56 32 44 24 40", 14, OLIVE) + ln2("M0 -60 l-22 6", 8, OLIVE) + c2(8, -54, 3, INK, 0) + ln2("M24 -20 q12 4 8 16", 6, "#8aa04e") + '</g>'; }
function card(x, y, k, col, rot) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot || 0) + ') scale(' + f(k) + ')">' + R(-18, -13, 36, 26, BONE, 1.8, 3) + R(-12, -8, 24, 12, col || "#9fb8cc", 1) + '</g>'; }
function mri(x, y, t, k) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ')">' + sh2("M-90 -90 h180 v150 h-180z", "#e9e6dc", 1) + '<circle cx="0" cy="-15" r="52" fill="#2b2b2b" stroke="' + INK + '" stroke-width="2.4"/><circle cx="0" cy="-15" r="' + f(52 + Math.sin(t * 4) * 3) + '" fill="none" stroke="' + BLUE + '" stroke-width="2" opacity=".6"/>' + sh2("M-150 10 h180 v14 h-180z", PUTTY) + ln2("M-130 24 v40 M10 24 v40", 4) + '</g>'; }
function screen(x, y, w, h, inner) { var id = "sc" + (++CLIPN); return '<g transform="translate(' + f(x) + ' ' + f(y) + ')">' + R(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12, "#4b4642", 2.4, 6) + '<clipPath id="' + id + '"><rect x="' + f(-w / 2) + '" y="' + f(-h / 2) + '" width="' + w + '" height="' + h + '"/></clipPath><g clip-path="url(#' + id + ')"><rect x="' + f(-w / 2) + '" y="' + f(-h / 2) + '" width="' + w + '" height="' + h + '" fill="#1f2a33"/>' + inner + '</g>' + ln2("M0 " + f(h / 2 + 6) + " v18 M-24 " + f(h / 2 + 24) + " h48", 4) + '</g>'; }
function calPage(x, y, txt, k, rot) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot || 0) + ')" opacity="' + f(k) + '">' + R(-50, -56, 100, 112, BONE, 2.2, 4) + R(-50, -56, 100, 26, ORANGE, 2.2, 4) + c2(-24, -56, 4, INK, 0) + c2(24, -56, 4, INK, 0) + T(txt, 0, 22, 20, INK, 900) + '</g>'; }
function bar(x, base, w, h, col, lab) { return R(x - w / 2, base - h, w, h, col, 2.2, 3) + '<rect x="' + f(x - w / 2) + '" y="' + f(base - h) + '" width="' + w + '" height="' + f(h) + '" fill="url(#hatch)"/>' + T(lab, x, base + 24, 15, INK, 800); }
function neuron(x, y, r, t, col) { var s = ""; for (var i = 0; i < 6; i++) { var a = i / 6 * 6.283 + 0.3; s += ln2("M" + f(x) + " " + f(y) + " q" + f(Math.cos(a + .4) * r) + " " + f(Math.sin(a + .4) * r) + " " + f(Math.cos(a) * r * 2) + " " + f(Math.sin(a) * r * 2), 2.6, INK); } return s + c2(x, y, r * 0.7, col || "#e8b9a8"); }
function bottle(x, y, t, puff) { var s = '<g transform="translate(' + f(x) + ' ' + f(y) + ')">' + sh2("M-30 -60 h60 q10 0 10 10 v90 q0 10 -10 10 h-60 q-10 0 -10 -10 v-90 q0 -10 10 -10z", "#e8c7d8", 1) + R(-12, -82, 24, 22, PUTTY, 2.2, 3) + R(-16, -96, 32, 16, "#c4a35a", 2.2, 4) + T("✿", 0, 10, 26, "#b86a8a", 700) + '</g>'; if (puff) for (var i = 0; i < 7; i++) { var u = (t * 0.8 + i / 7) % 1; s += '<circle cx="' + f(x + 20 + u * 120) + '" cy="' + f(y - 90 - u * 40 + Math.sin(u * 9 + i) * 10) + '" r="' + f(6 + u * 14) + '" fill="#e8c7d8" opacity="' + f(0.8 * (1 - u)) + '"/>'; } return s; }
function dayScene(t, alt) { return '<rect x="-200" y="-200" width="400" height="400" fill="' + (alt ? "#f4d9b0" : "#cfe0e8") + '"/>' + sunS(alt ? -50 : 50, -40, 18, t) + '<rect x="-200" y="20" width="400" height="200" fill="' + (alt ? "#c9a96a" : "#9fbf7a") + '"/>' + woman(-10, 70, 0.22, t, { mood: "laugh" }) + zizo(30, 70, 0.22, t, { mood: "happy" }); }
function sheet(x, y, lines, k, mark) { var s = '<g transform="translate(' + f(x) + ' ' + f(y) + ')" opacity="' + f(k) + '">' + R(-62, -80, 124, 160, BONE, 2.2, 3); for (var i = 0; i < lines.length; i++) s += T(lines[i], 0, -46 + i * 30, 14, INK, 700); return s + (mark ? T(mark, 0, 64, 13, GREY, 700) : "") + '</g>'; }
function meter(x, y, v, t) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ')">' + '<path d="M-60 0 A60 60 0 0 1 60 0" fill="none" stroke="' + PUTTY + '" stroke-width="14"/><path d="M-60 0 A60 60 0 0 1 60 0" fill="none" stroke="' + OLIVE + '" stroke-width="14" stroke-dasharray="' + f(188 * v) + ' 400"/>' + ln2("M0 0 L" + f(-Math.cos(v * Math.PI + Math.sin(t * 6) * 0.03) * 48) + " " + f(-Math.sin(v * Math.PI) * 48), 4, ORANGE) + c2(0, 0, 6, INK, 0) + T("الثقة", 0, 28, 16, INK, 800) + '</g>'; }

// ── 0: الـhook — الصالة، الست بتفكّره بيوم الخطوبة ─────────────
shot(0, camPush(180, 380, 1.0, 1.08), function (u, d, t) {
  var s = room(t) + sofa(110, 540) + zizo(96, 548, 0.42, t, { sit: true, mood: u > 2 ? "surprised" : "happy", arms: [[-70, -200], [60, -150]] });
  s += woman(262, 600, 0.5, t, { talk: true, mood: "smug", arms: [[-60, -170], [-110, -320]], flip: false });
  s += bubble(225, 262, 150, 120, 255, 362, memory(t, false), k_(u, 0.6, 0.5), true);
  return s;
});
// ── 1: هو مش فاكر امبارح، هي فاكرة القميص ─────────────────
shot(1, camPush(180, 380, 1.04, 1.0), function (u, d, t) {
  var s = room(t) + sofa(110, 540) + zizo(96, 548, 0.42, t, { sit: true, mood: "confused", arms: [[-90, -260], [60, -150]] });
  s += woman(262, 600, 0.5, t, { mood: "smug", arms: [[-80, -168], [80, -168]] });
  s += bubble(80, 270, 100, 84, 96, 360, qmark(0, 0, 1, t), k_(u, 0.2, 0.4), true);
  var inner = memory(t, true) + sparkle(-50, -40, 8, t) + sparkle(56, 30, 7, t + 1) + sparkle(40, -50, 6, t + 2);
  s += bubble(240, 262, 150, 120, 255, 362, inner + numBox("١٠ سنين", 0, 44, k_(u, 2.0, 0.4), 14), k_(u, 0.9, 0.4), true);
  return s;
});
// ── 2: أرشيف سري جوه دماغها؟ ولا بتألف؟ ────────────────────
shot(2, camPush(180, 370, 1.0, 1.1), function (u, d, t) {
  var inner = R(-60, -80, 130, 170, "#7a5a3a", 2) + drawer(-52, -66, 110, 30, Math.max(0, Math.sin(t * 2.2)), "") + drawer(-52, -26, 110, 30, Math.max(0, Math.sin(t * 2.2 + 2)), "") + drawer(-52, 14, 110, 30, Math.max(0, Math.sin(t * 2.2 + 4)), "") + drawer(-52, 54, 110, 30, 0, "");
  var s = paper() + head(180, 370, 1.45, t, '<rect x="-200" y="-200" width="400" height="400" fill="#e8b9a8"/>' + inner);
  s += numBox("سري", 180, 230, k_(u, 0.3, 0.4), 18);
  var kq = k_(u, 1.2, 0.4);
  if (kq > 0) s += '<g opacity="' + f(kq) + '">' + qmark(300, 320, 1.1, t) + '<g transform="translate(290 470) rotate(' + f(-30 + Math.sin(t * 8) * 6) + ')">' + R(-6, -60, 12, 70, "#e8c77a", 2) + sh2("M-6 10 L0 26 L6 10Z", SKIN) + '</g></g>';
  return s;
});
// ── 3: حتة قد اللوزة اسمها الأميجدالا ──────────────────────
shot(3, camPush(180, 380, 1.0, 1.15), function (u, d, t) {
  var s = paper() + brain(180, 380, 1.15, t, { amy: k_(u, 1.6, 0.6) });
  var p = brainPt(180, 380, 1.15, "amy");
  s += label(p[0], p[1], 60, 560, "الأميجدالا", BLUE, k_(u, 2.2, 0.8), 18);
  var ka = pop(k_(u, 1.0, 0.5)); if (ka > 0) s += '<g transform="translate(290 540) scale(' + f(ka) + ')">' + sh2("M0 -22 C16 -22 22 0 15 14 C8 24 -8 24 -15 14 C-22 0 -16 -22 0 -22Z", "#c9935a", 1) + T("لوزة", 0, 50, 16, INK, 800) + '</g>' + ln2("M266 528 Q220 500 " + f(p[0] + 8) + " " + f(p[1] + 8), 1.6, GREY);
  return s;
});
// ── 4: شغلتها المشاعر: فرحة وزعل وخضة ─────────────────────
shot(4, camPush(180, 380, 1.0, 1.08), function (u, d, t) {
  var s = paper() + brain(180, 380, 1.15, t, { amy: 1 }), p = brainPt(180, 380, 1.15, "amy");
  var E = [["happy", 90, 250, 0.4], ["sad", 180, 230, 1.0], ["shock", 270, 255, 1.6]];
  for (var i = 0; i < 3; i++) { var k = k_(u, E[i][3], 0.4); if (k > 0) s += ln2("M" + f(p[0]) + " " + f(p[1]) + " L" + f(lerp(p[0], E[i][1], k)) + " " + f(lerp(p[1], E[i][2] + Math.sin(t * 3 + i) * 5, k)), 1.6, ORANGE) + emo(E[i][1], E[i][2] + Math.sin(t * 3 + i) * 5, 24, E[i][0], k); }
  return s;
});
// ── 5: الأميجدالا تبعت للهيبوكامبس: احفظ ده كويس ───────────
shot(5, camPush(185, 390, 1.0, 1.12), function (u, d, t) {
  var X = 180, Y = 380, S = 1.15, s = paper() + brain(X, Y, S, t, { amy: 1, hip: k_(u, 1.6, 0.6) }), a = brainPt(X, Y, S, "amy"), h = brainPt(X, Y, S, "hip");
  var pr = clamp((u - 0.5) / 1.2); if (pr > 0 && pr < 1) s += '<circle cx="' + f(lerp(a[0], h[0], pr)) + '" cy="' + f(lerp(a[1], h[1], pr) - Math.sin(pr * Math.PI) * 30) + '" r="7" fill="#ffd36a" stroke="' + ORANGE + '" stroke-width="2"/>';
  s += '<path d="M' + f(a[0]) + ' ' + f(a[1]) + ' Q' + f((a[0] + h[0]) / 2) + ' ' + f(a[1] - 60) + ' ' + f(h[0]) + ' ' + f(h[1]) + '" fill="none" stroke="' + ORANGE + '" stroke-width="2" stroke-dasharray="5 5"/>';
  s += label(h[0], h[1], 200, 230, "الهيبوكامبس", OLIVE, k_(u, 1.2, 0.8), 16) + stamp(220, 490, "احفظ", clamp((u - 2.4) / 0.5));
  return s;
});
// ── 6: شكله زي حصان البحر، وبيحوّل الموقف لذكرى طويلة ──────────
shot(6, camPush(180, 390, 1.0, 1.06), function (u, d, t) {
  var s = paper() + brain(120, 300, 0.75, t, { hip: 1 }) + seahorse(270, 300, 1.2, t) + T("≈", 205, 306, 34, INK, 900);
  for (var i = 0; i < 4; i++) { var v = ((t * 0.5 + i / 4) % 1); s += card(lerp(60, 300, v), 470 + Math.sin(v * 6.283) * 20, 1, ["#9fb8cc", "#f2c26a", "#e8c7d8", "#9fbf7a"][i], v * 30 - 15); }
  s += R(150, 440, 60, 60, OLIVE, 2.4, 10) + '<rect x="150" y="440" width="60" height="60" rx="10" fill="url(#hatch)"/>' + T("ذكرى", 180, 476, 14, "#fff", 800) + label(180, 500, 180, 560, "ذكرى طويلة", OLIVE, k_(u, 2.2, 0.8), 15);
  return s;
});
// ── 7: الذكرى اللي معاها إحساس بتتحفر أعمق ──────────────────
shot(7, camPush(180, 400, 1.0, 1.08), function (u, d, t) {
  var s = paper(), pg = clamp((u - 0.3) / 1.6);
  s += sh2("M40 230 h120 v240 h-120z", "#b8b4ac", 1) + '<rect x="40" y="230" width="120" height="240" fill="url(#hatch)"/>';
  s += '<circle cx="100" cy="350" r="70" fill="url(#glowO)" opacity="' + f(0.3 + 0.3 * Math.sin(t * 4)) + '"/>' + '<path d="M70 300 h60 M70 340 h60 M70 380 h' + f(60 * pg) + '" stroke="' + ORANGE + '" stroke-width="7" stroke-linecap="round"/>';
  s += '<g transform="translate(' + f(70 + 60 * pg) + ' 370) rotate(-30)">' + R(-5, -50, 10, 50, GREY, 2) + sh2("M-5 0 L0 14 L5 0Z", INK) + '</g>';
  s += R(210, 230, 120, 160, BONE, 2.2, 3) + '<g opacity="' + f(1 - clamp((u - 0.8) / 1.5)) + '">' + ln2("M230 270 h80 M230 300 h80 M230 330 h60", 2, GREY) + '</g>';
  s += '<g transform="translate(' + f(270 + Math.sin(t * 6) * 30) + ' 310) rotate(20)">' + R(-14, -10, 28, 20, "#e8a0a0", 2, 3) + '</g>';
  s += label(100, 470, 100, 540, "إحساس قوي", ORANGE, k_(u, 0.6, 0.6), 16) + label(270, 390, 270, 540, "عادي", GREY, k_(u, 1.2, 0.6), 16);
  return s;
});
// ── 8: طب ليه الستات بالذات؟ ───────────────────────────────
shot(8, camMove([180, 420, 1.0], [235, 380, 1.5]), function (u, d, t) {
  return paper() + zizo(95, 600, 0.6, t, { mood: "confused", arms: [[-110, -290], [110, -290]] }) + woman(240, 600, 0.6, t, { mood: "smug", arms: [[-70, -260], [80, -168]] }) + qmark(305, 300, 1.3 + 0.1 * Math.sin(t * 6), t);
});
// ── 9: تجربة ألفين واتنين: صور مؤثرة وجهاز رنين ───────────────
shot(9, camPush(180, 400, 1.0, 1.08), function (u, d, t) {
  var s = paper() + mri(200, 460, t) + '<g transform="translate(110 455)">' + c2(-32, 0, 13, SKIN) + R(-20, -10, 70, 22, "#9fb8cc", 2, 8) + '</g>';
  var em = ["happy", "sad", "shock"][Math.floor(t * 1.4) % 3];
  s += screen(180, 270, 140, 90, emo(0, 0, 30, em, 1)) + numBox("2002", 70, 200, k_(u, 0.3, 0.4), 18);
  s += figure(320, 600, 0.45, t, "#9fb8cc") + figure(40, 600, 0.45, t, DRESS);
  return s;
});
// ── 10: بعد تلات أسابيع، الستات افتكروا صور أكتر ──────────────
shot(10, camPush(180, 400, 1.0, 1.05), function (u, d, t) {
  var s = paper(), n = Math.min(3, Math.floor(u / 0.45) + 1);
  for (var i = 0; i < n; i++) s += calPage(100 + i * 8, 260 + i * 6, ["أسبوع ١", "أسبوع ٢", "أسبوع ٣"][i], 1, -6 + i * 5);
  var g = k_(u, 1.0, 1.0);
  s += ln2("M40 560 H330", 2.4) + bar(130, 560, 70, 110 * g, "#9fb8cc", "رجالة") + bar(240, 560, 70, 170 * g, DRESS, "ستات");
  if (g > 0.9) s += sparkle(240, 370, 12, t);
  return s;
});
// ── 11: أماكن المشاعر وأماكن الحفظ شغالة مع بعض أكتر ──────────
shot(11, camPush(180, 390, 1.0, 1.1), function (u, d, t) {
  var X = 180, Y = 380, S = 1.15, s = paper() + brain(X, Y, S, t, { amy: 1, hip: 1 }), a = brainPt(X, Y, S, "amy"), h = brainPt(X, Y, S, "hip");
  for (var i = 0; i < 4; i++) { var off = (i - 1.5) * 12, ph = (t * 1.5 + i / 4) % 1; s += '<path d="M' + f(a[0]) + ' ' + f(a[1]) + ' Q' + f((a[0] + h[0]) / 2) + ' ' + f(a[1] - 40 + off) + ' ' + f(h[0]) + ' ' + f(h[1]) + '" fill="none" stroke="' + (i % 2 ? ORANGE : OLIVE) + '" stroke-width="2.4" opacity="' + f(0.4 + 0.6 * k_(u, 0.6, 0.8)) + '" stroke-dasharray="6 6" stroke-dashoffset="' + f(-t * 30) + '"/>'; }
  s += label(a[0], a[1], 90, 540, "المشاعر", ORANGE, k_(u, 0.3, 0.6), 17) + label(h[0], h[1], 270, 540, "الحفظ", OLIVE, k_(u, 0.9, 0.6), 17);
  return s;
});
// ── 12: أكتر من ستمية دراسة: الستات أحسن شوية في المتوسط ───────
shot(12, camPush(180, 400, 1.0, 1.06), function (u, d, t) {
  var s = paper(), n = Math.floor(clamp(u / 2) * 14);
  for (var i = 0; i < n; i++) s += R(40 + hash(i) * 40, 470 - i * 9, 90, 12, i % 2 ? BONE : "#e9e1cc", 1.6, 2);
  var kn = pop(k_(u, 0.5, 0.4)); if (kn > 0) s += '<g transform="translate(90 230) scale(' + f(kn) + ')">' + R(-62, -22, 124, 40, INK, 0, 6) + T("ستمية دراسة", 0, 6, 17, "#fff", 800) + '</g>';
  var tilt = 6 * k_(u, 2.2, 1) + Math.sin(t * 2) * 1;
  s += '<g transform="translate(260 420)">' + ln2("M0 0 v120 M-40 120 h80", 4) + '<g transform="rotate(' + f(-tilt) + ')">' + ln2("M-70 0 H70", 4) + ln2("M-60 0 v40 M60 0 v40", 1.6) + sh2("M-84 40 h48 l-6 12 h-36z", "#9fb8cc") + sh2("M36 40 h48 l-6 12 h-36z", DRESS) + T("رجالة", -60, 76, 12, INK, 800) + T("ستات", 60, 76, 12, INK, 800) + '</g>' + c2(0, 0, 6, INK, 0) + '</g>';
  s += label(260, 470, 260, 580, "فرق صغير", BLUE, k_(u, 3.0, 0.6), 15);
  return s;
});
// ── 13: الإستروجين بيساعد الهيبوكامبس يبني وصلات ──────────────
shot(13, camPush(180, 400, 1.0, 1.12), function (u, d, t) {
  var s = paper(), g = k_(u, 0.6, 1.6);
  s += '<path d="M90 330 Q180 ' + f(300 - 20 * g) + ' 270 330" fill="none" stroke="' + OLIVE + '" stroke-width="4" stroke-dasharray="' + f(200 * g) + ' 400"/>' + '<path d="M90 330 Q140 ' + f(440) + ' 200 470" fill="none" stroke="' + OLIVE + '" stroke-width="4" stroke-dasharray="' + f(200 * g) + ' 400"/>' + '<path d="M270 330 Q240 420 200 470" fill="none" stroke="' + OLIVE + '" stroke-width="4" stroke-dasharray="' + f(200 * g) + ' 400"/>';
  s += neuron(90, 330, 18, t) + neuron(270, 330, 18, t) + neuron(200, 470, 18, t);
  s += dots(t, 40, 240, 280, 280, 18, "#b86a8a", 25) + label(70, 280, 70, 560, "إستروجين", "#b86a8a", k_(u, 0.3, 0.6), 16) + label(180, 312, 215, 225, "وصلات جديدة", OLIVE, k_(u, 1.8, 0.6), 16);
  return s;
});
// ── 14: سبب تاني مالوش دعوة بالمخ: الكلام ──────────────────
shot(14, camMove([180, 380, 1.2], [180, 400, 1.0]), function (u, d, t) {
  var k = k_(u, 0.2, 1.0), s = paper() + '<g opacity="' + f(1 - 0.6 * k) + '">' + brain(lerp(180, 90, k), lerp(380, 260, k), lerp(1.1, 0.5, k), t, {}) + '</g>';
  for (var i = 0; i < 3; i++) { var kb = k_(u, 0.8 + i * 0.35, 0.4); s += bubble(110 + i * 80, 380 + (i % 2) * 70, 90, 60, 110 + i * 80, 470 + (i % 2) * 50, ln2("M-24 -6 h48 M-24 8 h30", 3, GREY), kb, false); }
  return s;
});
// ── 15: الأمهات بيتكلموا مع البنات عن المواقف أكتر ────────────
shot(15, camPush(180, 420, 1.0, 1.06), function (u, d, t) {
  var s = paper() + woman(120, 600, 0.5, t, { talk: true, arms: [[-80, -168], [110, -220]] }) + kid(220, 600, 0.55, t, { girl: true, mood: "happy", flip: true }) + kid(310, 600, 0.45, t, { mood: "happy", flip: true });
  var hearts = sparkle(-30, 0, 10, t, ORANGE) + emo(5, 0, 14, "happy", 1) + emo(40, 0, 14, "sad", 1);
  s += bubble(160, 250, 160, 70, 140, 330, hearts, k_(u, 0.4, 0.4), false) + bubble(300, 380, 50, 36, 300, 420, ln2("M-10 0 h20", 3, GREY), k_(u, 1.6, 0.4), false);
  return s;
});
// ── 16: كل مرة الذكرى تتقال، المخ بيقويها ────────────────────
shot(16, camPush(180, 390, 1.0, 1.08), function (u, d, t) {
  var laps = 1 + Math.floor(u / 0.6), a = t * 3.5, s = paper() + '<circle cx="180" cy="380" r="110" fill="none" stroke="' + PUTTY + '" stroke-width="3" stroke-dasharray="8 8"/>';
  s += '<circle cx="180" cy="380" r="110" fill="none" stroke="' + ORANGE + '" stroke-width="' + f(Math.min(16, 2 + laps * 2.5)) + '" opacity=".75"/>';
  s += '<g transform="translate(' + f(180 + Math.cos(a) * 110) + ' ' + f(380 + Math.sin(a) * 110) + ')">' + card(0, 0, 1.4, "#f2c26a", 0) + '</g>' + brain(180, 380, 0.45, t, { hip: 1 }) + numBox("× " + Math.min(laps, 9), 180, 540, 1, 18);
  return s;
});
// ── 17: اتقال لصاحبتها خمس مرات، اتسجل خمس مرات ───────────────
shot(17, camPush(180, 420, 1.0, 1.05), function (u, d, t) {
  var n = Math.min(5, 1 + Math.floor(u / 0.65)), s = paper() + woman(110, 600, 0.5, t, { talk: true, mood: "laugh", arms: [[-80, -168], [50, -400]] });
  s += '<g transform="translate(124 380) rotate(-15)">' + R(-9, -18, 18, 36, INK, 1.6, 4) + '</g>';
  for (var i = 0; i < 4; i++) { var v = (t * 1.2 + i / 4) % 1; s += '<path d="M' + f(150 + v * 80) + ' ' + f(350 - v * 20) + ' q8 -10 0 -20" fill="none" stroke="' + BLUE + '" stroke-width="2.4" opacity="' + f(1 - v) + '"/>'; }
  s += R(240, 300, 100, 100, BONE, 2.4, 8) + T(String(n), 290, 380, 64, ORANGE, 900);
  for (var j = 0; j < n; j++) s += c2(250 + j * 20, 430, 7, j < n ? ORANGE : PUTTY, 1.6);
  return s;
});
// ── 18: زرار سري تالت: الريحة ─────────────────────────────
shot(18, camPush(180, 400, 1.0, 1.15), function (u, d, t) {
  var press = Math.max(0, Math.sin(clamp((u - 0.8) / 0.4) * Math.PI)) * 10, s = paper();
  s += R(90, 400, 180, 60, "#4b4642", 2.4, 10) + '<ellipse cx="180" cy="' + f(400 + press) + '" rx="70" ry="22" fill="#8a2e22" stroke="' + INK + '" stroke-width="2.4"/>' + sh2("M110 " + f(360 + press) + " h140 v" + f(40) + " h-140z", ORANGE, 1) + '<ellipse cx="180" cy="' + f(360 + press) + '" rx="70" ry="22" fill="#d9663a" stroke="' + INK + '" stroke-width="2.4"/>';
  s += '<g transform="translate(180 ' + f(356 + press) + ')">' + ln2("M-6 -12 q-10 16 -2 22 q8 4 14 -2", 3, "#fff") + '</g>';
  if (u > 1.0) s += '<circle cx="180" cy="370" r="' + f(90 + Math.sin(t * 6) * 8) + '" fill="url(#glowO)" opacity=".5"/>';
  return s;
});
// ── 19: عصب الشم متوصل على طول بالأميجدالا والهيبوكامبس ────────
shot(19, camPush(180, 380, 1.0, 1.1), function (u, d, t) {
  var X = 190, Y = 360, S = 0.8, s = paper() + head(180, 380, 1.55, t, '<rect x="-200" y="-200" width="400" height="400" fill="#f1d3c4"/>' + brain(10, -30, 0.55, t, { amy: k_(u, 1.4, 0.4), hip: k_(u, 1.8, 0.4) }));
  var pr = k_(u, 0.4, 1.2), nx = 180 + 104 * 1.55, ny = 380 + 40 * 1.55;
  var ax = 180 + (10 - 14 * 0.55) * 1.55, ay = 380 + (-30 + 18 * 0.55) * 1.55;
  s += '<path d="M' + f(nx - 10) + ' ' + f(ny) + ' L' + f(ax) + ' ' + f(ay) + '" stroke="' + BLUE + '" stroke-width="5" stroke-linecap="round" stroke-dasharray="' + f(200 * pr) + ' 400"/>';
  for (var i = 0; i < 3; i++) { var v = (t * 1.3 + i / 3) % 1; s += '<circle cx="' + f(lerp(nx + 30, nx - 10, v)) + '" cy="' + f(ny + 10 + Math.sin(v * 8) * 6) + '" r="5" fill="#e8c7d8" opacity="' + f(1 - v) + '"/>'; }
  s += label(nx - 10, ny, 300, 560, "عصب الشم", BLUE, k_(u, 0.6, 0.6), 15);
  return s;
});
// ── 20: ريحة برفان واحدة ترجّع يوم كامل ─────────────────────
shot(20, camPush(180, 400, 1.0, 1.08), function (u, d, t) {
  var k = k_(u, 1.0, 0.8), s = paper() + bottle(80, 500, t, true);
  s += bubble(220, 300, 180, 150, 120, 420, dayScene(t), k, true);
  return s;
});
// ── 21: الذكرى الواضحة جدا مش دايما مظبوطة ───────────────────
shot(21, camPush(180, 380, 1.0, 1.12), function (u, d, t) {
  var cr = clamp((u - 1.0) / 1.2), s = paper() + photo(180, 360, 230, 170, dayScene(t), Math.sin(t * 1.5) * 2);
  if (cr > 0) s += '<path d="M110 280 L150 330 L130 370 L190 400 L170 450 M250 290 L220 340 L260 380 L230 440" fill="none" stroke="' + INK + '" stroke-width="2.6" stroke-dasharray="' + f(300 * cr) + ' 400"/>';
  s += crossMark(300, 500, 0.6, clamp((u - 2.0) / 0.6));
  return s;
});
// ── 22: طلبة بعد ١١ سبتمبر: الإجابات اتغيرت والثقة فضلت ─────────
shot(22, camPush(180, 400, 1.0, 1.05), function (u, d, t) {
  var s = paper() + numBox("2001", 180, 225, k_(u, 0.2, 0.4), 18);
  s += sheet(95, 330, ["كنت في البيت", "الساعة ٩", "مع ماما"], k_(u, 0.6, 0.5), "بعد يوم") + sheet(265, 330, ["كنت في الجامعة", "الساعة ١١", "مع صاحبي"], k_(u, 2.6, 0.5), "بعد شهور");
  s += arrow(160, 330, 200, 330, ORANGE, 3, k_(u, 2.2, 0.4)) + meter(180, 545, 0.92, t);
  return s;
});
// ── 23: كل مرة بنفتكر، المخ بيعيد كتابة الذكرى ────────────────
shot(23, camPush(180, 380, 1.0, 1.08), function (u, d, t) {
  var e = clamp((u - 0.4) / 1.4), r = clamp((u - 1.8) / 1.4), s = paper();
  var id = "wr" + (++CLIPN);
  s += photo(180, 360, 230, 170, dayScene(t, false) + '<clipPath id="' + id + '"><rect x="-120" y="-90" width="' + f(240 * r) + '" height="180"/></clipPath><g clip-path="url(#' + id + ')">' + dayScene(t, true) + '</g>', 0);
  var hx = e < 1 ? lerp(80, 290, e) : lerp(80, 290, r), hy = 360 + Math.sin(t * 10) * 30;
  s += '<g transform="translate(' + f(hx) + ' ' + f(hy) + ') rotate(25)">' + (e < 1 ? R(-14, -30, 28, 50, "#e8a0a0", 2.2, 4) + R(-14, -30, 28, 18, BLUE, 2.2, 4) : R(-6, -60, 12, 70, "#e8c77a", 2) + sh2("M-6 10 L0 26 L6 10Z", SKIN)) + '</g>';
  return s;
});
// ── 24: هي فاكرة الإحساس صح، بس القميص اتكرمش أكتر ─────────────
shot(24, camPush(180, 400, 1.08, 1.0), function (u, d, t) {
  var s = room(t) + sofa(110, 540) + zizo(96, 548, 0.42, t, { sit: true, mood: u > 2 ? "laugh" : "confused", look: 1, wrinkled: u > 2, arms: [[-60, -240], [60, -150]] });
  s += woman(262, 600, 0.5, t, { mood: "laugh", arms: [[-80, -168], [80, -168]] });
  var w = clamp(u / 3), inner = '<rect x="-200" y="-200" width="400" height="400" fill="#f0e6c8"/>' + zizo(-14, 84, 0.25, t, { mood: "sad", shirt: true }) + ln2("M-46 " + f(-20) + " l" + f(10 * w) + " 6 l-6 6 l" + f(10 * w) + " 6 M-20 -4 l6 -8 l6 8 l6 -8 M-30 14 l8 -6 l8 6", 2, "#9fb2c0") + sparkle(50, -30, 7, t);
  s += bubble(232, 262, 150, 120, 255, 362, inner, 1, true);
  return s;
});
