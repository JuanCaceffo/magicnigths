import './Home.scss'
import { useState } from 'react'
import { FilterArgs, Search } from 'components/Search/Search'
import { Page } from 'pages/Page/Page'
import { CardShow } from 'components/Card/CardShow/CardShow'
import { Show } from 'models/Show'
import { showService } from 'services/ShowService'
import { useNavigate } from 'react-router-dom'
import { useOnInit } from 'hooks/hooks'

export const Home = () => {
  const [shows, setShows] = useState<Array<Show>>([])
  const navigate = useNavigate()

  const getAllShows = async (filter: FilterArgs) => {
    try {
      await showService.getAllShows(filter).then((value) => {
        setShows(value)
      })
    } catch (error) {
      // ErrorHandler(error as AxiosError, setErrorMsg)
    }
  }

  useOnInit(() => getAllShows({} as FilterArgs))

  const handleClick = (id: number) => {
    navigate(`/show/${id}`)
  }

  return (
    <Page
      search={<Search onSubmit={getAllShows} />}
      content={
        <article className="main__content main__content--grid">
          {shows.map((show) => (
            <CardShow
              key={show.id}
              show={show}
              button={{
                content: 'comprar',
                onClick: handleClick,
              }}
            ></CardShow>
          ))}
        </article>
      }
    />
  )
}
