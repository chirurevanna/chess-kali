import { useCallback, useState } from 'react'
import type { Lesson } from '../data/types'
import { getProgress, updateProgress } from '../lib/progress'
import { WatchMode } from './WatchMode'
import { Trainer } from './Trainer'

type Step = 'watch' | 'play' | 'practice'

const STEPS: { id: Step; label: string; group: string }[] = [
  { id: 'watch', label: '1 · Watch', group: 'Learn' },
  { id: 'play', label: '2 · Play along', group: 'Learn' },
  { id: 'practice', label: 'Practice', group: 'Practice' },
]

export function LessonPage({ lesson, initial }: { lesson: Lesson; initial?: Step }) {
  const [progress, setProgress] = useState(() => getProgress(lesson.id))
  const [step, setStep] = useState<Step>(initial ?? (progress.learned ? 'practice' : 'watch'))

  const save = useCallback(
    (fn: Parameters<typeof updateProgress>[1]) => {
      updateProgress(lesson.id, fn)
      setProgress(getProgress(lesson.id))
    },
    [lesson.id],
  )

  const onWatched = useCallback(() => save((p) => ({ ...p, watched: true })), [save])
  const onLearned = useCallback(() => save((p) => ({ ...p, learned: true })), [save])
  const onPracticed = useCallback(
    (mistakes: number) =>
      save((p) => ({
        ...p,
        practiceRuns: p.practiceRuns + 1,
        perfectRuns: p.perfectRuns + (mistakes === 0 ? 1 : 0),
        streak: mistakes === 0 ? p.streak + 1 : 0,
      })),
    [save],
  )

  return (
    <div className="lesson">
      <header className="lesson-head">
        <a href="#/" className="back">← Lessons</a>
        <h1>{lesson.name}</h1>
        <div className="muted">{lesson.subtitle}</div>
      </header>

      <nav className="steps">
        {STEPS.map((s) => (
          <button
            key={s.id}
            className={`step ${step === s.id ? 'active' : ''} ${s.group === 'Practice' ? 'practice' : ''}`}
            onClick={() => setStep(s.id)}
          >
            {s.label}
            {s.id === 'watch' && progress.watched && ' ✓'}
            {s.id === 'play' && progress.learned && ' ✓'}
            {s.id === 'practice' && progress.streak > 0 && ` 🔥${progress.streak}`}
          </button>
        ))}
      </nav>

      {step === 'watch' && <WatchMode lesson={lesson} onDone={onWatched} />}
      {step === 'play' && <Trainer key="play" lesson={lesson} mode="guided" onFinish={onLearned} />}
      {step === 'practice' && <Trainer key="practice" lesson={lesson} mode="practice" onFinish={onPracticed} />}

      {step === 'watch' && progress.watched && (
        <div className="next-cta">
          <button className="primary" onClick={() => setStep('play')}>Next: play it yourself →</button>
        </div>
      )}
      {step === 'play' && progress.learned && (
        <div className="next-cta">
          <button className="primary" onClick={() => setStep('practice')}>Go to Practice →</button>
        </div>
      )}
    </div>
  )
}
