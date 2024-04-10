import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CDate, CDateArgs } from 'src/data/model/CDate'
import { Show } from 'src/data/model/Show'
import './DateTimeModal.scss'

interface DateTimeModalArgs {
  show: Show
  isOpen: boolean
  handleClose: () => void
}

export const DateTimeModal = (args: DateTimeModalArgs) => {
  const { isOpen, handleClose, show } = args

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CDateArgs>()

  const onSubmit: SubmitHandler<CDateArgs> = (data) => {
    // const isoDate = new CDate(data as CDateArgs))

    alert({ data })
  }

  return (
    <Dialog className="date-modal" open={isOpen} onClose={handleClose}>
      <DialogTitle className="date-modal__header centered centered--column">
        <h3 className="text text--xl text--stronger">Agregar Función a</h3>
        <p className="text text--strong centered centered--spaced">
          <span>{`${show.bandName.toUpperCase()}`}</span>
          <span>|</span>
          <span>{`${show.showName}`}</span>
        </p>
      </DialogTitle>
      <DialogContent className="date-modal__content">
        <form
          className="date-modal__form centered centered--column centered--spaced"
          onSubmit={handleSubmit(onSubmit)}
          data-testid="date-form"
        >
          <input
            autoFocus={true}
            {...register('date', {
              required: 'Ingrese una fecha correcta, dd/MM/aaaa',
              validate: (date) => CDate.validateFutureDate(date),
            })}
            className="field field--tall field--rounded field--large shadow--box animated"
            type="date"
          />
          {errors.date && <span className="text text--error">{errors.date.message}</span>}
          <input
            {...register('time', { required: 'Ingrese un horario correcto, hh:mm:ss' })}
            className="field field--tall field--rounded field--large shadow--box animated"
            type="time"
          />
          {errors.time && <span className="text text--error">{errors.time.message}</span>}
          <DialogActions className="date-modal__actions">
            <button
              className="button button--secondary button--tall button--rounded text animated shadow shadow--box"
              onClick={handleClose}
            >
              CANCELAR
            </button>
            <input
              value={'AGREGAR'}
              disabled={!isDirty || !isValid}
              className="button button--primary button--tall button--rounded text text--clear animated shadow shadow--box"
              type="submit"
              data-testid="date-submit"
            />
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}
