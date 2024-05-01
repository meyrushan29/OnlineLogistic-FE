
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateShipping = () => {
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [countryFrom, setCountryFrom] = useState('');
  const [countryTo, setCountryTo] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [shippingStatus, setShippingStatus] = useState('');
  const [shippingType, setShippingType] = useState('');
  
  const [cusName, setCustomerName] = useState('');
  const [shippeddat, setShippedDate] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [duplicateIdError, setDuplicateIdError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {        
        const shipmentId = `SID-${Math.floor(1000 + Math.random() * 2000)}`;
        const respon = await axios.post("http://localhost:3001/CreateShipping/", {
          shipmentId,
          shippingType,
          email,
          phone,
          zipCode,
          shippingStatus,
          shippeddat,
          address,
          cusName,
          countryFrom,
          countryTo,
          totalCost
          
        });
        console.log(respon);
        setSuccessMessage('Shipping added successfully');
        navigate('../Shipping'); 
      } catch (err) {
        console.log(err.respon.data);
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;


    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!phone.trim()) {
      errors.phone = "Phone is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone is invalid";
      isValid = false;
    }

    if (!address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!totalCost.trim()) {
      errors.totalCost = "Total Cost is required";
      isValid = false;
    }

    if (!countryTo.trim()) {
      errors.countryTo = "Country To is required";
      isValid = false;
    } 

    if (!countryFrom.trim()) {
        errors.countryFrom = "Country From is required";
        isValid = false;
      }


    if (!cusName.trim()) {
        errors.cusName = "Customer name is required";
        isValid = false;
      }
  

    if (!zipCode.trim()) {
        errors.zipCode = "ZipCode is required";
        isValid = false;
      }

    if (!shippingType.trim()) {
      errors.shippingType = "Shipping Type is required";
      isValid = false;
    }

    
    
      if (!shippeddat.trim()) {
        errors.shippeddat = "Shipped date required";
        isValid = false;
      }

    if (!shippingStatus.trim()) {
      errors.shippingStatus = "Shipping Status required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div className="container-fluid"  >
    <div className="row justify-content-center" >
      <div className="col-md-6">
        <div className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}> {/* Set background color with alpha value for transparency */}
          <div className="card-header" style={{ backgroundColor: '#353845', color: '#ffffff' }}>ADD Shipment</div>
          <div className="card-body">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'transparent' }}> 


                <div className="mb-3">
                  <label htmlFor="cusName" className="form-label" style={{ color: '#080808' }}>Customer Name</label>
                  <input type="text" className="form-control" id="cusName" value={cusName} onChange={(e) => setCustomerName(e.target.value)} />
                  {errors.clientName && <div className="text-danger">{errors.cusName}</div>}
                </div>


                <div className="mb-3">
                  <label htmlFor="countryFrom" className="form-label" style={{ color: '#080808' }}>Country From</label>
                  <input type="text" className="form-control" id="countryFrom" value={countryFrom}  onChange={(e) => {
                   const inputValue = e.target.value.replace(/[^a-zA-Z]/g, ''); // Remove non-letter characters
                    setCountryFrom(inputValue); }} />
                  {errors.countryFrom && <div className="text-danger">{errors.countryFrom}</div>}
                </div> 
                
                
                <div className="mb-3">
                  <label htmlFor="countryTo" className="form-label" style={{ color: '#080808' }}>country To</label>
                  <input type="text" className="form-control" id="countryTo" value={countryTo} onChange={(e) => {
                   const inputValue = e.target.value.replace(/[^a-zA-Z]/g, ''); // Remove non-letter characters
                   setCountryTo(inputValue); }} />
                  {errors.countryTo && <div className="text-danger">{errors.countryTo}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label" style={{ color: '#080808' }}>Address</label>
                  <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                  {errors.address && <div className="text-danger">{errors.address}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="zipCode" className="form-label" style={{ color: '#080808' }}>ZipCode</label>
                 <input  type="text"  className="form-control"  id="zipCode"  value={zipCode}  onChange={(e) => {
                   const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                    setZipCode(inputValue.substring(0, 5)); // Limit to 5 characters
                    }} pattern="[0-9]{5}" // Allow only 5 digits title="Please enter 5 digits" maxLength="5" // Limit maximum length to 5 characters
                     minLength="5" // Ensure minimum length is 5 characters min="00501" // Minimum value max="99999" // Maximum value
                   /> {errors.zipCode && <div className="text-danger">{errors.zipCode}</div>}
                 </div>




                <div className="mb-3">
                  <label htmlFor="phone" className="form-label" style={{ color: '#080808' }}>Phone</label>
                   <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => {
                   const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                   setPhone(inputValue.substring(0, 10)); // Limit to 10 digits
                 }} 
                   pattern="[0-9]{10}" // Allow only 10 digits
                   title="Please enter 10 digits "
                  /> {errors.phone && <div className="text-danger">{errors.phone}</div>}
                 </div>



                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ color: '#080808' }}>Email</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                

                <div className="mb-3">
                  <label htmlFor="shippingType" className="form-label" style={{ color: '#080808' }}>Shipping Type</label>
                  <select className="form-select" id="shippingType" value={shippingType} onChange={(e) => setShippingType(e.target.value)}>
                    <option value="">Select Shipping Type</option>
                    <option value="Air-Fright">Air-Fright</option>
                    <option value="Sea-Fright">Sea-Fright</option>
                  </select>
                  {errors.shippingType && <div className="text-danger">{errors.shippingType}</div>}
                </div>
                

                <div className="mb-3">
                  <label htmlFor="shippeddat" className="form-label" style={{ color: '#080808' }}>Shipped Date</label>
                  <input type="date" className="form-control" id="shippeddat" value={shippeddat} onChange={(e) => setShippedDate(e.target.value)} />
                  {errors.shippeddat && <div className="text-danger">{errors.shippeddat}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="totalCost" className="form-label" style={{ color: '#080808' }}>Total Cost</label>
                  <input type="text" className="form-control" id="totalCost" value={totalCost} onChange={(e) => setTotalCost(e.target.value)} placeholder="00.00"/>
                  {errors.totalCost && <div className="text-danger">{errors.totalCost}</div>}
                </div> 
                

                <div className="mb-3">
                  <label htmlFor="shippingStatus" className="form-label" style={{ color: '#080808' }}>Shipping Status</label>
                  <select className="form-select" id="shippingStatus" value={shippingStatus} onChange={(e) => setShippingStatus(e.target.value)}>
                    <option value="">Select Shipping Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Pre-Transit">Pre-Transit</option>
                    <option value="In-Transit">In-Transit</option>
                    <option value="Out-of-delivery">Out-of-delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  {errors.shippingStatus && <div className="text-danger">{errors.shippingStatus}</div>}
                </div>


                <div className="text-center"> {/* Wrap the button in a div with text-center class */}
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateShipping;