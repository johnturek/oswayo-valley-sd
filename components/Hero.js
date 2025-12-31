'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Hero.module.css';


export default function Hero() {
    const images = [
        // Using placeholders since we can't directly reference the generated paths in this code without moving them.
        // For the purpose of the demo, I will assume these images are placed in public/images
        '/images/school_exterior.png',
        '/images/students_learning.png',
        '/images/school_sports.png'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className={styles.heroSection}>
            {/* Background Slideshow */}
            {images.map((src, index) => (
                <div
                    key={index}
                    className={styles.backgroundImage}
                    style={{
                        backgroundImage: `url(${src})`,
                        opacity: index === currentImageIndex ? 1 : 0,
                    }}
                />
            ))}

            {/* Overlay to ensure text readability */}
            <div className={styles.overlay}></div>

            <div className={`${styles.contentContainer} animate-fade-in`}>
                <h1 className={styles.title}>
                    Welcome to <br />
                    <span className={styles.highlight}>Oswayo Valley</span>
                </h1>
                <p className={styles.subtitle}>
                    Empowering students to ride the wave of success. <br />
                    Home of the Green Wave.
                </p>
                <div className={styles.ctaGroup}>
                    <Link href="#" className="btn-primary">
                        Enroll Now
                    </Link>
                    <Link href="#" className={styles.btnSecondary}>
                        View District Calendar
                    </Link>
                </div>
            </div>

            {/* Decorative Wave Background */}
            <div className={styles.waveContainer}>
                <svg className={styles.waveSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.wavePath}></path>
                </svg>
            </div>
        </section>
    );
}
