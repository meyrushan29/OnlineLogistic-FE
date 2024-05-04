/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditWareHouse = () => {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getware/${id}`)
      .then(response => {
        setWarehouse(response.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWarehouse(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/Updateware/${id}`, warehouse)
      .then(() => {
        console.log('WareHouse updated successfully!');
        navigate('../warehouse'); 
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="mt-0 ml-96">
      <div className="w-1/2 bg-white rounded-lg p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Update WareHouse</h2>
          <div className="mb-4">
            <label htmlFor="warehouseId" className="block text-gray-700 text-sm font-bold mb-2">Warehouse ID</label>
            <input
              type="text"
              id="warehouseId"
              name="warehouseId"
              value={warehouse.warehouseId || ''}
              placeholder="Enter Warehouse ID"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.warehouseId ? 'border-red-500' : ''}`}
              onChange={handleChange}
            />
            {errors.warehouseId && <p className="text-red-500 text-xs italic">{errors.warehouseId}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="itemId" className="block text-gray-700 text-sm font-bold mb-2">Item ID</label>
            <input
              type="text"
              id="itemId"
              name="itemId"
              value={warehouse.itemId || ''}
              placeholder="Enter Item ID"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.itemId ? 'border-red-500' : ''}`}
              onChange={handleChange}
            />
            {errors.itemId && <p className="text-red-500 text-xs italic">{errors.itemId}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="arrivalDate" className="block text-gray-700 text-sm font-bold mb-2">Arrival Date</label>
            <input
              type="date"
              id="arrivalDate"
              name="arrivalDate"
              value={warehouse.arrivalDate || ''}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.arrivalDate ? 'border-red-500' : ''}`}
              onChange={handleChange}
            />
            {errors.arrivalDate && <p className="text-red-500 text-xs italic">{errors.arrivalDate}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="departureDate" className="block text-gray-700 text-sm font-bold mb-2">Departure Date</label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={warehouse.departureDate || ''}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.departureDate ? 'border-red-500' : ''}`}
              onChange={handleChange}
            />
            {errors.departureDate && <p className="text-red-500 text-xs italic">{errors.departureDate}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={warehouse.address || ''}
              placeholder="Enter Address"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address ? 'border-red-500' : ''}`}
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
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

export default EditWareHouse;

