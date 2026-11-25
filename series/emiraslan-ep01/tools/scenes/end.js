// End card: "EMİRASLAN GERİ QAYIDACAQ! — DAVAMI GƏLƏCƏK..."
function draw(c, t) {
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.fillStyle = "#0d2238";
  c.fillRect(0, 0, 1920, 1080);
  T.rays(c, 960, 540, t * 0.5, 0.2);
  c.save();
  c.globalAlpha = 0.4;
  T.flag(c, 160, 150, 1600, 780, t, { pole: false, amp: 30 });
  c.restore();
  const pop = (p) => (p <= 0 ? 0 : p < 1 ? T.outBack(p) : 1);
  const a = pop(T.seg(t, 0.15, 0.6));
  if (a > 0) {
    c.save();
    c.translate(960, 440);
    c.scale(a, a);
    c.rotate(-0.03);
    c.font = '150px "Bangers"';
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.lineWidth = 18;
    c.strokeStyle = T.INK;
    c.strokeText("EMİRASLAN GERİ QAYIDACAQ!", 0, 0);
    c.fillStyle = "#ffd23f";
    c.fillText("EMİRASLAN GERİ QAYIDACAQ!", 0, 0);
    c.restore();
  }
  const b = T.out3(T.seg(t, 1.4, 2.2));
  if (b > 0) {
    c.save();
    c.globalAlpha = b;
    c.font = '96px "Bangers"';
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.lineWidth = 12;
    c.strokeStyle = T.INK;
    const dots = ".".repeat(1 + (Math.floor(t * 2) % 3));
    c.strokeText("DAVAMI GƏLƏCƏK" + dots, 960, 620);
    c.fillStyle = "#ffffff";
    c.fillText("DAVAMI GƏLƏCƏK" + dots, 960, 620);
    c.font = '700 40px "Baloo 2"';
    c.fillStyle = "#c9d6e3";
    c.fillText("1-ci bölümün sonu", 960, 740);
    c.restore();
  }
  T.vignette(c, 0.5);
  T.black(c, T.seg(t, 7.3, 8));
}
T.scene("end", "end-cv", DUR, draw);
