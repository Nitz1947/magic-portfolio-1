import styles from "./SectionGlow.module.scss";

type SectionGlowProps = {
  intensity?: "full" | "subtle";
};

export function SectionGlow({ intensity = "full" }: SectionGlowProps) {
  if (intensity === "subtle") {
    return (
      <div className={styles.wrapper} aria-hidden="true">
        <div className={`${styles.orb} ${styles.cyan} ${styles.topLeft}`} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={`${styles.orb} ${styles.cyan} ${styles.topLeft}`} />
      <div className={`${styles.orb} ${styles.teal} ${styles.bottomRight}`} />
    </div>
  );
}
