import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const stashDir = path.join(root, ".github-pages-stash");

const moves = [
  { from: path.join(root, "src", "app", "api"), to: path.join(stashDir, "api") },
  { from: path.join(root, "middleware.ts"), to: path.join(stashDir, "middleware.ts") },
];

function stash() {
  fs.mkdirSync(stashDir, { recursive: true });
  for (const { from, to } of moves) {
    if (fs.existsSync(from)) {
      fs.cpSync(from, to, { recursive: true });
      fs.rmSync(from, { recursive: true, force: true });
    }
  }
}

function restore() {
  for (const { from, to } of moves) {
    if (fs.existsSync(to)) {
      fs.mkdirSync(path.dirname(from), { recursive: true });
      fs.cpSync(to, from, { recursive: true });
      fs.rmSync(to, { recursive: true, force: true });
    }
  }
  if (fs.existsSync(stashDir)) {
    fs.rmSync(stashDir, { recursive: true, force: true });
  }
}

stash();

try {
  const result = spawnSync("npm", ["run", "build"], {
    cwd: root,
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
      NEXT_PUBLIC_BASE_URL:
        process.env.NEXT_PUBLIC_BASE_URL ??
        "https://nitz1947.github.io/magic-portfolio-1",
    },
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
} finally {
  restore();
}
