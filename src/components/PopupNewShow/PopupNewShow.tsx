import React, { useEffect, useState } from 'react'
import { PopupForm } from '../Popup/Popup'
import moment from 'moment'
import './PopupNewShow.css'

export const PopupNewShow = ({
  open,
  onSave,
  onClose,
  show: { band, showName },
}: {
  open: boolean
  onSave: (date: Date) => void
  onClose: () => void
  show: {
    band: string
    showName: string
  }
}) => {
  const [date, setDate] = useState<Date>(new Date())
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = event.target.value.split('-').map(Number)
    const inputDate = new Date(year, month - 1, day)

    setDate((prevDate: Date) => {
      const newDate = new Date(prevDate)
      newDate.setFullYear(inputDate.getFullYear())
      newDate.setMonth(inputDate.getMonth())
      newDate.setDate(inputDate.getDate())

      return newDate
    })
  }

  const handleInputTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = event.target.value

    setDate((prevDate: Date) => {
      const newDate = new Date(prevDate)
      const [hours, minutes] = inputTime.split(':').map(Number) // Horas y minutos del input
      newDate.setHours(hours)
      newDate.setMinutes(minutes)

      return newDate
    })
  }

  useEffect(() => {
    if (date < new Date()) {
      setErrorMessage('La fecha del show no puede ser previa a la fecha actual')
    } else {
      setErrorMessage('')
    }
  }, [date])

  const handleSave = () => {
    onSave(date)
    handleClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <PopupForm
      open={open}
      title={`Agregar función a ${band} - ${showName}`}
      onSave={handleSave}
      onClose={handleClose}
      buttonDisabled={date < new Date()}
      content={
        <>
          <div className="input_new_show_container">
            <input
              className="field field--rounded field--large text shadow"
              type="date"
              min={moment(new Date()).format('YYYY-MM-DD')}
              value={moment(date).format('YYYY-MM-DD')}
              onChange={handleInputDateChange}
            />

            <input
              className="field field--rounded field--large text shadow"
              type="time"
              value={`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`} // Hora y minutos en el formato HH:mm
              onChange={handleInputTimeChange}
            />
          </div>

          {errorMessage}
        </>
      }
    />
  )
}
