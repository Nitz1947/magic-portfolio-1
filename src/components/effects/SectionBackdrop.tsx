import { ReactNode } from "react";
import styles from "./SectionBackdrop.module.scss";

export type SectionVariant = "hero";

type SectionBackdropProps = {
  variant: SectionVariant;
  children: ReactNode;
  background?: ReactNode;
  className?: string;
};

export function SectionBackdrop({ variant, children, background, className }: SectionBackdropProps) {
  return (
    <div className={`${styles.section} ${className ?? ""}`}>
      <div className={styles.backdrop} data-variant={variant}>
        {background}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
