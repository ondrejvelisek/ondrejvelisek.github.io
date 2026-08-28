#!/usr/bin/env node
/**
 * Recount files read and edited, from the session transcripts, after the fact.
 *
 * The harness does this inline, immediately after each `claude -p` exits — which
 * races the transcript flush on long runs and silently under-counts the edits that
 * happen at the end. Run this once the transcripts have settled to get honest
 * numbers, and to see which inline counts were wrong.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const TRANSCRIPTS = path.join(os.homedir(), '.claude', 'projects');

function transcriptPath(sessionId) {
  const direct = path.join(TRANSCRIPTS, ROOT.replaceAll(/[/.]/g, '-'), `${sessionId}.jsonl`);
  if (fs.existsSync(direct)) return direct;
  if (!fs.existsSync(TRANSCRIPTS)) return undefined;
  for (const dir of fs.readdirSync(TRANSCRIPTS)) {
    const candidate = path.join(TRANSCRIPTS, dir, `${sessionId}.jsonl`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return undefined;
}

function countTouched(sessionId) {
  const file = sessionId ? transcriptPath(sessionId) : undefined;
  if (!file) return undefined;

  const read = new Set();
  const edited = new Set();
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    let record;
    try {
      record = JSON.parse(line);
    } catch {
      continue;
    }
    for (const block of record.message?.content ?? []) {
      if (block?.type !== 'tool_use') continue;
      const target = block.input?.file_path;
      if (block.name === 'Read' && target) read.add(target);
      else if (block.name === 'Edit' && target) edited.add(target);
    }
  }
  return { filesRead: read.size, filesEdited: edited.size };
}

const rows = [];
for (const file of fs.readdirSync(path.join(ROOT, 'results')).sort()) {
  const match = file.match(/^(.+?)-(local|ripple|bugfix|add|remove|crosscut|shallow|located)-run(\d+)\.json$/);
  if (!match) continue;
  const payload = JSON.parse(fs.readFileSync(path.join(ROOT, 'results', file), 'utf8'));
  const touched = countTouched(payload.session_id);
  rows.push({
    app: match[1],
    task: match[2],
    run: Number(match[3]),
    ...(touched ?? { filesRead: null, filesEdited: null }),
  });
}

fs.writeFileSync(
  path.join(ROOT, 'results', 'touched-files.json'),
  JSON.stringify(rows, null, 2),
);

const byTask = new Map();
for (const row of rows) {
  const key = `${row.task}|${row.app}`;
  if (!byTask.has(key)) byTask.set(key, []);
  byTask.get(key).push(row);
}

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

console.log('task      app                read  edited   (medians, recounted)');
for (const [key, group] of [...byTask.entries()].sort()) {
  const [task, app] = key.split('|');
  const usable = group.filter((row) => row.filesEdited !== null);
  if (usable.length === 0) {
    console.log(`${task.padEnd(9)} ${app.padEnd(18)} transcript missing`);
    continue;
  }
  console.log(
    `${task.padEnd(9)} ${app.padEnd(18)} ${String(median(usable.map((r) => r.filesRead))).padStart(4)} ` +
      `${String(median(usable.map((r) => r.filesEdited))).padStart(7)}`,
  );
}
console.log(`\n${rows.length} runs recounted → results/touched-files.json`);
