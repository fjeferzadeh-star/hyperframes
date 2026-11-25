// SCENE 3. In the service car: a beautiful lady, a mirror, a radio call.
const E = T.CAST.emiraslan,
  D = T.CAST.driver,
  L = T.CAST.lady;

// street position: the car keeps rolling the whole scene
const roll = (t) => (t < 44 ? t * 300 : 44 * 300 + (t - 44) * 300 + Math.pow(t - 44, 2) * 260);

function riders(c, t) {
  c.save();
  c.translate(-40, -230);
  c.scale(0.16, 0.16);
  T.toonHead(c, D.head, { t });
  c.restore();
  c.save();
  c.translate(110, -232);
  c.scale(0.15, 0.15);
  T.headEmiraslan(c, { t, brow: 0.4 });
  c.restore();
}

function interior(c, t, o) {
  const opt = o || {};
  const camX = roll(t) * (opt.slow ? 0.3 : 1);
  T.street(c, camX, t);
  // the car's cabin
  c.fillStyle = "#23272c";
  c.fillRect(-300, -300, 2600, 360);
  c.beginPath();
  c.moveTo(-300, 60);
  c.quadraticCurveTo(960, 140, 2300, 60);
  c.lineTo(2300, -300);
  c.lineTo(-300, -300);
  c.fill();
  c.fillRect(-300, -300, 330, 1700);
  c.fillRect(1890, -300, 330, 1700);
  // seats
  for (const x of [600, 1320]) {
    T.shape(c, "#3b3f45", () => c.roundRect(x - 230, 380, 460, 800, 60));
    T.shape(c, "#4a4f56", () => c.roundRect(x - 110, 250, 220, 140, 40));
  }
}

function dashboard(c, t) {
  T.shape(c, "#2b2f35", () => {
    c.moveTo(-300, 900);
    c.quadraticCurveTo(960, 820, 2300, 900);
    c.lineTo(2300, 1400);
    c.lineTo(-300, 1400);
    c.closePath();
  });
  // steering wheel in front of the driver
  c.strokeStyle = T.INK;
  c.lineWidth = 46;
  c.beginPath();
  c.ellipse(600, 900, 210, 90, 0, Math.PI, Math.PI * 2);
  c.stroke();
  c.strokeStyle = "#3d424a";
  c.lineWidth = 32;
  c.stroke();
  // radio with a light
  T.shape(c, "#1d2024", () => c.roundRect(880, 900, 180, 70, 10), 4);
  c.fillStyle = Math.floor(t * 4) % 2 ? "#7CFF6B" : "#2f6b2a";
  c.beginPath();
  c.arc(910, 935, 10, 0, Math.PI * 2);
  c.fill();
}

function twoShot(c, t, o) {
  const opt = o || {};
  interior(c, t, opt);
  T.figure(c, D, {
    x: 600,
    y: 1260,
    s: 0.95,
    hide: true,
    t,
    tilt: opt.driverTurn ? 0.1 : 0,
    hands: { l: [-150, -420], r: [150, -420] },
    head: {
      mouth: T.talk(START + t, "driver"),
      look: opt.driverTurn ? [1, 0] : [0.2, 0],
      brow: opt.driverTurn ? -0.6 : 0,
      eye: opt.driverTurn ? 1.2 : 1,
    },
  });
  T.figure(c, E, {
    x: 1320,
    y: 1260,
    s: 0.95,
    hide: true,
    t,
    hands: opt.eHands || { l: "front", r: "front" },
    head: Object.assign({ mouth: T.talk(START + t, "emiraslan") }, opt.eHead || {}),
  });
  dashboard(c, t);
}

function ladyOutside(c, t, o) {
  const opt = o || {};
  T.street(c, roll(t) * 0.25, t);
  T.figure(c, L, {
    x: opt.x || 900,
    y: 760,
    s: opt.s || 0.6,
    walk: opt.still ? null : t * 2.4,
    t,
    hands: { l: "hip" },
    head: Object.assign({ smile: 0.6 }, opt.head || {}),
  });
}

function windowFrame(c) {
  c.fillStyle = "#23272c";
  c.beginPath();
  c.rect(-300, -300, 2600, 1700);
  c.roundRect(180, 140, 1560, 760, 80);
  c.fill("evenodd");
  c.strokeStyle = "#0f1114";
  c.lineWidth = 10;
  c.beginPath();
  c.roundRect(180, 140, 1560, 760, 80);
  c.stroke();
  c.fillStyle = "rgba(255,255,255,0.08)";
  c.beginPath();
  c.moveTo(300, 140);
  c.lineTo(520, 140);
  c.lineTo(260, 900);
  c.lineTo(180, 900);
  c.closePath();
  c.fill();
}

