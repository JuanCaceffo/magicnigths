import { DialogContent, TextField, Rating, Dialog, DialogActions } from '@mui/material'
import React, { useState } from 'react'
import './PopupComment.css'

export const PopupComment = ({
  open,
  onSave,
  onClose,
}: {
  open: boolean
  onSave: (comment: string, rating: number) => void
  onClose: () => void
}) => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState<number | null>(0) // Inicializar la valoración en 0

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handleRatingChange = (newRating: number | null) => {
    setRating(newRating)
  }

  const handleSave = () => {
    onSave(comment, rating || 0) // Llama a la función onSave con el comentario ingresado y la valoración
    setComment('') // Limpia el campo de entrada después de guardar el comentario
    setRating(0) // Reinicia la valoración a 0
  }

  const handleClose = () => {
    onClose() // Llama a la función onClose para cerrar el popup
    setComment('') // Limpia el campo de entrada al cerrar el popup
    setRating(0) // Reinicia la valoración a 0
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <p className="subtitle2">Calificar artista</p>
      <DialogContent>
        <div className="rating_container">
          <p className="rating">Valoración</p>
          <Rating name="rating" value={rating} onChange={(_event, value) => handleRatingChange(value)} />
        </div>
        <TextField
          autoFocus
          label="Comentario"
          type="text"
          fullWidth
          multiline
          value={comment}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <button
          className="button button--secondary button--rounded text--strong text--spaced animated shadow--box"
          onClick={handleClose}
          color="secondary"
        >
          Cancelar
        </button>
        <button
          className="button button--primary button--rounded text--strong animated text--spaced"
          onClick={handleSave}
          color="primary"
        >
          Guardar
        </button>
      </DialogActions>
    </Dialog>
  )
}
