import { fontFaces } from "./lib.mjs";

// Runtime helpers injected into every scene script. All are pure functions of timeline time.
export const RIG_JS = `
  const $ = (s) => document.querySelector(s);
  const MOUTHS = ["closed", "open", "shout", "smile", "smirk", "yawn"];
  function mouth(tl, p, state, t) {
    MOUTHS.forEach(function (m) {
      const el = document.getElementById(p + "-m-" + m);
      if (el) tl.set(el, { opacity: m === state ? 1 : 0 }, t);
    });
  }
  // Lip flap between two states; offsets vary so it never reads as a metronome.
  function talk(tl, p, t0, t1, open, rest) {
    open = open || "open"; rest = rest || "closed";
    const steps = [0.11, 0.09, 0.14, 0.08, 0.12, 0.1, 0.16, 0.09];
    let t = t0, i = 0, on = true;
    while (t < t1 - 0.05) { mouth(tl, p, on ? open : rest, t); t += steps[i % steps.length]; i++; on = !on; }
    mouth(tl, p, rest, t1);
  }
  function blink(tl, p, t) {
    ["L", "R"].forEach(function (s) {
      const e = document.getElementById(p + "-eye" + s);
      if (!e) return;
      tl.to(e, { scaleY: 0.08, transformOrigin: "50% 50%", duration: 0.06, ease: "power2.in" }, t);
      tl.to(e, { scaleY: 1, transformOrigin: "50% 50%", duration: 0.08, ease: "power2.out" }, t + 0.07);
    });
  }
  function look(tl, p, dx, dy, t, d) {
    tl.to("." + p + "-pupil", { x: dx, y: dy, duration: d || 0.18, ease: "power2.out" }, t);
  }
  function shake(tl, sel, t, amp, n) {
    amp = amp || 14; n = n || 8;
    for (let i = 0; i < n; i++) {
      const k = 1 - i / n, sx = (i % 2 ? -1 : 1) * amp * k, sy = ((i * 7) % 3 - 1) * amp * 0.6 * k;
      tl.to(sel, { x: sx, y: sy, duration: 0.035, ease: "none" }, t + i * 0.035);
    }
    tl.to(sel, { x: 0, y: 0, duration: 0.05, ease: "power2.out" }, t + n * 0.035);
  }
  // Comic word: pops in big with overshoot, holds, then punches out.
  function pow(tl, sel, t, hold, rot) {
    tl.fromTo(sel, { scale: 0.2, opacity: 0, rotation: (rot || -8) - 14 }, { scale: 1, opacity: 1, rotation: rot || -8, duration: 0.28, ease: "back.out(2.2)" }, t);
    tl.to(sel, { scale: 1.25, opacity: 0, duration: 0.18, ease: "power2.in" }, t + (hold || 1));
  }
`;

export const COMIC_CSS = `
  .comic {
    position: absolute; font-family: "AmrComic", sans-serif; color: #ffd84a; opacity: 0;
    -webkit-text-stroke: 10px #120d0a; paint-order: stroke fill; letter-spacing: 0.02em;
    text-shadow: 8px 8px 0 #120d0a; white-space: nowrap; line-height: 1;
  }
  .caption-box {
    position: absolute; background: #f3d54a; color: #15110d; font-family: "AmrComic", sans-serif;
    font-size: 30px; padding: 12px 22px; border: 5px solid #15110d; box-shadow: 7px 7px 0 #15110d;
    letter-spacing: 0.04em; opacity: 0; white-space: nowrap;
  }
`;

export function scene(id, dur, { bg = "#000", css = "", svg = "", html = "", js = "", defs = "" }) {
  return `<template>
  <style>
    ${fontFaces()}
    #root { position: absolute; inset: 0; overflow: hidden; background: ${bg}; }
    #${id}-clip { position: absolute; inset: 0; }
    #${id}-cam { position: absolute; inset: 0; }
    #${id}-svg { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    ${COMIC_CSS}
    ${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1920" data-height="1080" data-layout-allow-overflow data-layout-allow-overlap>
    <div id="${id}-clip" class="clip" data-start="0" data-duration="${dur}" data-track-index="0">
      <div id="${id}-cam">
        <svg id="${id}-svg" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
          <defs>${defs}</defs>
          ${svg}
        </svg>
        ${html}
      </div>
    </div>
  </div>
  <script>
    (function () {
      ${RIG_JS}
      const tl = gsap.timeline({ paused: true });
      ${js}
      window.__timelines["${id}"] = tl;
    })();
  </script>
</template>
`;
}

// Place a character: static outer transform, GSAP animates the inner #p-rig.
export function place(inner, x, y, s, extra = "") {
  return `<g transform="translate(${x},${y}) scale(${s})" ${extra}>${inner}</g>`;
}
