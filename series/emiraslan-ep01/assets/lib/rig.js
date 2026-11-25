/* Front-facing cartoon rig. Feet at (0, 0), ~880 px tall at scale 1.
   pose: { x, y, s, flip, lean, sq, walk (phase), run, sit, hide (legs hidden),
           hands: { l: [x,y] | name, r: [x,y] | name }, kick, head: {...}, propL, propR, t } */
(function () {
  const T = (window.T = window.T || {});
  const INK = T.INK;

  const HIP_Y = -300,
    SH_Y = -545,
    NECK_Y = -590;

  // Named hand targets (for side s = -1 screen-left arm, +1 screen-right arm)
  const SPOTS = {
    down: (s) => [s * 150, -330],
    hip: (s) => [s * 110, -330],
    mouth: () => [8, -650],
    ear: (s) => [s * 80, -690],
    glasses: (s) => [s * 30, -700],
    hair: (s) => [s * 20, -790],
    chest: (s) => [s * 30, -470],
    collar: (s) => [s * 34, -570],
    out: (s) => [s * 340, -560],
    up: (s) => [s * 200, -870],
    point: (s) => [s * 360, -640],
    guard: (s) => [s * 60, -600],
    punch: (s) => [s * 380, -590],
    wave: (s) => [s * 250, -800],
    cross: (s) => [-s * 90, -450],
    rub: (s) => [s * 20, -470],
    front: (s) => [s * 90, -500],
    face: (s) => [s * 50, -640],
  };
  T.SPOTS = SPOTS;

  function hand(target, s) {
    if (!target) return SPOTS.down(s);
    if (typeof target === "string") return SPOTS[target](s);
    return target;
  }

  // 2-bone IK; elbow bends outward (away from the body centre)
  function ik(sx, sy, hx, hy, a, b, s) {
    let dx = hx - sx,
      dy = hy - sy;
    let d = Math.hypot(dx, dy);
    const max = a + b - 0.5;
    if (d > max) {
      dx *= max / d;
      dy *= max / d;
      d = max;
    }
    const base = Math.atan2(dy, dx);
    const cosA = T.clamp((a * a + d * d - b * b) / (2 * a * d), -1, 1);
    const ang = Math.acos(cosA);
    const a1 = base - ang,
      a2 = base + ang;
    const e1 = [sx + Math.cos(a1) * a, sy + Math.sin(a1) * a];
    const e2 = [sx + Math.cos(a2) * a, sy + Math.sin(a2) * a];
    const elbow = s * e1[0] > s * e2[0] ? e1 : e2;
    return { elbow, hand: [sx + dx, sy + dy] };
  }

  T.figure = function (c, spec, pose) {
    const p = pose || {};
    const s = p.s == null ? 1 : p.s;
    const t = p.t || 0;
    c.save();
    c.translate(p.x || 0, p.y || 0);
    c.rotate(p.lean || 0);
    c.scale(s * (p.flip ? -1 : 1) * (spec.scaleX || 1), s * (p.sq || 1) * (spec.scaleY || 1));

    const walk = p.walk;
    const ph = walk == null ? 0 : walk;
    const bob = walk == null ? 0 : -Math.abs(Math.sin(ph)) * (p.run ? 22 : 10);
    c.translate(0, bob);

    const sw = spec.sw || 118,
      hw = spec.hw || 70;
    const legW = spec.legW || 62;

    // ---- legs ----
    if (!p.hide) {
      for (const side of [-1, 1]) {
        let kick = 0;
        if (p.kick && side === p.kick[0]) kick = p.kick[1];
        const hx = side * (hw - legW * 0.45),
          hy = HIP_Y;
        // front view: feet alternately lift; kick swings the leg out
        const lift =
          walk == null
            ? 0
            : Math.max(0, Math.sin(ph + (side < 0 ? 0 : Math.PI))) * (p.run ? 70 : 40);
        const a1 = side * (0.05 + kick * 1.3);
        let kx = hx + Math.sin(a1) * 150 + side * lift * 0.25,
          ky = hy + Math.cos(a1) * 150 - lift * 0.5;
        let fx = hx + Math.sin(a1) * 300,
          fy = hy + Math.cos(a1) * 300 - lift;
        if (p.sit) {
          kx = hx + side * 30;
          ky = hy + 40;
          fx = kx + side * 10;
          fy = ky + 150;
        }
        if (spec.skirt) {
          T.thick(
            c,
            [
              [hx, hy + 120],
              [kx, ky],
              [fx, fy - 16],
            ],
            30,
            spec.skin,
          );
          // heel
          T.shape(
            c,
            spec.shoes || "#b3202c",
            () => {
              c.moveTo(fx - 26, fy - 18);
              c.lineTo(fx + 30, fy - 10);
              c.lineTo(fx + 30, fy + 2);
              c.lineTo(fx - 26, fy + 2);
              c.closePath();
            },
            4,
          );
        } else {
          T.thick(
            c,
            [
              [hx, hy],
              [kx, ky],
              [fx, fy - 18],
            ],
            legW,
            spec.trousers || "#333",
          );
          T.shape(
            c,
            spec.boots || "#141414",
            () => c.ellipse(fx + side * 10, fy - 12, 46, 22, 0, 0, Math.PI * 2),
            4,
          );
          if (spec.sneakers) {
            c.fillStyle = "#fff";
            c.fillRect(fx + side * 10 - 40, fy - 6, 80, 8);
          }
        }
      }
    }

    // ---- torso ----
    const torso = () => {
      c.moveTo(-hw, HIP_Y + 10);
      c.lineTo(-sw + 12, SH_Y + 40);
      c.quadraticCurveTo(-sw, SH_Y - 6, -sw + 40, SH_Y - 12);
      c.lineTo(sw - 40, SH_Y - 12);
      c.quadraticCurveTo(sw, SH_Y - 6, sw - 12, SH_Y + 40);
      c.lineTo(hw, HIP_Y + 10);
      c.closePath();
    };
    if (spec.cape) {
      const flap = Math.sin(t * 6) * 20;
      T.shape(c, spec.cape, () => {
        c.moveTo(-sw + 20, SH_Y);
        c.lineTo(sw - 20, SH_Y);
        c.lineTo(sw + 80 + flap, -40);
        c.lineTo(-sw - 80 + flap, -40);
        c.closePath();
      });
    }
    if (spec.skirt) {
      T.shape(c, spec.skirt, () => {
        c.moveTo(-hw, HIP_Y - 20);
        c.lineTo(hw, HIP_Y - 20);
        c.lineTo(hw + 70, HIP_Y + 150 + Math.sin(t * 4) * 4);
        c.quadraticCurveTo(0, HIP_Y + 170, -hw - 70, HIP_Y + 150 + Math.sin(t * 4 + 1) * 4);
        c.closePath();
      });
    }
    T.shape(c, spec.torso || "#666", torso);
    if (spec.pattern) {
      c.save();
      c.beginPath();
      torso();
      c.clip();
      spec.pattern(c, sw, hw);
      c.restore();
      c.beginPath();
      torso();
      c.strokeStyle = INK;
      c.lineWidth = 5;
      c.stroke();
    }
    if (spec.details) spec.details(c, sw, hw, p);

    // ---- head ----
    const hs = spec.hs || 0.62;
    c.save();
    c.translate((p.headX || 0) * 1, NECK_Y - 120 * hs * 2 + 20 + (spec.headDY || 0));
    c.rotate(p.tilt || 0);
    c.scale(hs, hs);
    const ho = Object.assign({ t }, p.head || {});
    if (spec.headFn) spec.headFn(c, ho);
    else T.toonHead(c, spec.head, ho);
    c.restore();
    if (spec.collar) spec.collar(c, sw, hw);

    // ---- arms (in front) ----
    const hands = p.hands || {};
    for (const side of [-1, 1]) {
      const sx = side * (sw - 26),
        sy = SH_Y + 16;
      const tgt = hand(side < 0 ? hands.l : hands.r, side);
      const armSwing =
        walk == null ? 0 : Math.sin(ph + (side < 0 ? Math.PI : 0)) * (p.run ? 60 : 35);
      const k = ik(
        sx,
        sy,
        tgt[0],
        tgt[1] + armSwing * 0,
        tgt[0] === SPOTS.down(side)[0] ? 130 : 130,
        125,
        side,
      );
      let hx = k.hand[0],
        hy = k.hand[1];
      let ex = k.elbow[0],
        ey = k.elbow[1];
      if (
        walk != null &&
        (!hands[side < 0 ? "l" : "r"] || hands[side < 0 ? "l" : "r"] === "down")
      ) {
        ex = sx + side * 18;
        ey = sy + 125;
        hx = sx + side * 30;
        hy = sy + 245;
        ey += 0;
        hy -= Math.abs(armSwing) * 0.3;
        hx += armSwing * 0.4;
      }
      T.thick(
        c,
        [
          [sx, sy],
          [ex, ey],
          [hx, hy],
        ],
        spec.armW || 50,
        spec.sleeve || spec.torso,
      );
      T.shape(c, spec.glove || spec.skin, () => c.arc(hx, hy, 24, 0, Math.PI * 2), 4);
      const prop = side < 0 ? p.propL : p.propR;
      if (prop && T.PROPS[prop]) {
        c.save();
        c.translate(hx, hy);
        if (side < 0) c.scale(-1, 1);
        T.PROPS[prop](c, t);
        c.restore();
      }
    }
    c.restore();
  };

  // ---------- hand props (drawn at the hand, pointing outward/right) ----------
  T.PROPS = {
    tea: (c) => {
      // armudu stəkan: pear-shaped tea glass
      T.shape(
        c,
        "rgba(200,90,40,0.85)",
        () => {
          c.moveTo(-18, -70);
          c.lineTo(18, -70);
          c.quadraticCurveTo(10, -40, 22, -14);
          c.quadraticCurveTo(0, 6, -22, -14);
          c.quadraticCurveTo(-10, -40, -18, -70);
        },
        4,
      );
      c.fillStyle = "rgba(255,255,255,0.45)";
      c.fillRect(-12, -66, 6, 40);
    },
    phone: (c) => {
      T.shape(c, "#2b2b2e", () => c.roundRect(-14, -90, 30, 110, 12), 4);
    },
    receiver: (c) => {
      T.shape(
        c,
        "#1f2a22",
        () => {
          c.roundRect(-16, -100, 32, 120, 14);
        },
        4,
      );
    },
    megaphone: (c) => {
      T.shape(c, "#f2f2f2", () => {
        c.moveTo(0, -20);
        c.lineTo(110, -70);
        c.lineTo(110, 50);
        c.lineTo(0, 10);
        c.closePath();
      });
      T.shape(c, "#e53935", () => c.rect(-30, -26, 40, 40), 4);
    },
    gadget: (c, t) => {
      T.shape(c, "#5d6b7a", () => c.roundRect(-30, -60, 70, 90, 10), 4);
      c.fillStyle = Math.floor(t * 6) % 2 ? "#7CFF6B" : "#ff3b6b";
      c.beginPath();
      c.arc(5, -30, 12, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = INK;
      c.lineWidth = 5;
      c.beginPath();
      c.moveTo(30, -60);
      c.lineTo(40, -110);
      c.stroke();
      c.fillStyle = "#ffd23f";
      c.beginPath();
      c.arc(40, -112, 9, 0, Math.PI * 2);
      c.fill();
    },
    spray: (c) => {
      T.shape(c, "#2e7d32", () => c.roundRect(-14, -80, 28, 90, 8), 4);
      T.shape(c, "#ddd", () => c.rect(-8, -94, 16, 14), 3);
    },
    coffee: (c) => {
      T.shape(
        c,
        "#fff",
        () => {
          c.moveTo(-20, -40);
          c.lineTo(20, -40);
          c.lineTo(14, 4);
          c.lineTo(-14, 4);
          c.closePath();
        },
        4,
      );
      c.fillStyle = "#8d5a3b";
      c.fillRect(-18, -28, 36, 10);
    },
    radio: (c) => {
      T.shape(c, "#2d3326", () => c.roundRect(-18, -80, 36, 96, 8), 4);
      c.strokeStyle = INK;
      c.lineWidth = 5;
      c.beginPath();
      c.moveTo(10, -80);
      c.lineTo(10, -130);
      c.stroke();
    },
    balloon: (c, t) => {
      c.strokeStyle = INK;
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(10, -200);
      c.stroke();
      T.shape(
        c,
        "#ef3340",
        () => c.ellipse(14 + Math.sin(t * 2) * 6, -250, 38, 48, 0, 0, Math.PI * 2),
        4,
      );
    },
  };

  // ---------- costumes ----------
  const olive = "#55603a",
    oliveD = "#434c2d";
  function uniform(stars, stripe) {
    return (c, sw, hw) => {
      // pockets, buttons, belt
      c.strokeStyle = "rgba(20,24,12,0.6)";
      c.lineWidth = 4;
      for (const s of [-1, 1]) {
        c.strokeRect(s * 62 - 34, -500, 68, 58);
        c.beginPath();
        c.moveTo(s * 62 - 36, -486);
        c.lineTo(s * 62 + 36, -486);
        c.stroke();
      }
      c.fillStyle = "#c9a54f";
      for (const y of [-520, -450, -380]) {
        c.beginPath();
        c.arc(0, y, 6, 0, Math.PI * 2);
        c.fill();
      }
      c.fillStyle = "#3b2a1e";
      c.fillRect(-hw - 4, -330, hw * 2 + 8, 26);
      c.fillStyle = "#e0bd5a";
      c.fillRect(-16, -334, 32, 34);
      // shoulder boards
      for (const s of [-1, 1]) {
        c.save();
        c.translate(s * (sw - 52), -548);
        c.rotate(s * 0.1);
        T.shape(c, "#4a5233", () => c.roundRect(-44, -12, 88, 24, 6), 3);
        if (stripe) {
          c.fillStyle = stripe;
          c.fillRect(-44, -3, 88, 6);
        }
        c.fillStyle = "#f2cf6c";
        for (let i = 0; i < stars; i++) T.star(c, -30 + i * 20 * s * s, 0, 8);
        c.restore();
      }
      // collar
      c.fillStyle = oliveD;
      c.beginPath();
      c.moveTo(-60, -560);
      c.lineTo(-10, -500);
      c.lineTo(10, -500);
      c.lineTo(60, -560);
      c.lineTo(30, -566);
      c.lineTo(0, -526);
      c.lineTo(-30, -566);
      c.fill();
    };
  }

  const harlequin = (c, sw) => {
    for (let i = -6; i < 6; i++) {
      for (let j = -12; j < 0; j++) {
        c.fillStyle = (i + j) % 2 ? "#39b54a" : "#ffd23f";
        const x = i * 60,
          y = j * 60 - 20;
        c.beginPath();
        c.moveTo(x, y - 30);
        c.lineTo(x + 30, y);
        c.lineTo(x, y + 30);
        c.lineTo(x - 30, y);
        c.closePath();
        c.fill();
      }
    }
    c.fillStyle = "#e53935";
    c.fillRect(-sw, -330, sw * 2, 26);
  };
  const tracksuit = (stripe) => (c, sw) => {
    c.fillStyle = stripe;
    c.fillRect(-sw, -460, sw * 2, 22);
    c.strokeStyle = "rgba(0,0,0,0.25)";
    c.lineWidth = 6;
    c.beginPath();
    c.moveTo(0, -560);
    c.lineTo(0, -300);
    c.stroke();
  };

  T.CAST = {
    emiraslan: {
      name: "ƏMİRASLAN",
      headFn: (c, o) => T.headEmiraslan(c, o),
      hs: 0.6,
      sw: 120,
      hw: 74,
      torso: olive,
      sleeve: olive,
      trousers: oliveD,
      boots: "#121212",
      skin: "#c08767",
      details: uniform(4, "#a8312c"),
    },
    driver: {
      name: "SÜRÜCÜ",
      head: {
        skin: "#e0ae8b",
        shape: "round",
        w: 150,
        hair: "short",
        hairColor: "#3a2a20",
        mustache: true,
        cap: "pilotka",
        nose: "round",
      },
      sw: 126,
      hw: 84,
      torso: olive,
      sleeve: olive,
      trousers: oliveD,
      skin: "#e0ae8b",
      details: uniform(0, "#e6c35a"),
    },
    officer: {
      name: "NÖVBƏTÇİ",
      head: {
        skin: "#cf9a78",
        w: 128,
        hair: "short",
        hairColor: "#222",
        bigEars: true,
        cap: "pilotka",
      },
      sw: 112,
      hw: 66,
      torso: olive,
      sleeve: olive,
      trousers: oliveD,
      skin: "#cf9a78",
      details: uniform(2, "#a8312c"),
    },
    lady: {
      name: "XANIM",
      head: {
        skin: "#e8b796",
        w: 124,
        hair: "long",
        hairColor: "#2a1712",
        lashes: true,
        lipstick: "#c2185b",
        earrings: true,
      },
      sw: 92,
      hw: 62,
      torso: "#c62839",
      sleeve: "#c62839",
      skirt: "#c62839",
      skin: "#e8b796",
      shoes: "#7a0f1c",
      armW: 34,
      details: (c) => {
        c.fillStyle = "#f2c230";
        c.beginPath();
        c.arc(0, -545, 10, 0, Math.PI * 2);
        c.fill();
      },
    },
    leader: {
      name: "JOKER TEAM LİDERİ",
      head: {
        skin: "#e2b38f",
        w: 132,
        hair: "mohawk",
        hairColor: "#3ddc4a",
        sunglasses: true,
        goldTooth: true,
        stubble: true,
      },
      sw: 120,
      hw: 70,
      torso: "#39b54a",
      sleeve: "#2e8b3a",
      trousers: "#ff8f1f",
      boots: "#f5f5f5",
      sneakers: true,
      skin: "#e2b38f",
      pattern: harlequin,
    },
    helper: {
      name: "KÖMƏKÇİ",
      head: {
        skin: "#d9a07a",
        shape: "round",
        w: 150,
        hair: "curly",
        hairColor: "#3ddc4a",
        goggles: true,
        nose: "round",
      },
      sw: 138,
      hw: 108,
      scaleY: 0.82,
      torso: "#eeeeee",
      sleeve: "#eeeeee",
      trousers: "#4a4a55",
      skin: "#d9a07a",
      details: (c) => {
        c.fillStyle = "#3ddc4a";
        c.fillRect(-20, -520, 40, 220);
      },
    },
    green1: {
      name: "YAŞILBAŞ",
      head: {
        skin: "#e1a985",
        w: 130,
        hair: "spiky",
        hairColor: "#3ddc4a",
        cap: "baseball",
        capColor: "#d32f2f",
      },
      sw: 116,
      hw: 72,
      torso: "#2e7d32",
      sleeve: "#2e7d32",
      trousers: "#2e7d32",
      skin: "#e1a985",
      sneakers: true,
      boots: "#f5f5f5",
      pattern: tracksuit("#ffd23f"),
    },
    green2: {
      name: "YAŞILBAŞ",
      head: {
        skin: "#d39a76",
        w: 112,
        hair: "spiky",
        hairColor: "#3ddc4a",
        cap: "beanie",
        capColor: "#1b5e20",
      },
      sw: 100,
      hw: 60,
      scaleY: 1.12,
      scaleX: 0.92,
      torso: "#2e7d32",
      sleeve: "#2e7d32",
      trousers: "#2e7d32",
      skin: "#d39a76",
      sneakers: true,
      boots: "#f5f5f5",
      pattern: tracksuit("#ffd23f"),
    },
    green3: {
      name: "YAŞILBAŞ",
      head: { skin: "#e6b18e", shape: "round", w: 158, hair: "bowl", hairColor: "#3ddc4a" },
      sw: 140,
      hw: 112,
      scaleY: 0.9,
      torso: "#2e7d32",
      sleeve: "#2e7d32",
      trousers: "#2e7d32",
      skin: "#e6b18e",
      sneakers: true,
      boots: "#f5f5f5",
      pattern: tracksuit("#ffd23f"),
    },
  };

  // Passers-by: a few looks built from a seed
  T.passer = (i) => {
    const skins = ["#e0ae8b", "#c99070", "#f0c4a4", "#b98060"];
    const tops = ["#3f6fb5", "#e0a93b", "#8e44ad", "#16a085", "#c0392b", "#f5f5f5", "#34495e"];
    const hairs = ["#1b1411", "#4a3426", "#9a9a9a", "#2a1712"];
    const female = i % 3 === 1;
    const sk = skins[i % skins.length];
    return {
      head: {
        skin: sk,
        w: 120 + (i % 3) * 10,
        hair: female ? "long" : i % 4 === 0 ? "curly" : "short",
        hairColor: hairs[i % hairs.length],
        mustache: !female && i % 5 === 2,
        lashes: female,
        lipstick: female ? "#b0413e" : null,
        cap: i % 7 === 3 ? "baseball" : null,
        capColor: "#2c3e50",
      },
      sw: female ? 96 : 116,
      hw: female ? 64 : 76,
      torso: tops[i % tops.length],
      sleeve: tops[i % tops.length],
      skirt: female ? tops[(i + 3) % tops.length] : null,
      trousers: ["#2c3e50", "#5d4037", "#37474f"][i % 3],
      skin: sk,
      armW: female ? 36 : 46,
    };
  };
})();
