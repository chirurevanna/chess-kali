export type Side = 'white' | 'black'

export interface MoveNode {
  /** Move in standard algebraic notation, e.g. "Nf3" */
  san: string
  /** Why this move is played (shown after it is played) */
  explain: string
  /** Nudge shown before the learner plays it (own-side moves) */
  hint?: string
  /** Book continuations. More than one = branch; practice picks randomly. */
  children: MoveNode[]
}

export interface Lesson {
  id: string
  name: string
  subtitle: string
  side: Side
  intro: string
  summary: string[]
  root: MoveNode[]
}

/** Build a single-line tree from a flat list of moves. */
export function line(moves: Omit<MoveNode, 'children'>[]): MoveNode[] {
  let children: MoveNode[] = []
  for (let i = moves.length - 1; i >= 0; i--) {
    children = [{ ...moves[i], children }]
  }
  return children
}
