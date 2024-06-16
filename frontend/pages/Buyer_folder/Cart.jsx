import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


import Navbar from "../../src/components/navbar";
import "./Cart.css"; // Assuming you have a separate CSS file for cart styling

export default function Cart() {
  // const { state } = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log(savedCart);
    setCartItems(savedCart);
  }, []);

  const handleQuantityChange = (productId, delta) => {
    console.log(`Changing quantity for product ID: ${productId} by ${delta}`);
    console.log("Cart before update:", cartItems);
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.map((item) => {
        if (item.sku === productId) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(newQuantity, 0) };
        }
        return item;
      });

      const finalCart = updatedCart.filter((item) => item.quantity > 0);
      console.log("Cart after update:", finalCart);
      localStorage.setItem("cart", JSON.stringify(finalCart));
      return finalCart;
    });
  };

  const handleInputChange = (productId, value) => {
    const newQuantity = parseInt(value, 10);

    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setCartItems((prevCartItems) => {
        const updatedCart = prevCartItems.map((item) => {
          if (item.sku === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
  };

  const removeProduct = (productId) => {
    // Filter out the product with the given productId
    const updatedCart = cartItems.filter((item) => item.sku !== productId);

    // Update the state and localStorage with the new cart
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Extract SKU values from the updated cart
    const skuList = updatedCart.map((item) => item.sku);

    // Log or send SKU list somewhere
    console.log("Updated SKU list:", skuList);

    // Example: Sending the SKU list to a server
    // Replace with your actual endpoint and handling code
    axios
      .post("http://127.0.0.1:8080/auth/mail", { skus: skuList })
      .then((response) => {
        console.log("SKUs sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending SKUs:", error);
      });
  };

  const submitCart = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting cart items:", cartItems); // Check what data is being sent
      
    //   const response = await axios.post("http://127.0.0.1:8080/auth/mail", {
    //     products: cartItems,
    //   });
        const response = 200
      console.log("Server response:", response.status); // Log the response from the server

      if (response === 200) {
        setNotification("Cart details sent successfully!");
        setCartItems([]);
        localStorage.removeItem("cart");
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
      setTimeout(() => setNotification(""), 5000);
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
              <div key={item.sku} className="cart-item">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h2>{item.product_name}</h2>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.sku, -1)}>
                      {" "}
                      -{" "}
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleInputChange(item.sku, e.target.value)
                      }
                      className="quantity-input"
                      min="0" // Optional: Prevent typing negative values
                    />
                    <button onClick={() => handleQuantityChange(item.sku, 1)}>
                      {" "}
                      +{" "}
                    </button>
                  </div>
                  <button
                    onClick={() => removeProduct(item.sku)}
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


import Navbar from "../../src/components/navbar";
import "./Cart.css"; // Assuming you have a separate CSS file for cart styling

export default function Cart() {
  // const { state } = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log(savedCart);
    setCartItems(savedCart);
  }, []);

  const handleQuantityChange = (productId, delta) => {
    console.log(`Changing quantity for product ID: ${productId} by ${delta}`);
    console.log("Cart before update:", cartItems);
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.map((item) => {
        if (item.sku === productId) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(newQuantity, 0) };
        }
        return item;
      });

      const finalCart = updatedCart.filter((item) => item.quantity > 0);
      console.log("Cart after update:", finalCart);
      localStorage.setItem("cart", JSON.stringify(finalCart));
      return finalCart;
    });
  };

  const handleInputChange = (productId, value) => {
    const newQuantity = parseInt(value, 10);

    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setCartItems((prevCartItems) => {
        const updatedCart = prevCartItems.map((item) => {
          if (item.sku === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
  };

  const removeProduct = (productId) => {
    // Filter out the product with the given productId
    const updatedCart = cartItems.filter((item) => item.sku !== productId);

    // Update the state and localStorage with the new cart
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Extract SKU values from the updated cart
    const skuList = updatedCart.map((item) => item.sku);

    // Log or send SKU list somewhere
    console.log("Updated SKU list:", skuList);

    // Example: Sending the SKU list to a server
    // Replace with your actual endpoint and handling code
    axios
      .post("http://127.0.0.1:8080/auth/mail", { skus: skuList })
      .then((response) => {
        console.log("SKUs sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending SKUs:", error);
      });
  };

  const submitCart = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Submitting cart items:", cartItems); // Check what data is being sent
  
      // Constructing the mailto URL
      const recipientEmail = "hdkjfh@gmail.com";
      const subject = "Cart Details";
      const body = JSON.stringify(cartItems, null, 2);
      const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
  
      // Open the user's default email client with the mailto URL
      window.open(mailtoUrl);
  
      setNotification("Cart details sent successfully!");
      setCartItems([]);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("An error occurred while sending the cart details:", error);
      setNotification(
        "An error occurred while sending the cart details. Please try again."
      );
    } finally {
      setTimeout(() => setNotification(""), 5000);
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
              <div key={item.sku} className="cart-item">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h2>{item.product_name}</h2>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.sku, -1)}>
                      {" "}
                      -{" "}
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleInputChange(item.sku, e.target.value)
                      }
                      className="quantity-input"
                      min="0" // Optional: Prevent typing negative values
                    />
                    <button onClick={() => handleQuantityChange(item.sku, 1)}>
                      {" "}
                      +{" "}
                    </button>
                  </div>
                  <button
                    onClick={() => removeProduct(item.sku)}
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
