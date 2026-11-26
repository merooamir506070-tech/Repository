function G(x, y, s, inner, rot) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ')' + (rot ? ' rotate(' + f(rot) + ')' : "") + ' scale(' + f(s == null ? 1 : s) + ')">' + inner + '</g>'; }
function stroke(d, col, w, ex) { return '<path d="' + d + '" fill="none" stroke="' + (col || INK) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (ex || "") + '/>'; }
var SKIN2 = "#c98e6c", WIG = "#2a2420", HAIR = "#4a3426", WHITE = "#f7f3e8";
function P(d, fill, sw, hatched) { return shape(d, fill, hatched, sw || 2.2); }
function limbS(d, col, w) { w = w || 22; return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + (w + 4) + '" stroke-linecap="round" stroke-linejoin="round"/><path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
function eyesF(lash, glasses) {
  var s = '<ellipse cx="-12" cy="-300" rx="4" ry="5" fill="' + INK + '"/><ellipse cx="12" cy="-300" rx="4" ry="5" fill="' + INK + '"/>';
  if (lash) s += stroke("M-19 -301 Q-12 -308 -4 -302 L0 -304 M19 -301 Q12 -308 4 -302 M-19 -301 L-25 -304 M19 -301 L25 -304", INK, 2);
  if (glasses) s += '<circle cx="-13" cy="-300" r="11" fill="none" stroke="' + INK + '" stroke-width="2.4"/><circle cx="13" cy="-300" r="11" fill="none" stroke="' + INK + '" stroke-width="2.4"/>' + stroke("M-2 -301 H2 M-24 -302 L-34 -305 M24 -302 L34 -305", INK, 2);
  return s;
}
function faceF(o) {
  o = o || {}; var s = circle(0, -292, 36, o.skin || SKIN);
  s += eyesF(o.lash, o.glasses) + stroke("M-19 -314 Q-12 -318 -5 -314 M19 -314 Q12 -318 5 -314", o.brow || INK, 2.4) + stroke("M0 -296 L-3 -284 L2 -283", INK, 1.6);
  s += o.mus ? P("M-14 -273 Q0 -280 14 -273 Q8 -270 0 -272 Q-8 -270 -14 -273 Z", o.mus, 1.2) + stroke("M-8 -266 Q0 -262 8 -266", INK, 2) : stroke("M-9 -272 Q0 -265 9 -272", o.lip || INK, 2.4);
  return s;
}
function legs(col, shoe) { return limbS("M-14 -120 L-16 -14", col, 22) + limbS("M14 -120 L16 -14", col, 22) + '<ellipse cx="-20" cy="-6" rx="17" ry="8" fill="' + (shoe || INK) + '" stroke="' + INK + '" stroke-width="2"/><ellipse cx="20" cy="-6" rx="17" ry="8" fill="' + (shoe || INK) + '" stroke="' + INK + '" stroke-width="2"/>'; }
function feetBare(sk) { return '<ellipse cx="-16" cy="-6" rx="15" ry="7" fill="' + sk + '" stroke="' + INK + '" stroke-width="2"/><ellipse cx="16" cy="-6" rx="15" ry="7" fill="' + sk + '" stroke="' + INK + '" stroke-width="2"/>'; }
function collar(y) { return '<ellipse cx="0" cy="' + y + '" rx="52" ry="20" fill="' + BLUE + '" stroke="' + INK + '" stroke-width="2"/><ellipse cx="0" cy="' + (y - 2) + '" rx="40" ry="13" fill="' + ORANGE + '" stroke="' + INK + '" stroke-width="1.4"/><ellipse cx="0" cy="' + (y - 4) + '" rx="26" ry="7" fill="' + OLIVE + '" stroke="' + INK + '" stroke-width="1.2"/>'; }

// ستات
function womanPharaoh() {
  return P("M-50 -296 C-56 -350 56 -350 50 -296 L54 -222 L-54 -222 Z", WIG) +
    R(-9, -262, 18, 24, SKIN2, 2) + limbS("M-44 -222 L-58 -130", SKIN2, 16) + limbS("M44 -222 L58 -130", SKIN2, 16) +
    P("M-42 -230 L42 -230 L54 -10 L-54 -10 Z", WHITE, 2.2, true) + stroke("M-40 -140 H40", GREY, 1.4) + collar(-232) + feetBare(SKIN2) +
    faceF({ skin: SKIN2, lash: true, lip: "#8a3a2a" }) + P("M-40 -318 C-30 -336 30 -336 40 -318 L40 -306 C20 -318 -20 -318 -40 -306 Z", WIG, 1.4) + stroke("M-42 -322 Q0 -342 42 -322", "#d9a23a", 5);
}
function womanHijab() {
  return P("M-48 -228 L48 -228 C58 -150 60 -60 56 -14 L-56 -14 C-60 -60 -58 -150 -48 -228 Z", "#46698a", 2.2, true) + stroke("M0 -200 V-14", INK, 1.2) +
    limbS("M-46 -220 L-64 -128", "#46698a", 20) + limbS("M46 -220 L64 -128", "#46698a", 20) + circle(-64, -124, 9, SKIN) + circle(64, -124, 9, SKIN) +
    legs(INK, "#5a4a3e") +
    P("M-46 -296 C-50 -350 50 -350 46 -296 L58 -226 C30 -210 -30 -210 -58 -226 Z", "#b5683c", 2.2, true) + faceF({ lash: true, lip: "#8a3a2a" }) +
    stroke("M-38 -300 C-38 -332 38 -332 38 -300", "#b5683c", 6);
}
function womanModern() {
  return P("M-28 -330 C-40 -350 40 -350 28 -330 C46 -320 50 -280 40 -250 L-40 -250 C-50 -280 -46 -320 -28 -330 Z", HAIR) + circle(0, -342, 18, HAIR) +
    legs("#46698a", "#f4efe0") + P("M-42 -228 L42 -228 L48 -116 L-48 -116 Z", ORANGE, 2.2, true) +
    limbS("M-42 -220 L-60 -132", ORANGE, 18) + limbS("M42 -220 L60 -132", ORANGE, 18) + circle(-60, -126, 9, SKIN) + circle(60, -126, 9, SKIN) +
    R(-9, -258, 18, 30, SKIN, 2) + faceF({ lash: true, lip: "#8a3a2a" }) + P("M-36 -306 C-30 -336 30 -336 36 -306 C20 -322 -14 -324 -36 -306 Z", HAIR, 1.4);
}
// رجالة
function manPharaoh() {
  return limbS("M-14 -120 L-14 -14", SKIN2, 22) + limbS("M14 -120 L14 -14", SKIN2, 22) + feetBare(SKIN2) +
    P("M-40 -236 L40 -236 L36 -130 L-36 -130 Z", SKIN2, 2.2) + P("M-44 -136 L44 -136 L52 -70 L-52 -70 Z", WHITE, 2.2, true) + stroke("M0 -136 L-14 -70", INK, 1.4) +
    limbS("M-44 -226 L-60 -140", SKIN2, 18) + limbS("M44 -226 L70 -170 L50 -150", SKIN2, 18) +
    G(64, -160, 1, R(-10, -50, 20, 80, "#e9d9a8", 2, 6), -20) + collar(-236) + R(-9, -262, 18, 22, SKIN2, 2) +
    faceF({ skin: SKIN2 }) + '<ellipse cx="0" cy="-318" rx="34" ry="12" fill="' + SKIN2 + '" opacity=".0"/>' + stroke("M-30 -318 Q0 -334 30 -318", "#9b6a4e", 2);
}
function manScientist() {
  return legs("#5a5a5a", INK) + P("M-48 -232 L48 -232 L56 -80 L-56 -80 Z", WHITE, 2.2, true) + P("M-16 -232 L16 -232 L0 -190 Z", "#b9d0e0", 1.6) + P("M-5 -226 L5 -226 L7 -170 L0 -160 L-7 -170 Z", ORANGE, 1.4) +
    stroke("M0 -190 V-80", INK, 1.6) + R(18, -170, 24, 26, "none", 1.6) + stroke("M24 -170 V-180", BLUE, 3) +
    limbS("M-48 -222 L-64 -126", WHITE, 20) + limbS("M48 -222 L64 -126", WHITE, 20) + circle(-64, -120, 9, SKIN) + circle(64, -120, 9, SKIN) +
    R(-9, -262, 18, 30, SKIN, 2) + faceF({ glasses: true, mus: INK }) + P("M-36 -300 C-40 -340 30 -346 38 -306 C24 -326 -10 -320 -36 -300 Z", INK, 1.4);
}
function manProfessor() {
  return legs("#6a5a48", "#5a4a3e") + P("M-50 -232 L50 -232 L58 -80 L-58 -80 Z", WHITE, 2.2, true) + P("M-18 -232 L18 -232 L0 -196 Z", "#8a8070", 1.6) + stroke("M0 -196 V-80", INK, 1.6) +
    limbS("M-50 -222 L-66 -126", WHITE, 20) + limbS("M50 -222 L74 -170 L56 -146", WHITE, 20) + circle(-66, -120, 9, SKIN2) +
    G(60, -150, 0.42, flaskC()) + R(-9, -262, 18, 30, SKIN2, 2) +
    faceF({ skin: SKIN2, mus: "#d8d2c4", brow: "#8a8070" }) + P("M-38 -296 C-44 -310 -40 -322 -32 -318 L-30 -300 Z", "#d8d2c4", 1.4) + P("M38 -296 C44 -310 40 -322 32 -318 L30 -300 Z", "#d8d2c4", 1.4) +
    '<circle cx="-13" cy="-300" r="0"/>' + stroke("M-24 -296 H-4 M4 -296 H24", INK, 2.6);
}
function flaskC() { return P("M-14 -90 H14 V-40 L58 60 Q62 72 50 72 H-50 Q-62 72 -58 60 L-14 -40 Z", "url(#glass)") + P("M-36 14 H36 L58 60 Q62 72 50 72 H-50 Q-62 72 -58 60 Z", "#c7a640", 1.5); }

function card(x, y, num, name, sub, fig) {
  return R(x, y, 360, 620, PAPER, 2, 10) + G(x + 180, y + 500, 1.15, fig) + '<path d="M' + (x + 40) + ' ' + (y + 520) + ' H' + (x + 320) + '" stroke="' + INK + '" stroke-width="1.2"/>' +
    circle(x + 36, y + 36, 22, ORANGE) + T(num, x + 36, y + 46, 26, "#fff", 900) + T(name, x + 180, y + 566, 30, INK, 800) + T(sub, x + 180, y + 602, 20, GREY, 600);
}
var svg = "<rect width=\"1200\" height=\"1480\" fill=\"" + PAPER + "\"/>" + paper() +
  T("ستات", 1100, 70, 44, ORANGE, 900) +
  card(820, 100, "١", "ست فرعونية", "باروكة سودا وفستان كتان أبيض", womanPharaoh()) +
  card(430, 100, "٢", "ست مصرية بطرحة", "طرحة طوبي وعباية زرقا", womanHijab()) +
  card(40, 100, "٣", "ست مصرية مودرن", "شعر بني وبلوزة برتقالي", womanModern()) +
  T("رجالة", 1100, 800, 44, BLUE, 900) +
  card(820, 830, "١", "طبيب فرعوني", "راس محلوقة وماسك بردية", manPharaoh()) +
  card(430, 830, "٢", "عالم الستينات", "بالطو أبيض ونضارة وشنب", manScientist()) +
  card(40, 830, "٣", "الدكتور الكبير", "شعر أبيض وماسك دورق", manProfessor());
document.getElementById("s").innerHTML = svg;
