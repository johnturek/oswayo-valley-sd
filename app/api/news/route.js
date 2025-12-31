import { NextResponse } from 'next/server';
import { getAllNews } from '../../utils/news';

export async function GET() {
    try {
        const news = getAllNews();
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}
