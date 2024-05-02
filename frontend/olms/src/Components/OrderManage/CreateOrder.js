import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const [productName, setProductName] = useState('');
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [amount, setAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Generate Order ID
        const orderId = `OID-${Math.floor(1000 + Math.random() * 9000)}`;

        const response = await axios.post("http://localhost:3001/CreateOrder", 
        {
          orderId,
          productName,
          itemId,
          quantity,
          orderDate,
          amount 
        });
        console.log(response);
        setSuccessMessage('Order created successfully');
        // Adjust this according to your routing logic
        navigate('../order'); // Assuming 'order' is a route path
      } catch (err) {
        console.log(err.response.data); // Log more specific error info if available
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!productName.trim()) {
      errors.productName = "Product Name is required";
      isValid = false;
    }

    if (!itemId.trim()) {
      errors.itemId = "Item ID is required";
      isValid = false;
    }
    if (!quantity.trim()) {
      errors.quantity = "Quantity is required";
      isValid = false;
    }
    if (!orderDate.trim()) {
      errors.orderDate = "Order Date is required";
      isValid = false;
    }
    if (!amount.trim()) {
      errors.amount = "Amount is required";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <div className=" justify-center items-center mb-0 ml-96">
      <div className="w-1/2 bg-white rounded-lg p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Create Order</h2>
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          <div className="mb-4">
            <label htmlFor="productName" className="block mb-1">Product Name</label>
            <input
              type="text"
              id="productName"
              placeholder="Enter Product Name"
              className="form-control"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            {errors.productName && <p className="text-red-500">{errors.productName}</p>}
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
            <label htmlFor="quantity" className="block mb-1">Quantity</label>
            <input
              type="text"
              id="quantity"
              placeholder="Enter Quantity"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="orderDate" className="block mb-1">Order Date</label>
            <input
              type="date"
              id="orderDate"
              className="form-control"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
            {errors.orderDate && <p className="text-red-500">{errors.orderDate}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-1">Amount</label>
            <input
              type="text"
              id="amount"
              placeholder="Enter Amount"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errors.amount && <p className="text-red-500">{errors.amount}</p>}
          </div>
          <div>
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
