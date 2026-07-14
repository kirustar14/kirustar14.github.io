# Personal Website Build Prompt — for Claude Code

Paste everything below into Claude Code, pointed at the empty GitHub repo that already contains one folder: `images/`, with files `1.png` through `22.png`.

---

## THE BRIEF

Build me a personal portfolio website. Theme name: **"Gold Dragon, Diamond Heart."** The core idea: a dragon that doesn't guard gold because it glitters, it guards it because it's real. Soft, white, rounded, sweet at first glance — but elegant and wicked smart underneath. Not a loud fantasy theme. A quiet-confidence theme with a dragon motif running through it.

**Style reference:** Match the structure and interaction pattern of this site: https://ynot-website.vercel.app/ (a site I built before and loved the feel of). Specifically:
- Simple top nav bar: logo/name on the left, a handful of text links on the right
- Hero: one headline, one short subline, TWO clear pill-shaped CTA buttons side by side, one large mascot image (dragon instead of bee)
- Below the hero, the page is a clean single-column scroll, NOT a busy grid. Each concept gets its own full-width block: one dragon image on one side, a short headline + 1-2 sentences of text on the other side, alternating left/right as you scroll down
- One moment in the page where multiple small elements cluster together visually as a group (like the "five fears" hexagon cluster on YNot) — use this for the hackathon wins, clustered together as a set of small diamond or soft-rounded shapes each containing one dragon image + one line of text
- Simple, uncluttered footer: tagline, social/contact links, copyright line
- This is NOT a card-grid portfolio site. It's a narrative, one-block-at-a-time scroll, same as YNot. Swap the bee for the dragon, swap honey-gold/hexagons for champagne-gold/soft-diamond shapes, swap the black text for warm charcoal, but keep the exact same clean, uncluttered, one-story-at-a-time rhythm.

### Design system

- **Background:** warm ivory/eggshell white, not stark white
- **Primary accent:** soft muted champagne/antique gold (not bright yellow-gold, not honey-yellow)
- **Text:** warm charcoal/espresso brown, not pure black
- **Bright accent (sparingly, hover states/underlines/CTA buttons only):** a slightly brighter gold shimmer
- **Shapes:** rounded everything — pill-shaped nav links and buttons, soft-cornered image containers, generous border-radius, soft drop shadows, no sharp edges anywhere. Where YNot used hexagons, use a soft rounded diamond/facet shape instead
- **Typography:** an elegant serif for headings (something that feels a little mythic/refined, e.g. Playfair Display or Cormorant), a clean humanist sans for body text (e.g. Inter or Work Sans)
- **Overall feel:** premium, calm, a little playful, never gaudy — same warmth and simplicity as the YNot site, just gold/dragon instead of honey/bee

### Hero section

- My name: **Kiruthika Marikumaran**
- Quote, in smaller italic type, clearly attributed:
  > "All that is gold does not glitter" — J.R.R. Tolkien, *The Lord of the Rings*
- Below that, my own tagline in my own words:
  > "Remember, A Diamond Is Simply Coal That Survived..."
