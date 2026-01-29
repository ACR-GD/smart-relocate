import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, LineChart, Cpu } from "lucide-react";

export default function InvestorsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-brand-500 font-mono font-bold mb-4">INVESTOR MEMO • SERIES SEED</div>
          <h1 className="text-5xl font-bold mb-6">Automating the $42B Global Mobility Market.</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            SmartRelocate.ai is not a consultancy. It is a sovereign AI layer that monitors government policy, assesses impact, and automates compliance for the 250M+ people living outside their country of origin.
          </p>
        </div>
      </div>

      {/* The Hook: Defensibility */}
      <section className="py-20 px-6 lg:px-24 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
             <ShieldCheck className="text-brand-600" size={32} />
             1. Defensibility: The "Policy Pulse"
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-slate-600 mb-6 text-lg">
                Competitors (Deloitte, Fragomen) rely on human lawyers reading PDFs once a quarter. We rely on <strong>Headless Watcher Nodes</strong> monitoring 150+ government endpoints every 60 seconds.
              </p>
              <ul className="space-y-4">
                {[
                  "Proprietary 'Diff Engine' detects silent rule changes.",
                  "Impact Scoring (1-10) quantifies regulatory risk.",
                  "Historical Timeline of policy drift (24-mo lookback)."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
               {/* Mock Visual of Diff Engine */}
               <div className="font-mono text-xs text-slate-500 mb-2">/var/log/watcher.log</div>
               <div className="space-y-2">
                 <div className="text-green-600">detect: MDEC_DE_RANTAU_V2.pdf</div>
                 <div className="text-slate-800 font-bold bg-yellow-100 p-2 rounded">
                    ⚠️ ALERT: Minimum Income Requirement increased.<br/>
                    OLD: $24,000 USD<br/>
                    NEW: $30,000 USD
                 </div>
                 <div className="text-blue-600">action: notifying 4,201 subscribers...</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Product: SaaS Utility */}
      <section className="py-20 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
             <Cpu className="text-brand-600" size={32} />
             2. The "One-Click" Assessment
            </h2>
            <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Scenario Simulator</h3>
                    <p className="text-slate-300 mb-8 max-w-xl">
                        When a law changes, our AI automatically re-runs the eligibility logic for every user in our database.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-slate-800 p-4 rounded-lg">
                            <div className="text-xs text-slate-400 uppercase">User Profile</div>
                            <div className="font-bold">Software Engineer</div>
                            <div className="text-sm">$5,000/mo Income</div>
                        </div>
                        <div className="flex items-center justify-center">
                            <ArrowRight className="text-slate-500" />
                        </div>
                        <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
                            <div className="text-xs text-green-400 uppercase">Status</div>
                            <div className="font-bold text-green-300">ELIGIBLE</div>
                            <div className="text-sm text-green-400/70">Via Digital Nomad Pass</div>
                        </div>
                    </div>
                    <Link href="/calculator" className="text-brand-400 hover:text-brand-300 font-bold flex items-center gap-2">
                        Try the Simulator Live <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* The Roadmap */}
      <section className="py-20 px-6 lg:px-24 bg-slate-50">
        <div className="max-w-4xl mx-auto">
             <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
             <LineChart className="text-brand-600" size={32} />
             3. The "Agentic" Roadmap
            </h2>
            <div className="space-y-8 relative border-l-2 border-slate-200 ml-4 pl-8">
                <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-sm"></div>
                    <h3 className="text-xl font-bold text-slate-900">Phase 1: Monitoring (Live)</h3>
                    <p className="text-slate-600">The "Truth Source" for Malaysia. 99% accuracy via automated scrapers.</p>
                </div>
                <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
                    <h3 className="text-xl font-bold text-slate-900">Phase 2: Advising (Q2 2026)</h3>
                    <p className="text-slate-600">"Ask Moltbot" Chat Assessment. Auto-generated PDF roadmaps.</p>
                </div>
                <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-300 border-4 border-white shadow-sm"></div>
                    <h3 className="text-xl font-bold text-slate-900">Phase 3: Execution (Q4 2026)</h3>
                    <p className="text-slate-600">Direct API integration with government portals to auto-fill forms.</p>
                </div>
            </div>
        </div>
      </section>

      {/* CTA */}
      <div className="py-24 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to see the engine?</h2>
        <Link href="/" className="bg-brand-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-700 transition-colors">
            Launch Live Demo
        </Link>
      </div>

    </main>
  );
}
