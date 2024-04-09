import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdEdit, MdDelete, MdDescription } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,

  TableBody,
  TableRow,
  TableCell,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";

const Client = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((result) => {
        setClients(result.data);
        setFilteredClients(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = clients.filter(client => {
      const name = client.clientName || "";
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    }).filter(client => statusFilter === "" || client.status === statusFilter);
    setFilteredClients(filtered);
  }, [clients, searchTerm, statusFilter]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3001/deleteClient/${id}`)
        .then((res) => {
          console.log(res);
          toast.success("Client deleted successfully");
          setClients(clients.filter((client) => client._id !== id));
          setFilteredClients(filteredClients.filter((client) => client._id !== id));
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error deleting client");
        });
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    const table = document.querySelector(".table");

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 10);
      doc.save("client_report.pdf");
    });
  };

  return (
    <div className="container-fluid mt-2 mb-2">
      <Grid container justifyContent="flex-end">

        <Grid item xs={12} md={10}>
          <Paper elevation={3}>
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Client List</h5>
            </div>
            <div className="card-body">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    type="text"
                    label="Search by Client Name"
                    value={searchTerm}
                    onChange={handleSearch}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="status-filter">Status</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={handleStatusFilter}
                      label="Status"
                      inputProps={{ id: "status-filter" }}
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={3} md={5} container justifyContent="flex-end" alignItems="center">
                  <Button variant="contained" color="primary" onClick={generateReport} style={{ marginRight: '10px' }}>
                    Generate Report <MdDescription />
                  </Button>
                  <Link to="/create" className="btn btn-success">
                    Add Client
                  </Link>
                </Grid>
              </Grid>
            </div>
            <TableContainer style={{ overflowX: "auto" }}>
              <Table className="table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Client ID</strong></TableCell>
                    <TableCell><strong>Client Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Phone</strong></TableCell>
                    <TableCell><strong>Address</strong></TableCell>
                    <TableCell><strong>Gender</strong></TableCell>
                    <TableCell><strong>Billing Address</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell align="center"><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.clientId}>
                      <TableCell>{client.clientId}</TableCell>
                      <TableCell>{client.clientName}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{client.address}</TableCell>
                      <TableCell>{client.gender}</TableCell>
                      <TableCell>{client.billingAddress}</TableCell>
                      <TableCell>{client.status}</TableCell>
                      <TableCell align="center">
                        <Link to={`/update/${client._id}`} className="btn btn-success me-2">
                          <MdEdit />
                        </Link>
                        <Button variant="contained" color="secondary" onClick={() => handleDelete(client._id)}>
                          <MdDelete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Client;