- One dragon image as the hero visual: use `images/1.png` (Origin: hatchling with LEGO/Rubik's cube) OR feel free to use a more "hero-appropriate" one if you generate a proper hero graphic later — for now use `images/1.png`.
- Quick nav links to: Story, Hackathons, Currently Building, Projects, Contact

### Story / Timeline section

Same pattern as YNot's alternating blocks — each life stage is a full-width block, dragon image on one side, headline + short description on the other, alternating left/right down the page as you scroll:

| Image | Title | Description |
|---|---|---|
| `images/1.png` | Where it started | Grew up building — LEGO, Rubik's Cube, anything with moving parts. Never really stopped. |
| `images/7.png` | B.S. Computer Engineering, in 2 years | Sep 2023 – Jun 2025, UC San Diego, 3.85 GPA |
| `images/8.png` | M.S. Electrical & Computer Engineering | Medical Devices & Systems track, UC San Diego, Sep 2025 – Mar 2027 (expected) |
| `images/9.png` | Inaugural Poseidon Fellow | 1 of 12 in UCSD's first cohort of its premier entrepreneurship fellowship, led by Shawn Xu (Partner, Lowercarbon Capital, Forbes 30 Under 30) and Prof. Elizabeth Lyons. Modeled after Stanford's Mayfield Fellows. [UCSD News coverage →](https://today.ucsd.edu/story/poseidon-fellows-first-cohort) |
| `images/10.png` | YC Startup School 2026 | 30,000+ applicants; keynotes from Jensen Huang (NVIDIA), Sam Altman (OpenAI), Jeff Dean (Google DeepMind) |

### Hackathon wins section (clustered group, like YNot's "five fears" hexagon cluster)

Header line: **9+ hackathons competed, here's where it counted.**

Lay these out as a visual cluster of small soft-rounded diamond/facet shapes grouped together (same idea as the hexagon cluster on YNot), each containing one dragon image + one short line of text, not a horizontal card row:

| Image | Result | Event |
|---|---|---|
| `images/2.png` | 9+ hackathons competed since January | General hackathon energy |
| `images/3.png` | Top 7 | YC Voice Agents Hackathon, May 2026 |
| `images/4.png` | 1st Place, Small Molecule Track | AIxBio Hackathon, UCSD, May 2026 |
| `images/5.png` | 1st Place, ML & AI Tooling | DataHacks 2026, UCSD, Apr 2026 |
| `images/6.png` | MLH Best Use of Gemini API | DiamondHacks (San Diego's largest hackathon), Apr 2026 |

### Currently Building / Roles section

Same alternating full-width block layout as the Story section. Three main blocks, these are current, active, present-tense:

1. **`images/13.png`** — **Founder & CEO, Cipher.** Genomic drug target discovery pipeline: identifies natural disease resistors in population biobanks and extracts their protective mechanisms as drug targets — computationally doing what leading competitors do through manual field expeditions. Independently rediscovered PCSK9 (monoclonal antibody inhibition) and APOB (ASO knockdown) as high-confidence drug targets using only public genomic APIs.
2. **`images/11.png`** — **Co-President & Founder, YNot.** A student org built to remove every fear standing between people and entrepreneurship — built on the TRY philosophy (Traditional founders are a myth / Refuse to let fear stop you / Yesterday's failure is tomorrow's foundation). [Visit the YNot site →](https://ynot-website.vercel.app/)
3. **`images/12.png`** — **VP of Operations, RAIN.** Real World AI Network at UCSD — the operating layer for real-world AI on campus, unifying 7,000+ students, 17+ labs and builder clubs, and 38+ aligned faculty across student orgs, faculty, industry, and entrepreneurship. [Visit RAIN →](https://rain.ucsd.edu/)

Also include, styled a little more understated (this is a job, not a passion project, keep it brief):
- **Problem Design Engineer, Widget Factory** — Mar 2026 – present. Design and evaluate challenging coding puzzles that test deep software engineering fundamentals; assess problem quality, clarity, and solvability across languages and technical domains. Use `images/22.png`.

**Do not** include any other past work experience or internships — only Cipher, YNot, RAIN, and Widget Factory should appear under experience/roles.

### Projects section

Same alternating full-width block layout as the rest of the page, one project per block, image on one side (or no image for the last two), text + tech tags + GitHub button on the other. Order (best to worst, i.e. lead with the strongest):

1. **DracoCare** — `images/14.png` — Your personal dragon-powered health clinic: an AI health assistant with three dragon characters guiding patients from symptoms to a booked appointment, plus a prescription price finder. [GitHub →](https://github.com/Mallika1405/DracoCare)
2. **Sidebar** — `images/15.png` — Real-time AI co-counsel for the courtroom, worn as Meta Ray-Ban glasses: listens to live testimony, fact-checks claims in real time, analyzes witness stress signals, and whispers actionable intelligence to the lawyer hands-free. Built in one day, Top 7 at the YC Voice Agents Hackathon. [GitHub →](https://github.com/J4Joshua/CourtLine)
3. **Watson & Crick** — `images/16.png` — An AI-powered environmental health research engine where two AI scientists argue over your data in real time and hand back a peer-review-grade report in ~30 seconds. 1st Place, ML & AI Tooling, DataHacks 2026. [GitHub →](https://github.com/kirustar14/WatsonCrick)
4. **Trading Bot** — `images/20.png` — A momentum-based XGBoost trading bot predicting late-afternoon stock direction, 70.1% direction accuracy on Costco (COST). [GitHub →](https://github.com/kirustar14/TradingBot)
5. **Neuro-LENS** — `images/21.png` — A polygenic risk score analysis backend: parses patient VCF files, harmonizes alleles against GWAS data, and calculates factor-based genetic risk scores. [GitHub →](https://github.com/kirustar14/nuero-lens)
6. **Glitch** — `images/17.png` — An adaptive learning platform that rewires any PDF around how YOUR brain works — same source material, completely different curriculum depending on the learner. Built in 24 hours at a YC GStack × GBrain Hackathon. [GitHub →](https://github.com/kirustar14/glitch)
7. **Chameleon Tutor Studio** — `images/18.png` — Turns PDF study notes into full AI-generated songs, lyrics, vocals, and mixed audio, all in one workflow. [GitHub →](https://github.com/kirustar14/notes2song)
8. **BLEprint** — `images/19.png` — Construction hazard detection and AR documentation platform; embedded CV prototype (ESP32 + YOLOv8) that grew into a full cloud-synced web app after 50+ user interviews. Selected for the Blackstone LaunchPad program at UCSD Basement. [GitHub →](https://github.com/kirustar14/BLEprint-mvp)
9. **Schema Linking via LoRA Fine-Tuning** — *text-only card, no dragon image, no GitHub link* — PyTorch, Hugging Face, Qwen2.5-1.5B, LoRA. Identified a right-truncation bug zeroing out 34/101 predictions; an inference-only fix (left-truncation + raised context) lifted the score from 0.2967 to 0.5409 with identical weights — 85% of the total gain, zero retraining. Widened retrieval to 300 columns / 3072-token context, raising the recall ceiling from 0.816 to 0.930; final leaderboard score 0.6419 (table: 0.718, column: 0.565) across 20+ ablation configs.
10. **RapidFire AI RAG Pipeline** — *text-only card, no dragon image, no GitHub link* — LangChain, FAISS, BM25, BGE, HuggingFace. Hybrid BM25 + FAISS retrieval with cross-encoder reranking; swapping in BAAI/bge-reranker-large delivered the largest single gain (+0.10 Retrieval Score, 0.5907 to 0.6984). 768-character chunks outperformed 256-character chunks by 20% on retrieval and 41% on generation. Final Retrieval Score 0.698 (F1@5: 0.638, R@5: 0.939) across 32 grid runs.

Each block with a dragon image should show: dragon image on one side, project name, 1-2 line description, tech stack tags (small pill badges), and a clear GitHub link/button on the other side. The two text-only blocks (Schema Linking, RapidFire RAG) skip the image, same block width, just centered text + tech tags, no GitHub button.

### Contact / Footer

- Phone: 925-967-7432
- Email: kiruthika.star14@gmail.com
- LinkedIn: [linkedin.com/in/kiruthika-star14](https://www.linkedin.com/in/kiruthika-star14/)
- GitHub: [github.com/kirustar14](https://github.com/kirustar14)
- Keep this section clean and minimal, icon buttons or a simple row of links, matching the rounded soft-gold aesthetic

---

## TECHNICAL INSTRUCTIONS

- Build in **Next.js with React** (App Router) — no heavy backend needed, this is a portfolio site, but use Next.js/React specifically, not plain static HTML
- Use the `images/1.png` through `images/22.png` files already in the repo exactly where mapped above — do not regenerate or replace them
- Fully responsive: alternating image/text blocks should stack cleanly (image on top, text below) on mobile instead of side by side
- This is a single-column narrative scroll site, like YNot — not a swipeable card grid. No horizontal swiping needed anywhere except possibly within the hackathon cluster group if it helps mobile layout
- Smooth, subtle animations on scroll (gentle fade/slide-in as each block enters view) are welcome, matching the calm feel of YNot, but keep it tasteful, not flashy
- Favicon: use a small crop of one of the dragon images if feasible
- Structure the codebase cleanly with a reusable "alternating block" component since Story, Currently Building, and Projects all use the same left-image/right-text (or reversed) pattern