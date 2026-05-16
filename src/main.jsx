import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Week2App from './week2App.jsx'
import Week3App from './week3App.jsx'
import Week4App from './week4App.jsx'
import { useState } from 'react'

const [ user, setUser ] = useState({})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Week2App />
	<Week3App />
	<Week4App />
	{[1,2,3].reduce((a,b) => a+b, 0)}
  </StrictMode>,
)