import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ALERT_FILE = path.join(process.cwd(), 'data', 'alert.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Change in production

function readAlert() {
    try {
        const data = fs.readFileSync(ALERT_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        return { message: '', startTime: null, endTime: null, isActive: false };
    }
}

function writeAlert(alert) {
    fs.writeFileSync(ALERT_FILE, JSON.stringify(alert, null, 2));
}

export async function GET() {
    try {
        const alert = readAlert();
        
        // Check if alert is currently active based on time
        if (alert.isActive && alert.startTime && alert.endTime) {
            const now = new Date();
            const start = new Date(alert.startTime);
            const end = new Date(alert.endTime);
            
            if (now < start || now > end) {
                alert.isActive = false;
            }
        }
        
        return NextResponse.json(alert);
    } catch {
        return NextResponse.json(
            { error: 'Failed to read alert' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { password, message, startTime, endTime, isActive } = body;
        
        // Simple password authentication
        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }
        
        const alert = {
            message: message || '',
            startTime: startTime || null,
            endTime: endTime || null,
            isActive: isActive || false
        };
        
        writeAlert(alert);
        
        return NextResponse.json({ success: true, alert });
    } catch {
        return NextResponse.json(
            { error: 'Failed to save alert' },
            { status: 500 }
        );
    }
}
