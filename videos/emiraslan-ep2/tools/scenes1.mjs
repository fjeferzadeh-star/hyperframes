// Scenes 1–9: title, dawn, parade, commander, boots, salute, dispersal, office, "3 hours later".
import {
  amiraslan,
  commander,
  soldierSymbols,
  soldierTopSymbol,
  azFlag,
  rng,
  star,
  C,
} from "./lib.mjs";
import { scene, place } from "./scene.mjs";

const SCHWA = "Ə";
const SKY_DAY = `<linearGradient id="IDsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f93b8"/><stop offset=".6" stop-color="#c9b48e"/><stop offset="1" stop-color="#e3c79a"/></linearGradient>`;

function flagPole(p, x, y, h, w) {
  return `<g transform="translate(${x},${y})">
    <rect x="-5" y="0" width="10" height="${h}" fill="#8d8a84"/><circle cx="0" cy="-6" r="10" fill="${C.gold}"/>
    <g id="${p}-wave" transform="translate(5,10)">${azFlag(p, w, w / 2)}</g>
  </g>`;
}

// Flag flutter: a few finite skew cycles (no infinite repeats).
function flutter(sel, dur) {
  return `tl.fromTo("${sel}", { skewY: -3 }, { skewY: 3, duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: ${Math.floor(dur / 0.7)}, transformOrigin: "0% 50%" }, 0);`;
}

// ---------------- S1 Title ----------------
export function s01() {
  const r = rng(11);
  let rain = "";
  for (let i = 0; i < 90; i++)
    rain += `<line x1="${(r() * 2100 - 100).toFixed(0)}" y1="${(r() * 1080).toFixed(0)}" x2="${(r() * 2100 - 112).toFixed(0)}" y2="0" stroke="#7f8fb0" stroke-width="1.6" opacity="${(0.15 + r() * 0.3).toFixed(2)}" class="s01-drop"/>`;
  rain = "";
  for (let i = 0; i < 110; i++) {
    const x = (r() * 2200 - 140).toFixed(0),
      y = (r() * 1080).toFixed(0),
      l = 30 + r() * 40;
    rain += `<line x1="${x}" y1="${y}" x2="${(+x - l * 0.25).toFixed(0)}" y2="${(+y + l).toFixed(0)}" stroke="#8a9ac0" stroke-width="1.8" opacity="${(0.12 + r() * 0.3).toFixed(2)}"/>`;
  }
  const svg = `
    <rect width="1920" height="1080" fill="url(#s01-bg)"/>
    <g id="s01-rain">${rain}</g><g id="s01-rain2" transform="translate(0,-1080)">${rain}</g>
    <g id="s01-shield" transform="translate(960,380)">
      <g id="s01-shield-in">
        <path d="M -110,-120 L 110,-120 L 110,10 L 0,110 L -110,10 Z" fill="${C.goldDeep}"/>
        <path d="M -96,-106 L 96,-106 L 96,4 L 0,94 L -96,4 Z" fill="${C.gold}"/>
        <path d="M -96,-106 L 20,-106 L -66,30 L -96,4 Z" fill="#fff" opacity=".2"/>
        <text x="0" y="40" text-anchor="middle" font-family="AmrTitle" font-size="190" fill="#7a1c1c">Ə</text>
      </g>
    </g>`;
  const defs = `<radialGradient id="s01-bg" cx=".5" cy=".42" r=".7"><stop offset="0" stop-color="#1d2540"/><stop offset=".6" stop-color="#11162a"/><stop offset="1" stop-color="#07090f"/></radialGradient>`;
  const html = `
    <div id="s01-title"><span class="s01-l">${SCHWA}</span><span class="s01-l">M</span><span class="s01-l">İ</span><span class="s01-l">R</span><span class="s01-l">A</span><span class="s01-l">S</span><span class="s01-l">L</span><span class="s01-l">A</span><span class="s01-l">N</span></div>
    <div id="s01-rule"></div>
    <div id="s01-sub">İKİNCİ HİSSƏ</div>`;
  const css = `
    #s01-title { position: absolute; left: 0; right: 0; top: 545px; text-align: center; font-family: "AmrTitle"; font-size: 190px; letter-spacing: 0.04em; color: #e2c46a; text-shadow: 0 6px 0 #6b5420, 0 0 40px rgba(226,196,106,.35); }
    .s01-l { display: inline-block; opacity: 0; }
    #s01-rule { position: absolute; left: 50%; top: 822px; width: 640px; height: 4px; margin-left: -320px; background: linear-gradient(90deg, transparent, #e2c46a, transparent); transform-origin: 50% 50%; }
    #s01-sub { position: absolute; left: 0; right: 0; top: 846px; text-align: center; font-family: "AmrSub"; font-weight: 800; font-size: 34px; letter-spacing: 0.55em; color: #efe3c4; opacity: 0; }`;
  const js = `
    tl.fromTo("#s01-rain", { y: 0 }, { y: 1080, duration: 7, ease: "none" }, 0);
    tl.fromTo("#s01-rain2", { y: 0 }, { y: 1080, duration: 7, ease: "none" }, 0);
    tl.fromTo("#s01-shield-in", { scale: 2.6, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.5, ease: "power4.in" }, 0.5);
    tl.fromTo("#s01-shield-in", { rotation: -10 }, { rotation: 0, duration: 0.9, ease: "elastic.out(1, 0.5)", transformOrigin: "50% 50%" }, 1.0);
    shake(tl, "#s01-cam", 1.0, 16, 7);
    tl.fromTo(".s01-l", { opacity: 0, y: 40, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "expo.out", stagger: 0.08 }, 1.5);
    tl.fromTo("#s01-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, 2.4);
    tl.fromTo("#s01-sub", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "expo.out" }, 2.8);
    tl.to(["#s01-title", "#s01-rule", "#s01-sub", "#s01-shield"], { opacity: 0, filter: "blur(10px)", duration: 0.5, ease: "power2.in" }, 6.3);`;
  return scene("s01", 7, { bg: "#07090f", svg, defs, html, css, js });
}

