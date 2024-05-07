import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTicket = () => {
  const [customerName, setCustomerName] = useState('');
  const [issue, setIssue] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validatePhoneNumber = (phonenumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phonenumber);
  };

  const validateTicketId = (ticketId) => {
    const ticketIdRegex = /^TID-\d{4}$/;
    return ticketIdRegex.test(ticketId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Generate Ticket ID
        const ticketId = `TID-${Math.floor(1000 + Math.random() * 9000)}`;

        const response = await axios.post("http://localhost:3001/CreateTicket", 
        {
          ticketId,
          customerName,
          email,
          phonenumber,
          title,
          issue,
          status 
        });
        console.log(response);
        setSuccessMessage('Ticket created successfully');
        // Adjust this according to your routing logic
        navigate('../CustomerSupport'); // Assuming 'CustomerSupport' is a route path
      } catch (err) {
        console.log(err.response.data); // Log more specific error info if available
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!customerName.trim()) {
      errors.customerName = "Customer Name is required";
      isValid = false;
    }
    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!validatePhoneNumber(phonenumber)) {
      errors.phonenumber = "Phone Number is invalid";
      isValid = false;
    }

    if (!issue.trim()) {
      errors.issue = "Issue description is required";
      isValid = false;
    }
    if (!title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }
    if (!status.trim()) {
      errors.status = "Status is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div className="flex h-screen bg-gray-100 justify-center items-center">
      <div className="w-1/2 bg-white rounded-lg p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Create Ticket</h2>
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          <div className="mb-4">
            <label htmlFor="customerName" className="block mb-1">Customer Name</label>
            <input
              type="text"
              id="customerName"
              placeholder="Enter Customer Name"
              className="form-control"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            {errors.customerName && <p className="text-red-500">{errors.customerName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="issue" className="block mb-1">Issue Description</label>
            <textarea
              id="issue"
              placeholder="Describe the issue"
              className="form-control"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
            {errors.issue && <p className="text-red-500">{errors.issue}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Type your email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phonenumber" className="block mb-1">Phone Number</label>
            <input
              type="text"
              id="phonenumber"
              placeholder="Enter PhoneNumber"
              className="form-control"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            {errors.phonenumber && <p className="text-red-500">{errors.phonenumber}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter Title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block mb-1">Status</label>
            <textarea
              id="status"
              placeholder="Status"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            {errors.status && <p className="text-red-500">{errors.status}</p>}
          </div>

          <div>
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;