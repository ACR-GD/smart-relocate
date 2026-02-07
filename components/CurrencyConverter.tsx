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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4 text-sm text-slate-200 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold text-base">RM converter</p>
        <span className="text-[11px] text-slate-500">Live FX (MYR → USD/EUR/GBP)</span>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          value={rm}
          onChange={(e) => setRm(Number(e.target.value) || 0)}
          className="w-32 rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
          min={0}
        />
        <span className="text-slate-400 text-sm">MYR →</span>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
          className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
        >
          {SUPPORTED.map((code) => (
            <option key={code} value={code} className="bg-slate-900">
              {code}
            </option>
          ))}
        </select>
      </div>

      <div className="min-h-[1.5rem]">
        {error ? (
          <p className="text-sm text-rose-400">{error}</p>
        ) : converted !== null ? (
          <p className="text-sm text-slate-100">
            ≈ <span className="font-mono text-lg">{converted.toFixed(2)}</span> {currency}
          </p>
        ) : (
          <p className="text-sm text-slate-500">Loading live rates…</p>
        )}
      </div>
    </div>
  );
}
