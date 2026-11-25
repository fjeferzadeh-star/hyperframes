# Emiraslan: Daxili Qoşunlar — 1-ci bölüm: Joker Team-in hücumu

A 5:21 cartoon episode built with HyperFrames (1920×1080, 30 fps). Dialogue is shown as captions; characters move their mouths while they speak.

| Time | Scene                                                             |
| ---- | ----------------------------------------------------------------- |
| 0:00 | Title card                                                        |
| 0:07 | 1. A quiet morning on the Baku boulevard — the Joker Team arrives |
| 0:55 | 2. Captain Emiraslan at HQ: tea, the phone, the hero montage      |
| 1:40 | 3. In the car: the beautiful lady, the mirror, the radio          |
| 2:32 | 4. The square: the confrontation and the fight                    |
| 3:24 | 5. The trick: the giant screen, the captain's power, confetti     |
| 4:07 | 6. Victory: the lady's thanks, the driver's despair               |
| 4:51 | 7. Back at HQ: the leader has escaped                             |
| 5:13 | End card                                                          |

## How it is built

- `tools/episode.py` — scenes, every line of dialogue (with timing), sound effects and ambience. Edit text or timing here.
- `tools/scenes/<id>.js` — the drawing code for each scene (shots, poses, camera).
- `assets/lib/` — the shared toolkit: `core.js` (easing, flag, comic effects), `heads.js` (Emiraslan's head and the generic cartoon head), `rig.js` (body rig and the cast), `sets.js` (Baku panorama, boulevard, office, street, car, square).
- `python3 tools/build.py` regenerates `index.html`, `compositions/*.html` and `assets/lib/dialogue.js`. Run it after any edit.
- `tools/make_beds.sh` regenerates the ambience beds (sea, room, car, crowd) from filtered noise.

```bash
python3 tools/build.py
npx hyperframes check
npx hyperframes render -o renders/emiraslan-ep01.mp4
```

Fonts: Baloo 2 (subset to Latin + Latin Extended) and Bangers, both SIL OFL. Sound effects: Pixabay (bundled with the HyperFrames skills). No music or voices yet.
