import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const contentDirectory = path.join(process.cwd(), 'content/news');

export function getAllNews() {
    // Ensure directory exists
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(contentDirectory);
    const allNewsData = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(contentDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || 'Untitled',
                date: data.date || new Date().toISOString().split('T')[0],
                excerpt: data.excerpt || content.substring(0, 160),
                author: data.author || 'Oswayo Valley SD',
                featured: data.featured || false,
                content,
                ...data
            };
        });

    // Sort by date, newest first
    return allNewsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getNewsItem(slug) {
    const fullPath = path.join(contentDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Detect if content is markdown or HTML
    // If it doesn't contain HTML tags, convert markdown to HTML
    const isMarkdown = !content.includes('<p>') && !content.includes('<h');
    const htmlContent = isMarkdown ? marked(content) : content;

    return {
        slug,
        content: htmlContent,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || content.substring(0, 160),
        author: data.author || 'Oswayo Valley SD',
        ...data
    };
}

export function saveNewsItem(slug, frontmatter, content) {
    const fullPath = path.join(contentDirectory, `${slug}.md`);

    // Ensure directory exists
    if (!fs.existsSync(contentDirectory)) {
        fs.mkdirSync(contentDirectory, { recursive: true });
    }

    const fileContent = matter.stringify(content, frontmatter);
    fs.writeFileSync(fullPath, fileContent, 'utf8');

    return { slug, ...frontmatter, content };
}

export function deleteNewsItem(slug) {
    const fullPath = path.join(contentDirectory, `${slug}.md`);

    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        return true;
    }

    return false;
}
