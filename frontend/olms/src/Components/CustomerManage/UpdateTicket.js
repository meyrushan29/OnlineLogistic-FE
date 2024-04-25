import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const UpdateTicket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState({
    ticketId: "",
    email:"",
    title: "",
    description: "",
    status: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getTicket/${id}`)
      .then(response => {
        const { ticketId, title, description, status ,email} = response.data;
        setTicket({ ticketId, title, description, status,email });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!ticket.ticketId.trim()) {
      errors.ticketId = "Ticket ID is required";
    }
    if (!ticket.email.trim()) {
      errors.email = "Email is required";
    }
    if (!ticket.title.trim()) {
      errors.title = "Title is required";
    }
    if (!ticket.description.trim()) {
      errors.description = "Description is required";
    }
    if (!ticket.status.trim()) {
      errors.status = "Status is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      axios.put(`http://localhost:3001/UpdateTicket/${id}`, ticket)
        .then(() => {
          console.log("Ticket updated successfully!");
          navigate('../Customersupport'); // Redirect to home or any other appropriate page
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 justify-center items-center">
      <div className="w-1/2 bg-white rounded-lg p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Update Ticket</h2>
          <div className="mb-4">
            <label htmlFor="ticketId" className="block text-gray-700 text-sm font-bold mb-2">Ticket ID</label>
            <input
              type="text"
              id="ticketId"
              name="ticketId"
              value={ticket.ticketId}
              placeholder="Enter Ticket ID"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.ticketId && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.ticketId && <p className="text-red-500 text-xs italic">{errors.ticketId}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={ticket.email}
              placeholder="Enter Email"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.ticketId && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={ticket.title}
              placeholder="Enter Title"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={ticket.description}
              placeholder="Enter Description"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              value={ticket.status}
              placeholder="Enter Status"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.status && 'border-red-500'}`}
              onChange={handleChange}
            />
            {errors.status && <p className="text-red-500 text-xs italic">{errors.status}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
             Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTicket;
