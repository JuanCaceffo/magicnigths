import { Header } from 'src/components/Header/Header'
import { Search } from 'src/components/Search/Search'
import { Page } from 'src/pages/Page/Page'

export const Home = () => {
  return <Page header={<Header />} search={<Search />} content={<article className="main__content"></article>} />
}
