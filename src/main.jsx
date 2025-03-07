import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Footer from './Footer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />} /> {}
        <Route path='about' element={<Footer name="About Page" />} />
        <Route path='home' element={<Footer name="Home Page" />} />
        <Route path='asfdsaf' element={<Footer name="Unknown Page" />} />
        <Route path='*' element={<div>404 Not Found</div>} /> {}
      </Routes>
    </HashRouter>
  </StrictMode>,
);