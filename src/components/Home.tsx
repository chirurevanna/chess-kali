import { lessons } from '../data'
import { getProgress } from '../lib/progress'

export function Home() {
  return (
    <div className="home">
      <header className="hero">
        <h1>♞ Chess Kali</h1>
        <p className="muted">Learn an opening, then practise exactly what you learned.</p>
      </header>
      <div className="cards">
        {lessons.map((l) => {
          const p = getProgress(l.id)
          return (
            <div key={l.id} className="card">
              <div className={`side-badge ${l.side}`}>{l.side === 'white' ? '♔ White' : '♚ Black'}</div>
              <h2>{l.name}</h2>
              <div className="muted small">{l.subtitle}</div>
              <p>{l.intro}</p>
              <div className="badges small">
                <span className={p.learned ? 'on' : ''}>{p.learned ? '✓ Learned' : 'Not learned yet'}</span>
                {p.practiceRuns > 0 && (
                  <span>
                    {p.perfectRuns}/{p.practiceRuns} perfect
                    {p.streak > 0 && ` · 🔥${p.streak}`}
                  </span>
                )}
              </div>
              <div className="card-actions">
                <a className="btn" href={`#/lesson/${l.id}/learn`}>Learn</a>
                <a className="btn primary" href={`#/lesson/${l.id}/practice`}>Practice</a>
              </div>
            </div>
          )
        })}
      </div>
      <footer className="muted small">More openings coming soon.</footer>
    </div>
  )
}
