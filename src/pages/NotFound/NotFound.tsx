import { Container } from '@mui/material'
import { ErrorPage } from 'src/components/ErrorPage/ErrorPage'
import { Page } from 'src/pages/Page/Page'

export const NotFoundPage = () => {
  return (
    <Page
      content={
        <Container className="main__content">
          <ErrorPage />
        </Container>
      }
    />
  )
}
