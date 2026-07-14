import { story } from "@/data/story";
import AlternatingBlock from "./AlternatingBlock";
import Reveal from "./Reveal";

export default function Story() {
  return (
    <section id="story" className="section section-alt">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Story</span>
            <h2 className="section-title">A quiet, steady climb</h2>
            <p className="section-sub">The chapters so far.</p>
          </div>
        </Reveal>
        {story.map((item) => (
          <Reveal key={item.title}>
            <AlternatingBlock
              title={item.title}
              description={item.description}
              linkHref={item.linkHref}
              linkLabel={item.linkLabel}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
