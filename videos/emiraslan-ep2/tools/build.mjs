// Builds every composition file and index.html for "Əmiraslan — İkinci hissə".
// Run: node tools/build.mjs
import { writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fontFaces } from "./lib.mjs";
import * as A from "./scenes1.mjs";
import * as B from "./scenes2.mjs";

export const SCENES = [
  ["s01", "Titr", 0, 7, A.s01],
  ["s02", "Səhər", 7, 7, A.s02],
  ["s03", "Düzülüş meydanı", 14, 8, A.s03],
  ["s04", "Komandir", 22, 9, A.s04],
  ["s05", "Çəkmələr", 31, 4, A.s05],
  ["s06", "Salam, əsgər", 35, 10, A.s06],
  ["s07", "Dağılış", 45, 7, A.s07],
  ["s08", "Ofis", 52, 12, A.s08],
  ["s09", "3 saat keçdi", 64, 5, A.s09],
  ["s10", "Maşın", 69, 7, B.s10],
  ["s11", "Telefon", 76, 20, B.s11],
  ["s12", "Gedir", 96, 6, B.s12],
  ["s13", "Dam", 102, 13, B.s13],
  ["s14", "Küçə", 115, 6, B.s14],
  ["s15", "Uçuş", 121, 5, B.s15],
  ["s16", "Döyüş", 126, 13, B.s16],
  ["s17", "Davamı var", 139, 7, B.s17],
];
export const TOTAL = 146;

// Subtitles: [start, end, speaker, text]
export const SUBS = [
  [25.0, 26.4, "KOMANDİR", "Düzlən!"],
  [27.8, 29.6, "KOMANDİR", "Farağat!"],
  [35.6, 37.5, "KOMANDİR", "Salam, əsgər!"],
  [38.3, 40.6, "ŞƏXSİ HEYƏT", "SAĞ OL!"],
  [80.0, 82.2, "TELEFON", "Salam, Əmiraslan, necəsən?"],
  [82.4, 84.6, "ƏMİRASLAN", "Çox sağ ol, sən necəsən?"],
  [84.8, 86.2, "TELEFON", "İşdəsən?"],
  [86.8, 88.6, "ƏMİRASLAN", "Hə, işdəyəm..."],
  [89.0, 90.8, "TELEFON", "Yaxşı, işdə ol."],
  [117.2, 120.6, "QIZ", "Kömək edin! Kömək edin!"],
  [134.6, 137.9, "QIZ", "Çox sağ ol, mənim qəhrəmanım!"],
];
const SPEAKER_COLOR = {
  KOMANDİR: "#9fd36a",
  "ŞƏXSİ HEYƏT": "#9fd36a",
  TELEFON: "#8fc7ff",
  ƏMİRASLAN: "#ffd84a",
  QIZ: "#ff9ab0",
};

const out = (name, text) =>
  writeFileSync(new URL(`../compositions/${name}.html`, import.meta.url), text);

for (const [id, , , , fn] of SCENES) out(id, fn());

// ---- Subtitles (one captions host) ----
{
  const groups = SUBS.map(
    ([s, e, who, text], i) => `
    <div id="sub-${i}" class="clip sub-g" data-start="${s}" data-duration="${(e - s).toFixed(2)}" data-track-index="0"><div id="sub-${i}-in" class="sub-in">
      <div class="sub-who" style="color:${SPEAKER_COLOR[who]}">${who}</div>
      <div class="sub-txt">${text}</div>
    </div></div>`,
  ).join("");
  const js = SUBS.map(
    ([s, e], i) => `
      tl.fromTo("#sub-${i}-in", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.18, ease: "power3.out" }, ${s});
      tl.to("#sub-${i}-in", { opacity: 0, duration: 0.15, ease: "power2.in" }, ${(e - 0.17).toFixed(2)});`,
  ).join("");
  out(
    "subs",
    `<template>
  <style>
    ${fontFaces()}
    #root { position: absolute; inset: 0; pointer-events: none; }
        .sub-g { position: absolute; left: 0; right: 0; bottom: 112px; text-align: center; overflow: visible; }
    .sub-in { opacity: 0; }
    .sub-who { font-family: "AmrSub"; font-weight: 800; font-size: 22px; letter-spacing: 0.2em; margin-bottom: 4px; -webkit-text-stroke: 5px #000; paint-order: stroke fill; }
    .sub-txt { font-family: "AmrSub"; font-weight: 800; font-size: 50px; color: #fff; -webkit-text-stroke: 8px #000; paint-order: stroke fill; text-shadow: 0 4px 10px rgba(0,0,0,.6); }
  </style>
  <div id="root" data-composition-id="subs" data-width="1920" data-height="1080">
${groups}
  </div>
  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });${js}
      tl.to({}, { duration: ${TOTAL} }, 0);
      window.__timelines["subs"] = tl;
    })();
  </script>
</template>
`,
  );
}

