import { Container } from '@mui/material'
import { Header } from 'src/components/Header/Header'
import { Page } from 'src/pages/Page/Page'

export const Admin = () => {
  return (
    <Page header={<Header />} content={<Container className="main__content">Contenido Admin Dashboard</Container>} />
  )
}
