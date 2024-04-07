import { Dialog, DialogActions, DialogContent } from '@mui/material'
import './Popup.css'

export const PopupForm = ({
  open,
  title,
  onSave,
  onClose,
  content,
  buttonDisabled = false,
}: {
  open: boolean
  title: string
  onSave: (...args: unknown[]) => void
  onClose: () => void
  content: JSX.Element
  buttonDisabled?: boolean 
}) => {


  const handleSave = () => {
    onSave()
    handleClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <span className="text--stronger">{title}</span>
      <DialogContent className='popup_content'>
        {content}
      </DialogContent>
      <DialogActions>
        <button className="button button__secondary" onClick={handleClose} color="secondary">
          Cancelar
        </button>
        <button className="button" onClick={handleSave} color="primary" disabled={buttonDisabled}>
          Aceptar
        </button>
      </DialogActions>
    </Dialog>
  )
}
