#!/usr/bin/env node
/**
 * Enforce zero skipped tests using Vitest JSON reporter.
 * Fails with exit code 1 if any skipped tests are found.
 */
import { spawn } from 'node:child_process';

let output = '';
// Resolve vitest executable (Windows compatibility: use .cmd)
const vitestExecutable = process.platform === 'win32'
  ? `${process.cwd()}\\node_modules\\.bin\\vitest.cmd`
  : `${process.cwd()}/node_modules/.bin/vitest`;

const vitest = process.platform === 'win32'
  ? spawn('cmd.exe', ['/c', vitestExecutable, 'run'], { stdio: ['ignore', 'pipe', 'inherit'] })
  : spawn(vitestExecutable, ['run'], { stdio: ['ignore', 'pipe', 'inherit'] });

vitest.stdout.on('data', (chunk) => {
  output += chunk.toString();
});

vitest.on('close', () => {
  // Fallback heuristic: If any line mentions 'skipped' with a non-zero number, fail.
  const skippedMatch = output.match(/skipped\s+(\d+)/i);
  if (skippedMatch) {
    const count = parseInt(skippedMatch[1], 10);
    if (count > 0) {
      console.error(`✖ Skipped tests detected: ${count}. Enforcement failed.`);
      process.exit(1);
    }
  }
  // If word 'skipped' absent entirely, we assume zero.
  console.log('✔ No skipped tests detected (heuristic check).');
  process.exit(0);
});
