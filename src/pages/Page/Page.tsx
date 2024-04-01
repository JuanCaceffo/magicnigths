import { Footer } from 'src/components/Footer/Footer'

interface PageProps {
  header?: React.ReactNode
  search?: React.ReactNode
  content: React.ReactNode
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
