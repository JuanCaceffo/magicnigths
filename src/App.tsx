import './App.css'
import CardShowBase from './components/CardBaseShow/CardShowBase'
import { showBase } from './data/mocks/showMocks'

function App() {
  return (
    <>
      <CardShowBase show={showBase}></CardShowBase>
    </>
  )
}

export default App
