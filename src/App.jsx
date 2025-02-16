import './App.css'
import Keyboard from './components/Keyboard';
import WordPlacement from "./components/WordPlacement";

const App = () => {
  return (
    
    <div className="container">
      <WordPlacement />
      <Keyboard /> 
    </div>

  )
}
export default App
