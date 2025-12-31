import { NextResponse } from 'next/server';
import { getNewsItem, saveNewsItem, deleteNewsItem } from '../../../utils/news';

export async function GET(request, { params }) {
    try {
        const { slug } = await params;
        const newsItem = getNewsItem(slug);

        if (!newsItem) {
            return NextResponse.json({ error: 'News item not found' }, { status: 404 });
        }

        return NextResponse.json(newsItem);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch news item' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { slug } = await params;
        const body = await request.json();
        const { title, date, excerpt, author, content, featured } = body;

        const frontmatter = {
            title,
            date,
            excerpt,
            author,
            featured: featured || false
        };

        const newsItem = saveNewsItem(slug, frontmatter, content);
        return NextResponse.json(newsItem);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update news item' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { slug } = await params;
        const success = deleteNewsItem(slug);

        if (!success) {
            return NextResponse.json({ error: 'News item not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete news item' }, { status: 500 });
    }
}
