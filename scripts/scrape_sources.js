#!/usr/bin/env node

// Simple scraper for official Malaysian immigration-related sources
// V1: fetch HTML and store timestamped snapshots under data/snapshots/<id>/

const fs = require('fs');
const path = require('path');

const SOURCES_PATH = path.join(__dirname, '..', 'data', 'sources.json');
const SNAPSHOT_ROOT = path.join(__dirname, '..', 'data', 'snapshots');

async function loadSources() {
  if (!fs.existsSync(SOURCES_PATH)) {
    throw new Error(`sources.json not found at ${SOURCES_PATH}`);
  }
  const raw = fs.readFileSync(SOURCES_PATH, 'utf8');
  return JSON.parse(raw);
}

function safeTimestamp(date = new Date()) {
  // e.g. 2026-01-30T08-00-00Z
  return date.toISOString().replace(/:/g, '-');
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'SmartRelocateBot/0.1' } });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }
  return await res.text();
}

async function main() {
  try {
    const sources = await loadSources();
    const timestamp = safeTimestamp();

    if (!fs.existsSync(SNAPSHOT_ROOT)) {
      fs.mkdirSync(SNAPSHOT_ROOT, { recursive: true });
    }

    for (const source of sources) {
      const id = source.id;
      const url = source.url;
      const dir = path.join(SNAPSHOT_ROOT, id);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      try {
        console.log(`[scrape] Fetching ${id} from ${url}...`);
        const html = await fetchHtml(url);
        const filename = `${id}_${timestamp}.html`;
        const fullPath = path.join(dir, filename);
        fs.writeFileSync(fullPath, html, 'utf8');
        console.log(`[scrape] Saved ${fullPath}`);
      } catch (err) {
        console.error(`[scrape] Error fetching ${id} (${url}):`, err.message);
      }
    }

    console.log('[scrape] Done.');
  } catch (err) {
    console.error('[scrape] Fatal error:', err.message);
    process.exitCode = 1;
  }
}

// Node 18+ has global fetch; guard just in case
if (typeof fetch === 'undefined') {
  console.error('Global fetch is not available in this Node runtime.');
  process.exit(1);
}

main();
