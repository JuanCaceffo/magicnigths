import { useState } from 'react'
import { CardShowAdmin } from 'src/components/Card/CardShowAdmin/CardShowAdmin'
import { FilterArgs, Search } from 'src/components/Search/Search'
import { Show } from 'src/data/model/Show'
import { useOnInit } from 'src/hooks/hooks'
import { Page } from 'src/pages/Page/Page'
import { showService } from 'src/services/ShowService'
import './Admin.scss'
import CardDate from 'src/components/Card/CardDate/CardDate'
import { Carousel } from 'src/components/Carousel/Carousel'
import { DateTimeModal } from 'src/components/Modal/DateTimeModal'
import { SubmitHandler } from 'react-hook-form'
import { CDate, CDateArgs } from 'src/data/model/CDate'
import { CardStats } from 'src/components/Card/CardStats/CardStats'
import { ShowStat } from 'src/data/model/ShowStats'

export const Admin = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [shows, setShows] = useState<Show[]>([])
  const [show, setShow] = useState<Show>()
  const [stats, setStats] = useState<ShowStat[]>([])

  const onSubmit: SubmitHandler<CDateArgs> = async (data) => {
    const date = new CDate(data).toDate
    try {
      show && (await showService.addShowDate(show, date))
      getAllShows({} as FilterArgs)
      setModalIsOpen(false)
    } catch (err) {
      // handle error
      TODO: console.error(err)
    }
  }

  const getAllShows = async (filter: FilterArgs) => {
    try {
      const fetchedShows = await showService.getAdminShows(filter)
      setShows(fetchedShows)
      setShow(fetchedShows[0])
      await getShowStatsById(fetchedShows[0].id)
    } catch (error) {
      // ErrorHandler(error as AxiosError, setErrorMsg)
    }
  }

  const getShowStatsById = async (showId: number) => {
    try {
      await showService.getShowStatsById(showId).then((value) => {
        setStats([...value])
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleShowSelect = (show: Show) => {
    setShow(show)
    getShowStatsById(show.id)
  }

  const cardList = () => {
    return shows.map((show) => <CardShowAdmin onSelect={() => handleShowSelect(show)} key={show.id} show={show} />)
  }

  const dateList = () => {
    return show
      ? show.dates.map((date) => (
          <CardDate key={date.toDateString()} isDisable={date < new Date()} date={date} className="static" />
        ))
      : []
  }

  useOnInit(async () => {
    await getAllShows({} as FilterArgs)
  })

  return (
    <Page
      search={<Search onSubmit={getAllShows} />}
      content={
        <article className="main__content admin">
          <section className="admin__shows">{cardList()}</section>
          <section className="admin__dates">
            <span className="admin__date-item centered" /> {/*wrapper item no borrar*/}
            <span className="admin__date-center-item flex">
              <Carousel elements={dateList()} maxElements={3} />
            </span>
            <span className="admin__date-item centered">
              <a
                className="button button--primary button--circle shadow--box animated"
                onClick={() => setModalIsOpen(true)}
              >
                +
              </a>
            </span>
          </section>
          <section className="admin__stats">
            {stats && stats.length > 0 && (
              <section className="admin__stats">
                <CardStats title={'Ventas'} info={`$ ${stats[0]['value']}`} color={stats[0]['color']} />
                <CardStats title={'En Espera'} info={`${stats[1].value} Personas`} color={stats[1].color} />
                <CardStats title={'Rentabilidad'} info={`${stats[2].value} %`} color={stats[2].color} />
                <CardStats title={'Sold-Out'} info={`${stats[3].value} Funciones`} color={stats[3].color} />
              </section>
            )}
          </section>
          {modalIsOpen && show && (
            <DateTimeModal
              isOpen={modalIsOpen}
              handleClose={() => setModalIsOpen(false)}
              show={show}
              onSubmit={onSubmit}
            />
          )}
        </article>
      }
    />
  )
}
