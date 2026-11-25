// SCENE 2. Captain Emiraslan at HQ: tea, a phone call, and the hero montage.
const E = T.CAST.emiraslan;

function radioRoom(c, t) {
  c.fillStyle = "#cfd8c4";
  c.fillRect(-400, -400, 2800, 1900);
  c.fillStyle = "#b5c0a8";
  c.fillRect(-400, 640, 2800, 600);
  // racks of radio sets with blinking lights
  for (let i = 0; i < 4; i++) {
    const x = 140 + i * 420;
    T.shape(c, "#4b5347", () => c.rect(x, 160, 340, 420));
    for (let k = 0; k < 6; k++) {
      c.fillStyle = (Math.floor(t * 4) + k + i) % 3 ? "#7CFF6B" : "#ff5252";
      c.beginPath();
      c.arc(x + 40 + k * 50, 200, 9, 0, Math.PI * 2);
      c.fill();
    }
    T.shape(c, "#2e332b", () => c.rect(x + 30, 240, 280, 120), 4);
    c.strokeStyle = "#7CFF6B";
    c.lineWidth = 3;
    c.beginPath();
    for (let k = 0; k <= 40; k++) {
      const xx = x + 40 + k * 6.5;
      const yy = 300 + Math.sin(k * 0.8 + t * 8 + i) * 20 * T.rnd(k + Math.floor(t * 6));
      if (k) c.lineTo(xx, yy);
      else c.moveTo(xx, yy);
    }
    c.stroke();
    for (let k = 0; k < 4; k++)
      T.shape(c, "#8a9285", () => c.arc(x + 60 + k * 70, 450, 22, 0, Math.PI * 2), 4);
  }
}

function officerShot(c, t) {
  radioRoom(c, t);
  T.figure(c, T.CAST.officer, {
    x: 960,
    y: 1240,
    s: 1.25,
    t,
    hide: true,
    hands: { r: "ear", l: "front" },
    propR: "receiver",
    head: { mouth: T.talk(START + t, "officer"), brow: -0.7, eye: 1 },
  });
  T.shape(c, "#5d6657", () => c.rect(300, 860, 1320, 260));
  T.vignette(c, 0.3);
}

