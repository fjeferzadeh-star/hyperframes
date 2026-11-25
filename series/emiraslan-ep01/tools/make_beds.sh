#!/usr/bin/env bash
# Ambience beds made from filtered noise (deterministic seeds). Run from the project root.
set -euo pipefail
o=assets/sfx
ff() { ffmpeg -hide_banner -loglevel error -y "$@"; }
# sea: slow swells of pink noise
ff -f lavfi -i "anoisesrc=color=pink:seed=3:amplitude=0.7:duration=50" \
  -af "lowpass=f=1800,highpass=f=120,volume='0.55+0.45*sin(2*PI*t/6)':eval=frame,afade=t=in:d=1,afade=t=out:st=48:d=2" \
  -ac 1 -b:a 40k $o/bed-sea.mp3
# room tone: very quiet low hum
ff -f lavfi -i "anoisesrc=color=brown:seed=5:amplitude=0.25:duration=47" \
  -af "lowpass=f=400,afade=t=in:d=1,afade=t=out:st=45:d=2" -ac 1 -b:a 32k $o/bed-room.mp3
# car: engine rumble with a slow wobble
ff -f lavfi -i "anoisesrc=color=brown:seed=9:amplitude=0.8:duration=54" \
  -af "lowpass=f=260,volume='0.8+0.2*sin(2*PI*t*0.7)':eval=frame,afade=t=in:d=1,afade=t=out:st=52:d=2" \
  -ac 1 -b:a 32k $o/bed-car.mp3
# crowd murmur in the square
ff -f lavfi -i "anoisesrc=color=pink:seed=21:amplitude=0.5:duration=141" \
  -af "bandpass=f=700:width_type=h:w=900,volume='0.7+0.3*sin(2*PI*t*0.23)':eval=frame,afade=t=in:d=1,afade=t=out:st=139:d=2" \
  -ac 1 -ar 22050 -b:a 16k $o/bed-crowd.mp3
ls -la $o/bed-*.mp3
