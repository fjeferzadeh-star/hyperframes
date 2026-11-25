// SCENE 6. Victory: the Joker Team runs, the lady says thanks, the driver despairs.
const C = T.CAST;
const G = 1010;

function bg(c, t) {
  T.square(c, 0, t, {
    chaos: true,
    screen: (c2, x, y, w, h) => {
      c2.fillStyle = "#0b0e12";
      c2.fillRect(x, y, w, h);
    },
  });
}

function emiraslan(t) {
  const abs = START + t;
  const p = {
    x: 900,
    y: G,
    s: 0.5,
    t,
    hands: { l: "hip", r: "hip" },
    head: { mouth: T.talk(abs, "emiraslan"), smirk: 0.6, brow: 0.5 },
  };
  if (t < 10.4) p.head.look = [1, 0];
  if (t >= 10.4 && t < 15.5) {
    p.head = { mouth: T.talk(abs, "emiraslan"), look: [-1, 0], blush: 0.6, smile: 0.6 };
  }
  if (t >= 15.5 && t < 20) {
    p.sq = 1.07;
    p.hands = { l: "hip", r: "chest" };
    p.head = {
      mouth: T.talk(abs, "emiraslan"),
      blush: 1,
      brow: 0.6,
      smirk: 0.8,
      look: [-1, 0],
      glint: T.clamp(1 - Math.abs(t - 16) / 0.4, 0, 1),
    };
  }
  if (t >= 20 && t < 35.8) {
    p.head = {
      mouth: T.talk(abs, "emiraslan"),
      look: [-1, -0.2],
      heartEyes: t < 25.3,
      blush: 0.8,
      smile: 0.8,
    };
    p.hands = { l: "chest", r: "chest" };
  }
  if (t >= 31.2 && t < 35.8) p.head.heartEyes = false;
  if (t >= 35.8) {
    const go = T.io(T.seg(t, 38.6, 43));
    p.hands = t < 38.6 ? { l: "collar", r: "collar" } : {};
    p.x = T.lerp(900, -300, go);
    p.walk = go > 0 && go < 1 ? t * 6 : null;
    p.flip = go > 0;
    p.head = {
      mouth: T.talk(abs, "emiraslan"),
      smirk: 1,
      brow: 0.6,
      glint: T.clamp(1 - Math.abs(t - 37.6) / 0.4, 0, 1),
    };
  }
  return p;
}

function gang(c, t) {
  const abs = START + t;
  const run = (t0) => Math.pow(T.seg(t, t0, t0 + 3), 1.4) * 1400;
  const list = [
    ["green1", 1080, 0.0],
    ["green3", 1730, 0.2],
    ["green2", 1600, 0.4],
    ["helper", 1490, 0.1],
  ];
  for (const [k, x, d] of list) {
    T.figure(c, C[k], {
      x: x + run(d),
      y: G - (k === "helper" ? 30 : 0),
      s: k === "helper" ? 0.46 : 0.5,
      t,
      walk: t * 10,
      run: true,
      hands: { l: "up", r: "up" },
      head: { mouth: 0.9, brow: -0.9 },
    });
  }
  // the leader stops to shout, then follows
  const lx =
    t < 2
      ? 1300 + T.seg(t, 0, 2) * 300
      : t < 6.6
        ? 1600
        : 1600 + Math.pow(T.seg(t, 6.6, 9), 1.4) * 900;
  if (lx < 2400)
    T.figure(c, C.leader, {
      x: lx,
      y: G - 40,
      s: 0.48,
      t,
      flip: t > 2 && t < 6.6,
      walk: t < 2 || t > 6.6 ? t * 10 : null,
      run: true,
      hands: t > 2 && t < 6.6 ? { l: "hip", r: "up" } : { l: "up", r: "up" },
      head: { mouth: T.talk(abs, "leader") || 0.3, brow: -0.8 },
    });
}

function lady(c, t) {
  if (t < 10.4 || t > 26) return;
  const inX = T.lerp(-150, 560, T.io(T.seg(t, 10.4, 12.0)));
  const outX = T.lerp(560, -300, T.io(T.seg(t, 20.5, 25)));
  const x = t < 20.5 ? inX : outX;
  const walking = (t > 10.4 && t < 12) || (t > 20.5 && t < 25);
  T.figure(c, C.lady, {
    x,
    y: G - 6,
    s: 0.48,
    t,
    flip: t > 20.5,
    walk: walking ? t * 5 : null,
    hands: t > 20.5 ? { r: "wave", l: "hip" } : { l: "chest", r: "hip" },
    head: { mouth: T.talk(START + t, "lady"), smile: 1, blush: 0.6 },
  });
}

function driver(c, t) {
  if (t < 24) return;
  const x = T.lerp(2100, 1240, T.io(T.seg(t, 24, 25.6)));
  const facepalm = t > 38.6;
  T.figure(c, C.driver, {
    x,
    y: G,
    s: 0.5,
    t,
    flip: true,
    walk: t < 25.6 ? t * 6 : null,
    hands: facepalm
      ? { l: "face", r: "hip" }
      : t > 31.2 && t < 35.8
        ? { l: "up", r: "up" }
        : { l: "down", r: "down" },
    head: {
      mouth: T.talk(START + t, "driver"),
      brow: t > 31.2 ? -0.9 : 0,
      eye: facepalm ? 0.1 : 1,
    },
  });
}

function scene(c, t, z, fx, fy) {
  T.cam(c, z || 1, fx || 960, fy || 540);
  bg(c, t);
  gang(c, t);
  lady(c, t);
  driver(c, t);
  T.figure(c, C.emiraslan, emiraslan(t));
  c.setTransform(1, 0, 0, 1, 0, 0);
  T.confetti(c, t + 7, 200, 1 - T.seg(t, 0, 10));
}

function draw(c, t) {
  T.runShots(c, t, [
    [0, () => scene(c, t)],
    [2.9, () => scene(c, t, 2.2, 1600, 600)],
    [6.6, () => scene(c, t, 2.2, 910, 620)],
    [10.4, () => scene(c, t, 1.5, 760, 620)],
    [15.5, () => scene(c, t, 2.0, 760, 610)],
    [
      20,
      () => {
        scene(c, t, 1.3, 700, 600);
        c.setTransform(1, 0, 0, 1, 0, 0);
      },
    ],
    [25.3, () => scene(c, t, 1.6, 1070, 610)],
    [27.8, () => scene(c, t, 2.3, 900, 590)],
    [31.2, () => scene(c, t, 2.3, 1240, 590)],
    [
      35.8,
      (lt) => {
        scene(c, t, 1.25, 900, 600);
        T.black(c, T.seg(lt, 7.5, 8.2));
      },
    ],
  ]);
}
T.scene("s6", "s6-cv", DUR, draw);
