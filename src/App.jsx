import './App.css'
import Keyboard from './components/Keyboard';
import WordPlacement from "./components/WordPlacement";

const App = () => {
  return (
    <div className="app">
      <h1>Music Wordle Guessing</h1>
      <WordPlacement />
      <Keyboard />
    </div>
  )
}
// function App() {
//   return (
//     <div>
//     <h1 class="mudle-home"> Welcome</h1>
//     </div>
//   )
// }
export default App
