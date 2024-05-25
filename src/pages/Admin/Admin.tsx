import './Admin.scss'
import { useState } from 'react'
import { CardShowAdmin } from 'components/Card/CardShowAdmin/CardShowAdmin'
import { FilterArgs, Search } from 'components/Search/Search'
import { Show } from 'models/Show'
import { ShowStat } from 'models/ShowStats'
import { CDate, CDateArgs } from 'models/CDate'
import { useOnInit } from 'hooks/hooks'
import { Page } from 'pages/Page/Page'
import { showService } from 'services/ShowService'
import { CardDate } from 'components/Card/CardDate/CardDate'
import { Carousel } from 'components/Carousel/Carousel'
import { DateTimeModal } from 'components/Modal/DateTimeModal'
import { SubmitHandler } from 'react-hook-form'
import { CardStats } from 'components/Card/CardStats/CardStats'
import { enqueueSnackbar } from 'notistack'
import { errorHandler } from 'models/helpers/ErrorHandler'
import { AxiosError } from 'axios'

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
      enqueueSnackbar(errorHandler(err as AxiosError), { variant: 'error' })
    }
  }

  const getAllShows = async (filter: FilterArgs) => {
    try {
      const fetchedShows = await showService.getAllShows(filter)
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
      console.error(err)
    }
  }

  const handleShowSelect = (show: Show) => {
    setShow(show)
    getShowStatsById(show.id)
  }

  const cardList = () => {
    return shows.map((card) => (
      <CardShowAdmin
        onSelect={() => handleShowSelect(card)}
        key={card.id}
        show={card}
        isSelected={card.id === show!.id}
      />
    ))
  }

  const dateList = () => {
    return show
      ? show.dates.map((showDate) => (
        <CardDate
          key={showDate.date.toDateString()}
          isDisable={showDate.date < new Date()}
          showDate={showDate}
          className="static"
        />
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
              <Carousel elements={dateList()} maxElements={5} />
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
                <CardStats title={'Ventas'} info={`$ ${parseFloat(stats[0].value.toFixed(2))}`} color={stats[0].color} />
                <CardStats title={'En Espera'} info={`${stats[1].value} Personas`} color={stats[1].color} />
                <CardStats title={'Rentabilidad'} info={`${parseFloat(stats[2].value.toFixed(2))} %`} color={stats[2].color} />
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
