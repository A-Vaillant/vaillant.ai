---
title: "AETHER — pi-build"
subtitle: "A generic Raspberry Pi image customizer with a module system"
repos:
    - label: "GitHub repository"
      url: "https://github.com/A-Vaillant/pi-build"
demo: null
order: 7
spoke: true
parent:
    label: "AETHER"
    url: "/projects/aether/"
---

## In short

pi-build is a tool for creating preconfigured Raspberry Pi images. It starts from a
Raspbian base image and uses a manifest describing a device role to produce an image
ready to flash to an SD card. A Pi booted from that image can start doing its job
without any manual setup on the device.

## What varied

The images shared a core setup rather than one network configuration. The `core`
module installed a known SSH public key, so every device could be accessed the same
way once it was reachable. Where it was included, `boot-report` wrote startup diagnostics to the FAT
boot partition, so we could pull an SD card and read its logs without mounting the
Linux filesystem.

The network and software dependencies varied by role. The videosync system used a
lite variant of Raspbian with mpv, while the arcade required a full graphical
environment.

## Payloads and modules

A payload described one deployable kind of image: the server, a Zero client, or the
arcade. Its manifest listed the reusable modules that ran while the image was being
built.

Once we had MQTT broker and telemetry modules, we could add telemetry to the other
payloads by updating their manifests and rebuilding the images. After reflashing,
they all reported to the broker.

<figure class="project-manifest-frame">
  <figcaption class="project-photo-label">
    <span>pi-build // manifests</span>
    <span>select a module</span>
  </figcaption>
  <div class="manifest-grid">
    <section class="manifest-role">
      <h3>server</h3>
      <ul>
        <li class="manifest-module--shared"><details><summary>core</summary><p>Configures the baseline OS and installs the known SSH public key used to access every device.</p></details></li>
        <li><details><summary>tailscale</summary><p>Joins the server to the tailnet at first boot for remote access.</p></details></li>
        <li><details><summary>mqtt-broker</summary><p>Installs the Mosquitto broker used by the fleet.</p></details></li>
        <li><details><summary>mqtt-broker-tailnet</summary><p>Advertises the broker as a service on the tailnet.</p></details></li>
        <li class="manifest-module--shared"><details><summary>boot-report</summary><p>Writes service, network, and journal diagnostics to the FAT boot partition after startup.</p></details></li>
        <li class="manifest-module--shared"><details><summary>mqtt-telemetry</summary><p>Publishes device health, status, and version information to the broker.</p></details></li>
        <li><details><summary>mqtt-dashboard</summary><p>Serves the fleet status page from telemetry received by the broker.</p></details></li>
        <li><details><summary>aether-archiver</summary><p>Records the MQTT event stream to JSONL for later inspection.</p></details></li>
        <li><details><summary>hostapd-ap</summary><p>Creates the private wifi network used by the videosync clients.</p></details></li>
        <li><details><summary>flicd</summary><p>Runs the BLE daemon for the show's physical buttons.</p></details></li>
        <li><details><summary>videosync-server</summary><p>Installs the playback coordinator, operator interface, time source, and venue-wifi profile.</p></details></li>
      </ul>
    </section>
    <section class="manifest-role">
      <h3>zero</h3>
      <ul>
        <li class="manifest-module--shared"><details><summary>core</summary><p>Configures the baseline OS and installs the known SSH public key used to access every device.</p></details></li>
        <li class="manifest-module--shared"><details><summary>boot-report</summary><p>Writes service, network, and journal diagnostics to the FAT boot partition after startup.</p></details></li>
        <li class="manifest-module--shared"><details><summary>mqtt-telemetry</summary><p>Publishes device health, status, and version information to the broker.</p></details></li>
        <li><details><summary>cluster-client</summary><p>Joins the private cluster network, synchronizes time, and assigns the client hostname.</p></details></li>
        <li><details><summary>videosync-client</summary><p>Installs mpv, the playback client, its service, and the baked video files.</p></details></li>
      </ul>
    </section>
    <section class="manifest-role">
      <h3>arcade</h3>
      <ul>
        <li class="manifest-module--shared"><details><summary>core</summary><p>Configures the baseline OS and installs the known SSH public key used to access every device.</p></details></li>
        <li><details><summary>wifi</summary><p>Adds the configured venue wifi profile.</p></details></li>
        <li><details><summary>desktop-kiosk</summary><p>Sets up the graphical environment and automatic kiosk login.</p></details></li>
        <li class="manifest-module--shared"><details><summary>mqtt-telemetry</summary><p>Publishes device health, status, and version information to the broker.</p></details></li>
        <li><details><summary>arcade</summary><p>Installs the game, Chromium launcher, overlay filesystem, and CRT display tuning.</p></details></li>
      </ul>
    </section>
  </div>
</figure>

## Why I built it

I started with two kinds of Raspberry Pi image: the videosync server and client. The
arcade required a third. A separate Pi in the phonebooth ran someone else's code and
did not need to join this system until we later added telemetry.
