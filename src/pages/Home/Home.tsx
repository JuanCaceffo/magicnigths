import { useEffect, useState } from 'react'
import { Header } from 'src/components/Header/Header'
import { Search } from 'src/components/Search/Search'
import { Page } from 'src/pages/Page/Page'
import CardShow from 'src/components/CardShow/CardShow'
import { Show } from 'src/data/model/Show'
import { showService } from 'src/services/ShowService'
import './Home.scss'
import { getUserId } from 'src/data/helpers/userSessionStorage'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const [shows, setShows] = useState<Array<Show>>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fechShows = async () => {
      showService.getShows().then((value) => {
        setShows(value)
      })
    }
    fechShows()
  }, [])

  const handleClick = (showId: number) => {
    const userId = getUserId()
    userId >= 0 ? navigate(`/show/${showId}`, { state: { showId: showId } }) : navigate('login')
  }

  return (
    <Page
      header={<Header />}
      search={<Search />}
      content={
        <article className="main__content">
          {shows.map((show) => (
            <CardShow
              key={show.props.id}
              show={show}
              button={{
                content: 'comprar',
                whenclick: () => {
                  handleClick(show.props.id)
                },
              }}
            ></CardShow>
          ))}
        </article>
      }
    />
  )
}
