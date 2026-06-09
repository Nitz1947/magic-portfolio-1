import { ReactNode } from "react";
import { SectionGlow } from "./SectionGlow";
import styles from "./SectionBackdrop.module.scss";

export type SectionVariant = "hero";

type SectionBackdropProps = {
  variant: SectionVariant;
  children: ReactNode;
  className?: string;
};

export function SectionBackdrop({ variant, children, className }: SectionBackdropProps) {
  return (
    <div className={`${styles.section} ${className ?? ""}`}>
      <div className={styles.backdrop}>
        {variant === "hero" && <SectionGlow intensity="subtle" />}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