// ---------------- S2 Dawn ----------------
export function s02() {
  const r = rng(22);
  let barracks = "";
  for (let i = 0; i < 6; i++) {
    const x = 40 + i * 330,
      w = 280,
      h = 120 + (i % 3) * 30;
    let win = "";
    for (let k = 0; k < 6; k++)
      win += `<rect x="${x + 22 + k * 43}" y="${880 - h + 30}" width="22" height="28" fill="#2c2a2e" class="s02-win"/>`;
    barracks += `<path d="M ${x},880 L ${x},${880 - h} L ${x + w / 2},${880 - h - 50} L ${x + w},${880 - h} L ${x + w},880 Z" fill="#2f3a2c"/>${win}`;
  }
  let birds = "";
  for (let i = 0; i < 7; i++)
    birds += `<path class="s02-bird" d="M ${-120 - i * 70 - r() * 40},${300 + r() * 120} q 12,-12 24,0 q 12,-12 24,0" stroke="#2a2522" stroke-width="4" fill="none"/>`;
  const svg = `
    <rect width="1920" height="1080" fill="url(#s02-sky)"/>
    <rect id="s02-night" width="1920" height="1080" fill="#0d1328"/>
    <circle id="s02-sun" cx="1260" cy="900" r="110" fill="#ffd27a"/>
    <circle id="s02-sunglow" cx="1260" cy="900" r="300" fill="url(#s02-glow)"/>
    <path d="M 0,820 C 300,740 600,780 900,750 C 1200,720 1500,790 1920,740 L 1920,1080 L 0,1080 Z" fill="#3b4a38"/>
    ${barracks}
    <rect x="0" y="878" width="1920" height="210" fill="#4a5146"/>
    <rect x="0" y="878" width="1920" height="10" fill="#5d6458"/>
    ${flagPole("s02f", 560, 330, 560, 300)}
    ${birds}`;
  const defs = `<linearGradient id="s02-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d3f6c"/><stop offset=".55" stop-color="#d98a5e"/><stop offset="1" stop-color="#f3c27a"/></linearGradient>
    <radialGradient id="s02-glow"><stop offset="0" stop-color="#ffd27a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>`;
  const html = `<div id="s02-cap" class="caption-box" style="left:150px; top:150px; font-family:'AmrSub'; font-weight:800;">SƏHƏR. HƏRBİ HİSSƏ.</div>`;
  const js = `
    tl.fromTo("#s02-night", { opacity: 0.85 }, { opacity: 0, duration: 5, ease: "power2.inOut" }, 0);
    tl.fromTo(["#s02-sun", "#s02-sunglow"], { y: 120 }, { y: -260, duration: 7, ease: "power1.out" }, 0);
    tl.fromTo(".s02-win", { fill: "#2c2a2e" }, { fill: "#ffd98a", duration: 0.2, stagger: 0.12, ease: "none" }, 1.2);
    tl.fromTo(".s02-bird", { x: 0 }, { x: 2300, duration: 6.5, ease: "none", stagger: 0.15 }, 0.3);
    ${flutter("#s02f-wave", 7)}
    tl.fromTo("#s02-cap", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, 1.0);
    tl.to("#s02-cap", { opacity: 0, duration: 0.3, ease: "power2.in" }, 5.6);
    tl.fromTo("#s02-cam", { scale: 1.08, transformOrigin: "50% 60%" }, { scale: 1, duration: 7, ease: "power1.inOut" }, 0);`;
  return scene("s02", 7, { bg: "#0d1328", svg, defs, html, js });
}

