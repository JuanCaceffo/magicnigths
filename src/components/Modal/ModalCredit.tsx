import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import './Modal.scss'
import { useForm } from 'react-hook-form'

type ModalCreditProps = {
  isOpen: boolean
  handleClose: () => void
  onSubmit: (data: creditValue) => void
  errorMessage: string | null
}

export interface creditValue {
  credit: number
}

export const ModalCredit = (props: ModalCreditProps) => {
  const { isOpen, handleClose, onSubmit } = props

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<creditValue>()

  const validateNegativeInput = (number: number): boolean | string =>
    number < 0 ? `El crédito ingresado debe ser positivo` : true

  return (
    <>
      <Dialog className="modal" open={isOpen} onClose={handleClose}>
        <DialogTitle className="modal__header centered centered--column">
          <h3 className="text text--xl text--stronger">Agregar Crédito</h3>
        </DialogTitle>
        <DialogContent className="modal__content">
          <form
            className="modal__form centered centered--column centered--spaced"
            onSubmit={handleSubmit(onSubmit)}
            data-testid="credit-form"
          >
            <input
              autoFocus={true}
              {...register('credit', {
                required: 'Ingrese el monto',
                validate: (credit) => validateNegativeInput(credit),
              })}
              className="field field--tall field--rounded field--large shadow--box animated"
              type="number"
            />
            {errors.credit && <span className="text text--error">{errors.credit.message}</span>}
            <DialogActions className="modal__actions">
              <button
                className="button button--secondary button--tall button--rounded text animated shadow shadow--box"
                onClick={handleClose}
              >
                CANCELAR
              </button>
              <input
                value={'AGREGAR'}
                disabled={isSubmitting}
                className="button button--primary button--tall button--rounded text text--clear animated shadow shadow--box"
                type="submit"
                data-testid="credit-submit"
              />
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

    </>)
}
