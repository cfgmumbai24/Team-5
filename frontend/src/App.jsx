import { useState } from 'react'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// import Buyer from '../pages/Buyer';
import About from '../pages/Buyer_folder/About';
import Home from '../pages/Buyer_folder/Home';
import Products from '../pages/Buyer_folder/Products';
import Buyer from '../pages/Buyer';
import Cart from '../pages/Buyer_folder/Cart';

function App() {

  return (
    <BrowserRouter>      
    <Routes>
      {/* <Route path="/buyer" element={<Buyer />}></Route>   */}
      <Route path='/buyer/' element={<Buyer/>}></Route>   
      <Route path='/buyer/home' element={<Home/>}></Route> 
      <Route path='/buyer/about' element={<About/>}></Route>   
      <Route path='/buyer/products' element={<Products/>}></Route>   
      <Route path='/buyer/cart' element={<Cart/>}></Route>   
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
