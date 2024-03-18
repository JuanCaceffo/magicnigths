import { Container } from '@mui/material'
import { Header } from 'src/components/Header/Header'
import { Page } from 'src/pages/Page/Page'

export const Shop = () => {
  return <Page header={<Header />} content={<Container className="main__content">Contenido</Container>} />
}
