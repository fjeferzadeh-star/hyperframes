// Shared drawing helpers for the Əmiraslan episode.
// Every function returns an SVG string. `p` is a unique id prefix per instance.
// Characters are drawn in a local space: head centre at (0,0), feet at y≈880.

export const C = {
  skin: "#c4926e",
  skinShade: "#a87657",
  skinDeep: "#8f6047",
  hair: "#231a16",
  rim: "#6f86b8",
  olive: "#4f5b3a",
  oliveShade: "#414c30",
  oliveLight: "#5e6b46",
  trouser: "#47523a",
  boot: "#15120f",
  gold: "#d6b45a",
  goldDeep: "#a98a2c",
  red: "#9b2d23",
  navy: "#2c3550",
  navyLight: "#38436a",
  navyShade: "#222a40",
  cape: "#8e2424",
  capeShade: "#6c1a1a",
  glove: "#a32a2a",
};

export function fontFaces() {
  return `
    @font-face { font-family: "AmrTitle"; src: url("assets/fonts/league-gothic-latin-400-normal.woff2") format("woff2"); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
    @font-face { font-family: "AmrTitle"; src: url("assets/fonts/league-gothic-latin-ext-400-normal.woff2") format("woff2"); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+1E00-1E9F, U+20A0-20C0, U+2C60-2C7F, U+A720-A7FF; }
    @font-face { font-family: "AmrComic"; src: url("assets/fonts/archivo-black-latin-400-normal.woff2") format("woff2"); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
    @font-face { font-family: "AmrComic"; src: url("assets/fonts/archivo-black-latin-ext-400-normal.woff2") format("woff2"); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+1E00-1E9F, U+20A0-20C0, U+2C60-2C7F, U+A720-A7FF; }
    @font-face { font-family: "AmrSub"; font-weight: 600; src: url("assets/fonts/montserrat-latin-600-normal.woff2") format("woff2"); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
    @font-face { font-family: "AmrSub"; font-weight: 600; src: url("assets/fonts/montserrat-latin-ext-600-normal.woff2") format("woff2"); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+1E00-1E9F, U+20A0-20C0, U+2C60-2C7F, U+A720-A7FF; }
    @font-face { font-family: "AmrSub"; font-weight: 800; src: url("assets/fonts/montserrat-latin-800-normal.woff2") format("woff2"); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
    @font-face { font-family: "AmrSub"; font-weight: 800; src: url("assets/fonts/montserrat-latin-ext-800-normal.woff2") format("woff2"); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+1E00-1E9F, U+20A0-20C0, U+2C60-2C7F, U+A720-A7FF; }
  `;
}

