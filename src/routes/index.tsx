import { Route, Routes } from 'react-router-dom'
import HomePage from '../views/HomePage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
    </Routes>
  )
}