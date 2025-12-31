import Hero from '../components/Hero';
import NewsFeed from '../components/NewsFeed';

export default function Home() {
    return (
        <div>
            <Hero />

            {/* Additional Content - Quick Access / News Teaser */}
            <section className="container" style={{ padding: '4rem 1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111' }}>Latest Updates</h2>
                    <div style={{ width: '60px', height: '4px', background: '#4CBB17', margin: '1rem auto' }}></div>
                </div>

                <NewsFeed />
            </section>
        </div>
    );
}
