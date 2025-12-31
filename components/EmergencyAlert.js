'use client';
import { useState, useEffect } from 'react';
import styles from './EmergencyAlert.module.css';

export default function EmergencyAlert() {
    const [alert, setAlert] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        fetchActiveAlert();
        // Check for new alerts every 5 minutes
        const interval = setInterval(fetchActiveAlert, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchActiveAlert = async () => {
        try {
            const response = await fetch('/api/alerts');
            const data = await response.json();
            
            if (data.alerts && data.alerts.length > 0) {
                // Show the most recent active alert
                const latestAlert = data.alerts[0];
                
                // Check if this alert was already dismissed in this session (client-side only)
                if (typeof window !== 'undefined') {
                    const dismissedAlerts = JSON.parse(sessionStorage.getItem('dismissedAlerts') || '[]');
                    if (!dismissedAlerts.includes(latestAlert.id)) {
                        setAlert(latestAlert);
                        setIsVisible(true);
                        setIsDismissed(false);
                    }
                } else {
                    // Server-side: show alert by default
                    setAlert(latestAlert);
                    setIsVisible(true);
                    setIsDismissed(false);
                }
            } else {
                setAlert(null);
                setIsVisible(false);
            }
        } catch (error) {
            console.error('Error fetching active alerts:', error);
        }
    };

    const handleDismiss = () => {
        if (alert && typeof window !== 'undefined') {
            // Store dismissed alert ID in session storage (client-side only)
            const dismissedAlerts = JSON.parse(sessionStorage.getItem('dismissedAlerts') || '[]');
            dismissedAlerts.push(alert.id);
            sessionStorage.setItem('dismissedAlerts', JSON.stringify(dismissedAlerts));
        }
        setIsVisible(false);
        setIsDismissed(true);
    };

    if (!alert || !isVisible || isDismissed) {
        return null;
    }

    const alertTypeClass = styles[`alert-${alert.type}`] || styles['alert-info'];

    return (
        <>
            {/* Backdrop */}
            <div 
                className={styles.backdrop}
                onClick={handleDismiss}
            />
            
            {/* Alert Modal */}
            <div className={`${styles.alertModal} ${alertTypeClass}`}>
                <div className={styles.alertHeader}>
                    <div className={styles.alertIcon}>
                        {alert.type === 'emergency' && (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        )}
                        {alert.type === 'warning' && (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        {alert.type === 'info' && (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </div>
                    <h2 className={styles.alertTitle}>{alert.title}</h2>
                    <button 
                        className={styles.closeButton}
                        onClick={handleDismiss}
                        aria-label="Close alert"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className={styles.alertBody}>
                    <p>{alert.message}</p>
                </div>
                
                <div className={styles.alertFooter}>
                    <button 
                        className={styles.dismissButton}
                        onClick={handleDismiss}
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </>
    );
}
