// SCENE 1. A quiet morning in Baku — then the Joker Team arrives.
const GROUND = 1000;
const CAMX = 300; // boulevard camera for the action shots
const S = T.CAST;

// passers-by on the boulevard: world x at t=0, speed, depth (y), seed
const walkers = [
  { x: 200, v: 60, y: 960, i: 1 },
  { x: 900, v: -55, y: 985, i: 2 },
  { x: 1500, v: 50, y: 950, i: 4 },
  { x: 2100, v: -65, y: 1000, i: 5 },
  { x: 2600, v: 45, y: 970, i: 6 },
];

function passersAt(c, t, camX, mode) {
  // mode: "calm" | "freeze" | "run"
  for (const w of walkers) {
    let x;
    if (mode === "calm") x = w.x + w.v * t;
    else x = w.x + w.v * 17;
    let walk = mode === "freeze" ? null : t * 5 + w.i;
    let flip = w.v < 0;
    if (mode === "run") {
      const away = x - camX < 960 ? -1 : 1;
      x += away * (t - 33) * 420;
      flip = away < 0;
      walk = t * 9 + w.i;
    }
    T.figure(c, T.passer(w.i), {
      x: x - camX,
      y: w.y,
      s: 0.42 * (w.y / 1000),
      flip,
      walk,
      run: mode === "run",
      t,
      hands: mode === "run" ? { l: "up", r: "up" } : {},
      head:
        mode === "run"
          ? { mouth: 0.9, brow: -0.8 }
          : mode === "freeze"
            ? { eye: 1, brow: -0.6 }
            : { smile: 0.4 },
    });
    if (mode === "freeze") T.word(c, "!", x - camX + 40, w.y - 470, 40, 0.5, "#e53935", 0);
  }
}

// the coffee drinker at the cafe
function coffeeMan(c, t, camX, greenHair) {
  const sip = Math.sin(t * 1.4) > 0.6;
  const spec = Object.assign({}, T.passer(3));
  spec.head = Object.assign(
    {},
    spec.head,
    greenHair ? { hairColor: "#3ddc4a", hair: "spiky" } : {},
  );
  T.figure(c, spec, {
    x: 760 - camX,
    y: 1010,
    s: 0.44,
    sit: true,
    t,
    hands: { r: sip ? "mouth" : "front" },
    propR: "coffee",
    head: { eye: sip ? 0.1 : 1, brow: greenHair ? -0.9 : 0, mouth: greenHair ? 0.9 : 0 },
  });
}

function gang(c, t, camX, o) {
  const opt = o || {};
  const abs = START + t;
  const appear = (t0) => T.outBack(T.seg(t, t0, t0 + 0.35));
  const pos = {
    green1: [960, GROUND],
    green2: [1180, GROUND + 6],
    green3: [1880, GROUND],
    leader: [1450, GROUND - 50],
    helper: [1660, GROUND - 40],
  };
  const order = ["leader", "helper", "green1", "green2", "green3"];
  for (const k of order) {
    const t0 = { green1: 17.0, green2: 17.35, green3: 17.7, leader: 19.1, helper: 19.25 }[k];
    let a = appear(t0);
    if (opt.all) a = 1;
    if (a <= 0) continue;
    let [x, y] = pos[k];
    let s = (k === "leader" || k === "helper" ? 0.48 : 0.5) * a;
    const lead = k === "leader";
    const laugh = lead && opt.laugh ? Math.sin(t * 22) * 6 : 0;
    const p = {
      x: x - camX + (opt.offset && opt.offset[k] ? opt.offset[k][0] : 0),
      y: y + laugh + (opt.offset && opt.offset[k] ? opt.offset[k][1] : 0),
      s,
      t,
      head: { mouth: T.talk(abs, k), grin: lead ? 0.6 : 0.3 },
      hands: {},
    };
    if (lead) {
      p.hands = opt.leaderHands || { l: "hip", r: "up" };
      p.head.grin = T.talk(abs, k) > 0 ? 0 : 0.8;
    }
    if (k === "helper") {
      p.hands = { r: t > 24.3 ? "front" : "down" };
      if (t > 24.3) p.propR = "gadget";
    }
    if (opt.pose && opt.pose[k]) Object.assign(p, opt.pose[k](t));
    T.figure(c, S[k], p);
  }
  // puffs
  for (const [k, t0] of [
    ["green1", 17.0],
    ["green2", 17.35],
    ["green3", 17.7],
  ]) {
    T.puff(c, pos[k][0] - camX, pos[k][1] - 220, T.seg(t, t0 - 0.05, t0 + 0.9), 1.0);
  }
  T.puff(c, pos.leader[0] - camX + 100, pos.leader[1] - 250, T.seg(t, 19.0, 20.4), 1.6);
}

