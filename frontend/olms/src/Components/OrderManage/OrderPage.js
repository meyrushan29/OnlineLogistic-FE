import React, { useState, useEffect } from 'react';
import { Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TextField } from "@material-ui/core";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
    navigate('/createOrder');
  };

  const handleEdit = (_id) => {
    navigate(`/updateOrder/${_id}`);
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteOrder/${_id}`);
      setOrders(orders.filter(order => order._id !== _id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  const filteredOrders = orders.filter(order => {
    return (
      order.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterDate || order.orderDate.includes(filterDate))
    );
  });

  return (
    <div className="container mt-5" style={{ marginLeft: '150px' }}>
      <div className="d-flex justify-content-center">
        <div>
          <Button variant="contained" color="primary" style={{ marginBottom: '20px' }} onClick={handleAddOrder}>Add Order</Button>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Search by Product Name"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ marginRight: '10px' }}
            />
            <TextField
              label="Filter by Date (YYYY-MM-DD)"
              variant="outlined"
              value={filterDate}
              onChange={handleFilterDateChange}
              style={{ marginRight: '10px' }}
            />
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Item ID</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.productName}</TableCell>
                    <TableCell>{order.itemId}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.amount}</TableCell>
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
