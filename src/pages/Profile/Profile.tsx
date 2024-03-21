import { Container } from '@mui/material'
import { Header } from 'src/components/Header/Header'
import { Page } from 'src/pages/Page/Page'

export const Profile = () => {
  return <Page header={<Header />} content={<Container className="main__content">Contenido User Profile</Container>} />
}
