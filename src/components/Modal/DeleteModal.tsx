import { Dialog, DialogActions, DialogTitle } from '@mui/material'
import './Modal.scss'

type ModalDelete = {
  isOpen: boolean
  handleClose: () => void
  onSubmit: () => void
  elementName?: string
  errorMessage?: string
}

export const ModalDelete = (props: ModalDelete) => {
  const { isOpen, handleClose, onSubmit, elementName } = props

  const title = elementName ? `Confirmar Eliminación de ${elementName}` : 'Confirmar Eliminación'

  return (
    <>
      <Dialog className="modal" open={isOpen} onClose={handleClose}>
        <DialogTitle className="modal__header centered centered--column">
          <h3 className="text text--xl text--stronger">{title}</h3>
        </DialogTitle>
        <DialogActions className="modal__actions">
          <button
            className="button button--secondary button--tall button--rounded animated shadow shadow--box"
            onClick={handleClose}
          >
            Cancelar
          </button>
          <button
            className="button button--primary button--tall button--rounded animated shadow shadow--box"
            onClick={onSubmit}
          >
            Eliminar
          </button>
        </DialogActions>
      </Dialog>
    </>
  )
}
