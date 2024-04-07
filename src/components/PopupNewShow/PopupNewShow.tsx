import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PopupForm } from '../Popup/Popup'
import { format } from 'date-fns'
import moment from 'moment'

export const PopupNewShow = ({
  open,
  onSave,
  onClose,
}: {
  open: boolean
  onSave: (date: Date) => void
  onClose: () => void
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

      //   console.log(newDate)
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

      console.log(newDate)
      return newDate
    })
  }

  useEffect(() => {
    if( date < new Date()) {
      setErrorMessage("La fecha del show no puede ser previa a la fecha actual")
    }
    else {
      setErrorMessage('')
    }

    console.log(date)

  }, [date]) 

  const handleSave = () => {
    onSave(date)
    console.log(date)
    handleClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <PopupForm
      open={open}
      title="Agregar función a {band} - {showName}"
      onSave={handleSave}
      onClose={handleClose}
      buttonDisabled={date<new Date()}
      content={
        <>
          <TextField
            label="Fecha"
            type="date"
            fullWidth
            value={moment(date).format('YYYY-MM-DD')}
            onChange={handleInputDateChange}
          />
          <TextField
            label="Hora"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })} // Hora y minutos en el formato HH:mm
            onChange={handleInputTimeChange}
          />
          {errorMessage}
        </>
      }
    />
  )
}
