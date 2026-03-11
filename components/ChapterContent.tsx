'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import type { Chapter } from '@/types/chapter';
import { GoBoard } from './GoBoard';
import { Enso } from './Enso';

interface ChapterContentProps {
  chapter: Chapter;
}

/**
 * Chapter content renderer
 * Displays markdown with generous spacing and optional Go board
 */
export function ChapterContent({ chapter }: ChapterContentProps) {
  const [isBoardComplete, setIsBoardComplete] = useState(false);
  const [isKoanVisible, setIsKoanVisible] = useState(false);

  // Show koan when board is completed
  if (isBoardComplete && !isKoanVisible) {
    setIsKoanVisible(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen py-32 px-16 flex items-center"
    >
      <div className="w-full flex justify-between items-center gap-12 max-w-[95vw]">
        {/* Text content on the left */}
        <article className="flex-1 flex flex-col justify-center min-w-0"
        >
      <header className="mb-48 space-y-24">
        <h1 className="text-5xl font-light tracking-wide text-center" style={{ color: '#5A4535' }}>
          {chapter.title}
        </h1>
        <div className="text-center" style={{ color: '#6B5540', fontSize: '2rem' }}>
          •
        </div>
        {chapter.quote && (
          <blockquote className="text-center text-xl italic" style={{ color: '#7A6048' }}>
            {chapter.quote}
          </blockquote>
        )}
      </header>

      <div className="prose prose-lg prose-stone max-w-none text-center">
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <p className="mb-24 leading-loose text-xl" style={{ color: '#4A3A2A' }}>{children}</p>
            ),
            blockquote: ({ children }) => (
              <blockquote className="my-32 text-center text-2xl italic" style={{ color: '#7A6048' }}>
                {children}
              </blockquote>
            ),
            h2: ({ children }) => (
              <h2 className="mb-10 mt-20 text-2xl font-light text-center" style={{ color: '#5A4535' }}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-8 mt-16 text-xl font-light text-center" style={{ color: '#6B5540' }}>
                {children}
              </h3>
            ),
            strong: ({ children }) => (
              <strong style={{ color: '#6B5540', fontWeight: '500' }}>{children}</strong>
            ),
          }}
        >
          {chapter.content}
        </ReactMarkdown>
      </div>

        </article>

        {/* Go board in the middle */}
        {chapter.sgf && (
          <div className="w-[600px] flex-shrink-0">
            <GoBoard
              sgfPath={chapter.sgf}
              onComplete={() => setIsBoardComplete(true)}
            />
          </div>
        )}

        {/* Enso on the right - clickable to reveal koan */}
        {chapter.hiddenKoan && (
          <motion.button
            onClick={() => setIsKoanVisible(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-[300px] flex-shrink-0 flex items-center justify-center cursor-pointer"
            aria-label="Reveal hidden koan"
          >
            <Enso />
          </motion.button>
        )}
        {!chapter.hiddenKoan && (
          <div className="w-[300px] flex-shrink-0 flex items-center justify-center">
            <Enso />
          </div>
        )}
      </div>

      {/* Hidden Zen Koan - appears after completing the board or clicking enso */}
      <AnimatePresence>
        {isKoanVisible && chapter.hiddenKoan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="fixed inset-0 flex items-center justify-center px-16 py-12"
            style={{
              background: 'rgba(43, 36, 32, 0.97)',
            }}
          >
            <div className="max-w-3xl w-full overflow-y-auto max-h-[80vh] text-center">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="mb-6 leading-relaxed text-lg" style={{ color: '#F5E6D3' }}>
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="block text-2xl mb-8 font-light" style={{ color: '#E8C4A0' }}>
                      {children}
                    </strong>
                  ),
                }}
              >
                {chapter.hiddenKoan}
              </ReactMarkdown>
            </div>

            {/* Enso button to close - positioned on the right */}
            <motion.button
              onClick={() => setIsKoanVisible(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer absolute right-16 top-1/2 -translate-y-1/2"
              aria-label="Close koan"
            >
              <Enso />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
