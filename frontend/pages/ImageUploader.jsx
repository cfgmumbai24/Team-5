import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cluster_admin.css';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [number, setNumber] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [pendingImages, setPendingImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedPendingImages = localStorage.getItem('pendingImages');
    if (storedPendingImages) {
      setPendingImages(JSON.parse(storedPendingImages));
    }

    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/admin/getCategories');
      console.log(response);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDropdownChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleDropdownChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = async () => {
    if (image && (selectedOption1 || selectedOption2) && number) {
      const formData = new FormData();
      formData.append('photo', image);
      formData.append('category', selectedOption1);
      formData.append('product_name', selectedOption2);
      formData.append('availability', number);
      formData.append('approval_sub', 'false');
      formData.append('approval_master', 'false');

      try {
        const response = await axios.post('http://127.0.0.1:8080/admin/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          const newPendingImage = {
            image: URL.createObjectURL(image),
            options: [selectedOption1, selectedOption2],
            number: number,
            status: 'pending',
          };

          setPendingImages([...pendingImages, newPendingImage]);
          localStorage.setItem('pendingImages', JSON.stringify([...pendingImages, newPendingImage]));

          setImage(null);
          setSelectedOption1('');
          setSelectedOption2('');
          setNumber('');
          setUploadMessage('Image uploaded and sent for approval.');
        } else {
          setUploadMessage('Image upload failed. Please try again.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploadMessage('An error occurred while uploading the image. Please try again.');
      }
    } else {
      setUploadMessage('Please fill all fields.');
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Status Bar</h2>
        <div className="status-column">
          <h3>Unapproved</h3>
        </div>
        <div className="status-column">
          <h3>Pending</h3>
          {pendingImages.map((pendingImage, index) => (
            <div key={index} className="pending-image">
              <img src={pendingImage.image} alt="Pending" />
            </div>
          ))}
        </div>
      </div>
      <div className="upload-content">
        <div className="upload-dropdown">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <div>
          <div>
            <label htmlFor="options1">Option 1:</label>
            <select id="options1" value={selectedOption1} onChange={handleDropdownChange1}>
                <option value="" disabled>Select an option</option>
                {Array.isArray(categories) && categories.length > 0 && categories.map((category) => (
                <option key={category._id} value={category.name}>
                    {category.name}
                </option>
                ))}
            </select>
            </div>
          </div>
          <div>
            <label htmlFor="options2">Option 2:</label>
            <select id="options2" value={selectedOption2} onChange={handleDropdownChange2}>
              <option value="" disabled>Select an option</option>
              <option value="Product 1">Product 1</option>
              <option value="Product 2">Product 2</option>
            </select>
          </div>
          <div>
            <label htmlFor="number">Enter a number:</label>
            <input
              type="number"
              id="number"
              value={number}
              onChange={handleNumberChange}
              placeholder="Enter a number"
            />
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
        {uploadMessage && (
          <div className="upload-message">
            {uploadMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;