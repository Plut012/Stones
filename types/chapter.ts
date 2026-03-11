/**
 * Chapter metadata from frontmatter
 */
export interface ChapterMetadata {
  chapter: number;
  title: string;
  sgf?: string;
  quote?: string;
  hiddenKoan?: string;
}

/**
 * Full chapter data with content
 */
export interface Chapter extends ChapterMetadata {
  slug: string;
  content: string;
}

/**
 * Chapter for TOC display
 */
export interface ChapterListItem {
  chapter: number;
  title: string;
  slug: string;
  quote?: string;
}
