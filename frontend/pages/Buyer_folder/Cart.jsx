import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios'

import Navbar from "../../src/components/navbar";
import "./Cart.css"; // Assuming you have a separate CSS file for cart styling

export default function Cart() {
  const { state } = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState("");
  
  const { products } = state || { products: [] };
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleQuantityChange = (productId, delta) => {
    setCartItems((prevCartItems) => {
      // Find the item to update
      const updatedCart = prevCartItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = Number(item.quantity) + delta;
          return { ...item, quantity: Math.max(newQuantity, 0) };
        }
        return item;
      });

      // Filter out items with zero quantity only if decrementing
      if (delta < 0) {
        return updatedCart.filter((item) => item.quantity > 0);
      }

      return updatedCart;
    });

    // Update localStorage
    setCartItems((currentCartItems) => {
      localStorage.setItem("cart", JSON.stringify(currentCartItems));
      return currentCartItems;
    });
  };

  const removeProduct = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Format cart items for email body
  const submitCart = async (e) => {
    e.preventDefault();

    try {
      // Replace with your actual backend endpoint
      console.log(cartItems)
      const response = await axios.post("http://127.0.0.1:8080", {
          products: cartItems,
        });

      if (response.status === 200) {
        setNotification("Cart details sent successfully!");
      } else {
        console.error("Failed to send cart details:", response);
        setNotification("Failed to send cart details. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred while sending the cart details:", error);
      setNotification(
        "An error occurred while sending the cart details. Please try again."
      );
    } finally {
      setTimeout(() => setNotification(""), 5000); // Clear notification after 5 seconds
    }
  };

  return (
    <div>
      <div className="nav">
        <Navbar usercame={true} />
      </div>
      <div className="container-wrapper">
        <h1>Your Cart</h1>
        {notification && <div className="notification">{notification}</div>}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>Category: {item.category}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeProduct(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Submit button */}
        <div className="submit-container">
          <button onClick={submitCart}>Submit Cart</button>
          {notification && <p>{notification}</p>}
        </div>
      </div>
    </div>
  );
}
