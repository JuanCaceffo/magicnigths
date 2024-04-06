import { useState } from 'react'
import { Header } from 'src/components/Header/Header'
import { FilterArgs } from 'src/components/Search/Search'
import { Show } from 'src/data/model/Show'
import { useOnInit } from 'src/hooks/hooks'
import { Page } from 'src/pages/Page/Page'
import { showService } from 'src/services/ShowService'

export const Admin = () => {
  const [shows, setShows] = useState<Array<Show>>([])

  const getAllShows = async (filter: FilterArgs) => {
    try {
      await showService.getShows(filter).then((value) => {
        setShows(value)
      })
    } catch (error) {
      // ErrorHandler(error as AxiosError, setErrorMsg)
    }
  }

  useOnInit(() => getAllShows({} as FilterArgs))

  return (
    <Page
      header={<Header />}
      content={<main className="main__content">Contenido Admin Dashboard</main>}

    />)
}
