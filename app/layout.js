import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EmergencyAlert from '../components/EmergencyAlert';

export const metadata = {
    title: 'Oswayo Valley School District',
    description: 'Home of the Green Wave - Educating Individuals for Success',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main style={{ minHeight: '100vh' }}>
                    {children}
                </main>
                <Footer />
                <EmergencyAlert />
            </body>
        </html>
    );
}
