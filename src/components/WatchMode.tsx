import { useEffect, useMemo, useState } from 'react'
import { Chess } from 'chess.js'
import type { Lesson } from '../data/types'
import { mainline } from '../lib/tree'
import { Board } from './Board'

export function WatchMode({ lesson, onDone }: { lesson: Lesson; onDone: () => void }) {
  const moves = useMemo(() => mainline(lesson.root), [lesson])
  const frames = useMemo(() => {
    const g = new Chess()
    const out = [{ fen: g.fen(), from: null as any, to: null as any }]
    for (const m of moves) {
      const r = g.move(m.san)
      out.push({ fen: g.fen(), from: r.from, to: r.to })
    }
    return out
  }, [moves])

  const [i, setI] = useState(0) // number of moves played
  const atEnd = i === moves.length

  useEffect(() => {
    if (atEnd) onDone()
  }, [atEnd, onDone])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setI((x) => Math.min(x + 1, moves.length))
      if (e.key === 'ArrowLeft') setI((x) => Math.max(x - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [moves.length])

  const frame = frames[i]
  const move = i > 0 ? moves[i - 1] : null
  const moveLabel = move ? `${Math.ceil(i / 2)}.${i % 2 === 0 ? '..' : ''} ${move.san}` : ''

  return (
    <div className="mode">
      <Board
        fen={frame.fen}
        orientation={lesson.side}
        arrows={move ? [[frame.from, frame.to]] : []}
        lastMove={move ? [frame.from, frame.to] : null}
      />
      <div className="panel">
        {move ? (
          <>
            <div className="move-label">{moveLabel}</div>
            <p>{move.explain}</p>
          </>
        ) : (
          <p>{lesson.intro}</p>
        )}
        {atEnd && (
          <div className="summary">
            <strong>The plan from here</strong>
            <ul>
              {lesson.summary.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="controls">
          <button onClick={() => setI(0)} disabled={i === 0} aria-label="Start">⏮</button>
          <button onClick={() => setI(i - 1)} disabled={i === 0}>◀ Back</button>
          <button className="primary" onClick={() => setI(i + 1)} disabled={atEnd}>Next ▶</button>
        </div>
        <div className="muted small">Move {i} of {moves.length} · use ← → keys</div>
      </div>
    </div>
  )
}
