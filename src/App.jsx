import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './Footer'
import WordleGrid from './wordleGrid'

function App() {
  return (
    <div>
    <h1 class="mudle-home"> Welcome to Mudle</h1>
    <WordleGrid />
    </div>
  )
}

export default App
