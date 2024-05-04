import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateInventory = () => {
  const [item, setItem] = useState({
    itemId: '',
    name: '',
    description: '',
    price: '',
    quantity: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [existingItemIds, setExistingItemIds] = useState([]);

  useEffect(() => {
    // Fetch existing item IDs from the server or set them from any other source
    fetchExistingItemIds();
  }, []);

  const fetchExistingItemIds = async () => {
    try {
      const response = await axios.get("http://localhost:3001/existingItemIds");
      setExistingItemIds(response.data);
    } catch (err) {
      console.error("Error fetching existing item IDs:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if the item ID already exists
    if (name === 'itemId') {
      if (existingItemIds.includes(value)) {
        setErrors({ ...errors, itemId: "Item ID already exists" });
      } else {
        setErrors({ ...errors, itemId: '' });
      }
    }

    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const itemId = `It${Math.floor(1000 + Math.random() * 9000)}`;
        const response = await axios.post("http://localhost:3001/CreateInventory", {
          itemId,
          ...item
        });
        setSuccessMessage('Inventory created successfully');
        console.log(response.data);
        navigate('../inventory');
      } catch (err) {
        console.error(err);
        if (err.response) {
          console.error(err.response.data);
        }
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!/^It\d{4}$/.test(item.itemId)) {
      errors.itemId = "Item ID should start with 'It' followed by 4 digits";
      isValid = false;
    }

    if (!item.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!item.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!item.price.trim()) {
      errors.price = "Price is required";
      isValid = false;
    } else if (isNaN(item.price) || parseFloat(item.price) <= 0) {
      errors.price = "Price must be a valid number greater than 0";
      isValid = false;
    } else if (!Number.isInteger(parseFloat(item.price))) {
      errors.price = "Price must be an integer";
      isValid = false;
    }

    if (!item.quantity.trim()) {
      errors.quantity = "Quantity is required";
      isValid = false;
    } else if (isNaN(item.quantity) || parseInt(item.quantity) <= 0) {
      errors.quantity = "Quantity must be a valid number greater than 0";
      isValid = false;
    } else if (!Number.isInteger(parseFloat(item.quantity))) {
      errors.quantity = "Quantity must be an integer";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '50%', backgroundColor: '#fff', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', fontFamily: 'Arial, sans-serif' }}>
        <form onSubmit={handleSubmit}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.5, marginBottom: '1rem' }}>Create Inventory</h2>
          {successMessage && <p style={{ color: '#4caf50', marginBottom: '1rem' }}>{successMessage}</p>}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="itemId" style={{ display: 'block', marginBottom: '0.5rem' }}>Item ID</label>
            <input
              type="text"
              id="itemId"
              name="itemId"
              placeholder="Enter ID"
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
              value={item.itemId}
              onChange={handleChange}
            />
            {errors.itemId && <p style={{ color: '#f44336' }}>{errors.itemId}</p>}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
              value={item.name}
              onChange={handleChange}
            />
            {errors.name && <p style={{ color: '#f44336' }}>{errors.name}</p>}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter Description"
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
              value={item.description}
              onChange={handleChange}
            />
            {errors.description && <p style={{ color: '#f44336' }}>{errors.description}</p>}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="price" style={{ display: 'block', marginBottom: '0.5rem' }}>Price</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Enter Price"
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
              value={item.price}
              onChange={handleChange}
            />
            {errors.price && <p style={{ color: '#f44336' }}>{errors.price}</p>}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="quantity" style={{ display: 'block', marginBottom: '0.5rem' }}>Quantity</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              placeholder="Enter Quantity"
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
              value={item.quantity}
              onChange={handleChange}
            />
            {errors.quantity && <p style={{ color: '#f44336' }}>{errors.quantity}</p>}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer', border: 'none', borderRadius: '0.25rem', backgroundColor: '#4caf50', color: '#fff' }}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInventory;
