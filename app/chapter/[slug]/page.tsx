import { notFound } from 'next/navigation';
import { ChapterContent } from '@/components/ChapterContent';
import { getChapterBySlug, getAllChapterSlugs } from '@/lib/content';

interface ChapterPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllChapterSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  return <ChapterContent chapter={chapter} />;
}
