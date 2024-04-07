import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PopupForm } from '../Popup/Popup'

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
    const inputDate = new Date(event.target.value)
    
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
    if( date < new Date()) {
      setErrorMessage("La fecha del show no puede ser previa a la fecha actual")
    }
    else {
      setErrorMessage('')
    }

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
      content={
        <>
          <TextField
            label="Fecha"
            type="date"
            fullWidth
            value={date.toISOString().split('T')[0]}
            onChange={handleInputDateChange}
          />
          <TextField
            label="Hora"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // intervalo de tiempo
            }}
            value={date.getHours() + ':' + date.getMinutes()} // Hora y minutos en el formato HH:mm
            onChange={handleInputTimeChange}
          />
          {errorMessage}
        </>
      }
    />
  )
}
