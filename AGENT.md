# AGENT.md

## What this is

A one-line joke entry for the make.fun bounty "The Meeting That Should Have Been an Email". The joke is a zombie calendar invite: the meeting outlived everything that once justified it.

## The entry line

```
The meeting that should have been an email outlived the project, the team, and the people — it still meets every Tuesday, alone, on time.
```

137 characters, 139 bytes (the em dash is 3 bytes), one line.

## How to run

```
node main.ts
```

Node 22 runs the TypeScript directly. No dependencies, only `node:fs`. The program validates the line (UTF-8, 1–200 characters, not whitespace-only, single line), creates `/output` if needed, writes `/output/entry.txt` (the line plus one trailing newline), reads it back to compare, and prints the line, its character count and its byte count. On any failure it prints `FAILED: <reason>` and exits 1.

## How it was verified

The program was run by the repo owner after the first write and again after each refactor (the `validateEntry`/`main()` split, then the `�` escape and `MAX_CHARS` constant). Each run printed the entry line with 137 characters / 139 bytes, and `/output/entry.txt` read back byte-identical as one line. The build agent could not execute `node` in its sandbox, so these runs were done by the owner, not by the agent.
