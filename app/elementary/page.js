import PageHero from '../../components/PageHero';

export default function ElementaryPage() {
    return (
        <div className="page-wrapper">
            <PageHero
                title="Elementary School"
                subtitle="Building a strong foundation for lifelong learning."
            />

            <div className="container" style={{ paddingBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>

                    {/* Principal Bio */}
                    <div>
                        <div className="card" style={{ padding: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Message from the Principal</h2>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '0.5rem' }}>Ms. Jordan Caldwell</h3>
                            <p style={{ color: 'var(--secondary)', marginBottom: '1rem', fontWeight: '500' }}>Elementary Principal</p>

                            <div style={{ color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                                <p style={{ marginBottom: '1rem' }}>
                                    Ms. Caldwell joined the OV staff in July of 2024 and she comes to the Oswayo Valley Elementary School with a decade of middle school classroom experience.
                                </p>
                                <p style={{ marginBottom: '1rem' }}>
                                    She was born and raised in Coudersport, Pennsylvania and graduated from Coudersport Area School District.
                                    After high school, she attended Clarion University and earned her Bachelors in Secondary Education, Social Studies and English.
                                </p>
                                <p>
                                    Ms. Caldwell says, “I am so proud to be a part of the OV family, and I am excited to get to know the students, teachers, staff, and families of the community. Oswayo Valley is committed to excellence, and I am honored to help continue that vision in this role.”
                                </p>
                            </div>

                            <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                                <a href="mailto:jcaldwell@oswayo.com" style={{ display: 'block', color: 'var(--primary)', textDecoration: 'none', marginBottom: '0.5rem' }}>jcaldwell@oswayo.com</a>
                                <div style={{ color: 'var(--text-light)' }}>814-260-1702</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div className="card" style={{ padding: '2.5rem', position: 'sticky', top: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Elementary Resources</h2>

                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <ResourceLink
                                    href="https://oswayovalley.com/wp-content/uploads/2025/08/Oswayo-Elementary-2025-2026-print-file.pdf"
                                    text="Student Handbook 2025-2026"
                                    icon="📖"
                                />
                                <ResourceLink
                                    href="https://oswayovalley.com/elementary-faculty/"
                                    text="Faculty Directory"
                                    icon="👥"
                                />
                                <ResourceLink
                                    href="https://oswayovalley.com/elementary-calendar/"
                                    text="Elementary Calendar"
                                    icon="📅"
                                />
                                <ResourceLink
                                    href="https://nationalblueribbonschools.ed.gov/awardwinners/winning/22pa121pu_oswayo_valley_elementary_school.html"
                                    text="Blue Ribbon Profile"
                                    icon="🏆"
                                />
                                <ResourceLink
                                    href="https://oswayovalley.com/iu9-team/"
                                    text="IU9 Faculty"
                                    icon="🤝"
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
