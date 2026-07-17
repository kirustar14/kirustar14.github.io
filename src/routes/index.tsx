import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

const projects = [
  {
    name: "DracoCare",
    desc: "Your personal dragon-powered health clinic: an AI health assistant with three dragon characters guiding patients from symptoms to a booked appointment, plus a prescription price finder.",
    tags: ["Healthcare AI", "Agents", "LLM"],
    github: "https://github.com/Mallika1405/DracoCare",
  },
  {
    name: "Sidebar",
    desc: "Real-time AI co-counsel for the courtroom, worn as Meta Ray-Ban glasses: listens to live testimony, fact-checks claims in real time, analyzes witness stress signals, and whispers actionable intelligence to the lawyer hands-free. Built in one day, Top 7 at the YC Voice Agents Hackathon.",
    tags: ["Voice AI", "Wearables", "Real-time"],
    github: "https://github.com/J4Joshua/CourtLine",
  },
  {
    name: "Watson & Crick",
    desc: "An AI-powered environmental health research engine where two AI scientists argue over your data in real time and hand back a peer-review-grade report in ~30 seconds. 1st Place, ML & AI Tooling, DataHacks 2026.",
    tags: ["Multi-Agent", "Research AI", "Environmental Health"],
    github: "https://github.com/kirustar14/WatsonCrick",
  },
  {
    name: "Trading Bot",
    desc: "A momentum-based XGBoost trading bot predicting late-afternoon stock direction, 70.1% direction accuracy on Costco (COST).",
    tags: ["XGBoost", "Quant", "Python"],
    github: "https://github.com/kirustar14/TradingBot",
  },
  {
    name: "Neuro-LENS",
    desc: "A polygenic risk score analysis backend: parses patient VCF files, harmonizes alleles against GWAS data, and calculates factor-based genetic risk scores.",
    tags: ["Genomics", "Bioinformatics", "Python"],
    github: "https://github.com/kirustar14/nuero-lens",
  },
  {
    name: "Glitch",
    desc: "An adaptive learning platform that rewires any PDF around how YOUR brain works — same source material, completely different curriculum depending on the learner. Built in 24 hours at a YC GStack × GBrain Hackathon.",
    tags: ["EdTech", "LLM", "Personalization"],
    github: "https://github.com/kirustar14/glitch",
  },
  {
    name: "Chameleon Tutor Studio",
    desc: "Turns PDF study notes into full AI-generated songs, lyrics, vocals, and mixed audio, all in one workflow.",
    tags: ["Generative Audio", "EdTech", "LLM"],
    github: "https://github.com/kirustar14/notes2song",
  },
  {
    name: "BLEprint",
    desc: "Construction hazard detection and AR documentation platform; embedded CV prototype (ESP32 + YOLOv8) that grew into a full cloud-synced web app after 50+ user interviews. Selected for the Blackstone LaunchPad program at UCSD Basement.",
    tags: ["Computer Vision", "IoT", "AR"],
    github: "https://github.com/kirustar14/BLEprint-mvp",
  },
  {
    name: "Schema Linking via LoRA Fine-Tuning",
    desc: "Identified a right-truncation bug zeroing out 34/101 predictions; an inference-only fix (left-truncation + raised context) lifted the score from 0.2967 to 0.5409 with identical weights — 85% of the total gain, zero retraining. Widened retrieval to 300 columns / 3072-token context, raising the recall ceiling from 0.816 to 0.930; final leaderboard score 0.6419 (table: 0.718, column: 0.565) across 20+ ablation configs.",
    tags: ["PyTorch", "Hugging Face", "Qwen2.5-1.5B", "LoRA"],
    github: null,
  },
  {
    name: "RapidFire AI RAG Pipeline",
    desc: "Hybrid BM25 + FAISS retrieval with cross-encoder reranking; swapping in BAAI/bge-reranker-large delivered the largest single gain (+0.10 Retrieval Score, 0.5907 to 0.6984). 768-character chunks outperformed 256-character chunks by 20% on retrieval and 41% on generation. Final Retrieval Score 0.698 (F1@5: 0.638, R@5: 0.939) across 32 grid runs.",
    tags: ["LangChain", "FAISS", "BM25", "BGE", "HuggingFace"],
    github: null,
  },
];

