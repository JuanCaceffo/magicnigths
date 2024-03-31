import { ErrorPage } from 'src/components/ErrorPage/ErrorPage'
import { Page } from 'src/pages/Page/Page'

export const NotFoundPage = () => {
  return (
    <Page
      content={
        <main className="main__content">
          <ErrorPage />
        </main>
      }
    />
  )
}
