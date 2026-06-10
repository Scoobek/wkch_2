import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  thumbnail?: string;
  tag?: string;
  location?: string;
}

export function getAllNews(): NewsArticle[] {
  const newsDir = path.join(process.cwd(), 'content', 'news');

  if (!fs.existsSync(newsDir)) return [];

  const files = fs.readdirSync(newsDir).filter(f => f.endsWith('.md'));

  if (files.length === 0) return [];

  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const { data } = matter(fs.readFileSync(path.join(newsDir, filename), 'utf-8'));
      return {
        slug,
        title: data.title ?? '',
        date: data.date ? new Date(data.date).toISOString() : '',
        excerpt: data.excerpt,
        thumbnail: data.thumbnail,
        tag: data.tag,
        location: data.location,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