const timeline = [
  { title: "Where it started", body: "Grew up building — LEGO, Rubik's Cube, anything with moving parts." },
  { title: "Curiosity never stops", body: "Never really stopped building, tinkering, and asking why something works." },
  { title: "B.S. Computer Engineering, in 2 years", body: "Sep 2023 – Jun 2025, UC San Diego, 3.85 GPA" },
  { title: "M.S. Electrical & Computer Engineering", body: "Medical Devices & Systems track, UC San Diego, Sep 2025 – Dec 2026 (expected graduation)" },
  {
    title: "Inaugural Poseidon Fellow",
    body: "1 of 12 in UCSD's first cohort of its premier entrepreneurship fellowship, led by Shawn Xu (Partner, Lowercarbon Capital, Forbes 30 Under 30) and Prof. Elizabeth Lyons. Modeled after Stanford's Mayfield Fellows.",
    link: { href: "https://today.ucsd.edu/story/poseidon-fellows-first-cohort", label: "UCSD News coverage" },
  },
  {
    title: "YC Startup School 2026",
    body: "30,000+ applicants; keynotes from Jensen Huang (NVIDIA), Sam Altman (OpenAI), Jeff Dean (Google DeepMind).",
  },
];

const experience = [
  {
    role: "Founder & CEO",
    org: "Cipher",
    body: "Genomic drug target discovery pipeline: identifies natural disease resistors in population biobanks and extracts their protective mechanisms as drug targets — computationally doing what leading competitors do through manual field expeditions. Independently rediscovered PCSK9 (monoclonal antibody inhibition) and APOB (ASO knockdown) as high-confidence drug targets using only public genomic APIs.",
  },
  {
    role: "Co-President & Founder",
    org: "YNot",
    body: "A student org built to remove every fear standing between people and entrepreneurship — built on the TRY philosophy (Traditional founders are a myth / Refuse to let fear stop you / Yesterday's failure is tomorrow's foundation).",
    link: "https://ynot-website.vercel.app/",
  },
  {
    role: "VP of Operations",
    org: "RAIN",
    body: "Real World AI Network at UCSD — the operating layer for real-world AI on campus, unifying 7,000+ students, 17+ labs and builder clubs, and 38+ aligned faculty across student orgs, faculty, industry, and entrepreneurship.",
    link: "https://rain.ucsd.edu/",
  },
  {
    role: "Problem Design Engineer",
    org: "Widget Factory",
    body: "Mar 2026 – present. Design and evaluate challenging coding puzzles that test deep software engineering fundamentals; assess problem quality, clarity, and solvability across languages and technical domains.",
  },
];

const awards = [
  { title: "1st Place, Small Molecule Track", where: "AIxBio Hackathon, UCSD", when: "May 2026" },
  { title: "1st Place, ML & AI Tooling", where: "DataHacks 2026, UCSD", when: "Apr 2026" },
  { title: "Top 7", where: "YC Voice Agents Hackathon", when: "May 2026" },
  { title: "MLH Best Use of Gemini API", where: "DiamondHacks (San Diego's largest hackathon)", when: "Apr 2026" },
];

const projectColors = [
  "tile-peach", "tile-mint", "tile-sky", "tile-lav", "tile-butter",
  "tile-blush", "tile-lime", "tile-coral", "tile-mint", "tile-sky",
];
const timelineColors = ["tile-peach", "tile-mint", "tile-lav", "tile-sky", "tile-butter", "tile-blush"];
const expColors = ["tile-coral", "tile-mint", "tile-lav", "tile-butter"];
const awardColors = ["tile-butter", "tile-peach", "tile-lav", "tile-mint"];