function draw(c, t) {
  const talk = (w) => T.talk(START + t, w);
  T.runShots(c, t, [
    // A: the door plaque
    [
      0,
      (lt) => {
        T.cam(c, 1 + lt * 0.04, 960, 540);
        c.fillStyle = "#e9e0c9";
        c.fillRect(-200, -200, 2400, 1500);
        T.shape(c, "#7b5634", () => c.rect(560, 40, 800, 1100), 8);
        c.strokeStyle = "rgba(40,20,10,0.4)";
        c.lineWidth = 6;
        c.strokeRect(640, 140, 640, 340);
        c.strokeRect(640, 560, 640, 460);
        T.shape(c, "#e6c35a", () => c.roundRect(700, 230, 520, 170, 16), 6);
        c.font = '62px "Bangers"';
        c.fillStyle = "#3b2a10";
        c.textAlign = "center";
        c.fillText("KAPİTAN", 960, 300);
        c.fillText("EMİRASLAN", 960, 372);
        T.shape(c, "#c9a54f", () => c.arc(1290, 640, 26, 0, Math.PI * 2), 5);
        T.black(c, 1 - T.seg(lt, 0, 0.6));
      },
    ],
    // B: tea at the desk, then the phone rings
    [
      4.5,
      (lt) => {
        T.cam(c, 1.0, 960, 540);
        T.office(c, t);
        const sip = lt < 0.5 || (lt > 1.6 && lt < 2.6);
        const pick = lt > 3.1;
        T.figure(c, E, {
          x: 960,
          y: 1150,
          s: 0.95,
          sit: true,
          t,
          hands: pick ? { r: "ear", l: "front" } : { r: sip ? "mouth" : "chest", l: "front" },
          propR: pick ? "receiver" : "tea",
          head: {
            eye: sip ? 0.15 : 1,
            smile: 0.4,
            glint: T.clamp(1 - Math.abs(lt - 1.2) / 0.3, 0, 1),
            brow: lt > 0.5 && !pick ? -0.2 : 0,
            look: lt > 0.6 && lt < 3.1 ? [-0.8, 0.3] : [0, 0],
          },
        });
        T.desk(c, t, { ring: lt > 0.5 && lt < 3.1, receiverUp: pick, tea: false });
        if (lt > 0.6 && lt < 3.1) T.sweat(c, 1110, 330, 1.2);
      },
    ],
    // C: the duty officer
    [8.4, () => officerShot(c, t)],
    // D: "Yenə?"
    [
      11.5,
      (lt) => {
        T.cam(c, 1.6, 960, 520);
        T.office(c, t);
        T.figure(c, E, {
          x: 960,
          y: 1150,
          s: 0.95,
          sit: true,
          t,
          hands: { r: "ear", l: lt > 1.2 ? "out" : "front" },
          propR: "receiver",
          head: { mouth: talk("emiraslan"), look: lt > 1.4 ? [0.2, -1] : [0, 0], brow: -0.4 },
        });
        T.desk(c, t, { receiverUp: true, tea: false });
      },
    ],
    // E: the duty officer again
    [14.7, () => officerShot(c, t)],
    // F: he finishes his tea in one long gulp, then stands
    [
      17.5,
      (lt) => {
        T.cam(c, 1.15, 960, 560);
        T.office(c, t);
        const gulp = lt > 0.7 && lt < 2.5;
        const rise = T.io(T.seg(lt, 3.3, 3.8));
        T.figure(c, E, {
          x: 960,
          y: T.lerp(1150, 1100, rise),
          s: 0.95,
          sit: rise < 0.5,
          t,
          tilt: gulp ? -0.18 : 0,
          hands: { r: gulp ? "mouth" : lt < 2.9 ? "chest" : "front", l: "front" },
          propR: lt < 2.9 ? "tea" : null,
          head: { eye: gulp ? 0.1 : 1, brow: rise > 0 ? 0.6 : 0 },
        });
        T.desk(c, t, { tea: lt >= 2.9, receiverUp: false });
        T.word(c, "QULP!", 1250, 300, 56, T.seg(lt, 1.0, 2.4), "#ffd23f");
        T.word(c, "TAQ!", 1360, 620, 48, T.seg(lt, 2.9, 3.8), "#e53935");
      },
    ],
    // G: "Yaxşı. Bu dəfə…"
    [
      21.3,
      (lt) => {
        T.cam(c, 1.35, 960, 520);
        T.office(c, t);
        T.figure(c, E, {
          x: 960,
          y: 1100,
          s: 0.95,
          t,
          hands: { l: "hip", r: lt > 2.4 ? "up" : "hip" },
          head: { mouth: talk("emiraslan"), brow: 0.7, smirk: 0.6 },
        });
        T.desk(c, t, { tea: true });
      },
    ],
    // H1: boots stomp
    [
      25.8,
      (lt) => {
        const sh = T.clamp(1 - Math.abs(lt - 0.25) / 0.2, 0, 1) * 18;
        T.cam(c, 1, 960 + (T.rnd(Math.floor(t * 30)) - 0.5) * sh, 540);
        c.fillStyle = "#b9a37a";
        c.fillRect(-200, 700, 2400, 600);
        c.fillStyle = "#e9e0c9";
        c.fillRect(-200, -200, 2400, 900);
        const step = T.seg(lt, 0, 0.25);
        T.figure(c, E, { x: 960, y: 1000 - (1 - step) * 80, s: 3.4, t });
        T.speedLines(c, 960, 960, t, 0.35 * (1 - T.seg(lt, 0.3, 1.2)), 30);
        T.word(c, "TOP!", 1400, 520, 80, T.seg(lt, 0.2, 1.6), "#ffd23f");
      },
    ],
    // H2: pan across the shoulder boards
    [
      29.5,
      (lt) => {
        T.cam(c, 3.0, T.lerp(820, 1100, T.io(lt / 4)), 590);
        T.office(c, t);
        T.figure(c, E, { x: 960, y: 1100, s: 0.95, t, head: { brow: 0.7 } });
        T.glint(
          c,
          T.lerp(820, 1100, T.io(lt / 4)) + 20,
          575,
          40,
          T.clamp(1 - Math.abs(lt - 2) / 0.4, 0, 1),
        );
      },
    ],
    // H3: the glasses glint
    [
      33.5,
      (lt) => {
        T.cam(c, 3.2 + lt * 0.05, 960, 420);
        T.office(c, t);
        T.figure(c, E, {
          x: 960,
          y: 1100,
          s: 0.95,
          t,
          head: { brow: 0.9, smirk: 0.8, glint: T.clamp(1 - Math.abs(lt - 0.8) / 0.5, 0, 1) },
        });
      },
    ],
    // H4: he strides toward us, flag behind
    [
      37.5,
      (lt) => {
        const p = T.io(T.seg(lt, 0, 6.5));
        T.cam(c, 1, 960, 540);
        c.fillStyle = "#0d2238";
        c.fillRect(0, 0, 1920, 1080);
        T.rays(c, 960, 500, t * 0.4, 0.25);
        c.save();
        c.globalAlpha = 0.55;
        T.flag(c, 260, 120, 1400, 700, t, { pole: false, amp: 30 });
        c.restore();
        T.figure(c, E, {
          x: 960,
          y: T.lerp(1000, 1500, p),
          s: T.lerp(0.7, 1.45, p),
          walk: t * 5,
          t,
          head: { brow: 0.8, smirk: 0.7, glint: T.clamp(1 - Math.abs(lt - 4.8) / 0.4, 0, 1) },
        });
        T.black(c, T.seg(lt, 6.8, 7.5));
      },
    ],
  ]);
}
T.scene("s2", "s2-cv", DUR, draw);
