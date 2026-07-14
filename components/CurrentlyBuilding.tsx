import { building, job } from "@/data/building";
import AlternatingBlock from "./AlternatingBlock";
import Reveal from "./Reveal";
import styles from "./CurrentlyBuilding.module.css";

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="section section-alt">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Currently Building</span>
            <h2 className="section-title">What&rsquo;s active, right now</h2>
          </div>
        </Reveal>
        {building.map((item) => (
          <Reveal key={item.org}>
            <AlternatingBlock
              eyebrow={item.role}
              title={item.org}
              description={item.description}
              linkHref={item.linkHref}
              linkLabel={item.linkLabel}
            />
          </Reveal>
        ))}

        <Reveal>
          <div className={styles.jobRow}>
            <div className={styles.jobText}>
              <strong>
                {job.role}, {job.org}
              </strong>{" "}
              <span className={styles.jobDates}>· {job.dates}</span>
              <br />
              {job.description}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
