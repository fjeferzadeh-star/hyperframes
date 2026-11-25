# Əmiraslan — superhero trailer

A ~50 s HyperFrames trailer (1920×1080, 30 fps, 2.39:1 letterbox).

| Time      | Scene                                                                              | File                         |
| --------- | ---------------------------------------------------------------------------------- | ---------------------------- |
| 0–7.5 s   | Top-down shot: the captain walks home down a rainy alley, a cat leaps off the bins | `compositions/alley.html`    |
| 7.5–10 s  | Card: "GÜNDÜZLƏR O, SADƏCƏ BİR KAPİTANDIR"                                         | `compositions/card1.html`    |
| 10–14 s   | A cat walks along the roof edge, lightning                                         | `compositions/roof.html`     |
| 14–18 s   | He opens the door and steps into the dark flat                                     | `compositions/door.html`     |
| 18–26.5 s | Opens the wardrobe, stares at the Ə suit, slams the doors                          | `compositions/wardrobe.html` |
| 26.5–29 s | Card: "AMMA GECƏLƏR ŞƏHƏRİN ONA EHTİYACI VAR"                                      | `compositions/card2.html`    |
| 29–36 s   | From behind: watching the news on the sofa, he stands up                           | `compositions/tv.html`       |
| 36–42 s   | Grabs the suit, runs and leaps out the window; the camera follows, fade to black   | `compositions/leap.html`     |
| 42–50 s   | "O GERİ QAYIDIR" → poster "ƏMİRASLAN / TEZLİKLƏ"                                   | `compositions/finale.html`   |

Letterbox and film grain: `compositions/film.html`. Sound: a generated rain bed plus the bundled Pixabay SFX (no music yet). Əmiraslan is drawn as a cartoon character (`tools/head.js`, copied into `wardrobe.html` and `finale.html`), based on his photos.

```bash
npx hyperframes preview   # edit in the browser
npx hyperframes check
npx hyperframes render -o renders/amiraslan-trailer.mp4
```
