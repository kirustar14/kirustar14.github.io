export type ProjectItem = {
  image?: string;
  title: string;
  description: string;
  tags: string[];
  githubHref?: string;
};

export const projects: ProjectItem[] = [
  {
    image: "/images/14.png",
    title: "DracoCare",
    description:
      "Your personal dragon-powered health clinic: an AI health assistant with three dragon characters guiding patients from symptoms to a booked appointment, plus a prescription price finder.",
    tags: ["Healthcare AI", "Agents", "LLM"],
    githubHref: "https://github.com/Mallika1405/DracoCare",
  },
  {
    image: "/images/15.png",
    title: "Sidebar",
    description:
      "Real-time AI co-counsel for the courtroom, worn as Meta Ray-Ban glasses: listens to live testimony, fact-checks claims in real time, analyzes witness stress signals, and whispers actionable intelligence to the lawyer hands-free. Built in one day, Top 7 at the YC Voice Agents Hackathon.",
    tags: ["Voice AI", "Wearables", "Real-time"],
    githubHref: "https://github.com/J4Joshua/CourtLine",
  },
  {
    image: "/images/16.png",
    title: "Watson & Crick",
    description:
      "An AI-powered environmental health research engine where two AI scientists argue over your data in real time and hand back a peer-review-grade report in ~30 seconds. 1st Place, ML & AI Tooling, DataHacks 2026.",
    tags: ["Multi-Agent", "Research AI", "Environmental Health"],
    githubHref: "https://github.com/kirustar14/WatsonCrick",
  },
  {
    image: "/images/20.png",
    title: "Trading Bot",
    description:
      "A momentum-based XGBoost trading bot predicting late-afternoon stock direction, 70.1% direction accuracy on Costco (COST).",
    tags: ["XGBoost", "Quant", "Python"],
    githubHref: "https://github.com/kirustar14/TradingBot",
  },
  {
    image: "/images/21.png",
    title: "Neuro-LENS",
    description:
      "A polygenic risk score analysis backend: parses patient VCF files, harmonizes alleles against GWAS data, and calculates factor-based genetic risk scores.",
    tags: ["Genomics", "Bioinformatics", "Python"],
    githubHref: "https://github.com/kirustar14/nuero-lens",
  },
  {
    image: "/images/17.png",
    title: "Glitch",
    description:
      "An adaptive learning platform that rewires any PDF around how YOUR brain works — same source material, completely different curriculum depending on the learner. Built in 24 hours at a YC GStack × GBrain Hackathon.",
    tags: ["EdTech", "LLM", "Personalization"],
    githubHref: "https://github.com/kirustar14/glitch",
  },
  {
    image: "/images/18.png",
    title: "Chameleon Tutor Studio",
    description:
      "Turns PDF study notes into full AI-generated songs, lyrics, vocals, and mixed audio, all in one workflow.",
    tags: ["Generative Audio", "EdTech", "LLM"],
    githubHref: "https://github.com/kirustar14/notes2song",
  },
  {
    image: "/images/19.png",
    title: "BLEprint",
    description:
      "Construction hazard detection and AR documentation platform; embedded CV prototype (ESP32 + YOLOv8) that grew into a full cloud-synced web app after 50+ user interviews. Selected for the Blackstone LaunchPad program at UCSD Basement.",
    tags: ["Computer Vision", "IoT", "AR"],
    githubHref: "https://github.com/kirustar14/BLEprint-mvp",
  },
  {
    title: "Schema Linking via LoRA Fine-Tuning",
    description:
      "Identified a right-truncation bug zeroing out 34/101 predictions; an inference-only fix (left-truncation + raised context) lifted the score from 0.2967 to 0.5409 with identical weights — 85% of the total gain, zero retraining. Widened retrieval to 300 columns / 3072-token context, raising the recall ceiling from 0.816 to 0.930; final leaderboard score 0.6419 (table: 0.718, column: 0.565) across 20+ ablation configs.",
    tags: ["PyTorch", "Hugging Face", "Qwen2.5-1.5B", "LoRA"],
  },
  {
    title: "RapidFire AI RAG Pipeline",
    description:
      "Hybrid BM25 + FAISS retrieval with cross-encoder reranking; swapping in BAAI/bge-reranker-large delivered the largest single gain (+0.10 Retrieval Score, 0.5907 to 0.6984). 768-character chunks outperformed 256-character chunks by 20% on retrieval and 41% on generation. Final Retrieval Score 0.698 (F1@5: 0.638, R@5: 0.939) across 32 grid runs.",
    tags: ["LangChain", "FAISS", "BM25", "BGE", "HuggingFace"],
  },
];
