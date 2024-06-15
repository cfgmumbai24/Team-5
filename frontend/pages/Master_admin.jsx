import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateNewUser from "../src/components/CreateNewUser";
import "./master_admin.css";
import Profile from "../src/components/Profile";
import UserCard from "../src/components/AllUser";
import ProductCard from "../src/components/ProductCard";

const Master_admin = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesWithNames, setCategoriesWithNames] = useState([]);
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showUser, setShowUser] = useState(true);
  const [showProducts, setShowProducts] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/admin/getCategories');
      setCategories(response.data.categories);
      const categoriesWithNames = await Promise.all(
        response.data.categories.map(async (category) => {
          const name = await getCategoryNameById(category._id);
          return {
            ...category,
            name: name || category.name,
          };
        })
      );
      setCategoriesWithNames(categoriesWithNames);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getCategoryNameById = async (id) => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/subadmin/getNamefromId', { _id: id });
      return response.data.category.name;
    } catch (error) {
      console.error(`Error fetching category name for ID ${id}:`, error);
      return null;
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/admin/getUser');
      setData(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/admin/getProductsmaster');
      const productsWithCategories = await Promise.all(
        response.data.products.map(async (product) => {
          const categoryName = await getCategoryNameById(product.category);
          return {
            ...product,
            categoryName: categoryName || product.category,
          };
        })
      );
      setProducts(productsWithCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const addCategory = async () => {
    if (inputValue.trim() !== "") {
      try {
        await axios.post('http://127.0.0.1:8080/admin/addCategory', { name: inputValue });
        setInputValue("");
        setShowCategory(false);
        fetchCategories();
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleDelete = async (e, el) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8080/admin/deleteUser', { email: el.email });
      setData(data.filter((i) => i.email !== el.email));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleShowUser = () => {
    setShowUser(true);
    setShowProducts(false);
  };

  const handleShowProduct = () => {
    setShowProducts(true);
    setShowUser(false);
  };

  const handleAccept = async (index) => {
    const product = products[index];
    try {
      await axios.post('http://127.0.0.1:8080/admin/approveAdmin', { _id: product._id });
      setProducts(products.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error accepting product:', error);
    }
  };

  const handleReject = async (index) => {
    const product = products[index];
    try {
      await axios.post('http://127.0.0.1:8080/admin/rejectAdmin', { _id: product._id });
      setProducts(products.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error rejecting product:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post('http://127.0.0.1:8080/admin/editProduct', editedProduct);
      setShowDetails(false);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
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
                      <h1>Name: {el.product_name}</h1>
                      <p>Description: {el.description}</p>
                      <p>SKU: {el.sku}</p>
                      <p>Category: {el.categoryName}</p>
                      <p>Price: {el.price}</p>
                      <p>Weight: {el.weight}</p>
                    </div>
                    <button className="accept" onClick={(e) => { e.stopPropagation(); handleAccept(i); }}>Accept</button>
                    <button onClick={(e) => { e.stopPropagation(); handleReject(i); }}>Reject</button>
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
                placeholder="Enter category name"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button onClick={addCategory}>Add Category</button>
            </div>
          )}
          {showForm && (
            <CreateNewUser onClose={() => setShowForm(false)} />
          )}
          {showDetails && editedProduct && (
            <div className="edit-product-container">
              <h2>Edit Product</h2>
              <label>
                Name:
                <input
                  type="text"
                  name="product_name"
                  value={editedProduct.product_name}
                  onChange={handleEditInputChange}
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={editedProduct.description}
                  onChange={handleEditInputChange}
                />
              </label>
              <label>
                SKU:
                <input
                  type="text"
                  name="sku"
                  value={editedProduct.sku}
                  onChange={handleEditInputChange}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={editedProduct.categoryName}
                  onChange={handleEditInputChange}
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleEditInputChange}
                />
              </label>
              <label>
                Weight:
                <input
                  type="text"
                  name="weight"
                  value={editedProduct.weight}
                  onChange={handleEditInputChange}
                />
              </label>
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setShowDetails(false)}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Master_admin;