function draw(c, t) {
  T.runShots(c, t, [
    // A: Baku from the bay
    [
      0,
      (lt) => {
        T.panorama(c, lt * 50, t);
        T.black(c, 1 - T.seg(lt, 0, 0.8));
      },
    ],
    // B: the flag
    [
      5,
      (lt) => {
        T.cam(c, 1 + lt * 0.03, 960, 540);
        T.sky(c, t);
        T.flag(c, 330, 170, 1300, 760, t, { poleH: 1400, amp: 50 });
      },
    ],
    // C: morning on the boulevard
    [
      9,
      (lt) => {
        const camX = lt * 37;
        T.boulevard(c, camX, t, { flagX: 1500, cafeX: 300 });
        T.cafeTable(c, 640 - camX, 1015, t);
        coffeeMan(c, t, camX, false);
        passersAt(c, t, camX, "calm");
      },
    ],
    // D: poof, poof, poof — and the leader
    [
      17,
      (lt) => {
        T.boulevard(c, CAMX, t, { flagX: 1500, cafeX: 300 });
        T.cafeTable(c, 640 - CAMX, 1015, t);
        coffeeMan(c, t, CAMX, false);
        passersAt(c, t, CAMX, "freeze");
        gang(c, t, CAMX, { laugh: lt > 2.5 });
        if (lt > 2.2) T.word(c, "PUF!", 1500, 300, 70, T.seg(lt, 2.1, 3.6), "#3ddc4a");
      },
    ],
    // E1: leader close-up
    [
      21,
      (lt) => {
        T.cam(c, 2.1 + lt * 0.03, 1450 - CAMX + 30, 560);
        T.boulevard(c, CAMX, t, { flagX: 1500, cafeX: 300 });
        gang(c, t, CAMX, {
          all: true,
          laugh: true,
          leaderHands: { l: "hip", r: lt > 1.5 ? "up" : "point" },
        });
      },
    ],
    // E2: the helper with his gadget
    [
      24.4,
      () => {
        T.cam(c, 2.3, 1660 - CAMX, 690);
        T.boulevard(c, CAMX, t, { flagX: 1500, cafeX: 300 });
        gang(c, t, CAMX, { all: true });
      },
    ],
    // E3: the "plan"
    [
      28.1,
      (lt) => {
        T.cam(c, 1.7, 1530 - CAMX, 600);
        T.boulevard(c, CAMX, t, { flagX: 1500, cafeX: 300 });
        gang(c, t, CAMX, {
          all: true,
          leaderHands: { l: lt > 2.6 ? "hair" : "hip", r: lt < 2.6 ? "point" : "hair" },
        });
        if (lt > 3.4) T.word(c, "?!", 1590 - CAMX + 330, 330, 60, T.seg(lt, 3.4, 4.9), "#ffd23f");
      },
    ],
    // F: chaos
    [
      33,
      (lt) => {
        const camX = CAMX + lt * 12;
        T.boulevard(c, camX, t, { flagX: 1500, cafeX: 300 });
        // the umbrella is zapped and flies off
        const fly = T.seg(lt, 0.2, 2.2);
        c.save();
        c.translate(fly * 700, -fly * 900 + fly * fly * 200);
        T.cafeTable(c, 640 - camX, 1015, t, fly * 6);
        c.restore();
        coffeeMan(c, t, camX, lt > 7.1);
        passersAt(c, t, camX, "run");
        gang(c, t, camX, {
          all: true,
          laugh: true,
          offset: {
            green1: [-T.seg(lt, 1, 3) * 200, 0],
            green2: [T.seg(lt, 4, 7) * -500, 0],
            green3: [Math.sin(lt * 3) * 120, 0],
          },
          pose: {
            green1: () => ({
              hands: { r: lt > 2 && lt < 5 ? "point" : "down" },
              propR: "spray",
              walk: lt < 3 ? lt * 7 : null,
            }),
            green2: () => ({
              walk: lt > 4 && lt < 7 ? lt * 9 : null,
              run: true,
              hands: { r: lt > 6.8 ? "up" : "down" },
              propR: lt > 6.8 ? "balloon" : null,
            }),
            green3: () => ({
              walk: lt * 8,
              run: true,
              hands: { l: "up", r: "up" },
              head: { mouth: 0.8 },
            }),
            helper: () => ({ hands: { r: "point" }, propR: "gadget" }),
          },
        });
        // graffiti appears on the railing
        const g = T.seg(lt, 2.4, 4.6);
        if (g > 0) {
          c.save();
          c.font = '90px "Bangers"';
          c.fillStyle = "#3ddc4a";
          c.textAlign = "left";
          c.beginPath();
          c.rect(560 - camX + CAMX - 160, 560, 360 * g, 140);
          c.clip();
          c.fillText("JOKER TEAM", 560 - camX + CAMX - 160, 690);
          c.restore();
        }
        // zap beams from the gadget
        for (const [z0, tx, ty] of [
          [0.2, 640 - camX, 700],
          [7.0, 760 - camX, 780],
        ]) {
          const zp = T.seg(lt, z0, z0 + 0.5);
          if (zp > 0 && zp < 1) {
            c.strokeStyle = "#7CFF6B";
            c.lineWidth = 10;
            c.beginPath();
            const sx = 1660 - camX + 30,
              sy = GROUND - 330;
            c.moveTo(sx, sy);
            for (let i = 1; i <= 8; i++) {
              const p = i / 8;
              c.lineTo(
                T.lerp(sx, tx, p) + (T.rnd(i + Math.floor(t * 20)) - 0.5) * 40,
                T.lerp(sy, ty, p) + (T.rnd(i * 3) - 0.5) * 40,
              );
            }
            c.stroke();
          }
        }
        T.word(c, "VIIUU!", 700 - camX + CAMX, 520, 70, T.seg(lt, 0.3, 1.8), "#3ddc4a");
        T.word(c, "ŞIRRR!", 560, 420, 60, T.seg(lt, 2.4, 4.0), "#ffd23f", 0.1);
        T.word(c, "VIIUU!", 760 - camX + 80, 640, 64, T.seg(lt, 7.1, 8.6), "#3ddc4a");
        T.black(c, T.seg(lt, 14.3, 15));
      },
    ],
  ]);
}
T.scene("s1", "s1-cv", DUR, draw);
