import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Footer from './Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={Footer} />
        <Route path='about' element={Footer} />
        <Route path='home' element={Footer} />
        <Route path='asfdsaf' element={Footer} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
