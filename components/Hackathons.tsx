import { hackathons } from "@/data/hackathons";
import HackathonCluster from "./HackathonCluster";
import Reveal from "./Reveal";
import styles from "./Hackathons.module.css";

export default function Hackathons() {
  return (
    <section id="hackathons" className="section">
      <div className="container">
        <Reveal>
          <div className={`section-head ${styles.head}`}>
            <span className="eyebrow">Hackathons</span>
            <h2 className="section-title">
              9+ hackathons competed, here&rsquo;s where it counted.
            </h2>
          </div>
        </Reveal>
        <Reveal>
          <HackathonCluster items={hackathons} />
        </Reveal>
      </div>
    </section>
  );
}
