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
    <div className="flex mx-5 justify-center  mt-7">
      <div className="row justify-content-center">
        <div className="col-md-15">
          <table className="table table-striped bg-white w-full h-full ml-20">
            <h1 className="flex-grow items-center justify-between col-md-24 pl-20 pr-100 mt-6">Supplier List</h1>
            <h4 className="m-0 flex items-center">
              <Link to="/createsp" className="text-right ml-auto mt-0 mr-8" >Add Supplier+</Link>
            </h4>
            
            <div className="grid grid-cols-2 w-75 gap-10 mt-4 ml-auto mr-auto">
              <input type="text" id="name" placeholder="Search supplier name" className="form-control p-2"
                value={searchName}  onChange={(e) => setSearchName(e.target.value)} />
              <input type="text" id="OID" placeholder="Search  OID" className="form-control p-2"
                value={searchOID}  onChange={(e) => setSearchOID(e.target.value)} />
            </div>
          
            <div className="table-responsive">
              <table className=" table table-bordered text-center mt-4  overflow-auto">
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Supplier ID</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Company Name</th>
                    <th>Order ID</th>
                    <th>Country</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier, index) => (
                    <tr key={index}>
                      <td>{supplier.Name}</td>
                      <td>{supplier.SupplierID}</td> {/* Display Supplier ID */}
                      <td>{supplier.PhoneNumber}</td>
                      <td>{supplier.Email}</td>
                      <td>{supplier.CompanyName}</td>
                      <td>{supplier.OrderID}</td>
                      <td>{supplier.Country}</td>
                      <td>
                        <Link to={`/updatesp/${supplier._id}`} className="bg-rose-800 text-white px-4 py-2 rounded mr-2">Edit</Link>
                        <button className="bg-cyan-800 text-white px-4 py-2 rounded mr-2" onClick={() => handleDelete(supplier._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Supplier