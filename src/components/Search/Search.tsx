import { useForm, SubmitHandler } from 'react-hook-form'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'

export type FilterArgs = {
  bandKeyword: string
  facilityKeyword: string
  withFriends?: boolean
}

interface SearchArgs {
  onSubmit: (data: FilterArgs) => Promise<void>
}

export const Search = (onSubmit: SearchArgs) => {
  const { register, handleSubmit } = useForm<FilterArgs>({
    defaultValues: {
      bandKeyword: '',
      facilityKeyword: '',
      withFriends: false,
    },
  })

  const handleFormSubmit: SubmitHandler<FilterArgs> = async (data) => {
    try {
      await onSubmit.onSubmit(data)
    } catch (error) {
      // ErrorHandler(error as AxiosError, setErrorMsg)
    }
  }

  return (
    <form className="main__search shadow--div" onSubmit={handleSubmit(handleFormSubmit)}>
      <input
        className="field field__rounded field__large shadow--box animated"
        {...register('bandKeyword')}
        placeholder={'Artista'}
      />
      <input
        className="field field__rounded field__large shadow--box animated"
        {...register('facilityKeyword')}
        placeholder={'Lugar'}
      />
      {userSessionStorage.userIsLoged() && (
        <span className="field__container">
          <input className="shadow--box" id="withFriends" type="checkbox" {...register('withFriends')} />{' '}
          <label className="text" htmlFor="withFriends">
            Con amigos
          </label>
        </span>
      )}
      <button className="button button--primary button--small button--rounded animated  shadow--box" type="submit">
        Buscar
      </button>
    </form>
  )
}
