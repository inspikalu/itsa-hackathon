import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeProvider from './ThemeContex.tsx'
import Index from './Index.tsx'
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Index />
    </ThemeProvider>
  </React.StrictMode>,
)
