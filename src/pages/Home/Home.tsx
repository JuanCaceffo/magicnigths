import { Link } from 'react-router-dom'

export const Home = () => {
  const shows = [1, 2, 3, 4, 5]
  return (
    <>
      {shows.map((show) => (
        <Link key={show} to={`/shows/${show}`}>
          Show {show}
        </Link>
      ))}
    </>
  )
}
