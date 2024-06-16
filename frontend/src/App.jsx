import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import About from '../pages/Buyer_folder/About';
import Home from '../pages/Buyer_folder/Home';
import Products from '../pages/Buyer_folder/Products';
import Buyer from '../pages/Buyer';
import Cart from '../pages/Buyer_folder/Cart';
import Master_admin from '../pages/Master_admin';
import ImageUploader from '../pages/ImageUploader';
import Login from '../pages/Login';
import AuthForm from './components/Authform';
import Subadmin from '../pages/Subadmin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/cluster" element={isLoggedIn ? <Subadmin /> : <AuthForm onLogin={handleLogin} />} />
        <Route path="/buyer/home" element={<Home />} />
        <Route path="/buyer/about" element={<About />} />
        <Route path="/buyer/products" element={<Products />} />
        <Route path="/buyer/cart" element={<Cart />} />
        <Route path="/client_admin" element={<ImageUploader />} />
        <Route path="/admin" element={<Master_admin />} />
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
