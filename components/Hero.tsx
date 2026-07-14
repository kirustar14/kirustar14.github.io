import FacetMotif from "./FacetMotif";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <FacetMotif variant="a" />
      <FacetMotif variant="b" />
      <div className="container">
        <div className={styles.center}>
          <h1 className={styles.name}>Kiruthika Marikumaran</h1>
          <p className={styles.quote}>
            &ldquo;All that is gold does not glitter&rdquo;
          </p>
          <p className={styles.attribution}>
            — J.R.R. Tolkien, <em>The Lord of the Rings</em>
          </p>
          <div className={styles.actions}>
            <a href="#story" className="pill-button">
              See My Story
            </a>
            <a href="#contact" className="pill-button outline">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
