"use client";
import React, { useEffect, useRef, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import 'quill/dist/quill.snow.css';

export default function RichTextEditor({ content, onChange }) {
    const editorContainerRef = useRef(null);
    const quillInstanceRef = useRef(null);
    const fileInputRef = useRef(null);
    const isUpdatingRef = useRef(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && editorContainerRef.current && !quillInstanceRef.current) {
            // Import Quill dynamically to ensure it's client-side only
            const initQuill = async () => {
                const { default: Quill } = await import('quill');

                const quill = new Quill(editorContainerRef.current, {
                    theme: 'snow',
                    modules: {
                        toolbar: {
                            container: [
                                [{ 'header': [2, 3, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                [{ 'align': [] }],
                                ['link', 'image', 'video'],
                                ['blockquote', 'code-block'],
                                [{ 'color': [] }, { 'background': [] }],
                                ['clean']
                            ],
                            handlers: {
                                image: () => fileInputRef.current?.click(),
                                video: () => {
                                    const url = prompt('Enter YouTube URL:');
                                    if (!url) return;

                                    let videoId = '';
                                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                                    const match = url.match(regExp);
                                    if (match && match[2].length === 11) {
                                        videoId = match[2];
                                    } else {
                                        alert('Invalid YouTube URL');
                                        return;
                                    }

                                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                                    const range = quill.getSelection(true);
                                    quill.insertEmbed(range.index, 'video', embedUrl);
                                }
                            }
                        }
                    }
                });

                quillInstanceRef.current = quill;

                // Set initial content
                if (content) {
                    quill.root.innerHTML = content;
                }

                // Handle text changes
                quill.on('text-change', () => {
                    if (!isUpdatingRef.current) {
                        const html = quill.root.innerHTML;
                        onChange(html === '<p><br></p>' ? '' : html);
                    }
                });
            };

            initQuill();
        }
    }, []);

    // Sync content from props if it changes externally
    useEffect(() => {
        if (quillInstanceRef.current && content !== quillInstanceRef.current.root.innerHTML) {
            isUpdatingRef.current = true;
            quillInstanceRef.current.root.innerHTML = content || '';
            isUpdatingRef.current = false;
        }
    }, [content]);

    const handleImageUpload = useCallback(async (event) => {
        const file = event.target.files?.[0];
        if (!file || !quillInstanceRef.current) return;

        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                fileType: 'image/jpeg',
            };

            const compressedFile = await imageCompression(file, options);

            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target?.result;
                if (base64) {
                    const quill = quillInstanceRef.current;
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, 'image', base64);
                    quill.setSelection(range.index + 1);
                }
            };
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error('Error compressing image:', error);
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target?.result;
                if (base64) {
                    const quill = quillInstanceRef.current;
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, 'image', base64);
                    quill.setSelection(range.index + 1);
                }
            };
            reader.readAsDataURL(file);
        }
        event.target.value = '';
    }, []);

    return (
        <div style={{ position: 'relative', background: 'white' }}>
            <div ref={editorContainerRef} style={{ minHeight: '400px' }} />
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
            />
        </div>
    );
}