// ---------------- S3 Parade ground, wide high angle ----------------
export function s03() {
  // 8 blocks × 125 soldiers = 1000.
  let blocks = "";
  const bw = 25,
    bh = 5,
    gx = 15,
    gy = 26;
  for (let b = 0; b < 8; b++) {
    const col = b % 4,
      row = Math.floor(b / 4);
    const ox = 135 + col * 425,
      oy = 470 + row * 200;
    let u = "";
    for (let j = 0; j < bh; j++)
      for (let i = 0; i < bw; i++)
        u += `<use href="#s03-st" x="${ox + i * gx}" y="${oy + j * gy}" width="17" height="17"/>`;
    blocks += `<g class="s03-block">${u}</g>`;
  }
  const svg = `
    <rect width="1920" height="1080" fill="#5c605a"/>
    <rect x="0" y="0" width="1920" height="300" fill="#3f4a3a"/>
    <path d="M 0,300 L 1920,300" stroke="#e9e4d6" stroke-width="6"/>
    <g stroke="#d9d4c6" stroke-width="3" opacity=".55">
      ${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="${180 + i * 312}" y1="420" x2="${180 + i * 312}" y2="980"/>`).join("")}
    </g>
    <rect x="600" y="300" width="720" height="60" fill="#e9e4d6" opacity=".2"/>
    <g id="s03-tribune">
      <rect x="760" y="170" width="400" height="120" fill="#2e3a2a"/>
      <rect x="760" y="170" width="400" height="22" fill="#8e2424"/>
      <rect x="900" y="290" width="120" height="70" fill="#8e2424"/>
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="${800 + i * 70}" y="196" width="40" height="70" fill="#4b5a3a"/>`).join("")}
      <circle cx="960" cy="230" r="14" fill="${C.olive}"/><circle cx="960" cy="230" r="7" fill="${C.oliveLight}"/>
    </g>
    <g transform="translate(700,40)"><rect x="-4" y="0" width="8" height="250" fill="#8d8a84"/><g id="s03f-wave" transform="translate(4,6)">${azFlag("s03f", 170, 85)}</g></g>
    <g transform="translate(1220,40)"><rect x="-4" y="0" width="8" height="250" fill="#8d8a84"/><g id="s03g-wave" transform="translate(4,6)">${azFlag("s03g", 170, 85)}</g></g>
    ${blocks}
    <g id="s03-officers">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<use href="#s03-st" x="${320 + (i % 4) * 425}" y="${430 + (i > 3 ? 200 : 0)}" width="20" height="20"/>`).join("")}</g>`;
  const defs = soldierTopSymbol("s03");
  const html = `<div id="s03-cap" class="caption-box" style="left:150px; top:150px; font-family:'AmrSub'; font-weight:800;">DÜZÜLÜŞ: 1000 NƏFƏRLİK ŞƏXSİ HEYƏT</div>`;
  const js = `
    tl.fromTo("#s03-cam", { scale: 1.0, x: 0, y: 0, transformOrigin: "50% 40%" }, { scale: 1.18, y: 40, duration: 8, ease: "power1.inOut" }, 0);
    ${flutter("#s03f-wave", 8)}${flutter("#s03g-wave", 8)}
    tl.fromTo("#s03-cap", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, 0.8);
    tl.to("#s03-cap", { opacity: 0, duration: 0.3, ease: "power2.in" }, 6.8);`;
  return scene("s03", 8, { bg: "#5c605a", svg, defs, html, js });
}

// ---------------- S4 Commander at the tribune ----------------
export function s04() {
  const svg = `
    <rect width="1920" height="1080" fill="url(#s04-sky)"/>
    <path d="M 0,700 C 400,650 900,690 1920,640 L 1920,1080 L 0,1080 Z" fill="#3b4a38"/>
    <g transform="translate(1270,190)"><rect x="-6" y="0" width="12" height="700" fill="#8d8a84"/><g id="s04f-wave" transform="translate(6,10)">${azFlag("s04f", 320, 160)}</g></g>
    <rect x="300" y="610" width="1320" height="480" fill="#2e3a2a"/>
    <rect x="300" y="610" width="1320" height="36" fill="#8e2424"/>
    ${place(commander("s04c"), 960, 470, 0.95)}
    <g id="s04-podium">
      <path d="M 760,760 L 1160,760 L 1130,1080 L 790,1080 Z" fill="#6b4a2e"/>
      <path d="M 740,740 L 1180,740 L 1180,775 L 740,775 Z" fill="#7d5736"/>
      <circle cx="960" cy="880" r="62" fill="${C.gold}"/><circle cx="960" cy="880" r="50" fill="#8e2424"/>${star(960, 880, 30, C.gold, 8)}
      <path d="M 900,740 C 905,700 915,660 930,640" stroke="#222" stroke-width="7" fill="none"/>
      <path d="M 1020,740 C 1015,700 1005,660 990,640" stroke="#222" stroke-width="7" fill="none"/>
      <rect id="s04-mic1" x="918" y="616" width="24" height="40" rx="12" fill="#333"/>
      <rect x="978" y="616" width="24" height="40" rx="12" fill="#333"/>
    </g>`;
  const defs = `<linearGradient id="s04-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c9cc0"/><stop offset="1" stop-color="#e8cfa2"/></linearGradient>`;
  const html = `
    <div id="s04-tiq" class="comic" style="left:1010px; top:520px; font-size:58px;">TIQ! TIQ!</div>
    <div id="s04-vii" class="comic" style="left:1150px; top:360px; font-size:84px; color:#ff8a5a;">VİİİİÜ!</div>
    <div id="s04-faragat" class="comic" style="left:120px; top:220px; font-size:150px;">FARAĞAT!</div>`;
  const js = `
    ${flutter("#s04f-wave", 9)}
    tl.fromTo("#s04-cam", { scale: 1.12, transformOrigin: "50% 45%" }, { scale: 1.0, duration: 2.0, ease: "power2.out" }, 0);
    blink(tl, "s04c", 0.6);
    // taps the microphone
    tl.fromTo("#s04c-armR", { rotation: 0, transformOrigin: "50% 3%" }, { rotation: 38, duration: 0.35, ease: "power2.out" }, 1.0);
    tl.to("#s04c-armR", { rotation: 32, duration: 0.08, yoyo: true, repeat: 3, ease: "power1.inOut" }, 1.35);
    tl.to("#s04c-armR", { rotation: 0, duration: 0.4, ease: "power2.inOut" }, 1.9);
    pow(tl, "#s04-tiq", 1.3, 0.6, 6);
    // feedback squeal — he winces
    pow(tl, "#s04-vii", 1.75, 0.7, -10);
    tl.to("#s04c-eyes", { scaleY: 0.25, transformOrigin: "50% 50%", duration: 0.1 }, 1.75);
    tl.to("#s04c-eyes", { scaleY: 1, transformOrigin: "50% 50%", duration: 0.15 }, 2.4);
    tl.to("#s04c-brows", { y: 6, duration: 0.1 }, 1.75); tl.to("#s04c-brows", { y: 0, duration: 0.2 }, 2.4);
    // "Düzlən!"
    tl.to("#s04c-rig", { y: -6, duration: 0.2, ease: "power2.out" }, 2.9);
    talk(tl, "s04c", 3.0, 4.2, "shout", "closed");
    tl.to("#s04c-rig", { y: 0, duration: 0.3, ease: "power2.inOut" }, 4.2);
    blink(tl, "s04c", 4.6);
    // "Farağat!" — the big one
    tl.to("#s04c-brows", { y: -10, duration: 0.15, ease: "back.out(3)" }, 5.6);
    tl.to("#s04c-rig", { scale: 1.04, transformOrigin: "50% 100%", duration: 0.15, ease: "power2.out" }, 5.8);
    mouth(tl, "s04c", "shout", 5.8);
    tl.to("#s04c-armL", { rotation: -12, transformOrigin: "50% 3%", duration: 0.15, ease: "power2.out" }, 5.8);
    pow(tl, "#s04-faragat", 5.85, 1.9, -6);
    shake(tl, "#s04-cam", 5.85, 12, 8);
    mouth(tl, "s04c", "closed", 7.3);
    tl.to("#s04c-rig", { scale: 1, duration: 0.4, ease: "power2.inOut" }, 7.3);
    tl.to("#s04c-armL", { rotation: 0, duration: 0.4, ease: "power2.inOut" }, 7.3);
    tl.to("#s04c-brows", { y: 0, duration: 0.3 }, 7.3);`;
  return scene("s04", 9, { bg: "#7c9cc0", svg, defs, html, js });
}

// ---------------- S5 Boots snap ----------------
export function s05() {
  let boots = "";
  for (let i = 0; i < 9; i++) {
    const x = 60 + i * 215;
    boots += `<g class="s05-pair">
      <path d="M ${x},300 L ${x + 70},300 L ${x + 64},760 L ${x + 6},760 Z" fill="${C.trouser}"/>
      <g class="s05-l"><path d="M ${x - 60},300 L ${x + 10},300 L ${x + 4},760 L ${x - 54},760 Z" fill="${C.trouser}"/>
      <path d="M ${x - 60},740 L ${x + 10},740 L ${x + 14},840 L ${x - 96},840 C ${x - 96},800 ${x - 80},760 ${x - 60},740 Z" fill="${C.boot}"/></g>
      <path d="M ${x},740 L ${x + 70},740 L ${x + 106},840 L ${x - 4},840 C ${x - 4},800 ${x},760 ${x},740 Z" fill="${C.boot}"/>
      <path d="M ${x + 20},770 L ${x + 60},770" stroke="#fff" stroke-width="3" opacity=".25"/>
    </g>`;
  }
  const svg = `
    <rect width="1920" height="1080" fill="#5c605a"/>
    <rect y="840" width="1920" height="240" fill="#4a4e48"/>
    ${boots}
    <g id="s05-dust">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<ellipse cx="${80 + i * 215}" cy="840" rx="70" ry="20" fill="#c9c2b0" opacity="0"/>`).join("")}</g>`;
  const html = `<div id="s05-pow" class="comic" style="left:560px; top:330px; font-size:230px;">ŞAQQ!</div>`;
  const js = `
    tl.fromTo(".s05-l", { x: -90 }, { x: -90, duration: 0.01 }, 0);
    tl.to(".s05-l", { x: 0, duration: 0.14, ease: "power4.in", stagger: 0.012 }, 0.4);
    tl.fromTo("#s05-dust ellipse", { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 0.7, scale: 1.5, duration: 0.3, ease: "expo.out" }, 0.55);
    tl.to("#s05-dust ellipse", { opacity: 0, duration: 0.6, ease: "power2.in" }, 0.85);
    pow(tl, "#s05-pow", 0.55, 2.4, -5);
    shake(tl, "#s05-cam", 0.55, 18, 8);
    tl.fromTo("#s05-cam", { scale: 1, transformOrigin: "50% 80%" }, { scale: 1.06, duration: 3.4, ease: "power1.out" }, 0.6);`;
  return scene("s05", 4, { bg: "#5c605a", svg, html, js });
}

