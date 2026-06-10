import { ReactNode } from "react";
import { CodeGridBackground } from "./CodeGridBackground";
import { FloatingSymbols } from "./FloatingSymbols";
import styles from "./SectionBackground.module.scss";

type SectionBackgroundProps = {
  children: ReactNode;
  variant?: "grid" | "symbols";
};

export function SectionBackground({ children, variant = "grid" }: SectionBackgroundProps) {
  return (
    <div className={styles.wrap}>
      {variant === "grid" ? (
        <CodeGridBackground density="sparse" />
      ) : (
        <FloatingSymbols density="sparse" />
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
