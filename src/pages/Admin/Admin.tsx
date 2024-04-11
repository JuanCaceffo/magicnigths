import { useState } from 'react'
import { CardShowAdmin } from 'src/components/Card/CardShowAdmin/CardShowAdmin'
import { FilterArgs } from 'src/components/Search/Search'
import { Show } from 'src/data/model/Show'
import { useOnInit } from 'src/hooks/hooks'
import { Page } from 'src/pages/Page/Page'
import { showService } from 'src/services/ShowService'
import './Admin.scss'
import CardDate from 'src/components/Card/CardDate/CardDate'
import { Carousel } from 'src/components/Carousel/Carousel'
import { DateTimeModal } from 'src/components/Modal/DateTimeModal'
import { ShowStats } from 'src/data/model/ShowStats'
import { CardStats } from 'src/components/Card/CardStats/CardStats'
import { getColorForPending, getColorForRentability, getColorForSales, getColorForSoldOut } from 'src/data/helpers/getStatColor'

export const Admin = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [shows, setShows] = useState<Array<Show>>([])
  const [show, setShow] = useState<Show>()
  const [stats, setStats] = useState<ShowStats>()

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const getAllShows = async (filter: FilterArgs) => {
    try {
      const fetchedShows = await showService.getAdminShows(filter)
      setShows(fetchedShows)
      setShow(fetchedShows[9])
      await getShowStatsById(fetchedShows[9].id)
    } catch (error) {
      // ErrorHandler(error as AxiosError, setErrorMsg)
    }
  }

  const getShowStatsById = async (showId: number) => {
    try {
      await showService.getShowStatsById(showId).then((value) => {
        setStats(value)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleShowSelect = (show: Show) => {
    setShow(show)
    getShowStatsById(show.id)
  }

  const handleAddDate = () => {
    openModal()
    // try {
    //   !show?.id
    //     ? new Error('Hubo un problema con el show')
    //     : userSessionStorage.getUserId() < 0
    //       ? new Error('No existe un usuario logeado')
    //       : showService.addShowDate(show.id, userSessionStorage.getUserId(), new Date())
    // } catch (err) {
    //   console.log(err)
    // }
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

  useOnInit(async () => await getAllShows({} as FilterArgs))

  return (
    <Page
      content={
        <article className="main__content admin">
          <section className="admin__shows">{cardList()}</section>
          <section className="admin__dates">
            <span className="admin__date-item centered" /> {/*wrapper item no borrar*/}
            <span className="admin__date-center-item flex">
              <Carousel elements={dateList()} maxElements={3} />
            </span>
            <span className="admin__date-item centered">
              <a className="button button--primary button--circle shadow--box animated" onClick={handleAddDate}>
                +
              </a>
            </span>
          </section>
          <section className="admin__stats">
            {stats && show &&
              <section className='admin__stats'>
                <CardStats title="Ventas" info={`$ ${stats.totalSales}`} color={getColorForSales(stats.totalSales)} />
                <CardStats title="Personas en espera" info={`${stats.pendingAttendees}`} color={getColorForPending(stats.pendingAttendees, Math.min(...show.prices), stats.baseCost)} />
                <CardStats title="Rentabilidad" info={`${stats.rentability} %`} color={getColorForRentability(stats.rentability)} />
                <CardStats title="Funciones Sold-Out" info={`${stats.soldOutDates}`} color={getColorForSoldOut(stats.soldOutDates, show?.dates.length)} />
              </section>}
          </section>
          {modalIsOpen && show && <DateTimeModal isOpen={modalIsOpen} handleClose={closeModal} show={show} />}
        </article>
      }
    />
  )
}
