import { useState, type CSSProperties } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, type Square } from 'chess.js'
import type { Side } from '../data/types'

interface Props {
  fen: string
  orientation: Side
  /** Return true if the move was accepted. Omit to make the board read-only. */
  onMove?: (from: Square, to: Square) => boolean
  arrows?: [Square, Square][]
  lastMove?: [Square, Square] | null
  flash?: Square | null
}

const tint = (c: string): CSSProperties => ({ boxShadow: `inset 0 0 0 200px ${c}` })

export function Board({ fen, orientation, onMove, arrows = [], lastMove, flash }: Props) {
  const [selected, setSelected] = useState<Square | null>(null)
  const interactive = !!onMove
  const myColor = orientation === 'white' ? 'w' : 'b'

  const styles: Record<string, CSSProperties> = {}
  if (lastMove) {
    for (const sq of lastMove) styles[sq] = tint('var(--last-move)')
  }
  if (selected) {
    styles[selected] = tint('var(--selected)')
    const game = new Chess(fen)
    for (const m of game.moves({ square: selected, verbose: true })) {
      styles[m.to] = {
        ...styles[m.to],
        backgroundImage: 'radial-gradient(circle, var(--dot) 22%, transparent 24%)',
      }
    }
  }
  if (flash) styles[flash] = tint('var(--wrong)')

  const handleClick = (square: Square) => {
    if (!interactive) return
    const piece = new Chess(fen).get(square)
    if (selected) {
      if (square === selected) return setSelected(null)
      if (piece && piece.color === myColor) return setSelected(square)
      onMove!(selected, square)
      return setSelected(null)
    }
    if (piece && piece.color === myColor && new Chess(fen).turn() === myColor) setSelected(square)
  }

  return (
    <div className="board">
      <Chessboard
        position={fen}
        boardOrientation={orientation}
        arePiecesDraggable={interactive}
        isDraggablePiece={({ piece }) => piece[0] === myColor}
        onPieceDrop={(from, to) => {
          setSelected(null)
          return onMove ? onMove(from, to) : false
        }}
        onSquareClick={handleClick}
        customArrows={arrows.map(([a, b]) => [a, b, 'rgba(255,170,0,0.85)'])}
        areArrowsAllowed={false}
        customSquareStyles={styles}
        customDarkSquareStyle={{ backgroundColor: 'var(--sq-dark)' }}
        customLightSquareStyle={{ backgroundColor: 'var(--sq-light)' }}
        animationDuration={250}
      />
    </div>
  )
}
