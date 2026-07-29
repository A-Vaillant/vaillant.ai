---
title: "AETHER — arcade"
subtitle: "A Raspberry Pi arcade cabinet for the show"
demo: null
order: 8
spoke: true
parent:
    label: "AETHER"
    url: "/projects/aether/"
---

## In short

The AETHER arcade cabinet was a Raspberry Pi 4 running a fullscreen Pac-Man-style
HTML5 game controlled with an X-Arcade Trooper 2 joystick. It used a pi-build image like the
other Pis in the show.

<figure class="project-photo-frame project-photo-frame--arcade">
  <figcaption class="project-photo-label">
    <span>AETHER // arcade cabinet</span>
    <span>installation still</span>
  </figcaption>
  <div class="project-photo-viewport">
    <img src="/media/aether-arcade-cabinet.jpg" alt="The arcade game's title screen on a CRT in the AETHER installation" />
  </div>
</figure>

## Connected to the show

High scores synchronized over MQTT. The game also reported when runs started and
ended, including which ending a player reached. If the network was unavailable, the
game still ran with a local scoreboard.
