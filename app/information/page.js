import PageHero from '../../components/PageHero';

export default function InformationPage() {
    const infoLinks = [
        { name: 'Annual Public Notice', link: 'https://oswayovalley.com/annual-public-notice/' },
        { name: 'Special Education', link: 'https://oswayovalley.com/special-education/' },
        { name: 'ARP ESSR', link: 'https://oswayovalley.com/arp-essr/' },
        { name: 'Comprehensive Plan', link: 'https://oswayovalley.com/estrategic-plan/' },
        { name: 'Title I', link: 'https://oswayovalley.com/title-i/' },
        { name: 'Title IX', link: 'https://oswayovalley.com/title-ix/' },
        { name: 'Open Records', link: 'https://oswayovalley.com/open-records/' },
        { name: 'Highly Qualified', link: 'https://oswayovalley.com/highly-qualified/' },
        { name: 'Homeless Students', link: 'https://oswayovalley.com/homeless-students/' },
        { name: 'Budget and Financials', link: 'https://ovbusiness.weebly.com' }
    ];

    return (
        <div className="page-wrapper">
            <PageHero
                title="District Information"
                subtitle="Policies, notices, and public records."
            />

            <div className="container" style={{ paddingBottom: '4rem' }}>
                <div className="card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                        {infoLinks.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="info-link"
                            >
                                {item.name}
                                <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
