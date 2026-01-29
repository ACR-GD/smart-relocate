import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
    const dataDir = path.join(process.cwd(), 'data/visas');
    if (!fs.existsSync(dataDir)) {
        return NextResponse.json([]);
    }

    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
    const visas = files.map(file => {
        try {
            const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
            return JSON.parse(content);
        } catch (e) {
            return null;
        }
    }).filter(Boolean);
    
    return NextResponse.json(visas);
}
