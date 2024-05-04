import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addButtonPressed, setAddButtonPressed] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:3001/inv');
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/deleteInventory/${id}`);
        toast.success("Item deleted successfully");
        setInventory(inventory.filter((item) => item._id !== id));
      } catch (error) {
        console.log(error);
        toast.error("Error deleting item");
      }
    }
  };

  const downloadPDF = () => {
    const input = document.getElementById("inventory-table");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("inventory.pdf");
    });
  };

  const filteredInventory = inventory.filter((item) =>
    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.itemId && item.itemId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-white text-center">
              <h5 className="card-title mb-0" style={{ color: "blue" }}>Inventory Management</h5>
              <p className="card-text" style={{ color: "blue" }}>Manage your inventory items here</p>
            </div>
            <div className="card-body text-center">
              <div className="mb-4 text-start d-flex justify-content-between align-items-center">
                <div>
                  <Link to="/createinventory" className="btn btn-success me-2" style={{ color: "#fff", backgroundColor: addButtonPressed ? "purple" : "blue", borderColor: addButtonPressed ? "purple" : "blue" }} onClick={() => setAddButtonPressed(true)}>
                    Add Item
                  </Link>
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Search by Item Name or ID"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ backgroundColor: "#f0f0f0" }}
                  />
                </div>
                <button className="btn btn-primary" onClick={downloadPDF} style={{ backgroundColor: "darkgreen" }}>Download PDF</button>
              </div>
              <div className="row">
                <div className="col">
                  <table id="inventory-table" className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th style={{ color: "blue" }}>Item ID</th>
                        <th style={{ color: "blue" }}>Name</th>
                        <th style={{ color: "blue" }}>Description</th>
                        <th style={{ color: "blue" }}>Price</th>
                        <th style={{ color: "blue" }}>Quantity</th>
                        <th style={{ color: "blue" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventory.length > 0 ? (
                        filteredInventory.map(item => (
                          <tr key={item._id}>
                            <td>{item.itemId}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>${item.price}</td>
                            <td>{item.quantity}</td>
                            <td>
                              <Link to={`/updateinventory/${item._id}`} className="btn btn-success me-2" style={{ color: "#fff", backgroundColor: "blue", borderColor: "blue" }}>
                                <MdEdit />
                              </Link>
                              <button className="btn btn-danger" onClick={() => handleDelete(item._id)} style={{ color: "#fff", backgroundColor: "red", borderColor: "red" }}>
                                <MdDelete />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">No items found</td>
                        </tr>
                      )}
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

export default Inventory;
