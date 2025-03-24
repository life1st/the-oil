import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import Router from './router'

const darkMode = async () => {
  const { auto, isEnabled } = await import('darkreader')
  auto({
    brightness: 100,
    contrast: 90,
    sepia: 10,
  })
  const appendMeta = () => {
    const metaEl = document.createElement('meta')
    metaEl.setAttribute('name', 'theme-color')
    const bodyBgc = isEnabled() ? getComputedStyle(document.body).backgroundColor : '#fff'
    metaEl.setAttribute('content', bodyBgc)
    document.head.append(metaEl)
  }

  appendMeta()
}

void darkMode();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)

// default safearea variable
document.documentElement.style.setProperty('--safe-area-top', '0px');
document.documentElement.style.setProperty('--safe-area-bottom', '0px');