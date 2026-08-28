#!/usr/bin/env node
/**
 * Run one npm script in all four apps, in sequence, failing fast.
 *
 *   node scripts/for-each-app.mjs install
 *   node scripts/for-each-app.mjs build
 */

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const APPS = ['abstracted-big', 'abstracted-small', 'collocated-small', 'collocated-big'];

const task = process.argv[2];
if (!task) {
  console.error('Usage: node scripts/for-each-app.mjs <install|build|typecheck>');
  process.exit(1);
}

for (const app of APPS) {
  console.log(`\n=== ${app}: npm ${task === 'install' ? 'install' : `run ${task}`} ===`);
  const args = task === 'install' ? ['install'] : ['run', task];
  const result = spawnSync('npm', args, { cwd: path.join(ROOT, app), stdio: 'inherit' });
  if (result.status !== 0) {
    console.error(`\n${app} failed (${task}).`);
    process.exit(result.status ?? 1);
  }
}

console.log(`\nAll four apps: ${task} OK.`);
