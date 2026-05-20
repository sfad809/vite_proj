import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Week2App from './week2App.jsx'
import Week3App from './week3App.jsx'
import Week4App from './week4App.jsx'
import Week5App from './week5App.jsx'
import Week6App from './week6App.jsx'
import Week9App from './week9App.jsx'
import Week11App from './week11App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Week2App />
	<Week3App />
	<Week4App />
	<Week5App />
	<Week6App />
	<Week9App />
	<Week11App />
  </StrictMode>,
)