"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function AdminPage() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await fetch('/api/news');
            const data = await res.json();
            setNews(data);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug) => {
        if (!confirm('Are you sure you want to delete this news item?')) return;

        try {
            const res = await fetch(`/api/news/${slug}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchNews();
            }
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>News Management</h1>
                    <button
                        onClick={() => router.push('/admin/news/new')}
                        className="btn-primary"
                        style={{ padding: '0.75rem 1.5rem' }}
                    >
                        + Create New Post
                    </button>
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'var(--background)', borderBottom: '2px solid var(--border)' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Title</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Date</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Author</th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-light)' }}>
                                        No news posts yet. Create your first one!
                                    </td>
                                </tr>
                            ) : (
                                news.map((item) => (
                                    <tr key={item.slug} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: 600 }}>{item.title}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                                                {item.excerpt.substring(0, 80)}...
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--text-light)' }}>
                                            {new Date(item.date).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--text-light)' }}>
                                            {item.author}
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button
                                                onClick={() => router.push(`/admin/news/${item.slug}`)}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    marginRight: '0.5rem',
                                                    background: 'var(--primary)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.slug)}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: '#dc2626',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </ProtectedRoute>
    );
}
