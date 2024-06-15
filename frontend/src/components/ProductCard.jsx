import React, { useState } from "react";
import "./productCard.css";

const ProductCard = ({ product, onAccept, onReject, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleUpdate = () => {
    onUpdate(editedProduct);
    setShowDetails(false);
  };

  return (
    <div>
      <div className="user-card" onClick={() => setShowDetails(true)}>
        <div className="img-container">
          <img src={product.photo} alt="img" />
        </div>
        <div className="card-data">
          <h1>Name: {product.product_name}</h1>
          <p>Description: {product.description}</p>
          <p>SKU: {product.sku}</p>
          <p>Category: {product.category}</p>
          <p>Price: {product.price}</p>
          <p>Weight: {product.weight}</p>
        </div>
        <button className="accept" onClick={onAccept}>Accept</button>
        <button onClick={onReject}>Reject</button>
      </div>

      {showDetails && (
        <div className="overlay">
          <div className="details-modal">
            <h2>Edit Product</h2>
            <div className="img-container">
              <img src={editedProduct.photo} alt="img" />
            </div>
            <input
              type="text"
              name="product_name"
              value={editedProduct.product_name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="sku"
              value={editedProduct.sku}
              onChange={handleInputChange}
              placeholder="SKU"
            />
            <input
              type="text"
              name="category"
              value={editedProduct.category}
              onChange={handleInputChange}
              placeholder="Category"
            />
            <input
              type="text"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
            <input
              type="text"
              name="weight"
              value={editedProduct.weight}
              onChange={handleInputChange}
              placeholder="Weight"
            />
            <textarea
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setShowDetails(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;