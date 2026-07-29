---
title: "AETHER — arcade"
subtitle: "A Raspberry Pi arcade cabinet for the show"
repos:
    - label: "GitHub repository"
      url: "https://github.com/earlier-clues/aether-game"
demo: null
order: 8
spoke: true
parent:
    label: "AETHER"
    url: "/projects/aether/"
---

## In short

The AETHER arcade cabinet was a Raspberry Pi 4 running a Pac-Man-style HTML5 game
fullscreen with an X-Arcade Trooper 2 joystick. It used a pi-build image like the
other Pis in the show.

<img class="project-image--portrait" src="/media/aether-arcade-cabinet.jpg" alt="The arcade game's title screen on a CRT in the AETHER installation" />

## Connected to the show

High scores synchronized over MQTT. The game also reported when runs started and
ended, including which ending a player reached. If the network was unavailable, the
game still ran with a local scoreboard.
