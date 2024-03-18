import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <>
      <h1>Oops... parece que tenemos un error aquí!!!</h1>
      <Link to={'/'}>Volver al Home</Link>
    </>
  )
}
