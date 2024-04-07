import { Navigate } from 'react-router'
import { Footer } from 'src/components/Footer/Footer'

interface PageProps {
  header?: React.ReactNode
  search?: React.ReactNode
  content: React.ReactNode
}

interface PrivatePageProps extends PageProps {
  condition: boolean
  redirectRoute: string
}

export const Page = ({ header, search, content }: PageProps) => {
  return (
    <main className={`main ${search ? 'main--search' : header ? 'main--header' : ''}`}>
      {header}
      {search}
      {content}
      <Footer />
    </main>
  )
}

export const PrivatePage = ({ header, search, content, condition, redirectRoute }: PrivatePageProps) => {
  return condition ? (
    <Page header={header} search = {search} content={content} />
  ) : (
    <Navigate to={redirectRoute} replace />
  )
}
