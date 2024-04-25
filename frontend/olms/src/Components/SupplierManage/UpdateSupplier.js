import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

function UpdateSupplier() {
  const { id } = useParams();
  const [SupplierID, setSupplierID] = useState('');
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [Country, setCountry] = useState('');
  const [Category, setCategory] = useState('');
  const [Status, setStatus] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getSupplier/${id}`)
      .then(result => {
        console.log(result);
        setName(result.data.Name);
        setEmail(result.data.Email);
        setPhoneNumber(result.data.PhoneNumber);
        setCompanyName(result.data.CompanyName);
        setCountry(result.data.Country);
        setCategory(result.data.Category);
        setSupplierID(result.data.SupplierID);
        setStatus(result.data.Status);
      })
      .catch(err => console.log(err));
  }, [id]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  
  const validateName = (name) => {
    const re = /^[A-Za-z]+$/;
    return re.test(name);
  };
  
  const validateCountry = (country) => {
    const re = /^[A-Za-z]+$/;
    return re.test(country);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!Name || !Email || !PhoneNumber || !CompanyName || !Country || !Status || !SupplierID) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if email is valid
    if (!validateEmail(Email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Check if name contains only letters
    if (!validateName(Name)) {
      alert('Name should contain only letters');
      return;
    }

    // Check if country contains only letters
    if (!validateCountry(Country)) {
      alert('Country should contain only letters');
      return;
    }

    // Check if phone number is exactly 10 numbers and contains only numbers
    const validatePhoneNumber = (phoneNumber) => {
      const re = /^\d{10}$/;
      return re.test(phoneNumber);
    };

    if (!validatePhoneNumber(PhoneNumber)) {
      alert('Phone Number should be 10 numbers and contain only numbers');
      return;
    }

    axios.put(`http://localhost:3001/UpdateSupplier/${id}`, { Name, Email, PhoneNumber, CompanyName, Country, Category, SupplierID, Status })
      .then(result => {
        console.log(result);
        navigate('../supplier');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className='h-screen w-75 ml-96 mr-10'>
        <div className="bg-white shadow-md rounded px-2 pt-2 pb-2 w-full max-w-md mt-2">
          <form onSubmit={handleSubmit}>
            <h2 className='col-md-10 pl-0 mb-3'>Edit Supplier Details</h2>
            <div className='mb-1'>
              <TextField id="name" label="Name" placeholder="Enter Name" fullWidth value={Name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-1">
              <TextField id="ID" label="Supplier ID" placeholder="Enter Supplier ID" fullWidth value={SupplierID} onChange={(e) => setSupplierID(e.target.value)} required />
            </div>
            <div className='mb-1'>
              <TextField id="phoneNumber" label="Phone Number" placeholder="Enter Phone number" fullWidth value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            </div>
            <div className='mb-1'>
              <TextField id="email" label="Email" placeholder="Enter Email" fullWidth value={Email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='mb-1'>
              <TextField id="companyName" label="Company Name" placeholder="Enter Company Name" fullWidth value={CompanyName} onChange={(e) => setCompanyName(e.target.value)} required />
            </div>
            <div className="mb-1">
              <FormControl fullWidth>
                <InputLabel id="category-label">Supplier Category</InputLabel>
                <Select labelId="category-label" id="category" value={Category} onChange={(e) => setCategory(e.target.value)} required>
                  <MenuItem value="">Select Category</MenuItem>
                  <MenuItem value="Clothing and Apparel">Clothing and Apparel</MenuItem>
                  <MenuItem value="Home and Garden">Home and Garden</MenuItem>
                  <MenuItem value="Automotive Parts">Automotive Parts</MenuItem>
                  <MenuItem value="Health and Beauty">Health and Beauty</MenuItem>
                  <MenuItem value="Sporting Goods">Sporting Goods</MenuItem>
                  <MenuItem value="Furniture and Decor">Furniture and Decor</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mb-1">
              <FormControl fullWidth>
                <InputLabel id="Status-label">Status</InputLabel>
                <Select labelId="Status-label" id="Status" value={Status} onChange={(e) => setStatus(e.target.value)} required>
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className='mb-1'>
              <TextField id="Country" label="Country" placeholder="Enter Country" fullWidth value={Country} onChange={(e) => setCountry(e.target.value)} required />
            </div>
            <button type="submit" className="bg-cyan-800 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mr-2">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateSupplier;
