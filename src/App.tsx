import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Footer } from './components/Footer'

function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    document.documentElement.className = dark ? 'dark' : 'light'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <>
      <Header dark={dark} onToggle={() => setDark(!dark)} />
      <main>
        <Hero dark={dark} />
        <Projects dark={dark} />
        <Experience dark={dark} />
        <Skills dark={dark} />
      </main>
      <Footer dark={dark} />
    </>
  )
}

export default App
