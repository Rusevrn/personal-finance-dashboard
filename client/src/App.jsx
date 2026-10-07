import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Zzap from './pages/Zzapp'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
      </Route>
      <Route path='/app' element={<Zzap />} />
    </Routes>
  )
}

export default App
