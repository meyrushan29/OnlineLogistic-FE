import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchOID, setSearchOID] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/sup')
      .then(result => setSuppliers(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/Deletesupplier/${id}`)
      .then(res => {
        console.log(res);
        setSuppliers(suppliers.filter(supplier => supplier._id !== id));
      })
      .catch(err => console.log(err));
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.Name.toLowerCase().includes(searchName.toLowerCase()) &&
    supplier.OrderID.toLowerCase().includes(searchOID.toLowerCase())
  );

  return (
    <div className='container-fluid mt-1'>
    <div className="h-full w-75 flex flex-col items-center mr-4 ml-auto ">
      <div className="border rounded ">
        <h1 className="text-4xl font-bold mt-8 mb-4 text-center">Supplier List</h1>
        
          <Link to="/createsp" className="block text-center mb-4 text-2xl">Add Supplier+</Link>
        
        <div className="grid  sm:grid-cols-3 gap-8 ml-20 mr-20">
            <input type="text" id="name" placeholder="Search supplier name" className="form-input p-2" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
            <input type="text" id="OID" placeholder="Search OID" className="form-input p-2" value={searchOID} onChange={(e) => setSearchOID(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Supplier ID</th>
                <th className="px-4 py-3">Phone Number</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Company Name</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3">{supplier.Name}</td>
                  <td className="px-4 py-3">{supplier.SupplierID}</td>
                  <td className="px-4 py-3">{supplier.PhoneNumber}</td>
                  <td className="px-4 py-3">{supplier.Email}</td>
                  <td className="px-4 py-3">{supplier.CompanyName}</td>
                  <td className="px-4 py-3">{supplier.OrderID}</td>
                  <td className="px-4 py-3">{supplier.Country}</td>
                  <td className="px-4 py-3 flex justify-center">
                    <Link to={`/updatesp/${supplier._id}`} className="bg-rose-800 text-white px-3 py-2 rounded mr-2">Edit</Link>
                    <button className="bg-cyan-800 text-white px-3 py-2 rounded mr-2" onClick={() => handleDelete(supplier._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Supplier;