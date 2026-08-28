#!/usr/bin/env node
/**
 * Start all four dev servers at once, so the parity suite can be pasted into four
 * browser tabs without four terminals.
 *
 *   abstracted-big    5173
 *   collocated-small  5174
 *   collocated-big    5175
 *   abstracted-small  5176
 *
 * Ports are fixed in each app's vite.config.ts. Ctrl-C stops all of them.
 */

import { spawn } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const APPS = [
  { dir: 'abstracted-big', port: 5173 },
  { dir: 'collocated-small', port: 5174 },
  { dir: 'collocated-big', port: 5175 },
  { dir: 'abstracted-small', port: 5176 },
];

const children = APPS.map(({ dir, port }) => {
  const child = spawn('npm', ['run', 'dev'], {
    cwd: path.join(ROOT, dir),
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const prefix = dir.padEnd(17);
  const relay = (stream) => {
    stream.setEncoding('utf8');
    stream.on('data', (chunk) => {
      for (const line of chunk.split('\n')) {
        if (line.trim()) console.log(`${prefix} ${line}`);
      }
    });
  };
  relay(child.stdout);
  relay(child.stderr);

  console.log(`${prefix} starting on http://localhost:${port}/`);
  return child;
});

const stopAll = () => {
  for (const child of children) child.kill('SIGTERM');
  process.exit(0);
};

process.on('SIGINT', stopAll);
process.on('SIGTERM', stopAll);
