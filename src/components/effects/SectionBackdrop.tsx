import { ReactNode } from "react";
import { CodeGridBackground } from "./CodeGridBackground";
import { FloatingSymbols } from "./FloatingSymbols";
import { ScanLineOverlay } from "./ScanLineOverlay";
import { SectionGlow } from "./SectionGlow";
import { SyntaxHighlightBlock } from "./SyntaxHighlightBlock";
import { TerminalTyping } from "./TerminalTyping";
import styles from "./SectionBackdrop.module.scss";

export type SectionVariant =
  | "hero"
  | "projects"
  | "process"
  | "blog"
  | "blogPreview"
  | "newsletter"
  | "about"
  | "work"
  | "workDetail"
  | "blogPost";

type SectionBackdropProps = {
  variant: SectionVariant;
  children: ReactNode;
  className?: string;
};

function BackdropLayers({ variant }: { variant: SectionVariant }) {
  switch (variant) {
    case "hero":
      return <SectionGlow intensity="subtle" />;
    case "projects":
      return (
        <>
          <SectionGlow />
          <FloatingSymbols density="sparse" />
          <ScanLineOverlay />
        </>
      );
    case "process":
      return (
        <>
          <SectionGlow />
          <CodeGridBackground density="sparse" />
        </>
      );
    case "blogPreview":
      return (
        <>
          <SectionGlow intensity="subtle" />
          <FloatingSymbols density="sparse" />
        </>
      );
    case "newsletter":
      return (
        <>
          <SectionGlow intensity="subtle" />
          <ScanLineOverlay />
        </>
      );
    case "about":
      return (
        <>
          <SectionGlow />
          <CodeGridBackground />
        </>
      );
    case "work":
      return (
        <>
          <SectionGlow />
          <FloatingSymbols />
          <SyntaxHighlightBlock position="topRight" compact />
        </>
      );
    case "workDetail":
      return (
        <>
          <SectionGlow intensity="subtle" />
          <CodeGridBackground density="sparse" />
        </>
      );
    case "blog":
      return (
        <>
          <SectionGlow />
          <FloatingSymbols density="sparse" />
          <SyntaxHighlightBlock position="bottomLeft" variant="api" compact />
        </>
      );
    case "blogPost":
      return (
        <>
          <SectionGlow intensity="subtle" />
          <CodeGridBackground density="sparse" />
        </>
      );
    default:
      return null;
  }
}

export function SectionBackdrop({ variant, children, className }: SectionBackdropProps) {
  return (
    <div className={`${styles.section} ${className ?? ""}`}>
      <div className={styles.backdrop}>
        <BackdropLayers variant={variant} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export function SectionTerminal() {
  return <TerminalTyping />;
}
