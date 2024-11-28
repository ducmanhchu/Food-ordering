import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Blog from './pages/Blog'
import DishDetail from './pages/DishDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/dish/:id' element={<DishDetail />}/>
        <Route path='/blog' element={<Blog />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>

    </>
  )
}

export default App
