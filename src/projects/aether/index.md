---
title: "AETHER"
subtitle: "Raspberry Pi infrastructure for immersive theater"
repos:
    - label: "Pi image build system"
      url: "https://github.com/A-Vaillant/pi-build"
demo: null
order: 0
hero: /media/aether-establishing.mp4
heroPoster: /media/aether-establishing.jpg
heroLabel: "AETHER // installation feed"
---

## In short

AETHER was an immersive theater production by [Storyverse NYC](https://storyversenyc.com) that closed on June 10th. Multiple installations throughout the space were powered by Raspberry Pis. I built the infrastructure that powered them - a common build pipeline, MQTT telemetry fabric, and network. This included: a video synchronization playback server-client stack which scaled from one server/7 clients down to a Pi running both server and client, a phonebooth which reported usage, a static projector running a video on a loop, and an arcade game which reported high scores and player endings.

## Variations on a theme

We had a lot of Raspberry Pis doing different things, but they were all built using the scripts from pi-build in addition to role-specific payloads. 

- **Cluster** (`server` + `zero`) - the primary system. One Pi 4 coordinates 6+ Pi Zero 2 W clients, each of which plays to a CRT via an HDMI→RF modulator, scattered around a room on a dedicated wifi network the Pi 4 runs itself. Videos are baked into the SD images at build time, not streamed.<!-- (See [videosync](/projects/aether/videosync/) for implementation details.) -->
- **Standalone** - videosync server + client on one Pi 4 over loopback. Drives a projector; when a button was pressed, a clip would be played for the audience.
- **Archiver** - an always-on flight recorder on a Raspberry Pi left at home, connected to a VPN. Records the show's entire MQTT event stream for after-the-fact diagnosis.<!-- (See [archiver](/projects/aether/archiver/). -->
- **Arcade** - A Pi 4 running a Pac-Man-style HTML5 game fullscreen, using a joystick. High scores sync over MQTT.<!-- (See [arcade](/projects/aether/arcade/).) -->
- **Phonebooth** - A Pi 4 responsible for triggering environmental effects in a phonebooth when phone was lifted off the hook. Reported telemetry on phone lifts and returns.

## Infrastructure

Each of the Pi images shared three things:

1. **pi-build** - a generic Pi OS image customizer. Images are pre-configured so that no manual setup is required on the device, and specified via a list of payloads.
2. **MQTT telemetry** - every Pi runs a telemetry daemon that reports device health to a broker, allowing the fleet health to be monitored from by MQTT subscriber to that broker.
3. **Tailnet** - The VPN. MagicDNS and Tailnet Services were used to register the broker under the hostname `broker`.

## Design

I wasn't sure what the needs and requirements of the show would end up being so I tried to set as little in stone as possible while iterating on what I'd already built. pi-build came about because I realized that "deploy a thing to a Raspberry Pi" was something I'd have to keep doing, so I did the most flexible thing I possibly could: build a separate thing to abstract some of the process of creating a Raspberry Pi image. The payload system allowed me to later just drop in the mqtt-telemetry payload on the next image reflash. 

Similarly, the show's configuration format changed over time, starting as a kind of DSL before culminating in a Python-shaped config where show configurations are kinds of programs.
