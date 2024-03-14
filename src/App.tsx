import './App.css'
import CardShow from './components/CardShow/CardShow'
import { showBase } from './data/mocks/showMocks'

function App() {
  return (
    <>
      <CardShow show={showBase} />
    </>
  )
}

export default App
