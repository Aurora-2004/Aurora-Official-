import { StrictMode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

export function renderPage(Page: ComponentType) {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('Missing #root element in the page HTML')
  }

  createRoot(rootElement).render(
    <StrictMode>
      <Page />
    </StrictMode>,
  )
}
