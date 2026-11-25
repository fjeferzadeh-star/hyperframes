// SCENE 4. The square: the confrontation, a comic fight, and the lady.
const C = T.CAST;
const G = 1010; // ground line

function chaosBg(c, t) {
  T.square(c, 0, t, { chaos: true, screen: (c2, x, y, w, h) => screenOff(c2, x, y, w, h, t) });
}
function screenOff(c, x, y, w, h, t) {
  c.fillStyle = "#16202b";
  c.fillRect(x, y, w, h);
  c.font = '90px "Bangers"';
  c.fillStyle = "#3ddc4a";
  c.textAlign = "center";
  c.fillText("JOKER TEAM TV", x + w / 2, y + h / 2 + 30 + Math.sin(t * 3) * 6);
}

// where everyone is, as a function of scene time
function emiraslanPose(t) {
  const abs = START + t;
  const p = {
    x: 430,
    y: G,
    s: 0.5,
    t,
    head: { mouth: T.talk(abs, "emiraslan"), brow: 0.6 },
    hands: { l: "hip", r: "hip" },
  };
  if (t < 4.5) {
    p.x = T.lerp(-200, 430, T.seg(t, 0, 4.2));
    p.walk = t * 5.5;
    p.hands = {};
  }
  if (t >= 9.3 && t < 12.9) p.hands = { l: "hip", r: "point" };
  if (t >= 18.4 && t < 36.3) {
    // fight beats
    p.hands = { l: "guard", r: "guard" };
    if (t > 19.6 && t < 20.4) p.hands = { l: "guard", r: "punch" };
    if (t > 19.2 && t < 19.6) p.lean = -0.25;
    if (t > 24.0 && t < 24.6) p.lean = 0.2;
    if (t > 26.8 && t < 29.6) {
      p.hands = { l: "out", r: "out" };
      p.x += Math.sin(t * 10) * 10;
    }
    if (t > 31.5) p.hands = { l: "hip", r: "hip" };
    p.head = { mouth: 0, brow: 0.9, smirk: t > 31.5 ? 0.8 : 0 };
  }
  if (t >= 36.3) {
    p.flip = true;
    p.hands = t > 39.6 ? { l: "chest", r: "hip" } : { l: "hip", r: "hip" };
    p.head = {
      mouth: T.talk(abs, "emiraslan"),
      blush: t > 39.6 ? 0.9 : 0,
      smirk: 0.6,
      glint: T.clamp(1 - Math.abs(t - 40) / 0.4, 0, 1),
    };
    p.sq = t > 39.6 && t < 39.9 ? 1.06 : 1;
  }
  return p;
}

function gang(c, t) {
  const abs = START + t;
  const laugh = (k) => (t < 9.3 || (t > 12.9 && t < 15.3) ? Math.sin(t * 24 + k) * 5 : 0);
  // leader + helper
  const shocked = t > 21 && t < 36.3;
  T.figure(c, C.leader, {
    x: 1300,
    y: G - 40 + laugh(1),
    s: 0.48,
    t,
    hands:
      t > 45.7
        ? { l: "rub", r: "rub" }
        : shocked
          ? { l: "up", r: "up" }
          : { l: "hip", r: t < 9.3 ? "point" : "hip" },
    head: {
      mouth: T.talk(abs, "leader") || (shocked ? 0.8 : 0),
      grin: T.talk(abs, "leader") ? 0 : shocked ? 0 : 0.8,
    },
  });
  // the helper sneaks up behind the captain at the end
  const sneak = T.io(T.seg(t, 41.5, 44.5));
  T.figure(c, C.helper, {
    x: T.lerp(1490, 640, sneak),
    y: G - 30,
    s: 0.46,
    t,
    walk: sneak > 0 && sneak < 1 ? t * 4 : null,
    hands: { r: t > 41.5 ? "up" : "front", l: shocked ? "up" : "down" },
    propR: "gadget",
    head: {
      mouth: T.talk(abs, "helper") || (shocked ? 0.7 : 0),
      look: t > 41.5 ? [-1, 0] : [0, 0],
    },
  });
  // green1: charges, gets chopped, cap flies, falls
  const g1run = T.seg(t, 18.6, 19.6);
  const g1fall = T.io(T.seg(t, 20.0, 20.8));
  const g1x = t < 18.4 ? 1080 : T.lerp(1080, 600, g1run) + g1fall * 120;
  const spec1 = Object.assign({}, C.green1, {
    head: Object.assign({}, C.green1.head, { cap: t > 20.0 ? null : "baseball" }),
  });
  T.figure(c, spec1, {
    x: g1x,
    y: G + g1fall * 10,
    s: 0.5,
    t,
    lean: g1fall * 1.5,
    walk: g1run > 0 && g1run < 1 ? t * 10 : null,
    run: true,
    hands: g1run > 0 && g1fall === 0 ? { l: "punch", r: "up" } : { l: "down", r: "down" },
    head: { mouth: t < 9.3 ? 0.6 : g1fall > 0 ? 0.9 : 0, eye: g1fall > 0.5 ? 0.1 : 1 },
  });
  if (t > 20.0) {
    const p = T.seg(t, 20.0, 21.4);
    if (p < 1) {
      c.save();
      c.translate(g1x + p * 700, G - 400 - Math.sin(p * Math.PI) * 300 + p * 200);
      c.rotate(p * 9);
      T.shape(c, "#d32f2f", () => c.ellipse(0, 0, 80, 40, 0, 0, Math.PI * 2));
      T.shape(c, "#d32f2f", () => c.ellipse(70, 16, 60, 14, 0, 0, Math.PI * 2));
      c.restore();
    }
  }
  if (g1fall > 0.9 && t < 36.3) T.dizzy(c, g1x + 220, G - 60, t);
  // green2: runs, trips over his own foot, falls flat
  const g2run = T.seg(t, 23.0, 24.6);
  const g2fall = T.io(T.seg(t, 24.6, 25.4));
  const g2x = t < 23 ? 1700 : T.lerp(1700, 1000, g2run) - g2fall * 160;
  T.figure(c, C.green2, {
    x: g2x,
    y: G + g2fall * 6,
    s: 0.5,
    t,
    lean: -g2fall * 1.55,
    walk: g2run > 0 && g2run < 1 ? t * 11 : null,
    run: true,
    kick: g2fall > 0 ? [1, 0.6] : null,
    hands: g2fall > 0 ? { l: "up", r: "up" } : { l: "guard", r: "guard" },
    head: { mouth: t < 9.3 ? 0.6 : g2fall > 0 ? 1 : 0, brow: g2fall > 0 ? -1 : 0.5 },
  });
  // green3: charges, gets spun around, sits down dizzy
  const g3run = T.seg(t, 26.0, 26.8);
  const spin = T.seg(t, 26.8, 29.6);
  const g3x = t < 26 ? 860 : spin > 0 ? 430 + Math.cos(spin * 18) * 170 : T.lerp(860, 560, g3run);
  const g3 = spin >= 1 ? 760 : g3x;
  T.figure(c, C.green3, {
    x: g3,
    y: G + (spin >= 1 ? 40 : 0),
    s: 0.5,
    t,
    sit: t > 31,
    flip: spin > 0 && spin < 1 && Math.cos(spin * 18) < 0,
    walk: g3run > 0 && g3run < 1 ? t * 10 : null,
    run: true,
    lean: spin > 0 && spin < 1 ? 0.3 : 0,
    hands: spin > 0 && spin < 1 ? { l: "up", r: "up" } : { l: "guard", r: "guard" },
    head: { mouth: t < 9.3 ? 0.6 : spin > 0 ? 0.9 : 0, eye: spin >= 1 ? 0.1 : 1 },
  });
  if (spin >= 1 && t < 36.3) T.dizzy(c, g3, G - 470, t);
}

