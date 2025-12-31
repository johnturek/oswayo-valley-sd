import PageHero from '../../components/PageHero';

export default function EmploymentPage() {
    return (
        <div className="page-wrapper">
            <PageHero
                title="Employment Opportunities"
                subtitle="Join our dedicated team of educators and support staff."
            />

            <div className="container" style={{ paddingBottom: '4rem', textAlign: 'center' }}>
                <div className="card" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Work with Us</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                        Oswayo Valley School District is always looking for passionate individuals to help us achieve our mission
                        of educating individuals for success. We offer a supportive environment and competitive benefits.
                    </p>

                    <a
                        href="https://www.applitrack.com/oswayo/onlineapp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}
                    >
                        View Current Vacancies & Apply &rarr;
                    </a>

                    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
                        <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>
                            Oswayo Valley School District is an Equal Opportunity Employer.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
