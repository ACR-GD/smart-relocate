import fs from 'fs';
import path from 'path';

// Helper to read the database directly (since we are on the server)
async function getVisaData() {
    const dataDir = path.join(process.cwd(), 'data/visas');
    
    // Check if dir exists
    if (!fs.existsSync(dataDir)) return [];

    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
    const visas = files.map(file => {
        const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
        return JSON.parse(content);
    });
    
    return visas;
}

import IntelligenceDashboard from "@/components/IntelligenceDashboard";
import ChatWidget from "@/components/ChatWidget";

// ... (existing imports)

export default async function Home() {
  const visas = await getVisaData();

  return (
    <main className="flex min-h-screen flex-col items-center p-8 lg:p-24 bg-slate-50">
      <ChatWidget />
      {/* Hero Section */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          <code className="font-bold">SmartRelocate.ai</code>&nbsp;| Malaysia 🇲🇾
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none">
          <span className="text-brand-600 font-bold flex items-center gap-2 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
             </span>
             Live System
          </span>
        </div>
      </div>

      <div className="relative flex place-items-center mt-12 mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
             Move to Malaysia <br/>
             <span className="text-brand-600">The Smart Way</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Not just a wiki. We deploy <strong>AI agents</strong> that monitor government portals 24/7. When the laws change, you know first.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a href="/calculator" className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                Check My Eligibility →
            </a>
            <a href="/investors" className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold py-4 px-10 rounded-full text-lg shadow-sm hover:shadow-md transition-all">
                For Investors
            </a>
          </div>
        </div>
      </div>
      
      {/* THE WOW FACTOR */}
      <IntelligenceDashboard />

      {/* Visa Cards Grid */}
      <div className="mt-24 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-6">
        {visas.map((visa: any, idx: number) => (
          <div
            key={idx}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 bg-white shadow-sm border-slate-200"
          >
            <h2 className={`mb-3 text-2xl font-semibold text-slate-800`}>
              {visa.visa_name || visa.country} 
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <div className="text-sm opacity-50 mb-4 font-mono text-slate-500">
               LAST UPDATED: {visa.last_updated ? new Date(visa.last_updated).toLocaleDateString() : 'Manual Entry'}
            </div>
            <p className={`m-0 max-w-[30ch] text-sm opacity-70 text-slate-600`}>
              {visa.type || "Residency Visa"}
            </p>
            
            <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>INCOME REQ</span>
                </div>
                <div className="text-sm text-slate-900">
                    {typeof visa.income_requirement === 'object' 
                        ? `${visa.income_requirement.amount} ${visa.income_requirement.currency}` 
                        : visa.income_requirement || "N/A"}
                </div>
            </div>
          </div>
        ))}

        {/* Placeholder for "Coming Soon" */}
        <div className="group rounded-lg border border-dashed border-slate-300 px-5 py-4 bg-slate-50 opacity-70 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold text-slate-400">MM2H (Silver/Gold)</h2>
            <p className="text-sm text-slate-400 mt-2">Coming Soon</p>
        </div>
      </div>
    </main>
  );
}
