import styles from "./SyntaxHighlightBlock.module.scss";

type SyntaxHighlightBlockProps = {
  position?: "topRight" | "bottomLeft";
  compact?: boolean;
  variant?: "component" | "api";
};

export function SyntaxHighlightBlock({
  position = "topRight",
  compact = false,
  variant = "component",
}: SyntaxHighlightBlockProps) {
  return (
    <div
      className={`${styles.wrapper} ${styles[position]}`}
      aria-hidden="true"
    >
      <pre className={`${styles.block} ${compact ? styles.compact : ""}`}>
        {variant === "component" ? (
          <>
            <span className={styles.keyword}>export</span>
            <span className={styles.punctuation}> </span>
            <span className={styles.keyword}>function</span>
            <span className={styles.punctuation}> </span>
            <span className={styles.function}>ProjectCard</span>
            <span className={styles.punctuation}>({"{"}</span>
            {"\n"}
            <span className={styles.punctuation}>  </span>
            <span className={styles.keyword}>title</span>
            <span className={styles.punctuation}>,</span>
            {"\n"}
            <span className={styles.punctuation}>  </span>
            <span className={styles.keyword}>href</span>
            <span className={styles.punctuation}>,</span>
            {"\n"}
            <span className={styles.punctuation}>{"}) {"}</span>
            {"\n"}
            <span className={styles.punctuation}>  </span>
            <span className={styles.keyword}>return</span>
            <span className={styles.punctuation}> &lt;</span>
            <span className={styles.function}>Card</span>
            <span className={styles.punctuation}> /&gt;;</span>
            {"\n"}
            <span className={styles.punctuation}>{"}"}</span>
          </>
        ) : (
          <>
            <span className={styles.comment}>// fetch posts</span>
            {"\n"}
            <span className={styles.keyword}>const</span>
            <span className={styles.punctuation}> </span>
            <span className={styles.function}>data</span>
            <span className={styles.punctuation}> = </span>
            <span className={styles.keyword}>await</span>
            <span className={styles.punctuation}> </span>
            <span className={styles.function}>fetch</span>
            <span className={styles.punctuation}>(</span>
            <span className={styles.string}>&apos;/api/posts&apos;</span>
            <span className={styles.punctuation}>);</span>
          </>
        )}
      </pre>
    </div>
  );
}
