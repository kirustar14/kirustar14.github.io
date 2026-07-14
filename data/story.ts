export type StoryItem = {
  image: string;
  title: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
};

export const story: StoryItem[] = [
  {
    image: "/images/1.png",
    title: "Where it started",
    description:
      "Grew up building — LEGO, Rubik's Cube, anything with moving parts. Never really stopped.",
  },
  {
    image: "/images/7.png",
    title: "B.S. Computer Engineering, in 2 years",
    description: "Sep 2023 – Jun 2025, UC San Diego, 3.85 GPA",
  },
  {
    image: "/images/8.png",
    title: "M.S. Electrical & Computer Engineering",
    description:
      "Medical Devices & Systems track, UC San Diego, Sep 2025 – Mar 2027 (expected)",
  },
  {
    image: "/images/9.png",
    title: "Inaugural Poseidon Fellow",
    description:
      "1 of 12 in UCSD's first cohort of its premier entrepreneurship fellowship, led by Shawn Xu (Partner, Lowercarbon Capital, Forbes 30 Under 30) and Prof. Elizabeth Lyons. Modeled after Stanford's Mayfield Fellows.",
    linkHref: "https://today.ucsd.edu/story/poseidon-fellows-first-cohort",
    linkLabel: "UCSD News coverage",
  },
  {
    image: "/images/10.png",
    title: "YC Startup School 2026",
    description:
      "30,000+ applicants; keynotes from Jensen Huang (NVIDIA), Sam Altman (OpenAI), Jeff Dean (Google DeepMind)",
  },
];
