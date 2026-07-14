import { projects } from "@/data/projects";
import AlternatingBlock from "./AlternatingBlock";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Projects</span>
            <h2 className="section-title">Built, shipped, and battle-tested</h2>
            <p className="section-sub">Strongest first.</p>
          </div>
        </Reveal>
        {projects.map((item) => (
          <Reveal key={item.title}>
            <AlternatingBlock
              title={item.title}
              description={item.description}
              tags={item.tags}
              linkHref={item.githubHref}
              linkLabel={item.githubHref ? "GitHub" : undefined}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