// ---------------- S6 "Salam əsgər!" / "SAĞ OL!" / Əmiraslan yawns ----------------
export function s06() {
  // A: commander close-up 0–3. B: crowd shout 3–6.5. C: front row with Əmiraslan 6.5–10.
  let rows = "";
  const nRows = 7;
  for (let rIdx = 0; rIdx < nRows; rIdx++) {
    const k = rIdx; // far (small) rows first, front rows painted last
    const s = 0.55 + k * 0.17,
      y = 380 + k * 95,
      n = Math.ceil(1920 / (120 * s)) + 2;
    let row = "";
    for (let i = 0; i < n; i++)
      row += `<use href="#s06-sf${(i + k) % 4}" x="${(i * 120 * s - 60 + (k % 2) * 50 * s).toFixed(1)}" y="${y}" width="${(120 * s).toFixed(1)}" height="${(170 * s).toFixed(1)}"/>`;
    rows += `<g>${row}</g>`;
  }
  const svg = `
    <g id="s06-A">
      <rect width="1920" height="1080" fill="url(#s06-skyA)"/>
      <g transform="translate(1500,120)"><rect x="-6" y="0" width="12" height="900" fill="#8d8a84"/><g id="s06f-wave" transform="translate(6,10)">${azFlag("s06f", 300, 150)}</g></g>
      ${place(commander("s06c"), 960, 400, 1.75)}
      <rect id="s06-mic" x="1150" y="830" width="44" height="80" rx="22" fill="#333"/><path d="M 1172,910 L 1172,1080" stroke="#222" stroke-width="12"/>
    </g>
    <g id="s06-B" opacity="0">
      <rect width="1920" height="1080" fill="url(#s06-skyA)"/>
      <g id="s06-tree"><rect x="1680" y="200" width="40" height="300" fill="#4a3526"/><circle cx="1700" cy="190" r="140" fill="#3d5a34"/><circle cx="1610" cy="240" r="90" fill="#46663b"/><circle cx="1790" cy="250" r="95" fill="#35502e"/></g>
      <g id="s06-birds">${[0, 1, 2, 3, 4, 5].map((i) => `<path class="s06-bird" d="M ${1640 + i * 22},${160 + (i % 3) * 30} q 10,-10 20,0 q 10,-10 20,0" stroke="#2a2522" stroke-width="4" fill="none"/>`).join("")}</g>
      <g id="s06-crowd">${rows}</g>
    </g>
    <g id="s06-C" opacity="0">
      <rect width="1920" height="1080" fill="url(#s06-skyA)"/>
      <rect y="760" width="1920" height="320" fill="#5c605a"/>
      <g opacity=".85">${place(amiraslan("s06o1", "uniform"), 360, 330, 0.95)}</g>
      <g opacity=".85">${place(amiraslan("s06o2", "uniform"), 1560, 330, 0.95)}</g>
      ${place(amiraslan("s06a", "uniform"), 960, 300, 1.05)}
    </g>`;
  const defs = `<linearGradient id="s06-skyA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c9cc0"/><stop offset="1" stop-color="#e8cfa2"/></linearGradient>${soldierSymbols("s06")}`;
  const html = `
    <div id="s06-sagol" class="comic" style="left:290px; top:170px; font-size:260px;">SAĞ OL!</div>
    <div id="s06-zzz" class="comic" style="left:1110px; top:200px; font-size:70px; color:#cfe3ff;">Hıııı...</div>
    <div id="s06-bang" class="comic" style="left:1080px; top:180px; font-size:150px; color:#ff5a3a;">!</div>
    <div id="s06-sweat" style="position:absolute; left:1060px; top:330px; width:26px; height:38px; background:#9fd0ff; border-radius:50% 50% 50% 50% / 60% 60% 40% 40%; border:4px solid #15110d; opacity:0;"></div>`;
  const js = `
    ${flutter("#s06f-wave", 3)}
    // A — "Salam, əsgər!"
    tl.fromTo("#s06-cam", { scale: 1 }, { scale: 1.05, transformOrigin: "50% 30%", duration: 3, ease: "power1.inOut" }, 0);
    blink(tl, "s06c", 0.3);
    talk(tl, "s06c", 0.6, 2.0, "shout", "closed");
    tl.fromTo("#s06c-armR", { rotation: 0, transformOrigin: "50% 3%" }, { rotation: -150, duration: 0.45, ease: "back.out(1.6)" }, 0.5);
    tl.to("#s06c-armR", { rotation: 0, duration: 0.5, ease: "power2.inOut" }, 2.3);
    // B — "SAĞ OL!"
    tl.set("#s06-A", { opacity: 0 }, 3.0); tl.set("#s06-B", { opacity: 1 }, 3.0);
    tl.set("#s06-cam", { scale: 1, x: 0, y: 0 }, 3.0);
    tl.set(".s06-sfo", { opacity: 1 }, 3.3); tl.set(".s06-sfm", { opacity: 0 }, 3.3);
    tl.fromTo("#s06-crowd", { y: 0 }, { y: -10, duration: 0.12, ease: "power2.out" }, 3.3);
    pow(tl, "#s06-sagol", 3.3, 2.6, -4);
    shake(tl, "#s06-cam", 3.3, 22, 12);
    tl.fromTo(".s06-bird", { x: 0, y: 0 }, { x: (i) => 300 + i * 90, y: (i) => -260 - i * 30, duration: 1.6, ease: "power2.out", stagger: 0.05 }, 3.35);
    tl.fromTo("#s06-tree", { rotation: 0, transformOrigin: "50% 100%" }, { rotation: 4, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, 3.35);
    tl.set(".s06-sfo", { opacity: 0 }, 5.0); tl.set(".s06-sfm", { opacity: 1 }, 5.0);
    tl.fromTo("#s06-cam", { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.08, duration: 3.5, ease: "power1.out", immediateRender: false }, 3.0);
    // C — Əmiraslan yawns, then snaps to attention
    tl.set("#s06-B", { opacity: 0 }, 6.5); tl.set("#s06-C", { opacity: 1 }, 6.5);
    tl.set("#s06-cam", { scale: 1, x: 0, y: 0 }, 6.5);
    tl.fromTo("#s06-cam", { scale: 1.0, transformOrigin: "50% 30%" }, { scale: 1.12, duration: 3.5, ease: "power1.inOut", immediateRender: false }, 6.5);
    tl.to("#s06a-eyes", { scaleY: 0.15, transformOrigin: "50% 50%", duration: 0.3, ease: "power2.inOut" }, 6.8);
    mouth(tl, "s06a", "yawn", 6.9);
    tl.to("#s06a-head", { rotation: -6, transformOrigin: "50% 90%", duration: 0.5, ease: "power2.inOut" }, 6.9);
    tl.fromTo("#s06-zzz", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 7.0);
    tl.to("#s06-zzz", { opacity: 0, duration: 0.15 }, 8.1);
    blink(tl, "s06o1", 7.2); blink(tl, "s06o2", 7.6);
    // snap
    mouth(tl, "s06a", "closed", 8.2);
    tl.to("#s06a-eyes", { scaleY: 1.25, transformOrigin: "50% 50%", duration: 0.08, ease: "power3.out" }, 8.2);
    tl.to("#s06a-head", { rotation: 0, duration: 0.12, ease: "back.out(3)" }, 8.2);
    tl.to("#s06a-rig", { y: -14, duration: 0.1, ease: "power3.out" }, 8.2);
    tl.to("#s06a-rig", { y: 0, duration: 0.25, ease: "power2.inOut" }, 8.35);
    tl.to("#s06a-brows", { y: -10, duration: 0.1 }, 8.2);
    pow(tl, "#s06-bang", 8.2, 1.2, 10);
    tl.fromTo("#s06-sweat", { opacity: 0, y: 0 }, { opacity: 1, y: 30, duration: 0.8, ease: "power1.in" }, 8.4);
    tl.to("#s06-sweat", { opacity: 0, duration: 0.2 }, 9.4);
    tl.to("#s06a-eyes", { scaleY: 1, transformOrigin: "50% 50%", duration: 0.3, ease: "power2.out" }, 8.9);
    look(tl, "s06a", -5, 0, 9.0);`;
  return scene("s06", 10, { bg: "#7c9cc0", svg, defs, html, js });
}

