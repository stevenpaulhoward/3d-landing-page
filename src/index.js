import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App'
import { Overlay } from './Overlay'
import './styles.css'

createRoot(document.getElementById('root')).render(
<>
<App />
<Overlay />
</>)
