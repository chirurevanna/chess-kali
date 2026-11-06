export interface LessonProgress {
  watched: boolean
  learned: boolean
  practiceRuns: number
  perfectRuns: number
  streak: number
}

const KEY = 'chesskali:v1'

const empty = (): LessonProgress => ({
  watched: false,
  learned: false,
  practiceRuns: 0,
  perfectRuns: 0,
  streak: 0,
})

function readAll(): Record<string, LessonProgress> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function getProgress(id: string): LessonProgress {
  return { ...empty(), ...readAll()[id] }
}

export function updateProgress(id: string, fn: (p: LessonProgress) => LessonProgress) {
  const all = readAll()
  all[id] = fn(getProgress(id))
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    /* storage unavailable: progress just won't persist */
  }
}
