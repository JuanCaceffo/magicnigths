import { useLocation } from 'react-router-dom'
import { Footer } from 'components/Footer/Footer'
import { Header } from 'components/Header/Header'

interface PageProps {
  search?: React.ReactNode
  content: React.ReactNode
}

export const Page = ({ search, content }: PageProps) => {
  const location = useLocation()

  const inLoginPage = () => location.pathname == '/login'

  return (
    <main className={`main ${search ? 'main--search' : !inLoginPage() ? 'main--header' : ''}`}>
      {!inLoginPage() && <Header />}
      {search}
      {content}
      <Footer />
    </main>
  )
}
