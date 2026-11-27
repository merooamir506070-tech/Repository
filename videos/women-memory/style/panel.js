// المشاهد والكاميرا: عالم 360×640 مالي الشاشة. shot(line, cam, draw) لكل سطر من 0 لآخر سطر.
var SH = [];
function shot(line, cam, draw) { SH.push({ line: line, a: L(line), cam: cam, draw: draw }); SH.sort(function (p, q) { return p.a - q.a; }); }
function at(t) { var i = 0; while (i < SH.length - 1 && SH[i + 1].a <= t) i++; return i; }
function camPush(x, y, z0, z1) { return function (u, d) { return [x, y, lerp(z0 || 1, z1 || 1.1, ease(clamp(u / d)))]; }; }
function camPan(x0, x1, y, z) { return function (u, d) { var k = ease(u / d); return [lerp(x0, x1, k), y == null ? 340 : y, z || 1.05]; }; }
function camMove(a, b) { return function (u, d) { var k = ease(u / d); return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)]; }; }
window.__panel = function (svg, t) {
  CLIPN = 0;
  if (!SH.length) { svg.innerHTML = paper(); return 0; }
  var i = at(t), sh = SH[i], next = i + 1 < SH.length ? SH[i + 1].a : L(LN.length), u = Math.max(0, t - sh.a), d = Math.max(0.5, next - sh.a);
  var c = sh.cam(u, d), cx = c[0] + 4 * Math.sin(t * 1.1), cy = c[1] + 3 * Math.cos(t * 1.1), z = c[2] * (1 + 0.015 * Math.sin(t * 0.9));
  svg.innerHTML = '<g transform="translate(180 340) scale(' + z.toFixed(4) + ') translate(' + f(-cx) + ' ' + f(-cy) + ')">' + sh.draw(u, d, t) + '</g><rect width="360" height="640" filter="url(#paperN)"/>';
  return i;
};
