import { useState } from 'react'
import { Header } from 'src/components/Header/Header'
import { FilterArgs, Search } from 'src/components/Search/Search'
import { Page } from 'src/pages/Page/Page'
import CardShow from 'src/components/Card/CardShow/CardShow'
import { Show } from 'src/data/model/Show'
import { showService } from 'src/services/ShowService'
import './Home.scss'
import { useNavigate } from 'react-router-dom'
import { useOnInit } from 'src/hooks/hooks'

export const Home = () => {
  const [shows, setShows] = useState<Array<Show>>([])
  const navigate = useNavigate()

  const onSubmit = async (filter: FilterArgs) => {
    try {
      await showService.getShows(filter).then((value) => {
        setShows(value)
      })
    } catch (error) {
      // ErrorHandler(error as AxiosError, setErrorMsg)
    }
  }

  useOnInit(() => onSubmit({} as FilterArgs))

  const handleClick = (showId: number) => {
    navigate(`/show/${showId}`, { state: { showId: showId } })
  }

  return (
    <Page
      header={<Header />}
      search={<Search onSubmit={onSubmit} />}
      content={
        <article className="main__content main__content--grid">
          {shows.map((show) => (
            <CardShow
              key={show.id}
              show={show}
              button={{
                content: 'comprar',
                whenclick: () => {
                  handleClick(show.id)
                },
              }}
            ></CardShow>
          ))}
        </article>
      }
    />
  )
}
