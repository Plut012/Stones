import { TableOfContents } from '@/components/TableOfContents';
import { getChapterList } from '@/lib/content';

export default function Home() {
  const chapters = getChapterList();

  return <TableOfContents chapters={chapters} />;
}
