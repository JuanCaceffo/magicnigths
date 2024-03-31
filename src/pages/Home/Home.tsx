import { useState } from 'react'
import { Header } from 'src/components/Header/Header'
import { Search } from 'src/components/Search/Search'
import { Page } from 'src/pages/Page/Page'
import CardShow from 'src/components/CardShow/CardShow'
import { Show } from 'src/data/model/Show'

export const Home = () => {
  const [shows, setShows] = useState<Array<Show>>([])

  return (
    <Page
      header={<Header />}
      search={<Search />}
      content={
        <article className="main__content">
          {shows.map((show) => (
            <CardShow
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
