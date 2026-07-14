import styles from "./AlternatingBlock.module.css";

export type AlternatingBlockProps = {
  eyebrow?: string;
  title: string;
  description: string;
  tags?: string[];
  linkHref?: string;
  linkLabel?: string;
};

export default function AlternatingBlock({
  eyebrow,
  title,
  description,
  tags,
  linkHref,
  linkLabel,
}: AlternatingBlockProps) {
  return (
    <div className={styles.block}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
      {tags && tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
      {linkHref && (
        <a
          className="pill-button outline"
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkLabel ?? "View"} <span aria-hidden>→</span>
        </a>
      )}
    </div>
  );
}
