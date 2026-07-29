---
title: "AETHER — pi-build"
subtitle: "A generic Raspberry Pi image customizer with a module system"
repos:
    - label: "GitHub repository"
      url: "https://github.com/A-Vaillant/pi-build"
demo: null
order: 7
spoke: true
---

## In short

pi-build is a tool for creating preconfigured Raspberry Pi images. It starts from a
Raspbian base image and uses a manifest describing a device role to produce an image
ready to flash to an SD card. A Pi booted from that image can connect to its configured
wifi network and start doing its job without any manual setup on the device.

## What varied

Every image was preconfigured to connect to wifi, although the network and software
dependencies varied by role. The videosync system used a lite variant of Raspbian
with mpv, while the arcade required a full graphical environment.

## Payloads

A payload was a reusable module that ran while the image was being built. Later,
each role could be assembled from payloads listed in its manifest.
Once we had an MQTT broker payload, we could add an MQTT telemetry payload to every
other kind of Pi by updating its manifest and rebuilding the image. After reflashing,
they all reported to the broker.

## Why I built it

I started with two kinds of Raspberry Pi image: the videosync server and client. The
arcade required a third. A separate Pi in the phonebooth ran someone else's code and
did not need to join this system until we later added telemetry.

[← Return to AETHER](/projects/aether/)
