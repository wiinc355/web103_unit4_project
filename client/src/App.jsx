import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCars from './pages/ViewCars'
import EditCar from './pages/EditCar'
import CreateCar from './pages/CreateCar'
import CarDetails from './pages/CarDetails'
import Home from './pages/home'
import ManageCustomItems from './pages/ManageCustomItems'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Home title='BOLT BUCKET | Home' />
    },
    {
      path:'/customcars',
      element: <ViewCars title='BOLT BUCKET | Custom Cars' />
    },
    {
      path: '/customcars/:id',
      element: <CarDetails title='BOLT BUCKET | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCar title='BOLT BUCKET | Edit' />
    },
    {
      path: '/manage-custom-items',
      element: <ManageCustomItems />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App