function draw(c, t) {
  T.runShots(c, t, [
    // A: the car on a Baku street
    [
      0,
      (lt) => {
        T.street(c, roll(t), t);
        T.car(c, 960, 900, 1.15, t, { riders });
        T.black(c, 1 - T.seg(lt, 0, 0.6));
      },
    ],
    // B: inside, both serious
    [6, () => twoShot(c, t, { eHead: { brow: 0.6 } })],
    // C: she walks by (slow motion, through the window)
    [
      10.2,
      (lt) => {
        T.cam(c, 1.05 + lt * 0.02, 960, 540);
        ladyOutside(c, t, { x: 700 + lt * 70, s: 0.75 });
        T.hearts(c, 1000, 400, t, 0.8, 5);
        for (let i = 0; i < 6; i++)
          T.glint(
            c,
            600 + T.rnd(i) * 800,
            250 + T.rnd(i * 3) * 400,
            26,
            Math.abs(Math.sin(t * 3 + i)),
          );
        windowFrame(c);
      },
    ],
    // D: "Dayan… Bu nə gözəllikdir belə?"
    [
      13.4,
      () => {
        T.cam(c, 2.0, 1320, 560);
        twoShot(c, t, { slow: true, eHead: { heartEyes: true, blush: 1, grin: 0.4 } });
        T.hearts(c, 1320, 420, t, 1, 6);
      },
    ],
    // E: the driver turns
    [17.1, () => twoShot(c, t, { driverTurn: true, eHead: { heartEyes: true, blush: 0.7 } })],
    // F: "Hə, hə… Joker Team. Amma sən bir dəqiqə gözlə."
    [
      19.5,
      () => {
        T.cam(c, 1.3, 1100, 560);
        twoShot(c, t, {
          driverTurn: true,
          eHands: { l: "point", r: "front" },
          eHead: { brow: 0.3, look: [-1, 0] },
        });
      },
    ],
    // G: the visor mirror: hair, collar, glint
    [
      23.5,
      (lt) => {
        c.fillStyle = "#23272c";
        c.fillRect(0, 0, 1920, 1080);
        c.save();
        c.beginPath();
        c.ellipse(960, 540, 640, 400, 0, 0, Math.PI * 2);
        c.clip();
        c.fillStyle = "#3b3f45";
        c.fillRect(0, 0, 1920, 1080);
        const step = lt < 2 ? "hair" : lt < 3.5 ? "collar" : "pose";
        T.figure(c, E, {
          x: 960,
          y: 1520,
          s: 1.45,
          hide: true,
          t,
          hands:
            step === "hair"
              ? { r: "hair", l: "front" }
              : step === "collar"
                ? { l: "collar", r: "collar" }
                : { r: "glasses", l: "front" },
          head: {
            smirk: 1,
            brow: step === "pose" ? 0.6 : 0.2,
            grin: step === "pose" ? 0.6 : 0,
            glint: T.clamp(1 - Math.abs(lt - 3.8) / 0.4, 0, 1),
          },
        });
        c.restore();
        c.strokeStyle = "#111";
        c.lineWidth = 30;
        c.beginPath();
        c.ellipse(960, 540, 640, 400, 0, 0, Math.PI * 2);
        c.stroke();
        c.strokeStyle = "rgba(255,255,255,0.15)";
        c.lineWidth = 16;
        c.beginPath();
        c.ellipse(960, 540, 600, 360, 0, Math.PI * 1.1, Math.PI * 1.35);
        c.stroke();
        T.word(c, "ŞIQ!", 1500, 300, 60, T.seg(lt, 3.6, 5.2), "#ffd23f");
      },
    ],
    // H: she smiles and winks
    [
      29,
      (lt) => {
        T.cam(c, 2.4, 900, 340);
        ladyOutside(c, t, {
          still: true,
          head: { smile: 1, eye: lt > 1.4 && lt < 2.0 ? 0.1 : 1, blush: 0.8 },
        });
        T.hearts(c, 990, 260, t, 0.9, 4);
        c.setTransform(1, 0, 0, 1, 0, 0);
        windowFrame(c);
      },
    ],
    // I: to himself
    [
      32.4,
      (lt) => {
        T.cam(c, 2.1, 1320, 520);
        twoShot(c, t, {
          eHands: { l: "front", r: lt > 1.8 ? "face" : "front" },
          eHead: { eye: lt < 1.8 ? 0.1 : 1, brow: -0.6, blush: 0.6 },
        });
        T.sweat(c, 1460, 330, 1.6);
      },
    ],
    // J: the radio crackles
    [
      37,
      (lt) => {
        T.cam(c, 2.2, 1000, 860);
        twoShot(c, t, { eHead: { look: [-0.6, 0.6] } });
        T.word(c, "KRRR!", 1000, 860, 40, T.seg(lt, 0, 1.2), "#7CFF6B");
      },
    ],
    // K: "Yaxşı, romantikanı sonra davam etdirərik!"
    [
      40.7,
      (lt) => {
        T.cam(c, 1.3, 1100, 560);
        twoShot(c, t, {
          eHands: { l: "front", r: lt > 2.2 ? "guard" : "front" },
          eHead: { brow: 0.8, smirk: 0.5 },
        });
      },
    ],
    // L: siren on, off they go
    [
      44,
      (lt) => {
        T.street(c, roll(t), t);
        const x = 960 + Math.pow(T.seg(lt, 1.5, 6), 2) * 1500;
        T.car(c, x, 900, 1.15, t * 1.8, { siren: true, riders });
        T.puff(c, x - 420, 840, T.seg(lt, 1.4, 2.6), 0.9, "#cfc8b8");
        T.word(c, "VIIIUU!", 1300, 320, 80, T.seg(lt, 0.2, 2.2), "#2f7bff");
        T.black(c, T.seg(lt, 7.3, 8));
      },
    ],
  ]);
}
T.scene("s3", "s3-cv", DUR, draw);
