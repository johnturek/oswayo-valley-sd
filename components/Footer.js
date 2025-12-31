import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.column}>
                    <h3>Oswayo Valley SD</h3>
                    <p className="text-gray-300 text-sm leading-relaxed" style={{ color: '#d1d5db' }}>
                        EDUCATING INDIVIDUALS <br />
                        FOR SUCCESS
                    </p>
                </div>

                <div className={styles.column}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link href="/about-us">About Us</Link></li>
                        <li><Link href="/school-board">School Board</Link></li>
                        <li><Link href="/employment">Employment</Link></li>
                        <li><Link href="/information">District Information</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3>Schools & Departments</h3>
                    <ul>
                        <li><Link href="/high-school">Middle/High School</Link></li>
                        <li><Link href="/elementary">Elementary School</Link></li>
                        <li><Link href="/departments">Departments</Link></li>
                        <li><a href="https://ovathletics.weebly.com" target="_blank" rel="noopener noreferrer">Athletics</a></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3>Contact</h3>
                    <ul>
                        <li>3185 Oswayo St</li>
                        <li>Shinglehouse, PA 16748</li>
                        <li>Phone: (814) 697-7175</li>
                        <li>Fax: (814) 697-7288</li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} Oswayo Valley School District. All rights reserved.</p>
            </div>
        </footer>
    );
}
