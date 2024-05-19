import { createBrowserRouter } from 'react-router-dom'
import { Home } from 'pages/Home/Home'
import { Admin } from 'pages/Admin/Admin'
import { Login } from 'pages/Login/Login'
import { Profile } from 'pages/Profile/Profile'
import { Shop } from 'pages/Shop/Shop'
import { NotFoundPage } from 'pages/NotFound/NotFound'
import { Page } from 'pages/Page/Page'
import { ShowDetails } from 'components/ShowDetails/ShowDetails'
import { ProtectedRouter } from 'components/RequireAuth/RequireAuth'

//TODO: refactorizar page por anidamiento de ruta
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/show/:id',
    element: <Page content={<ShowDetails />} />,
  },
  {
    path: '/admin_dashboard',
    element: (
      <ProtectedRouter>
        <Admin />
      </ProtectedRouter>
    ),
  },
  {
    path: '/admin_dashboard/show/:id',
    element: (
      <ProtectedRouter>
        <Page content={<ShowDetails />} />
      </ProtectedRouter>
    ),
  },
  {
    path: '/login',
    element: <Page content={<Login />} />,
  },
  {
    path: '/user_profile',
    element: (
      <ProtectedRouter>
        <Page content={<Profile />} />
      </ProtectedRouter>
    ),
  },
  {
    path: '/shop',
    element: (
      <ProtectedRouter>
        <Shop />
      </ProtectedRouter>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
