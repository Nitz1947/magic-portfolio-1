import { ReactNode } from "react";
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
      <div className={styles.backdrop} data-variant={variant} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
