"use client";

import { useState, useEffect } from 'react';
import { Activity, ShieldCheck, RefreshCw, Server, Globe } from 'lucide-react';

type Log = {
    id: number;
    timestamp: string;
    message: string;
    type: 'info' | 'success' | 'warning';
};

export default function IntelligenceDashboard() {
    const [logs, setLogs] = useState<Log[]>([]);
    
    // Simulate live socket activity for the "Wow" factor
    useEffect(() => {
        const messages = [
            { msg: "Connecting to MDEC Portal...", type: 'info' },
            { msg: "Scanning DE Rantau requirements...", type: 'info' },
            { msg: "No regulatory changes detected.", type: 'success' },
            { msg: "Ping Labuan FSA: 45ms", type: 'info' },
            { msg: "ESD Announcement: None since 4h ago.", type: 'warning' },
            { msg: "AI Model (Gemini 2.5) Standby.", type: 'success' },
            { msg: "Database sync complete.", type: 'success' }
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < messages.length) {
                const newLog = {
                    id: Date.now(),
                    timestamp: new Date().toLocaleTimeString(),
                    message: messages[i].msg,
                    type: messages[i].type as 'info' | 'success' | 'warning'
                };
                setLogs(prev => [newLog, ...prev].slice(0, 6)); // Keep last 6
                i = (i + 1) % messages.length; // Loop for demo
            }
        }, 2500); // New log every 2.5s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Status Cards */}
            <div className="col-span-1 bg-slate-900 text-slate-200 rounded-xl p-6 border border-slate-700 shadow-2xl">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-brand-500" /> System Vitality
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Watcher Nodes</span>
                        <span className="text-xs font-mono bg-green-900 text-green-400 px-2 py-1 rounded">3 ACTIVE</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">AI Agent</span>
                        <span className="text-xs font-mono bg-blue-900 text-blue-400 px-2 py-1 rounded">GEMINI 2.5</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Last Sweep</span>
                        <span className="text-xs font-mono text-slate-400">Just now</span>
                    </div>
                </div>
            </div>

            {/* Live Feed */}
            <div className="col-span-1 md:col-span-2 bg-black font-mono text-xs md:text-sm rounded-xl p-6 border border-slate-800 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-4 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Live Intelligence Feed
                </h3>
                <div className="space-y-2 h-[120px] overflow-hidden flex flex-col-reverse">
                    {logs.map((log) => (
                        <div key={log.id} className="animate-in fade-in slide-in-from-left-2 duration-300">
                            <span className="text-slate-600 mr-3">[{log.timestamp}]</span>
                            <span className={`${
                                log.type === 'success' ? 'text-green-400' : 
                                log.type === 'warning' ? 'text-yellow-400' : 'text-blue-300'
                            }`}>
                                {log.message}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
