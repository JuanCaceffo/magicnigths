import { useState } from 'react'
import { CardShowAdmin } from 'src/components/Card/CardShowAdmin/CardShowAdmin'
import { Header } from 'src/components/Header/Header'
import { FilterArgs } from 'src/components/Search/Search'
import { Show } from 'src/data/model/Show'
import { useOnInit } from 'src/hooks/hooks'
import { Page } from 'src/pages/Page/Page'
import { showService } from 'src/services/ShowService'
import './Admin.scss'
import CardDate from 'src/components/Card/CardDate/CardDate'
import { Carousel } from 'src/components/Carousel/Carousel'

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
      setTimeout(async () => {
        await showService.getShowById(showId).then((value) => {
          setShow(value)
        })
      }, 500)
    } catch (err) {
      console.log(err)
    }
  }

  const cardList = () => {
    return shows.map((show) => <CardShowAdmin key={show.id} show={show} />)
  }

  const dateList = () => {
    return show
      ? show.dates.map((date) => (
          <CardDate key={date.toDateString()} isDisable={date < new Date()} date={date} className="static" />
        ))
      : []
  }

  useOnInit(async () => await getAllShows({} as FilterArgs))

  return (
    <Page
      header={<Header />}
      content={
        <article className="admin main__content">
          <section className="admin__shows">{cardList()}</section>
          <section className="admin__dates">
            <Carousel elements={dateList()} maxElements={1} />
          </section>
          <section className="admin__stats"></section>
        </article>
      }
    />
  )
}
