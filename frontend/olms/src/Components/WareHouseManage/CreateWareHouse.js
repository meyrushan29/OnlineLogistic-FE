import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateWareHouse = () => {
  const [warehouseId, setWarehouseId] = useState('');
  const [itemId, setItemId] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Generate Order ID
        const warehouseId = `WID-${Math.floor(1000 + Math.random() * 9000)}`;

        const response = await axios.post("http://localhost:3001/Createwarehouse", 
          {
            warehouseId,
            itemId,
            arrivalDate,
            departureDate,
            address
          }
        );
        console.log(response);
        setSuccessMessage('Order created successfully');
        // Adjust this according to your routing logic
        navigate('../warehouse'); // Assuming 'order' is a route path
      } catch (err) {
        console.log(err.response.data); // Log more specific error info if available
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!warehouseId.trim()) {
      errors.warehouseId = "Warehouse ID is required";
      isValid = false;
    }

    if (!itemId.trim()) {
      errors.itemId = "Item ID is required";
      isValid = false;
    }

    if (!arrivalDate.trim()) {
      errors.arrivalDate = "Arrival Date is required";
      isValid = false;
    }

    if (!departureDate.trim()) {
      errors.departureDate = "Departure Date is required";
      isValid = false;
    }

    if (!address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div className=" justify-center items-center mb-0 ml-96">
      <div className="w-1/2 bg-white rounded-lg p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Add WareHouse Details</h2>
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          <div className="mb-4">
            <label htmlFor="warehouseId" className="block mb-1">Warehouse ID</label>
            <input
              type="text"
              id="warehouseId"
              placeholder="Enter Warehouse ID"
              className="form-control"
              value={warehouseId}
              onChange={(e) => setWarehouseId(e.target.value)}
            />
            {errors.warehouseId && <p className="text-red-500">{errors.warehouseId}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="itemId" className="block mb-1">Item ID</label>
            <input
              type="text"
              id="itemId"
              placeholder="Enter Item ID"
              className="form-control"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
            />
            {errors.itemId && <p className="text-red-500">{errors.itemId}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="arrivalDate" className="block mb-1">Arrival Date</label>
            <input
              type="date"
              id="arrivalDate"
              className="form-control"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
            {errors.arrivalDate && <p className="text-red-500">{errors.arrivalDate}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="departureDate" className="block mb-1">Departure Date</label>
            <input
              type="date"
              id="departureDate"
              className="form-control"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
            {errors.departureDate && <p className="text-red-500">{errors.departureDate}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-1">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
          <div>
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWareHouse;
