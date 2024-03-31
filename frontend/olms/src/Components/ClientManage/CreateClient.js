import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateClient = () => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Generate ClientId
        const clientId = `CID-${Math.floor(1000 + Math.random() * 9000)}`;

        const response = await axios.post("http://localhost:3001/CreateClient", 
        {
          clientId,
          clientName,
          email,
          phone,
          address
        });
        console.log(response);
        setSuccessMessage('Client added successfully');
        // Adjust this according to your routing logic
        navigate('../Client'); // Assuming 'Client' is a route path
      } catch (err) {
        console.log(err.response.data); // Log more specific error info if available
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!clientName.trim()) {
      errors.clientName = "Client Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!phone.trim()) {
      errors.phone = "Phone is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone is invalid";
      isValid = false;
    }

    if (!address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div className="flex h-screen bg-gray-100 justify-center items-center">
      <div className="w-1/2 bg-white rounded-lg p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Add User</h2>
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          <div className="mb-4">
            <label htmlFor="clientName" className="block mb-1">Client Name</label>
            <input
              type="text"
              id="clientName"
              placeholder="Enter Client Name"
              className="form-control"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            {errors.clientName && <p className="text-red-500">{errors.clientName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">E-mail</label>
            <input
              type="email" // Change type to 'email' for email validation
              id="email"
              placeholder="Enter E-mail Address"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1">Phone</label>
            <input
              type="tel" // Change type to 'tel' for phone number input
              id="phone"
              placeholder="Enter Phone Number"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-1">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
          <div>
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClient;


