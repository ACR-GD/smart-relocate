import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        // 1. Load Context (The Visa Data)
        const dataDir = path.join(process.cwd(), 'data/visas');
        const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
        let context = "";
        
        files.forEach(file => {
            const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
            context += `SOURCE (${file}):\n${content}\n\n`;
        });

        // 2. Prompt Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const systemPrompt = `
        You are 'Moltbot', the AI Immigration Agent for SmartRelocate.ai.
        Your goal is to answer questions about moving to Malaysia based strictly on the provided JSON data sources.
        
        - If the user asks about a specific visa (MM2H, Labuan, Nomad), cite the requirements from the data.
        - If the data is missing (e.g. tax rates in Penang), say "I am currently monitoring government portals for that specific data point, but I don't have a verified source yet." (Do not hallucinate).
        - Be professional, concise, and "Jarvis-like".
        - Always mention the "Last Updated" date if available to build trust.
        
        CONTEXT DATA:
        ${context}
        `;

        const result = await model.generateContent(`${systemPrompt}\n\nUSER QUESTION: ${message}`);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });

    } catch (error: any) {
        console.error("Chat Error:", error);
        return NextResponse.json({ reply: "I am having trouble connecting to the Neural Core. Please try again." }, { status: 500 });
    }
}
