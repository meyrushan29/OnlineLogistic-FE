import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const EditOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getOrder/${id}`)
      .then(response => {
        setOrder(response.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/UpdateOrder/${id}`, order)
      .then(() => {
        console.log("Order updated successfully!");
        navigate('../order'); 
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="mt-0 ml-96">
      <div className="w-1/2 bg-white rounded-lg p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Update Order</h2>
          <div className="mb-4">
            <label htmlFor="orderId" className="block text-gray-700 text-sm font-bold mb-2">Order ID</label>
            <input
              type="text"
              id="orderId"
              name="orderId"
              value={order.orderId}
              placeholder="Enter Order ID"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.orderId && 'border-red-500'}`}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={order.productName}
              placeholder="Enter Product Name"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.productName && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.productName && <p className="text-red-500 text-xs italic">{errors.productName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="itemId" className="block text-gray-700 text-sm font-bold mb-2">Item ID</label>
            <input
              type="text"
              id="itemId"
              name="itemId"
              value={order.itemId}
              placeholder="Enter Item ID"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.itemId && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.itemId && <p className="text-red-500 text-xs italic">{errors.itemId}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={order.quantity}
              placeholder="Enter Quantity"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.quantity && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.quantity && <p className="text-red-500 text-xs italic">{errors.quantity}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="orderDate" className="block text-gray-700 text-sm font-bold mb-2">Order Date</label>
            <input
              type="date"
              id="orderDate"
              name="orderDate"
              value={order.orderDate}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.orderDate && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.orderDate && <p className="text-red-500 text-xs italic">{errors.orderDate}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={order.amount}
              placeholder="Enter Amount"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.amount && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.amount && <p className="text-red-500 text-xs italic">{errors.amount}</p>}
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

export default EditOrder;
