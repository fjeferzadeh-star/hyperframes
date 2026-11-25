// SCENE 5. The trick: a megaphone, a giant screen of beauties, and the captain's power.
const C = T.CAST;
const G = 1010;

const faces = [
  {
    skin: "#e8b796",
    w: 124,
    hair: "long",
    hairColor: "#2a1712",
    lashes: true,
    lipstick: "#c2185b",
    earrings: true,
  },
  {
    skin: "#f0c4a4",
    w: 120,
    hair: "long",
    hairColor: "#b5651d",
    lashes: true,
    lipstick: "#d81b60",
  },
  {
    skin: "#d9a07a",
    w: 126,
    hair: "long",
    hairColor: "#111",
    lashes: true,
    lipstick: "#ad1457",
    earrings: true,
  },
];

function screen(c, x, y, w, h, t) {
  if (t < 8) {
    c.fillStyle = "#16202b";
    c.fillRect(x, y, w, h);
    return;
  }
  if (t < 8.6 || (t > 35 && t < 35.9)) {
    // static
    for (let i = 0; i < 400; i++) {
      c.fillStyle = T.rnd(i + Math.floor(t * 30) * 13) > 0.5 ? "#ddd" : "#333";
      c.fillRect(
        x + T.rnd(i * 3 + Math.floor(t * 30)) * w,
        y + T.rnd(i * 7 + Math.floor(t * 30)) * h,
        30,
        8,
      );
    }
    return;
  }
  if (t >= 35.9) {
    c.fillStyle = "#0b0e12";
    c.fillRect(x, y, w, h);
    if (t < 37.5) {
      c.font = '120px "Bangers"';
      c.fillStyle = "#e53935";
      c.textAlign = "center";
      c.fillText("XƏTA!", x + w / 2, y + h / 2 + 40);
    }
    return;
  }
  // slideshow of portraits in heart frames
  const g = c.createLinearGradient(x, y, x, y + h);
  g.addColorStop(0, "#ff7aa0");
  g.addColorStop(1, "#ffb3c8");
  c.fillStyle = g;
  c.fillRect(x, y, w, h);
  for (let i = 0; i < 14; i++)
    T.heart(
      c,
      x + T.rnd(i) * w,
      y + ((T.rnd(i * 3) * h + t * 40) % h),
      1.4,
      "rgba(255,255,255,0.5)",
    );
  const k = Math.floor((t - 8.6) / 1.4) % 3;
  c.save();
  c.translate(x + w / 2, y + h / 2 + 10);
  c.scale(0.55, 0.55);
  T.heart(c, 0, 20, 17, "#ffffff");
  c.restore();
  c.save();
  c.translate(x + w / 2, y + h / 2 - 10);
  c.scale(0.42, 0.42);
  T.toonHead(c, faces[k], { t, smile: 1, eye: Math.floor(t * 2) % 5 === 0 ? 0.1 : 1, blush: 0.6 });
  c.restore();
  c.font = '44px "Bangers"';
  c.fillStyle = "#fff";
  c.strokeStyle = T.INK;
  c.lineWidth = 6;
  c.textAlign = "center";
  c.strokeText("SƏNİ GÖZLƏYİRİK, KAPİTAN!", x + w / 2, y + h - 22);
  c.fillText("SƏNİ GÖZLƏYİRİK, KAPİTAN!", x + w / 2, y + h - 22);
}

function emiraslan(t) {
  const abs = START + t;
  const p = {
    x: 430,
    y: G,
    s: 0.5,
    t,
    hands: { l: "hip", r: "hip" },
    head: { mouth: T.talk(abs, "emiraslan"), brow: 0.6, look: [0.5, -0.6] },
  };
  if (t >= 8.6 && t < 19.8) {
    p.head = { heartEyes: true, mouth: T.talk(abs, "emiraslan") || 0.7, blush: 1 };
    p.hands = { l: "down", r: "down" };
  }
  if (t >= 19.8 && t < 23.2) {
    p.sq = 1 + Math.sin(T.seg(t, 19.8, 21.0) * Math.PI) * 0.06;
    p.hands = t > 20.9 ? { l: "hip", r: "glasses" } : { l: "out", r: "out" };
    p.head = {
      eye: t < 20.9 ? 0.1 : 1,
      brow: 0.6,
      glint: T.clamp(1 - Math.abs(t - 21.6) / 0.4, 0, 1),
    };
  }
  if (t >= 23.2 && t < 27.4) p.hands = { l: "hip", r: "up" };
  if (t >= 27.4) {
    p.hands = t < 35 ? { l: "up", r: "up" } : { l: "hip", r: "hip" };
    p.head = { brow: 0.9, mouth: t > 28 && t < 34 ? 0.8 : 0, smirk: t > 35 ? 0.9 : 0 };
  }
  return p;
}

