import fs from "node:fs";
import path from "node:path";
import { __unstable__loadDesignSystem } from "@tailwindcss/node";

const css = fs.readFileSync("src/app/globals.css", "utf8");
const designSystem = await __unstable__loadDesignSystem(css, { base: process.cwd() });
const files = fs
  .readdirSync("src", { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(tsx|ts)$/.test(entry.name))
  .map((entry) => path.join(entry.parentPath, entry.name));

let count = 0;
for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const tokens = new Set(source.match(/[!@a-zA-Z0-9_:/\.\[\]%#(),-]+/g) ?? []);
  for (const token of tokens) {
    const canonical = designSystem.canonicalizeCandidates([token], { rem: 16 })[0];
    if (canonical && canonical !== token) {
      console.log(`${file}: ${token} => ${canonical}`);
      count += 1;
    }
  }
}

console.log(`Remaining canonical suggestions: ${count}`);
process.exitCode = count === 0 ? 0 : 1;
