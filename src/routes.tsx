import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Home } from 'src/pages/Home/Home'
import { Admin } from 'src/pages/Admin/Admin'
import { Login } from 'src/pages/Login/Login'
import { Profile } from 'src/pages/Profile/Profile'
import { Shop } from 'src/pages/Shop/Shop'
import { NotFoundPage } from 'src/pages/NotFound/NotFound'
import { Page } from 'src/pages/Page/Page'
import { Header } from 'src/components/Header/Header'
import { ShowDetails } from 'src/components/ShowDetails/ShowDetails'
import { userSessionStorage } from './data/helpers/userSessionStorage' // Asumiendo que este es el nombre del archivo donde se encuentra userSessionStorage

const PrivateRoute = ({ element, path }: { element: JSX.Element, path: string }) => {
  return userSessionStorage.userIsLoged() ? (
    <Page content={element} />
  ) : (
    <Navigate to="/login" replace />
  )
}

const AdminRoute = ({ element }: { element: JSX.Element }) => {
  return userSessionStorage.userIsAdmin() ? (
    <Page content={element} />
  ) : (
    <Navigate to="/" replace />
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Page content={<Home />} />,
  },
  {
    path: '/show/:id',
    element: <Page header={<Header />} content={<ShowDetails />} />,
  },
  {
    path: '/admin_dashboard',
    element: <AdminRoute element={<Admin />} />,
  },
  {
    path: '/login',
    element: <Page content={<Login />} />,
  },
  {
    path: '/user_profile',
    element: <PrivateRoute path="/user_profile" element={<Profile />} />,
  },
  {
    path: '/shop',
    element: <PrivateRoute path="/shop" element={<Shop />} />,
  },
  {
    path: '*',
    element: <Page content={<NotFoundPage />} />,
  },
])
