import { italian } from './italian'
import { french } from './french'
import type { Lesson } from './types'

export const lessons: Lesson[] = [italian, french]

export const getLesson = (id: string) => lessons.find((l) => l.id === id)
