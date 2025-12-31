export default function AdminDashboard() {
    return (
        <div className="page-wrapper" style={{ padding: '2rem' }}>
            <div className="container">
                <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Content Management Dashboard</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {/* News Management Card */}
                    <div className="card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>News & Announcements</h3>
                        <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                            Create, edit, or delete news posts displayed on the homepage.
                        </p>
                        <button className="btn-primary">Manage News</button>
                    </div>

                    {/* Alert Management Card */}
                    <div className="card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Emergency Alerts</h3>
                        <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                            Update the red alert banner at the top of the site.
                        </p>
                        <button className="btn-primary">Update Alert</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
