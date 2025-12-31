"use client";
import { useMemo, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import imageCompression from 'browser-image-compression';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function RichTextEditor({ content, onChange }) {
    const quillRef = useRef(null);
    const fileInputRef = useRef(null);

    // Image upload handler with compression
    const imageHandler = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleImageUpload = useCallback(async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const quill = quillRef.current?.getEditor();
        if (!quill) return;

        try {
            // Compression options
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                fileType: 'image/jpeg',
            };

            // Compress the image
            const compressedFile = await imageCompression(file, options);

            // Convert to base64
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target?.result;
                if (base64) {
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, 'image', base64);
                    quill.setSelection(range.index + 1);
                }
            };
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error('Error compressing image:', error);
            // Fallback to original file
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target?.result;
                if (base64) {
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, 'image', base64);
                    quill.setSelection(range.index + 1);
                }
            };
            reader.readAsDataURL(file);
        }

        // Reset file input
        event.target.value = '';
    }, []);

    // YouTube video handler
    const videoHandler = useCallback(() => {
        const quill = quillRef.current?.getEditor();
        if (!quill) return;

        const url = prompt('Enter YouTube URL:');
        if (!url) return;

        // Extract video ID from various YouTube URL formats
        let videoId = '';
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            videoId = match[2];
        } else {
            alert('Invalid YouTube URL');
            return;
        }

        const range = quill.getSelection(true);
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        // Insert iframe for YouTube video
        const iframe = `<iframe width="560" height="315" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        quill.clipboard.dangerouslyPasteHTML(range.index, iframe);
        quill.setSelection(range.index + 1);
    }, []);

    // Quill modules configuration
    const modules = useMemo(() => ({
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
                image: imageHandler,
                video: videoHandler,
            }
        },
        clipboard: {
            matchVisual: false,
        }
    }), [imageHandler, videoHandler]);

    // Quill formats
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'align',
        'link', 'image', 'video',
        'blockquote', 'code-block',
        'color', 'background'
    ];

    return (
        <div style={{ position: 'relative' }}>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content || ''}
                onChange={onChange}
                modules={modules}
                formats={formats}
                style={{
                    minHeight: '400px',
                    background: 'white',
                }}
            />

            {/* Hidden file input for image uploads */}
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
