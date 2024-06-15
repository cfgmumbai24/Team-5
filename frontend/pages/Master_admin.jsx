import React, { useState } from "react";
import CreateNewUser from "../src/components/CreateNewUser";
import "./master_admin.css";
import Profile from "../src/components/Profile";
import UserCard from "../src/components/AllUser";
import ProductCard from "../src/components/ProductCard";

const Master_admin = () => {
  const [categories, setCategories] = useState([
    { value: 1, label: "A" },
    { value: 2, label: "B" },
    { value: 3, label: "C" },
    { value: 4, label: "D" },
    { value: 5, label: "E" },
  ]);

  const initialData = [
    {
      name: "One",
      role: "Sub-Admin",
      password: "123",
    },
    {
      name: "Two",
      role: "Sub-Admin",
      password: "123",
    },
    {
      name: "Three",
      role: "Cluster",
      category: "A",
      password: "123",
    },
    {
      name: "Four",
      role: "Cluster",
      category: "B",
      password: "123",
    },
  ];

  const initialProducts = [
    {
      name: "Diamond Necklace",
      img: "../img.png",
      description: "A beautiful diamond necklace."
    },
    {
      name: "Gold Ring",
      img: "../img.png",
      description: "A classic gold ring."
    },
    {
      name: "Silver Bracelet",
      img: "../img.png",
      description: "A stylish silver bracelet."
    },
    {
      name: "Emerald Earrings",
      img: "../img.png",
      description: "Elegant emerald earrings."
    }
  ]

  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(initialData);
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showUser, setShowUser] = useState(true);
  const [showProducts, setShowProducts] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  const handleInputChange = (event) => {
    event.preventDefault();
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const addCategory = () => {
    if (inputValue.trim() !== "") {
      const newCategory = {
        value: categories[categories.length - 1].value + 1,
        label: inputValue,
      };
      setCategories([...categories, newCategory]);
      setInputValue("");
      setShowCategory(false);
    }
  };

  const handleDelete = (e, el) => {
    e.preventDefault();
    setData(data.filter((i) => i.name !== el.name));
  };

  const handleShowUser = () => {
    setShowUser(true);
    setShowProducts(false);
  };

  const handleShowProduct = () => {
    setShowProducts(true);
    setShowUser(false);
  };

  const handleAccept = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleReject = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleUpdate = () => {
    setProducts(
      products.map((product) =>
        product.name === editedProduct.name ? editedProduct : product
      )
    );
    setShowDetails(false);
  };

  const handleProductClick = (product) => {
    setEditedProduct(product);
    setShowDetails(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <div>
      <button onClick={handleShowUser}>User</button>
      <button onClick={handleShowProduct}>Products</button>
      <div className="main-container">
        <div className="dash-container">
          {showUser && (
            <div className="card-container">
              {data.map((el, i) => (
                <UserCard key={i} user={el} handleDelete={handleDelete} />
              ))}
            </div>
          )}
          {showProducts && (
            <div className="card-container">
              {products.map((el, i) => (
                <div key={i}>
                  <div className="user-card" onClick={() => handleProductClick(el)}>
                    <div className="img-container">
                      <img src={el.img} alt="img" />
                    </div>
                    <div className="card-data">
                      <h1>Name: {el.name}</h1>
                      <p>Description: {el.description}</p>
                    </div>
                    <button className="accept" onClick={(e) => {e.stopPropagation(); handleAccept(i);}}>Accept</button>
                    <button onClick={(e) => {e.stopPropagation(); handleReject(i);}}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="right-container">
          <Profile />
          <button
            className="create-user-button"
            onClick={() => setShowForm(true)}
          >
            Create User
          </button>
          <button
            className="create-category-button"
            onClick={() => setShowCategory(true)}
          >
            Create Category
          </button>
          {showCategory && (
            <div className="category-input-container">
              <input
                type="text"
                placeholder="Add Category..."
                value={inputValue}
                onChange={handleInputChange}
              />
              <button onClick={addCategory}>Add Category</button>
            </div>
          )}
        </div>
      </div>
      {showForm && (
        <div className="overlay">
          <CreateNewUser
            categories={categories}
            closeForm={() => setShowForm(false)}
          />
        </div>
      )}
      {showDetails && editedProduct && (
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
              onChange={handleEditInputChange}
              placeholder="Name"
            />
            <textarea
              name="description"
              value={editedProduct.description}
              onChange={handleEditInputChange}
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

export default Master_admin;
