/*
 Size Guard: enforce bundle size thresholds for enterprise/government grade
 - ES module gzip <= 50 KB
 - UMD gzip <= 75 KB
 - Raw sizes informative only
*/
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const files = [
  { name: 'eva-sovereign-ui.es.js', maxGzipKB: 50 },
  { name: 'eva-sovereign-ui.umd.js', maxGzipKB: 75 }
];

function gzipSize(buf) {
  return zlib.gzipSync(buf).length;
}

let ok = true;
for (const f of files) {
  const p = path.join(distDir, f.name);
  if (!fs.existsSync(p)) {
    console.error(`Missing build file: ${f.name}. Run build first.`);
    process.exit(1);
  }
  const buf = fs.readFileSync(p);
  const rawKB = buf.length / 1024;
  const gzKB = gzipSize(buf) / 1024;
  console.log(`${f.name}: raw ${rawKB.toFixed(1)} KB, gzip ${gzKB.toFixed(1)} KB (limit ${f.maxGzipKB} KB)`);
  if (gzKB > f.maxGzipKB) {
    console.error(`❌ ${f.name} exceeds gzip limit (${gzKB.toFixed(1)} KB > ${f.maxGzipKB} KB)`);
    ok = false;
  }
}

if (!ok) {
  process.exit(1);
}
console.log('✔ Bundle size thresholds OK');
