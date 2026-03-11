'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ChapterListItem } from '@/types/chapter';

interface TableOfContentsProps {
  chapters: ChapterListItem[];
}

/**
 * Table of Contents - gateway to chapters
 * Fades out when a chapter is selected
 */
export function TableOfContents({ chapters }: TableOfContentsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex min-h-screen items-center justify-center"
    >
      <div className="max-w-2xl space-y-8">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-light tracking-wide" style={{ color: '#5A4535' }}>
            Stones
          </h1>
          <p className="text-lg" style={{ color: '#6B5540' }}>
            A meditation on Kajiwara&apos;s &quot;The Direction of Play&quot;
          </p>
        </div>

        <nav className="space-y-4">
          {chapters.map((chapter) => (
            <Link
              key={chapter.slug}
              href={`/chapter/${chapter.slug}`}
              className="block text-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <span
                  className="text-xl font-light transition-colors"
                  style={{ color: '#4A3A2A' }}
                >
                  {chapter.title}
                </span>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
