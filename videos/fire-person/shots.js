// ستايل السكتش: كارت البداية على السطر 0، وكارت الملخص على آخر سطر. shot من السطر 1. شوف styles/sketch/API.md
intro(function (t) { return dark() + ring(290, 160, 70, t, ease(t / 1.2)); });
shot(1, camPush(320, 400, 1, 1.1), function (u, d, t) {
  return paper() + gearS(320, 380, 110, t, 0.6) + label(320, 270, 470, 170, "اسم الجزء", OLIVE, ease((u - 0.5) / 0.8));
});
