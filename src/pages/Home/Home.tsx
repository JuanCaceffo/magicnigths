import { useEffect, useState } from 'react'
import { Header } from 'src/components/Header/Header'
import { Search } from 'src/components/Search/Search'
import { Page } from 'src/pages/Page/Page'
import CardShow from 'src/components/CardShow/CardShow'
import { Show } from 'src/data/model/Show'
import { showService } from 'src/services/ShowService'
import './Home.scss'

export const Home = () => {
  const [shows, setShows] = useState<Array<Show>>([])

  useEffect(() => {
    const fechShows = async () => {
      showService.getShows().then((value) => {
        setShows(value)
      })
    }
    fechShows()
  }, [])

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
                  console.log('hola')
                },
              }}
            ></CardShow>
          ))}
        </article>
      }
    />
  )
}
