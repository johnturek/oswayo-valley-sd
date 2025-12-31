# V2 File-Based CMS Implementation

## Overview
Replaced PocketBase with a lightweight, file-based CMS solution using Markdown files. This approach is simpler, more reliable, and fully compatible with Next.js 16.

## Features Implemented

### 1. **Content Storage**
- News posts stored as Markdown files in `/content/news/`
- Frontmatter metadata (title, date, excerpt, author, featured)
- Git-tracked content (automatic version control)
- No database required

### 2. **Admin Interface** (`/admin`)
- Clean dashboard listing all news posts
- Create, edit, and delete functionality
- Responsive table view with post previews
- Direct links to edit individual posts

### 3. **News Editor** (`/admin/news/[slug]`)
- Form-based editor for creating/editing posts
- Fields: Title, Date, Author, Excerpt, Content
- Markdown support in content field
- Featured post toggle
- Auto-generates URL-friendly slugs

### 4. **API Routes**
- `GET /api/news` - List all news posts
- `GET /api/news/[slug]` - Get single post
- `PUT /api/news/[slug]` - Create/update post
- `DELETE /api/news/[slug]` - Delete post

### 5. **Public News Display**
- `/news/[slug]` - Individual news post pages
- Markdown rendering with GitHub-flavored markdown support
- Clean, readable typography
- Automatic static generation for performance

### 6. **Homepage Integration**
- Updated `NewsFeed` component to read from markdown files
- Shows 3 most recent posts
- Links to full articles

## File Structure

```
oswayo-valley-sd/
├── content/
│   └── news/
│       └── welcome-to-v2.md          # Sample news post
├── app/
│   ├── admin/
│   │   ├── page.js                   # Admin dashboard
│   │   └── news/
│   │       └── [slug]/
│   │           └── page.js           # News editor
│   ├── api/
│   │   └── news/
│   │       ├── route.js              # List all news
│   │       └── [slug]/
│   │           └── route.js          # CRUD operations
│   ├── news/
│   │   └── [slug]/
│   │       └── page.js               # Public news display
│   └── utils/
│       ├── news.js                   # File operations
│       └── pocketbase.js             # (deprecated, can be removed)
└── components/
    └── NewsFeed.js                   # Updated to use file-based system
```

## Dependencies Added
- `gray-matter` - Parse frontmatter from markdown files
- `react-markdown` - Render markdown content
- `remark-gfm` - GitHub-flavored markdown support

## How to Use

### Creating a News Post
1. Navigate to `/admin`
2. Click "Create New Post"
3. Fill in the form:
   - **Title**: Post headline
   - **Date**: Publication date
   - **Author**: Author name (defaults to "Oswayo Valley SD")
   - **Excerpt**: Brief summary for homepage
   - **Content**: Full article in Markdown format
   - **Featured**: Toggle for featured posts
4. Click "Create Post"

### Editing a News Post
1. Go to `/admin`
2. Click "Edit" on any post
3. Make changes
4. Click "Update Post"

### Deleting a News Post
1. Go to `/admin`
2. Click "Delete" on any post
3. Confirm deletion

### Markdown Formatting
Content supports full Markdown syntax:
- `**bold**` for **bold text**
- `*italic*` for *italic text*
- `## Heading` for headings
- `- item` for bullet lists
- `[link](url)` for links
- And more!

## Advantages Over PocketBase

1. **No External Dependencies**: No separate database or backend service needed
2. **Git Version Control**: All content changes are tracked in git
3. **Simple Deployment**: Just push to GitHub, Dokploy builds and deploys
4. **Fast**: Static generation for news pages
5. **Portable**: Easy to migrate or backup (just copy markdown files)
6. **Developer-Friendly**: Edit content in any text editor
7. **Next.js 16 Compatible**: No compatibility issues

## Next Steps

1. **Authentication**: Add login protection to `/admin` routes
2. **Image Upload**: Implement image handling for news posts
3. **Categories/Tags**: Add taxonomy for organizing news
4. **Search**: Add search functionality for news archive
5. **Preview**: Add live preview while editing
6. **Rich Text Editor**: Optional WYSIWYG editor for non-technical users

## Deployment

The V2 site will automatically deploy to `v2.oswayo-valley-sd.turek.in` when changes are pushed to the `v2-development` branch.

To test locally:
```bash
npm run dev
```

Then visit:
- Homepage: http://localhost:3000
- Admin: http://localhost:3000/admin
- Sample news: http://localhost:3000/news/welcome-to-v2
