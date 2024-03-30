import React, { useState } from "react";
import { Link } from "react-router-dom";

const Client = () => {
  const [clients, setClients] = useState([
    {
      clientId: "CID1010",
      clientName: "Meyrushan",
      email: "meyrushan29@gmail.com",
      phone: "0776309171",
      address: "Colombo"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClients = clients.filter((client) =>
    client.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr key={client.clientId}>
                      <td>{client.clientId}</td>
                      <td>{client.clientName}</td>
                      <td>{client.email}</td>
                      <td>{client.phone}</td>
                      <td>{client.address}</td>
                      <td>
                      <Link to="/update" className="btn btn-success mb-4">Update</Link>
                        <button className="btn btn-danger">Delete</button>
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
