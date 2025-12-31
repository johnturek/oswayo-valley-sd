import { getNewsItem, getAllNews } from '../../../app/utils/news';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
    const news = getAllNews();
    return news.map((item) => ({
        slug: item.slug,
    }));
}

export default async function NewsPage({ params }) {
    const { slug } = await params;
    const newsItem = getNewsItem(slug);

    if (!newsItem) {
        return (
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>News Not Found</h1>
                <p style={{ color: 'var(--text-light)' }}>The news item you're looking for doesn't exist.</p>
                <a href="/" style={{ color: 'var(--primary)', marginTop: '1rem', display: 'inline-block' }}>
                    ← Back to Home
                </a>
            </div>
        );
    }

    const date = new Date(newsItem.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <article style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
            <a href="/" style={{ color: 'var(--primary)', marginBottom: '2rem', display: 'inline-block' }}>
                ← Back to Home
            </a>

            <header style={{ marginBottom: '2rem' }}>
                <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {date}
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.5rem' }}>
                    {newsItem.title}
                </h1>
                <div style={{ color: 'var(--text-light)', fontSize: '1rem' }}>
                    By {newsItem.author}
                </div>
            </header>

            <div
                className="prose"
                style={{
                    fontSize: '1.125rem',
                    lineHeight: 1.7,
                    color: 'var(--text)'
                }}
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {newsItem.content}
                </ReactMarkdown>
            </div>

            <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                <a href="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                    ← Back to Home
                </a>
            </footer>
        </article>
    );
}
