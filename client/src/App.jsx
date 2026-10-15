import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Zzap from './pages/Zzapp'
import Partners from './pages/Partners'
import Security from './pages/Security'
import Login from './pages/Login'
import Report from './pages/Report'
import UserProvider from './context/UserProvider'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/partners' element={<Partners />} />
        <Route path='/security' element={<Security />} />
      </Route>

      <Route element={<UserProvider />}>
        <Route path='/app/:section?' element={<Zzap />} />
        <Route path='/login' element={<Login />} />
        <Route path='report' element={<Report />} />
      </Route>
    </Routes>
  )
}

export default App
