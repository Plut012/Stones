/**
 * Simple SGF (Smart Game Format) parser for Go games
 */

export interface Stone {
  x: number;
  y: number;
  color: 'B' | 'W'; // Black or White
}

export interface GameInfo {
  size: number;
  moves: Stone[];
  playerBlack?: string;
  playerWhite?: string;
  result?: string;
}

/**
 * Convert SGF coordinate (e.g., "pd") to board coordinates
 * SGF uses letters: a=0, b=1, c=2, etc.
 */
function sgfToCoord(sgfCoord: string): { x: number; y: number } {
  if (sgfCoord.length !== 2) {
    throw new Error(`Invalid SGF coordinate: ${sgfCoord}`);
  }
  const x = sgfCoord.charCodeAt(0) - 'a'.charCodeAt(0);
  const y = sgfCoord.charCodeAt(1) - 'a'.charCodeAt(0);
  return { x, y };
}

/**
 * Parse SGF content and extract game information
 */
export function parseSGF(sgfContent: string): GameInfo {
  // Default values
  let size = 19;
  const moves: Stone[] = [];
  let playerBlack: string | undefined;
  let playerWhite: string | undefined;
  let result: string | undefined;

  // Extract board size
  const sizeMatch = sgfContent.match(/SZ\[(\d+)\]/);
  if (sizeMatch) {
    size = parseInt(sizeMatch[1], 10);
  }

  // Extract player names
  const blackMatch = sgfContent.match(/PB\[([^\]]+)\]/);
  if (blackMatch) {
    playerBlack = blackMatch[1];
  }

  const whiteMatch = sgfContent.match(/PW\[([^\]]+)\]/);
  if (whiteMatch) {
    playerWhite = whiteMatch[1];
  }

  // Extract result
  const resultMatch = sgfContent.match(/RE\[([^\]]+)\]/);
  if (resultMatch) {
    result = resultMatch[1];
  }

  // Extract moves
  // Match patterns like ;B[pd] or ;W[dd]
  const moveRegex = /;([BW])\[([a-z]{2})\]/g;
  let match;

  while ((match = moveRegex.exec(sgfContent)) !== null) {
    const color = match[1] as 'B' | 'W';
    const coord = match[2];

    try {
      const { x, y } = sgfToCoord(coord);
      moves.push({ x, y, color });
    } catch (error) {
      console.warn(`Failed to parse move: ${coord}`, error);
    }
  }

  return {
    size,
    moves,
    playerBlack,
    playerWhite,
    result,
  };
}

/**
 * Get board state at a specific move number
 */
export function getBoardState(
  gameInfo: GameInfo,
  moveNumber?: number
): Map<string, 'B' | 'W'> {
  const board = new Map<string, 'B' | 'W'>();
  const movesToShow = moveNumber !== undefined
    ? gameInfo.moves.slice(0, moveNumber + 1)
    : gameInfo.moves;

  for (const move of movesToShow) {
    const key = `${move.x},${move.y}`;
    board.set(key, move.color);
  }

  return board;
}
