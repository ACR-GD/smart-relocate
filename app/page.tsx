import fs from 'fs';
import path from 'path';
import Image from 'next/image';

// Helper to read the database directly (since we are on the server)
async function getVisaData() {
  const dataDir = path.join(process.cwd(), 'data/visas');

  // Check if dir exists
  if (!fs.existsSync(dataDir)) return [];

  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json'));
  const visas = files.map((file) => {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    return JSON.parse(content);
  });

  return visas;
}

import IntelligenceDashboard from '@/components/IntelligenceDashboard';
import ChatWidget from '@/components/ChatWidget';

export default async function Home() {
  const visas = await getVisaData();

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-950">
      <ChatWidget />

      {/* Top bar */}
      <div className="w-full flex justify-center border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="max-w-6xl flex w-full items-center justify-between px-4 py-4 font-mono text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1">
              <code className="font-bold text-slate-100">SmartRelocate.ai</code>
              <span className="text-slate-500">• Malaysia</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
            </span>
            <span className="font-medium text-emerald-300">Live monitoring online</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-12 lg:py-20 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-[11px] font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              Immigration intelligence for Malaysia
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-50">
                Move to Malaysia
                <br />
                <span className="text-sky-400">with a real plan</span>
              </h1>
              <p className="text-sm md:text-base text-slate-300 max-w-xl leading-relaxed">
                SmartRelocate.ai combines live monitoring of government portals with curated visa journeys. No more
                outdated PDFs or forum rumors — just a clear path from idea to approved visa.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="/calculator"
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold py-3 px-8 rounded-full text-sm shadow-lg shadow-sky-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                Check my eligibility
              </a>
              <a
                href="/visas/digital-nomad"
                className="bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-semibold py-3 px-8 rounded-full text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2"
              >
                Explore DE Rantau journey
              </a>
            </div>
            <div className="flex flex-wrap gap-4 pt-2 text-[11px] text-slate-400">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Visas curated from official Malaysian sources</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>AI agents watching for regulatory changes</span>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative h-64 sm:h-72 lg:h-80">
            <div className="absolute inset-0 rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
              <Image
                src="/images/kl-skyline-night.jpg"
                alt="Kuala Lumpur skyline at night with city lights"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end gap-2 text-[11px] text-slate-200">
                <div className="space-y-1">
                  <p className="font-semibold flex items-center gap-2">
                    Malaysia, from idea to landing
                  </p>
                  <p className="text-slate-300/80 max-w-[220px]">
                    Built for people actually moving — not just browsing.
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950/70 border border-slate-800 px-3 py-2 text-right">
                  <p className="text-[10px] text-slate-400">Today&apos;s focus</p>
                  <p className="text-xs font-semibold text-slate-50">DE Rantau • Labuan • MM2H</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE WOW FACTOR */}
      <section className="w-full border-b border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-10">
          <IntelligenceDashboard />
        </div>
      </section>

      {/* Visas grid */}
      <section className="w-full bg-slate-950 pb-20 pt-10">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between gap-2 mb-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-medium">Visa paths</p>
              <h2 className="text-lg md:text-xl font-semibold text-slate-50 mt-1">Malaysia, structured</h2>
            </div>
            <a
              href="/visas"
              className="text-[11px] text-sky-400 hover:text-sky-300 font-mono border-b border-transparent hover:border-sky-400/60"
            >
              View all dashboards
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visas.map((visa: any, idx: number) => (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4 transition-colors hover:border-sky-500/60 hover:bg-slate-900 shadow-sm"
              >
                <h3 className="mb-2 text-base font-semibold text-slate-50 flex items-center justify-between gap-2">
                  <span>{visa.visa_name || visa.country}</span>
                  <span className="text-xs text-slate-500 group-hover:text-sky-400 transition-colors">→</span>
                </h3>
                <div className="text-[11px] mb-2 font-mono text-slate-500">
                  LAST UPDATED:{' '}
                  {visa.last_updated ? new Date(visa.last_updated).toLocaleDateString() : 'Manual Entry'}
                </div>
                <p className="m-0 text-xs text-slate-300 min-h-[2.5rem]">
                  {visa.type || 'Residency Visa'}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-500">Income requirement</span>
                    <span className="text-slate-100 font-mono">
                      {typeof visa.income_requirement === 'object'
                        ? `${visa.income_requirement.amount} ${visa.income_requirement.currency}`
                        : visa.income_requirement || 'N/A'}
                    </span>
                  </div>
                  <a
                    href={
                      visa.visa_name?.toLowerCase().includes('rantau') || visa.visa_name?.toLowerCase().includes('nomad')
                        ? '/visas/digital-nomad'
                        : '/calculator'
                    }
                    className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold"
                  >
                    View details
                  </a>
                </div>
              </div>
            ))}

            {/* Placeholder for "Coming Soon" */}
            <div className="group rounded-2xl border border-dashed border-slate-700 px-5 py-4 bg-slate-900/40 opacity-80 flex flex-col justify-center items-center">
              <h3 className="text-sm font-semibold text-slate-400">MM2H (Silver/Gold)</h3>
              <p className="text-xs text-slate-500 mt-1">Full dashboard coming soon.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
