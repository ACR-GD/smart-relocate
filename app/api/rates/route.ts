import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.exchangerate.host/latest?base=MYR&symbols=USD,EUR,GBP",
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch rates" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ base: data.base, date: data.date, rates: data.rates });
  } catch (err) {
    console.error("Error fetching FX rates", err);
    return NextResponse.json({ error: "Error fetching rates" }, { status: 500 });
  }
}
