import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home/page.jsx'
import Profile from './pages/profile/page.jsx'
import MinhasApostas from './pages/minhasApostas/page.jsx'
import Auth from './pages/auth/page.jsx'
import Saldo from './pages/saldo/page.jsx'
import Modal from './pages/modal/page.jsx'



const pages = createBrowserRouter([
  {

    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home />},
      { path: '/profile', element: <Profile />},
      { path: '/minhasApostas', element: <MinhasApostas />},
      { path: '/auth', element: <Auth />},
      { path: '/saldo', element: <Saldo />},
      {path: '/modal', element: <Modal/>}


    ]

  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={pages}></RouterProvider>
  </StrictMode>,
)
