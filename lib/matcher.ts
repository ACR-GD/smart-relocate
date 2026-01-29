export interface VisaRequirement {
  amount?: number;
  currency?: string;
  period?: string; // 'monthly' | 'yearly'
}

export interface VisaTier {
  name: string;
  duration_years: number;
  requirements: {
    fixed_deposit_myr?: number;
    min_age?: number;
    residency_days_per_year?: number;
    monthly_income_myr?: number;
    liquid_assets_myr?: number;
  };
}

export interface Visa {
  country?: string;
  visa_name: string;
  type: string;
  requirements?: {
    financial?: {
        paid_up_capital_myr?: number;
    };
  };
  income_requirement?: string | VisaRequirement; 
  tiers?: VisaTier[];
  last_updated?: string;
}

export interface UserProfile {
  age: number;
  monthlyIncomeUSD: number;
  savingsUSD: number;
  maritalStatus: string;
  isDirector: boolean;
}

// Simple exchange rate for MVP (USD to MYR)
const USD_TO_MYR = 4.7;

export function matchVisas(profile: UserProfile, allVisas: Visa[]): { visa: Visa; matchScore: number; reason: string }[] {
  const results = [];

  for (const visa of allVisas) {
    let score = 0;
    let reasons = [];

    // Logic for MM2H Tiers
    if (visa.tiers) {
        // Evaluate user against best tier
        const affordableTiers = visa.tiers.filter(tier => {
            const deposit = tier.requirements.fixed_deposit_myr || 0;
            return (profile.savingsUSD * USD_TO_MYR) >= deposit;
        });

        if (affordableTiers.length > 0) {
            score = 80;
            const bestTier = affordableTiers[affordableTiers.length - 1]; // Assume ordered low to high
            reasons.push(`Eligible for MM2H ${bestTier.name} tier based on savings.`);
        }
    }

    // Logic for Digital Nomad (DE Rantau)
    if (visa.visa_name.includes("Nomad") || visa.visa_name.includes("Rantau")) {
        // income_requirement string parsing needed if from AI, but let's assume simple logic first
        // AI extraction usually gives us text like "$24,000 USD / year"
        // For MVP, we'll check simple income threshold
        if (profile.monthlyIncomeUSD >= 2000) {
            score = 90;
            reasons.push("Income meets Digital Nomad $24k/year requirement.");
        }
    }

    // Logic for Labuan Director
    if (visa.visa_name.includes("Labuan")) {
        if (profile.isDirector || profile.savingsUSD > 50000) { // arbitrary threshold for starting a biz
            score = 70;
            reasons.push("Possible path via Labuan Company Setup (Director).");
        }
    }

    if (score > 0) {
        results.push({
            visa,
            matchScore: score,
            reason: reasons.join(" ")
        });
    }
  }

  return results.sort((a, b) => b.matchScore - a.matchScore);
}
