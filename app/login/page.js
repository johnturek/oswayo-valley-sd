"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../lib/pocketbase';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            router.push('/admin');
        } catch (err) {
            console.error(err);
            setError('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            background: 'var(--background)'
        }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>Staff Login</h2>
                {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '8px',
                                border: '1px solid #ccc'
                            }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '8px',
                                border: '1px solid #ccc'
                            }}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
