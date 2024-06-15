import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

export default function Products() {
  const [category, setCategory] = useState("All");
  const [productsData, setProductsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  // Fetch products data from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/admin/getProductscat');
        const data = await response.json();
        setProductsData(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories data from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/admin/getCategories');
        const data = await response.json();
        setCategories(["All", ...data.categories.map(cat => cat.name)]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Initialize the quantities state
  useEffect(() => {
    const initialQuantities = productsData.reduce((acc, product) => {
      acc[product.id] = product.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [productsData]);

  // Filter products based on category
  useEffect(() => {
    if (category === "All") {
      setFilteredProducts(productsData);
    } else {
      setFilteredProducts(
        productsData.filter((product) => product.category === category)
      );
    }
  }, [category, productsData]);

  const selectProductHandler = (product) => {
    setSelectedProducts((prevSelected) => {
      if (Array.isArray(prevSelected)) {
        const exists = prevSelected.find((p) => p.id === product.id);
        if (exists) {
          return prevSelected.filter((p) => p.id !== product.id);
        } else {
          return [...prevSelected, product];
        }
      } else {
        return [product];
      }
    });
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
    alert(`${product.product_name} added to cart!`);
  };

  const goToCart = () => {
    navigate("/buyer/cart", { state: { selectedProducts } });
  };

  return (
    <div>
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
                  <div
                    key={product.id}
                    className={`product-card ${
                      selectedProducts.find((p) => p.id === product.id)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => selectProductHandler(product)}
                  >
                    <img
                      src={product.photo}
                      alt={product.product_name}
                      className="product-image"
                    />
                    <h2 className="product-title">{product.product_name}</h2>
                    <p className="product-category">{product.category}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="add-to-cart-button"
                    >
                      Add to Cart
                    </button>
                  </div>
                )
            )}
          </div>
          <button onClick={goToCart} className="cart-button">
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
}