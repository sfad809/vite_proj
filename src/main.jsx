import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Week2App from './week2App.jsx'
import Week3App from './week3App.jsx'
import Week4App from './week4App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Week2App />
	<Week3App />
	<Week4App />
  </StrictMode>,
)