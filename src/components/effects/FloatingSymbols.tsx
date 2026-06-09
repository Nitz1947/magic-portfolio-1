import styles from "./FloatingSymbols.module.scss";

const SYMBOLS = [
  "{ }",
  "[ ]",
  "=>",
  "const",
  "import",
  "async",
  "await",
  "export",
  "type",
  "interface",
  "()",
  "npm",
  "git",
  "pnpm",
  "tsx",
];

type FloatItem = {
  text: string;
  top: string;
  left: string;
  duration: number;
  delay: number;
};

function buildItems(count: number): FloatItem[] {
  return Array.from({ length: count }, (_, i) => ({
    text: SYMBOLS[i % SYMBOLS.length],
    top: `${8 + (i * 17) % 82}%`,
    left: `${4 + (i * 23) % 88}%`,
    duration: 18 + (i % 6) * 4,
    delay: -(i * 1.3),
  }));
}

const FULL_ITEMS = buildItems(10);
const SPARSE_ITEMS = buildItems(5);

export function FloatingSymbols({ density = "full" }: { density?: "full" | "sparse" }) {
  const items = density === "sparse" ? SPARSE_ITEMS : FULL_ITEMS;

  return (
    <div className={styles.wrapper} aria-hidden="true">
      {items.map((item, i) => (
        <span
          key={i}
          className={styles.symbol}
          style={{
            top: item.top,
            left: item.left,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}
