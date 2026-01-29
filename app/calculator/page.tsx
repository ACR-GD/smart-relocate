"use client";

import { useState, useEffect } from "react";
import { UserProfile, matchVisas, Visa } from "@/lib/matcher";

export default function CalculatorPage() {
  const [visas, setVisas] = useState<Visa[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [income, setIncome] = useState(3000);
  const [savings, setSavings] = useState(50000);
  const [age, setAge] = useState(30);
  const [isDirector, setIsDirector] = useState(false);

  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from our local API (we need to build a simple route or just pass props if server component)
    // For client-side simplicity in MVP, we will fetch from a simple API route we will create next
    fetch('/api/visas')
        .then(res => res.json())
        .then(data => {
            setVisas(data);
            setLoading(false);
        });
  }, []);

  const handleCalculate = () => {
    const profile: UserProfile = {
        age,
        monthlyIncomeUSD: income,
        savingsUSD: savings,
        maritalStatus: "single",
        isDirector
    };
    
    const results = matchVisas(profile, visas);
    setMatches(results);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 lg:p-24">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-brand-600 p-6 text-white">
            <h1 className="text-3xl font-bold">Visa Eligibility Calculator 🧮</h1>
            <p className="opacity-90">Find your perfect Malaysian path in seconds.</p>
        </div>
        
        <div className="p-8 space-y-6">
            
            {/* INPUTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Income (USD)</label>
                    <input 
                        type="number" 
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-600 outline-none text-slate-900"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Liquid Savings (USD)</label>
                    <input 
                        type="number" 
                        value={savings}
                        onChange={(e) => setSavings(Number(e.target.value))}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-600 outline-none text-slate-900"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                    <input 
                        type="number" 
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-600 outline-none text-slate-900"
                    />
                </div>
                 <div className="flex items-center pt-8">
                    <input 
                        type="checkbox" 
                        id="director"
                        checked={isDirector}
                        onChange={(e) => setIsDirector(e.target.checked)}
                        className="w-5 h-5 text-brand-600 rounded"
                    />
                    <label htmlFor="director" className="ml-2 text-sm text-slate-700">I own a business / am a Director</label>
                </div>
            </div>

            <button 
                onClick={handleCalculate}
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-lg transition-all"
            >
                {loading ? "Loading Database..." : "Check My Eligibility →"}
            </button>

            {/* RESULTS */}
            {matches.length > 0 && (
                <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-bold text-slate-900 border-b pb-2">Your Matches</h3>
                    {matches.map((m, idx) => (
                        <div key={idx} className="bg-green-50 border border-green-200 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-green-800 text-lg">{m.visa.visa_name}</h4>
                                <p className="text-green-700 text-sm">{m.reason}</p>
                            </div>
                            <div className="bg-white px-3 py-1 rounded-full text-green-800 font-bold shadow-sm">
                                {m.matchScore}% Match
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {matches.length === 0 && !loading && (
                <div className="text-center text-slate-500 mt-4 text-sm">
                    Click the button to see your options based on official government data.
                </div>
            )}

        </div>
      </div>
      
      <div className="text-center mt-8">
        <a href="/" className="text-brand-600 hover:underline">← Back to Dashboard</a>
      </div>
    </div>
  );
}
