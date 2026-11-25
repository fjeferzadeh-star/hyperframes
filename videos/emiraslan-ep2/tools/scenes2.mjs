// Scenes 10–17: car, phone call, rear view, rooftop, alley, flight, fight, ending.
import { amiraslan, woman, thief, rng, C } from "./lib.mjs";
import { scene, place } from "./scene.mjs";

const PLATE = "99-OS-663";
const CAR = { body: "#4a5058", bodyLight: "#646b75", bodyDeep: "#33383e", glass: "#27323d" };

function plate(x, y, w = 220) {
  const h = w * 0.22;
  return `<g transform="translate(${x},${y})">
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="5" fill="#f4f2ec" stroke="#1a1a1a" stroke-width="3"/>
    <rect x="${-w / 2 + 5}" y="${-h / 2 + 5}" width="${w * 0.13}" height="${h * 0.32}" fill="#0092bc"/><rect x="${-w / 2 + 5}" y="${-h / 2 + 5 + h * 0.32}" width="${w * 0.13}" height="${h * 0.12}" fill="#e4002b"/><rect x="${-w / 2 + 5}" y="${-h / 2 + 5 + h * 0.44}" width="${w * 0.13}" height="${h * 0.12}" fill="#00af66"/>
    <text x="${-w / 2 + 5 + w * 0.065}" y="${h / 2 - 5}" text-anchor="middle" font-family="AmrSub" font-weight="800" font-size="${h * 0.3}" fill="#0b2e7a">AZ</text>
    <text x="${w * 0.07}" y="${h * 0.24}" text-anchor="middle" font-family="AmrSub" font-weight="800" font-size="${h * 0.66}" fill="#111" letter-spacing="1">${PLATE}</text>
  </g>`;
}

// Mid-size sedan (2019 Fusion silhouette): long hood, fastback roofline, trapezoid grille. Side view, facing left.
function carSide(p, driver = true) {
  return `<g id="${p}-car">
    <ellipse cx="0" cy="168" rx="430" ry="20" fill="#000" opacity=".35"/>
    <path d="M -440,110 C -440,70 -420,52 -360,44 L -240,30 C -180,-30 -110,-62 -10,-66 C 90,-68 170,-50 230,-4 L 360,20 C 420,30 444,60 446,100 L 446,130 C 446,146 434,150 420,150 L -420,150 C -436,150 -440,140 -440,110 Z" fill="${CAR.body}"/>
    <path d="M -440,96 L 446,96" stroke="${CAR.bodyLight}" stroke-width="5"/>
    <path d="M -222,28 C -170,-22 -110,-50 -14,-54 C 80,-56 150,-40 206,0 Z" fill="${CAR.glass}"/>
    <path d="M -30,-54 L -36,28" stroke="${CAR.body}" stroke-width="12"/><path d="M 100,-50 L 120,10" stroke="${CAR.body}" stroke-width="10"/>
    ${driver ? `<g transform="translate(-110,-6) scale(0.17)"><path d="M -74,-40 C -78,-96 -45,-130 2,-130 C 48,-130 78,-100 74,-40 C 74,40 50,96 0,102 C -50,96 -74,40 -74,-40 Z" fill="${C.skin}"/><path d="M -74,-40 C -80,-104 -45,-142 2,-142 C 50,-142 80,-106 74,-40 Z" fill="${C.hair}"/></g>` : ""}
    <path d="M -440,70 L -470,72 L -470,98 L -440,100 Z" fill="#2a2d31"/>
    <path d="M -436,64 L -380,58 L -384,74 L -436,78 Z" fill="#f3f0d8"/>
    <path d="M 420,40 L 446,46 L 446,70 L 424,68 Z" fill="#c42a2a"/>
    <path d="M -150,40 L -140,140 M 60,30 L 64,140" stroke="${CAR.bodyDeep}" stroke-width="3"/>
    <rect x="-120" y="62" width="34" height="8" rx="4" fill="${CAR.bodyLight}"/><rect x="90" y="58" width="34" height="8" rx="4" fill="${CAR.bodyLight}"/>
    <g id="${p}-wf" transform="translate(-280,140)"><circle r="64" fill="#141414"/><circle r="40" fill="#9aa1a8"/><g class="${p}-spokes"><path d="M 0,-38 L 0,38 M -38,0 L 38,0 M -27,-27 L 27,27 M -27,27 L 27,-27" stroke="#5e646a" stroke-width="7"/></g><circle r="10" fill="#3a3e43"/></g>
    <g id="${p}-wr" transform="translate(290,140)"><circle r="64" fill="#141414"/><circle r="40" fill="#9aa1a8"/><g class="${p}-spokes"><path d="M 0,-38 L 0,38 M -38,0 L 38,0 M -27,-27 L 27,27 M -27,27 L 27,-27" stroke="#5e646a" stroke-width="7"/></g><circle r="10" fill="#3a3e43"/></g>
  </g>`;
}

// Front view: wide trapezoid grille with horizontal bars, slim headlights, plate below.
function carFront(p) {
  return `<g id="${p}-car">
    <ellipse cx="0" cy="250" rx="420" ry="30" fill="#000" opacity=".35"/>
    <rect x="-370" y="160" width="90" height="100" rx="14" fill="#141414"/><rect x="280" y="160" width="90" height="100" rx="14" fill="#141414"/>
    <path d="M -400,40 C -400,0 -380,-20 -330,-30 L -250,-170 C -230,-200 230,-200 250,-170 L 330,-30 C 380,-20 400,0 400,40 L 400,190 C 400,215 380,225 360,225 L -360,225 C -380,225 -400,215 -400,190 Z" fill="${CAR.body}"/>
    <path d="M -236,-160 C -220,-182 220,-182 236,-160 L 300,-40 L -300,-40 Z" fill="${CAR.glass}"/>
    <g transform="translate(-80,-110) scale(0.36)"><path d="M -74,-40 C -78,-96 -45,-130 2,-130 C 48,-130 78,-100 74,-40 C 74,40 50,96 0,102 C -50,96 -74,40 -74,-40 Z" fill="${C.skin}"/><path d="M -74,-40 C -80,-104 -45,-142 2,-142 C 50,-142 80,-106 74,-40 Z" fill="${C.hair}"/><path d="M -60,-44 L -12,-48 L -12,-38 L -58,-35 Z M 60,-44 L 12,-48 L 12,-38 L 58,-35 Z" fill="#1b1411"/><path d="M -70,8 C -66,62 -40,100 0,102 C 40,100 66,62 70,8 C 50,46 -50,46 -70,8 Z" fill="#33251e" opacity=".42"/><rect x="-190" y="140" width="380" height="200" fill="${C.olive}"/></g>
    <path d="M -300,-40 L 300,-40 L 330,-24 L -330,-24 Z" fill="${CAR.bodyDeep}"/>
    <path d="M -380,10 L -230,20 L -240,48 L -386,40 Z" fill="#f3f0d8"/><path d="M 380,10 L 230,20 L 240,48 L 386,40 Z" fill="#f3f0d8"/>
    <path d="M -200,40 L 200,40 L 170,150 L -170,150 Z" fill="#202327"/>
    ${[0, 1, 2, 3, 4].map((i) => `<path d="M ${-196 + i * 6},${58 + i * 20} L ${196 - i * 6},${58 + i * 20}" stroke="#7d848c" stroke-width="5"/>`).join("")}
    <ellipse cx="0" cy="58" rx="34" ry="14" fill="#9aa1a8"/><ellipse cx="0" cy="58" rx="27" ry="9" fill="#1d3f7a"/>
    ${plate(0, 188, 230)}
  </g>`;
}

