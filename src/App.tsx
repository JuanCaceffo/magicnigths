import './App.css'
import CardShow from './components/CardShow/CardShow'
import { showBase } from './data/mocks/showMocks'

function App() {
  return (
    <>
      <CardShow
        show={showBase}
        button={{
          content: 'comprar',
          whenclick: () => {
            console.log(showBase)
          },
        }}
        amount={3}
      />
    </>
  )
}

export default App
