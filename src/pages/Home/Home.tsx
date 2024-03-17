// import { Link } from 'react-router-dom'
import { ShowDetails } from 'src/components/ShowDetails/ShowDetails'

export const Home = () => {
  // const shows = [1, 2, 3, 4, 5]
  return (
    <>
      {/* {shows.map((show) => (
        <Link key={show} to={`/shows/${show}`}>
          Show {show}
        </Link>
      ))} */}
      <ShowDetails />
    </>
  )
}

