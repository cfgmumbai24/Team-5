import React from "react";

import Navbar from "../src/components/navbar";
import Home from "./Buyer_folder/Home";
import Products from "./Buyer_folder/Products";
import About from "./Buyer_folder/About";
import Cart from "./Buyer_folder/Cart";
export default function Buyer() {
    selectedProducts = [];
  return (
    <>
      <Navbar usercame={true}/>
      <Home />
      <About />
      <Products products_array={selectedProducts}/>
      <Cart products_array={selectedProducts}/>
    </>
  );
}
