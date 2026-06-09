import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import OtterAdviceApp from './OtterAdviceApp.jsx'
import './otter.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OtterAdviceApp />
  </StrictMode>,
)
