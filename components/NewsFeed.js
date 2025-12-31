import Parser from 'rss-parser';

import { getNews as getPbNews } from '../app/utils/pocketbase';

async function getNews() {
    // 1. Try fetching from PocketBase CMS
    const pbItems = await getPbNews();
    if (pbItems && pbItems.length > 0) {
        return pbItems.map(item => ({
            title: item.title,
            pubDate: item.created,
            contentSnippet: item.excerpt || item.content?.substring(0, 160),
            link: `/news/${item.id}` // Internal link structure
        }));
    }

    // 2. Fallback to RSS if CMS is empty
    const parser = new Parser();
    try {
        const feed = await parser.parseURL('https://oswayovalley.com/feed');
        return feed.items.slice(0, 3);
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

export default async function NewsFeed() {
    const newsItems = await getNews();

    if (newsItems.length === 0) {
        return (
            <div className="text-center text-gray-500">
                Unable to load latest news at this time.
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {newsItems.map((item, index) => {
                const date = new Date(item.pubDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                // Strip HTML tags from contentSnippet or content for summary
                const summary = item.contentSnippet?.length > 150
                    ? item.contentSnippet.substring(0, 150) + '...'
                    : item.contentSnippet || '';

                return (
                    <div key={index} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>
                            {date}
                        </span>
                        <h3 style={{ fontSize: '1.4rem', margin: '0.5rem 0 1rem', fontWeight: 700, lineHeight: '1.3' }}>
                            {item.title}
                        </h3>
                        <p style={{ color: 'var(--text-light)', lineHeight: 1.6, flex: 1, marginBottom: '1.5rem' }}>
                            {summary}
                        </p>
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                color: 'var(--primary)',
                                fontWeight: 600,
                                textDecoration: 'none',
                                marginTop: 'auto'
                            }}
                        >
                            Read More <span style={{ marginLeft: '0.5rem' }}>&rarr;</span>
                        </a>
                    </div>
                );
            })}
        </div>
    );
}
