import { useState } from 'react'
import { CardShowAdmin } from 'src/components/Card/CardShowAdmin/CardShowAdmin'
import { Header } from 'src/components/Header/Header'
import { FilterArgs } from 'src/components/Search/Search'
import { Show } from 'src/data/model/Show'
import { useOnInit } from 'src/hooks/hooks'
import { Page } from 'src/pages/Page/Page'
import { showService } from 'src/services/ShowService'
import "./Admin.scss"
import CardDate from 'src/components/Card/CardDate/CardDate'

export const Admin = () => {
  const [shows, setShows] = useState<Array<Show>>([])
  const [show, setShow] = useState<Show>()

  const getAllShows = async (filter: FilterArgs) => {
    try {
      const fetchedShows = await showService.getShows(filter)
      setShows(fetchedShows)
      await getShowById(fetchedShows[0].id)
    } catch (error) {
      // ErrorHandler(error as AxiosError, setErrorMsg)
    }
  }

  const getShowById = async (showId: number) => {
    try {
      await showService.getShowById(showId).then((value) => {
        setShow(value)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useOnInit(async () => await getAllShows({} as FilterArgs))

  return (
    <Page
      header={<Header />}
      content={
        <article className='admin main__content'>
          <section className='admin__shows'>
            {shows.map((show) =>
              <CardShowAdmin
                key={show.id}
                show={show}
              />
            )}
          </section>
          <section className='admin__dates'>
            {show && show.dates.map((date) => (
              <CardDate
                key={date.toDateString()}
                isDisable={date < new Date()}
                date={date}
                className="static"
              />
            ))}
          </section>
          <section className='admin__stats'>

          </section>
        </article>
      }
    />)
}
