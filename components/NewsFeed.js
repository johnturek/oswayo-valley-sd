import { getAllNews } from '../app/utils/news';

export default async function NewsFeed() {
    const newsItems = getAllNews().slice(0, 3);

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
                const date = new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                return (
                    <div key={item.slug} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>
                            {date}
                        </span>
                        <h3 style={{ fontSize: '1.4rem', margin: '0.5rem 0 1rem', fontWeight: 700, lineHeight: '1.3' }}>
                            {item.title}
                        </h3>
                        <p style={{ color: 'var(--text-light)', lineHeight: 1.6, flex: 1, marginBottom: '1.5rem' }}>
                            {item.excerpt}
                        </p>
                        <a
                            href={`/news/${item.slug}`}
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
