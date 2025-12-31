import PageHero from '../../components/PageHero';

export default function HighSchoolPage() {
    return (
        <div className="page-wrapper">
            <PageHero
                title="Middle/High School"
                subtitle="Preparing students for life, career, and future success."
            />

            <div className="container" style={{ paddingBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>

                    {/* Principal Bio */}
                    <div>
                        <div className="card" style={{ padding: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Message from the Principal</h2>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '0.5rem' }}>Mr. Erich Zaun</h3>
                            <p style={{ color: 'var(--secondary)', marginBottom: '1rem', fontWeight: '500' }}>Middle/High School Principal</p>

                            <div style={{ color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                                <p style={{ marginBottom: '1rem' }}>
                                    My name is Erich Zaun and I am pleased to announce that I have become the new principal at Oswayo Valley Middle/High School.
                                </p>
                                <p style={{ marginBottom: '1rem' }}>
                                    I recently moved to Potter County to teach various levels of math at Coudersport Jr./Sr. High School for the last 16 years.
                                    Because of all my experiences, I am not new to the difficulties that a small school setting can bring, know the importance of community connections and involvement, and am well versed in building strong rapport with high school students and teachers.
                                </p>
                                <p>
                                    My goal is to ensure that the students have a plan when they leave, whether it lies in enrolling in post-secondary education, entering the workforce directly, or enlisting in the armed forces.
                                </p>
                            </div>

                            <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                                <a href="mailto:ezaun@oswayo.com" style={{ display: 'block', color: 'var(--primary)', textDecoration: 'none', marginBottom: '0.5rem' }}>ezaun@oswayo.com</a>
                                <div style={{ color: 'var(--text-light)' }}>814-260-1701</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div className="card" style={{ padding: '2.5rem', position: 'sticky', top: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>High School Resources</h2>

                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <ResourceLink
                                    href="https://oswayovalley.com/middle-high-school-student-handbook/"
                                    text="Student Handbook"
                                    icon="📖"
                                />
                                <ResourceLink
                                    href="https://oswayovalley.com/oswayo-mshs/"
                                    text="Daily Announcements"
                                    icon="📢"
                                />
                                <ResourceLink
                                    href="https://oswayovalley.com/faculty/"
                                    text="Faculty Directory"
                                    icon="👥"
                                />
                                <ResourceLink
                                    href="https://oswayovalley.com/iu9-team/"
                                    text="IU9 Faculty"
                                    icon="🤝"
                                />
                                <ResourceLink
                                    href="https://oswayovalley.com/transcript-request/"
                                    text="Transcript Request"
                                    icon="📜"
                                />
                                <ResourceLink
                                    href="http://ovguidance.weebly.com"
                                    text="Guidance Office"
                                    icon="🧭"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function ResourceLink({ href, text, icon }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link"
        >
            <span style={{ marginRight: '1rem', fontSize: '1.2rem' }}>{icon}</span>
            {text}
        </a>
    );
}
