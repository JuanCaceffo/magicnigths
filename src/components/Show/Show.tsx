import { useParams } from 'react-router-dom'

export const Show = () => {
  const params = useParams<{ showId: string }>()
  return <h1>Show number: {params.showId}</h1>
}
