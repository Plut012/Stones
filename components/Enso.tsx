'use client';

import { motion } from 'framer-motion';

/**
 * Animated Enso circle - the zen symbol of enlightenment
 * Breathes gently on the right side of the screen
 */
export function Enso() {
  return (
    <div>
      <motion.svg
        width="280"
        height="280"
        viewBox="0 0 200 200"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#4A3A2A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="502"
          strokeDashoffset="50"
          opacity="0.7"
          style={{ filter: 'drop-shadow(0 0 8px rgba(74, 58, 42, 0.4))' }}
        />
      </motion.svg>
    </div>
  );
}