// ---------------- S7 Dispersal ----------------
export function s07() {
  let cols = "";
  for (let c = 0; c < 6; c++) {
    let u = "";
    const left = c < 3;
    for (let j = 0; j < 4; j++)
      for (let i = 0; i < 6; i++)
        u += `<use href="#s07-sf${(i + j) % 4}" x="${(left ? 120 : 1180) + (c % 3) * 210 + i * 30}" y="${560 + j * 70}" width="62" height="88"/>`;
    cols += `<g class="s07-col ${left ? "s07-left" : "s07-right"}">${u}</g>`;
  }
  const svg = `
    <rect width="1920" height="1080" fill="url(#s07-sky)"/>
    <rect y="620" width="1920" height="460" fill="#5c605a"/>
    <g id="s07-hq">
      <rect x="1230" y="250" width="560" height="380" fill="#c7b89a"/><rect x="1230" y="250" width="560" height="40" fill="#8e2424"/>
      ${[0, 1, 2, 3].map((i) => `<rect x="${1270 + i * 130}" y="320" width="70" height="90" fill="#6d7f95"/>`).join("")}
      <rect x="1440" y="460" width="120" height="170" fill="#4a3526"/>
      <rect id="s07-door" x="1440" y="460" width="120" height="170" fill="#6b4a2e"/>
      <text x="1510" y="445" text-anchor="middle" font-family="AmrSub" font-weight="800" font-size="28" fill="#15110d">QƏRARGAH</text>
    </g>
    <g id="s07-cols">${cols}</g>
    ${place(amiraslan("s07a", "uniform"), 600, 700, 0.28)}`;
  const defs = `<linearGradient id="s07-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c9cc0"/><stop offset="1" stop-color="#e8cfa2"/></linearGradient>${soldierSymbols("s07")}`;
  const html = `<div id="s07-cap" class="caption-box" style="left:150px; top:150px; font-family:'AmrSub'; font-weight:800;">TƏDBİR BİTDİ. HAMI XİDMƏTİ OTAQLARINA!</div>`;
  const js = `
    tl.fromTo("#s07-cap", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, 0.3);
    tl.to("#s07-cap", { opacity: 0, duration: 0.3 }, 5.4);
    tl.fromTo(".s07-left", { x: 0 }, { x: -1400, duration: 5.5, ease: "power1.in", stagger: 0.25 }, 0.6);
    tl.fromTo(".s07-right", { x: 0 }, { x: 1300, duration: 5.5, ease: "power1.in", stagger: 0.25 }, 0.8);
    tl.fromTo(".s07-col", { y: 0 }, { y: -6, duration: 0.25, yoyo: true, repeat: 23, ease: "sine.inOut" }, 0.6);
    // Əmiraslan walks to the HQ door
    tl.fromTo("#s07a-rig", { x: 0 }, { x: 3100, duration: 5.2, ease: "none" }, 0.8);
    tl.fromTo("#s07a-rig", { y: 0 }, { y: -18, duration: 0.22, yoyo: true, repeat: 23, ease: "sine.inOut" }, 0.8);
    tl.fromTo("#s07a-legL", { rotation: -8, transformOrigin: "50% 0%" }, { rotation: 8, duration: 0.44, yoyo: true, repeat: 11, ease: "sine.inOut" }, 0.8);
    tl.fromTo("#s07a-legR", { rotation: 8, transformOrigin: "50% 0%" }, { rotation: -8, duration: 0.44, yoyo: true, repeat: 11, ease: "sine.inOut" }, 0.8);
    tl.fromTo("#s07-door", { scaleX: 1, transformOrigin: "0% 50%" }, { scaleX: 0.1, duration: 0.4, ease: "power2.out" }, 5.3);
    tl.to("#s07a-rig", { opacity: 0, duration: 0.3 }, 6.0);
    tl.to("#s07-door", { scaleX: 1, duration: 0.3, ease: "power2.in" }, 6.4);`;
  return scene("s07", 7, { bg: "#7c9cc0", svg, defs, html, js });
}