// ---- Film frame: grain, vignette, letterbox ----
out(
  "frame",
  `<template>
  <style>
    #root { position: absolute; inset: 0; pointer-events: none; }
    #frame-clip { position: absolute; inset: 0; }
    #frame-grain { position: absolute; left: -64px; top: -64px; width: 2048px; height: 1208px; background-image: url("assets/grain.png"); background-size: 256px 256px; opacity: 0.16; mix-blend-mode: overlay; }
    #frame-vig { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 58%, rgba(0,0,0,.5) 100%); }
    .frame-bar { position: absolute; left: 0; width: 1920px; height: 96px; background: #000; }
  </style>
  <div id="root" data-composition-id="frame" data-width="1920" data-height="1080" data-layout-allow-overlap>
    <div id="frame-clip" class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="0">
      <div id="frame-grain"></div>
      <div id="frame-vig"></div>
      <div id="frame-top" class="frame-bar" style="top:0"></div>
      <div id="frame-bot" class="frame-bar" style="bottom:0"></div>
    </div>
  </div>
  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });
      // Grain boils at 12 fps: a stepped jump every 1/12 s, deterministic.
      const steps = Math.round(${TOTAL} * 12);
      tl.fromTo("#frame-grain", { x: 0, y: 0 }, { x: 48, y: 32, duration: ${TOTAL}, ease: "steps(" + steps + ")" }, 0);
      window.__timelines["frame"] = tl;
    })();
  </script>
</template>
`,
);

// ---- Fades to black between story beats (the script asks for slow fades) ----
const FADES = [
  [6.4, 7.0, "out"],
  [7.0, 7.8, "in"], // title → dawn
  [62.6, 64.0, "out"],
  [64.0, 64.3, "in"], // office → "3 saat keçdi" (black card)
  [68.6, 69.0, "out"],
  [69.0, 70.2, "in"], // → car, fades up slowly
  [100.6, 102.0, "out"],
  [102.0, 103.2, "in"], // car → rooftop
  [138.2, 139.4, "out"],
  [139.4, 139.7, "in"], // hug → "Davamı var..." (black card)
];
out(
  "fades",
  `<template>
  <style>
    #root { position: absolute; inset: 0; pointer-events: none; }
    #fades-clip { position: absolute; inset: 0; }
    #fades-black { position: absolute; inset: 0; background: #000; opacity: 0; }
  </style>
  <div id="root" data-composition-id="fades" data-width="1920" data-height="1080" data-layout-allow-overlap>
    <div id="fades-clip" class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="0"><div id="fades-black"></div></div>
  </div>
  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });
      ${FADES.sort((a, b) => a[0] - b[0])
        .map(
          ([s, e, k]) =>
            `tl.fromTo("#fades-black", { opacity: ${k === "out" ? 0 : 1} }, { opacity: ${k === "out" ? 1 : 0}, duration: ${(e - s).toFixed(2)}, ease: "power1.inOut", immediateRender: false }, ${s});`,
        )
        .join("\n      ")}
      tl.to({}, { duration: ${TOTAL} }, 0);
      window.__timelines["fades"] = tl;
    })();
  </script>
</template>
`,
);

