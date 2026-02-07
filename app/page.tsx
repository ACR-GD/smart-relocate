import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';

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
    <main className="flex min-h-screen flex-col items-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <ChatWidget />

      {/* Top bar */}
      <div className="w-full flex justify-center border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur">
        <div className="max-w-6xl flex w-full items-center justify-between px-4 py-4 font-mono text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3 py-1">
              <code className="font-bold text-slate-900 dark:text-slate-100">SmartRelocate.ai</code>
              <span className="text-slate-500">• Malaysia</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="hidden sm:inline-flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
              </span>
              <span className="font-medium text-emerald-300">Live monitoring online</span>
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full border-b border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-12 lg:py-20 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
          <div className="space-y-6">
            <div className="inline-flex flex-col gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 px-3 py-1">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Immigration intelligence for Malaysia
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                An AI-native relocation copilot for Malaysia.
              </span>
              <span className="text-slate-500">
                L’agent IA qui transforme des règles bordéliques en plan d’action clair.
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                Move to Malaysia
                <br />
                <span className="text-sky-400">with an AI copilot</span>
              </h1>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                SmartRelocate.ai is an AI-native relocation copilot. It maps your profile to real visa options, builds
                your dossier plan, and watches official rules for changes – so you don&apos;t depend on agents, forums or luck.
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

      {/* How it works */}
      <section className="w-full border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-10 space-y-6">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-medium">How it works</p>
            <h2 className="text-lg md:text-xl font-semibold">
              Three AI engines, one clear journey
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
              Not a law firm, not a blog. SmartRelocate is an AI-native system for Malaysian immigration: an eligibility
              engine, a dossier builder, and a rule watcher that keeps your plan in sync with reality.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 text-xs md:text-sm text-slate-800 dark:text-slate-200">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 p-4 space-y-2">
              <p className="font-semibold">1. Eligibility engine</p>
              <p className="text-slate-300">
                Answer a few questions about income, savings, family and company. The engine scores each Malaysian visa
                (DE Rantau, MM2H, Labuan, etc.) and explains why it fits – or not.
              </p>
              <p className="text-[11px] text-slate-500">
                FR: L’IA analyse ta situation et propose les options de visa les plus adaptées.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 p-4 space-y-2">
              <p className="font-semibold">2. Dossier builder</p>
              <p className="text-slate-300">
                For each visa: clear steps, documents, fees and timing. The AI generates a personalized checklist and
                drafts of the story you will tell immigration: cover letters, explanations, justifications.
              </p>
              <p className="text-[11px] text-slate-500">
                FR: Elle construit ton plan de dossier, étape par étape, avec les bons documents.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 p-4 space-y-2">
              <p className="font-semibold">3. Rule watcher</p>
              <p className="text-slate-300">
                AI agents scan Malaysian government portals and official documents. When thresholds, documents or
                wording change, your plan is updated and you know before the surprise at the counter.
              </p>
              <p className="text-[11px] text-slate-500">
                FR: Des agents IA surveillent les portails officiels. S’il y a un changement qui t’impacte, tu es prévenu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE WOW FACTOR */}
      <section className="w-full border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-10">
          <IntelligenceDashboard />
        </div>
      </section>

      {/* What we are / are not */}
      <section className="w-full border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-10 space-y-6">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-medium">
              What we are / Ce que nous sommes
            </p>
            <h2 className="text-lg md:text-xl font-semibold">
              Clear boundaries, strong automation
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 text-xs md:text-sm text-slate-800 dark:text-slate-100">
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-700/60 bg-emerald-50 dark:bg-emerald-950/40 p-4 space-y-2">
              <p className="font-semibold text-emerald-200">✅ What we are</p>
              <ul className="list-disc list-inside space-y-1 text-slate-100">
                <li>An intelligence system focused on Malaysian immigration.</li>
                <li>AI agents that monitor official sources and structure the rules into clear journeys.</li>
                <li>A copilot that gives you a concrete plan: what to do, in which order, with which documents.</li>
              </ul>
              <p className="text-[11px] text-emerald-200/80 pt-1">
                FR: Un système d’IA dédié à la Malaisie, qui transforme les règles en plan d’action clair.
              </p>
            </div>
            <div className="rounded-2xl border border-rose-200 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-950/40 p-4 space-y-2">
              <p className="font-semibold text-rose-200">🚫 What we are not</p>
              <ul className="list-disc list-inside space-y-1 text-slate-100">
                <li>We are not a law firm or a human immigration agent.</li>
                <li>We don&apos;t officially submit your case as a legal representative.</li>
                <li>We don&apos;t replace tailored legal or tax advice for complex situations.</li>
              </ul>
              <p className="text-[11px] text-rose-200/80 pt-1">
                FR: Nous ne sommes ni cabinet d’avocats, ni représentant légal. Nous préparons et clarifions, tu gardes
                le dernier mot.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 max-w-3xl">
            In plain terms: we push AI as far as it can go today (monitoring, structuring, preparation, explanation).
            You keep control over every submission and every decision.
            <br />
            FR: En clair, l’IA va le plus loin possible (veille, structure, préparation). Tu restes aux commandes pour
            les décisions et l’envoi final.
          </p>
        </div>
      </section>

      {/* Visas grid */}
      <section className="w-full bg-slate-50 dark:bg-slate-950 pb-20 pt-10">
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
