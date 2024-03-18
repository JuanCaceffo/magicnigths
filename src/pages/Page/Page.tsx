import { Container } from '@mui/material'

interface PageProps {
  header?: React.ReactNode
  search?: React.ReactNode
  content: React.ReactNode
}

export const Page = ({ header, search, content }: PageProps) => {
  return (
    <Container className={`main ${search ? 'main--search' : header ? 'main--header' : ''}`}>
      {header}
      {search}
      {content}
      <Container className="main__footer">Footer</Container>
    </Container>
  )
}
