"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/contact";
import styles from "./Nav.module.css";

export default function Nav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const updateActive = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      let current = sections[0];
      for (const section of sections) {
        if (section.offsetTop <= scrollPos) {
          current = section;
        }
      }
      if (atBottom) {
        current = sections[sections.length - 1];
      }

      setActive(`#${current.id}`);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <div className={styles.wrap}>
      <nav className={styles.pill}>
        <a href="#" className={styles.brand}>
          <span className={styles.brandFull}>Kiruthika Marikumaran</span>
          <span className={styles.brandShort}>KM</span>
        </a>
        <div className={styles.links}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.link} ${
                active === link.href ? styles.active : ""
              }`}
            >
              <span className={styles.linkFull}>{link.label}</span>
              <span className={styles.linkShort}>{link.shortLabel}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
