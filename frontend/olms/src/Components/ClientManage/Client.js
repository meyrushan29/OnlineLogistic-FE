import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";

const Client = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setClients(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deleteClient/' + id)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(errr => console.log(errr));
  };

  return (
    <div className="container-fluid mx-10">
      <div className="row justify-content-end">
        <div className="col-lg-10">
          <div className="card shadow">
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Client List</h5>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Client Name"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="mb-4">
                <select className="form-select" onChange={handleStatusFilter}>
                  <option value="">Filter by Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <Link to="/create" className="btn btn-success mb-4">
                Add +
              </Link>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ClientID</th>
                    <th>ClientName</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Gender</th>
                    <th>Billing Address</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clients
                    .filter((client) =>
                      client.clientName.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .filter((client) => statusFilter === "" || client.status === statusFilter)
                    .map((client) => (
                      <tr key={client.clientId}>
                        <td>{client.clientId}</td>
                        <td>{client.clientName}</td>
                        <td>{client.email}</td>
                        <td>{client.phone}</td>
                        <td>{client.address}</td>
                        <td>{client.gender}</td>
                        <td>{client.billingAddress}</td>
                        <td>{client.status}</td>
                        <td>
                          <Link to={`/update/${client._id}`} className="btn btn-success me-2"><MdEdit /></Link>
                          <button className="btn btn-danger" onClick={() => handleDelete(client._id)}><MdDelete /></button>
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
  );
};

export default Client;

