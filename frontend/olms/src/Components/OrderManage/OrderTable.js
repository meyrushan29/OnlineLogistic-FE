import React, { useState, useEffect } from 'react';
import { Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@material-ui/core";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
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
      const response = await axios.get('http://localhost:3001/getorders/');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddOrder = () => {
    navigate('/make');
  };

  const handleEdit = (_id) => {
    navigate(`../edit/${_id}`);
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
    <div className="container mt-5" style={{ marginLeft: '150px' }}>
      <div className="d-flex justify-content-center">
        <div>
          <Button variant="contained" color="primary" style={{ marginBottom: '20px' }} onClick={handleAddOrder}>Add Order</Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>District</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Delivery Address</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.productName}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.district}</TableCell>
                    <TableCell>{order.city}</TableCell>
                    <TableCell>{order.deliveryAddress}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" style={{ marginRight: '5px' }} onClick={() => handleEdit(order._id)}>
                        <MdEdit />
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(order._id)}>
                        <MdDelete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
