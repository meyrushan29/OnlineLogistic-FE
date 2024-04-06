import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import axios from 'axios';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchOID, setSearchOID] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/sup')
      .then(result => setSuppliers(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/Deletesupplier/${id}`)
        .then(res => {
          console.log(res);
          setSuppliers(suppliers.filter(supplier => supplier._id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.Name.toLowerCase().includes(searchName.toLowerCase()) &&
    supplier.OrderID.toLowerCase().includes(searchOID.toLowerCase())
  );

  const handleAddSupplier = () => {
    const result = window.confirm("Do you want to add a new supplier?");
    if (result) {
      window.location.href = '/createsp';
    }
  };

  const handleEditSupplier = (id) => {
    const result = window.confirm("Do you want to edit this supplier?");
    if (result) {
      window.location.href = `/updatesp/${id}`;
    }
  };

  return (
    <div className="flex justify-center mt-7 ml-28">
      <div className="row justify-content-center">
        <div className="col-md-15">
          <div className="border rounded p-4 ml-32">
            <h1 className="flex-grow items-center justify-between col-md-24  ">Supplier List</h1>
            <h4 className="m-0 flex items-center">
              <button onClick={handleAddSupplier} className="text-right ml-auto mt-0 mr-auto items-center bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Add Supplier+</button>
            </h4>
            <div className="grid grid-cols-2 w-75 gap-10  mt-4 ml-auto mr-auto">
              <input
                type="text"
                id="name"
                placeholder="Search supplier name"
                className="form-control p-2"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <input
                type="text"
                id="OID"
                placeholder="Search  OID"
                className="form-control p-2"
                value={searchOID}
                onChange={(e) => setSearchOID(e.target.value)}
              />
            </div>
            <div className="table-responsive bg-gray-100 mt-3">
              <table className="table table-bordered  text-center mt-4 overflow-auto">
                <thead className="thead-dark  ">
                  <tr>
                    <th className="column-heading">Name</th>
                    <th className="column-heading">Supplier ID</th>
                    <th className="column-heading">Phone Number</th>
                    <th className="column-heading">Email</th>
                    <th className="column-heading">Company Name</th>
                    <th className="column-heading">Order ID</th>
                    <th className="column-heading">Country</th>
                    <th className="column-heading">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier, index) => (
                    <tr key={index}>
                      <td>{supplier.Name}</td>
                      <td>{supplier.SupplierID}</td>
                      <td>{supplier.PhoneNumber}</td>
                      <td>{supplier.Email}</td>
                      <td>{supplier.CompanyName}</td>
                      <td>{supplier.OrderID}</td>
                      <td>{supplier.Country}</td>
                      <td>
                        <button onClick={() => handleEditSupplier(supplier._id)} className="bg-rose-800 text-white px-4 py-2 rounded mr-2">Edit</button>
                        <button className="bg-cyan-800 text-white px-4 py-2 rounded mr-2" onClick={() => handleDelete(supplier._id)}>Delete</button>
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
}

export default Supplier;
