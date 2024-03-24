import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  artist: string
  location: string
  withFriends: boolean
}

export const Search = () => {
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <form className="main__search shadow--large" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="field field__rounded field__large text shadow--item"
        {...register('artist')}
        placeholder={'Artista'}
      />
      <input
        className="field field__rounded field__large text shadow--item"
        {...register('location')}
        placeholder={'Lugar'}
      />
      <span className="field__container">
        <input className="shadow--item" id="withFriends" type="checkbox" {...register('withFriends')} />{' '}
        <label className="text" htmlFor="withFriends">
          Con amigos
        </label>
      </span>
      <button className="button button__secondary button__small text shadow--item" type="submit">
        Buscar
      </button>
    </form>
  )
}
