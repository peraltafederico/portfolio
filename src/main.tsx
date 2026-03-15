import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import './index.css'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

// Remove splash screen after hydration
requestAnimationFrame(() => {
  setTimeout(() => {
    const splash = document.getElementById('splash')
    const root = document.getElementById('root')
    if (root) root.style.opacity = '1'
    if (splash) {
      splash.style.opacity = '0'
      splash.addEventListener('transitionend', () => splash.remove())
    }
  }, 600)
})
