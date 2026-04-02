# seed document: vaillant.ai portfolio rebuild

## project identity

**working title:** vaillant.ai portfolio rebuild
**type:** software — static portfolio site
**owner:** alice vaillant (aleister vaillant professionally)
**domain:** vaillant.ai, deployed to github pages
**repo:** /Users/alice/src/web/vaillant.ai/

a portfolio site that demonstrates alice builds things. not a resume with links — a place where the engineering thinking behind each project is legible to someone spending 30-90 seconds. target audience: technical hiring managers, engineering peers, anyone who wants to see how she works. not optimized for recruiter box-checking, not a personal/creative site (that's strange.domains).

## existing state

the site currently exists as a minimal static landing page + resume. read the repo before starting — understand what's there.

key things already in place:
- `resume.json` — structured resume data (JSON Resume format). this is the source of truth for professional info.
- `build-resume.js` — build script that compiles resume.json into resume.html
- `resume.test.js` — 28 tests (vitest), eslint, husky pre-commit hooks
- `site.css` / `resume.css` — dark CRT aesthetic, IBM Plex Mono, grid background with drift animation
- `?a=2` query parameter switches displayed name from "Aleister Vaillant" to "Alice Vaillant" via charcode encoding. this must be preserved.
- CNAME configured for vaillant.ai on github pages

## authority boundaries

### sovereign — alice's exclusive domain
- **project narrative prose.** the "what it is," "why it's hard," and "how it works" sections on project pages. you generate scaffolding and structure. alice writes or approves the actual descriptions. do not generate project descriptions from your training data — you don't know these projects well enough.
- **visual design decisions** beyond the existing aesthetic. if you want to change the look, propose it.
- **project inclusion/exclusion.** the lineup is defined below. don't add or remove projects.

### delegated — agent acts autonomously
- static site generator selection and configuration (astro, eleventy, or similar — pick whatever gets markdown-sourced project pages templated fastest with minimal config)
- build pipeline: replace or adapt the existing build-resume.js to work within the generator
- templating, layout CSS, responsive implementation — within the existing aesthetic language
- test migration or rewrite for the new build system
- deployment configuration (github pages, static output)
- file organization and directory structure

### collaborative — agent proposes, alice decides
- landing page layout changes (currently: name, title, contact links)
- project page structure beyond the baseline defined below
- any deviation from the existing CRT/monospace/dark aesthetic
- navigation patterns between pages

## technical constraints

- **deploys to github pages as static files.** no server-side anything.
- **resume.json remains the source of truth** for resume data. the generator should consume it, not duplicate it.
- **`?a=2` name switch must work** on all pages. the current implementation uses charcode encoding to avoid the name "Alice" appearing in source. preserve this pattern or an equivalent obfuscation.
- **existing quality bar:** the current site has tests, linting, and pre-commit hooks. the rebuild must maintain or exceed this. no shipping without tests.
- **mermaid diagrams for architecture.** each project page should include at least one system-level diagram (data flow, component relationships, pipeline stages). mermaid is preferred — it's text-based, version-controllable, and renders without external dependencies. no stock images, no decorative graphics.
- **mobile must work.** the current site is responsive. keep it that way.

## pages

### landing (index)
what's there now plus project navigation. visitor should see the project list without clicking through to the resume first. keep it tight — name, title, project links, contact links.

### resume
generated from resume.json. functionally equivalent to what exists. can be visually refined but the content pipeline stays the same.

### project pages (one per project, markdown-sourced)

each project page follows this structure:
1. **what it is** — one paragraph. plain description. lead with a quantified impact statement if possible ("real-time CV on edge hardware for live theater" not "a computer vision project").
2. **why it's hard** — the interesting engineering constraint. what makes this non-trivial. be specific about the tradeoff space — latency vs. accuracy, hardware limits, data scarcity, whatever applied.
3. **how it works** — architecture and key decisions. include a mermaid diagram showing system-level structure (data flow, component relationships). this section should make the reader think "this person reasons about systems," not "this person followed a tutorial."
4. **decisions and tradeoffs** — why you chose X over Y. what you tried that didn't work. this is the section that separates senior from junior: juniors describe what they built, seniors describe what they considered and why they chose what they chose.
5. **metrics and outcomes** — quantified where possible. test count, latency numbers, accuracy figures, scale indicators. not vanity metrics — numbers that demonstrate you measured what mattered.
6. **links** — github repo, live demo if applicable.

**tone guidance for the receiving agent:** the project pages are technical writing, not marketing copy. no superlatives, no "cutting-edge," no puffery. the facts should be impressive on their own or they aren't impressive. write like you're explaining the system to a peer engineer over coffee, not pitching a VC. alice will review and rewrite — the scaffolding should be accurate and flat, giving her room to add voice.

the projects, with context for scaffolding:

**storyverse CV pipeline**
real-time computer vision for immersive theater (GÖSPEL production). YOLO object detection deployed to raspberry pi. synthetic training data generated in blender. kalman filter tracking. this is production ML with real constraints — edge hardware, real-time requirements, physical deployment environment. repo is private and the project is winding down — alice will write the narrative from memory. no github link; the page has to stand on the description alone.

**a long day in hell (7drl)**
browser roguelike. 1200+ tests, 439+ commits. base-95 bijection mapping life stories to coordinates in a library of 95^1,312,000 books. procedural generation with seeded PRNG. social simulation (120 NPCs, disposition state machine). the engineering story is the scale of the test infrastructure, the math, and the procedural systems. github: https://github.com/A-Vaillant/a-long-day-in-hell

**paranoia agent**
adversarial code reviewer powered by LLM. frame explicitly as an eval tool — this is the project most aligned with current AI hiring signal. it reviews code for quality, finds issues, scores on a rubric, and loops until the code meets threshold or the reviewer is forced to invent problems (zero-slop condition). the page should emphasize: the evaluation methodology (rubric design, scoring, threshold logic), the feedback loop architecture, and what "zero-slop" means as a convergence criterion. this is eval engineering, not just "i made an LLM call." github: https://github.com/A-Vaillant/paranoia-agent

**yapperbot**
autonomous LLM journaling agent. grammar-constrained generation via outlines-core, state machine execution loop, local model deployment. frame as context engineering: the interesting problem is controlling autonomous generation — grammar constraints as guardrails, state machine as execution policy, local deployment as a constraint that forces architectural discipline you don't need when you can just call an API. github: https://github.com/A-Vaillant/yapperbot

### what's out of scope
- blog or writing integration (strange.domains is the creative outlet, separate concern)
- contact forms, analytics, comments, anything dynamic
- fiction, personal projects, non-engineering work
- "about me" prose beyond what's on the landing page

## visual design

the existing aesthetic is good. preserve it:
- IBM Plex Mono throughout
- dark background (#08090b range), light text
- grid background with subtle animation
- minimal, text-forward, no stock photos or decorative elements
- the site should look like someone who writes code built it, because someone who writes code built it

## project filesystem

```
vaillant.ai/
├── src/                    # or whatever the generator expects
│   ├── pages/
│   │   ├── index.*         # landing page
│   │   └── resume.*        # resume page
│   ├── projects/           # markdown project pages
│   │   ├── storyverse.md
│   │   ├── 7drl.md
│   │   ├── paranoia-agent.md
│   │   └── yapperbot.md
│   ├── layouts/            # page templates
│   ├── styles/             # CSS (migrate existing)
│   └── data/
│       └── resume.json     # moved or symlinked
├── tests/                  # test suite
├── public/                 # static assets (CNAME, etc.)
├── package.json
└── ...config files
```

this is a suggestion. adapt to the generator's conventions. the important thing is that project pages are markdown files that alice can edit without touching templates.

## question engine

when starting work, surface questions to alice in batches of 2-3, prioritized by what blocks the most other work. likely first questions:

- landing page: how prominent should project links be vs. contact/resume links?
- storyverse: what metrics and architectural details can be shared publicly? the narrative has to stand alone without source code.
- diagrams: alice to confirm accuracy of architecture diagrams before they ship. the agent should draft mermaid diagrams but flag them as needing review.

## what good looks like (reference sites)

these are examples of ML/AI engineer portfolios that work. study the patterns, not the content:

- **hamel husain** (hamel.dev) — technical blog where the writing *is* the portfolio. his evals post demonstrates the skill it advocates for. quarto-based, leads with identity then proves it.
- **lilian weng** (lilianweng.github.io) — long-form technical posts that provide conceptual clarity. cited everywhere. the depth is the signal.
- **shreya shankar** (sh-reya.com) — minimalist. leads with credentials, immediately pivots to impact ("DocETL used by public defenders..."). no visual noise.

the common thread: the site demonstrates the thinking, not just lists the projects. architecture diagrams, tradeoff discussions, and quantified outcomes are the table stakes.

## anti-patterns to avoid

- **no GPT-wrapper energy.** if a project looks like "i called an API," it's not portfolio-worthy. the interesting part is always the system around the model call.
- **no notebook-as-production.** jupyter is for EDA. if code is in a notebook, it's not production code.
- **no AI-generated portfolio text.** hiring managers claim 82% detection rate. whether that number is real doesn't matter — the perception is real. alice writes the prose. the agent scaffolds structure.
- **no vanity metrics.** "99% accuracy" on an imbalanced dataset is a red flag, not a brag. report metrics that demonstrate you understood what to measure.
- **no unexplained projects.** a github link with no context is invisible. every project needs the full page treatment or it doesn't go on the site.

## success criteria

- the site builds, deploys to github pages, and looks like the same site with more pages
- project pages exist as markdown files that are easy to edit
- each project page includes: impact statement, architecture diagram, decisions/tradeoffs section, and quantified metrics
- a technical hiring manager landing on the site can understand what alice builds within 30 seconds
- a peer engineer clicking into a project page finds genuine technical depth within 60 seconds
- the test suite covers the build pipeline and page generation
- the `?a=2` switch works across all pages
- mobile is usable
