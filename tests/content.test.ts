import { describe, it, expect } from 'vitest'
import { Chess } from 'chess.js'
import { lessons } from '../src/data'
import { allPaths } from '../src/lib/tree'

describe.each(lessons)('lesson $id', (lesson) => {
  it('every book path is legal', () => {
    for (const path of allPaths(lesson.root)) {
      const game = new Chess()
      for (const san of path) {
        expect(() => game.move(san), `${path.join(' ')} @ ${san}`).not.toThrow()
      }
    }
  })

  it('every own-side move has a hint', () => {
    const own = lesson.side === 'white' ? 0 : 1
    const walk = (nodes: typeof lesson.root, ply: number) => {
      for (const n of nodes) {
        if (ply % 2 === own) expect(n.hint, n.san).toBeTruthy()
        walk(n.children, ply + 1)
      }
    }
    walk(lesson.root, 0)
  })
})
