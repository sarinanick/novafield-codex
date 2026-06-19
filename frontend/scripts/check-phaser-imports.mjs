import { glob } from "node:fs/promises";
import { readFile } from "node:fs/promises";

const invalid = [];

for await (const file of glob("src/lib/phaser/**/*.ts")) {
  const source = await readFile(file, "utf8");
  if (source.includes('import Phaser from "phaser"')) {
    invalid.push(file);
  }
}

if (invalid.length > 0) {
  console.error(`Invalid Phaser default imports:\n${invalid.join("\n")}`);
  process.exit(1);
}
