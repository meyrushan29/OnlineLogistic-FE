import React, { useState, useEffect } from 'react';
import { Button } from "@material-ui/core";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch orders when component mounts
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddOrder = () => {
    navigate('/ordermake');
  };

  const handleEdit = (_id) => {
    navigate(`../editorder/${_id}`);
  };

  const handleDelete = async (_id) => {
    try {
      // Send a DELETE request to remove the order with the given id from the server
      await axios.delete(`http://localhost:3001/deleteorder/${_id}`);
      // Update the orders state after successful deletion
      setOrders(orders.filter(order => order._id !== _id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="container mt-5 mx-auto">
      <div className="flex justify-center">
        <div>
          <Button variant="contained" color="primary" className="mb-4" onClick={handleAddOrder}>Add Order</Button>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 py-2 px-4">ID</th>
                <th className="border border-gray-300 py-2 px-4">Product Name</th>
                <th className="border border-gray-300 py-2 px-4">Quantity</th>
                <th className="border border-gray-300 py-2 px-4">District</th>
                <th className="border border-gray-300 py-2 px-4">City</th>
                <th className="border border-gray-300 py-2 px-4">Delivery Address</th>
                <th className="border border-gray-300 py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="border border-gray-300 py-2 px-4">{order.orderId}</td>
                  <td className="border border-gray-300 py-2 px-4">{order.productName}</td>
                  <td className="border border-gray-300 py-2 px-4">{order.quantity}</td>
                  <td className="border border-gray-300 py-2 px-4">{order.district}</td>
                  <td className="border border-gray-300 py-2 px-4">{order.city}</td>
                  <td className="border border-gray-300 py-2 px-4">{order.deliveryAddress}</td>
                  <td className="border border-gray-300 py-2 px-4">
                    <Button variant="contained" color="primary" className="mr-2" onClick={() => handleEdit(order._id)}>
                      <MdEdit />
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(order._id)}>
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
