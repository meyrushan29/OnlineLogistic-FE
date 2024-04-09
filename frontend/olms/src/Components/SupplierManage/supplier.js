import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchOID, setSearchOID] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/sup')
      .then(result => {
        setSuppliers(result.data);
        const uniqueCategories = Array.from(new Set(result.data.map(supplier => supplier.Category)));
        setCategories(uniqueCategories);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/Deletesupplier/${id}`)
        .then(res => {
          console.log(res);
          setSuppliers(suppliers.filter(supplier => supplier._id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    (supplier.Name?.toLowerCase().includes(searchName.toLowerCase()) || false) &&
    (supplier.OrderID?.toLowerCase().includes(searchOID.toLowerCase()) || false) &&
    (selectedCategory ? supplier.Category === selectedCategory : true)
  );
  

  const handleAddSupplier = () => {
    const result = window.confirm("Do you want to add a new supplier?");
    if (result) {
      window.location.href = '/createsp';
    }
  };

  const handleEditSupplier = (id) => {
    const result = window.confirm("Do you want to edit this supplier?");
    if (result) {
      window.location.href = `/updatesp/${id}`;
    }
  };

  return (
    <div className="container-fluid w-full mt-2 mb-2 flex justify-end">
      <div className="border rounded p-2">
        <div className="flex justify-between mb-2 h-10">
          <h1 className="text-3xl font-bold">Supplier List</h1>
          <Button onClick={handleAddSupplier} variant="contained" color="primary">Add Supplier+</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2 mt-2">
          <TextField
            type="text"
            id="name"
            placeholder="Search supplier name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <TextField
            type="text"
            id="OID"
            placeholder="Search OID"
            value={searchOID}
            onChange={(e) => setSearchOID(e.target.value)}
          />
          </div>
          <div className='w-50 mb-3 mt-3'>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select mt-1"
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Supplier ID</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Order ID</th>
              <th>Country</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((supplier, index) => (
              <tr key={index}>
                <td>{supplier.Name}</td>
                <td>{supplier.SupplierID}</td>
                <td>{supplier.PhoneNumber}</td>
                <td>{supplier.Email}</td>
                <td>{supplier.CompanyName}</td>
                <td>{supplier.OrderID}</td>
                <td>{supplier.Country}</td>
                <td>{supplier.Category}</td>
                <td>
                  <button onClick={() => handleEditSupplier(supplier._id)} className="bg-red-900 text-white font-bold py-1 px-2 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(supplier._id)} className="bg-cyan-900 text-white font-bold py-1 ml-1 mt-2 px-2 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Supplier;
