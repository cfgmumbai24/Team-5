import { useState } from 'react'
import Buyer from '../pages/buyer'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Master_admin from '../pages/Master_admin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>      
    <Routes>
      <Route path="/" element={<Buyer/>}></Route>
      <Route path="admin" element={<Master_admin/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
