"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function NewsEditorPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug;
    const isNew = slug === 'new';

    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        excerpt: '',
        author: 'Oswayo Valley SD',
        content: '',
        featured: false
    });
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isNew && slug) {
            fetchNews();
        }
    }, [slug, isNew]);

    const fetchNews = async () => {
        try {
            const res = await fetch(`/api/news/${slug}`);
            const data = await res.json();
            setFormData(data);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const newsSlug = isNew
                ? formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                : slug;

            const res = await fetch(`/api/news/${newsSlug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/admin');
            }
        } catch (error) {
            console.error('Error saving news:', error);
            alert('Failed to save news item');
        } finally {
            setSaving(false);
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
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <button
                    onClick={() => router.push('/admin')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        padding: 0,
                        marginBottom: '1rem'
                    }}
                >
                    ← Back to News Management
                </button>
                <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
                    {isNew ? 'Create New Post' : 'Edit Post'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                        Title *
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                            Date *
                        </label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid var(--border)',
                                borderRadius: '4px',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                            Author *
                        </label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid var(--border)',
                                borderRadius: '4px',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                        Excerpt *
                    </label>
                    <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        required
                        rows={3}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                    />
                    <small style={{ color: 'var(--text-light)' }}>
                        Brief summary shown on the homepage
                    </small>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                        Content * (Markdown supported)
                    </label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        rows={15}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            fontFamily: 'monospace',
                            resize: 'vertical'
                        }}
                    />
                    <small style={{ color: 'var(--text-light)' }}>
                        Use Markdown formatting: **bold**, *italic*, ## headings, - lists, etc.
                    </small>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                            style={{ marginRight: '0.5rem' }}
                        />
                        <span style={{ fontWeight: 600 }}>Featured Post</span>
                    </label>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        type="submit"
                        disabled={saving}
                        className="btn-primary"
                        style={{ padding: '0.75rem 2rem', opacity: saving ? 0.6 : 1 }}
                    >
                        {saving ? 'Saving...' : (isNew ? 'Create Post' : 'Update Post')}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/admin')}
                        style={{
                            padding: '0.75rem 2rem',
                            background: 'var(--background)',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
