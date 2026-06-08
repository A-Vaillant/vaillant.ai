---
title: "A Long Day in Hell"
subtitle: "Browser roguelike — caging the Library of Babel"
repo: "https://github.com/A-Vaillant/a-long-day-in-hell"
demo: "https://a-vaillant.github.io/a-long-day-in-hell/"
order: 2
---

## What is this?

Made for [7DRL](https://itch.io/jam/7drl-challenge-2026) in 4 days over 433 commits and ~1,400 test cases. Later expanded - the v0.3.1 release was 563 commits in with almost 1,900 test cases.

A "roguelike" based off *A Short Stay In Hell* by Steven Peck (which is based off of Borges' *Library of Babel*). The premise: You are stuck in Hell until you find the singular book that contains the story of your life from beginning to end, out of all possible combinations of 95 characters across 1,312,000 characters. In the text the library has a size measured in light-years, with more books than there are atoms in our universe.

So it takes a while. The player is mercifully told where their book is. The average playthrough where you go straight for your book would take thousands of hours.

There's also some social simulation of other characters in the Library, and a simulation mode where you can fast forward time and watch them running around the Library.

## Workflow

I used [agentic engineering](https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/). Some patterns I used:
- Multiple Claude Code instances, run through tmux split panes, working on parallel git worktrees. Another Claude Code pane sitting on the main branch that handled merging in changes.
- Tests for everything. Every time a new thing was added we made sure to have tests. Test-driven development is absolutely the way to go in the new age of "a computer writes the code for you". If something broke I expanded test coverage to ensure that it didn't happen again.
- Critic models. I use [paranoia-agent](https://github.com/A-Vaillant/paranoia-agent), my own implementation of what [doll](https://dollspace.gay) calls verification-driven development, against code as it was written to surface concerns and bugs.
- [shot-scraper](https://github.com/simonw/shot-scraper) let Claude see the site as it was making it.

This started as a Twine project and ended up going through 2 large migrations - first to pure JS, then to TypeScript. Working with greenfield projects with an LLM swarm is a lot of fun that way.

## Engineering challenges

Because the Library is very large, it's not actually implementable. We use the BigInt type in our implementation which, in principle, supports unbounded precision. But *memory* ends up burning us here: We want to have NPCs and each NPC has a position. At the 10<sup>100</sup> range each position takes 58 bytes. At 10<sup>100,000</sup> each position takes 40.6 kilobytes. Almost half a megabyte at the 10<sup>1,000,000</sup> range. We have 100+ NPCs and spending half a GB on just NPC positions seemed a bit excessive. So: we bound the Library. But how do we ensure that the player's book is findable? And how do we randomly generate the content of the rest of the books?

There's also the problem of tuning the NPC psychological physics. They have various statistics (Lucidity, Hope). An initial iteration of the game focused more on engaging with other NPCs; I tried to match the source material's depictions and timelines of psychological breakdown.

## Book generation

Most of the work was focused on the placement and generation of books, because I found the mathematics to be really interesting. We began by generating a 1,312,000 character story for the player by just using stock sentences, randomly fit together. The specifics of the story don't really matter, just that it's sensible text.

Our first insight: Every book is an integer in base-95; there's a natural injection from books to integers. We use this integer to establish the origin for the book placement, offset by some random location (to avoid the player's book being located at (0,0)). Our first implementation used a two-branch system wherein the player's book would be shown at that particular location and a PRNG-generated book would be shown at any other location.

Ideally we would have some kind of bijection - a map from the book locations to the integers which inverses the first transform. But then adjacent books would be almost identical, which is not ideal. Trying to do a permutation over the full ℤ/95ℤ<sup>1,312,000</sup> group was a bit computationally unfeasible, and doing a permutation over the playable subset of the Library would only affect characters on some of the pages. So instead we settled for a function where the inverse holds specifically on the player's book location - we permute among locations (so that adjacent locations don't generate similar noise), generate noise for each location, and store the noise from the player book location. Then each book is generated from adding noise to the player's life story and subtracting the player's story noise. At the location where the player's book is, the noise cancels out and you're left with legible text. Everywhere else is nonsense.

## Psychological physics

[I built a simulation view of the Library.](https://a-vaillant.github.io/a-long-day-in-hell/?godmode=1) You can fast-forward time, track individual NPCs, and see how they behave. This ended up going by the wayside but it's neat!

We tuned psychological decay rates by running simulation tests to see how long it takes for NPCs to break. I had originally planned to include a social group dynamics system but, in practice, it was not interesting enough to play.

## Further work

This first iteration had two assumptions: That the entire Library was too large to capture, and that this should be a game. The second one is easy to jettison and I have a sense that the first one might not be true. If I pick up this project again I'd reduce the NPC count to just 2 - one on a pilgrimage going straight to their book and one searching methodically to find their book. I'd cut out all the social and survival systems and instead just watch them over the course of millions upon trillions of millennia work through the Library.
