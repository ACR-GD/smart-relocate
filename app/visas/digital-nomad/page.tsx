import fs from 'fs';
import path from 'path';

// Simple server-side loader for the DE Rantau visa JSON
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

  return (
    <main className="min-h-screen bg-slate-50 p-8 lg:p-24">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header className="space-y-3">
          <p className="text-sm font-mono text-brand-600">Malaysia • Digital Nomad</p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            {visa.visa_name || 'DE Rantau Nomad Pass'}
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl">
            {visa.type} — structured overview of the full immigration journey: steps, documents, and funds.
          </p>
          {visa.last_updated && (
            <p className="text-xs text-slate-500 font-mono">
              LAST UPDATED: {new Date(visa.last_updated).toLocaleDateString()}
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Steps / Timeline */}
          <section className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Immigration Journey</h2>
            <p className="text-sm text-slate-600 mb-4">
              High-level steps from first eligibility check to final approval. This is not legal advice, but a
              structured helper.
            </p>
            <ol className="space-y-3">
              {steps.map((step, index) => (
                <li key={step.id || index} className="flex gap-3">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 w-px bg-slate-200 mt-1" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{step.title}</h3>
                    <p className="text-xs md:text-sm text-slate-600 mt-1">{step.description}</p>
                    {step.estimated_duration_days && (
                      <p className="text-[11px] text-slate-500 mt-1 font-mono">
                        Est. duration: ~{step.estimated_duration_days} day(s)
                      </p>
                    )}
                  </div>
                </li>
              ))}
              {steps.length === 0 && (
                <p className="text-xs text-slate-500">This visa has not yet been structured into steps.</p>
              )}
            </ol>
          </section>

          {/* Funds Summary */}
          <section className="bg-slate-900 text-slate-100 rounded-xl p-6 space-y-4 border border-slate-700 shadow-2xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Funds &amp; Payments</h2>
            {funds.length === 0 && (
              <p className="text-xs text-slate-400">
                Financial requirements not yet structured. Refer to official MDEC / DE Rantau documentation.
              </p>
            )}
            <div className="space-y-4">
              {funds.map((block) => (
                <div key={block.id} className="border-t border-slate-700 pt-3 first:border-t-0 first:pt-0">
                  <p className="text-xs font-semibold text-slate-300 mb-1">{block.label}</p>
                  <p className="text-[11px] text-slate-500 mb-2 uppercase tracking-wide">
                    {block.when.replace('_', ' ')}
                  </p>
                  <ul className="space-y-1">
                    {block.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between text-xs">
                        <span className="text-slate-200">{item.label}</span>
                        <span className="font-mono text-slate-100">
                          {item.amount.toLocaleString()} {item.currency}
                          {item.period ? ` / ${item.period}` : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Documents */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Required Documents</h2>
          <p className="text-sm text-slate-600">
            Core documents typically required for DE Rantau applications. Exact requirements can vary; always check
            the latest official list.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            {documents.map((doc) => (
              <div key={doc.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <h3 className="text-sm font-semibold text-slate-900">{doc.name}</h3>
                <p className="text-xs text-slate-600 mt-1">{doc.description}</p>
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

        <div className="text-center text-xs text-slate-500 mt-4">
          <p>
            This dashboard is an intelligence helper, not legal advice. Always confirm with official Malaysian
            immigration sources or a qualified professional.
          </p>
        </div>
      </div>
    </main>
  );
}
