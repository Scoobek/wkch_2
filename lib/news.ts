import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface GalleryImage {
    src: string;
    alt?: string;
    caption?: string;
}

export interface NewsArticle {
    slug: string;
    title: string;
    date: string;
    excerpt?: string;
    thumbnail?: string;
    tag?: string;
    images?: GalleryImage[];
    location: {
        town?: string;
        address?: string;
        lat?: number;
        lng?: number;
    };
}

export interface NewsArticleFull extends NewsArticle {
    body: string;
    isHeroSection?: boolean;
}

export function getNewsArticle(slug: string): NewsArticleFull | null {
    const filePath = path.join(process.cwd(), "content", "news", `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
    return {
        slug,
        title: data.title ?? "",
        date: data.date ? new Date(data.date).toISOString() : "",
        excerpt: data.excerpt,
        thumbnail: data.thumbnail,
        tag: data.tag,
        location: data.location,
        images: data.images,
        body: content.trim(),
    };
}

export function getAllNews(): NewsArticle[] {
    const newsDir = path.join(process.cwd(), "content", "news");

    if (!fs.existsSync(newsDir)) return [];

    const files = fs.readdirSync(newsDir).filter((f) => f.endsWith(".md"));

    if (files.length === 0) return [];

    return files
        .map((filename) => {
            const slug = filename.replace(/\.md$/, "");
            const { data } = matter(
                fs.readFileSync(path.join(newsDir, filename), "utf-8")
            );
            return {
                slug,
                title: data.title ?? "",
                date: data.date ? new Date(data.date).toISOString() : "",
                excerpt: data.excerpt,
                thumbnail: data.thumbnail,
                tag: data.tag,
                location: data.location,
            };
        })
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
}