function lady(c, t, s) {
  T.figure(c, C.lady, {
    x: 150,
    y: G - 10,
    s: s || 0.48,
    t,
    hands: { l: "hip", r: t < 39.6 ? "wave" : "chest" },
    head: { mouth: T.talk(START + t, "lady"), smile: 1, blush: 0.6 },
  });
}

function wide(c, t, z, fx, fy) {
  T.cam(c, z || 1, fx || 960, fy || 540);
  chaosBg(c, t);
  if (t >= 36.3) lady(c, t);
  gang(c, t);
  T.figure(c, C.emiraslan, emiraslanPose(t));
}

function draw(c, t) {
  T.runShots(c, t, [
    [
      0,
      (lt) => {
        wide(c, t);
        T.black(c, 1 - T.seg(lt, 0, 0.5));
      },
    ],
    [5, () => wide(c, t, 2.0, 1320, 620)],
    [9.3, () => wide(c, t, 2.0, 470, 640)],
    [12.9, () => wide(c, t, 2.0, 1320, 620)],
    [
      15.3,
      (lt) => {
        const p = emiraslanPose(t);
        p.head.glint = T.clamp(1 - Math.abs(lt - 2.6) / 0.4, 0, 1);
        p.head.smirk = 0.6;
        T.cam(c, 2.6, 440, 560);
        chaosBg(c, t);
        gang(c, t);
        T.figure(c, C.emiraslan, p);
      },
    ],
    // the fight, wide with a little camera follow
    [
      18.4,
      () => {
        const fx = t < 21.5 ? 760 : t < 26 ? 900 : t < 31.5 ? 600 : 860;
        wide(c, t, 1.25, fx, 600);
        T.word(c, "BAM!", 540, 360, 80, T.seg(t, 20.0, 21.4), "#e53935");
        T.word(c, "ŞAPP!", 900, 420, 80, T.seg(t, 25.2, 26.6), "#ffd23f", 0.15);
        T.word(c, "VJUUH!", 520, 300, 72, T.seg(t, 27.0, 28.6), "#2f7bff");
        T.word(c, "PUF!", 860, 760, 60, T.seg(t, 31.0, 32.2), "#ffd23f");
        if (t > 19.5 && t < 20.3) T.speedLines(c, 960, 540, t, 0.4, 40);
      },
    ],
    // the lady calls out
    [
      36.3,
      () => {
        T.cam(c, 2.2, 260, 650);
        chaosBg(c, t);
        lady(c, t);
        T.hearts(c, 200, 360, t, 0.9, 5);
      },
    ],
    // he stops dead and turns: "Xanım, bu mənim vəzifə borcumdur!"
    [
      39.6,
      () => {
        wide(c, t, 1.8, 460, 640);
        T.hearts(c, 470, 340, t, 0.7, 4);
      },
    ],
    // the helper sneaks up behind
    [
      41.5,
      () => {
        wide(c, t, 1.25, 760, 620);
        if (t > 43.3) T.word(c, "?", 640, 330, 40, T.seg(t, 43.3, 45.6), "#ffd23f", 0);
      },
    ],
    // "Yox! Gözlə! … zəif nöqtəsini tapdıq!"
    [
      45.7,
      (lt) => {
        T.cam(c, 2.6 + lt * 0.08, 1320, 560);
        chaosBg(c, t);
        gang(c, t);
        T.glint(c, 1290, 520, 50, T.clamp(1 - Math.abs(lt - 4.6) / 0.4, 0, 1));
        T.black(c, T.seg(lt, 5.6, 6.3));
      },
    ],
  ]);
}
T.scene("s4", "s4-cv", DUR, draw);
