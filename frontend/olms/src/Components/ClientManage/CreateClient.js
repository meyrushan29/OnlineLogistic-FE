import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateClient = () => {
  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('male');
  const [email, setEmail] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [status, setStatus] = useState('');

  const [validationErrors, setValidationErrors] = useState({
    clientId: '',
    clientName: '',
    phone: '',
    address: '',
    gender: '',
    email: '',
    billingAddress: '',
    status: ''
  });

  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState('');

  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateClientId = (clientId) => {
    const clientIdRegex = /^CID-\d{4}$/;
    return clientIdRegex.test(clientId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!validateClientId(clientId)) {
      errors.clientId = 'Invalid Client ID format. It should be in the format CID-3846.';
    }
    if (!clientName) {
      errors.clientName = 'Client Name cannot be empty.';
    }
    if (!phone) {
      errors.phone = 'Phone cannot be empty.';
    } else if (!validatePhone(phone)) {
      errors.phone = 'Invalid phone number.';
    }
    if (!address) {
      errors.address = 'Address cannot be empty.';
    }
    if (!gender) {
      errors.gender = 'Gender cannot be empty.';
    }
    if (!email) {
      errors.email = 'Email cannot be empty.';
    }
    if (!billingAddress) {
      errors.billingAddress = 'Billing Address cannot be empty.';
    }
    if (!status) {
      errors.status = 'Status cannot be empty.';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/CreateClient', {
        clientId,
        clientName,
        phone,
        address,
        gender,
        email,
        billingAddress,
        status
      });

      if (response.status === 200) {
        setToastMessage('Client added successfully!');

        setTimeout(() => {
          setToastMessage('');
          navigate('/client');
        }, 1000);
      } else {
        console.error('Error adding client:', response.statusText);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setValidationErrors({ ...validationErrors, clientId: 'Client with the same ID already exists.' });
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    return () => {
      setToastMessage('');
    };
  }, []);

  return (
    <div className='fixed mt-16 ml-80 overflow-auto inset-0'>
      <div className="bg-white py-6 sm:py-8 lg:py-2">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-10 text-lg">
            <h2 className="mb-4 text-center text-lg font-bold text-gray-800 md:mb-6 lg:text-3xl">Add Client</h2>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
            {/* Client ID Input */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Client ID</label>
              <input
                id="client-id"
                name="client-id"
                value={clientId}
                onChange={(e) => setClientId(e.target.value.toUpperCase())}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${validationErrors.clientId ? 'ring-red-500' : ''}`}
              />
              {validationErrors.clientId && <p className="text-red-500 text-sm mt-1">{validationErrors.clientId}</p>}
            </div>

            {/* Client Name Input */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Client Name</label>
              <input
                id="client-name"
                name="client-name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${validationErrors.clientName ? 'ring-red-500' : ''}`}
              />
              {validationErrors.clientName && <p className="text-red-500 text-sm mt-1">{validationErrors.clientName}</p>}
            </div>

            {/* Phone Input */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Phone</label>
              <input
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${validationErrors.phone ? 'ring-red-500' : ''}`}
              />
              {validationErrors.phone && <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>}
            </div>

            {/* Address Input */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Address</label>
              <input
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${validationErrors.address ? 'ring-red-500' : ''}`}
              />
              {validationErrors.address && <p className="text-red-500 text-sm mt-1">{validationErrors.address}</p>}
            </div>

            {/* Gender Select */}
            

            {/* Email Input */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Email</label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${validationErrors.email ? 'ring-red-500' : ''}`}
              />
              {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
            </div>
            

            {/* Billing Address Input */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Billing Address</label>
              <input
                id="billing-address"
                name="billing-address"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${validationErrors.billingAddress ? 'ring-red-500' : ''}`}
              />
              {validationErrors.billingAddress && <p className="text-red-500 text-sm mt-1">{validationErrors.billingAddress}</p>}
            </div>
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Gender</label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${validationErrors.gender ? 'ring-red-500' : ''}`}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {validationErrors.gender && <p className="text-red-500 text-sm mt-1">{validationErrors.gender}</p>}
            </div>

            {/* Status Select */}
            <div>
              <label className="mb-2 inline-block lg:text-lg text-gray-800 sm:text-base">Status</label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring ${validationErrors.status ? 'ring-red-500' : ''}`}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {validationErrors.status && <p className="text-red-500 text-sm mt-1">{validationErrors.status}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between sm:col-span-1 mt-14 mx-8 ">
              <button
                type="submit"
                className="inline-block rounded-lg bg-green-500 px-8 py-3 text-center text-sm font-semibold md:text-base mx-60">
                Add
              </button>
            </div>
          </form>

          {/* Toast Message */}
          {toastMessage && (
            <div className="text-green-500 text-sm mt-2 ml-[250px]">
              {toastMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateClient;
