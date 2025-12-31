import PageHero from '../../components/PageHero';

export default function SchoolBoardPage() {
    const members = [
        { name: 'Ms. Kimberley Voorhees', role: 'President', region: 'Region II', email: 'kvoorhees@oswayo.com' },
        { name: 'Mrs. Jacqueline Taylor', role: 'Vice President', region: 'Region I', email: 'jtaylor@oswayo.com' },
        { name: 'Ms. Wanda West', role: 'Treasurer', region: 'Region III', email: 'wwest@oswayo.com' },
        { name: 'Mrs. Nicole Green', role: 'Board Secretary', region: 'Non-voting Member', email: 'ngreen@oswayo.com' },
        { name: 'Ms. Ashley Carpenter', role: 'Member', region: 'Region II', email: 'acarpenter@oswayo.com' },
        { name: 'Mrs. Patricia Colbey', role: 'Member', region: 'Region I', email: 'pcolbey@oswayo.com' },
        { name: 'Mrs. Stephanie Good', role: 'Member', region: 'Region III', email: 'sgood@oswayo.com' },
        { name: 'Mr. R. Kayle Perkins', role: 'Member', region: 'Region III', email: 'rperkins@oswayo.com' },
        { name: 'Mrs. Nancy Rawson-Ayers', role: 'Member', region: 'Region II', email: 'nayers@oswayo.com' },
        { name: 'Mr. Kent Wichert', role: 'Member', region: 'Region I', email: 'kwichert@oswayo.com' }
    ];

    const solicitors = [
        'Mr. Timothy Sennett',
        'Mr. Mark Wassell'
    ];

    return (
        <div className="page-wrapper">
            <PageHero
                title="School Board"
                subtitle="Serving our community with transparency and dedication."
            />

            <div className="container" style={{ paddingBottom: '4rem' }}>
                <div style={{ display: 'grid', gap: '3rem' }}>

                    {/* Meeting Info */}
                    <div className="card" style={{ padding: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Meeting Information</h2>
                        <p style={{ lineHeight: '1.8', color: 'var(--text-light)', marginBottom: '1rem' }}>
                            School Board Work Sessions are typically held on the 1st Monday of each month at 7:00 p.m. in the Elementary Board Room.
                            Voting Meetings are held on the 2nd Monday of each month at 7:00 p.m. in the Elementary Board Room unless otherwise stated.
                        </p>
                        <a
                            href="https://oswayovalley.com/wp-content/uploads/2025/12/2026-Board-Meeting-Dates.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ display: 'inline-block', marginTop: '1rem' }}
                        >
                            View 2026 Meeting Dates
                        </a>
                    </div>

                    {/* Members Grid */}
                    <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--primary)', textAlign: 'center' }}>Current Board Members</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {members.map((member, index) => (
                                <div key={index} className="card" style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.25rem' }}>{member.name}</h3>
                                    <div style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '500' }}>{member.role}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>{member.region}</div>
                                    <a href={`mailto:${member.email}`} style={{ fontSize: '0.9rem', color: 'var(--primary-light)', textDecoration: 'none' }}>{member.email}</a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Solicitors */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', background: 'var(--background-alt)' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Board Solicitors</h3>
                        <p>{solicitors.join(' & ')}</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Knox McLaughlin Gornall & Sennett, P.C.</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
