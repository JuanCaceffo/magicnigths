import { createBrowserRouter } from 'react-router-dom'
import { Home } from 'src/pages/Home/Home'
import { Admin } from 'src/pages/Admin/Admin'
import { Login } from 'src/pages/Login/Login'
import { Profile } from 'src/pages/Profile/Profile'
import { Shop } from 'src/pages/Shop/Shop'
import { NotFoundPage } from 'src/pages/NotFound/NotFound'
import { Page, PrivatePage } from 'src/pages/Page/Page'
import { Header } from 'src/components/Header/Header'
import { ShowDetails } from 'src/components/ShowDetails/ShowDetails'
import { userSessionStorage } from './data/helpers/userSessionStorage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/show/:id',
    element: <Page header={<Header />} content={<ShowDetails />} />,
  },
  {
    path: '/admin_dashboard',
    element: <PrivatePage content={<Admin />} condition={userSessionStorage.userIsAdmin()} redirectRoute='/'/>,
  },
  {
    path: '/login',
    element: <Page content={<Login />} />,
  },
  {
    path: '/user_profile',
    element: <PrivatePage content={<Profile />} condition={userSessionStorage.userIsLoged()} redirectRoute='/login'/>,
  },
  {
    path: '/shop',
    element: <PrivatePage content={<Shop />} condition={userSessionStorage.userIsLoged()} redirectRoute='/login'/>,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
