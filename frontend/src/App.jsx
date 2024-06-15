import { useState } from 'react'
import Buyer from '../pages/buyer'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>      
    <Routes>
      <Route path="/" element={<Buyer/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
