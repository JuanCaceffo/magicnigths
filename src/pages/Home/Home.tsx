import CardShow from 'src/components/CardShow/CardShow'
import { showBase } from 'src/data/mocks/showMocks'

export const Home = () => {
  return (
    <>
      <CardShow show={showBase} button={{ content: 'holaa', whenclick: () => {} }} amount={3}></CardShow>
    </>
  )
}
