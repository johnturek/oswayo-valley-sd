import PageHero from '../../components/PageHero';

export default function AboutPage() {
    return (
        <div className="page-wrapper">
            <PageHero
                title="About Us"
                subtitle="Dedicated to educating individuals for success in a changing world."
            />

            <div className="container" style={{ paddingBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

                    <div className="card" style={{ padding: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>About the District</h2>
                        <p style={{ lineHeight: '1.8', color: 'var(--text-light)', fontSize: '1.1rem' }}>
                            Oswayo Valley is a small, rural school district nestled in the northwestern corner of Potter County.
                            It serves families from the Shinglehouse and Oswayo Boroughs and the Clara, Sharon, Oswayo, and Ceres Townships.
                            It currently provides educational opportunities to over 350 school aged children in both Potter and McKean County.
                        </p>
                    </div>

                    <div className="card" style={{ padding: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Administration</h2>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem' }}>Mr. Glenn Smith Jr.</h3>
                            <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Superintendent</p>
                            <a href="mailto:gsmith@oswayo.com" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>gsmith@oswayo.com</a>
                            <p style={{ color: 'var(--text-light)', marginTop: '0.25rem' }}>814.260.1700</p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem' }}>Mrs. Christi Stedman</h3>
                            <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Assistant to Superintendent</p>
                            <a href="mailto:christi@oswayo.com" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>christi@oswayo.com</a>
                            <p style={{ color: 'var(--text-light)', marginTop: '0.25rem' }}>814.260.1700</p>
                        </div>
                    </div>

                </div>

                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '3rem', color: 'var(--primary)' }}>District at a Glance</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.5rem' }}>350+</div>
                            <div style={{ fontSize: '1.1rem', color: 'var(--text-light)' }}>Students Enrolled</div>
                        </div>
                        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.5rem' }}>14:1</div>
                            <div style={{ fontSize: '1.1rem', color: 'var(--text-light)' }}>Student-Teacher Ratio</div>
                        </div>
                        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.5rem' }}>95%</div>
                            <div style={{ fontSize: '1.1rem', color: 'var(--text-light)' }}>Graduation Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