function NavPill() {
  const items = [
    ["story", "Story"],
    ["projects", "Projects"],
    ["experience", "Experience"],
    ["awards", "Awards"],
    ["contact", "Contact"],
  ];
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center gap-1 rounded-full border-[1.5px] border-black bg-white px-2 py-1.5 shadow-[3px_3px_0_0_#111]">
        {items.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="block rounded-full px-3 py-1.5 text-[13px] font-bold hover:bg-black hover:text-white transition-colors"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SectionLabel({ n, kicker, children }: { n: string; kicker?: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="chip">{n}</span>
        {kicker && <span className="handwritten text-2xl text-black/70">— {kicker}</span>}
      </div>
      <h2 style={{ fontFamily: "Fraunces, serif" }} className="mt-3 text-4xl md:text-6xl tracking-tight font-bold leading-[1]">
        {children}
      </h2>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* fun background dots */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(#ffd8e4 1.5px, transparent 1.5px), radial-gradient(#d6ecff 1.5px, transparent 1.5px)",
          backgroundSize: "44px 44px, 44px 44px",
          backgroundPosition: "0 0, 22px 22px",
        }}
      />

      <NavPill />

      {/* HERO / STORY */}
      <section id="story" className="max-w-6xl mx-auto px-5 pt-28 pb-16">
        <div className="tile tile-hover tile-butter p-8 md:p-14 relative">
          <span
            className="handwritten absolute -top-4 left-8 bg-white border-[1.5px] border-black rounded-full px-3 py-0.5 text-xl shadow-[2px_2px_0_0_#111] -rotate-3"
          >
            hi, i'm →
          </span>
          <h1
            style={{ fontFamily: "Fraunces, serif" }}
            className="text-6xl md:text-8xl leading-[0.95] tracking-tight font-bold mt-4"
          >
            Kiruthika<br />
            <span className="italic font-medium">Marikumaran</span>
            <span className="handwritten text-4xl md:text-5xl align-top ml-2 text-[#c44569]">✨</span>
          </h1>

          <blockquote
            style={{ fontFamily: "Fraunces, serif" }}
            className="italic text-xl md:text-2xl mt-8 max-w-2xl"
          >
            "All that is gold does not glitter"
            <span className="block not-italic text-sm text-black/70 mt-2 font-sans font-semibold">
              — J.R.R. Tolkien, <em>The Lord of the Rings</em>
            </span>
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-2">
            <a href="mailto:kiruthika.star14@gmail.com" className="chip hover:bg-black hover:text-white transition">✉ Email</a>
            <a href="tel:9259677432" className="chip hover:bg-black hover:text-white transition">☏ 925-967-7432</a>
            <a href="https://www.linkedin.com/in/kiruthika-star14/" target="_blank" rel="noreferrer" className="chip hover:bg-black hover:text-white transition">↗ LinkedIn</a>
            <a href="https://github.com/kirustar14" target="_blank" rel="noreferrer" className="chip hover:bg-black hover:text-white transition">↗ GitHub</a>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-10">
          <div className="flex items-baseline gap-3 mb-6">
            <span className="chip">01 · Story</span>
            <span className="handwritten text-2xl text-black/70">— the long version</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {timeline.map((t, i) => (
              <div key={i} className={`tile tile-hover ${timelineColors[i % timelineColors.length]} p-6 md:p-7`}>
                <div className="flex items-baseline gap-3">
                  <span className="handwritten text-4xl text-black/70">0{i + 1}</span>
                  <h3 style={{ fontFamily: "Fraunces, serif" }} className="text-xl md:text-2xl font-bold tracking-tight">
                    {t.title}
                  </h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed font-medium">{t.body}</p>
                {t.link && (
                  <a
                    href={t.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 text-sm font-bold underline underline-offset-4 decoration-2 decoration-black/40 hover:decoration-black"
                  >
                    {t.link.label} ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-5 py-16">
        <SectionLabel n="02 · Projects" kicker="strongest first">
          Built, shipped &amp; battle-tested.
        </SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className={`tile tile-hover ${projectColors[i % projectColors.length]} p-6 md:p-7 flex flex-col`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="handwritten text-3xl text-black/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 style={{ fontFamily: "Fraunces, serif" }} className="text-2xl md:text-3xl font-bold tracking-tight">
                    {p.name}
                  </h3>
                </div>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.name} on GitHub`}
                    className="shrink-0 rounded-full border-[1.5px] border-black w-10 h-10 grid place-items-center bg-white hover:bg-black hover:text-white transition shadow-[2px_2px_0_0_#111]"
                  >
                    ↗
                  </a>
                )}
              </div>
              <p className="mt-4 text-[15px] leading-relaxed font-medium flex-1">{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-6xl mx-auto px-5 py-16">
        <SectionLabel n="03 · Experience" kicker="where the work happens">
          Currently building.
        </SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {experience.map((e, i) => (
            <article key={e.org} className={`tile tile-hover ${expColors[i % expColors.length]} p-6 md:p-7`}>
              <div className="text-xs uppercase tracking-[0.2em] font-bold">{e.role}</div>
              <h3 style={{ fontFamily: "Fraunces, serif" }} className="text-3xl md:text-4xl font-bold tracking-tight mt-1">
                {e.org}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed font-medium">{e.body}</p>
              {e.link && (
                <a
                  href={e.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-sm font-bold underline underline-offset-4 decoration-2 decoration-black/40 hover:decoration-black"
                >
                  Visit ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* AWARDS */}
      <section id="awards" className="max-w-6xl mx-auto px-5 py-16">
        <SectionLabel n="04 · Awards" kicker="9+ hackathons, here's where it counted">
          The wins.
        </SectionLabel>

        <ul className="space-y-4">
          {awards.map((a, i) => (
            <li
              key={i}
              className={`tile tile-hover ${awardColors[i % awardColors.length]} p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3`}
            >
              <div className="flex items-baseline gap-4">
                <span className="handwritten text-4xl text-black/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div style={{ fontFamily: "Fraunces, serif" }} className="text-xl md:text-2xl font-bold tracking-tight">
                    {a.title}
                  </div>
                  <div className="text-sm font-semibold text-black/70 mt-0.5">{a.where}</div>
                </div>
              </div>
              {a.when && <span className="chip self-start sm:self-auto">{a.when}</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* CONTACT (last) */}
      <section id="contact" className="max-w-6xl mx-auto px-5 py-16">
        <SectionLabel n="05 · Contact" kicker="say hi">
          Let's talk.
        </SectionLabel>

        <div className="tile tile-hover tile-blush p-8 md:p-12">
          <p style={{ fontFamily: "Fraunces, serif" }} className="text-2xl md:text-3xl max-w-2xl leading-snug font-medium">
            Open to conversations about <em className="italic">genomics</em>, <em className="italic">AI</em>, <em className="italic">hardware</em>, or the next thing worth building.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="mailto:kiruthika.star14@gmail.com" className="tile tile-hover tile-butter p-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest font-bold">Email</div>
                <div style={{ fontFamily: "Fraunces, serif" }} className="text-lg font-bold mt-1 break-all">kiruthika.star14@gmail.com</div>
              </div>
              <span className="text-xl">✉</span>
            </a>
            <a href="tel:9259677432" className="tile tile-hover tile-mint p-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest font-bold">Phone</div>
                <div style={{ fontFamily: "Fraunces, serif" }} className="text-lg font-bold mt-1">925-967-7432</div>
              </div>
              <span className="text-xl">☏</span>
            </a>
            <a href="https://www.linkedin.com/in/kiruthika-star14/" target="_blank" rel="noreferrer" className="tile tile-hover tile-sky p-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest font-bold">LinkedIn</div>
                <div style={{ fontFamily: "Fraunces, serif" }} className="text-lg font-bold mt-1">/in/kiruthika-star14</div>
              </div>
              <span className="text-xl">↗</span>
            </a>
            <a href="https://github.com/kirustar14" target="_blank" rel="noreferrer" className="tile tile-hover tile-lav p-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest font-bold">GitHub</div>
                <div style={{ fontFamily: "Fraunces, serif" }} className="text-lg font-bold mt-1">@kirustar14</div>
              </div>
              <span className="text-xl">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-5 pt-4 pb-14">
        <div className="tile tile-lime p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div style={{ fontFamily: "Fraunces, serif" }} className="text-2xl font-bold tracking-tight">
            Kiruthika Marikumaran
          </div>
          <div className="handwritten text-xl">© 2026 · made with curiosity ✿</div>
        </div>
      </footer>
    </div>
  );
}
