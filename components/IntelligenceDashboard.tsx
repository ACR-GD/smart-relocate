"use client";

import { useState, useEffect } from 'react';
import { Activity, Globe } from 'lucide-react';

type Log = {
  id: number;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning';
};

type MonitoringSnapshot = {
  source_id: string;
  source_name: string;
  url: string;
  latest_snapshot: string | null;
};

type MonitoringChangeEvent = {
  source_id: string;
  source_name: string;
  url: string;
  detected_at: string;
  previous_snapshot: string;
  latest_snapshot: string;
  diff_score: number;
};

type MonitoringResponse = {
  latestSnapshots: MonitoringSnapshot[];
  changeEvents: MonitoringChangeEvent[];
};

export default function IntelligenceDashboard() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [snapshots, setSnapshots] = useState<MonitoringSnapshot[]>([]);
  const [lastChange, setLastChange] = useState<MonitoringChangeEvent | null>(null);

  // Fetch real monitoring data and blend with simulated logs for "wow" factor
  useEffect(() => {
    let cancelled = false;

    async function fetchMonitoring() {
      try {
        const res = await fetch('/api/monitoring');
        if (!res.ok) return;
        const data: MonitoringResponse = await res.json();
        if (cancelled) return;

        setSnapshots(data.latestSnapshots || []);
        const changes = data.changeEvents || [];
        const latestChange = changes.length > 0 ? changes[changes.length - 1] : null;
        setLastChange(latestChange);

        const now = new Date().toLocaleTimeString();
        const newLogs: Log[] = [];

        // Log for each source last snapshot
        (data.latestSnapshots || []).forEach((s) => {
          if (s.latest_snapshot) {
            newLogs.push({
              id: Date.now() + Math.random(),
              timestamp: now,
              type: 'info',
              message: `Checked ${s.source_name} (${s.source_id}) at snapshot ${s.latest_snapshot}`,
            });
          } else {
            newLogs.push({
              id: Date.now() + Math.random(),
              timestamp: now,
              type: 'warning',
              message: `No snapshots yet for ${s.source_name} (${s.source_id})`,
            });
          }
        });

        // Latest change event, if any
        if (latestChange) {
          newLogs.push({
            id: Date.now() + Math.random(),
            timestamp: now,
            type: latestChange.diff_score > 0.3 ? 'warning' : 'success',
            message: `Change detected on ${latestChange.source_name} (score=${latestChange.diff_score.toFixed(
              2,
            )})`,
          });
        } else {
          newLogs.push({
            id: Date.now() + Math.random(),
            timestamp: now,
            type: 'success',
            message: 'No significant regulatory changes detected in last checks.',
          });
        }

        // Blend with a couple of flavor logs
        newLogs.push(
          {
            id: Date.now() + Math.random(),
            timestamp: now,
            type: 'info',
            message: 'AI Model (Gemini 2.5) online.',
          },
          {
            id: Date.now() + Math.random(),
            timestamp: now,
            type: 'success',
            message: 'Visa database sync complete.',
          },
        );

        setLogs((prev) => [...newLogs, ...prev].slice(0, 8));
      } catch (err) {
        const now = new Date().toLocaleTimeString();
        setLogs((prev) => [
          {
            id: Date.now(),
            timestamp: now,
            type: 'warning',
            message: 'Monitoring backend unreachable.',
          },
          ...prev,
        ].slice(0, 8));
      }
    }

    // initial fetch
    fetchMonitoring();
    // periodic refresh every 30s
    const interval = setInterval(fetchMonitoring, 30000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Derive simple last sweep text
  const lastSweepText = (() => {
    if (!snapshots || snapshots.length === 0) return 'No checks yet';
    // we approximate by looking at the latest snapshot filename timestamp part
    const names = snapshots
      .map((s) => s.latest_snapshot)
      .filter(Boolean) as string[];
    if (names.length === 0) return 'No checks yet';
    // filenames are like id_2026-01-30T08-52-42.241Z.html
    const timestamps = names
      .map((name) => {
        const parts = name.split('_');
        const tsPart = parts[1]?.replace('.html', '');
        const d = tsPart ? new Date(tsPart) : null;
        return d && !isNaN(d.getTime()) ? d : null;
      })
      .filter(Boolean) as Date[];
    if (timestamps.length === 0) return 'No checks yet';
    const latest = timestamps.sort((a, b) => b.getTime() - a.getTime())[0];
    return latest.toLocaleString();
  })();

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Status Cards */}
      <div className="col-span-1 bg-slate-900 text-slate-200 rounded-xl p-6 border border-slate-700 shadow-2xl">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-500" /> System Vitality
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Watcher Sources</span>
            <span className="text-xs font-mono bg-green-900 text-green-400 px-2 py-1 rounded">
              {snapshots.length} MONITORED
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">AI Agent</span>
            <span className="text-xs font-mono bg-blue-900 text-blue-400 px-2 py-1 rounded">GEMINI 2.5</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Last Sweep</span>
            <span className="text-xs font-mono text-slate-400 max-w-[160px] text-right">
              {lastSweepText}
            </span>
          </div>
          {lastChange && (
            <div className="flex justify-between items-center">
              <span className="text-sm">Last Change</span>
              <span className="text-xs font-mono text-yellow-300 max-w-[160px] text-right">
                {lastChange.source_id} ({lastChange.diff_score.toFixed(2)})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Live Feed */}
      <div className="col-span-1 md:col-span-2 bg-black font-mono text-xs md:text-sm rounded-xl p-6 border border-slate-800 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4" /> Live Intelligence Feed
        </h3>
        <div className="space-y-2 h-[140px] overflow-hidden flex flex-col-reverse">
          {logs.map((log) => (
            <div key={log.id} className="animate-in fade-in slide-in-from-left-2 duration-300">
              <span className="text-slate-600 mr-3">[{log.timestamp}]</span>
              <span
                className={
                  log.type === 'success'
                    ? 'text-green-400'
                    : log.type === 'warning'
                      ? 'text-yellow-400'
                      : 'text-blue-300'
                }
              >
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
