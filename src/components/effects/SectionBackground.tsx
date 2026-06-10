import { ReactNode } from "react";
import styles from "./SectionBackground.module.scss";

type SectionBackgroundProps = {
  children: ReactNode;
  variant?: "grid" | "symbols";
};

export function SectionBackground({ children }: SectionBackgroundProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
