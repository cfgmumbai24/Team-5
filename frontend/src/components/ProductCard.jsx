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
          <img src={product.img} alt="img" />
        </div>
        <div className="card-data">
          <h1>Name: {product.name}</h1>
          <p>Description: {product.description}</p>
        </div>
        <button className="accept" onClick={onAccept}>Accept</button>
        <button onClick={onReject}>Reject</button>
      </div>

      {showDetails && (
        <div className="overlay">
          <div className="details-modal">
            <h2>Edit Product</h2>
            <div className="img-container">
              <img src={editedProduct.img} alt="img" />
            </div>
            <input
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              placeholder="Name"
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
