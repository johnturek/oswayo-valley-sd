'use client';
import { useState, useEffect } from 'react';
import PageHero from '../../components/PageHero';
import styles from './admin.module.css';

export default function AdminPage() {
    const [alerts, setAlerts] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        message: '',
        type: 'warning', // info, warning, emergency
        startTime: '',
        endTime: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAllAlerts();
    }, []);

    const fetchAllAlerts = async () => {
        try {
            // Fetch the raw file to get all alerts, not just active ones
            const response = await fetch('/alerts.json');
            const data = await response.json();
            setAlerts(data.alerts || []);
        } catch (error) {
            console.error('Error fetching alerts:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/alerts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (result.success) {
                alert(isEditing ? 'Alert updated successfully!' : 'Alert created successfully!');
                setFormData({
                    id: '',
                    title: '',
                    message: '',
                    type: 'warning',
                    startTime: '',
                    endTime: ''
                });
                setIsEditing(false);
                fetchAllAlerts();
            } else {
                alert('Error saving alert: ' + result.error);
            }
        } catch (error) {
            alert('Error saving alert: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (alert) => {
        setFormData(alert);
        setIsEditing(true);
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this alert?')) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/alerts?id=${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();
            
            if (result.success) {
                alert('Alert deleted successfully!');
                fetchAllAlerts();
            } else {
                alert('Error deleting alert: ' + result.error);
            }
        } catch (error) {
            alert('Error deleting alert: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            id: '',
            title: '',
            message: '',
            type: 'warning',
            startTime: '',
            endTime: ''
        });
        setIsEditing(false);
    };

    const getAlertStatus = (alert) => {
        const now = new Date().toISOString();
        if (alert.startTime > now) {
            return 'scheduled';
        } else if (alert.endTime < now) {
            return 'expired';
        } else {
            return 'active';
        }
    };

    return (
        <div>
            <PageHero 
                title="Emergency Alert Management" 
                subtitle="Create and manage emergency alerts for the school district"
            />

            <div className="container" style={{ padding: '3rem 1.5rem' }}>
                {/* Alert Form */}
                <div className={styles.formCard}>
                    <h2>{isEditing ? 'Edit Alert' : 'Create New Alert'}</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Alert Title *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g., School Closing - Snow Day"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message">Alert Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows="4"
                                placeholder="Enter the detailed alert message..."
                                className={styles.textarea}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="type">Alert Type *</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className={styles.select}
                            >
                                <option value="info">Info (Blue)</option>
                                <option value="warning">Warning (Orange)</option>
                                <option value="emergency">Emergency (Red)</option>
                            </select>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="startTime">Start Time *</label>
                                <input
                                    type="datetime-local"
                                    id="startTime"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleInputChange}
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="endTime">End Time *</label>
                                <input
                                    type="datetime-local"
                                    id="endTime"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleInputChange}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.formActions}>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className={styles.btnSubmit}
                            >
                                {loading ? 'Saving...' : (isEditing ? 'Update Alert' : 'Create Alert')}
                            </button>
                            {isEditing && (
                                <button 
                                    type="button"
                                    onClick={handleCancel}
                                    className={styles.btnCancel}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Alert List */}
                <div className={styles.alertsSection}>
                    <h2>All Alerts</h2>
                    {alerts.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#666' }}>No alerts created yet.</p>
                    ) : (
                        <div className={styles.alertsList}>
                            {alerts.map(alert => {
                                const status = getAlertStatus(alert);
                                return (
                                    <div key={alert.id} className={`${styles.alertCard} ${styles[status]}`}>
                                        <div className={styles.alertHeader}>
                                            <div>
                                                <h3>{alert.title}</h3>
                                                <span className={`${styles.badge} ${styles[`badge-${alert.type}`]}`}>
                                                    {alert.type}
                                                </span>
                                                <span className={`${styles.badge} ${styles[`badge-${status}`]}`}>
                                                    {status}
                                                </span>
                                            </div>
                                            <div className={styles.alertActions}>
                                                <button 
                                                    onClick={() => handleEdit(alert)}
                                                    className={styles.btnEdit}
                                                    disabled={loading}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(alert.id)}
                                                    className={styles.btnDelete}
                                                    disabled={loading}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <p className={styles.alertMessage}>{alert.message}</p>
                                        <div className={styles.alertTimes}>
                                            <span>Start: {new Date(alert.startTime).toLocaleString()}</span>
                                            <span>End: {new Date(alert.endTime).toLocaleString()}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
