import React, { useState, useEffect } from 'react';
import { Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TextField } from "@material-ui/core";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WareHouse = () => {
  const [warehouse, setWarehouse] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchWarehouse();
  }, []);

  const fetchWarehouse = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getwarehouse');
      setWarehouse(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddWarehouse = () => {
    navigate('/createwarehouse');
  };

  const handleEdit = (_id) => {
    navigate(`/updatewarehouse/${_id}`);
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:3001/deletewarehouse/${_id}`);
      setWarehouse(warehouse.filter(item => item._id !== _id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredWarehouse = warehouse.filter(item => {
    return (
      item.warehouseId.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterDate || item.arrivalDate === filterDate)
    );
  });

  return (
    <div className="container mt-5 mx-auto">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <button className="btn btn-primary mb-4" onClick={handleAddWarehouse}>Add WareHouseDetails</button>
          <div className="mb-4">
            <TextField
              label="Search by WareHouseID"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mr-4"
            />
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>WareHouseID</b></TableCell>
                  <TableCell><b>Item ID</b></TableCell>
                  <TableCell><b>Arrival Date</b></TableCell>
                  <TableCell><b>Departure Date</b></TableCell>
                  <TableCell><b>Address</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredWarehouse.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.warehouseId}</TableCell> 
                    <TableCell>{item.itemId}</TableCell>
                    <TableCell>{item.arrivalDate}</TableCell>
                    <TableCell>{item.departureDate}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" className="mr-2" onClick={() => handleEdit(item._id)}>
                        <MdEdit />
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(item._id)}>
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

export default WareHouse;
