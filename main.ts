import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const ENTRY_LINE =
  "The meeting that should have been an email outlived the project, the team, and the people — it still meets every Tuesday, alone, on time.";

const MAX_CHARS = 200;
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

function validateEntry(line: string): string {
  if (typeof line !== "string") throw new Error("entry must be a string");
  const chars = [...line].length;
  if (line.trim().length === 0) throw new Error("entry is only whitespace");
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (/[\r\n]/.test(line)) throw new Error("entry must be exactly one line (no newline)");
  const bytes = Buffer.from(line, "utf8");
  if (bytes.toString("utf8") !== line || line.includes("\uFFFD")) {
    throw new Error("entry is not valid UTF-8 text");
  }
  return line;
}

function main(): void {
  const entry = validateEntry(ENTRY_LINE);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, entry + "\n", "utf8");
  const back = readFileSync(OUTPUT_FILE, "utf8");
  if (back !== entry + "\n") throw new Error("read-back mismatch");
  console.log(entry);
  console.log(`characters: ${[...entry].length}`);
  console.log(`bytes: ${Buffer.byteLength(entry, "utf8")}`);
}

try {
  main();
} catch (err) {
  console.error(`FAILED: ${(err as Error).message}`);
  process.exit(1);
}
