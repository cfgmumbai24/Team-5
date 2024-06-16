import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './ProductRequests.css'; // Import CSS file for styling

const ProductRequests = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});
    const [formData, setFormData] = useState({
        product_name: '',
        description: '',
        availability: 0,
        photo: '',
        isLocal: false,
        weight: '',
    });

    const productsPerPage = 7;

    const fetchProducts = () => {
        axios.get('http://127.0.0.1:8080/admin/getProducts')
            .then(response => {
                const startIndex = (currentPage - 1) * productsPerPage;
                const endIndex = startIndex + productsPerPage;
                const paginatedData = response.data.products.slice(startIndex, endIndex);
                setProducts(paginatedData);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    };

    useEffect(() => {
        fetchProducts();
        const interval = setInterval(fetchProducts, 5000);
        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [currentPage]);

    const handleApprove = async (_id) => {
        try {
            await axios.post('http://127.0.0.1:8080/subadmin/approveSub', { _id });
            updateProductStatus(_id, true);
        } catch (error) {
            console.error('Error approving product:', error);
        }
    };

    const handleReject = async (_id) => {
        try {
            await axios.post('http://127.0.0.1:8080/subadmin/rejectSub', { _id });
            updateProductStatus(_id, false);
        } catch (error) {
            console.error('Error rejecting product:', error);
        }
    };

    const updateProductStatus = (_id, approvalStatus) => {
        const updatedProducts = products.map(product => {
            if (product._id === _id) {
                return { ...product, approval_sub: approvalStatus };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEdit = (_id) => {
        const product = products.find(product => product._id === _id);
        setCurrentProduct(product);
        setFormData({
            product_name: product.product_name,
            description: product.description,
            availability: product.availability,
            photo: product.photo,
            isLocal: product.isLocal,
            weight: product.weight,
        });
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8080/admin/editProduct', {
                _id: currentProduct._id,
                ...formData,
            });

            const updatedProduct = response.data;
            setProducts(products.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
            setShowModal(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const renderProductPhoto = (photo) => {
        if (photo.startsWith('data:image/') || photo.startsWith('http')) {
            return photo;
        }
        return `data:image/jpeg;base64,${photo}`;
    };

    return (
        <div className="product-requests-container">
            <h1>Product Requests</h1>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Request</th>
                        <th>Description</th>
                        <th>QTY</th>
                        <th>Product Photo</th>
                        <th>Product Weight</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.product_name}</td>
                            <td>
                                <button
                                    className="action-button"
                                    style={{ backgroundColor: product.approval_sub ? 'green' : 'red' }}
                                    onClick={() => handleApprove(product._id)}
                                    disabled={product.approval_sub}
                                >
                                    {product.approval_sub ? 'Accepted' : 'Accept'}
                                </button>
                                <br />
                                <br />
                                <button
                                    className="action-button"
                                    style={{ backgroundColor: !product.approval_sub ? 'red' : 'green' }}
                                    onClick={() => handleReject(product._id)}
                                    disabled={!product.approval_sub}
                                >
                                    {product.approval_sub ? 'Reject' : 'Rejected'}
                                </button>
                            </td>
                            <td>{product.description}</td>
                            <td>{product.availability}</td>
                            <td>
                                <img 
                                    src={renderProductPhoto(product.photo)} 
                                    alt="Product" 
                                    className="product-image" 
                                />
                            </td>
                            <td>{product.weight}</td>
                            <td>
                                <FontAwesomeIcon
                                    icon={faPencilAlt}
                                    className="edit-icon"
                                    onClick={() => handleEdit(product._id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-container">
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt; Previous
                </button>
                <span className="page-number">Page {currentPage}</span>
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={products.length < productsPerPage}
                >
                    Next &gt;
                </button>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Edit Product</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Product Name:
                                <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} />
                            </label>
                            <label>
                                Description:
                                <input type="text" name="description" value={formData.description} onChange={handleChange} />
                            </label>
                            <label>
                                QTY:
                                <input type="number" name="availability" value={formData.availability} onChange={handleChange} />
                            </label>
                            <label>
                                Photo URL:
                                <input type="text" name="photo" value={formData.photo} onChange={handleChange} />
                            </label>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="isLocal" 
                                    checked={formData.isLocal} 
                                    onChange={(e) => setFormData({ ...formData, isLocal: e.target.checked })} 
                                />
                                Local File
                            </label>
                            <label>
                                Weight:
                                <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
                            </label>
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductRequests;
