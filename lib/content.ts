import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Chapter, ChapterMetadata, ChapterListItem } from '@/types/chapter';

const chaptersDirectory = path.join(process.cwd(), 'content/chapters');

/**
 * Get all chapters, sorted by chapter number
 */
export function getAllChapters(): Chapter[] {
  const fileNames = fs.readdirSync(chaptersDirectory);

  const chapters = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(chaptersDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        ...(data as ChapterMetadata),
      };
    })
    .sort((a, b) => a.chapter - b.chapter);

  return chapters;
}

/**
 * Get chapter by slug
 */
export function getChapterBySlug(slug: string): Chapter | null {
  try {
    const fullPath = path.join(chaptersDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...(data as ChapterMetadata),
    };
  } catch {
    return null;
  }
}

/**
 * Get list of chapters for TOC
 */
export function getChapterList(): ChapterListItem[] {
  const chapters = getAllChapters();

  return chapters.map(({ chapter, title, slug, quote }) => ({
    chapter,
    title,
    slug,
    quote,
  }));
}

/**
 * Get all chapter slugs for static generation
 */
export function getAllChapterSlugs(): string[] {
  const fileNames = fs.readdirSync(chaptersDirectory);

  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}
