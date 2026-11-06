import { useCallback, useEffect, useRef, useState } from 'react'
import { Chess, type Square } from 'chess.js'
import type { Lesson, MoveNode } from '../data/types'
import { pickRandom, squaresFor } from '../lib/tree'
import { Board } from './Board'

type Mode = 'guided' | 'practice'

interface Props {
  lesson: Lesson
  mode: Mode
  onFinish: (mistakes: number) => void
}

/** Play-along (guided) and Practice share this: you play your side, the app plays the book replies. */
export function Trainer({ lesson, mode, onFinish }: Props) {
  const [run, setRun] = useState(0)
  return <TrainerRun key={run} lesson={lesson} mode={mode} onFinish={onFinish} onRestart={() => setRun(run + 1)} />
}

function TrainerRun({ lesson, mode, onFinish, onRestart }: Props & { onRestart: () => void }) {
  const gameRef = useRef(new Chess())
  const [fen, setFen] = useState(gameRef.current.fen())
  const [next, setNext] = useState<MoveNode[]>(lesson.root)
  const [lastMove, setLastMove] = useState<[Square, Square] | null>(null)
  const [lastExplain, setLastExplain] = useState<string | null>(null)
  const [misses, setMisses] = useState(0) // on the current move
  const [mistakes, setMistakes] = useState(0) // whole run
  const [feedback, setFeedback] = useState<{ kind: 'good' | 'bad'; text: string } | null>(null)
  const [flash, setFlash] = useState<Square | null>(null)
  const reported = useRef(false)

  const myColor = lesson.side === 'white' ? 'w' : 'b'
  const myTurn = gameRef.current.turn() === myColor
  const done = next.length === 0

  const play = useCallback((node: MoveNode) => {
    const r = gameRef.current.move(node.san)
    setFen(gameRef.current.fen())
    setLastMove([r.from, r.to])
    setLastExplain(node.explain)
    setNext(node.children)
    setMisses(0)
  }, [])

  // Opponent auto-reply
  useEffect(() => {
    if (done || myTurn) return
    const t = setTimeout(() => play(mode === 'practice' ? pickRandom(next) : next[0]), 550)
    return () => clearTimeout(t)
  }, [done, myTurn, next, mode, play])

  useEffect(() => {
    if (done && !reported.current) {
      reported.current = true
      onFinish(mistakes)
    }
  }, [done, mistakes, onFinish])

  const onMove = (from: Square, to: Square): boolean => {
    if (done || !myTurn) return false
    let san: string
    try {
      san = new Chess(fen).move({ from, to, promotion: 'q' }).san
    } catch {
      return false // illegal: snap back silently
    }
    const match = next.find((n) => n.san === san)
    if (match) {
      play(match)
      setFeedback(mode === 'guided' ? { kind: 'good', text: '✓ Correct' } : null)
      return true
    }
    setMisses(misses + 1)
    setMistakes(mistakes + 1)
    setFlash(to)
    setTimeout(() => setFlash(null), 400)
    setFeedback({
      kind: 'bad',
      text: mode === 'guided' ? `${san} isn't the book move. ${next[0].hint ?? 'Try again.'}` : `${san} isn't the book move.`,
    })
    return false
  }

  // Show the answer arrow: guided after 2 misses, practice after 1.
  const reveal = !done && myTurn && misses >= (mode === 'guided' ? 2 : 1)
  const answer = reveal ? squaresFor(fen, next[0].san) : null

  const total = countOwn(lesson)
  const plies = gameRef.current.history().length
  const played = myColor === 'w' ? Math.ceil(plies / 2) : Math.floor(plies / 2)

  return (
    <div className="mode">
      <Board
        fen={fen}
        orientation={lesson.side}
        onMove={onMove}
        lastMove={lastMove}
        arrows={answer ? [answer] : []}
        flash={flash}
      />
      <div className="panel">
        {done ? (
          <div className="result">
            <div className="big">{mistakes === 0 ? '🎉 Perfect!' : `Done: ${mistakes} mistake${mistakes > 1 ? 's' : ''}`}</div>
            <p>
              {mode === 'guided'
                ? 'You’ve played the whole line. Now try Practice with no hints.'
                : mistakes === 0
                  ? 'You know this line. Run it again to lock it in.'
                  : 'Run it again until you get it perfect.'}
            </p>
            {mode === 'guided' && lastExplain && <p className="muted">{lastExplain}</p>}
            <button className="primary" onClick={onRestart}>↻ Again</button>
          </div>
        ) : (
          <>
            <div className="status">
              {myTurn ? <strong>Your move</strong> : <span className="muted">Opponent is thinking…</span>}
              <span className="muted small">
                {played}/{total} moves · mistakes {mistakes}
              </span>
            </div>
            {mode === 'guided' && lastExplain && <p className="muted">{lastExplain}</p>}
            {mode === 'guided' && myTurn && next[0].hint && (
              <p className="hint">💡 {next[0].hint}</p>
            )}
            {feedback && <p className={`feedback ${feedback.kind}`}>{feedback.text}</p>}
            {answer && <p className="small muted">The arrow shows the book move.</p>}
            <div className="controls">
              <button onClick={onRestart}>↻ Restart</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function countOwn(lesson: Lesson): number {
  let n = 0
  let ply = 0
  let cur = lesson.root
  const own = lesson.side === 'white' ? 0 : 1
  while (cur.length) {
    if (ply % 2 === own) n++
    cur = cur[0].children
    ply++
  }
  return n
}
