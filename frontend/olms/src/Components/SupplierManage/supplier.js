import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Checkbox } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchOID, setSearchOID] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get('http://localhost:3001/sup');
      setSuppliers(result.data);
      const uniqueCategories = [...new Set(result.data.map(supplier => supplier.Category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (supplierId) => {
    if (selectedSuppliers.includes(supplierId)) {
      setSelectedSuppliers(selectedSuppliers.filter(id => id !== supplierId));
    } else {
      setSelectedSuppliers([...selectedSuppliers, supplierId]);
    }
  };

  const handleDeleteSelected = async () => {
    if (window.confirm('Are you sure you want to delete the selected suppliers?')) {
      try {
        await axios.delete('http://localhost:3001/Deletesupplier/', { data: { ids: selectedSuppliers } });
        fetchData();
        setSelectedSuppliers([]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    (supplier.Name?.toLowerCase().includes(searchName.toLowerCase()) || false) &&
    (supplier.OrderID?.toLowerCase().includes(searchOID.toLowerCase()) || false) &&
    (selectedCategory ? supplier.Category === selectedCategory : true) &&
    (selectedStatus ? supplier.Status === selectedStatus : true)
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

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Name', 'Supplier ID', 'Phone Number', 'Email', 'Company Name', 'Country', 'Supplier Category', 'Status']],
      body: filteredSuppliers.map(supplier => [supplier.Name, supplier.SupplierID, supplier.PhoneNumber, supplier.Email, supplier.CompanyName, supplier.Country, supplier.Category, supplier.Status]),
    });
    doc.save('supplier_list.pdf');
  };

  return (
    
    <div className="container px-10 py-6 w-60 mx-10">
      <div className="bg-white border-8 rounded-lg shadow ml-40 ">
        <h1 className="text-3xl font-bold mb-4 pl-10 pt-3">Supplier List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search supplier name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none w-full shadow-sm ml-8"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg w-full mr-6 px-4 py-2 focus:outline-none ml-4"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-lg w-full ml-6 px-4 py-2 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className='col-span-2 flex justify-end items-end'>
            <button
              onClick={handleDeleteSelected}
              className={`bg-pink-700 hover:bg-blue-900 text-white font-bold  py-2 px-4 rounded-lg mr-2 ${selectedSuppliers.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={selectedSuppliers.length === 0}
            >
              Delete Selected
            </button>
            <button
              onClick={handleAddSupplier}
              className="mr-2 bg-red-900 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg"
            >
              Add Supplier
            </button>
            <button
              onClick={generatePDF}
              className="mr-4 bg-green-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg"
            >
              Generate PDF
            </button>
          </div>
        </div>
        <div className="" style={{
                maxHeight: "calc(95vh - 400px)", // Increased height
                width: "100%",
                overflowX: "auto", // Enable horizontal scrolling
              }}>
          <Table striped bordered hover className='border-1 '>
            <thead>
              <tr>
                <th>Name</th>
                <th>Supplier ID</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Company Name</th>
                <th>Country</th>
                <th>Supplier Category</th>
                <th>Status</th>
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
                  <td>{supplier.Country}</td>
                  <td>{supplier.Category}</td>
                  <td>{supplier.Status}</td>
                  <td>
                    <button onClick={() => handleEditSupplier(supplier._id)} className="bg-cyan-900 text-white font-bold py-1 px-2 rounded">
                      Edit
                    </button>
                    <Checkbox
                      checked={selectedSuppliers.includes(supplier._id)}
                      onChange={() => handleCheckboxChange(supplier._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
    
  );
};

export default Supplier;
