import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const CreateSupplier = () => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [SupplierID, setSupplierID] = useState('');
  const [OrderID, setOrderID] = useState('');
  const [Country, setCountry] = useState('');
  const [Category, setCategory] = useState('');

  // Function to generate a random ID
  const generateRandomID = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  // Generate Supplier ID and Order ID when component mounts
  useState(() => {
    const newSupplierID = `SID${generateRandomID()}`;
    const newOrderID = `OID${generateRandomID()}`;
    setSupplierID(newSupplierID);
    setOrderID(newOrderID);
  }, []);

  // Function to validate email
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Function to validate name
  const validateName = (name) => {
    const re = /^[A-Za-z]+$/;
    return re.test(name);
  };

  // Function to validate country
  const validateCountry = (country) => {
    const re = /^[A-Za-z]+$/;
    return re.test(country);
  };

  // Function to validate phone number
  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!Name || !Email || !PhoneNumber || !CompanyName || !Country || !Category) {
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
    if (!validatePhoneNumber(PhoneNumber)) {
      alert('Phone Number should be 10 numbers and contain only numbers');
      return;
    }

    axios.post("http://localhost:3001/CreateSupplier", { SupplierID, Name, Email, PhoneNumber, CompanyName, OrderID, Country,Category })
      .then(result => {
        console.log(result);
        // Redirect to the supplier list page after successful submission
        window.location.href = '../supplier';
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex items-center justify-center   bg-gray-100">
      <div className=' h-screen mt-8 w-75 ml-96 mr-10 '>
      <div className="bg-white shadow-md rounded px-2 pt-2 pb-2 w-full max-w-md mt-10">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold col-md-6 pl-14">Add Supplier</h2>
          <div className="mb-4">
            <TextField id="name" label="Supplier Name" placeholder="Enter Name" fullWidth value={Name} onChange={(e) => setName(e.target.value)}
              required/>
          </div>
          <div className="mb-4">
            <TextField id="phoneNumber"
              label="Phone Number" placeholder="Enter Phone Number" fullWidth value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
              required/>
          </div>
          <div className="mb-4">
            <TextField id="email" label="Email Address" type="email" placeholder="Enter Email" fullWidth value={Email} onChange={(e) => setEmail(e.target.value)}
              required/>
          </div>
          <div className="mb-4">
            <TextField id="companyName" label="Company Name" placeholder="Enter Company Name" fullWidth value={CompanyName} onChange={(e) => setCompanyName(e.target.value)}
              required/>
          </div>
          <div className="mb-4">
            <FormControl fullWidth>
              <InputLabel id="category-label">Supplier Category</InputLabel>
              <Select labelId="category-label" id="category" value={Category} onChange={(e) => setCategory(e.target.value)} required >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
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
          <div className="mb-4">
            <TextField id="Country" label="Country" placeholder="Enter Country" fullWidth value={Country} onChange={(e) => setCountry(e.target.value)}
              required />
          </div>
          <button type="submit"
              className="bg-cyan-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >Submit
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default CreateSupplier;
