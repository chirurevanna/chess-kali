import { Chess, type Square } from 'chess.js'
import type { MoveNode } from '../data/types'

/** Follow the first child at each step: the main line. */
export function mainline(root: MoveNode[]): MoveNode[] {
  const out: MoveNode[] = []
  let cur = root
  while (cur.length) {
    out.push(cur[0])
    cur = cur[0].children
  }
  return out
}

export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

/** From/to squares for a SAN move played from a given FEN. */
export function squaresFor(fen: string, san: string): [Square, Square] | null {
  try {
    const m = new Chess(fen).move(san)
    return [m.from, m.to]
  } catch {
    return null
  }
}

/** Every root→leaf path, as SAN arrays. */
export function allPaths(root: MoveNode[], prefix: string[] = []): string[][] {
  if (!root.length) return [prefix]
  return root.flatMap((n) => allPaths(n.children, [...prefix, n.san]))
}
