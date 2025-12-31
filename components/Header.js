'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className={`${styles.header} glass-nav`}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.logoLink}>
                    <div className={styles.logoIcon}>
                        OV
                    </div>
                    <span className={styles.logoText}>
                        Oswayo Valley SD
                    </span>
                </Link>

                <nav className={styles.desktopNav}>
                    <Link href="/about-us" className={styles.navLink}>About</Link>
                    <Link href="/school-board" className={styles.navLink}>School Board</Link>
                    <Link href="/departments" className={styles.navLink}>Departments</Link>
                    <Link href="/elementary" className={styles.navLink}>Elementary</Link>
                    <Link href="/high-school" className={styles.navLink}>High School</Link>
                    <Link href="/information" className={styles.navLink}>Information</Link>
                    <Link href="/employment" className={styles.navLink}>Employment</Link>
                    <Link href="https://osvsd.focusschoolsoftware.com/focus/?" target="_blank" className="btn-primary" style={{ marginLeft: '1rem' }}>
                        Student Portal
                    </Link>
                </nav>

                <button
                    className={styles.mobileToggle}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Link href="/about-us" className={styles.navLink}>About</Link>
                    <Link href="/school-board" className={styles.navLink}>School Board</Link>
                    <Link href="/departments" className={styles.navLink}>Departments</Link>
                    <Link href="/elementary" className={styles.navLink}>Elementary</Link>
                    <Link href="/high-school" className={styles.navLink}>High School</Link>
                    <Link href="/information" className={styles.navLink}>Information</Link>
                    <Link href="/employment" className={styles.navLink}>Employment</Link>
                    <Link href="https://osvsd.focusschoolsoftware.com/focus/?" target="_blank" className={styles.navLink}>Student Portal</Link>
                </div>
            )}
        </header>
    );
}