function carRear(p) {
  return `<g id="${p}-car">
    <ellipse cx="0" cy="250" rx="420" ry="30" fill="#000" opacity=".35"/>
    <rect x="-370" y="160" width="90" height="100" rx="14" fill="#141414"/><rect x="280" y="160" width="90" height="100" rx="14" fill="#141414"/>
    <path d="M -400,40 C -400,0 -380,-20 -330,-30 L -240,-150 C -220,-180 220,-180 240,-150 L 330,-30 C 380,-20 400,0 400,40 L 400,190 C 400,215 380,225 360,225 L -360,225 C -380,225 -400,215 -400,190 Z" fill="${CAR.body}"/>
    <path d="M -226,-140 C -210,-162 210,-162 226,-140 L 280,-44 L -280,-44 Z" fill="${CAR.glass}"/>
    <g transform="translate(-90,-96) scale(0.3)"><path d="M -74,-40 C -78,-96 -45,-130 2,-130 C 48,-130 78,-100 74,-40 C 74,40 50,96 0,102 C -50,96 -74,40 -74,-40 Z" fill="${C.hair}"/></g>
    <path d="M -390,0 L -150,14 L -150,44 L -394,34 Z" fill="#c42a2a"/><path d="M 390,0 L 150,14 L 150,44 L 394,34 Z" fill="#c42a2a"/>
    <path d="M -150,26 L 150,26" stroke="#9aa1a8" stroke-width="6"/>
    <text x="0" y="90" text-anchor="middle" font-family="AmrSub" font-weight="800" font-size="34" fill="#c9ced4" letter-spacing="8">FUSION</text>
    ${plate(0, 150, 230)}
  </g>`;
}

function roadside(p, seed) {
  const r = rng(seed);
  let city = "",
    trees = "",
    poles = "";
  for (let i = 0; i < 16; i++) {
    const w = 90 + r() * 120,
      h = 120 + r() * 260,
      x = i * 260;
    city += `<rect x="${x}" y="${640 - h}" width="${w}" height="${h}" fill="#8c98a8" opacity=".75"/>`;
  }
  for (let i = 0; i < 14; i++) {
    const x = i * 300 + r() * 80;
    trees += `<g transform="translate(${x},620)"><rect x="-10" y="0" width="20" height="90" fill="#4a3526"/><circle cx="0" cy="-20" r="${60 + r() * 30}" fill="${r() > 0.5 ? "#4f7340" : "#3d5f34"}"/></g>`;
  }
  for (let i = 0; i < 10; i++)
    poles += `<g transform="translate(${i * 420},0)"><rect x="0" y="420" width="12" height="380" fill="#6b6f74"/><path d="M 6,424 q 40,-20 80,-4" stroke="#6b6f74" stroke-width="8" fill="none"/></g>`;
  return {
    city: `<g id="${p}-city">${city}${city.replace(/x="(\d+)/g, (m, x) => `x="${+x + 4160}`)}</g>`,
    trees: `<g id="${p}-trees">${trees}</g>`,
    poles: `<g id="${p}-poles">${poles}</g>`,
  };
}

// ---------------- S10 Car exterior ----------------
export function s10() {
  const rs = roadside("s10", 5);
  const svg = `
    <g id="s10-A">
      <rect width="1920" height="1080" fill="url(#s10-sky)"/>
      <path d="M 0,620 L 1920,620 L 1920,1080 L 0,1080 Z" fill="#5d7a48"/>
      <path d="M 860,560 L 1060,560 L 1700,1080 L 220,1080 Z" fill="#3f4247"/>
      <path d="M 958,570 L 962,570 L 980,1080 L 940,1080 Z" fill="#e9e2c6" opacity=".7"/>
      <g transform="translate(960,640)"><g id="s10-front">${carFront("s10f")}</g></g>
    </g>
    <g id="s10-B" opacity="0">
      <rect width="1920" height="1080" fill="url(#s10-sky)"/>
      ${rs.city}
      ${rs.trees}
      <rect y="700" width="1920" height="380" fill="#3f4247"/>
      <g id="s10-dash">${[...Array(14)].map((_, i) => `<rect x="${i * 300}" y="880" width="160" height="14" fill="#e9e2c6"/>`).join("")}</g>
      <g transform="translate(980,700)"><g id="s10-side">${carSide("s10s")}</g></g>
      <g id="s10-notes">${["♪", "♫", "♪"].map((n, i) => `<text class="s10-note" x="${880 + i * 50}" y="640" font-size="56" fill="#ffd84a" stroke="#15110d" stroke-width="3" font-family="AmrSub">${n}</text>`).join("")}</g>
      ${rs.poles}
    </g>`;
  const defs = `<linearGradient id="s10-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6d9ccc"/><stop offset="1" stop-color="#d9e4ea"/></linearGradient>`;
  const html = `<div id="s10-cap" class="caption-box" style="left:150px; top:150px; font-family:'AmrSub'; font-weight:800;">FORD FUSION · 2019 · ${PLATE}</div>
    <div id="s10-vroom" class="comic" style="left:1180px; top:380px; font-size:110px;">VRUUM!</div>`;
  const js = `
    // A — approaches head-on (0–3.4)
    tl.fromTo("#s10-front", { scale: 0.32, y: -60, transformOrigin: "50% 50%" }, { scale: 1.05, y: 120, duration: 3.4, ease: "power2.in" }, 0);
    tl.fromTo("#s10-front", { rotation: -0.6 }, { rotation: 0.6, duration: 0.18, yoyo: true, repeat: 17, ease: "sine.inOut", immediateRender: false }, 0);
    tl.fromTo("#s10-cap", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, 0.6);
    tl.to("#s10-cap", { opacity: 0, duration: 0.3 }, 3.1);
    // B — tracking alongside (3.4–7)
    tl.set("#s10-A", { opacity: 0 }, 3.4); tl.set("#s10-B", { opacity: 1 }, 3.4);
    tl.fromTo("#s10-city", { x: 0 }, { x: 600, duration: 3.6, ease: "none" }, 3.4);
    tl.fromTo("#s10-trees", { x: -400 }, { x: 1600, duration: 3.6, ease: "none" }, 3.4);
    tl.fromTo("#s10-dash", { x: -1200 }, { x: 1200, duration: 3.6, ease: "none" }, 3.4);
    tl.fromTo("#s10-poles", { x: -2200 }, { x: 2000, duration: 3.6, ease: "none" }, 3.4);
    tl.fromTo(".s10s-spokes", { rotation: 0, transformOrigin: "50% 50%" }, { rotation: -1440, duration: 3.6, ease: "none" }, 3.4);
    tl.fromTo("#s10-side", { y: 0 }, { y: -3, duration: 0.15, yoyo: true, repeat: 23, ease: "sine.inOut" }, 3.4);
    tl.fromTo(".s10-note", { y: 0, opacity: 0 }, { y: -120, opacity: 1, duration: 1.2, stagger: 0.35, ease: "power1.out" }, 3.6);
    tl.to(".s10-note", { opacity: 0, duration: 0.4 }, 5.5);
    pow(tl, "#s10-vroom", 3.5, 1.3, -6);`;
  return scene("s10", 7, { bg: "#6d9ccc", svg, defs, html, js });
}

