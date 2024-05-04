import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';


const UpdateShipping = () => {
  const { id } = useParams();
  const [shipping, setShipping] = useState({

    shipmentId: "",
    shippingType: "",
    email: "",
    phone: "",
    zipCode: "",
    shippingStatus: "",
    shippeddat: "",
    address: "",
    cusName: "",
    countryFrom: "",
    countryTo: "",
    totalCost: ""   
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getShipping/${id}`)
      .then(respon => {
        const { shipmentId, shippingType, email, phone, address, totalCost, countryTo, countryFrom,cusName,shippeddat,shippingStatus ,zipCode} = respon.data;
        setShipping({ shipmentId, shippingType, email, phone, address, totalCost, countryTo, countryFrom,cusName,shippeddat,shippingStatus,zipCode });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    //shipping id validation function
    if (!shipping.shippingId.trim()) {
      errors.shipmentId = "Shipping ID is required";
    }
    if (!shipping.shippingType.trim()) {
      errors.shippingType = "Shipping Type is required";
    }
    if (!shipping.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(shipping.email)) {
      errors.email = "Email address is invalid";
    }
    //phone number validation function
    if (!shipping.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(shipping.phone)) {
      errors.phone = "Phone number is invalid";
    }
    //address validation function
    if (!shipping.address.trim()) {
      errors.address = "Address is required";
    }
    //shipped date validation function
    if (!shipping.shippeddat.trim()) {
      errors.shippeddat = "Shipping Date is required";
    }
    //shipping status validation function
    if (!shipping.shippingStatus.trim()) {
      errors.shippingStatus = "Shipping Status is required";
    }
    //zip code validation function
    if (!shipping.zipCode.trim()) {
      errors.zipCode = "Zip Code is required";
    }
    //totalcost validation function
    if (!shipping.totalCost.trim()) {
      errors.totalCost = "Total Cost is required";
    }
    //country from validation function
    if (!shipping.countryFrom.trim()) {
      errors.countryFrom = "Country From is required";
    }
    //country to validation function
    if (!shipping.countryTo.trim()) {
      errors.countryTo = "Country To is required";
    }
    //customer name validation function
    if (!shipping.cusName.trim()) {
      errors.cusName = "Customer Name is required";
    }
   
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      axios.put(`http://localhost:3001/UpdateShipping/${id}`, shipping)
        .then(() => {
          console.log("Shipping updated successfully!");
          navigate('../Shipping');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="container-fluid justify-center"  >
     
      <div className="w-1/2  rounded-lg p-6 shadow-md mx-auto "style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }} >
      
        <form onSubmit={handleSubmit} >
          <h2 className="text-lg font-semibold mb-4  text-center">Update Shipping</h2>
          <div className="mb-4" >
            <label htmlFor="shipmentIdntId" className="block mb-1">Shipping ID</label>
            <input
              type="text"
              id="shipmentId"
              name="shipmentId"
              value={shipping.shipmentId}
              placeholder="Enter Shipping ID"
              className="form-control"
              onChange={handleChange}
            />
            {errors.shipmentId && <p className="text-red-500">{errors.shipmentId}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="cusName" className="block mb-1">Customer Name</label>
            <input
              type="text"
              id="cusName"
              name="cusName"
              value={shipping.cusName}
              placeholder="Enter Customer Name"
              className="form-control"
              onChange={handleChange}
            />
            {errors.cusName && <p className="text-red-500">{errors.cusName}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">E-mail</label>
            <input
              type="text"
              id="email"
              name="email"
              value={shipping.email}
              placeholder="Enter E-mail Address"
              className="form-control"
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={shipping.phone}
              placeholder="Enter Phone Number"
              className="form-control"
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block mb-1">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shipping.address}
              placeholder="Enter Shipping Address"
              className="form-control"
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="totalCost" className="block mb-1">Total Cost</label>
            <input
              type="text"
              id="totalCost"
              name="totalCost"
              value={shipping.totalCost}
              placeholder="Enter Total Cost"
              className="form-control"
              onChange={handleChange}
            />
            {errors.totalCost && <p className="text-red-500">{errors.totalCost}</p>}
          </div> 


          <div className="mb-4">
            <label htmlFor="countryTo" className="block mb-1">Country To</label>
            <input
              type="text"
              id="countryTo"
              name="countryTo"
              value={shipping.countryTo}
              placeholder="Enter Country To"
              className="form-control"
              onChange={handleChange}
            />
            {errors.countryTo && <p className="text-red-500">{errors.countryTo}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="countryFrom" className="block mb-1">Country From</label>
            <input
              type="text"
              id="countryFrom"
              name="countryFrom"
              value={shipping.countryFrom}
              placeholder="Enter Country From"
              className="form-control"
              onChange={handleChange}
            />
            {errors.countryFrom && <p className="text-red-500">{errors.countryFrom}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="shippingType" className="block mb-1">Shipping Type</label>
            <select
              id="shippingType"
              name="shippingType"
              value={shipping.shippingType}
              className="form-control"
              onChange={handleChange}
            >
              <option value="">Select Shipping Type </option>
              <option value="Sea-Fright">Sea-Fright</option>
              <option value="Air-Fright">Air-Fright</option>
            </select>
            {errors.shippingType && <p className="text-red-500">{errors.shippingType}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="zipCode" className="block mb-1">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={shipping.zipCode}
              placeholder="Enter Zip Code"
              className="form-control"
              onChange={handleChange}
            />
            {errors.zipCode && <p className="text-red-500">{errors.zipCode}</p>}
          </div>


          <div className="mb-4">
            <label htmlFor="shippeddat" className="block mb-1">Shipped  Date</label>
            <select
             type="date"
              id="shippeddat"
              name="shippeddat"
              value={shipping.shippeddat}
              className="form-control"
              onChange={handleChange}
            ></select>
            {errors.shippeddat && <p className="text-red-500">{errors.shippeddat}</p>}
          </div>


          <div className="mb-4">
            <label htmlFor="shippingStatus" className="block mb-1">Shipping Status</label>
            <select
              id="shippingStatus"
              name="shippingStatus"
              value={shipping.shippingStatus}
              className="form-control"
              onChange={handleChange}
            >
              <option value="">Shipping Status</option>
                   <option value="Pending">Pending</option>
                    <option value="Pre-Transit">Pre-Transit</option>
                    <option value="In-Transit">In-Transit</option>
                    <option value="Out-of-delivery">Out-of-delivery</option>
                    <option value="Delivered">Delivered</option>

            </select>
            {errors.shippingStatus && <p className="text-red-500">{errors.shippingStatus}</p>}
          </div>


          <div>
            <button type="submit" className="btn btn-success">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateShipping;