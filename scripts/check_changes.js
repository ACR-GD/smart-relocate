#!/usr/bin/env node

// Compare latest two snapshots per source and log significant changes
// V1: naive text diff based on length + simple difference ratio

const fs = require('fs');
const path = require('path');

const SOURCES_PATH = path.join(__dirname, '..', 'data', 'sources.json');
const SNAPSHOT_ROOT = path.join(__dirname, '..', 'data', 'snapshots');
const CHANGES_ROOT = path.join(__dirname, '..', 'data', 'changes');

function loadSources() {
  if (!fs.existsSync(SOURCES_PATH)) {
    throw new Error(`sources.json not found at ${SOURCES_PATH}`);
  }
  const raw = fs.readFileSync(SOURCES_PATH, 'utf8');
  return JSON.parse(raw);
}

function listSnapshotsFor(id) {
  const dir = path.join(SNAPSHOT_ROOT, id);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.html'))
    .sort(); // filenames include timestamp so sort ~= chronological
}

function readFileSafe(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return '';
  }
}

function simpleDiffScore(a, b) {
  if (!a && !b) return 0;
  if (!a || !b) return 1;

  // Very naive: compare lengths + proportion of differing chars (clipped sample)
  const lenA = a.length;
  const lenB = b.length;
  const maxLen = Math.max(lenA, lenB, 1);
  const lenDiffRatio = Math.abs(lenA - lenB) / maxLen;

  const sampleLen = Math.min(5000, maxLen);
  let diffChars = 0;
  for (let i = 0; i < sampleLen; i++) {
    if (a[i] !== b[i]) diffChars++;
  }
  const charDiffRatio = diffChars / sampleLen;

  // Combine length & char differences
  return (lenDiffRatio * 0.4) + (charDiffRatio * 0.6);
}

function safeTimestamp(date = new Date()) {
  return date.toISOString();
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

async function main() {
  const THRESHOLD = 0.15; // tweak as needed

  try {
    const sources = loadSources();
    ensureDir(CHANGES_ROOT);

    for (const source of sources) {
      const id = source.id;
      const dir = path.join(SNAPSHOT_ROOT, id);
      const snapshots = listSnapshotsFor(id);

      if (snapshots.length < 2) {
        console.log(`[changes] ${id}: not enough snapshots yet (need ≥ 2)`);
        continue;
      }

      const latest = snapshots[snapshots.length - 1];
      const previous = snapshots[snapshots.length - 2];

      const latestPath = path.join(dir, latest);
      const prevPath = path.join(dir, previous);

      const latestHtml = readFileSafe(latestPath);
      const prevHtml = readFileSafe(prevPath);

      const score = simpleDiffScore(prevHtml, latestHtml);
      console.log(`[changes] ${id}: diff score=${score.toFixed(3)} (${previous} -> ${latest})`);

      if (score >= THRESHOLD) {
        const change = {
          source_id: id,
          source_name: source.name,
          url: source.url,
          detected_at: safeTimestamp(),
          previous_snapshot: previous,
          latest_snapshot: latest,
          diff_score: score,
        };

        const outFile = path.join(
          CHANGES_ROOT,
          `${id}_${Date.now()}.json`
        );
        fs.writeFileSync(outFile, JSON.stringify(change, null, 2), 'utf8');
        console.log(`[changes] ${id}: significant change recorded -> ${outFile}`);
      }
    }

    console.log('[changes] Done.');
  } catch (err) {
    console.error('[changes] Fatal error:', err.message);
    process.exitCode = 1;
  }
}

main();
