
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { BsPencilSquare, BsTrash } from "react-icons/bs";

const Shipping = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/sh');
      setShipments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteShipping/${id}`);
      setShipments(shipments.filter(shipping => shipping._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
      <div className="row justify-content-center justify-content-lg-end">
        <div className="col-lg-10">
          <div className="card shadow" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
            <div className="card-header bg-white" >
              <h5 className="card-title mb-0 text-center" >Shipping Management</h5>
              <p className="card-title mb-0 text-center">Manage shipping details</p>
            </div>
            <div className="card-body" >
              <div className="row">
                <div className="col">
                  <table className="table table-bordered" >
                    <thead>
                      <tr>
                        <th>Customer Name</th>
                        <th>Shipment ID</th>
                        <th>Country From</th>
                        <th>Country To</th>
                        <th>Shipping Type</th>
                        <th>Address</th>
                        <th>ZipCode</th>
                        <th>Shipped Date</th>
                        <th>Email</th>
                        <th>Total Cost </th>
                        <th>Shipping Status</th>
                        <th>Phone</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shipments
                      .map(shipping => (
                        <tr key={shipping._id}>
                          <td>{shipping.cusName}</td>
                          <td>{shipping.shipmentId}</td>
                          <td>{shipping.countryFrom}</td>
                          <td>{shipping.countryTo}</td>
                          <td>{shipping.shippingType}</td>
                          <td>{shipping.address}</td>
                          <td>{shipping.zipCode}</td>
                          <td>{shipping.shippeddat}</td>
                          <td>{shipping.email}</td>
                          <td>{shipping.totalCost}</td>
                          <td>{shipping.shippingStatus}</td>
                          <td>{shipping.phone}</td>                    
                          
                          <td>
                            <Link to={`/updateshipping/${shipping._id}`} className="btn btn-success btn-sm me-2">
                              <BsPencilSquare />
                            </Link>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(shipping._id)}>
                              <BsTrash />
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
    
  );
};

export default Shipping;