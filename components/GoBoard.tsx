'use client';

import { useEffect, useRef, useState } from 'react';
import { parseSGF, getBoardState, type GameInfo } from '@/lib/sgf';

interface GoBoardProps {
  sgfPath: string;
  onComplete?: () => void;
}

/**
 * Go board renderer using SGF files
 */
export function GoBoard({ sgfPath, onComplete }: GoBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [currentMove, setCurrentMove] = useState<number>(-1); // -1 = empty board
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);

  useEffect(() => {
    const loadAndRenderSGF = async () => {
      try {
        // Fetch the SGF file
        const response = await fetch(`/diagrams/${sgfPath}`);
        if (!response.ok) {
          throw new Error(`Failed to load SGF: ${response.statusText}`);
        }

        const sgfContent = await response.text();
        const info = parseSGF(sgfContent);
        setGameInfo(info);
        setCurrentMove(-1); // Start with empty board
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load board');
      }
    };

    loadAndRenderSGF();
  }, [sgfPath]);

  // Re-render board when move changes
  useEffect(() => {
    if (gameInfo) {
      renderBoard(gameInfo, currentMove);
    }
  }, [gameInfo, currentMove]);

  // Check if user has reached the last move
  useEffect(() => {
    if (gameInfo && !hasCompletedOnce && currentMove === gameInfo.moves.length - 1) {
      setHasCompletedOnce(true);
      onComplete?.();
    }
  }, [currentMove, gameInfo, hasCompletedOnce, onComplete]);

  const handleBoardClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameInfo) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const isLeftSide = clickX < canvas.width / 2;

    if (isLeftSide) {
      // Go back one move
      setCurrentMove((prev) => Math.max(-1, prev - 1));
    } else {
      // Go forward one move
      setCurrentMove((prev) => Math.min(gameInfo.moves.length - 1, prev + 1));
    }
  };

  const renderBoard = (info: GameInfo, moveNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = info.size;
    const padding = 30;
    const boardSize = canvas.width - 2 * padding;
    const cellSize = boardSize / (size - 1);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw board background
    ctx.fillStyle = '#5A3535';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;

    for (let i = 0; i < size; i++) {
      const pos = padding + i * cellSize;

      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(pos, padding);
      ctx.lineTo(pos, padding + (size - 1) * cellSize);
      ctx.stroke();

      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(padding, pos);
      ctx.lineTo(padding + (size - 1) * cellSize, pos);
      ctx.stroke();
    }

    // Draw star points (for 19x19 board)
    if (size === 19) {
      const starPoints = [
        [3, 3], [3, 9], [3, 15],
        [9, 3], [9, 9], [9, 15],
        [15, 3], [15, 9], [15, 15],
      ];

      ctx.fillStyle = '#000000';
      for (const [x, y] of starPoints) {
        const cx = padding + x * cellSize;
        const cy = padding + y * cellSize;
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw stones up to current move
    const boardState = getBoardState(info, moveNumber);
    const stoneRadius = cellSize * 0.45;

    for (const [key, color] of boardState.entries()) {
      const [x, y] = key.split(',').map(Number);
      const cx = padding + x * cellSize;
      const cy = padding + y * cellSize;

      // Draw stone
      ctx.beginPath();
      ctx.arc(cx, cy, stoneRadius, 0, Math.PI * 2);

      if (color === 'B') {
        ctx.fillStyle = '#000000';
        ctx.fill();
        // Add subtle gradient
        const gradient = ctx.createRadialGradient(
          cx - stoneRadius * 0.3,
          cy - stoneRadius * 0.3,
          0,
          cx,
          cy,
          stoneRadius
        );
        gradient.addColorStop(0, 'rgba(80, 80, 80, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
        ctx.fillStyle = gradient;
        ctx.fill();
      } else {
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-sm" style={{ color: '#8B6F47' }}>
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        onClick={handleBoardClick}
        className="rounded-sm cursor-pointer"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
        title="Click left to go back, right to go forward"
      />
    </div>
  );
}
