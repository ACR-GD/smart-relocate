import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Simple monitoring API: returns latest snapshots + recent change events

export async function GET() {
  const root = process.cwd();
  const snapshotsRoot = path.join(root, 'data', 'snapshots');
  const changesRoot = path.join(root, 'data', 'changes');
  const sourcesPath = path.join(root, 'data', 'sources.json');

  let sources: any[] = [];
  if (fs.existsSync(sourcesPath)) {
    try {
      sources = JSON.parse(fs.readFileSync(sourcesPath, 'utf8'));
    } catch {}
  }

  // Latest snapshot per source
  const latestSnapshots = sources.map((source) => {
    const id = source.id;
    const dir = path.join(snapshotsRoot, id);
    if (!fs.existsSync(dir)) {
      return {
        source_id: id,
        source_name: source.name,
        url: source.url,
        latest_snapshot: null,
      };
    }
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.html'))
      .sort();
    const latest = files[files.length - 1] || null;
    return {
      source_id: id,
      source_name: source.name,
      url: source.url,
      latest_snapshot: latest,
    };
  });

  // Recent change events (last N files)
  let changeEvents: any[] = [];
  if (fs.existsSync(changesRoot)) {
    const files = fs
      .readdirSync(changesRoot)
      .filter((f) => f.endsWith('.json'))
      .sort()
      .slice(-50); // latest 50 events max
    changeEvents = files
      .map((file) => {
        try {
          const content = fs.readFileSync(path.join(changesRoot, file), 'utf8');
          return JSON.parse(content);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  }

  return NextResponse.json({ latestSnapshots, changeEvents });
}
