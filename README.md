# TechBlog Pro

![TechBlog Pro](https://imgix.cosmicjs.com/0395ff50-83b0-11f0-8ece-89921cbea84a-photo-1522071820081-009f0129c71c-1756345244252.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform built with Next.js 15 and powered by Cosmic. This application showcases your existing blog content with beautiful design, category filtering, and individual post pages.

## Features

- 🎯 **Dynamic Blog Listing** - Display all posts with category filtering
- 👤 **Author Profiles** - Dedicated pages for each author with their posts
- 🏷️ **Category Organization** - Color-coded categories with filtering
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔍 **SEO Optimized** - Dynamic metadata and structured content
- ⚡ **Fast Performance** - Server-side rendering with Next.js 15

<!-- CLONE_PROJECT_BUTTON -->

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a blog with posts, authors, and categories

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic SDK** - Content management and API integration
- **Inter Font** - Modern typography

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with existing content

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Cosmic SDK Examples

The application demonstrates key Cosmic SDK patterns:

```typescript
// Fetch all posts with author and category data
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);

// Get a specific post with connected objects
const post = await cosmic.objects
  .findOne({ type: 'posts', slug: postSlug })
  .depth(1);

// Filter posts by category
const categoryPosts = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId 
  })
  .depth(1);
```

## Cosmic CMS Integration

This application integrates with your existing Cosmic content structure:

- **Posts**: Blog posts with content, excerpts, featured images, and relationships
- **Authors**: Author profiles with bios, avatars, and social links  
- **Categories**: Content organization with descriptions and brand colors

The app automatically handles relationships between content types and displays connected data using the depth parameter for efficient querying.

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy with automatic CI/CD

### Netlify
1. Connect your repository to Netlify
2. Set build command to `bun run build`
3. Add environment variables in site settings

Remember to set your Cosmic environment variables in your hosting platform's dashboard for production deployment.
