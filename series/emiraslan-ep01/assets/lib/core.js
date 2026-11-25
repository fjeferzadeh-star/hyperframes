/* Shared toolkit for the "Emiraslan" episodes: math, easing, and comic effects.
   Everything is a pure function of the time passed in (seek-safe). */
(function () {
  const T = (window.T = window.T || {});

  T.rnd = (n) => {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  T.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  T.lerp = (a, b, p) => a + (b - a) * p;
  T.seg = (t, a, b) => T.clamp((t - a) / (b - a), 0, 1);
  T.io = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  T.out3 = (p) => 1 - Math.pow(1 - p, 3);
  T.in2 = (p) => p * p;
  T.outBack = (p) => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
  };
  T.lerp2 = (a, b, p) => [T.lerp(a[0], b[0], p), T.lerp(a[1], b[1], p)];
  // Keyframed value: keys = [[t, v], ...], v number or [x, y]; eased with io
  T.key = (t, keys, ease) => {
    const e = ease || T.io;
    if (t <= keys[0][0]) return keys[0][1];
    for (let i = 0; i < keys.length - 1; i++) {
      const [t0, v0] = keys[i],
        [t1, v1] = keys[i + 1];
      if (t < t1) {
        const p = e((t - t0) / (t1 - t0));
        return Array.isArray(v0) ? T.lerp2(v0, v1, p) : T.lerp(v0, v1, p);
      }
    }
    return keys[keys.length - 1][1];
  };
  // Step value: the last key at or before t
  T.step = (t, keys) => {
    let v = keys[0][1];
    for (const [k, val] of keys) if (t >= k) v = val;
    return v;
  };

  T.INK = "#16110f";

  // Mouth opening 0..1 for a speaker at absolute time `abs`
  T.talk = (abs, who) => {
    const lines = T.DIALOGUE || [];
    for (const l of lines) {
      if (l.who !== who || l.voice === false) continue;
      if (abs >= l.at && abs < l.at + l.talk) {
        const f = Math.floor(abs * 11);
        const r = T.rnd(f * 1.7 + l.at);
        return r < 0.18 ? 0.05 : 0.35 + r * 0.65;
      }
    }
    return 0;
  };

  T.star = (c, x, y, r, inner) => {
    const k = inner || 0.45;
    c.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 ? r * k : r;
      c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
    }
    c.closePath();
    c.fill();
  };

  // Fill + ink outline for a path built by fn()
  T.shape = (c, fill, fn, lw) => {
    c.beginPath();
    fn();
    c.fillStyle = fill;
    c.fill();
    c.lineWidth = lw == null ? 5 : lw;
    c.strokeStyle = T.INK;
    c.lineJoin = "round";
    if (c.lineWidth > 0) c.stroke();
  };

  T.thick = (c, pts, w, col) => {
    c.lineCap = "round";
    c.lineJoin = "round";
    c.strokeStyle = T.INK;
    c.lineWidth = w + 10;
    c.beginPath();
    pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
    c.stroke();
    c.strokeStyle = col;
    c.lineWidth = w;
    c.beginPath();
    pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
    c.stroke();
  };

  // ---------- Azerbaijan flag (waving), pre-rendered flat then sliced ----------
  const flagCache = {};
  function flatFlag(w, h) {
    const key = w + "x" + h;
    if (flagCache[key]) return flagCache[key];
    const cv = document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    const f = cv.getContext("2d");
    f.fillStyle = "#00b5e2";
    f.fillRect(0, 0, w, h / 3);
    f.fillStyle = "#ef3340";
    f.fillRect(0, h / 3, w, h / 3 + 1);
    f.fillStyle = "#509e2f";
    f.fillRect(0, (2 * h) / 3, w, h / 3 + 1);
    // crescent and eight-pointed star
    const cx = w / 2,
      cy = h / 2,
      r = h * 0.15;
    f.fillStyle = "#fff";
    f.beginPath();
    f.arc(cx - r * 0.25, cy, r, 0, Math.PI * 2);
    f.fill();
    f.fillStyle = "#ef3340";
    f.beginPath();
    f.arc(cx - r * 0.25 + r * 0.25, cy, r * 0.8, 0, Math.PI * 2);
    f.fill();
    f.fillStyle = "#fff";
    const sx = cx + r * 0.72,
      sr = r * 0.42;
    f.beginPath();
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8 - Math.PI / 2;
      const rr = i % 2 ? sr * 0.55 : sr;
      f.lineTo(sx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
    }
    f.closePath();
    f.fill();
    flagCache[key] = cv;
    return cv;
  }
  // pole at x, flag top at y; w x h flag
  T.flag = (c, x, y, w, h, t, opts) => {
    const o = opts || {};
    const amp = o.amp == null ? h * 0.08 : o.amp;
    const img = flatFlag(Math.round(w), Math.round(h));
    const N = 48,
      cw = w / N;
    for (let i = 0; i < N; i++) {
      const p = i / N;
      const ph = p * Math.PI * 2.2 - t * 4.2;
      const dy = Math.sin(ph) * amp * (0.2 + p);
      c.drawImage(img, i * cw, 0, cw + 1, h, x + i * cw, y + dy, cw + 1.2, h);
      const shade = Math.cos(ph) * 0.18;
      c.fillStyle = shade > 0 ? `rgba(255,255,255,${shade})` : `rgba(0,0,0,${-shade})`;
      c.fillRect(x + i * cw, y + dy, cw + 1.2, h);
    }
    if (o.pole !== false) {
      const ph = o.poleH || h * 4;
      c.fillStyle = "#c9ccd1";
      c.fillRect(x - 10, y - 20, 10, ph);
      c.fillStyle = "#e6c35a";
      c.beginPath();
      c.arc(x - 5, y - 26, 12, 0, Math.PI * 2);
      c.fill();
    }
  };

  // ---------- comic effects ----------
  T.puff = (c, x, y, p, s, col) => {
    if (p <= 0 || p >= 1) return;
    const a = 1 - p;
    c.fillStyle = col || `rgba(170,230,120,${a})`;
    if (col) c.globalAlpha = a;
    for (let i = 0; i < 9; i++) {
      const ang = (i / 9) * Math.PI * 2;
      const d = (30 + p * 120) * s;
      c.beginPath();
      c.arc(
        x + Math.cos(ang) * d,
        y + Math.sin(ang) * d * 0.7,
        (50 + 40 * T.rnd(i)) * s * (0.6 + p),
        0,
        Math.PI * 2,
      );
      c.fill();
    }
    c.beginPath();
    c.arc(x, y, 90 * s * (0.5 + p), 0, Math.PI * 2);
    c.fill();
    c.globalAlpha = 1;
  };

  T.speedLines = (c, cx, cy, t, a, n) => {
    c.strokeStyle = `rgba(255,255,255,${a})`;
    c.lineWidth = 4;
    for (let i = 0; i < (n || 40); i++) {
      const ang = T.rnd(i * 3.1) * Math.PI * 2;
      const r0 = 380 + T.rnd(i * 7 + Math.floor(t * 15)) * 300;
      c.beginPath();
      c.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0);
      c.lineTo(cx + Math.cos(ang) * 1400, cy + Math.sin(ang) * 1400);
      c.stroke();
    }
  };

  // Comic burst with a word ("BAM!"), p = 0..1 life
  T.word = (c, text, x, y, size, p, fill, rot) => {
    if (p <= 0 || p >= 1) return;
    const sc = p < 0.25 ? T.outBack(p / 0.25) : 1;
    const a = p > 0.8 ? 1 - (p - 0.8) / 0.2 : 1;
    c.save();
    c.globalAlpha = a;
    c.translate(x, y);
    c.rotate(rot || -0.12);
    c.scale(sc, sc);
    c.fillStyle = "#fff6c9";
    c.strokeStyle = T.INK;
    c.lineWidth = 6;
    c.beginPath();
    for (let i = 0; i < 24; i++) {
      const ang = (i / 24) * Math.PI * 2;
      const rr = (i % 2 ? 0.62 : 1) * size * (1 + 0.1 * T.rnd(i));
      c.lineTo(Math.cos(ang) * rr * 1.5, Math.sin(ang) * rr);
    }
    c.closePath();
    c.fill();
    c.stroke();
    c.font = `${Math.round(size * 0.75)}px "Bangers"`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.lineWidth = 8;
    c.strokeStyle = T.INK;
    c.strokeText(text, 0, 4);
    c.fillStyle = fill || "#e8322a";
    c.fillText(text, 0, 4);
    c.restore();
  };

  T.heart = (c, x, y, s, col) => {
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    c.fillStyle = col || "#ff3b6b";
    c.beginPath();
    c.moveTo(0, 12);
    c.bezierCurveTo(-26, -6, -14, -26, 0, -12);
    c.bezierCurveTo(14, -26, 26, -6, 0, 12);
    c.fill();
    c.strokeStyle = T.INK;
    c.lineWidth = 2.5 / s;
    c.stroke();
    c.restore();
  };

  // hearts rising from (x, y) during life p
  T.hearts = (c, x, y, t, a, n) => {
    if (a <= 0) return;
    c.save();
    c.globalAlpha = a;
    for (let i = 0; i < (n || 6); i++) {
      const per = 1.6;
      const p = ((t + T.rnd(i) * per) % per) / per;
      const hx = x + (T.rnd(i * 3) - 0.5) * 160 + Math.sin(p * 6 + i) * 18;
      const hy = y - p * 220;
      T.heart(c, hx, hy, 1 + T.rnd(i * 5) * 0.8, i % 2 ? "#ff3b6b" : "#ff7aa0");
    }
    c.restore();
  };

  T.confetti = (c, t, n, a) => {
    const cols = ["#00b5e2", "#ef3340", "#509e2f", "#ffd23f", "#ffffff"];
    c.save();
    c.globalAlpha = a == null ? 1 : a;
    for (let i = 0; i < (n || 260); i++) {
      const sp = 140 + T.rnd(i * 2.3) * 160;
      const y = ((T.rnd(i * 7.1) * 1300 + t * sp) % 1300) - 110;
      const x = T.rnd(i * 3.7) * 1920 + Math.sin(t * 2 + i) * 30;
      c.save();
      c.translate(x, y);
      c.rotate(t * (2 + T.rnd(i) * 4) + i);
      c.scale(1, Math.cos(t * 5 + i));
      c.fillStyle = cols[i % cols.length];
      c.fillRect(-9, -5, 18, 10);
      c.restore();
    }
    c.restore();
  };

  T.rays = (c, cx, cy, t, a, cols) => {
    const cl = cols || ["#00b5e2", "#ef3340", "#509e2f"];
    c.save();
    c.globalAlpha = a;
    c.translate(cx, cy);
    c.rotate(t * 0.6);
    for (let i = 0; i < 18; i++) {
      c.fillStyle = cl[i % cl.length];
      c.beginPath();
      c.moveTo(0, 0);
      const a0 = (i / 18) * Math.PI * 2,
        a1 = a0 + 0.17;
      c.lineTo(Math.cos(a0) * 2200, Math.sin(a0) * 2200);
      c.lineTo(Math.cos(a1) * 2200, Math.sin(a1) * 2200);
      c.closePath();
      c.fill();
    }
    c.restore();
  };

  T.glint = (c, x, y, r, a) => {
    if (a <= 0) return;
    c.save();
    c.globalAlpha = a;
    c.fillStyle = "#ffffff";
    c.beginPath();
    c.moveTo(x, y - r);
    c.quadraticCurveTo(x, y, x + r, y);
    c.quadraticCurveTo(x, y, x, y + r);
    c.quadraticCurveTo(x, y, x - r, y);
    c.quadraticCurveTo(x, y, x, y - r);
    c.fill();
    c.restore();
  };

  T.dizzy = (c, x, y, t) => {
    c.fillStyle = "#ffd23f";
    for (let i = 0; i < 4; i++) {
      const ang = t * 5 + (i * Math.PI) / 2;
      T.star(c, x + Math.cos(ang) * 70, y + Math.sin(ang) * 20, 14);
    }
  };

  T.sweat = (c, x, y, s) => {
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    c.fillStyle = "#9fd8ff";
    c.strokeStyle = T.INK;
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(0, -22);
    c.quadraticCurveTo(14, 0, 0, 10);
    c.quadraticCurveTo(-14, 0, 0, -22);
    c.fill();
    c.stroke();
    c.restore();
  };

  T.vignette = (c, a) => {
    const v = c.createRadialGradient(960, 540, 420, 960, 540, 1150);
    v.addColorStop(0, "rgba(0,0,0,0)");
    v.addColorStop(1, `rgba(0,0,0,${a})`);
    c.fillStyle = v;
    c.fillRect(0, 0, 1920, 1080);
  };

  // Fade the whole frame to black (a = 0..1)
  T.black = (c, a) => {
    if (a <= 0) return;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.fillStyle = `rgba(0,0,0,${Math.min(1, a)})`;
    c.fillRect(0, 0, 1920, 1080);
  };

  // A scene runner: shots = [[start, fn(lt, t)], ...]; fn draws for its own local time
  T.runShots = (c, t, shots) => {
    let cur = shots[0];
    for (const s of shots) if (t >= s[0]) cur = s;
    c.setTransform(1, 0, 0, 1, 0, 0);
    cur[1](t - cur[0], t);
    c.setTransform(1, 0, 0, 1, 0, 0);
  };

  // Camera: zoom z around world point (fx, fy) shown at screen center
  T.cam = (c, z, fx, fy, shake) => {
    const s = shake || 0;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.translate(960 + s * (T.rnd(Math.floor(fx + fy)) - 0.5), 540);
    c.scale(z, z);
    c.translate(-fx, -fy);
  };

  // Set up a scene: canvas id, composition id, duration, draw(t). Registers the timeline.
  T.scene = (id, canvasId, dur, draw) => {
    const c = document.getElementById(canvasId).getContext("2d");
    const go = () => {
      const tl = gsap.timeline({ paused: true });
      const st = { t: 0 };
      tl.to(
        st,
        {
          t: dur,
          duration: dur,
          ease: "none",
          onUpdate: () => draw(c, st.t),
        },
        0,
      );
      draw(c, 0);
      window.__timelines[id] = tl;
    };
    Promise.all([
      document.fonts.load('40px "Bangers"'),
      document.fonts.load('700 40px "Baloo 2"'),
    ]).then(go, go);
  };
})();
