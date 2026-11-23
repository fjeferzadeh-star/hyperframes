/* eslint-disable no-unused-vars -- snippet copied into wardrobe.html and finale.html */
// Əmiraslan, cartoon head. Origin at the bridge of the nose; ~500 px tall at scale 1.
// o.eye: 0 closed .. 1 open, o.look: [dx, dy] in -1..1, o.brow: -1 sad .. 1 stern,
// o.smirk: 0..1, o.rim: rim-light colour, o.key: key-light strength 0..1
function amiraslanHead(c, o) {
  const eye = o.eye == null ? 1 : o.eye;
  const look = o.look || [0, 0];
  const brow = o.brow || 0;
  const smirk = o.smirk || 0;
  const rim = o.rim || "rgba(150,180,220,0.8)";
  const key = o.key == null ? 1 : o.key;
  const SKIN = "#c08767",
    SKIN_D = "#93604a",
    HAIR = "#15100d",
    INK = "#140e0c";

  function facePath() {
    c.beginPath();
    c.moveTo(0, -212);
    c.bezierCurveTo(92, -212, 140, -168, 145, -80);
    c.bezierCurveTo(152, 8, 146, 72, 122, 136);
    c.bezierCurveTo(98, 196, 52, 230, 0, 232);
    c.bezierCurveTo(-52, 230, -98, 196, -122, 136);
    c.bezierCurveTo(-146, 72, -152, 8, -145, -80);
    c.bezierCurveTo(-140, -168, -92, -212, 0, -212);
    c.closePath();
  }

  // neck
  c.fillStyle = SKIN_D;
  c.beginPath();
  c.moveTo(-62, 150);
  c.lineTo(62, 150);
  c.lineTo(70, 300);
  c.lineTo(-70, 300);
  c.closePath();
  c.fill();
  c.fillStyle = "rgba(40,20,15,0.35)";
  c.beginPath();
  c.moveTo(-62, 170);
  c.quadraticCurveTo(0, 240, 62, 170);
  c.lineTo(62, 150);
  c.lineTo(-62, 150);
  c.fill();

  // ears (they stand out a little)
  for (const s of [-1, 1]) {
    c.fillStyle = SKIN;
    c.beginPath();
    c.ellipse(s * 150, 6, 28, 48, s * 0.12, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = SKIN_D;
    c.beginPath();
    c.ellipse(s * 154, 8, 13, 28, s * 0.12, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = INK;
    c.lineWidth = 3;
    c.beginPath();
    c.ellipse(s * 150, 6, 28, 48, s * 0.12, 0, Math.PI * 2);
    c.stroke();
  }

  // face base + cel shadow on the left side
  facePath();
  c.fillStyle = SKIN;
  c.fill();
  c.save();
  facePath();
  c.clip();
  c.fillStyle = `rgba(90,45,30,${0.18 + (1 - key) * 0.25})`;
  c.beginPath();
  c.moveTo(-160, -220);
  c.bezierCurveTo(-95, -120, -105, 40, -60, 240);
  c.lineTo(-170, 240);
  c.closePath();
  c.fill();
  // stubble: jaw, chin and upper lip
  c.fillStyle = "rgba(35,28,30,0.32)";
  c.beginPath();
  c.moveTo(-142, 40);
  c.bezierCurveTo(-120, 120, -80, 150, -60, 150);
  c.bezierCurveTo(-40, 100, 40, 100, 60, 150);
  c.bezierCurveTo(80, 150, 120, 120, 142, 40);
  c.lineTo(150, 240);
  c.lineTo(-150, 240);
  c.closePath();
  c.fill();
  c.beginPath();
  c.moveTo(-52, 104);
  c.quadraticCurveTo(0, 88, 52, 104);
  c.lineTo(48, 116);
  c.quadraticCurveTo(0, 108, -48, 116);
  c.closePath();
  c.fill();
  // cheekbone highlight from the key light
  c.fillStyle = `rgba(255,220,180,${0.16 * key})`;
  c.beginPath();
  c.ellipse(78, 10, 40, 22, -0.3, 0, Math.PI * 2);
  c.fill();
  c.restore();
  // outline + rim light on the shadow side
  facePath();
  c.strokeStyle = INK;
  c.lineWidth = 4;
  c.stroke();
  c.strokeStyle = rim;
  c.lineWidth = 4;
  c.beginPath();
  c.moveTo(-136, -150);
  c.bezierCurveTo(-150, -60, -150, 40, -124, 130);
  c.stroke();

  // hair: short, dark, receding at the temples, curly on top
  const hg = c.createLinearGradient(0, -270, 0, -110);
  hg.addColorStop(0, "#43352c");
  hg.addColorStop(1, HAIR);
  c.fillStyle = hg;
  c.beginPath();
  c.moveTo(-143, -92);
  c.lineTo(-146, -168);
  c.quadraticCurveTo(-130, -238, -40, -252);
  c.quadraticCurveTo(48, -264, 116, -232);
  c.quadraticCurveTo(154, -206, 143, -92);
  c.lineTo(130, -128);
  c.quadraticCurveTo(114, -176, 72, -182);
  c.quadraticCurveTo(32, -170, 0, -186);
  c.quadraticCurveTo(-38, -170, -76, -182);
  c.quadraticCurveTo(-116, -176, -130, -128);
  c.closePath();
  c.fill();
  for (let i = 0; i < 11; i++) {
    const a = Math.PI * (1.08 + (i / 10) * 0.84);
    c.beginPath();
    c.arc(Math.cos(a) * 126, -150 + Math.sin(a) * 104, 14, 0, Math.PI * 2);
    c.fill();
  }
  c.strokeStyle = rim;
  c.lineWidth = 4;
  c.beginPath();
  c.moveTo(-146, -110);
  c.lineTo(-146, -168);
  c.quadraticCurveTo(-130, -238, -40, -252);
  c.quadraticCurveTo(48, -264, 116, -232);
  c.stroke();
  c.strokeStyle = "rgba(120,110,105,0.35)";
  c.lineWidth = 3;
  for (let i = 0; i < 9; i++) {
    const x = -95 + i * 24;
    c.beginPath();
    c.arc(x, -222 + Math.abs(x) * 0.2, 8, Math.PI * 1.1, Math.PI * 1.8);
    c.stroke();
  }

  // eye sockets
  for (const s of [-1, 1]) {
    c.fillStyle = "rgba(70,35,25,0.28)";
    c.beginPath();
    c.ellipse(s * 70, -34, 46, 26, 0, 0, Math.PI * 2);
    c.fill();
  }
  // eyes
  for (const s of [-1, 1]) {
    const cx = s * 70,
      cy = -34;
    const up = 15 * eye,
      dn = 10 * Math.max(eye, 0.15);
    if (eye > 0.08) {
      c.save();
      c.beginPath();
      c.moveTo(cx - 36, cy);
      c.quadraticCurveTo(cx - s * 4, cy - up * 1.6, cx + 36, cy - 2);
      c.quadraticCurveTo(cx, cy + dn * 1.5, cx - 36, cy);
      c.closePath();
      c.fillStyle = "#efe6dc";
      c.fill();
      c.clip();
      const ix = cx + look[0] * 12,
        iy = cy - 2 + look[1] * 5;
      c.fillStyle = "#4a2c18";
      c.beginPath();
      c.arc(ix, iy, 13.5, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#0c0807";
      c.beginPath();
      c.arc(ix, iy, 6.5, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "rgba(255,255,255,0.9)";
      c.beginPath();
      c.arc(ix + 4, iy - 5, 3.2, 0, Math.PI * 2);
      c.fill();
      // lid shadow
      c.fillStyle = "rgba(60,30,20,0.25)";
      c.fillRect(cx - 40, cy - 20, 80, 9);
      c.restore();
    }
    // upper lid line (thick) and lower lid
    c.strokeStyle = INK;
    c.lineCap = "round";
    c.lineWidth = 5;
    c.beginPath();
    c.moveTo(cx - 38, cy + 1);
    c.quadraticCurveTo(cx - s * 4, cy - up * 1.6, cx + 38, cy - 2);
    c.stroke();
    c.lineWidth = 2;
    c.strokeStyle = "rgba(20,14,12,0.6)";
    c.beginPath();
    c.moveTo(cx - 30, cy + 4);
    c.quadraticCurveTo(cx, cy + dn * 1.5 + 2, cx + 32, cy + 2);
    c.stroke();
  }

  // eyebrows: very thick, dark, almost straight
  for (const s of [-1, 1]) {
    const innerY = -64 + brow * 6 - (brow < 0 ? -brow * 8 : 0);
    c.fillStyle = INK;
    c.beginPath();
    c.moveTo(s * 24, innerY + 4);
    c.quadraticCurveTo(s * 70, -86 - brow * 2, s * 122, -70);
    c.lineTo(s * 118, -58);
    c.quadraticCurveTo(s * 72, -70 - brow * 2, s * 26, innerY + 22);
    c.closePath();
    c.fill();
  }

  // nose: long and straight, a little full at the tip
  c.strokeStyle = "rgba(60,30,20,0.55)";
  c.lineWidth = 4;
  c.lineCap = "round";
  c.beginPath();
  c.moveTo(-14, -30);
  c.bezierCurveTo(-18, 10, -26, 40, -30, 62);
  c.stroke();
  c.fillStyle = "rgba(90,45,30,0.12)";
  c.beginPath();
  c.moveTo(-14, -30);
  c.bezierCurveTo(-18, 10, -26, 40, -30, 62);
  c.lineTo(-8, 62);
  c.lineTo(-6, -30);
  c.fill();
  c.strokeStyle = INK;
  c.lineWidth = 4;
  c.beginPath();
  c.moveTo(-34, 66);
  c.quadraticCurveTo(-40, 84, -20, 86);
  c.quadraticCurveTo(0, 96, 20, 86);
  c.quadraticCurveTo(40, 84, 34, 66);
  c.stroke();
  c.fillStyle = "rgba(255,225,190,0.35)";
  c.beginPath();
  c.ellipse(6, 64, 10, 8, 0, 0, Math.PI * 2);
  c.fill();

  // mouth: full lips, a slight one-sided smirk
  const sy = smirk * 8;
  c.fillStyle = "#8f5444";
  c.beginPath();
  c.moveTo(-46, 128);
  c.quadraticCurveTo(0, 162, 48, 126 - sy);
  c.quadraticCurveTo(0, 134, -46, 128);
  c.fill();
  c.strokeStyle = INK;
  c.lineWidth = 4;
  c.beginPath();
  c.moveTo(-48, 127);
  c.quadraticCurveTo(-10, 122 - sy * 0.3, 50, 124 - sy);
  c.stroke();
  c.fillStyle = "#7e4638";
  c.beginPath();
  c.moveTo(-44, 126);
  c.quadraticCurveTo(-20, 112, 0, 118);
  c.quadraticCurveTo(20, 112, 46, 124 - sy);
  c.quadraticCurveTo(0, 128, -44, 126);
  c.fill();
  c.fillStyle = "rgba(255,220,190,0.25)";
  c.beginPath();
  c.ellipse(4, 142, 16, 5, 0, 0, Math.PI * 2);
  c.fill();
  c.strokeStyle = "rgba(60,30,20,0.35)";
  c.lineWidth = 3;
  c.beginPath();
  c.moveTo(-58, 112);
  c.quadraticCurveTo(-66, 124, -58, 138);
  c.moveTo(58, 110 - sy);
  c.quadraticCurveTo(68, 120 - sy, 62, 134 - sy);
  c.stroke();
  // chin dimple shadow
  c.fillStyle = "rgba(40,25,25,0.22)";
  c.beginPath();
  c.ellipse(0, 196, 26, 12, 0, 0, Math.PI * 2);
  c.fill();
}
