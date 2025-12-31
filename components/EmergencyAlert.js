'use client';
import { useEffect, useState } from 'react';
import styles from './EmergencyAlert.module.css';

export default function EmergencyAlert() {
    const [alert, setAlert] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        checkForAlert();
    }, []);

    const checkForAlert = async () => {
        try {
            const response = await fetch('/api/alert');
            const data = await response.json();
            
            if (data.isActive && data.message) {
                // Check if alert was snoozed
                const snoozeKey = `alert_snoozed_${data.startTime}`;
                const isSnoozed = localStorage.getItem(snoozeKey);
                
                if (!isSnoozed) {
                    setAlert(data);
                    setIsVisible(true);
                }
            }
        } catch (error) {
            console.error('Failed to fetch alert:', error);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleSnooze = () => {
        if (alert) {
            // Store snooze status in localStorage
            const snoozeKey = `alert_snoozed_${alert.startTime}`;
            localStorage.setItem(snoozeKey, 'true');
            setIsVisible(false);
        }
    };

    if (!isVisible || !alert) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.iconWrapper}>
                        <svg 
                            className={styles.icon} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                            />
                        </svg>
                    </div>
                    <h2 className={styles.title}>Emergency Alert</h2>
                </div>
                
                <div className={styles.content}>
                    <p className={styles.message}>{alert.message}</p>
                </div>
                
                <div className={styles.footer}>
                    <button 
                        onClick={handleSnooze} 
                        className={styles.btnSecondary}
                    >
                        Snooze
                    </button>
                    <button 
                        onClick={handleClose} 
                        className={styles.btnPrimary}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