// ---------------- S11 Inside the car: phone call ----------------
export function s11() {
  const r = rng(77);
  let passing = "";
  for (let i = 0; i < 10; i++)
    passing += `<g transform="translate(${i * 380},0)"><rect x="0" y="${180 + r() * 60}" width="${120 + r() * 140}" height="600" fill="${r() > 0.5 ? "#8c98a8" : "#9aa6b4"}"/><circle cx="220" cy="560" r="${70 + r() * 30}" fill="#4f7340"/></g>`;
  const svg = `
    <rect width="1920" height="1080" fill="#1f2328"/>
    <g id="s11-window-clip"><rect x="0" y="140" width="1920" height="560" fill="#a9c4dc"/>
      <g id="s11-pass">${passing}${passing.replace(/translate\((\d+)/g, (m, x) => `translate(${+x + 3800}`)}</g></g>
    <path d="M 0,140 L 1920,140 L 1920,190 L 0,250 Z" fill="#2a2e34"/>
    <rect x="0" y="0" width="1920" height="150" fill="#2a2e34"/>
    <path d="M 1500,140 L 1600,140 L 1440,700 L 1340,700 Z" fill="#2a2e34"/>
    <g id="s11-seat"><path d="M 560,420 C 560,330 1160,330 1160,420 L 1180,1080 L 540,1080 Z" fill="#3a3e45"/><rect x="740" y="250" width="240" height="180" rx="40" fill="#43474f"/></g>
    ${place(amiraslan("s11a", "uniform"), 860, 420, 1.0)}
    <g id="s11-wheel" transform="translate(760,980)"><g id="s11-wheel-in"><circle r="250" fill="none" stroke="#141414" stroke-width="44"/><path d="M -240,0 L 240,0 M 0,0 L 0,240" stroke="#141414" stroke-width="40"/><circle r="70" fill="#202227"/><ellipse cx="0" cy="0" rx="30" ry="14" fill="#9aa1a8"/></g></g>
    <g id="s11-handL"><ellipse cx="530" cy="900" rx="46" ry="34" fill="${C.skin}"/></g>
    <g id="s11-handR"><ellipse cx="990" cy="900" rx="46" ry="34" fill="${C.skin}"/></g>
    <path d="M 1100,880 C 1300,840 1700,840 1920,860 L 1920,1080 L 1100,1080 Z" fill="#26292e"/>
    <g id="s11-radio" transform="translate(1500,950)"><rect x="-180" y="-60" width="360" height="120" rx="12" fill="#121417"/><rect x="-160" y="-44" width="230" height="56" rx="6" fill="#0d2b2a"/>
      <text x="-148" y="0" font-family="AmrSub" font-weight="800" font-size="30" fill="#5ff2c9">FM 101.1</text>
      <g id="s11-bars">${[...Array(8)].map((_, i) => `<rect class="s11-bar" x="${-150 + i * 26}" y="20" width="16" height="22" fill="#5ff2c9" opacity="${i < 3 ? 1 : 0.2}"/>`).join("")}</g>
      <g id="s11-knob" transform="translate(120,0)"><circle r="40" fill="#2a2d33" stroke="#555" stroke-width="4"/><path d="M 0,0 L 0,-32" stroke="#ddd" stroke-width="6" stroke-linecap="round"/></g></g>
    <g id="s11-phone" transform="translate(1270,560)"><g id="s11-phone-in"><rect x="-90" y="-160" width="180" height="320" rx="24" fill="#0f0f12"/><rect x="-80" y="-146" width="160" height="292" rx="16" fill="#1b2a3f"/>
      <g id="s11-ring"><text x="0" y="-80" text-anchor="middle" font-family="AmrSub" font-weight="800" font-size="22" fill="#fff">Zəng gəlir...</text>
        <circle cx="0" cy="-20" r="34" fill="#4a5b75"/><path d="M -14,-26 a 14,14 0 1 1 28,0 a 14,14 0 1 1 -28,0 M -24,4 q 24,-24 48,0" fill="#c9d4e4"/>
        <circle cx="-40" cy="90" r="24" fill="#d33a3a"/><circle id="s11-accept" cx="40" cy="90" r="24" fill="#2fb35a"/></g>
      <g id="s11-talking" opacity="0"><text x="0" y="-60" text-anchor="middle" font-family="AmrSub" font-weight="800" font-size="22" fill="#fff">Danışıq</text><text id="s11-timer" x="0" y="-26" text-anchor="middle" font-family="AmrSub" font-weight="600" font-size="22" fill="#8fd3a8">00:00</text><circle cx="0" cy="90" r="24" fill="#d33a3a"/></g>
      <g id="s11-ended" opacity="0"><text x="0" y="-40" text-anchor="middle" font-family="AmrSub" font-weight="800" font-size="22" fill="#ffb4b4">Zəng bitdi</text></g></g></g>`;
  const html = `
    <div id="s11-trr" class="comic" style="left:1330px; top:280px; font-size:76px;">TRRRR!</div>
    <div id="s11-q" class="comic" style="left:1060px; top:230px; font-size:110px; color:#ff5a3a;">?!</div>
    <div id="s11-lie" class="caption-box" style="left:150px; top:170px; font-family:'AmrSub'; font-weight:800;">* ƏSLİNDƏ, İŞDƏ DEYİL...</div>
    <div id="s11-ding" class="comic" style="left:1100px; top:300px; font-size:90px; color:#fff6b0;">✦</div>
    <div id="s11-up" class="comic" style="left:1330px; top:720px; font-size:64px;">SƏS: MAX!</div>
    <div id="s11-notes" style="position:absolute; inset:0; pointer-events:none;">${["♪", "♫", "♪", "♫"].map((n, i) => `<div class="s11-note comic" style="left:${1400 + i * 70}px; top:800px; font-size:60px; font-family:'AmrSub';">${n}</div>`).join("")}</div>`;
  const js = `
    // Scenery streams past the window the whole time.
    tl.fromTo("#s11-pass", { x: -3800 }, { x: 0, duration: 20, ease: "none" }, 0);
    tl.fromTo("#s11a-rig", { y: 0 }, { y: -4, duration: 0.2, yoyo: true, repeat: 99, ease: "sine.inOut" }, 0);
    // Head-bobbing to the radio (0–2)
    tl.fromTo("#s11a-head", { rotation: -4, transformOrigin: "50% 90%" }, { rotation: 4, duration: 0.42, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.1);
    mouth(tl, "s11a", "smile", 0.2);
    tl.fromTo("#s11-handR", { y: 0 }, { y: -12, duration: 0.21, yoyo: true, repeat: 7, ease: "power1.inOut" }, 0.1);
    blink(tl, "s11a", 1.2);
    // Phone rings (2–3.6)
    tl.fromTo("#s11-phone-in", { rotation: 0, transformOrigin: "50% 50%" }, { rotation: 4, duration: 0.05, yoyo: true, repeat: 31, ease: "none" }, 2.0);
    pow(tl, "#s11-trr", 2.0, 1.4, 8);
    tl.to("#s11a-head", { rotation: 0, duration: 0.2 }, 2.0);
    mouth(tl, "s11a", "closed", 2.1);
    look(tl, "s11a", 8, 3, 2.2);
    tl.to("#s11a-brows", { y: -6, duration: 0.15 }, 2.2);
    // He answers (3.6) — radio volume down
    tl.to("#s11-handR", { x: 270, y: -330, duration: 0.45, ease: "power2.inOut" }, 3.2);
    tl.fromTo("#s11-accept", { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.4, duration: 0.1, yoyo: true, repeat: 1 }, 3.65);
    tl.set("#s11-ring", { opacity: 0 }, 3.75); tl.set("#s11-talking", { opacity: 1 }, 3.75);
    tl.to("#s11-handR", { x: 0, y: 0, duration: 0.45, ease: "power2.inOut" }, 3.9);
    tl.to(".s11-bar", { opacity: (i) => (i < 1 ? 1 : 0.2), duration: 0.2 }, 3.8);
    look(tl, "s11a", 0, 0, 4.0);
    tl.to("#s11a-brows", { y: 0, duration: 0.2 }, 4.0);
    // timer ticks while they talk
    ${[...Array(12)].map((_, i) => `tl.set("#s11-timer", { textContent: "00:${String(i).padStart(2, "0")}" }, ${(3.75 + i).toFixed(2)});`).join("\n    ")}
    // Dialogue — times match the subtitle track (scene starts at 76 s)
    // T: "Salam, Əmiraslan, necəsən?" 4.0–6.2 (he listens, smiles)
    mouth(tl, "s11a", "smile", 4.6); blink(tl, "s11a", 5.4);
    // Ə: "Çox sağ ol, sən necəsən?" 6.4–8.6
    talk(tl, "s11a", 6.4, 8.4, "open", "smile");
    // T: "İşdəsən?" 8.8–10.2 — the question lands
    mouth(tl, "s11a", "closed", 8.8);
    tl.to("#s11a-eyes", { scaleY: 1.3, transformOrigin: "50% 50%", duration: 0.1, ease: "power3.out" }, 9.6);
    look(tl, "s11a", -9, 0, 9.7, 0.12);
    pow(tl, "#s11-q", 9.6, 0.9, 6);
    tl.to("#s11a-eyes", { scaleY: 1, transformOrigin: "50% 50%", duration: 0.2 }, 10.4);
    // Ə: "Hə, işdəyəm..." 10.8–12.6 — the lie, said looking at the road
    look(tl, "s11a", 0, 0, 10.6);
    talk(tl, "s11a", 10.8, 12.2, "open", "closed");
    tl.fromTo("#s11-lie", { opacity: 0, rotation: -6, scale: 1.3 }, { opacity: 1, rotation: -3, scale: 1, duration: 0.25, ease: "back.out(2)" }, 11.4);
    tl.to("#s11-lie", { opacity: 0, duration: 0.25 }, 13.6);
    // T: "Yaxşı, işdə ol." 13.0–14.6
    blink(tl, "s11a", 13.4);
    // Hang up (15)
    tl.set("#s11-talking", { opacity: 0 }, 15.0); tl.set("#s11-ended", { opacity: 1 }, 15.0);
    // The smirk + wink (15.4–17.6)
    mouth(tl, "s11a", "smirk", 15.4);
    tl.to("#s11a-brows", { y: -8, rotation: -3, transformOrigin: "50% 50%", duration: 0.25, ease: "back.out(2)" }, 15.5);
    tl.to("#s11a-eyeR", { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.08 }, 16.2);
    tl.to("#s11a-eyeR", { scaleY: 1, transformOrigin: "50% 50%", duration: 0.12 }, 16.55);
    tl.fromTo("#s11-ding", { opacity: 0, scale: 0.2, rotation: 0 }, { opacity: 1, scale: 1, rotation: 90, duration: 0.3, ease: "back.out(2)" }, 16.2);
    tl.to("#s11-ding", { opacity: 0, scale: 0.4, duration: 0.25 }, 16.8);
    tl.fromTo("#s11-cam", { scale: 1, transformOrigin: "45% 35%" }, { scale: 1.25, duration: 0.6, ease: "power3.out" }, 15.4);
    tl.to("#s11-cam", { scale: 1, duration: 0.6, ease: "power2.inOut" }, 17.4);
    // Volume up (17.8–20)
    tl.to("#s11-handR", { x: 470, y: 40, duration: 0.45, ease: "power2.inOut" }, 17.6);
    tl.fromTo("#s11-knob", { rotation: 0 }, { rotation: 160, svgOrigin: "1620 950", duration: 0.6, ease: "power2.out" }, 18.1);
    tl.to(".s11-bar", { opacity: 1, duration: 0.05, stagger: 0.06 }, 18.1);
    pow(tl, "#s11-up", 18.2, 1.3, -5);
    tl.fromTo(".s11-note", { y: 0, opacity: 0 }, { y: -260, opacity: 1, duration: 0.8, stagger: 0.18, ease: "power1.out" }, 18.3);
    tl.to(".s11-note", { opacity: 0, duration: 0.3 }, 19.65);
    mouth(tl, "s11a", "smile", 18.4);
    tl.fromTo("#s11a-head", { rotation: -5 }, { rotation: 5, duration: 0.3, yoyo: true, repeat: 4, ease: "sine.inOut", transformOrigin: "50% 90%", immediateRender: false }, 18.5);`;
  return scene("s11", 20, { bg: "#1f2328", svg, html, js });
}

// ---------------- S12 Rear view, drives away ----------------
export function s12() {
  const svg = `
    <rect width="1920" height="1080" fill="url(#s12-sky)"/>
    <path d="M 0,560 C 400,520 800,560 1200,530 C 1500,510 1700,540 1920,520 L 1920,1080 L 0,1080 Z" fill="#5d7a48"/>
    <path d="M 900,560 L 1020,560 L 1760,1080 L 160,1080 Z" fill="#3f4247"/>
    <g id="s12-dash">${[...Array(8)].map((_, i) => `<rect class="s12-d" x="955" y="${600 + i * 70}" width="10" height="34" fill="#e9e2c6"/>`).join("")}</g>
    <g transform="translate(960,820)"><g id="s12-rear">${carRear("s12r")}</g></g>
    <g id="s12-notes">${["♪", "♫", "♪"].map((n, i) => `<text class="s12-note" x="${900 + i * 60}" y="660" font-size="60" fill="#ffd84a" stroke="#15110d" stroke-width="3" font-family="AmrSub">${n}</text>`).join("")}</g>`;
  const defs = `<linearGradient id="s12-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e59a62"/><stop offset="1" stop-color="#f5d9a8"/></linearGradient>`;
  const js = `
    tl.fromTo("#s12-rear", { scale: 1, y: 0, transformOrigin: "50% 50%" }, { scale: 0.16, y: -270, duration: 5.5, ease: "power2.in" }, 0.4);
    tl.fromTo(".s12-note", { y: 0, opacity: 0 }, { y: -140, opacity: 1, duration: 1.2, stagger: 0.3 }, 0.3);
    tl.to(".s12-note", { opacity: 0, duration: 0.4 }, 2.15);
    tl.fromTo("#s12-dash", { y: 0 }, { y: 70, duration: 0.35, repeat: 16, ease: "none" }, 0);`;
  return scene("s12", 6, { bg: "#e59a62", svg, defs, js });
}

function skyline(p, seed, baseY, color, lit) {
  const r = rng(seed);
  let b = "";
  let x = -40;
  while (x < 1980) {
    const w = 90 + r() * 140,
      h = 160 + r() * 360;
    b += `<rect x="${x.toFixed(0)}" y="${(baseY - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${color}"/>`;
    if (lit)
      for (let wy = baseY - h + 20; wy < baseY - 20; wy += 34)
        for (let wx = x + 14; wx < x + w - 20; wx += 28)
          if (r() > 0.62)
            b += `<rect x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="12" height="16" fill="#ffd98a" opacity="${(0.5 + r() * 0.5).toFixed(2)}"/>`;
    x += w + 6;
  }
  return `<g id="${p}">${b}</g>`;
}

const NIGHT_DEFS = (p) =>
  `<linearGradient id="${p}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1022"/><stop offset=".7" stop-color="#1d2546"/><stop offset="1" stop-color="#3a3560"/></linearGradient>`;

function nightSky(p, seed) {
  const r = rng(seed);
  let stars = "";
  for (let i = 0; i < 80; i++)
    stars += `<circle cx="${(r() * 1920).toFixed(0)}" cy="${(r() * 500).toFixed(0)}" r="${(1 + r() * 2).toFixed(1)}" fill="#fff" opacity="${(0.3 + r() * 0.6).toFixed(2)}"/>`;
  return `<rect width="1920" height="1080" fill="url(#${p}-sky)"/>${stars}<circle cx="1560" cy="230" r="80" fill="#f2ecd2"/><circle cx="1590" cy="215" r="70" fill="#1a2140" opacity=".0"/><circle cx="1560" cy="230" r="160" fill="#f2ecd2" opacity=".08"/>`;
}

// ---------------- S13 Rooftop, smoking ----------------
export function s13() {
  const svg = `
    ${nightSky("s13", 31)}
    ${skyline("s13-far", 41, 820, "#232a48", true)}
    ${skyline("s13-near", 42, 900, "#171c33", true)}
    <rect x="0" y="880" width="1920" height="200" fill="#2b2a33"/><rect x="0" y="870" width="1920" height="22" fill="#3d3c47"/>
    <g transform="translate(1600,620)"><rect x="-60" y="0" width="120" height="160" fill="#3d3c47"/><path d="M -70,0 L 70,0 L 0,-60 Z" fill="#3d3c47"/><rect x="-10" y="160" width="20" height="100" fill="#3d3c47"/></g>
    <path d="M 300,560 L 300,880 M 260,600 L 340,600 M 270,640 L 330,640" stroke="#3d3c47" stroke-width="8"/>
    ${place(amiraslan("s13h", "hero").replace('<g id="s13h-handR"></g>', '<g id="s13h-handR"><g transform="translate(150,470) rotate(-12)"><rect x="0" y="-5" width="56" height="10" rx="3" fill="#f1ece0"/><rect x="48" y="-5" width="10" height="10" fill="#ff6a2a"/></g></g>'), 900, 300, 0.62)}
    <g id="s13-smoke">${[0, 1, 2, 3, 4, 5].map((i) => `<circle class="s13-puff" cx="922" cy="572" r="${12 + i * 4}" fill="#c9c9d6" opacity="0"/>`).join("")}</g>
    <g id="s13-mouthsmoke">${[0, 1, 2].map((i) => `<circle class="s13-exhale" cx="900" cy="350" r="${16 + i * 8}" fill="#d4d4e0" opacity="0"/>`).join("")}</g>`;
  const html = `
    <div id="s13-think" style="position:absolute; left:1060px; top:150px; width:300px; height:150px; background:#fff; border:5px solid #15110d; border-radius:50%; opacity:0; display:flex; align-items:center; justify-content:center; font-family:'AmrComic'; font-size:56px; color:#15110d;">. . .</div>
    <div id="s13-t1" style="position:absolute; left:1010px; top:300px; width:40px; height:24px; background:#fff; border:4px solid #15110d; border-radius:50%; opacity:0;"></div>
    <div id="s13-t2" style="position:absolute; left:985px; top:335px; width:22px; height:14px; background:#fff; border:4px solid #15110d; border-radius:50%; opacity:0;"></div>
    <div id="s13-bang" class="comic" style="left:1020px; top:130px; font-size:160px; color:#ff5a3a;">!</div>`;
  const js = `
    tl.fromTo("#s13-cam", { scale: 1.25, transformOrigin: "47% 40%" }, { scale: 1.0, duration: 4, ease: "power2.inOut" }, 0);
    tl.fromTo("#s13h-cape", { skewX: -2, transformOrigin: "50% 0%" }, { skewX: 4, duration: 0.9, yoyo: true, repeat: 13, ease: "sine.inOut" }, 0);
    // right arm holds the cigarette at chest; raises it to the mouth
    tl.set("#s13h-armR", { rotation: 35, transformOrigin: "50% 3%" }, 0);
    tl.fromTo(".s13-puff", { y: 0, x: 0, opacity: 0, scale: 0.5 }, { keyframes: { y: [0, -90, -170], x: [0, 20, 45], opacity: [0, 0.4, 0], scale: [0.5, 1.2, 1.8] }, duration: 1.3, stagger: 0.22, ease: "none" }, 0);
    blink(tl, "s13h", 1.0);
    tl.to("#s13h-armR", { rotation: 138, duration: 0.6, ease: "power2.inOut" }, 1.6);
    tl.to("#s13h-eyes", { scaleY: 0.4, transformOrigin: "50% 50%", duration: 0.3 }, 2.2);
    tl.to("#s13h-armR", { rotation: 35, duration: 0.6, ease: "power2.inOut" }, 3.0);
    tl.fromTo(".s13-puff", { y: 0, x: 0, opacity: 0, scale: 0.5 }, { keyframes: { y: [0, -90, -170], x: [0, 20, 45], opacity: [0, 0.4, 0], scale: [0.5, 1.2, 1.8] }, duration: 1.4, stagger: 0.28, ease: "none", immediateRender: false }, 5.0);
    tl.to("#s13h-eyes", { scaleY: 1, transformOrigin: "50% 50%", duration: 0.3 }, 3.1);
    mouth(tl, "s13h", "open", 3.2); mouth(tl, "s13h", "closed", 4.2);
    tl.fromTo(".s13-exhale", { y: 0, x: 0, opacity: 0, scale: 0.5 }, { keyframes: { y: [0, -70, -140], x: [0, 30, 60], opacity: [0, 0.55, 0], scale: [0.5, 1.5, 2.4] }, duration: 1.6, stagger: 0.18, ease: "none" }, 3.2);
    // thinking
    tl.to("#s13h-head", { rotation: 6, transformOrigin: "50% 90%", duration: 0.8, ease: "power2.inOut" }, 4.6);
    look(tl, "s13h", 6, -5, 4.8, 0.4);
    tl.fromTo(["#s13-t2", "#s13-t1", "#s13-think"], { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.2, ease: "back.out(2)" }, 5.2);
    blink(tl, "s13h", 6.8);
    tl.to(["#s13-think", "#s13-t1", "#s13-t2"], { opacity: 0, duration: 0.25 }, 9.0);
    // he notices
    tl.to("#s13h-head", { rotation: -8, duration: 0.18, ease: "power3.out" }, 9.6);
    look(tl, "s13h", -9, 5, 9.6, 0.1);
    tl.to("#s13h-eyes", { scaleY: 1.3, transformOrigin: "50% 50%", duration: 0.1 }, 9.6);
    tl.to("#s13h-brows", { y: -10, duration: 0.12 }, 9.6);
    pow(tl, "#s13-bang", 9.65, 1.8, -8);
    tl.fromTo("#s13-cam", { scale: 1 }, { scale: 1.35, transformOrigin: "47% 30%", duration: 0.4, ease: "power3.out", immediateRender: false }, 9.65);
    tl.to("#s13h-brows", { y: 6, duration: 0.3 }, 11.4);
    tl.to("#s13h-eyes", { scaleY: 0.75, transformOrigin: "50% 50%", duration: 0.3 }, 11.4);`;
  return scene("s13", 13, { bg: "#0b1022", svg, defs: NIGHT_DEFS("s13"), html, js });
}

function alleyBg(p) {
  let bricks = "";
  for (let y = 0; y < 1080; y += 40)
    for (let x = (y / 40) % 2 ? -40 : 0; x < 1920; x += 80)
      bricks += `<rect x="${x}" y="${y}" width="76" height="36" fill="#4a2f2a" opacity=".6"/>`;
  return `
    <rect width="1920" height="1080" fill="#3a2522"/>${bricks}
    <rect x="760" y="0" width="400" height="760" fill="url(#${p}-deep)"/>
    <rect x="0" y="760" width="1920" height="320" fill="#2b2a2f"/>
    <path d="M 760,760 L 1160,760 L 1920,1080 L 0,1080 Z" fill="#34333a"/>
    <g transform="translate(330,0)"><rect x="-8" y="120" width="16" height="660" fill="#202024"/><path d="M 0,124 q 60,-30 110,0" stroke="#202024" stroke-width="12" fill="none"/><rect x="90" y="120" width="44" height="22" fill="#ffe7a0"/>
      <path d="M 92,142 L 132,142 L 360,780 L -130,780 Z" fill="#ffe7a0" opacity=".14"/></g>
    <g id="${p}-cans" transform="translate(1690,640)"><rect x="-70" y="0" width="140" height="160" rx="10" fill="#4f5a5e"/><rect x="-80" y="-14" width="160" height="22" rx="6" fill="#606c70"/>
      <rect x="90" y="40" width="110" height="120" rx="8" fill="#56636a"/><rect x="82" y="28" width="126" height="18" rx="6" fill="#68767c"/></g>`;
}
const ALLEY_DEFS = (p) =>
  `<linearGradient id="${p}-deep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d0f1c"/><stop offset="1" stop-color="#1c1d26"/></linearGradient>`;

// ---------------- S14 Alley: the bag snatch ----------------
export function s14() {
  const svg = `
    ${alleyBg("s14")}
    ${place(woman("s14w"), 1000, 330, 0.62)}
    ${place(thief("s14t"), 640, 340, 0.6)}
    <g id="s14-cat" transform="translate(1660,640)"><path d="M -40,0 C -40,-40 40,-40 40,0 L 40,20 L -40,20 Z" fill="#111"/><circle cx="30" cy="-30" r="22" fill="#111"/><path d="M 16,-46 L 20,-64 L 30,-48 M 36,-48 L 46,-64 L 48,-44" fill="#111"/><circle cx="24" cy="-32" r="4" fill="#ffe06a"/><circle cx="38" cy="-32" r="4" fill="#ffe06a"/></g>`;
  const html = `<div id="s14-aaa" class="comic" style="left:1150px; top:180px; font-size:130px; color:#ff5a7a;">AAAA!</div>
    <div id="s14-mew" class="comic" style="left:1600px; top:470px; font-size:54px;">MİYAV!</div>`;
  const js = `
    // woman walks in from the right, thief lurks
    tl.fromTo("#s14w-rig", { x: 900 }, { x: 0, duration: 1.4, ease: "power1.out" }, 0);
    tl.fromTo("#s14w-rig", { y: 0 }, { y: -10, duration: 0.18, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, 0);
    tl.fromTo("#s14t-rig", { x: -500, opacity: 0.0 }, { x: -60, opacity: 1, duration: 0.6, ease: "power3.out" }, 1.2);
    look(tl, "s14t", 6, 0, 1.4);
    // grabs the bag strap — tug of war
    tl.to("#s14t-armR", { rotation: -70, transformOrigin: "50% 3%", duration: 0.25, ease: "power3.out" }, 1.9);
    tl.to("#s14w-bag", { x: -200, duration: 0.25, ease: "power3.out" }, 2.0);
    tl.to("#s14w-armR", { rotation: 60, transformOrigin: "50% 3%", duration: 0.25, ease: "power3.out" }, 2.0);
    tl.to("#s14w-bag", { x: -150, duration: 0.18, yoyo: true, repeat: 7, ease: "sine.inOut" }, 2.3);
    tl.to("#s14t-rig", { x: -30, duration: 0.18, yoyo: true, repeat: 7, ease: "sine.inOut" }, 2.3);
    mouth(tl, "s14w", "shout", 2.1);
    tl.to("#s14w-eyes", { scaleY: 1.3, transformOrigin: "50% 50%", duration: 0.1 }, 2.1);
    tl.to("#s14w-brows", { y: -10, duration: 0.1 }, 2.1);
    talk(tl, "s14w", 2.2, 5.6, "shout", "open");
    pow(tl, "#s14-aaa", 2.2, 3.0, 6);
    mouth(tl, "s14t", "smirk", 2.3);
    shake(tl, "#s14-cam", 2.2, 8, 8);
    // the cat bolts
    tl.to("#s14-cat", { x: 400, y: -60, duration: 0.5, ease: "power2.in" }, 2.6);
    pow(tl, "#s14-mew", 2.5, 0.7, -10);
    tl.fromTo("#s14-cam", { scale: 1, transformOrigin: "45% 50%" }, { scale: 1.15, duration: 4, ease: "power1.inOut", immediateRender: false }, 2.0);`;
  return scene("s14", 6, { bg: "#3a2522", svg, defs: ALLEY_DEFS("s14"), html, js });
}

// ---------------- S15 Take-off and flight ----------------
export function s15() {
  let speed = "";
  const r = rng(91);
  for (let i = 0; i < 24; i++)
    speed += `<rect class="s15-line" x="${(r() * 1920).toFixed(0)}" y="${(160 + r() * 760).toFixed(0)}" width="${(200 + r() * 300).toFixed(0)}" height="4" fill="#fff" opacity=".35"/>`;
  const svg = `
    <g id="s15-A">
      ${nightSky("s15", 31)}
      ${skyline("s15-far", 41, 820, "#232a48", true)}
      ${skyline("s15-near", 42, 900, "#171c33", true)}
      <rect x="0" y="880" width="1920" height="200" fill="#2b2a33"/><rect x="0" y="870" width="1920" height="22" fill="#3d3c47"/>
      ${place(amiraslan("s15h", "hero").replace('<g id="s15h-handR"></g>', '<g id="s15h-handR"><g transform="translate(150,470) rotate(-12)"><rect x="0" y="-5" width="56" height="10" rx="3" fill="#f1ece0"/><rect x="48" y="-5" width="10" height="10" fill="#ff6a2a"/></g></g>'), 900, 300, 0.62)}
      <g id="s15-cig" opacity="0"><rect x="900" y="566" width="35" height="7" rx="3" fill="#f1ece0"/><rect x="929" y="566" width="7" height="7" fill="#ff6a2a"/></g>
    </g>
    <g id="s15-B" opacity="0">
      ${nightSky("s15b", 33)}
      <g id="s15-cityB">${skyline("s15-b1", 51, 1000, "#171c33", true)}</g>
      ${speed}
      <g transform="translate(960,520)"><g id="s15-fly"><g transform="rotate(78) scale(0.5) translate(0,-380)">${amiraslan("s15f", "hero")}</g></g></g>
    </g>`;
  const defs = NIGHT_DEFS("s15") + NIGHT_DEFS("s15b");
  const html = `<div id="s15-viu" class="comic" style="left:560px; top:180px; font-size:170px;">VIUUŞ!</div>`;
  const js = `
    // A — flicks the cigarette away and launches (0–2.2)
    tl.set("#s15h-armR", { rotation: 35, transformOrigin: "50% 3%" }, 0);
    tl.to("#s15h-armR", { rotation: -30, duration: 0.15, ease: "power3.out" }, 0.25);
    tl.set("#s15h-handR", { opacity: 0 }, 0.32); tl.set("#s15-cig", { opacity: 1 }, 0.32);
    tl.to("#s15-cig", { x: 620, y: 300, rotation: 540, transformOrigin: "50% 50%", duration: 0.9, ease: "power1.in" }, 0.32);
    tl.to("#s15h-brows", { y: 8, duration: 0.15 }, 0.2);
    mouth(tl, "s15h", "smirk", 0.3);
    // crouch (anticipation) then stretch upward
    tl.to("#s15h-rig", { scaleY: 0.86, scaleX: 1.06, transformOrigin: "50% 100%", duration: 0.3, ease: "power2.out" }, 0.8);
    tl.to("#s15h-armL", { rotation: 170, transformOrigin: "50% 3%", duration: 0.25, ease: "power2.in" }, 1.0);
    tl.to("#s15h-armR", { rotation: -170, transformOrigin: "50% 3%", duration: 0.25, ease: "power2.in" }, 1.0);
    tl.to("#s15h-rig", { scaleY: 1.25, scaleX: 0.85, y: -2200, duration: 0.45, ease: "power3.in" }, 1.15);
    tl.to("#s15h-cape", { scaleY: 1.3, transformOrigin: "50% 0%", duration: 0.3 }, 1.15);
    pow(tl, "#s15-viu", 1.2, 1.4, -8);
    shake(tl, "#s15-cam", 1.15, 10, 6);
    // B — flight across the city (2.2–5)
    tl.set("#s15-A", { opacity: 0 }, 2.2); tl.set("#s15-B", { opacity: 1 }, 2.2);
    tl.fromTo("#s15-cityB", { x: 0 }, { x: -1200, duration: 2.8, ease: "none" }, 2.2);
    tl.fromTo(".s15-line", { x: 600 }, { x: -2200, duration: 0.7, repeat: 3, ease: "none" }, 2.2);
    tl.fromTo("#s15-fly", { x: -1300, y: 120 }, { x: 1500, y: -160, duration: 2.6, ease: "power1.inOut" }, 2.3);
    tl.fromTo("#s15f-cape", { skewX: -8, transformOrigin: "50% 0%" }, { skewX: 8, duration: 0.15, yoyo: true, repeat: 17, ease: "sine.inOut" }, 2.2);
    tl.set("#s15f-armL", { rotation: 175, transformOrigin: "50% 3%" }, 2.2);
    tl.set("#s15f-armR", { rotation: -175, transformOrigin: "50% 3%" }, 2.2);
    tl.set("#s15f-brows", { y: 6 }, 2.2);`;
  return scene("s15", 5, { bg: "#0b1022", svg, defs, html, js });
}

// ---------------- S16 The fight and the thanks ----------------
export function s16() {
  const svg = `
    ${alleyBg("s16")}
    ${place(woman("s16w"), 1200, 330, 0.62)}
    ${place(thief("s16t"), 760, 340, 0.6)}
    ${place(amiraslan("s16h", "hero"), 460, 300, 0.64)}
    <g id="s16-dust">${[0, 1, 2, 3, 4].map((i) => `<ellipse class="s16-d" cx="${300 + i * 80}" cy="860" rx="60" ry="18" fill="#9a96a0" opacity="0"/>`).join("")}</g>
    <g id="s16-bagfloor" opacity="0" transform="translate(900,800)"><path d="M 22,2 C 14,-50 64,-50 56,2" stroke="#5a2e1e" stroke-width="7" fill="none"/><rect x="0" y="0" width="80" height="62" rx="10" fill="#7b3f2a"/><rect x="0" y="20" width="80" height="8" fill="#5a2e1e"/><circle cx="40" cy="24" r="7" fill="${C.gold}"/></g>
    <g id="s16-stars" opacity="0" transform="translate(1700,600)">${[0, 1, 2].map((i) => `<text class="s16-st" x="${Math.cos(i * 2.1) * 60}" y="${Math.sin(i * 2.1) * 20}" font-size="40" fill="#ffd84a" stroke="#15110d" stroke-width="2" text-anchor="middle">★</text>`).join("")}</g>
    <rect id="s16-flash" width="1920" height="1080" fill="#fff" opacity="0"/>`;
  const html = `
    <div id="s16-gup" class="comic" style="left:200px; top:560px; font-size:120px;">GUP!</div>
    <div id="s16-burst" style="position:absolute; left:610px; top:180px; width:620px; height:360px; background:#e83a2a; clip-path:polygon(50% 0%,58% 30%,85% 8%,70% 38%,100% 40%,72% 55%,95% 85%,62% 66%,55% 100%,45% 68%,15% 92%,30% 58%,0% 50%,30% 40%,12% 10%,42% 30%); opacity:0;"></div>
    <div id="s16-bam" class="comic" style="left:640px; top:200px; font-size:250px; color:#ffef5a;">BAM!</div>
    <div id="s16-sap" class="comic" style="left:1480px; top:420px; font-size:110px;">ŞAPP!</div>
    <div id="s16-heart" class="comic" style="left:1010px; top:170px; font-size:150px; color:#ff4a6a; font-family:'AmrSub';">♥</div>
    <div id="s16-heart2" class="comic" style="left:1180px; top:230px; font-size:90px; color:#ff4a6a; font-family:'AmrSub';">♥</div>`;
  const js = `
    // hero drops in from above and lands (0–1.2)
    tl.fromTo("#s16h-rig", { y: -1600 }, { y: 0, duration: 0.45, ease: "power3.in" }, 0.2);
    tl.fromTo("#s16h-rig", { scaleY: 1 }, { scaleY: 0.85, scaleX: 1.08, transformOrigin: "50% 100%", duration: 0.08, ease: "power2.out", immediateRender: false }, 0.65);
    tl.to("#s16h-rig", { scaleY: 1, scaleX: 1, duration: 0.35, ease: "back.out(2.5)" }, 0.73);
    tl.fromTo(".s16-d", { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 0.8, scale: 1.6, x: (i) => (i - 2) * 60, duration: 0.4, ease: "expo.out" }, 0.65);
    tl.to(".s16-d", { opacity: 0, duration: 0.5 }, 1.05);
    pow(tl, "#s16-gup", 0.65, 0.9, -6);
    shake(tl, "#s16-cam", 0.65, 14, 7);
    tl.fromTo("#s16h-cape", { skewX: -3, transformOrigin: "50% 0%" }, { skewX: 4, duration: 0.8, yoyo: true, repeat: 15, ease: "sine.inOut" }, 0);
    // thief turns, scared; woman hopeful
    mouth(tl, "s16t", "open", 0.9);
    tl.to("#s16t-eyes", { scale: 1.4, transformOrigin: "50% 50%", duration: 0.12, ease: "back.out(3)" }, 0.9);
    look(tl, "s16t", -6, 0, 0.9);
    tl.to("#s16t-rig", { x: -20, duration: 0.2 }, 0.9);
    mouth(tl, "s16w", "open", 1.0);
    look(tl, "s16w", -6, 0, 1.0);
    tl.to("#s16h-brows", { y: 8, duration: 0.15 }, 1.2);
    // wind-up + punch (2.0–2.6)
    tl.to("#s16h-armL", { rotation: 30, transformOrigin: "50% 3%", duration: 0.3, ease: "power2.out" }, 1.9);
    tl.to("#s16h-rig", { x: -30, duration: 0.3, ease: "power2.out" }, 1.9);
    tl.to("#s16h-rig", { x: 90, duration: 0.12, ease: "power4.in" }, 2.3);
    tl.to("#s16h-armL", { rotation: -88, duration: 0.12, ease: "power4.in" }, 2.3);
    tl.set("#s16-flash", { opacity: 0.8 }, 2.42); tl.to("#s16-flash", { opacity: 0, duration: 0.2 }, 2.46);
    tl.fromTo("#s16-burst", { opacity: 0, scale: 0.3, rotation: -10 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.18, ease: "back.out(2)" }, 2.42);
    tl.to("#s16-burst", { opacity: 0, scale: 1.2, duration: 0.2 }, 3.6);
    pow(tl, "#s16-bam", 2.42, 1.2, -8);
    shake(tl, "#s16-cam", 2.42, 24, 10);
    // thief flies into the bins
    mouth(tl, "s16t", "shout", 2.42);
    tl.to("#s16t-rig", { x: 1560, rotation: 540, transformOrigin: "50% 50%", duration: 0.85, ease: "power1.out" }, 2.45);
    tl.to("#s16t-rig", { y: -700, duration: 0.42, ease: "power2.out" }, 2.45);
    tl.to("#s16t-rig", { y: 120, duration: 0.43, ease: "power2.in" }, 2.87);
    tl.set("#s16-bagfloor", { opacity: 1 }, 2.5);
    tl.fromTo("#s16-bagfloor", { y: -200, rotation: -40 }, { y: 0, rotation: 0, duration: 0.5, ease: "bounce.out" }, 2.5);
    tl.to("#s16t-rig", { rotation: 610, y: 280, duration: 0.25, ease: "power2.in" }, 3.3);
    pow(tl, "#s16-sap", 3.4, 1.2, 8);
    tl.fromTo("#s16-cans", { rotation: 0, transformOrigin: "50% 100%" }, { rotation: 22, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }, 3.4);
    tl.set("#s16-stars", { opacity: 1 }, 3.6);
    tl.fromTo("#s16-stars", { rotation: 0, svgOrigin: "1700 600" }, { rotation: 720, svgOrigin: "1700 600", duration: 6, ease: "none" }, 3.6);
    tl.to("#s16h-armL", { rotation: 0, duration: 0.4, ease: "power2.inOut" }, 2.8);
    tl.to("#s16h-rig", { x: 0, duration: 0.4, ease: "power2.inOut" }, 2.8);
    tl.to("#s16h-brows", { y: 0, duration: 0.3 }, 3.2);
    // picks up the bag (4.6–6)
    tl.to("#s16h-rig", { x: 560, duration: 0.8, ease: "power2.inOut" }, 4.4);
    tl.to("#s16h-rig", { scaleY: 0.92, transformOrigin: "50% 100%", duration: 0.25, ease: "power2.out" }, 5.2);
    tl.to("#s16h-armR", { rotation: 20, transformOrigin: "50% 3%", duration: 0.25 }, 5.2);
    tl.set("#s16-bagfloor", { opacity: 0 }, 5.45);
    tl.set("#s16w-bag", { opacity: 0 }, 0);
    tl.to("#s16h-rig", { scaleY: 1, duration: 0.3, ease: "back.out(2)" }, 5.5);
    // offers it to her (6–7)
    mouth(tl, "s16h", "smile", 6.0);
    tl.to("#s16h-rig", { x: 700, duration: 0.7, ease: "power2.inOut" }, 6.0);
    tl.to("#s16h-armR", { rotation: -60, duration: 0.4, ease: "power2.out" }, 6.5);
    tl.set("#s16w-bag", { opacity: 1 }, 7.0);
    tl.fromTo("#s16w-bag", { x: -120 }, { x: 0, duration: 0.3, ease: "power2.out" }, 7.0);
    tl.to("#s16h-armR", { rotation: 0, duration: 0.4 }, 7.2);
    look(tl, "s16w", 0, 0, 6.6);
    // hearts in her eyes, the hug (7.6–9.6)
    mouth(tl, "s16w", "smile", 7.4);
    tl.to(["#s16w-eyeL", "#s16w-eyeR"], { opacity: 0, duration: 0.1 }, 7.6);
    tl.fromTo("#s16w-hearts", { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 7.6);
    tl.to("#s16w-rig", { x: -170, duration: 0.45, ease: "power3.out" }, 8.4);
    tl.to("#s16w-armL", { rotation: 80, transformOrigin: "50% 3%", duration: 0.35, ease: "power2.out" }, 8.5);
    tl.to("#s16w-head", { rotation: -10, transformOrigin: "50% 90%", duration: 0.35 }, 8.5);
    tl.to("#s16h-head", { rotation: 5, transformOrigin: "50% 90%", duration: 0.35 }, 8.7);
    tl.fromTo(["#s16-heart", "#s16-heart2"], { opacity: 0, scale: 0.2, y: 0 }, { opacity: 1, scale: 1, y: -60, duration: 0.5, stagger: 0.2, ease: "back.out(2.5)" }, 8.7);
    tl.to(["#s16-heart", "#s16-heart2"], { opacity: 0, y: -160, duration: 0.6, stagger: 0.2 }, 11.4);
    tl.fromTo("#s16-cam", { scale: 1, transformOrigin: "60% 40%" }, { scale: 1.3, duration: 4, ease: "power1.inOut", immediateRender: false }, 8.4);`;
  return scene("s16", 13, { bg: "#3a2522", svg, defs: ALLEY_DEFS("s16"), html, js });
}

// ---------------- S17 "Davamı var..." ----------------
export function s17() {
  const text = "Davamı var...";
  const letters = [...text]
    .map((ch) => `<span class="s17-l">${ch === " " ? "&nbsp;" : ch}</span>`)
    .join("");
  const html = `<div id="s17-t">${letters}</div>
    <div id="s17-logo"><span class="schwa">e</span>MİRASLAN</div>`;
  const css = `#s17-t { position: absolute; left: 0; right: 0; top: 400px; text-align: center; font-family: "AmrTitle"; font-size: 170px; color: #e2c46a; letter-spacing: 0.05em; text-shadow: 0 6px 0 #6b5420; }
    .s17-l { display: inline-block; opacity: 0; }
    #s17-logo { position: absolute; left: 0; right: 0; top: 640px; text-align: center; font-family: "AmrTitle"; font-size: 64px; color: #efe3c4; letter-spacing: 0.4em; opacity: 0; }
    .schwa { display: inline-block; transform: translateY(-0.13em) rotate(180deg) scale(1.3, 1.5); transform-origin: 50% 60%; margin: 0 0.08em; }`;
  const js = `
    tl.fromTo(".s17-l", { opacity: 0, y: 30, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, stagger: 0.07, ease: "expo.out" }, 1.0);
    tl.fromTo("#s17-logo", { opacity: 0 }, { opacity: 0.85, duration: 0.8, ease: "power2.out" }, 2.4);
    tl.to(["#s17-t", "#s17-logo"], { opacity: 0, duration: 0.6, ease: "power2.in" }, 6.2);`;
  return scene("s17", 7, { bg: "#000", html, css, js });
}
