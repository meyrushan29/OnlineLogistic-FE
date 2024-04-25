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
    address: "",
    gender: "",
    billingAddress: "",
    status: ""
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getClient/${id}`)
      .then(response => {
        setClient(response.data);
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
    if (!client.gender.trim()) {
      errors.gender = "Gender is required";
    }
    if (!client.billingAddress.trim()) {
      errors.billingAddress = "Billing Address is required";
    }
    if (!client.status.trim()) {
      errors.status = "Status is required";
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
          navigate('../Client');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center mt-4">
        <div className="w-1/2 bg-white rounded-lg p-3 shadow-md">
          <form onSubmit={handleSubmit} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
            {/* Client ID Input */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Client ID</label>
              <input
                id="client-id"
                name="clientId"
                value={client.clientId}
                onChange={handleChange}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${errors.clientId ? 'ring-red-500' : ''}`}
              />
              {errors.clientId && <p className="text-red-500 text-sm mt-1">{errors.clientId}</p>}
            </div>

            {/* Client Name Input */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Client Name</label>
              <input
                id="client-name"
                name="clientName"
                value={client.clientName}
                onChange={handleChange}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${errors.clientName ? 'ring-red-500' : ''}`}
              />
              {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>}
            </div>

            {/* Phone Input */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Phone</label>
              <input
                id="phone"
                name="phone"
                value={client.phone}
                onChange={handleChange}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${errors.phone ? 'ring-red-500' : ''}`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Address Input */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Address</label>
              <input
                id="address"
                name="address"
                value={client.address}
                onChange={handleChange}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${errors.address ? 'ring-red-500' : ''}`}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            {/* Gender Select */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Gender</label>
              <select
                id="gender"
                name="gender"
                value={client.gender}
                onChange={handleChange}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${errors.gender ? 'ring-red-500' : ''}`}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Email</label>
              <input
                id="email"
                name="email"
                value={client.email}
                onChange={handleChange}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${errors.email ? 'ring-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Billing Address Input */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Billing Address</label>
              <input
                id="billing-address"
                name="billingAddress"
                value={client.billingAddress}
                onChange={handleChange}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${errors.billingAddress ? 'ring-red-500' : ''}`}
              />
              {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>}
            </div>

            {/* Status Select */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Status</label>
              <select
                id="status"
                name="status"
                value={client.status}
                onChange={handleChange}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${errors.status ? 'ring-red-500' : ''}`}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between sm:col-span-1 mt-14 mx-8 ">
              <button
                type="submit"
                className="inline-block rounded-3xl bg-blue-400 px-8 py-3 text-center text-white font-semibold md:text-base mx-60">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateClient;

