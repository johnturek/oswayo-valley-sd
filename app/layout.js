import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthProvider from '../components/AuthProvider';

export const metadata = {
    title: 'Oswayo Valley School District',
    description: 'Home of the Green Wave - Educating Individuals for Success',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <Header />
                    <main style={{ minHeight: '100vh' }}>
                        {children}
                    </main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
