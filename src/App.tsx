import { useEffect, useState } from 'react'
import { getLesson } from './data'
import { Home } from './components/Home'
import { LessonPage } from './components/LessonPage'

function useHash() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const on = () => {
      setHash(window.location.hash)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return hash
}

export default function App() {
  const hash = useHash()
  const m = hash.match(/^#\/lesson\/([\w-]+)(?:\/(learn|practice))?/)
  const lesson = m ? getLesson(m[1]) : undefined

  return (
    <main className="app">
      {lesson ? (
        <LessonPage
          key={hash}
          lesson={lesson}
          initial={m?.[2] === 'practice' ? 'practice' : m?.[2] === 'learn' ? 'watch' : undefined}
        />
      ) : (
        <Home />
      )}
    </main>
  )
}
