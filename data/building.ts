export type BuildingItem = {
  image: string;
  role: string;
  org: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
};

export const building: BuildingItem[] = [
  {
    image: "/images/13.png",
    role: "Founder & CEO",
    org: "Cipher",
    description:
      "Genomic drug target discovery pipeline: identifies natural disease resistors in population biobanks and extracts their protective mechanisms as drug targets — computationally doing what leading competitors do through manual field expeditions. Independently rediscovered PCSK9 (monoclonal antibody inhibition) and APOB (ASO knockdown) as high-confidence drug targets using only public genomic APIs.",
  },
  {
    image: "/images/11.png",
    role: "Co-President & Founder",
    org: "YNot",
    description:
      "A student org built to remove every fear standing between people and entrepreneurship — built on the TRY philosophy (Traditional founders are a myth / Refuse to let fear stop you / Yesterday's failure is tomorrow's foundation).",
    linkHref: "https://ynot-website.vercel.app/",
    linkLabel: "Visit the YNot site",
  },
  {
    image: "/images/12.png",
    role: "VP of Operations",
    org: "RAIN",
    description:
      "Real World AI Network at UCSD — the operating layer for real-world AI on campus, unifying 7,000+ students, 17+ labs and builder clubs, and 38+ aligned faculty across student orgs, faculty, industry, and entrepreneurship.",
    linkHref: "https://rain.ucsd.edu/",
    linkLabel: "Visit RAIN",
  },
];

export const job = {
  image: "/images/22.png",
  role: "Problem Design Engineer",
  org: "Widget Factory",
  dates: "Mar 2026 – present",
  description:
    "Design and evaluate challenging coding puzzles that test deep software engineering fundamentals; assess problem quality, clarity, and solvability across languages and technical domains.",
};
