// SCENE 7. Back at HQ: tea again, and the phone again.
const E = T.CAST.emiraslan;

function radioRoom(c, t) {
  c.fillStyle = "#cfd8c4";
  c.fillRect(-400, -400, 2800, 1900);
  for (let i = 0; i < 4; i++) {
    const x = 140 + i * 420;
    T.shape(c, "#4b5347", () => c.rect(x, 160, 340, 420));
    for (let k = 0; k < 6; k++) {
      c.fillStyle = (Math.floor(t * 6) + k + i) % 2 ? "#ff5252" : "#7CFF6B";
      c.beginPath();
      c.arc(x + 40 + k * 50, 200, 9, 0, Math.PI * 2);
      c.fill();
    }
  }
}

function draw(c, t) {
  const abs = START + t;
  T.runShots(c, t, [
    // A: feet up, glasses off, tea
    [
      0,
      (lt) => {
        T.cam(c, 1.1, 960, 560);
        T.office(c, t);
        const sip = lt > 2 && lt < 3.2;
        T.figure(c, E, {
          x: 960,
          y: 1160,
          s: 0.95,
          sit: true,
          lean: -0.06,
          t,
          hands: { r: sip ? "mouth" : "chest", l: "front" },
          propR: "tea",
          head: { glasses: false, eye: 0.15, smile: 1 },
        });
        T.desk(c, t, { tea: false, steam: true });
        T.black(c, 1 - T.seg(lt, 0, 0.5));
      },
    ],
    // B: the phone rings
    [
      5.5,
      (lt) => {
        T.cam(c, 1.1, 960, 560);
        T.office(c, t);
        T.figure(c, E, {
          x: 960,
          y: 1160,
          s: 0.95,
          sit: true,
          t,
          hands: { r: lt > 1.1 ? "ear" : "chest", l: "front" },
          propR: lt > 1.1 ? "receiver" : "tea",
          head: { glasses: false, eye: 1, brow: -0.6, look: [-0.8, 0.3] },
        });
        T.desk(c, t, { ring: lt < 1.1, receiverUp: lt > 1.1, tea: false });
      },
    ],
    // C: the duty officer
    [
      7,
      () => {
        radioRoom(c, t);
        T.figure(c, T.CAST.officer, {
          x: 960,
          y: 1240,
          s: 1.25,
          t,
          hide: true,
          hands: { r: "ear", l: "out" },
          propR: "receiver",
          head: { mouth: T.talk(abs, "officer"), brow: -0.9 },
        });
        T.shape(c, "#5d6657", () => c.rect(300, 860, 1320, 260));
        T.sweat(c, 1130, 330, 1.4);
      },
    ],
    // D: glasses on. "Yaxşı… Görünür, çay yenə soyuyacaq."
    [
      10.5,
      (lt) => {
        T.cam(c, 1.7, 960, 480);
        T.office(c, t);
        T.figure(c, E, {
          x: 960,
          y: 1160,
          s: 0.95,
          sit: true,
          t,
          hands: { r: lt < 1 ? "glasses" : "front", l: "front" },
          head: {
            glasses: lt > 0.5,
            mouth: T.talk(abs, "emiraslan"),
            brow: 0.4,
            look: [0.8, 0.4],
            glint: T.clamp(1 - Math.abs(lt - 0.8) / 0.3, 0, 1),
          },
        });
        T.desk(c, t, { tea: true, steam: false });
      },
    ],
    // E: push in on the serious face, the flag behind
    [
      14.6,
      (lt) => {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.fillStyle = "#0d2238";
        c.fillRect(0, 0, 1920, 1080);
        T.flag(c, 160, 120, 1600, 800, t, { pole: false, amp: 34 });
        T.cam(c, T.lerp(1.6, 2.3, T.io(T.seg(lt, 0, 6.5))), 960, 420);
        T.figure(c, E, {
          x: 960,
          y: 1100,
          s: 0.95,
          t,
          head: { brow: 0.9, smirk: 0.4, glint: T.clamp(1 - Math.abs(lt - 4.5) / 0.4, 0, 1) },
        });
        T.black(c, T.seg(lt, 6.8, 7.4));
      },
    ],
  ]);
}
T.scene("s7", "s7-cv", DUR, draw);
