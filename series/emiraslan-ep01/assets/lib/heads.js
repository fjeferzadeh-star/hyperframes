/* Heads. Each head is drawn with its origin at the bridge of the nose and is ~500 px tall
   at scale 1. Shared params: eye, look, brow, mouth (talking 0..1), grin, blush. */
(function () {
  const T = (window.T = window.T || {});

  T.headEmiraslan = function (c, o) {
    const eye = o.eye == null ? 1 : o.eye;
    const look = o.look || [0, 0];
    const brow = o.brow || 0;
    const smirk = o.smirk || 0;
    const rim = o.rim || "rgba(150,180,220,0.8)";
    const key = o.key == null ? 1 : o.key;
    const mouth = o.mouth || 0;
    const grin = o.grin || 0;
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
        if (o.heartEyes) {
          c.restore();
          T.heart(c, cx, cy - 4, 1.5 + 0.15 * Math.sin((o.t || 0) * 12));
          continue;
        }
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

    // glasses: thin dark rectangular frames
    if (o.glasses !== false) {
      c.strokeStyle = "#1d1a1a";
      c.lineWidth = 6;
      for (const s of [-1, 1]) {
        c.beginPath();
        c.roundRect(s * 70 - 52, -66, 104, 64, 16);
        c.fillStyle = "rgba(190,220,240,0.14)";
        c.fill();
        c.stroke();
        c.fillStyle = "rgba(255,255,255,0.35)";
        c.beginPath();
        c.moveTo(s * 70 - 40, -58);
        c.lineTo(s * 70 - 22, -58);
        c.lineTo(s * 70 - 40, -26);
        c.closePath();
        c.fill();
      }
      c.beginPath();
      c.moveTo(-18, -44);
      c.quadraticCurveTo(0, -54, 18, -44);
      c.moveTo(-122, -46);
      c.lineTo(-146, -40);
      c.moveTo(122, -46);
      c.lineTo(146, -40);
      c.stroke();
      if (o.glint) T.glint(c, 92, -52, 34 * o.glint, o.glint);
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

    if (o.blush) {
      c.fillStyle = `rgba(255,90,110,${0.35 * o.blush})`;
      for (const s of [-1, 1]) {
        c.beginPath();
        c.ellipse(s * 92, 40, 30, 16, 0, 0, Math.PI * 2);
        c.fill();
      }
    }
    // mouth: talking / grin / closed lips with a slight smirk
    if (mouth > 0.05 || grin > 0.05) {
      const open = Math.max(mouth * 34, grin * 12);
      const wide = 46 + grin * 20;
      const mp = () => {
        c.beginPath();
        c.moveTo(-wide, 124 - grin * 8);
        c.quadraticCurveTo(0, 130 + open * 1.8 + grin * 14, wide, 124 - grin * 8);
        c.quadraticCurveTo(0, 116 + grin * 4, -wide, 124 - grin * 8);
        c.closePath();
      };
      mp();
      c.fillStyle = "#3a1512";
      c.fill();
      c.save();
      mp();
      c.clip();
      c.fillStyle = "#f4efe6";
      c.fillRect(-wide, 112, wide * 2, 12 + grin * 6);
      c.fillStyle = "#c2565a";
      c.beginPath();
      c.ellipse(0, 136 + open * 1.6, 26, 12, 0, 0, Math.PI * 2);
      c.fill();
      c.restore();
      mp();
      c.strokeStyle = INK;
      c.lineWidth = 4;
      c.stroke();
      return;
    }
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
  };

  // Generic cartoon head for the rest of the cast.
  // h: look (skin, shape, w, hair, hairColor, mustache, cap, capColor, sunglasses, goggles,
  //    lipstick, lashes, earrings, goldTooth, nose); o: per-frame (eye, look, brow, mouth, grin, blush)
  T.toonHead = function (c, h, o) {
    const INK = T.INK;
    const W = h.w || 140;
    const top = h.top || -205,
      chin = h.chin || 225;
    const skin = h.skin || "#d6a17f";
    const dark = h.skinDark || "rgba(90,45,30,0.22)";
    const eye = o.eye == null ? 1 : o.eye;
    const look = o.look || [0, 0];
    const brow = o.brow || 0;
    const mouth = o.mouth || 0;
    const grin = o.grin || 0;
    const round = h.shape === "round";
    const face = () => {
      c.beginPath();
      if (round) {
        c.ellipse(0, (top + chin) / 2, W, (chin - top) / 2, 0, 0, Math.PI * 2);
      } else {
        c.moveTo(0, top);
        c.bezierCurveTo(W * 0.66, top, W, top + 50, W, -60);
        c.bezierCurveTo(W * 1.04, 30, W * 0.95, 90, W * 0.8, 140);
        c.bezierCurveTo(W * 0.6, chin - 20, W * 0.3, chin, 0, chin);
        c.bezierCurveTo(-W * 0.3, chin, -W * 0.6, chin - 20, -W * 0.8, 140);
        c.bezierCurveTo(-W * 0.95, 90, -W * 1.04, 30, -W, -60);
        c.bezierCurveTo(-W, top + 50, -W * 0.66, top, 0, top);
        c.closePath();
      }
    };
    // long hair behind the head
    if (h.hair === "long") {
      c.fillStyle = h.hairColor;
      c.beginPath();
      c.moveTo(-W - 20, -90);
      c.quadraticCurveTo(-W - 70, 160, -W - 30, 330 + Math.sin((o.t || 0) * 3) * 8);
      c.lineTo(W + 30, 330 + Math.sin((o.t || 0) * 3 + 1) * 8);
      c.quadraticCurveTo(W + 70, 160, W + 20, -90);
      c.closePath();
      c.fill();
      c.strokeStyle = INK;
      c.lineWidth = 4;
      c.stroke();
    }
    // neck
    c.fillStyle = skin;
    c.fillRect(-W * 0.42, 150, W * 0.84, 150);
    c.fillStyle = "rgba(40,20,15,0.3)";
    c.fillRect(-W * 0.42, 150, W * 0.84, 34);
    // ears
    if (h.hair !== "long") {
      for (const s of [-1, 1]) {
        T.shape(
          c,
          skin,
          () =>
            c.ellipse(s * (W + 6), 6, h.bigEars ? 38 : 26, h.bigEars ? 56 : 44, 0, 0, Math.PI * 2),
          4,
        );
      }
    }
    face();
    c.fillStyle = skin;
    c.fill();
    c.save();
    face();
    c.clip();
    c.fillStyle = dark;
    c.beginPath();
    c.moveTo(-W - 20, top - 20);
    c.bezierCurveTo(-W * 0.65, -100, -W * 0.7, 60, -W * 0.4, chin + 20);
    c.lineTo(-W - 30, chin + 20);
    c.fill();
    if (h.stubble) {
      c.fillStyle = "rgba(35,28,30,0.25)";
      c.fillRect(-W - 10, 90, W * 2 + 20, chin);
    }
    c.restore();
    face();
    c.strokeStyle = INK;
    c.lineWidth = 5;
    c.stroke();

    // hair
    const hc = h.hairColor || "#1b1411";
    c.fillStyle = hc;
    c.strokeStyle = INK;
    c.lineWidth = 4;
    if (h.hair === "short" || h.hair === "long" || h.hair === "bowl") {
      c.beginPath();
      c.moveTo(-W - 4, h.hair === "bowl" ? -40 : -70);
      c.quadraticCurveTo(-W - 14, top - 60, 0, top - 58);
      c.quadraticCurveTo(W + 14, top - 60, W + 4, h.hair === "bowl" ? -40 : -70);
      if (h.hair === "bowl") {
        c.lineTo(W - 10, -90);
        c.lineTo(-W + 10, -90);
      } else {
        c.quadraticCurveTo(W * 0.6, top + 10, 0, top + 30);
        c.quadraticCurveTo(-W * 0.6, top + 10, -W - 4, -70);
      }
      c.closePath();
      c.fill();
      c.stroke();
    } else if (h.hair === "spiky") {
      c.beginPath();
      c.moveTo(-W - 4, -70);
      for (let i = 0; i <= 8; i++) {
        const x = -W + (i / 8) * 2 * W;
        const yy = top - 20 - (i % 2 ? 0 : 70 + 15 * T.rnd(i + W));
        c.lineTo(x, yy);
      }
      c.lineTo(W + 4, -70);
      c.quadraticCurveTo(0, top + 40, -W - 4, -70);
      c.closePath();
      c.fill();
      c.stroke();
    } else if (h.hair === "mohawk") {
      c.beginPath();
      c.moveTo(-40, top + 20);
      for (let i = 0; i <= 6; i++) {
        const x = -40 + (i / 6) * 80;
        c.lineTo(x + (i % 2 ? 0 : 0), top - (i % 2 ? 40 : 170) - Math.sin((o.t || 0) * 6 + i) * 6);
      }
      c.lineTo(40, top + 20);
      c.closePath();
      c.fill();
      c.stroke();
      c.fillStyle = "rgba(30,20,20,0.35)";
      c.fillRect(-W + 20, top + 10, W * 2 - 40, 20);
    } else if (h.hair === "curly") {
      for (let i = 0; i < 9; i++) {
        const a = Math.PI * (1.05 + (i / 8) * 0.9);
        c.beginPath();
        c.arc(Math.cos(a) * W * 0.95, -60 + Math.sin(a) * (W + 30), 36, 0, Math.PI * 2);
        c.fill();
        c.stroke();
      }
    }

    // caps
    if (h.cap === "pilotka") {
      T.shape(c, h.capColor || "#4e5636", () => {
        c.moveTo(-W - 6, -120);
        c.quadraticCurveTo(-W * 0.4, top - 70, W * 0.3, top - 50);
        c.lineTo(W + 10, -120);
        c.closePath();
      });
      c.fillStyle = "#e6c35a";
      T.star(c, -W * 0.45, -150, 14);
    } else if (h.cap === "beanie") {
      T.shape(c, h.capColor || "#2e7d32", () => {
        c.moveTo(-W - 8, -100);
        c.quadraticCurveTo(-W, top - 120, 0, top - 110);
        c.quadraticCurveTo(W, top - 120, W + 8, -100);
        c.closePath();
      });
      T.shape(c, "#ffd23f", () => c.arc(0, top - 115, 24, 0, Math.PI * 2));
    } else if (h.cap === "baseball") {
      T.shape(c, h.capColor || "#d32f2f", () => {
        c.moveTo(-W - 4, -110);
        c.quadraticCurveTo(-W, top - 90, 0, top - 86);
        c.quadraticCurveTo(W, top - 90, W + 4, -110);
        c.closePath();
      });
      T.shape(c, h.capColor || "#d32f2f", () =>
        c.ellipse(W * 0.6, -110, W * 0.7, 22, 0.05, 0, Math.PI * 2),
      );
    }

    // eyes
    for (const s of [-1, 1]) {
      const cx = s * W * 0.42,
        cy = -30;
      if (h.sunglasses) continue;
      if (eye > 0.12) {
        T.shape(c, "#fbf7f0", () => c.ellipse(cx, cy, 30, 26 * eye, 0, 0, Math.PI * 2), 4);
        if (o.heartEyes) {
          T.heart(c, cx, cy - 2, 1.4);
        } else {
          c.fillStyle = h.eyeColor || "#3b2416";
          c.beginPath();
          c.arc(cx + look[0] * 10, cy + look[1] * 8, 13, 0, Math.PI * 2);
          c.fill();
          c.fillStyle = "#fff";
          c.beginPath();
          c.arc(cx + look[0] * 10 + 4, cy + look[1] * 8 - 5, 4, 0, Math.PI * 2);
          c.fill();
        }
      } else {
        c.strokeStyle = INK;
        c.lineWidth = 5;
        c.beginPath();
        c.moveTo(cx - 26, cy);
        c.quadraticCurveTo(cx, cy + 10, cx + 26, cy);
        c.stroke();
      }
      if (h.lashes) {
        c.strokeStyle = INK;
        c.lineWidth = 4;
        for (let k = 0; k < 3; k++) {
          c.beginPath();
          c.moveTo(cx + s * (12 + k * 8), cy - 22 * eye);
          c.lineTo(cx + s * (22 + k * 10), cy - 34 * eye - 4);
          c.stroke();
        }
      }
      // brows
      c.fillStyle = h.browColor || "#1b1411";
      c.save();
      c.translate(cx, cy - 52 - brow * -4);
      c.rotate(s * (brow * 0.25));
      c.beginPath();
      c.roundRect(-34, -(h.brows || 8), 68, (h.brows || 8) * 2, 6);
      c.fill();
      c.restore();
    }
    if (h.sunglasses) {
      c.fillStyle = "#101214";
      for (const s of [-1, 1]) {
        c.beginPath();
        c.roundRect(s * W * 0.42 - 46, -62, 92, 56, 18);
        c.fill();
      }
      c.fillRect(-20, -48, 40, 10);
      c.fillStyle = "rgba(255,255,255,0.45)";
      c.fillRect(-W * 0.42 - 30, -54, 18, 8);
      c.fillRect(W * 0.42 - 30, -54, 18, 8);
    }
    if (h.goggles) {
      c.strokeStyle = INK;
      c.lineWidth = 12;
      c.beginPath();
      c.moveTo(-W, -150);
      c.lineTo(W, -150);
      c.stroke();
      for (const s of [-1, 1])
        T.shape(c, "#8fd6ff", () => c.arc(s * 46, -152, 36, 0, Math.PI * 2), 8);
    }

    // nose
    c.strokeStyle = "rgba(70,35,25,0.7)";
    c.lineWidth = 4;
    if (h.nose === "round") {
      T.shape(c, h.noseColor || skin, () => c.ellipse(0, 40, 26, 22, 0, 0, Math.PI * 2), 4);
    } else {
      c.beginPath();
      c.moveTo(-6, -10);
      c.quadraticCurveTo(-24, 50, -4, 62);
      c.quadraticCurveTo(10, 66, 22, 56);
      c.stroke();
    }
    if (h.mustache) {
      T.shape(
        c,
        h.hairColor || "#1b1411",
        () => {
          c.moveTo(-62, 108);
          c.quadraticCurveTo(-30, 70, 0, 86);
          c.quadraticCurveTo(30, 70, 62, 108);
          c.quadraticCurveTo(30, 96, 0, 100);
          c.quadraticCurveTo(-30, 96, -62, 108);
        },
        3,
      );
    }
    if (o.blush) {
      c.fillStyle = `rgba(255,90,110,${0.4 * o.blush})`;
      for (const s of [-1, 1]) {
        c.beginPath();
        c.ellipse(s * W * 0.62, 50, 28, 15, 0, 0, Math.PI * 2);
        c.fill();
      }
    }
    // mouth
    const lip = h.lipstick || null;
    if (mouth > 0.05 || grin > 0.05) {
      const open = Math.max(mouth * 40, grin * 14);
      const wide = 40 + grin * 34;
      const mp = () => {
        c.beginPath();
        c.moveTo(-wide, 122 - grin * 12);
        c.quadraticCurveTo(0, 126 + open * 1.8 + grin * 20, wide, 122 - grin * 12);
        c.quadraticCurveTo(0, 114 + grin * 2, -wide, 122 - grin * 12);
        c.closePath();
      };
      mp();
      c.fillStyle = "#3a1512";
      c.fill();
      c.save();
      mp();
      c.clip();
      c.fillStyle = "#f6f1e8";
      c.fillRect(-wide, 108, wide * 2, 16 + grin * 8);
      if (h.goldTooth) {
        c.fillStyle = "#f2c230";
        c.fillRect(10, 110, 16, 16 + grin * 6);
      }
      c.fillStyle = "#c2565a";
      c.beginPath();
      c.ellipse(0, 136 + open * 1.5, 22, 11, 0, 0, Math.PI * 2);
      c.fill();
      c.restore();
      mp();
      c.strokeStyle = lip || INK;
      c.lineWidth = lip ? 7 : 5;
      c.stroke();
    } else {
      c.strokeStyle = lip || INK;
      c.lineWidth = lip ? 9 : 5;
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(-34, 120);
      c.quadraticCurveTo(0, 134 + (o.smile || 0) * 14, 34, 120);
      c.stroke();
    }
    if (h.earrings) {
      c.fillStyle = "#f2c230";
      for (const s of [-1, 1]) {
        c.beginPath();
        c.arc(s * (W + 10), 70, 10, 0, Math.PI * 2);
        c.fill();
      }
    }
  };
})();
