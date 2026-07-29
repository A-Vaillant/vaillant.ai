---
title: "AETHER — videosync"
subtitle: "Distributed video playback across a swarm of Raspberry Pi Zero 2 Ws"
repos:
    - label: "GitHub repository"
      url: "https://github.com/A-Vaillant/videosync"
demo: null
order: 6
spoke: true
parent:
    label: "AETHER"
    url: "/projects/aether/"
hero: /media/aether-videosync-crts.mp4
heroPoster: /media/aether-videosync-crts.jpg
heroLabel: "AETHER // CRT swarm"
---

## In short

videosync was a way to program what each CRT displayed using existing video files
and a set of instructions. It could make the CRTs display the same video at the same
time, or play some videos off-beat. In the primary installation, one Pi 4 coordinated
six Pi Zero 2 W clients over a dedicated wifi network. Each client played to a CRT
through an HDMI-to-RF modulator.

## Avoiding file-switch lag

Switching between video files caused the Pi Zero 2 Ws to freeze briefly. The delay
was inconsistent, so switching scenes would also push the Pis out of sync. Seeking
within an already-open video did not have the same problem.

The production show had two acts, swapped between audiences. Each act was built as a
single video containing all of its scenes, with a chapter marker for each source
clip. Changing scenes meant seeking to a precomputed timestamp instead of loading a
new file.

## Correcting drift

The Pi 4 provided time to the clients over the installation's airgapped network, but
agreeing on the time did not guarantee that each video player was showing the same
frame. The players could still drift apart during a four-hour show.

Each Pi reported its playback position. The server projected each recent report
forward to the present, grouped Pis playing the same file, and used the cohort's
median position as a baseline. Stale reports and Pis without a cohort were ignored.
When drift crossed a threshold, the server sent a seek only to the stragglers.

## Programming a show

The show configuration is a kind of Python program. I wanted it that way so I could
program a show using things like loops and random choice within a structured system.
We went through several more limited versions of the configuration before aiming for
the most general possible one: just a straight-up Turing machine.

<figure class="project-photo-frame">
  <figcaption class="project-photo-label">
    <span>AETHER // operator dashboard</span>
    <span>interface capture</span>
  </figcaption>
  <div class="project-photo-viewport">
    <img src="/media/aether-videosync-dashboard.png" alt="The operator dashboard: per-Pi rows with playback position and drift, and the bindings table below" />
  </div>
</figure>
