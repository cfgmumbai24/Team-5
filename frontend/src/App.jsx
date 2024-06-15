import { useState } from 'react'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// import Buyer from '../pages/Buyer';
import About from '../pages/Buyer_folder/About';
import Home from '../pages/Buyer_folder/Home';
import Products from '../pages/Buyer_folder/Products';
import Buyer from '../pages/buyer';
import Cart from '../pages/Buyer_folder/Cart';
import Master_admin from '../pages/Master_admin'
import Login from '../pages/Login';
<<<<<<< HEAD

=======
import ImageUploader from '../pages/ImageUploader';
>>>>>>> 7f3adc9f9ac3bcf209b34ce832499352cf23271a

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
      
      <Route path="client_admin" element={<ImageUploader/>} />
      <Route path="admin" element={<Master_admin/>} />
<<<<<<< HEAD
      <Route path="admin/login" element={<Login />}/>

=======
      <Route path="admin/login" element={<Login/>} />
>>>>>>> 7f3adc9f9ac3bcf209b34ce832499352cf23271a
    </Routes>
    </BrowserRouter>
  )
}

export default App
