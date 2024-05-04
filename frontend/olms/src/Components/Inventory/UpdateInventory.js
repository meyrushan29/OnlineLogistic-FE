import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const UpdateInventory = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    itemId: '', // Changed to itemId
    name: '',
    description: '',
    price: '',
    quantity: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getInventory/${id}`)
      .then(response => {
        setItem(response.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (isNaN(item.price) || item.price <= 0 || !Number.isInteger(parseFloat(item.price))) {
      errors.price = "Price must be a positive integer.";
    }
    if (isNaN(item.quantity) || item.quantity <= 0 || !Number.isInteger(parseFloat(item.quantity))) {
      errors.quantity = "Quantity must be a positive integer.";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    axios.put(`http://localhost:3001/updateInventory/${id}`, item)
      .then(() => {
        console.log("Inventory updated successfully!");
        navigate('../inventory'); 
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex h-screen bg-gray-100 justify-center items-center">
      <div className="w-1/2 bg-white rounded-lg p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Update Inventory</h2>
          <div className="mb-4">
            <label htmlFor="itemId" className="block text-gray-700 text-sm font-bold mb-2">Item ID</label>
            <input
              type="text"
              id="itemId" // Changed to itemId
              name="itemId" // Changed to itemId
              value={item.itemId} // Changed to itemId
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Item Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={item.name}
              placeholder="Enter Item Name"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={item.description}
              placeholder="Enter Description"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={item.price}
              placeholder="Enter Price"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={item.quantity}
              placeholder="Enter Quantity"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.quantity && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.quantity && <p className="text-red-500 text-xs italic">{errors.quantity}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
             Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
   
export default UpdateInventory;
