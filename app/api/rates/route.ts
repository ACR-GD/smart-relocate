import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Frankfurter.dev: free FX API, no key required
    // We ask: 1 MYR expressed in USD, EUR, GBP
    const res = await fetch(
      "https://api.frankfurter.app/latest?amount=1&from=MYR&to=USD,EUR,GBP",
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch rates" }, { status: 500 });
    }

    const data = await res.json();
    // Frankfurter returns: { amount, base, date, rates: { USD: x, EUR: y, ... } }
    return NextResponse.json({ base: data.base, date: data.date, rates: data.rates });
  } catch (err) {
    console.error("Error fetching FX rates", err);
    return NextResponse.json({ error: "Error fetching rates" }, { status: 500 });
  }
}
