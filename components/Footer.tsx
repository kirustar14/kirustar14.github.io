import { contact } from "@/data/contact";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="contact" className={`section section-alt ${styles.footer}`}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.tagline}>
            <h2 className={styles.title}>Let&rsquo;s talk</h2>
            <p className={styles.sub}>
              Open to conversations about genomics, AI, hardware, or the next
              thing worth building.
            </p>
          </div>
          <div className={styles.links}>
            <a
              className={styles.link}
              href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
            >
              📞 {contact.phone}
            </a>
            <a className={styles.link} href={`mailto:${contact.email}`}>
              ✉️ {contact.email}
            </a>
            <a
              className={styles.link}
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              in {contact.linkedinLabel}
            </a>
            <a
              className={styles.link}
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              ⌥ {contact.githubLabel}
            </a>
          </div>
        </div>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Kiruthika Marikumaran.
        </p>
      </div>
    </footer>
  );
}
