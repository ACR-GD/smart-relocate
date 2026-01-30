import fs from 'fs';
import path from 'path';
import { CheckCircle2, Clock, DollarSign, FileText, Users, Star, ArrowRight } from 'lucide-react';

// Server-side loader for the DE Rantau visa JSON
async function getDigitalNomadVisa() {
  const filePath = path.join(process.cwd(), 'data', 'visas', 'digital-nomad.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

interface Step {
  id: string;
  title: string;
  description: string;
  depends_on?: string[];
  estimated_duration_days?: number;
}

interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  applies_to?: string[];
  source?: string;
}

interface FundItem {
  label: string;
  amount: number;
  currency: string;
  period?: string;
}

interface FundBlock {
  id: string;
  label: string;
  when: string;
  items: FundItem[];
}

export default async function DigitalNomadVisaPage() {
  const visa = await getDigitalNomadVisa();
  const steps: Step[] = visa.steps || [];
  const documents: RequiredDocument[] = visa.required_documents || [];
  const funds: FundBlock[] = visa.funds || [];

  const incomeRequirement = typeof visa.income_requirement === 'string' ? visa.income_requirement : undefined;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#38bdf8_0,_transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 py-10 lg:py-16 relative z-10 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Malaysia • Digital Nomad Path
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50">
                {visa.visa_name || 'DE Rantau Nomad Pass'}
              </h1>
              <p className="text-sm md:text-base text-slate-300 max-w-xl">
                A curated journey view of Malaysia&apos;s DE Rantau Nomad Pass — from eligibility to approval. Built for
                remote workers and digital nomads who want clarity, not chaos.
              </p>
              {visa.last_updated && (
                <p className="text-[11px] font-mono text-slate-500">
                  LAST UPDATED: {new Date(visa.last_updated).toLocaleDateString()} • SOURCE: MDEC DE Rantau
                </p>
              )}
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <Clock className="w-3 h-3 text-sky-400" /> Duration
                </div>
                <p className="text-sm font-semibold text-slate-50">
                  {visa.duration || 'Up to 24 months (including renewal)'}
                </p>
                <p className="text-[11px] text-slate-500">Single-country remote work base in Malaysia.</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <DollarSign className="w-3 h-3 text-emerald-400" /> Minimum income
                </div>
                <p className="text-sm font-semibold text-slate-50">
                  {incomeRequirement || 'From USD 24,000/year (tech)'}
                </p>
                <p className="text-[11px] text-slate-500">Proof of stable remote income is mandatory.</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <Users className="w-3 h-3 text-violet-400" /> Family
                </div>
                <p className="text-sm font-semibold text-slate-50">Spouse, children & parents (main only)</p>
                <p className="text-[11px] text-slate-500">Dependants can join under specific conditions.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/calculator"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition-colors"
              >
                Check my eligibility
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#documents"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-2 text-sm font-semibold text-slate-100 hover:border-slate-500 transition-colors"
              >
                View required documents
              </a>
            </div>
          </div>

          {/* Side card: Benefits snapshot */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.8)] space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-medium">
                    Why DE Rantau
                  </p>
                  <p className="text-sm font-semibold text-slate-50 mt-1">Malaysia as your remote HQ</p>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-300 px-3 py-1 text-[11px] font-mono border border-emerald-600/60">
                  <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                  NOMAD-FRIENDLY
                </div>
              </div>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-[2px]" />
                  <span>Remote work for foreign employers or clients, while living in Malaysia.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-[2px]" />
                  <span>Access to coworking hubs and digital nomad communities in KL, Penang, and beyond.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-[2px]" />
                  <span>Bring spouse, children and even parents under dependant options.</span>
                </li>
              </ul>

              <p className="text-[11px] text-slate-500 pt-1">
                This is an intelligence overview, not legal or tax advice. Always confirm with official Malaysian
                immigration sources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          {/* Steps / Journey */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-medium">Journey</p>
                <h2 className="text-lg md:text-xl font-semibold text-slate-50 mt-1">Application process</h2>
              </div>
              <div className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-[11px] font-mono text-slate-400">
                {steps.length || 0} steps from idea to approval
              </div>
            </div>

            <div className="mt-3 space-y-3">
              {steps.map((step, index) => (
                <div
                  key={step.id || index}
                  className="relative flex gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-sky-500/60 transition-colors"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-sky-500 text-slate-950 text-xs font-bold flex items-center justify-center shadow-sm">
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 w-px bg-slate-700 mt-1" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-slate-50">{step.title}</h3>
                    <p className="text-xs text-slate-300">{step.description}</p>
                    {step.estimated_duration_days && (
                      <p className="text-[11px] text-slate-500 font-mono">
                        Est. duration: ~{step.estimated_duration_days} day(s)
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {steps.length === 0 && (
                <p className="text-xs text-slate-500">
                  This visa has not yet been structured into a step-by-step journey.
                </p>
              )}
            </div>
          </section>

          {/* Funds & processing time */}
          <section className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-medium">Financials</p>
                  <h2 className="text-sm font-semibold text-slate-50 mt-1">Fees & minimum income</h2>
                </div>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>

              {funds.length === 0 && (
                <p className="text-xs text-slate-400">
                  Financial requirements not yet structured. Refer to official MDEC / DE Rantau documentation.
                </p>
              )}

              <div className="space-y-3">
                {funds.map((block) => (
                  <div key={block.id} className="border-t border-slate-800 pt-3 first:border-t-0 first:pt-0">
                    <p className="text-xs font-semibold text-slate-200 mb-1">{block.label}</p>
                    <p className="text-[11px] text-slate-500 mb-2 uppercase tracking-wide">
                      {block.when.replace('_', ' ')}
                    </p>
                    <ul className="space-y-1">
                      {block.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between text-xs text-slate-100">
                          <span>{item.label}</span>
                          <span className="font-mono">
                            {item.amount.toLocaleString()} {item.currency}
                            {item.period ? ` / ${item.period}` : ''}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 flex items-center gap-3">
                <Clock className="w-4 h-4 text-sky-400" />
                <div>
                  <p className="text-xs font-semibold text-slate-100">Processing time</p>
                  <p className="text-[11px] text-slate-400">
                    Official guidance often mentions a few weeks, but volumes and case complexity can change this.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Documents section */}
        {/* Lifestyle visuals */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden">
            <div className="h-28 bg-[url('/images/penang-seafront.jpg')] bg-cover bg-center" />
            <div className="p-3 space-y-1">
              <p className="text-[11px] text-slate-400 uppercase tracking-[0.18em]">Penang</p>
              <p className="text-xs text-slate-200">Seafront cafes, heritage shophouses, and strong nomad scene.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden">
            <div className="h-28 bg-[url('/images/kl-cowork.jpg')] bg-cover bg-center" />
            <div className="p-3 space-y-1">
              <p className="text-[11px] text-slate-400 uppercase tracking-[0.18em]">Kuala Lumpur</p>
              <p className="text-xs text-slate-200">High-rise living, coworking hubs and fast airport access.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden">
            <div className="h-28 bg-[url('/images/ipoh-green.jpg')] bg-cover bg-center" />
            <div className="p-3 space-y-1">
              <p className="text-[11px] text-slate-400 uppercase tracking-[0.18em]">Ipoh</p>
              <p className="text-xs text-slate-200">Slower pace, greenery and easier family life.</p>
            </div>
          </div>
        </section>

        <section id="documents" className="mt-8 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-medium">Document kit</p>
              <h2 className="text-lg md:text-xl font-semibold text-slate-50 mt-1">Required documents</h2>
            </div>
            <FileText className="w-4 h-4 text-sky-400" />
          </div>

          <p className="text-xs md:text-sm text-slate-300 max-w-3xl">
            Core documents typically required for DE Rantau applications. Exact requirements can vary; always check
            the latest official list on the Malaysian Digital Economy Corporation (MDEC) portal.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 p-4 hover:border-sky-500/70 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-50">{doc.name}</h3>
                    <p className="text-xs text-slate-300 mt-1">{doc.description}</p>
                  </div>
                  <div className="mt-1 inline-flex items-center justify-center rounded-full bg-slate-800 text-[10px] px-2 py-1 text-slate-300 font-mono">
                    DOC
                  </div>
                </div>
                {doc.applies_to && doc.applies_to.length > 0 && (
                  <p className="text-[11px] text-slate-500 mt-2 font-mono">
                    Applies to: {doc.applies_to.join(', ')}
                  </p>
                )}
              </div>
            ))}

            {documents.length === 0 && (
              <p className="text-xs text-slate-500">Documents list not yet structured for this visa.</p>
            )}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="text-center text-[11px] text-slate-500 mt-6 border-t border-slate-800 pt-4">
          This dashboard is an intelligence helper, not legal, tax, or immigration advice. Always confirm details with
          official Malaysian government sources or a qualified professional.
        </div>
      </section>
    </main>
  );
}
