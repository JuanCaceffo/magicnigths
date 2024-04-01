import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Admin } from './pages/Admin/Admin'
import { Login } from './pages/Login/Login'
import { Profile } from './pages/Profile/Profile'
import { Shop } from './pages/Shop/Shop'
import { NotFoundPage } from './pages/NotFound/NotFound'
import { Show } from './components/Show/Show'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/show/:showId',
    element: <Show />,
  },
  {
    path: '/admin_dashboard',
    element: <Admin />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/user_profile',
    element: <Profile />,
  },
  {
    path: '/shop',
    element: <Shop />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