// ---- Sound: [file, picture time of the hit, volume, peak offset in file (s)] ----
// Each hit is placed so its peak lands one frame after the picture.
const F = 1 / 30;
const CUES = [
  // ambience beds (lane 5)
  ["wind", 7.0, 0.22, 0, "bed"],
  ["march", 45.6, 0.5, 0, "bed"],
  ["engine", 69.0, 0.32, 0, "bed"],
  ["city", 102.0, 0.3, 0, "bed"],
  ["wind", 102.5, 0.25, 0, "bed2"],
  ["city", 115.0, 0.22, 0, "bed2b"],
  // effects
  ["impact-bass-1", 1.0, 0.85, 0.073],
  ["sparkle", 2.4, 0.4, 0.025],
  ["whoosh-short", 6.45, 0.35, 0.162],
  ["birds", 7.5, 0.45, 0],
  ["birds", 10.6, 0.35, 0],
  ["mictap", 23.3, 0.8, 0],
  ["mictap", 23.52, 0.7, 0],
  ["feedback", 23.75, 0.45, 0],
  ["impact-bass-1", 27.85, 0.55, 0.073],
  ["stomp", 31.55, 0.95, 0.02],
  ["impact-bass-1", 31.55, 0.4, 0.073],
  ["crowd", 38.3, 0.9, 0.03],
  ["impact-bass-1", 38.3, 0.45, 0.073],
  ["whoosh-short", 38.45, 0.35, 0.162],
  ["pop", 43.2, 0.55, 0.119],
  ["door", 52.4, 0.5, 0],
  ["steps", 53.0, 0.5, 0],
  ["door", 53.75, 0.35, 0],
  ["typing", 57.35, 0.5, 0.455],
  ["typing", 58.85, 0.45, 0.455],
  ["typing", 60.3, 0.45, 0.455],
  ["riser", 63.6, 0.0, 3.036, "skip"],
  ["tick", 64.4, 0.45, 0],
  ["typing", 65.05, 0.25, 0.455],
  ["whoosh-short", 72.35, 0.6, 0.162],
  ["whoosh", 72.5, 0.3, 0.162],
  ["ring", 78.0, 0.55, 0],
  ["click", 79.65, 0.5, 0.072],
  ["pop", 85.6, 0.45, 0.119],
  ["hangup", 91.0, 0.45, 0],
  ["sparkle", 92.2, 0.5, 0.025],
  ["click", 94.1, 0.6, 0.072],
  ["pop", 111.65, 0.55, 0.119],
  ["riser", 122.2, 0.45, 3.036],
  ["whoosh-short", 117.0, 0.4, 0.162],
  ["whoosh", 122.2, 0.8, 0.162],
  ["whoosh-short", 124.6, 0.6, 0.162],
  ["impact-bass-1", 126.65, 0.85, 0.073],
  ["whoosh-short", 128.32, 0.55, 0.162],
  ["smack", 128.42, 1.0, 0.004],
  ["impact-bass-1", 128.42, 0.6, 0.073],
  ["crash", 129.4, 0.75, 0.003],
  ["tweet", 129.6, 0.35, 0],
  ["sparkle", 133.6, 0.45, 0.025],
  ["pop", 134.7, 0.5, 0.119],
  ["pop", 134.9, 0.45, 0.119],
  ["impact-bass-1", 140.0, 0.5, 0.073],
  ["sparkle", 141.6, 0.35, 0.025],
].filter((c) => c[4] !== "skip");

function fileDur(file) {
  const out = execFileSync(
    "ffprobe",
    ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", `assets/sfx/${file}.mp3`],
    { cwd: new URL("..", import.meta.url) },
  );
  return parseFloat(String(out));
}

function audioTags() {
  const ends = {};
  return CUES.map(([file, at, vol, peak, kind], i) => {
    const start = Math.max(0, +(at + (kind ? 0 : F) - peak).toFixed(3));
    const dur = Math.min(fileDur(file), TOTAL - start);
    let lane = kind ? 5 : 9;
    while ((ends[lane] ?? -1) > start) lane++;
    ends[lane] = start + dur;
    return `      <audio id="a${String(i).padStart(2, "0")}-${file}" src="assets/sfx/${file}.mp3" data-start="${start}" data-duration="${dur.toFixed(2)}" data-track-index="${lane}" data-volume="${vol}"></audio>`;
  }).join("\n");
}

// ---- index.html ----
const hosts = SCENES.map(
  ([id, label, start, dur]) =>
    `      <!-- ${label} -->
      <div id="${id}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${start}" data-duration="${dur}" data-track-index="1" data-track-kind="graphics" data-width="1920" data-height="1080" style="z-index:1"></div>`,
).join("\n");
writeFileSync(
  new URL("../index.html", import.meta.url),
  `<!doctype html>
<html lang="az">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>Əmiraslan — İkinci hissə</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1920px; height: 1080px; overflow: hidden; background: #000; }
      #root { position: relative; width: 100%; height: 100%; background: #000; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="1920" data-height="1080">
${hosts}
      <div id="fades" data-composition-id="fades" data-composition-src="compositions/fades.html" data-start="0" data-duration="${TOTAL}" data-track-index="2" data-track-kind="graphics" data-width="1920" data-height="1080" style="z-index:5"></div>
      <div id="frame" data-composition-id="frame" data-composition-src="compositions/frame.html" data-start="0" data-duration="${TOTAL}" data-track-index="3" data-track-kind="graphics" data-width="1920" data-height="1080" style="z-index:6"></div>
      <div id="subs" data-composition-id="subs" data-composition-src="compositions/subs.html" data-start="0" data-duration="${TOTAL}" data-track-index="4" data-track-kind="captions" data-width="1920" data-height="1080" style="z-index:7"></div>
${audioTags()}
    </div>
    <script>
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`,
);
console.log("built", SCENES.length, "scenes");