function gang(c, t) {
  const abs = START + t;
  const wind = T.clamp(T.seg(t, 28.5, 30.6) * (1 - T.seg(t, 34, 35)), 0, 1);
  const lean = wind * 0.35 + (wind > 0 ? Math.sin(t * 30) * 0.03 : 0);
  const conf = t > 36;
  const list = [
    ["green1", 1080, G, 0.5],
    ["green3", 1730, G, 0.5],
    ["green2", 1600, G + 4, 0.5],
    ["leader", 1300, G - 40, 0.48],
    ["helper", 1490, G - 30, 0.46],
  ];
  for (const [k, x, y, s] of list) {
    const p = { x, y, s, t, lean, head: { mouth: T.talk(abs, k), grin: 0.5 }, hands: {} };
    if (k === "leader") {
      const mega = t > 1.2 && t < 27.4;
      p.hands = mega ? { r: "mouth", l: "hip" } : { l: "up", r: "up" };
      if (mega) p.propR = "megaphone";
      p.head.grin = T.talk(abs, k) ? 0 : wind > 0 ? 0 : 0.9;
      if (wind > 0 || conf) p.head.mouth = 0.9;
    }
    if (k === "helper") {
      p.hands = { r: t < 1.2 ? "point" : "front", l: "down" };
      if (t < 35.2) p.propR = t < 1.2 ? "megaphone" : "gadget";
    }
    if (wind > 0 || conf) p.head.brow = -0.9;
    if (conf) p.head.eye = 0.1;
    T.figure(c, C[k], p);
  }
}

function wide(c, t, z, fx, fy, shake) {
  T.cam(
    c,
    z || 1,
    (fx || 960) + (shake ? (T.rnd(Math.floor(t * 30)) - 0.5) * shake : 0),
    fy || 540,
  );
  T.square(c, 0, t, { chaos: true, screen: (c2, x, y, w, h) => screen(c2, x, y, w, h, t) });
  gang(c, t);
  // the power: flag-coloured rays from the captain
  const pw = T.seg(t, 27.6, 30.6) * (1 - T.seg(t, 34.2, 35.2));
  if (pw > 0) {
    T.rays(c, 430, 700, t, 0.55 * pw);
    c.fillStyle = `rgba(255,255,255,${0.25 * pw})`;
    c.beginPath();
    c.arc(430, 700, 260 + Math.sin(t * 20) * 20, 0, Math.PI * 2);
    c.fill();
  }
  T.figure(c, C.emiraslan, emiraslan(t));
  // gadget sparks
  if (t > 34.4 && t < 36.2) {
    c.fillStyle = "#ffd23f";
    for (let i = 0; i < 12; i++)
      T.star(
        c,
        1560 + (T.rnd(i + Math.floor(t * 20)) - 0.5) * 160,
        700 + (T.rnd(i * 5) - 0.5) * 160,
        12,
      );
  }
  T.puff(c, 1560, 700, T.seg(t, 36.0, 37.2), 0.8, "#ffffff");
}

function radioInsert(c, t) {
  T.street(c, 0, t);
  c.fillStyle = "#23272c";
  c.beginPath();
  c.rect(-300, -300, 2600, 1700);
  c.roundRect(200, 120, 1520, 860, 80);
  c.fill("evenodd");
  T.figure(c, C.driver, {
    x: 960,
    y: 1350,
    s: 1.25,
    hide: true,
    t,
    hands: { r: "mouth", l: "front" },
    propR: "radio",
    head: { mouth: T.talk(START + t, "driver"), brow: -0.8 },
  });
}

function draw(c, t) {
  T.runShots(c, t, [
    [0, () => wide(c, t, 1.9, 1380, 600)],
    [4, () => wide(c, t, 2.3, 1330, 580)],
    [
      8,
      (lt) => {
        wide(c, t, 1.0, 960, 540);
        T.word(c, "DİNQ!", 1500, 140, 60, T.seg(lt, 1.5, 3), "#ff3b6b");
      },
    ],
    [
      12.2,
      () => {
        wide(c, t, 2.6, 440, 560);
        T.hearts(c, 440, 340, t, 1, 7);
      },
    ],
    [16.6, () => radioInsert(c, t)],
    [19.8, () => wide(c, t, 2.4, 440, 570)],
    [23.2, () => wide(c, t, 1.9, 520, 600)],
    [
      27.4,
      (lt) => {
        const sh = T.clamp(1 - Math.abs(t - 30.7) / 0.5, 0, 1) * 30;
        wide(c, t, T.lerp(1.4, 1.0, T.seg(lt, 0, 3)), T.lerp(600, 960, T.seg(lt, 0, 3)), 560, sh);
        T.word(c, "VUUUŞŞ!", 960, 300, 100, T.seg(t, 30.6, 32.6), "#ffd23f");
      },
    ],
    [35, () => wide(c, t, 1.0, 960, 540)],
    [
      38,
      () => {
        wide(c, t, 1.0, 960, 540);
        c.setTransform(1, 0, 0, 1, 0, 0);
        T.confetti(c, t - 36, 320);
      },
    ],
  ]);
  if (t > 36 && t < 38) {
    c.setTransform(1, 0, 0, 1, 0, 0);
    T.confetti(c, t - 36, 320);
    T.word(c, "BUM!", 1560, 520, 90, T.seg(t, 36.0, 37.6), "#e53935");
  }
}
T.scene("s5", "s5-cv", DUR, draw);
