---
title: "Eyes of Maia"
subtitle: "Real-time badge detection on edge hardware for immersive theater"
repos:
    - label: "Synthetic data generation"
      url: "https://github.com/A-Vaillant/blender-synthetic-badges"
    - label: "Detection model training"
      url: "https://github.com/A-Vaillant/badge-vision-model"
demo: null
order: 1
---

## In short

A computer-vision system for *Fairyland*, an immersive theater production by [Storyverse NYC](https://storyversenyc.com) and a precursor to AETHER. Guest badges each had one of 7 Zener-inspired designs. Actors would direct guests to stand in front of a hidden camera, the system would recognize the badge design, and an environmental effect was triggered.

## Challenges

Because this is an immersive theater experience, the system had to run continuously and accuracy for about 3 hours. Network stuff is inherently a little bit cursed, so that left edge ML on the table. I targeted the Raspberry Pi 4 because I've used those before, I had them on hand, and I already knew how to set up a quantized bounding box detection model on that hardware.

I didn't actually check if there was already a dataset of people wearing Zener-inspired designs on badges already in existence but I assumed there was not. As such, one needed to be created.

## How it works

Three parts.

1. A Blender generator renders synthetic training images from a `.blend` file with UV-annotated badge faces, randomizing badge angle and location, lighting conditions, and backgrounds. Bounding boxes are derived from the particular Zener icon used and the badge translation/transformation parameters, calculated using linear algebra, meaning we don't have to do any hand-labelling. Rendering uses parallel subprocesses, workers hold scene state across a batch to amortize setup.
2. A YOLOv8 detector is finetuned on the synthetic data at 320x320 and then quantized to a TFLite INT8 model (~6MB) that's optimized for the Raspberry Pi.
3. The Pi runs camera frames through TFLite, passes the detections through a 1-D Kalman filter (which smoothed detections and increased reliability at the cost of some latency; standard computer vision practice), and a state machine (IDLE -> DETECT -> EVENT_RUNNING -> COOLDOWN) that drives an environmental effect Arduino over serial.

## Validation

To validate that the model was properly detecting the different classes, I took a bunch of badges and held them in front of the camera as it recorded, sequentially. I then ran that video through the detection model and graphed which detections were triggered. This gave me a quick visual of the success of the model and, more importantly, allowed me to compare the full precision model against the INT8 quantized model, as well as different iterations of the same model.

## Decisions and tradeoffs

Synthetic data was relatively easy to generate in our case - I made a 3d model of a badge and I had the badge faces, so it was just a matter of scripting the Blender image pipeline. The tricky part was figuring out the mathematics for converting the bounding boxes properly. Being able to quickly adjust the parameters by which images were generated was important to me.

This ended up being useful; at the first show, after verifying the detector worked, an actor on site decided to dim the lights in the room right before the show started. The detection got a bit less reliable and a later training run incorporated more low-light conditions to prevent this from happening again.

## Outcome

Ran live across the production, end to end, with no manual annotation.




