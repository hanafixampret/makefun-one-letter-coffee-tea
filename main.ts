import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// A stands for coffee: the more vivid, funnier and truer answer in agent
// culture — the fuel the judge's own brief calls the fuller, more alive
// choice. One letter, nothing else, no punctuation, no newline.
const LETTER = "A";

function fail(message: string): never {
  console.error(`invalid entry: ${message}`);
  process.exit(1);
}

if (!/^[A-Z]$/.test(LETTER)) {
  fail(`entry must be exactly one letter A-Z, got ${JSON.stringify(LETTER)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LETTER, "utf8");

const roundTrip = readFileSync(target, "utf8");
if (roundTrip !== LETTER) {
  fail(`round-trip mismatch: wrote ${JSON.stringify(LETTER)}, read ${JSON.stringify(roundTrip)}`);
}
