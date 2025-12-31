import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const alertsFilePath = path.join(process.cwd(), 'public', 'alerts.json');

// GET - Fetch active alerts
export async function GET() {
    try {
        const fileContents = await fs.readFile(alertsFilePath, 'utf8');
        const data = JSON.parse(fileContents);
        
        // Filter for active alerts (not expired and start time has passed)
        const now = new Date().toISOString();
        const activeAlerts = data.alerts.filter(alert => {
            const isActive = alert.startTime <= now && alert.endTime > now;
            return isActive;
        });
        
        return NextResponse.json({ alerts: activeAlerts });
    } catch (error) {
        console.error('Error reading alerts:', error);
        return NextResponse.json({ alerts: [] });
    }
}

// POST - Add or update alert (admin only in production, open for demo)
export async function POST(request) {
    try {
        const newAlert = await request.json();
        
        // Read existing alerts
        const fileContents = await fs.readFile(alertsFilePath, 'utf8');
        const data = JSON.parse(fileContents);
        
        // Add ID if not present
        if (!newAlert.id) {
            newAlert.id = Date.now().toString();
        }
        
        // Check if updating existing alert
        const existingIndex = data.alerts.findIndex(a => a.id === newAlert.id);
        if (existingIndex >= 0) {
            data.alerts[existingIndex] = newAlert;
        } else {
            data.alerts.push(newAlert);
        }
        
        // Write back to file
        await fs.writeFile(alertsFilePath, JSON.stringify(data, null, 2));
        
        return NextResponse.json({ success: true, alert: newAlert });
    } catch (error) {
        console.error('Error saving alert:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE - Remove alert
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ success: false, error: 'Alert ID required' }, { status: 400 });
        }
        
        // Read existing alerts
        const fileContents = await fs.readFile(alertsFilePath, 'utf8');
        const data = JSON.parse(fileContents);
        
        // Filter out the alert to delete
        data.alerts = data.alerts.filter(a => a.id !== id);
        
        // Write back to file
        await fs.writeFile(alertsFilePath, JSON.stringify(data, null, 2));
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting alert:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
