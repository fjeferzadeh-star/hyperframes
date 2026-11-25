// Character sheet for checking the rigs against the reference stills.
import { writeFileSync } from "node:fs";
import { amiraslan, commander, woman, thief, soldierSymbols, azFlag } from "./lib.mjs";
import { scene, place } from "./scene.mjs";

const svg = `
  <rect width="1920" height="1080" fill="#2a2420"/>
  ${place(amiraslan("tA", "uniform"), 240, 300, 0.62)}
  ${place(amiraslan("tB", "hero"), 640, 300, 0.62)}
  ${place(commander("tC"), 1030, 320, 0.6)}
  ${place(woman("tD"), 1380, 320, 0.6)}
  ${place(thief("tE"), 1720, 320, 0.6)}
  ${soldierSymbols("tS")}
  <use href="#tS-sf0" x="40" y="60" width="120" height="170"/>
  <use href="#tS-sf1" x="160" y="60" width="120" height="170"/>
  <g transform="translate(1500,40)">${azFlag("tF", 300, 150)}</g>
`;
const js = `mouth(tl, "tB", "smile", 0); mouth(tl, "tC", "shout", 0); mouth(tl, "tE", "open", 0); tl.set("#tD-hearts", {opacity: 0}, 0); tl.to({}, {duration: 1}, 0);`;
writeFileSync(new URL("../compositions/test.html", import.meta.url), scene("test", 2, { svg, js }));
