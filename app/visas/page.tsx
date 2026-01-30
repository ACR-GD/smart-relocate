import Link from 'next/link';

export default function VisasIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8 lg:p-24">
      <div className="max-w-3xl mx-auto space-y-8">
        <header>
          <p className="text-sm font-mono text-brand-600">Malaysia • Visas</p>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">Visa Dashboards</h1>
          <p className="text-sm text-slate-600 mt-2">
            Structured views of each immigration path. Start with DE Rantau, more to come.
          </p>
        </header>

        <div className="grid gap-4">
          <Link
            href="/visas/digital-nomad"
            className="block border border-slate-200 rounded-lg bg-white p-4 hover:border-brand-500 hover:shadow-md transition-all"
          >
            <h2 className="text-sm font-semibold text-slate-900">DE Rantau Nomad Pass</h2>
            <p className="text-xs text-slate-600 mt-1">
              Full journey view: steps, documents and funds required to relocate to Malaysia as a digital nomad.
            </p>
          </Link>
        </div>

        <div className="text-xs text-slate-500">
          More visa dashboards (Labuan, MM2H, etc.) will be added progressively.
        </div>
      </div>
    </main>
  );
}
