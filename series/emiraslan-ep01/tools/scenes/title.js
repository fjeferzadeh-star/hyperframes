// Title card: the flag waves, the name lands, the captain glints.
function draw(c, t) {
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.fillStyle = "#0d2238";
  c.fillRect(0, 0, 1920, 1080);
  T.rays(c, 960, 520, t * 0.5, 0.18);
  c.save();
  c.globalAlpha = 0.35;
  T.flag(c, 160, 160, 1600, 760, t, { pole: false, amp: 30 });
  c.restore();
  // the captain rises in from the bottom right
  const up = T.out3(T.seg(t, 0.4, 1.6));
  T.figure(c, T.CAST.emiraslan, {
    x: 1480,
    y: 1560 - up * 480,
    s: 1.0,
    t,
    hands: { l: "hip", r: t > 3.4 && t < 4.6 ? "glasses" : "hip" },
    head: { smirk: 0.8, brow: 0.4, glint: T.clamp(1 - Math.abs(t - 4.4) / 0.4, 0, 1) },
  });
  // title words
  const pop = (p) => (p <= 0 ? 0 : p < 1 ? T.outBack(p) : 1);
  const a = pop(T.seg(t, 1.0, 1.5));
  if (a > 0) {
    c.save();
    c.translate(720, 400);
    c.scale(a, a);
    c.rotate(-0.04);
    c.font = '230px "Bangers"';
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.lineWidth = 22;
    c.strokeStyle = T.INK;
    c.strokeText("EMİRASLAN", 0, 0);
    c.fillStyle = "#ffd23f";
    c.fillText("EMİRASLAN", 0, 0);
    c.restore();
  }
  const b = pop(T.seg(t, 1.6, 2.1));
  if (b > 0) T.flag(c, 660 - (1 - b) * 40, 540, 150, 100, t, { pole: false, amp: 5 });
  const d = T.out3(T.seg(t, 2.4, 3.0));
  if (d > 0) {
    c.save();
    c.globalAlpha = d;
    c.translate(720, 740 + (1 - d) * 30);
    c.fillStyle = "#e53935";
    c.beginPath();
    c.roundRect(-430, -42, 860, 84, 42);
    c.fill();
    c.strokeStyle = T.INK;
    c.lineWidth = 5;
    c.stroke();
    c.font = '700 48px "Baloo 2"';
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = "#fff";
    c.fillText("1-ci bölüm: Joker Team-in hücumu", 0, 4);
    c.restore();
  }
  T.vignette(c, 0.5);
  T.black(c, T.seg(t, 6.5, 7.0));
}
T.scene("title", "title-cv", DUR, draw);
