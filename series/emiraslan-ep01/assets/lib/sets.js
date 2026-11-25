/* Sets: Baku panorama, the boulevard, the HQ office, the street and car, the square.
   All drawn in screen space for a camera offset camX (world x at screen left). */
(function () {
  const T = (window.T = window.T || {});
  const INK = T.INK;

  T.sky = (c, t, top, bot) => {
    const g = c.createLinearGradient(0, 0, 0, 760);
    g.addColorStop(0, top || "#6fb3e8");
    g.addColorStop(1, bot || "#d9eefa");
    c.fillStyle = g;
    c.fillRect(-2000, -1000, 6000, 2600);
    // sun
    c.fillStyle = "rgba(255,240,190,0.9)";
    c.beginPath();
    c.arc(1600, 170, 70, 0, Math.PI * 2);
    c.fill();
    // clouds
    for (let i = 0; i < 6; i++) {
      const x = ((T.rnd(i * 3) * 2600 + t * (12 + i * 3)) % 2600) - 300;
      const y = 90 + T.rnd(i * 7) * 220;
      c.fillStyle = "rgba(255,255,255,0.9)";
      for (let k = 0; k < 4; k++) {
        c.beginPath();
        c.arc(x + k * 55, y + (k % 2) * -18, 48 - Math.abs(k - 1.5) * 8, 0, Math.PI * 2);
        c.fill();
      }
    }
  };

  // Three flame-shaped towers on a hill
  function flameTower(c, x, base, h, w, lean, t) {
    const g = c.createLinearGradient(x - w, 0, x + w, 0);
    g.addColorStop(0, "#5d8fb8");
    g.addColorStop(0.5, "#a9d4f2");
    g.addColorStop(1, "#4b7aa1");
    T.shape(
      c,
      g,
      () => {
        c.moveTo(x - w, base);
        c.bezierCurveTo(
          x - w * 1.1,
          base - h * 0.5,
          x - w * 0.5 + lean,
          base - h * 0.85,
          x + lean,
          base - h,
        );
        c.bezierCurveTo(
          x + w * 0.7 + lean,
          base - h * 0.8,
          x + w * 1.1,
          base - h * 0.45,
          x + w,
          base,
        );
        c.closePath();
      },
      4,
    );
    c.strokeStyle = "rgba(255,255,255,0.35)";
    c.lineWidth = 2;
    for (let i = 1; i < 9; i++) {
      const y = base - (h * i) / 10;
      c.beginPath();
      c.moveTo(x - w * 0.9 * (1 - i / 12), y);
      c.lineTo(x + w * 0.9 * (1 - i / 12), y);
      c.stroke();
    }
    // a warm glint travelling up the glass
    const gy = base - ((t * 0.15 + x * 0.001) % 1) * h;
    c.fillStyle = "rgba(255,170,80,0.35)";
    c.fillRect(x - w * 0.5, gy, w, 14);
  }

  function building(c, x, base, w, h, col, seed) {
    T.shape(c, col, () => c.rect(x, base - h, w, h), 4);
    c.fillStyle = "rgba(40,60,80,0.35)";
    for (let yy = base - h + 20; yy < base - 20; yy += 34) {
      for (let xx = x + 12; xx < x + w - 18; xx += 26) {
        if (T.rnd(seed + xx * 0.3 + yy) > 0.25) c.fillRect(xx, yy, 14, 18);
      }
    }
  }

  // View from the bay: sea in front, boulevard, the city on the hill
  T.panorama = (c, camX, t) => {
    T.sky(c, t);
    c.save();
    c.translate(-camX * 0.3, 0);
    // hill
    T.shape(
      c,
      "#9fbf7a",
      () => {
        c.moveTo(-400, 640);
        c.quadraticCurveTo(500, 330, 1300, 420);
        c.quadraticCurveTo(2100, 480, 2800, 640);
        c.closePath();
      },
      4,
    );
    // TV tower
    T.shape(
      c,
      "#e9eef2",
      () => {
        c.moveTo(560, 470);
        c.lineTo(578, 120);
        c.lineTo(596, 470);
        c.closePath();
      },
      3,
    );
    T.shape(c, "#e9eef2", () => c.ellipse(578, 170, 26, 12, 0, 0, Math.PI * 2), 3);
    flameTower(c, 1060, 420, 300, 70, -10, t);
    flameTower(c, 1180, 410, 360, 78, 6, t);
    flameTower(c, 1300, 430, 280, 66, 12, t);
    c.restore();
    c.save();
    c.translate(-camX * 0.5, 0);
    const cols = ["#efe2c4", "#e6d3ad", "#f3ead6", "#dcc7a0"];
    for (let i = 0; i < 26; i++) {
      const w = 90 + T.rnd(i) * 80,
        h = 90 + T.rnd(i * 3) * 120;
      building(c, -300 + i * 130, 650, w, h, cols[i % 4], i * 9);
    }
    // Maiden Tower-like stone tower near the shore
    T.shape(c, "#cdb88f", () => c.rect(1700, 470, 120, 180), 4);
    T.shape(c, "#cdb88f", () => c.rect(1820, 520, 40, 130), 4);
    c.strokeStyle = "rgba(90,70,40,0.35)";
    for (let y = 490; y < 650; y += 22) {
      c.beginPath();
      c.moveTo(1700, y);
      c.lineTo(1820, y);
      c.stroke();
    }
    c.restore();
    c.save();
    c.translate(-camX * 0.8, 0);
    // boulevard strip with trees
    c.fillStyle = "#d8cfbd";
    c.fillRect(-400, 640, 4000, 40);
    for (let i = 0; i < 40; i++) {
      const x = -300 + i * 110;
      T.shape(c, "#5e9b46", () => c.arc(x, 620, 36, 0, Math.PI * 2), 3);
    }
    c.restore();
    // sea
    const sg = c.createLinearGradient(0, 680, 0, 1080);
    sg.addColorStop(0, "#3a8fc7");
    sg.addColorStop(1, "#1f5f94");
    c.fillStyle = sg;
    c.fillRect(0, 680, 1920, 400);
    c.strokeStyle = "rgba(255,255,255,0.5)";
    c.lineWidth = 3;
    for (let i = 0; i < 40; i++) {
      const x = ((((T.rnd(i) * 2200 - camX - t * 20) % 2200) + 2200) % 2200) - 140;
      const y = 700 + T.rnd(i * 4) * 370;
      const l = 30 + T.rnd(i * 2) * 50;
      c.beginPath();
      c.moveTo(x, y + Math.sin(t * 2 + i) * 4);
      c.quadraticCurveTo(x + l / 2, y - 6, x + l, y + Math.sin(t * 2 + i) * 4);
      c.stroke();
    }
  };

  // Promenade: the sea behind a railing, paving in front. Objects at world x.
  T.boulevard = (c, camX, t, o) => {
    const opt = o || {};
    T.sky(c, t);
    // distant sea + horizon ships
    c.fillStyle = "#4da0d6";
    c.fillRect(0, 430, 1920, 260);
    c.fillStyle = "#3d8cc2";
    c.fillRect(0, 430, 1920, 6);
    c.fillStyle = "#e9eef2";
    const shipX = ((((300 - camX * 0.1 + t * 6) % 2200) + 2200) % 2200) - 100;
    c.fillRect(shipX, 412, 90, 18);
    c.fillRect(shipX + 20, 398, 30, 14);
    c.strokeStyle = "rgba(255,255,255,0.5)";
    c.lineWidth = 3;
    for (let i = 0; i < 24; i++) {
      const x = ((((T.rnd(i) * 2100 - camX * 0.3 - t * 15) % 2100) + 2100) % 2100) - 90;
      const y = 460 + T.rnd(i * 4) * 210;
      c.beginPath();
      c.moveTo(x, y);
      c.quadraticCurveTo(x + 22, y - 6, x + 44, y);
      c.stroke();
    }
    c.save();
    c.translate(-camX, 0);
    // railing
    c.fillStyle = "#d9d4c7";
    c.fillRect(camX - 50, 640, 2100, 60);
    c.strokeStyle = INK;
    c.lineWidth = 4;
    c.strokeRect(camX - 50, 640, 2100, 60);
    c.fillStyle = "#6b6f72";
    c.fillRect(camX - 50, 590, 2100, 10);
    for (let x = Math.floor(camX / 80) * 80 - 80; x < camX + 2050; x += 80)
      c.fillRect(x, 598, 8, 44);
    // paving
    const pg = c.createLinearGradient(0, 700, 0, 1080);
    pg.addColorStop(0, "#e6dcc6");
    pg.addColorStop(1, "#cfc2a6");
    c.fillStyle = pg;
    c.fillRect(camX - 50, 700, 2100, 400);
    c.strokeStyle = "rgba(120,100,70,0.25)";
    c.lineWidth = 2;
    for (let y = 740; y < 1080; y += 60) {
      c.beginPath();
      c.moveTo(camX - 50, y);
      c.lineTo(camX + 2050, y);
      c.stroke();
    }
    for (let x = Math.floor(camX / 120) * 120 - 120; x < camX + 2050; x += 120) {
      c.beginPath();
      c.moveTo(x, 700);
      c.lineTo(x - 60, 1080);
      c.stroke();
    }
    // palms and lamps behind the walkers
    for (let x = Math.floor(camX / 600) * 600 - 600; x < camX + 2300; x += 600) {
      // palm
      c.fillStyle = "#8a6a45";
      c.fillRect(x + 300, 400, 22, 300);
      c.strokeStyle = INK;
      c.lineWidth = 4;
      c.strokeRect(x + 300, 400, 22, 300);
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2 + Math.sin(t * 1.5 + x) * 0.06;
        T.shape(
          c,
          "#4f9a3c",
          () => {
            c.moveTo(x + 311, 400);
            c.quadraticCurveTo(
              x + 311 + Math.cos(a) * 90,
              380 + Math.sin(a) * 40 - 40,
              x + 311 + Math.cos(a) * 150,
              410 + Math.sin(a) * 50,
            );
            c.quadraticCurveTo(x + 311 + Math.cos(a) * 80, 400 + Math.sin(a) * 30, x + 311, 404);
          },
          3,
        );
      }
      // lamp
      c.fillStyle = "#2d3a3f";
      c.fillRect(x + 20, 420, 12, 290);
      T.shape(c, "#f6e7a8", () => c.arc(x + 26, 410, 22, 0, Math.PI * 2), 4);
      // bench
      T.shape(c, "#8d6e4f", () => c.rect(x + 420, 690, 150, 18), 4);
      T.shape(c, "#8d6e4f", () => c.rect(x + 420, 650, 150, 16), 4);
    }
    // the big flag
    if (opt.flagX != null) {
      T.flag(c, opt.flagX, 80, 420, 270, t, { poleH: 640 });
    }
    // cafe
    if (opt.cafeX != null) {
      const cx = opt.cafeX;
      T.shape(c, "#f4ead3", () => c.rect(cx, 420, 520, 290), 4);
      T.shape(
        c,
        "#c0392b",
        () => {
          c.moveTo(cx - 20, 420);
          c.lineTo(cx + 540, 420);
          c.lineTo(cx + 520, 470);
          c.lineTo(cx, 470);
          c.closePath();
        },
        4,
      );
      c.fillStyle = "#fff";
      for (let i = 0; i < 10; i++) c.fillRect(cx + i * 54, 424, 26, 44);
      c.font = '44px "Bangers"';
      c.fillStyle = "#6b3a1f";
      c.textAlign = "center";
      c.fillText("ÇAYXANA & KAFE", cx + 260, 530);
      c.fillStyle = "#9cc7e0";
      c.fillRect(cx + 40, 560, 160, 120);
      c.fillRect(cx + 320, 560, 160, 120);
    }
    c.restore();
  };

  // Cafe table with an umbrella (drawn in front of the walkers when needed)
  T.cafeTable = (c, x, y, t, tip) => {
    c.save();
    c.translate(x, y);
    c.rotate(tip || 0);
    c.fillStyle = "#5b5b5b";
    c.fillRect(-6, -320, 12, 320);
    T.shape(c, "#ef3340", () => {
      c.moveTo(-160, -300);
      c.quadraticCurveTo(0, -400, 160, -300);
      c.closePath();
    });
    c.fillStyle = "#fff";
    c.beginPath();
    c.moveTo(-50, -310);
    c.quadraticCurveTo(0, -370, 50, -310);
    c.closePath();
    c.fill();
    T.shape(c, "#f2f2f2", () => c.ellipse(0, -110, 90, 20, 0, 0, Math.PI * 2), 4);
    c.fillStyle = "#5b5b5b";
    c.fillRect(-5, -110, 10, 110);
    c.restore();
  };

  // HQ office. o: { ring, steam, glassFull (0..1), door }
  T.office = (c, t) => {
    // wall + wainscot
    c.fillStyle = "#e9e0c9";
    c.fillRect(-500, -500, 2900, 1700);
    c.fillStyle = "#cbbd98";
    c.fillRect(-500, 640, 2900, 500);
    c.fillStyle = "#a9946b";
    c.fillRect(-500, 630, 2900, 14);
    // window with the Flame Towers outside
    c.save();
    c.beginPath();
    c.rect(1240, 140, 470, 400);
    c.clip();
    T.sky(c, t);
    flameTower(c, 1420, 560, 300, 60, -8, t);
    flameTower(c, 1520, 560, 360, 66, 4, t);
    flameTower(c, 1620, 560, 280, 56, 10, t);
    c.restore();
    c.strokeStyle = "#7a6644";
    c.lineWidth = 18;
    c.strokeRect(1240, 140, 470, 400);
    c.lineWidth = 8;
    c.beginPath();
    c.moveTo(1475, 140);
    c.lineTo(1475, 540);
    c.stroke();
    // flag on a stand
    c.save();
    c.fillStyle = "#c9a54f";
    c.fillRect(250, 120, 12, 560);
    T.flag(c, 262, 130, 230, 150, t * 0.4, { pole: false, amp: 5 });
    c.fillStyle = "#6d5a3a";
    c.fillRect(220, 670, 72, 20);
    c.restore();
    // map board
    T.shape(c, "#f5f1e6", () => c.rect(560, 170, 460, 300), 5);
    c.strokeStyle = "#7aa35a";
    c.lineWidth = 6;
    c.beginPath();
    c.moveTo(600, 380);
    c.bezierCurveTo(700, 250, 820, 330, 880, 230);
    c.bezierCurveTo(920, 260, 960, 330, 990, 300);
    c.stroke();
    c.fillStyle = "#e53935";
    for (const [px, py] of [
      [700, 300],
      [860, 260],
      [930, 330],
    ]) {
      c.beginPath();
      c.arc(px, py, 10, 0, Math.PI * 2);
      c.fill();
    }
    c.font = '40px "Bangers"';
    c.fillStyle = "#3b4a2a";
    c.textAlign = "center";
    c.fillText("BAKI", 790, 440);
  };

  // The desk sits in front of the character; phone and tea on it
  T.desk = (c, t, o) => {
    const opt = o || {};
    T.shape(c, "#7b5634", () => c.rect(380, 760, 1160, 330));
    T.shape(c, "#93683f", () => c.rect(360, 730, 1200, 42));
    // papers
    T.shape(c, "#fff", () => c.rect(1100, 700, 160, 34), 3);
    // phone
    const sh = opt.ring ? Math.sin(t * 60) * 6 : 0;
    c.save();
    c.translate(560 + sh, 700);
    T.shape(c, "#2a3a2c", () => c.roundRect(-80, -10, 160, 44, 10));
    if (!opt.receiverUp) T.shape(c, "#1f2a22", () => c.roundRect(-90, -44, 180, 36, 16));
    c.restore();
    if (opt.ring) T.word(c, "TRRR!", 560, 600, 60, ((t * 1.3) % 1) * 0.9 + 0.05, "#e53935", -0.2);
    // tea glass on saucer
    if (opt.tea !== false) {
      c.save();
      c.translate(opt.teaX || 1330, 732);
      T.shape(c, "#e8e8e8", () => c.ellipse(0, 0, 60, 14, 0, 0, Math.PI * 2), 4);
      T.shape(
        c,
        "rgba(200,90,40,0.85)",
        () => {
          c.moveTo(-22, -96);
          c.lineTo(22, -96);
          c.quadraticCurveTo(12, -54, 28, -20);
          c.quadraticCurveTo(0, 6, -28, -20);
          c.quadraticCurveTo(-12, -54, -22, -96);
        },
        4,
      );
      if (opt.steam) {
        c.strokeStyle = "rgba(255,255,255,0.75)";
        c.lineWidth = 5;
        for (let k = 0; k < 3; k++) {
          c.beginPath();
          for (let i = 0; i < 12; i++) {
            const y = -110 - i * 12;
            const x = (k - 1) * 16 + Math.sin(t * 3 + i * 0.6 + k) * 8;
            if (i) c.lineTo(x, y);
            else c.moveTo(x, y);
          }
          c.stroke();
        }
      }
      c.restore();
    }
  };

  // Street with stone buildings (side view), for the car
  T.street = (c, camX, t) => {
    T.sky(c, t);
    c.save();
    c.translate(-camX * 0.4, 0);
    for (let i = 0; i < 60; i++) {
      const x = i * 210;
      const h = 300 + T.rnd(i) * 220;
      const col = ["#efe2c4", "#e6d3ad", "#f3ead6", "#dcc7a0"][i % 4];
      T.shape(c, col, () => c.rect(x, 700 - h, 200, h), 4);
      c.fillStyle = "#7d97ab";
      for (let yy = 700 - h + 40; yy < 640; yy += 80) {
        for (let xx = x + 24; xx < x + 180; xx += 56) {
          c.fillRect(xx, yy, 32, 46);
          c.fillStyle = "#cbb68d";
          c.fillRect(xx - 6, yy + 46, 44, 8);
          c.fillStyle = "#7d97ab";
        }
      }
    }
    c.restore();
    c.save();
    c.translate(-camX * 0.9, 0);
    for (let i = 0; i < 80; i++) {
      const x = i * 260;
      c.fillStyle = "#7a5a3a";
      c.fillRect(x + 110, 560, 18, 160);
      T.shape(c, "#5e9b46", () => c.arc(x + 119, 540, 70, 0, Math.PI * 2), 4);
    }
    c.restore();
    // sidewalk, kerb, road
    c.fillStyle = "#d6cbb6";
    c.fillRect(0, 700, 1920, 70);
    c.fillStyle = "#9e9e9e";
    c.fillRect(0, 770, 1920, 16);
    c.fillStyle = "#4a4d52";
    c.fillRect(0, 786, 1920, 300);
    c.fillStyle = "#f2f2f2";
    for (let x = -((camX * 1.0) % 220); x < 1920; x += 220) c.fillRect(x, 930, 120, 12);
  };

  // Service car, side view; x is the car centre, wheels on y
  T.car = (c, x, y, s, t, o) => {
    const opt = o || {};
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    const bump = Math.sin(t * 20) * 2;
    c.translate(0, bump);
    T.shape(c, "#5b6b3c", () => {
      c.moveTo(-330, -60);
      c.lineTo(-320, -170);
      c.lineTo(-190, -180);
      c.lineTo(-120, -300);
      c.lineTo(180, -300);
      c.lineTo(250, -180);
      c.lineTo(330, -170);
      c.lineTo(340, -60);
      c.closePath();
    });
    // windows
    T.shape(
      c,
      "#a9d4f2",
      () => {
        c.moveTo(-105, -280);
        c.lineTo(20, -280);
        c.lineTo(20, -185);
        c.lineTo(-170, -185);
        c.closePath();
      },
      4,
    );
    T.shape(
      c,
      "#a9d4f2",
      () => {
        c.moveTo(40, -280);
        c.lineTo(170, -280);
        c.lineTo(225, -185);
        c.lineTo(40, -185);
        c.closePath();
      },
      4,
    );
    if (opt.riders) opt.riders(c);
    // stripe and star
    c.fillStyle = "#e6c35a";
    c.fillRect(-325, -130, 660, 16);
    c.fillStyle = "#e6c35a";
    T.star(c, 0, -90, 26);
    // siren bar
    if (opt.siren) {
      const ph = Math.floor(t * 6) % 2;
      T.shape(c, ph ? "#2f7bff" : "#9bb8ff", () => c.rect(-60, -330, 60, 30), 4);
      T.shape(c, ph ? "#ff9b9b" : "#ff2f2f", () => c.rect(0, -330, 60, 30), 4);
    }
    // wheels
    for (const wx of [-200, 210]) {
      T.shape(c, "#1b1b1b", () => c.arc(wx, -40, 62, 0, Math.PI * 2));
      T.shape(c, "#b0b5b9", () => c.arc(wx, -40, 28, 0, Math.PI * 2), 4);
      c.strokeStyle = INK;
      c.lineWidth = 5;
      const a = t * 18;
      c.beginPath();
      c.moveTo(wx + Math.cos(a) * 26, -40 + Math.sin(a) * 26);
      c.lineTo(wx - Math.cos(a) * 26, -40 - Math.sin(a) * 26);
      c.stroke();
    }
    c.restore();
  };

  // The square: plaza, fountain, buildings, a big screen. o: { screen(c, x, y, w, h), chaos }
  T.square = (c, camX, t, o) => {
    const opt = o || {};
    T.sky(c, t);
    c.save();
    c.translate(-camX * 0.5, 0);
    const cols = ["#efe2c4", "#e6d3ad", "#f3ead6", "#dcc7a0", "#d9c3a0"];
    for (let i = -2; i < 14; i++) {
      const x = i * 300;
      const h = 360 + T.rnd(i + 30) * 160;
      T.shape(c, cols[(i + 10) % 5], () => c.rect(x, 650 - h, 290, h));
      c.fillStyle = "#7d97ab";
      for (let yy = 650 - h + 50; yy < 600; yy += 90) {
        for (let xx = x + 30; xx < x + 260; xx += 70) {
          c.fillRect(xx, yy, 36, 52);
        }
      }
    }
    // big screen on a building
    const sx = 760,
      sy = 120,
      sw = 640,
      sh = 360;
    T.shape(c, "#2b2f36", () => c.rect(sx - 24, sy - 24, sw + 48, sh + 48), 6);
    c.fillStyle = "#11151b";
    c.fillRect(sx, sy, sw, sh);
    if (opt.screen) {
      c.save();
      c.beginPath();
      c.rect(sx, sy, sw, sh);
      c.clip();
      opt.screen(c, sx, sy, sw, sh);
      c.restore();
    }
    c.restore();
    // plaza
    const pg = c.createLinearGradient(0, 650, 0, 1080);
    pg.addColorStop(0, "#dcd2bd");
    pg.addColorStop(1, "#bfb195");
    c.fillStyle = pg;
    c.fillRect(0, 650, 1920, 430);
    c.strokeStyle = "rgba(110,90,60,0.25)";
    c.lineWidth = 2;
    for (let y = 680; y < 1080; y += 50) {
      c.beginPath();
      c.moveTo(0, y);
      c.lineTo(1920, y);
      c.stroke();
    }
    c.save();
    c.translate(-camX, 0);
    for (let x = Math.floor(camX / 140) * 140 - 140; x < camX + 2100; x += 140) {
      c.beginPath();
      c.moveTo(x, 650);
      c.lineTo(x + (x - camX - 960) * 0.6, 1080);
      c.stroke();
    }
    // fountain
    const fx = 1700;
    T.shape(c, "#c9c2b2", () => c.ellipse(fx, 700, 220, 50, 0, 0, Math.PI * 2));
    T.shape(c, "#7fc4e8", () => c.ellipse(fx, 694, 190, 38, 0, 0, Math.PI * 2), 3);
    c.strokeStyle = "rgba(220,240,255,0.9)";
    c.lineWidth = 6;
    for (let k = -2; k <= 2; k++) {
      c.beginPath();
      c.moveTo(fx, 690);
      c.quadraticCurveTo(fx + k * 40, 560 + Math.sin(t * 6 + k) * 8, fx + k * 90, 690);
      c.stroke();
    }
    if (opt.chaos) {
      // knocked-over stall and graffiti
      c.save();
      c.translate(camX + 70, 700);
      c.scale(0.7, 0.7);
      c.rotate(-0.4);
      T.shape(c, "#8d6e4f", () => c.rect(-120, -60, 240, 60));
      T.shape(c, "#ffd23f", () => c.rect(-130, -140, 260, 30));
      c.restore();
      c.font = '70px "Bangers"';
      c.fillStyle = "#3ddc4a";
      c.textAlign = "left";
      c.fillText("JOKER TEAM", -120 + 80, 520);
    }
    c.restore();
  };
})();
