import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import Router from './router'
import { auto } from 'darkreader'

auto({
    brightness: 100,
    contrast: 90,
    sepia: 10,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