// ---------------- S8 Office ----------------
export function s08() {
  const svg = `
    <g id="s08-A">
      <rect width="1920" height="1080" fill="#b9b49a"/>
      <rect y="820" width="1920" height="260" fill="#6d5640"/>
      <rect y="810" width="1920" height="14" fill="#4a3a2a"/>
      <g id="s08-window"><rect x="1180" y="220" width="420" height="330" fill="#9cc2e0"/><rect x="1180" y="220" width="420" height="330" fill="none" stroke="#f1ece0" stroke-width="16"/><path d="M 1390,220 L 1390,550 M 1180,385 L 1600,385" stroke="#f1ece0" stroke-width="10"/></g>
      <g id="s08-sunpatch" opacity=".25"><path d="M 1180,880 L 1600,880 L 1500,1080 L 1020,1080 Z" fill="#fff4cf"/></g>
      <g transform="translate(260,300)"><rect x="-5" y="0" width="10" height="520" fill="#8d8a84"/><g transform="translate(5,10)">${azFlag("s08f", 200, 100)}</g></g>
      <g id="s08-clock" transform="translate(820,250)"><circle r="62" fill="#f4efe2" stroke="#2b2622" stroke-width="8"/>
        <g id="s08-hh"><line x1="0" y1="0" x2="0" y2="-32" stroke="#2b2622" stroke-width="7" stroke-linecap="round"/></g>
        <g id="s08-mm"><line x1="0" y1="0" x2="0" y2="-48" stroke="#2b2622" stroke-width="4" stroke-linecap="round"/></g><circle r="5" fill="#8e2424"/></g>
      <g id="s08-door-wrap"><rect x="420" y="380" width="230" height="440" fill="#3a2a1e"/><rect id="s08-door" x="420" y="380" width="230" height="440" fill="#7a5638"/><circle cx="625" cy="610" r="10" fill="${C.gold}"/></g>
      <g id="s08-desk"><rect x="960" y="640" width="640" height="40" fill="#5a3f2a"/><rect x="990" y="680" width="40" height="160" fill="#4a3322"/><rect x="1530" y="680" width="40" height="160" fill="#4a3322"/>
        <rect x="1250" y="470" width="230" height="160" rx="8" fill="#1d1f24"/><rect x="1262" y="482" width="206" height="132" fill="#4d78a8"/><rect x="1345" y="630" width="40" height="14" fill="#2a2c31"/></g>
      ${place(amiraslan("s08w", "uniform"), 535, 470, 0.38)}
    </g>
    <g id="s08-B" opacity="0">
      <rect width="1920" height="1080" fill="#b9b49a"/>
      <g transform="translate(160,240)"><rect x="-5" y="0" width="10" height="700" fill="#8d8a84"/><g transform="translate(5,10)">${azFlag("s08g", 260, 130)}</g></g>
      <g id="s08-clockB" transform="translate(1660,280)"><circle r="80" fill="#f4efe2" stroke="#2b2622" stroke-width="10"/>
        <g id="s08-hhB"><line x1="0" y1="0" x2="0" y2="-40" stroke="#2b2622" stroke-width="9" stroke-linecap="round"/></g>
        <g id="s08-mmB"><line x1="0" y1="0" x2="0" y2="-62" stroke="#2b2622" stroke-width="5" stroke-linecap="round"/></g><circle r="6" fill="#8e2424"/></g>
      ${place(amiraslan("s08a", "uniform"), 820, 330, 1.05)}
      <g id="s08-monitor"><path d="M 1180,480 L 1560,440 L 1560,760 L 1180,740 Z" fill="#1d1f24"/><path d="M 1196,494 L 1546,458 L 1546,744 L 1196,726 Z" fill="#3c6390"/>
        <path d="M 1220,520 L 1480,500 M 1220,560 L 1420,544 M 1220,600 L 1500,584 M 1220,640 L 1380,628" stroke="#a9c6e6" stroke-width="10" stroke-linecap="round" class="s08-lines"/>
        <rect x="1340" y="750" width="60" height="70" fill="#2a2c31"/></g>
      <rect x="0" y="800" width="1920" height="280" fill="#5a3f2a"/><rect x="0" y="800" width="1920" height="16" fill="#6e5036"/>
      <g id="s08-keys"><rect x="640" y="850" width="520" height="80" rx="10" fill="#2a2c31"/>${[0, 1, 2].map((r) => [...Array(12)].map((_, i) => `<rect x="${660 + i * 41}" y="${860 + r * 22}" width="34" height="16" rx="3" fill="#4a4d55"/>`).join("")).join("")}</g>
      <g id="s08-handL"><ellipse cx="780" cy="860" rx="40" ry="28" fill="${C.skin}"/></g><g id="s08-handR"><ellipse cx="1020" cy="860" rx="40" ry="28" fill="${C.skin}"/></g>
      <g id="s08-mug" transform="translate(1300,780)"><rect x="-40" y="-70" width="80" height="80" rx="8" fill="#f1ece0"/><path d="M 40,-50 q 30,0 30,20 q 0,20 -30,20" stroke="#f1ece0" stroke-width="10" fill="none"/>
        <path class="s08-steam" d="M -10,-90 q -12,-20 0,-40 q 12,-20 0,-40" stroke="#fff" stroke-width="6" fill="none" opacity=".5"/><path class="s08-steam" d="M 14,-96 q -12,-20 0,-40 q 12,-20 0,-40" stroke="#fff" stroke-width="5" fill="none" opacity=".4"/></g>
      <rect id="s08-glow" x="0" y="0" width="1920" height="1080" fill="#5a8fd0" opacity="0" style="mix-blend-mode:screen"/>
    </g>`;
  const html = `<div id="s08-tik" class="comic" style="left:560px; top:660px; font-size:64px;">TIK-TIK-TIK</div>
    <div id="s08-tik2" class="comic" style="left:880px; top:600px; font-size:56px;">TAQ! TIK!</div>`;
  const js = `
    // A — enters the office (0–3.6)
    tl.fromTo("#s08-door", { scaleX: 1, transformOrigin: "0% 50%" }, { scaleX: 0.12, duration: 0.5, ease: "power2.out" }, 0.4);
    tl.fromTo("#s08w-rig", { opacity: 0, x: 0 }, { opacity: 1, duration: 0.3 }, 0.6);
    tl.to("#s08w-rig", { x: 1950, duration: 2.6, ease: "power1.inOut" }, 1.0);
    tl.fromTo("#s08w-rig", { y: 0 }, { y: -16, duration: 0.2, yoyo: true, repeat: 11, ease: "sine.inOut", immediateRender: false }, 1.0);
    tl.fromTo("#s08w-legL", { rotation: -9, transformOrigin: "50% 0%" }, { rotation: 9, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, 1.0);
    tl.fromTo("#s08w-legR", { rotation: 9, transformOrigin: "50% 0%" }, { rotation: -9, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, 1.0);
    tl.to("#s08-door", { scaleX: 1, duration: 0.4, ease: "power2.in" }, 1.8);
    // B — at the desk (3.6–12)
    tl.set("#s08-A", { opacity: 0 }, 3.6); tl.set("#s08-B", { opacity: 1 }, 3.6);
    tl.fromTo("#s08a-rig", { y: -60 }, { y: 0, duration: 0.45, ease: "back.out(1.6)" }, 3.6);
    tl.fromTo("#s08-glow", { opacity: 0 }, { opacity: 0.12, duration: 0.6 }, 4.0);
    look(tl, "s08a", 7, 2, 4.2);
    blink(tl, "s08a", 4.6);
    tl.fromTo("#s08-handL", { y: 0 }, { y: -14, duration: 0.09, yoyo: true, repeat: 37, ease: "none" }, 4.9);
    tl.fromTo("#s08-handR", { y: -14 }, { y: 0, duration: 0.11, yoyo: true, repeat: 30, ease: "none" }, 4.9);
    pow(tl, "#s08-tik", 5.0, 1.4, -4);
    pow(tl, "#s08-tik2", 7.2, 1.0, 6);
    tl.fromTo(".s08-lines", { opacity: 0.2 }, { opacity: 1, duration: 0.3, stagger: 0.6 }, 5.0);
    tl.fromTo(".s08-steam", { y: 0, opacity: 0.5 }, { y: -30, opacity: 0, duration: 1.6, repeat: 4, ease: "power1.out", stagger: 0.5 }, 3.6);
    blink(tl, "s08a", 7.9);
    tl.to("#s08a-brows", { y: 5, duration: 0.3 }, 8.4);
    // time-lapse: clock hands spin
    tl.fromTo("#s08-mmB", { rotation: 0, svgOrigin: "0 0" }, { rotation: 1080, svgOrigin: "0 0", duration: 3.2, ease: "power2.in" }, 8.6);
    tl.fromTo("#s08-hhB", { rotation: 30, svgOrigin: "0 0" }, { rotation: 120, svgOrigin: "0 0", duration: 3.2, ease: "power2.in" }, 8.6);
    tl.fromTo("#s08-cam", { scale: 1, transformOrigin: "86% 26%" }, { scale: 1.6, duration: 3.2, ease: "power2.in" }, 8.6);`;
  return scene("s08", 12, { bg: "#b9b49a", svg, html, js });
}

// ---------------- S9 "3 saat keçdi..." ----------------
export function s09() {
  const text = "3 saat keçdi...";
  const letters = [...text]
    .map((ch) => `<span class="s09-l">${ch === " " ? "&nbsp;" : ch}</span>`)
    .join("");
  const html = `<div id="s09-t">${letters}</div>`;
  const css = `#s09-t { position: absolute; left: 0; right: 0; top: 470px; text-align: center; font-family: "AmrSub"; font-weight: 800; font-size: 92px; color: #f1ece0; letter-spacing: 0.04em; }
    .s09-l { display: inline-block; opacity: 0; }`;
  const js = `
    tl.fromTo(".s09-l", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.05, stagger: 0.09, ease: "none" }, 0.6);
    tl.to("#s09-t", { opacity: 0, filter: "blur(8px)", duration: 0.5, ease: "power2.in" }, 4.1);`;
  return scene("s09", 5, { bg: "#000", html, css, js });
}

export { star, SKY_DAY };
