'use client';
import { useState, useEffect } from 'react';
import styles from './admin.module.css';

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [currentAlert, setCurrentAlert] = useState(null);

    useEffect(() => {
        fetchCurrentAlert();
    }, []);

    const fetchCurrentAlert = async () => {
        try {
            const response = await fetch('/api/alert');
            const data = await response.json();
            setCurrentAlert(data);
            if (data.message) {
                setMessage(data.message);
                setStartTime(data.startTime || '');
                setEndTime(data.endTime || '');
                setIsActive(data.isActive || false);
            }
        } catch (error) {
            console.error('Failed to fetch alert:', error);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // This is a simple client-side check, real authentication happens on the server
        if (password) {
            setIsAuthenticated(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('Saving...');

        try {
            const response = await fetch('/api/alert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    message,
                    startTime,
                    endTime,
                    isActive,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatusMessage('Alert saved successfully!');
                fetchCurrentAlert();
                setTimeout(() => setStatusMessage(''), 3000);
            } else {
                setStatusMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setStatusMessage('Failed to save alert');
        }
    };

    const handleDeactivate = async () => {
        setStatusMessage('Deactivating...');

        try {
            const response = await fetch('/api/alert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    message,
                    startTime,
                    endTime,
                    isActive: false,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsActive(false);
                setStatusMessage('Alert deactivated successfully!');
                fetchCurrentAlert();
                setTimeout(() => setStatusMessage(''), 3000);
            } else {
                setStatusMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setStatusMessage('Failed to deactivate alert');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <div className={styles.loginCard}>
                    <h1 className={styles.title}>Admin Login</h1>
                    <form onSubmit={handleLogin} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.btnPrimary}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Emergency Alert Management</h1>
                
                {currentAlert && (
                    <div className={styles.statusCard}>
                        <h3 className={styles.statusTitle}>Current Alert Status</h3>
                        <div className={styles.statusContent}>
                            <div className={styles.statusItem}>
                                <span className={styles.statusLabel}>Status:</span>
                                <span className={currentAlert.isActive ? styles.statusActive : styles.statusInactive}>
                                    {currentAlert.isActive ? 'ACTIVE' : 'INACTIVE'}
                                </span>
                            </div>
                            {currentAlert.message && (
                                <div className={styles.statusItem}>
                                    <span className={styles.statusLabel}>Message:</span>
                                    <span className={styles.statusValue}>{currentAlert.message}</span>
                                </div>
                            )}
                            {currentAlert.startTime && (
                                <div className={styles.statusItem}>
                                    <span className={styles.statusLabel}>Start:</span>
                                    <span className={styles.statusValue}>
                                        {new Date(currentAlert.startTime).toLocaleString()}
                                    </span>
                                </div>
                            )}
                            {currentAlert.endTime && (
                                <div className={styles.statusItem}>
                                    <span className={styles.statusLabel}>End:</span>
                                    <span className={styles.statusValue}>
                                        {new Date(currentAlert.endTime).toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="message" className={styles.label}>
                            Alert Message
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={styles.textarea}
                            rows="5"
                            placeholder="Enter the emergency alert message here..."
                            required
                        />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="startTime" className={styles.label}>
                                Start Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                id="startTime"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="endTime" className={styles.label}>
                                End Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                id="endTime"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className={styles.checkbox}
                            />
                            <span>Activate Alert</span>
                        </label>
                    </div>

                    {statusMessage && (
                        <div className={styles.statusMessage}>
                            {statusMessage}
                        </div>
                    )}

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.btnPrimary}>
                            Save Alert
                        </button>
                        {isActive && (
                            <button
                                type="button"
                                onClick={handleDeactivate}
                                className={styles.btnDanger}
                            >
                                Deactivate Alert
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
