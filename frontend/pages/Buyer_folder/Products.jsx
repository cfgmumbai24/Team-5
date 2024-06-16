import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../src/components/navbar";
import productsData from "..//../src/components/products.json";
import "./Products.css";

export default function Products() {
  const [category, setCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  // Initialize the quantities state
  useEffect(() => {
    const initialQuantities = productsData.reduce((acc, product) => {
      acc[product.id] = product.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, []);

  useEffect(() => {
    if (category === "All") {
      setFilteredProducts(productsData);
    } else {
      setFilteredProducts(
        productsData.filter((product) => product.category === category)
      );
    }
  }, [category]);

  const categories = [
    "All",
    ...new Set(productsData.map((product) => product.category)),
  ];

  // Handle quantity changes
  const handleQuantityChange = (id, delta) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] + delta, 0), // Ensure quantity doesn't go below 0
    }));
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantities[product.id];
    } else {
      cart.push({ ...product, quantity: quantities[product.id] });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      <div className="nav">
        <Navbar usercame={true} />
      </div>
      <div className="container-wrapper">
        <div className="products-page">
          <h1>Products</h1>
          <div className="filter">
            <label htmlFor="category">Filter by Category: </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="products-container">
            {filteredProducts.map(
              (product) =>
                product.availability !== 0 && (
                  <div key={product.id} className="product-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <h2>{product.name}</h2>
                    <p>{product.category}</p>

                    <div className="quantity-controls">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                      >
                        -
                      </button>
                      <span>{quantities[product.id]}</span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="add-to-cart-button"
                    >
                      Add to Cart
                    </button>
                  </div>
                )
            )}
          </div>

          <button onClick={() => navigate("/cart")} className="cart-button">
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
