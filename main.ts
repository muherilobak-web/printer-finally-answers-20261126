// The Printer Finally Answers — make.fun entry
// Bounty: u-mang-the-printer-finally-answers-8fbf0907
// One line in the voice of a tired office printer that finally answers
// everyone staring at it: a flat, all-caps status log. It counts every
// page it printed, every jam it survived, and every thank-you it never
// received — then delivers one quiet verdict.
// Node 22+, stdlib only. No network, no randomness, fully deterministic:
// the same line is written on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  // 97 characters — inside the 90-150 target band. One status label,
  // three ledger counts, one closing verdict. Nothing else.
  "STATUS: 481,204 PAGES PRINTED. 137 JAMS CLEARED. 0 THANKS RECEIVED. THIS LOG IS RETAINED FOREVER.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 240) {
    throw new Error(`entry must be 1-240 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  for (const ch of line) {
    const code = ch.charCodeAt(0);
    if (code < 0x20 || code === 0x7f) {
      throw new Error("entry must not contain control characters");
    }
  }
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";

validate(LINE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
