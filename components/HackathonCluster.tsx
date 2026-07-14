import styles from "./HackathonCluster.module.css";

export type HackathonClusterItem = {
  image: string;
  result: string;
  event: string;
};

export default function HackathonCluster({
  items,
}: {
  items: HackathonClusterItem[];
}) {
  return (
    <div className={styles.cluster}>
      {items.map((item) => (
        <div className={styles.piece} key={item.event}>
          <div className={styles.facet}>
            <div className={styles.facetInner}>
              <div className={styles.facetImage}>
                <img src={item.image} alt={item.event} loading="lazy" />
              </div>
              <div className={styles.facetText}>
                <strong>{item.result}</strong>
                <span>{item.event}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
