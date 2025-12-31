import PageHero from '../../components/PageHero';
import Link from 'next/link';

export default function DepartmentsPage() {
    const departments = [
        {
            name: 'Athletics',
            description: 'Green Wave Athletics info, schedules, and team updates.',
            link: 'https://ovathletics.weebly.com'
        },
        {
            name: 'Cafeteria',
            description: 'Menus, nutritional information, and account management.',
            link: 'https://ovcafeteria.weebly.com'
        },
        {
            name: 'Health Services',
            description: 'School nurse resources, forms, and health requirements.',
            link: 'https://ovhealth.weebly.com/'
        },
        {
            name: 'Guidance',
            description: 'Counseling services, career planning, and student support.',
            link: 'http://ovguidance.weebly.com'
        }
    ];

    return (
        <div className="page-wrapper">
            <PageHero
                title="Departments"
                subtitle="Supporting our students through comprehensive services."
            />

            <div className="container" style={{ paddingBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {departments.map((dept, index) => (
                        <a
                            key={index}
                            href={dept.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card"
                            style={{
                                padding: '2rem',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>{dept.name}</h2>
                                <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>{dept.description}</p>
                            </div>
                            <div style={{ marginTop: '1.5rem', fontWeight: '600', color: 'var(--secondary)' }}>
                                Visit Website &rarr;
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