// Seeded PRNG used at build time so generated scenery is fixed in the HTML.
export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function star(cx, cy, r, fill, points = 5) {
  const pts = [];
  for (let i = 0; i < points * 2; i++) {
    const rr = i % 2 === 0 ? r : r * 0.45;
    const a = (Math.PI / points) * i - Math.PI / 2;
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="${fill}"/>`;
}

// ---------- Heads ----------

function mouths(p, lip = "#5a3428") {
  return `
  <g id="${p}-mouths">
    <g id="${p}-m-closed"><path d="M -17,63 Q 0,67 17,63" stroke="${lip}" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M -10,67 Q 0,72 10,67" stroke="${lip}" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/></g>
    <g id="${p}-m-open" opacity="0"><path d="M -15,59 Q 0,55 15,59 Q 13,78 0,80 Q -13,78 -15,59 Z" fill="#3a1a15"/><path d="M -9,73 Q 0,70 9,73 Q 6,79 0,79 Q -6,79 -9,73 Z" fill="#b2584e"/></g>
    <g id="${p}-m-shout" opacity="0"><path d="M -22,56 Q 0,50 22,56 Q 20,94 0,97 Q -20,94 -22,56 Z" fill="#30140f"/><path d="M -16,58 Q 0,55 16,58 L 15,63 Q 0,60 -15,63 Z" fill="#f1ede4"/><path d="M -12,85 Q 0,80 12,85 Q 8,94 0,94 Q -8,94 -12,85 Z" fill="#b2584e"/></g>
    <g id="${p}-m-smile" opacity="0"><path d="M -22,58 Q 0,78 22,58 Q 0,70 -22,58 Z" fill="#3a1a15"/><path d="M -20,59 Q 0,66 20,59 L 19,62 Q 0,68 -19,62 Z" fill="#f1ede4"/></g>
    <g id="${p}-m-smirk" opacity="0"><path d="M -16,65 Q 6,68 24,55" stroke="${lip}" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>
    <g id="${p}-m-yawn" opacity="0"><ellipse cx="0" cy="72" rx="16" ry="24" fill="#30140f"/><ellipse cx="0" cy="84" rx="9" ry="8" fill="#b2584e"/></g>
  </g>`;
}

function eye(p, side, cx, iris = "#5a3a22", lash = "#1e140f", lashes = false) {
  const s = side === "L" ? -1 : 1;
  return `
  <g id="${p}-eye${side}">
    <path d="M ${cx - 20},-20 Q ${cx},-34 ${cx + 20},-20 Q ${cx},-10 ${cx - 20},-20 Z" fill="#f3ece2"/>
    <g class="${p}-pupil"><circle cx="${cx + s * 1}" cy="-21" r="7.5" fill="${iris}"/><circle cx="${cx + s * 1}" cy="-21" r="3.6" fill="#0d0907"/><circle cx="${cx + s * 1 + 2.5}" cy="-23.5" r="1.6" fill="#fff" opacity=".8"/></g>
    <path d="M ${cx - 22},-19 Q ${cx},-36 ${cx + 22},-20" stroke="${lash}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    ${lashes ? `<path d="M ${cx + s * 20},-21 l ${s * 8},-6 M ${cx + s * 15},-26 l ${s * 6},-8" stroke="${lash}" stroke-width="2.5" stroke-linecap="round"/>` : ""}
    <path d="M ${cx - 16},-12 Q ${cx},-7 ${cx + 16},-12" stroke="#000" stroke-width="2" fill="none" opacity=".18"/>
  </g>`;
}

// Əmiraslan's head, matched to the reference: short dark hair with a cool rim light,
// heavy straight brows, line nose, close stubble beard and moustache.
export function amrHead(p) {
  return `
  <g id="${p}-head">
    <rect x="-30" y="70" width="60" height="70" fill="${C.skinShade}"/>
    <path d="M -30,96 Q 0,118 30,96 L 30,112 Q 0,128 -30,112 Z" fill="#000" opacity=".18"/>
    <ellipse cx="-76" cy="2" rx="14" ry="24" fill="${C.skinShade}"/>
    <ellipse cx="76" cy="2" rx="14" ry="24" fill="${C.skinShade}"/>
    <path d="M -72,-40 C -74,40 -50,96 0,102 C 50,96 74,40 72,-40 C 70,-92 40,-112 0,-112 C -40,-112 -70,-92 -72,-40 Z" fill="${C.skin}"/>
    <path d="M 8,-112 C 40,-112 70,-92 72,-40 C 74,40 50,96 8,102 C 40,80 52,30 50,-20 C 48,-70 30,-100 8,-112 Z" fill="#000" opacity=".1"/>
    <path d="M -70,8 C -66,62 -40,100 0,102 C 40,100 66,62 70,8 C 62,38 46,50 30,47 C 16,44 -16,44 -30,47 C -46,50 -62,38 -70,8 Z" fill="#33251e" opacity=".42"/>
    <path d="M -28,57 C -20,45 20,45 28,57 C 15,52 -15,52 -28,57 Z" fill="#241913" opacity=".75"/>
    <path d="M -6,86 Q 0,96 6,86 Z" fill="#241913" opacity=".5"/>
    ${mouths(p)}
    <path d="M 2,-30 C 4,0 6,18 11,27 C 6,34 -6,34 -13,29" stroke="#2b1a12" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M -10,30 q 3,-3 6,0 M 4,30 q 3,-3 6,0" stroke="#2b1a12" stroke-width="2" fill="none" opacity=".6"/>
    <path d="M -54,-8 Q -32,-2 -12,-8 M 12,-8 Q 32,-2 54,-8" stroke="#000" stroke-width="3" fill="none" opacity=".12"/>
    <g id="${p}-eyes">${eye(p, "L", -32)}${eye(p, "R", 32)}</g>
    <g id="${p}-brows">
      <path d="M -60,-44 L -12,-48 L -12,-38 L -58,-35 Z" fill="#1b1411"/>
      <path d="M 60,-44 L 12,-48 L 12,-38 L 58,-35 Z" fill="#1b1411"/>
    </g>
    <path d="M -74,-40 C -80,-104 -45,-142 2,-142 C 50,-142 80,-106 74,-40 C 71,-62 67,-78 58,-88 C 30,-98 -30,-100 -60,-86 C -68,-75 -72,-60 -74,-40 Z" fill="${C.hair}"/>
    <path d="M -50,-108 q 6,-5 12,0 M -20,-118 q 6,-5 12,0 M 10,-118 q 6,-5 12,0 M 38,-110 q 6,-5 12,0 M -36,-96 q 6,-5 12,0 M 22,-98 q 6,-5 12,0" stroke="#3a2c25" stroke-width="3" fill="none"/>
    <path d="M -74,-42 C -80,-104 -45,-140 2,-142" stroke="${C.rim}" stroke-width="3.5" fill="none"/>
    <path d="M -72,-38 C -73,10 -66,50 -48,78" stroke="${C.rim}" stroke-width="2" fill="none" opacity=".55"/>
  </g>`;
}

export function commanderHead(p) {
  return `
  <g id="${p}-head">
    <rect x="-34" y="70" width="68" height="70" fill="#a37456"/>
    <ellipse cx="-80" cy="4" rx="15" ry="25" fill="#a37456"/>
    <ellipse cx="80" cy="4" rx="15" ry="25" fill="#a37456"/>
    <path d="M -78,-40 C -82,44 -56,104 0,108 C 56,104 82,44 78,-40 C 76,-92 42,-112 0,-112 C -42,-112 -76,-92 -78,-40 Z" fill="#b8876a"/>
    <path d="M 8,-112 C 42,-112 76,-92 78,-40 C 82,44 56,104 8,108 C 44,84 56,30 54,-20 C 52,-70 32,-100 8,-112 Z" fill="#000" opacity=".1"/>
    <path d="M -76,-58 C -80,-40 -80,-20 -78,-5 L -66,-8 C -66,-30 -64,-46 -60,-60 Z M 76,-58 C 80,-40 80,-20 78,-5 L 66,-8 C 66,-30 64,-46 60,-60 Z" fill="#8a8580"/>
    <path d="M -50,40 Q -40,52 -32,46 M 50,40 Q 40,52 32,46" stroke="#6e4a37" stroke-width="2.5" fill="none"/>
    <path d="M -40,-58 Q 0,-64 40,-58" stroke="#6e4a37" stroke-width="2" fill="none" opacity=".6"/>
    ${mouths(p, "#5c3326")}
    <path d="M -38,58 C -30,40 30,40 38,58 C 30,62 18,54 0,54 C -18,54 -30,62 -38,58 Z" fill="#9b9690"/>
    <path d="M -38,58 C -30,40 30,40 38,58" stroke="#6f6a65" stroke-width="2" fill="none"/>
    <path d="M 2,-30 C 4,0 8,20 14,30 C 7,37 -7,37 -15,31" stroke="#3a2418" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <g id="${p}-eyes">${eye(p, "L", -34, "#3c2a1d")}${eye(p, "R", 34, "#3c2a1d")}</g>
    <g id="${p}-brows">
      <path d="M -64,-44 L -14,-50 L -14,-40 L -62,-34 Z" fill="#7d7873"/>
      <path d="M 64,-44 L 14,-50 L 14,-40 L 62,-34 Z" fill="#7d7873"/>
    </g>
    <path d="M -92,-62 C -96,-80 -70,-96 0,-98 C 70,-96 96,-80 92,-62 L 70,-56 L -70,-56 Z" fill="#0f0d0b"/>
    <path d="M -86,-64 L 86,-64" stroke="#2a2622" stroke-width="3"/>
    <path d="M -80,-74 C -84,-130 -60,-152 0,-158 C 60,-152 84,-130 80,-74 Z" fill="${C.olive}"/>
    <path d="M -110,-150 C -60,-178 60,-178 110,-150 C 100,-130 60,-124 0,-124 C -60,-124 -100,-130 -110,-150 Z" fill="${C.oliveLight}"/>
    <rect x="-80" y="-88" width="160" height="16" fill="${C.oliveShade}"/>
    <path d="M -78,-82 L 78,-82" stroke="${C.gold}" stroke-width="3"/>
    <circle cx="0" cy="-104" r="14" fill="${C.gold}"/>${star(0, -104, 9, "#8e2a22")}
    <path d="M -70,-96 Q -40,-106 -16,-104 M 70,-96 Q 40,-106 16,-104" stroke="${C.gold}" stroke-width="4" fill="none"/>
  </g>`;
}

export function womanHead(p) {
  return `
  <g id="${p}-head">
    <path d="M -96,-40 C -110,40 -110,140 -100,210 C -60,230 60,230 100,210 C 110,140 110,40 96,-40 C 90,-110 50,-136 0,-136 C -50,-136 -90,-110 -96,-40 Z" fill="#d9ad46"/>
    <path d="M -80,60 C -86,120 -84,170 -72,210 M 80,60 C 86,120 84,170 72,210 M -60,100 C -62,150 -58,190 -50,215 M 60,100 C 62,150 58,190 50,215" stroke="#b98d2c" stroke-width="5" fill="none"/>
    <rect x="-26" y="70" width="52" height="66" fill="#d5a98c"/>
    <path d="M -66,-40 C -68,38 -46,94 0,98 C 46,94 68,38 66,-40 C 64,-90 38,-108 0,-108 C -38,-108 -64,-90 -66,-40 Z" fill="#ecc3a6"/>
    <path d="M 8,-108 C 38,-108 64,-90 66,-40 C 68,38 46,94 8,98 C 38,76 48,30 46,-20 C 44,-70 28,-98 8,-108 Z" fill="#000" opacity=".07"/>
    <ellipse cx="-40" cy="22" rx="14" ry="8" fill="#e88c86" opacity=".45"/>
    <ellipse cx="40" cy="22" rx="14" ry="8" fill="#e88c86" opacity=".45"/>
    <g id="${p}-mouths">
      <g id="${p}-m-closed"><path d="M -15,60 Q -7,54 0,58 Q 7,54 15,60 Q 0,72 -15,60 Z" fill="#c2303a"/></g>
      <g id="${p}-m-open" opacity="0"><path d="M -15,56 Q 0,50 15,56 Q 13,76 0,78 Q -13,76 -15,56 Z" fill="#c2303a"/><path d="M -10,60 Q 0,57 10,60 Q 8,72 0,73 Q -8,72 -10,60 Z" fill="#3a1a15"/></g>
      <g id="${p}-m-shout" opacity="0"><path d="M -20,52 Q 0,46 20,52 Q 18,90 0,92 Q -18,90 -20,52 Z" fill="#c2303a"/><path d="M -14,57 Q 0,53 14,57 Q 12,84 0,86 Q -12,84 -14,57 Z" fill="#3a1a15"/></g>
      <g id="${p}-m-smile" opacity="0"><path d="M -20,56 Q 0,80 20,56 Q 0,64 -20,56 Z" fill="#c2303a"/><path d="M -15,59 Q 0,66 15,59 Q 0,72 -15,59 Z" fill="#fff"/></g>
    </g>
    <path d="M 2,-22 C 3,0 5,14 8,22 C 4,27 -4,27 -8,23" stroke="#a5735a" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <g id="${p}-eyes">${eye(p, "L", -30, "#3b6fa8", "#1e140f", true)}${eye(p, "R", 30, "#3b6fa8", "#1e140f", true)}</g>
    <g id="${p}-hearts" opacity="0">
      <path d="M -30,-12 C -44,-26 -54,-12 -30,4 C -6,-12 -16,-26 -30,-12 Z" fill="#e8304a"/>
      <path d="M 30,-12 C 16,-26 6,-12 30,4 C 54,-12 44,-26 30,-12 Z" fill="#e8304a"/>
    </g>
    <g id="${p}-brows"><path d="M -50,-44 Q -30,-54 -12,-46" stroke="#a87a2a" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M 50,-44 Q 30,-54 12,-46" stroke="#a87a2a" stroke-width="5" fill="none" stroke-linecap="round"/></g>
    <path d="M -70,-30 C -76,-100 -40,-130 4,-130 C 54,-130 82,-96 72,-28 C 62,-70 30,-86 -10,-84 C -30,-70 -50,-50 -70,-30 Z" fill="#e8c35a"/>
    <path d="M -20,-120 C 0,-100 20,-90 50,-84 M -50,-100 C -40,-80 -30,-70 -14,-64" stroke="#f6dc8a" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g>`;
}

export function thiefHead(p) {
  return `
  <g id="${p}-head">
    <rect x="-30" y="70" width="60" height="66" fill="#a07258"/>
    <ellipse cx="-72" cy="4" rx="13" ry="22" fill="#a07258"/>
    <ellipse cx="72" cy="4" rx="13" ry="22" fill="#a07258"/>
    <path d="M -68,-40 C -70,40 -48,98 0,104 C 48,98 70,40 68,-40 C 66,-90 38,-108 0,-108 C -38,-108 -66,-90 -68,-40 Z" fill="#b5856a"/>
    <path d="M -66,10 C -62,64 -38,102 0,104 C 38,102 62,64 66,10 C 50,46 -50,46 -66,10 Z" fill="#2a1f1a" opacity=".55"/>
    ${mouths(p, "#4a2a20")}
    <path d="M 4,-24 C 8,0 14,20 18,30 C 10,38 -6,36 -12,30" stroke="#3a2418" stroke-width="2.8" fill="#b5856a" stroke-linecap="round"/>
    <path d="M -74,-44 L 74,-44 L 72,-4 L -72,-4 Z" fill="#111"/>
    <g id="${p}-eyes">
      <g id="${p}-eyeL"><ellipse cx="-30" cy="-24" rx="15" ry="11" fill="#f3ece2"/><g class="${p}-pupil"><circle cx="-28" cy="-24" r="5" fill="#111"/></g></g>
      <g id="${p}-eyeR"><ellipse cx="30" cy="-24" rx="15" ry="11" fill="#f3ece2"/><g class="${p}-pupil"><circle cx="32" cy="-24" r="5" fill="#111"/></g></g>
    </g>
    <g id="${p}-brows"><path d="M -52,-50 L -12,-40" stroke="#111" stroke-width="7" stroke-linecap="round"/><path d="M 52,-50 L 12,-40" stroke="#111" stroke-width="7" stroke-linecap="round"/></g>
    <path d="M -72,-40 C -76,-100 -40,-134 0,-134 C 40,-134 76,-100 72,-40 Z" fill="#1d1d22"/>
    <path d="M -76,-48 L 76,-48 L 76,-30 L -76,-30 Z" fill="#2a2a31"/>
    <path d="M -60,-90 L 60,-90 M -66,-70 L 66,-70" stroke="#2a2a31" stroke-width="4"/>
    <circle cx="0" cy="-138" r="14" fill="#2a2a31"/>
  </g>`;
}

// ---------- Bodies ----------

function captainTorso(p) {
  const board = (s) => `
    <g transform="translate(${s * 128},138) rotate(${s * 8})">
      <rect x="-46" y="-12" width="92" height="24" rx="5" fill="#5a6743"/>
      <rect x="-46" y="-12" width="6" height="24" fill="${C.red}"/><rect x="40" y="-12" width="6" height="24" fill="${C.red}"/>
      ${star(-24, 0, 6, C.gold)}${star(-8, 0, 6, C.gold)}${star(8, 0, 6, C.gold)}${star(24, 0, 6, C.gold)}
    </g>`;
  return `
  <g id="${p}-torso">
    <path d="M -40,106 C -100,114 -158,124 -172,160 C -178,200 -168,300 -150,470 L 150,470 C 168,300 178,200 172,160 C 158,124 100,114 40,106 Z" fill="${C.olive}"/>
    <path d="M 20,110 C 100,114 158,124 172,160 C 178,200 168,300 150,470 L 60,470 C 90,320 100,200 20,110 Z" fill="#000" opacity=".1"/>
    <path d="M -40,104 L 0,150 L 40,104 L 30,96 L 0,126 L -30,96 Z" fill="${C.oliveShade}"/>
    <path d="M -2,150 L -2,440" stroke="${C.oliveShade}" stroke-width="3"/>
    <circle cx="10" cy="190" r="6" fill="${C.gold}"/><circle cx="10" cy="260" r="6" fill="${C.gold}"/><circle cx="10" cy="330" r="6" fill="${C.gold}"/><circle cx="10" cy="400" r="6" fill="${C.gold}"/>
    <circle cx="-26" cy="132" r="5" fill="${C.gold}"/><circle cx="26" cy="132" r="5" fill="${C.gold}"/>
    <path d="M -130,200 L -50,200 L -50,262 L -130,262 Z M 50,200 L 130,200 L 130,262 L 50,262 Z" fill="none" stroke="${C.oliveShade}" stroke-width="3"/>
    <rect x="-152" y="436" width="304" height="34" fill="#3b2b1d"/><rect x="-18" y="438" width="36" height="30" rx="3" fill="none" stroke="${C.gold}" stroke-width="4"/>
    ${board(-1)}${board(1)}
  </g>`;
}

function heroTorso(p) {
  return `
  <g id="${p}-torso">
    <path d="M -40,106 C -100,114 -158,124 -172,160 C -178,200 -168,300 -150,470 L 150,470 C 168,300 178,200 172,160 C 158,124 100,114 40,106 Z" fill="${C.navy}"/>
    <path d="M -150,170 C -120,150 -60,150 -40,190 C -60,260 -100,300 -140,320 Z" fill="${C.navyLight}" opacity=".6"/>
    <path d="M 20,110 C 100,114 158,124 172,160 C 178,200 168,300 150,470 L 60,470 C 90,320 100,200 20,110 Z" fill="#000" opacity=".14"/>
    <path d="M -40,104 Q 0,132 40,104 L 32,96 Q 0,118 -32,96 Z" fill="${C.navyShade}"/>
    <circle cx="-128" cy="146" r="10" fill="${C.gold}"/><circle cx="128" cy="146" r="10" fill="${C.gold}"/>
    <path d="M -66,184 L 66,184 L 66,250 L 0,306 L -66,250 Z" fill="${C.goldDeep}"/>
    <path d="M -58,192 L 58,192 L 58,246 L 0,294 L -58,246 Z" fill="${C.gold}"/>
    <path d="M -58,192 L 10,192 L -40,262 L -58,246 Z" fill="#fff" opacity=".18"/>
    <text x="0" y="-210" text-anchor="middle" font-family="AmrTitle" font-size="128" fill="#7a1c1c" transform="rotate(180)">e</text>
    <rect x="-152" y="430" width="304" height="26" fill="${C.gold}"/><rect x="-24" y="426" width="48" height="34" fill="#e8cc78" stroke="${C.goldDeep}" stroke-width="3"/>
  </g>`;
}

function arm(p, side, sleeve, cuff, hand, handW = 25) {
  const s = side === "L" ? -1 : 1;
  const x = s * 176;
  return `
  <g id="${p}-arm${side}">
    <path d="M ${x - 26},150 C ${x - 34},220 ${x - 32},340 ${x - 26},450 L ${x + 24},450 C ${x + 28},340 ${x + 26},230 ${x + 18},150 Z" fill="${sleeve}"/>
    <rect x="${x - 27}" y="436" width="52" height="16" fill="${cuff}"/>
    <ellipse cx="${x - 1}" cy="478" rx="${handW}" ry="32" fill="${hand}"/>
    <g id="${p}-hand${side}"></g>
  </g>`;
}

function legs(p, trouser, boot) {
  const leg = (side) => {
    const s = side === "L" ? -1 : 1;
    return `<g id="${p}-leg${side}">
      <path d="M ${s * 150},468 L ${s * 8},468 L ${s * 20},842 L ${s * 128},842 Z" fill="${trouser}"/>
      <path d="M ${s * 132},832 L ${s * 16},832 L ${s * 12},880 L ${s * 150},880 C ${s * 150},860 ${s * 144},842 ${s * 132},832 Z" fill="${boot}"/>
    </g>`;
  };
  return leg("L") + leg("R");
}

function cape(p) {
  return `<g id="${p}-cape">
    <path d="M -150,128 C -236,400 -270,700 -262,890 C -120,900 120,900 262,890 C 270,700 236,400 150,128 Z" fill="${C.cape}"/>
    <path d="M -120,300 C -150,500 -170,700 -168,890 M 0,300 L 0,895 M 120,300 C 150,500 170,700 168,890" stroke="${C.capeShade}" stroke-width="10" fill="none" opacity=".7"/>
  </g>`;
}

// Əmiraslan full figure. outfit: "uniform" | "hero"
export function amiraslan(p, outfit = "uniform") {
  const hero = outfit === "hero";
  return `
  <g id="${p}-rig">
    ${hero ? cape(p) : ""}
    <g id="${p}-legs">${legs(p, hero ? "#262e47" : C.trouser, hero ? "#6d1c1c" : C.boot)}</g>
    ${hero ? heroTorso(p) : captainTorso(p)}
    ${hero ? arm(p, "L", C.navy, C.glove, C.glove, 28) : arm(p, "L", C.olive, C.oliveShade, C.skin)}
    ${hero ? arm(p, "R", C.navy, C.glove, C.glove, 28) : arm(p, "R", C.olive, C.oliveShade, C.skin)}
    ${amrHead(p)}
  </g>`;
}

export function commander(p) {
  const board = (s) => `
    <g transform="translate(${s * 132},140) rotate(${s * 8})">
      <rect x="-50" y="-13" width="100" height="26" rx="5" fill="#5a6743"/>
      <rect x="-50" y="-4" width="100" height="3" fill="${C.red}"/><rect x="-50" y="3" width="100" height="3" fill="${C.red}"/>
      ${star(-26, 0, 9, C.gold)}${star(0, 0, 9, C.gold)}${star(26, 0, 9, C.gold)}
    </g>`;
  return `
  <g id="${p}-rig">
    <g id="${p}-legs">${legs(p, C.trouser, C.boot)}</g>
    <g id="${p}-torso">
      <path d="M -44,106 C -110,114 -170,126 -184,166 C -196,230 -186,330 -160,470 L 160,470 C 186,330 196,230 184,166 C 170,126 110,114 44,106 Z" fill="${C.olive}"/>
      <path d="M 20,110 C 110,114 170,126 184,166 C 196,230 186,330 160,470 L 60,470 C 90,320 100,200 20,110 Z" fill="#000" opacity=".1"/>
      <path d="M -44,104 L 0,160 L 44,104 L 34,96 L 0,136 L -34,96 Z" fill="${C.oliveShade}"/>
      <path d="M -10,140 L 0,170 L 10,140 Z" fill="#e8e2d0"/>
      <circle cx="12" cy="200" r="7" fill="${C.gold}"/><circle cx="12" cy="270" r="7" fill="${C.gold}"/><circle cx="12" cy="340" r="7" fill="${C.gold}"/>
      <rect x="-140" y="200" width="70" height="14" fill="#8e2a22"/><rect x="-140" y="214" width="70" height="14" fill="#2b5aa8"/><rect x="-140" y="228" width="70" height="14" fill="#2e7a3c"/>
      <rect x="-162" y="436" width="324" height="34" fill="#3b2b1d"/>
      ${board(-1)}${board(1)}
    </g>
    ${arm(p, "L", C.olive, C.oliveShade, "#b8876a", 27)}
    ${arm(p, "R", C.olive, C.oliveShade, "#b8876a", 27)}
    ${commanderHead(p)}
  </g>`;
}

export function woman(p) {
  return `
  <g id="${p}-rig">
    <g id="${p}-legs">
      <g id="${p}-legL"><path d="M -60,600 L -20,600 L -30,850 L -56,850 Z" fill="#ecc3a6"/><path d="M -62,846 L -24,846 L -20,880 L -76,880 Z" fill="#a51e2a"/></g>
      <g id="${p}-legR"><path d="M 60,600 L 20,600 L 30,850 L 56,850 Z" fill="#ecc3a6"/><path d="M 62,846 L 24,846 L 20,880 L 76,880 Z" fill="#a51e2a"/></g>
    </g>
    <g id="${p}-armL">
      <path d="M -132,150 C -146,230 -150,330 -146,430 L -114,430 C -112,330 -108,230 -98,150 Z" fill="#ecc3a6"/>
      <ellipse cx="-130" cy="452" rx="19" ry="25" fill="#ecc3a6"/>
    </g>
    <g id="${p}-armR">
      <path d="M 132,150 C 146,230 150,330 146,430 L 114,430 C 112,330 108,230 98,150 Z" fill="#ecc3a6"/>
      <ellipse cx="130" cy="452" rx="19" ry="25" fill="#ecc3a6"/>
      <g id="${p}-bag">
        <path d="M 118,452 C 110,400 160,400 152,452" stroke="#5a2e1e" stroke-width="7" fill="none"/>
        <rect x="96" y="450" width="80" height="62" rx="10" fill="#7b3f2a"/><rect x="96" y="470" width="80" height="8" fill="#5a2e1e"/><circle cx="136" cy="474" r="7" fill="${C.gold}"/>
      </g>
    </g>
    <g id="${p}-torso">
      <path d="M -36,106 C -90,112 -130,122 -136,160 C -138,250 -110,330 -100,400 C -150,520 -170,600 -176,640 C -60,660 60,660 176,640 C 170,600 150,520 100,400 C 110,330 138,250 136,160 C 130,122 90,112 36,106 Z" fill="#b3282d"/>
      <path d="M -36,106 Q 0,150 36,106 L 30,100 Q 0,136 -30,100 Z" fill="#ecc3a6"/>
      <path d="M -100,400 Q 0,420 100,400" stroke="#7d161b" stroke-width="8" fill="none"/>
      <path d="M 40,420 C 70,520 100,600 120,646 L 176,640 C 170,600 150,520 100,400 Z" fill="#000" opacity=".14"/>
    </g>
    ${womanHead(p)}
  </g>`;
}

export function thief(p) {
  let stripes = "";
  for (let y = 140; y < 470; y += 36)
    stripes += `<rect x="-180" y="${y}" width="360" height="16" fill="#e9e4da"/>`;
  return `
  <g id="${p}-rig">
    <defs><clipPath id="${p}-tclip"><path d="M -40,106 C -96,114 -150,124 -162,160 C -166,200 -158,300 -142,470 L 142,470 C 158,300 166,200 162,160 C 150,124 96,114 40,106 Z"/></clipPath></defs>
    <g id="${p}-legs">${legs(p, "#3b3d45", "#e9e4da")}</g>
    <g id="${p}-torso">
      <path d="M -40,106 C -96,114 -150,124 -162,160 C -166,200 -158,300 -142,470 L 142,470 C 158,300 166,200 162,160 C 150,124 96,114 40,106 Z" fill="#1d1d22"/>
      <g clip-path="url(#${p}-tclip)">${stripes}</g>
      <path d="M 20,110 C 96,114 150,124 162,160 C 166,200 158,300 142,470 L 60,470 C 90,320 100,200 20,110 Z" fill="#000" opacity=".15"/>
    </g>
    <g id="${p}-armL"><path d="M -186,150 C -196,230 -196,340 -190,440 L -140,440 C -138,340 -138,230 -132,150 Z" fill="#1d1d22"/><ellipse cx="-165" cy="466" rx="24" ry="30" fill="#b5856a"/></g>
    <g id="${p}-armR"><path d="M 186,150 C 196,230 196,340 190,440 L 140,440 C 138,340 138,230 132,150 Z" fill="#1d1d22"/><ellipse cx="165" cy="466" rx="24" ry="30" fill="#b5856a"/></g>
    ${thiefHead(p)}
  </g>`;
}

// Tiny soldier seen from the front (cap, face, shoulders) for crowd shots.
export function soldierSymbols(p) {
  const skins = ["#c4926e", "#b5835f", "#d1a07a", "#a97a5a"];
  return skins
    .map(
      (sk, i) => `
    <symbol id="${p}-sf${i}" viewBox="-60 -70 120 170" overflow="visible">
      <path d="M -56,100 L -50,40 C -46,26 -20,22 0,22 C 20,22 46,26 50,40 L 56,100 Z" fill="${C.olive}"/>
      <path d="M -10,24 L 0,40 L 10,24 Z" fill="${C.oliveShade}"/>
      <rect x="-9" y="10" width="18" height="16" fill="${sk}" opacity=".85"/>
      <ellipse cx="0" cy="-6" rx="20" ry="24" fill="${sk}"/>
      <g class="${p}-sfm"><path d="M -6,8 Q 0,10 6,8" stroke="#3a1a15" stroke-width="2.4" fill="none"/></g>
      <g class="${p}-sfo" opacity="0"><ellipse cx="0" cy="9" rx="6" ry="7" fill="#30140f"/></g>
      <circle cx="-7" cy="-8" r="2.4" fill="#111"/><circle cx="7" cy="-8" r="2.4" fill="#111"/>
      <path d="M -24,-18 C -26,-44 26,-44 24,-18 Z" fill="${C.olive}"/>
      <path d="M -30,-40 C -18,-52 18,-52 30,-40 C 20,-30 -20,-30 -30,-40 Z" fill="${C.oliveLight}"/>
      <path d="M -24,-18 L 24,-18 L 20,-12 L -20,-12 Z" fill="#111"/>
      <circle cx="0" cy="-28" r="3.5" fill="${C.gold}"/>
    </symbol>`,
    )
    .join("");
}

// Soldier seen from straight above (cap and shoulders) for the wide parade shot.
export function soldierTopSymbol(p) {
  return `
    <symbol id="${p}-st" viewBox="-14 -14 28 28" overflow="visible">
      <ellipse cx="2" cy="6" rx="14" ry="8" fill="#000" opacity=".3"/>
      <ellipse cx="0" cy="3" rx="14" ry="8" fill="#3c4630"/>
      <circle cx="0" cy="-1" r="8" fill="#7f8c5c"/>
      <circle cx="-2" cy="-3" r="3" fill="#a3ad7e"/>
      <path d="M -6,4 Q 0,9 6,4" stroke="#111" stroke-width="2.5" fill="none"/>
    </symbol>`;
}

// Azerbaijani tricolour with crescent and eight-pointed star.
export function azFlag(p, w = 300, h = 150) {
  const sh = h / 3;
  return `
    <g id="${p}-flag">
      <rect x="0" y="0" width="${w}" height="${sh}" fill="#0092bc"/>
      <rect x="0" y="${sh}" width="${w}" height="${sh}" fill="#e4002b"/>
      <rect x="0" y="${sh * 2}" width="${w}" height="${sh}" fill="#00af66"/>
      <circle cx="${w * 0.47}" cy="${h / 2}" r="${sh * 0.36}" fill="#fff"/>
      <circle cx="${w * 0.49}" cy="${h / 2}" r="${sh * 0.3}" fill="#e4002b"/>
      ${star(w * 0.565, h / 2, sh * 0.17, "#fff", 8)}
    </g>`;
}

// Grain overlay data for the whole film (pre-baked PNG, shifted at 12 fps).
export const GRAIN = "assets/grain.png";
