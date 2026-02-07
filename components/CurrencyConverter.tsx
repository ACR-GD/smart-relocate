"use client";

import { useEffect, useState } from "react";

const SUPPORTED = ["USD", "EUR", "GBP"] as const;

type CurrencyCode = (typeof SUPPORTED)[number];

type Rates = Record<CurrencyCode, number>;

export function CurrencyConverter() {
  const [rates, setRates] = useState<Rates | null>(null);
  const [rm, setRm] = useState<number>(10000);
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/rates");
        if (!res.ok) throw new Error("Failed to load rates");
        const data = await res.json();
        if (!cancelled) {
          setRates(data.rates as Rates);
        }
      } catch (e) {
        if (!cancelled) {
          setError("Could not load live FX rates.");
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const rate = rates ? rates[currency] : null;
  const converted = rate ? rm * rate : null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-xs text-slate-200 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">RM converter</p>
        <span className="text-[10px] text-slate-500">Live FX (MYR → USD/EUR/GBP)</span>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          value={rm}
          onChange={(e) => setRm(Number(e.target.value) || 0)}
          className="w-28 rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-[11px] text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
          min={0}
        />
        <span className="text-slate-400">MYR →</span>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
          className="rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-[11px] text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
        >
          {SUPPORTED.map((code) => (
            <option key={code} value={code} className="bg-slate-900">
              {code}
            </option>
          ))}
        </select>
      </div>

      <div className="min-h-[1.25rem]">
        {error ? (
          <p className="text-[11px] text-rose-400">{error}</p>
        ) : converted !== null ? (
          <p className="text-[11px] text-slate-100">
            ≈ <span className="font-mono">{converted.toFixed(2)}</span> {currency}
          </p>
        ) : (
          <p className="text-[11px] text-slate-500">Loading live rates…</p>
        )}
      </div>
    </div>
  );
}
