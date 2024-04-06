import { InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './PopupCredit.css'
import { PopupForm } from '../Popup/Popup'

export const PopupCredit = ({
  open,
  onSave,
  onClose,
}: {
  open: boolean
  onSave: (credit: number) => void
  onClose: () => void
}) => {
  const [credit, setCredit] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Se maneja como un string para poder eliminar los ceros a la izquierda
    setCredit(credit.toString())
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseFloat(event.target.value) < 0) {
      setErrorMessage('El valor no puede ser negativo')
    } else {
      setErrorMessage('')
    }
    setCredit(event.target.value)
  }

  const handleSave = () => {
    onSave(parseFloat(credit))
    handleClose()
  }

  const handleClose = () => {
    onClose()
    setCredit('')
  }

  return (
    <PopupForm
      open={open}
      title="Agregar crédito"
      onSave={handleSave}
      onClose={handleClose}
      buttonDisabled = {parseFloat(credit) <= 0 || !credit.trim()}
      content={
        <>
          <TextField
            label="Agregar crédito"
            type="number"
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              inputProps: { min: 0, step: 1 },
            }}
            value={credit.replace(/^0+/, '')} // Ignora el cero inicial y los ceros a la izquierda
            onChange={handleInputChange}
          />
          {errorMessage}
        </>
      }
    />
  )
}
