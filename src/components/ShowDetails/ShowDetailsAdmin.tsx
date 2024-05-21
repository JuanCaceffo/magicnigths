import { DateTimeModal } from '../Modal/DateTimeModal'
import { SubmitHandler } from 'react-hook-form'
import { CDate, CDateArgs } from 'models/CDate'
import { Show } from 'models/Show'
import { showService } from 'services/ShowService'
import { useState } from 'react'
interface ShowDetailsBaseArgs {
  show: Show
}

export const ShowDetailsAdmin = (args: ShowDetailsBaseArgs) => {
  const { show } = args
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const onSubmit: SubmitHandler<CDateArgs> = async (data) => {
    const date = new CDate(data).toDate
    try {
      show && (await showService.addShowDate(show, date))
      setModalIsOpen(false)
    } catch (err) {
      // handle error
      TODO: console.error(err)
    }
  }

  return (
    <>
      <ul className="show-details__body-info">
        {show.adminSummary.map((summary, index) => (
          <li key={index} className="show-details__text text--unlisted">
            <span className="text text--md text--stronger ">{summary.title}: </span>
            <span className="text text--md">{summary.value}</span>
          </li>
        ))}
      </ul>
      <div className="show-details__bottom">
        <button
          className="button button--primary button--rounded button--tall button--large animated shadow--box text--strong text--spaced"
          onClick={() => setModalIsOpen(true)}
        >
          AGREGAR FECHA
        </button>
      </div>
      {modalIsOpen && show && (
        <DateTimeModal isOpen={modalIsOpen} handleClose={() => setModalIsOpen(false)} show={show} onSubmit={onSubmit} />
      )}
    </>
  )
}
