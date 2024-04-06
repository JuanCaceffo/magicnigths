import { Dialog, DialogActions, DialogContent, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../styles/button.scss'
import '../../styles/typography.scss'
import './PopupCredit.css'

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
    if(parseFloat(event.target.value) < 0) {
      setErrorMessage("El valor no puede ser negativo") 
    }
    else {
      setErrorMessage('')
    }
    setCredit(event.target.value)
    
  }

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevenir la acción predeterminada del formulario
    onSave(parseFloat(credit))
    handleClose()
  }

  const handleClose = () => {
    onClose()
    setCredit('')
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSave}>
        <p className="subtitle2">Agregar crédito</p>
        <DialogContent>
          <TextField
            label="Agregar crédito"
            type="number"
            fullWidth
            InputProps={{ 
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              inputProps: { min: 0, step: 1 },
            }}
            value={credit.replace(/^0+/, "")} // Ignora el cero inicial y los ceros a la izquierda
            onChange={handleInputChange}
          />
          {errorMessage && errorMessage}
        </DialogContent>
        <DialogActions>
          <button type="button" className="button button__secondary" onClick={handleClose} color="secondary">
        Cancelar
          </button>
          <button type="submit" className="button" color="primary" disabled={parseFloat(credit) <= 0 || !credit.trim()}>
        Guardar
          </button>
        </DialogActions>
      </form>
    </Dialog>

  )
}
