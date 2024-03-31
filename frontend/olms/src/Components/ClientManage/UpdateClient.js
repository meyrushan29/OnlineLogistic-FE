import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const UpdateClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState({
    clientId: "",
    clientName: "",
    email: "",
    phone: "",
    address: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getClient/${id}`)
      .then(response => {
        const { clientId, clientName, email, phone, address } = response.data;
        setClient({ clientId, clientName, email, phone, address });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!client.clientId.trim()) {
      errors.clientId = "Client ID is required";
    }
    if (!client.clientName.trim()) {
      errors.clientName = "Client Name is required";
    }
    if (!client.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(client.email)) {
      errors.email = "Email address is invalid";
    }
    if (!client.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(client.phone)) {
      errors.phone = "Phone number is invalid";
    }
    if (!client.address.trim()) {
      errors.address = "Address is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      axios.put(`http://localhost:3001/updateClient/${id}`, client)
        .then(() => {
          console.log("Client updated successfully!");
          navigate('../Client'); // Redirect to home or any other appropriate page
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 justify-center items-center">
      <div className="w-1/2 bg-white rounded-lg p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Update User</h2>
          <div className="mb-4">
            <label htmlFor="clientId" className="block mb-1">Client ID</label>
            <input
              type="text"
              id="clientId"
              name="clientId"
              value={client.clientId}
              placeholder="Enter Client ID"
              className="form-control"
              onChange={handleChange}
            />
            {errors.clientId && <p className="text-red-500">{errors.clientId}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="clientName" className="block mb-1">Client Name</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={client.clientName}
              placeholder="Enter Client Name"
              className="form-control"
              onChange={handleChange}
            />
            {errors.clientName && <p className="text-red-500">{errors.clientName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">E-mail</label>
            <input
              type="text"
              id="email"
              name="email"
              value={client.email}
              placeholder="Enter E-mail Address"
              className="form-control"
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={client.phone}
              placeholder="Enter Phone Number"
              className="form-control"
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-1">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={client.address}
              placeholder="Enter Address"
              className="form-control"
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
          <div>
            <button type="submit" className="btn btn-success">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClient;
