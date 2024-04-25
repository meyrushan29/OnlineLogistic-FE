import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";

const CustomerSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getTicket/');
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteTicket/${id}`);
      setTickets(tickets.filter(ticket => ticket._id !== id));
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  const filteredTickets = tickets.filter((ticket) =>
    ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Customer Support Tickets</h5>
              <p className="card-text">Please complete this form and one of our agents will reply to you by email as soon as possible</p>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Customer Name or Ticket ID"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Link to="/createTicket" className="btn btn-success mb-4">
                Create Ticket
              </Link>
              <div className="row">
                <div className="col">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Ticket ID</th>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Issue</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTickets.map(ticket => (
                        <tr key={ticket._id}>
                          <td>{ticket.ticketId}</td>
                          <td>{ticket.customerName}</td>
                          <td>{ticket.email}</td>
                          <td>{ticket.issue}</td>
                          <td>{ticket.title}</td>
                          <td>{ticket.status}</td>
                          <td>
                            <Link to={`/updateTicket/${ticket._id}`} className="btn btn-success me-2">
                              <MdEdit />
                            </Link>
                            <button className="btn btn-danger" onClick={() => handleDelete(ticket._id)}>
                              <MdDelete />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
