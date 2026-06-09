import styles from "./CodeGridBackground.module.scss";

const SYMBOLS = ["{ }", "</>", "#", "fn()", "=>", "[]", "import", "const"];

type SymbolItem = {
  text: string;
  top: string;
  left: string;
  delay: number;
  duration: number;
};

const PLACEMENTS: SymbolItem[] = [
  { text: "{ }", top: "12%", left: "8%", delay: 0, duration: 14 },
  { text: "</>", top: "22%", left: "82%", delay: 2, duration: 16 },
  { text: "#", top: "55%", left: "5%", delay: 1, duration: 13 },
  { text: "fn()", top: "68%", left: "88%", delay: 3, duration: 15 },
  { text: "=>", top: "38%", left: "72%", delay: 0.5, duration: 12 },
  { text: "[]", top: "78%", left: "42%", delay: 1.5, duration: 17 },
  { text: "import", top: "8%", left: "55%", delay: 2.5, duration: 14 },
  { text: "const", top: "85%", left: "18%", delay: 4, duration: 13 },
];

export function CodeGridBackground({ density = "full" }: { density?: "full" | "sparse" }) {
  const symbols = density === "sparse" ? PLACEMENTS.slice(0, 4) : PLACEMENTS;

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.grid} />
      {symbols.map((item) => (
        <span
          key={`${item.text}-${item.top}`}
          className={styles.symbol}
          style={{
            top: item.top,
            left: item.left,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}
