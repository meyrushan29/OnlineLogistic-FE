import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateClient = () => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const clientId = `CID-${Math.floor(1000 + Math.random() * 9000)}`;
        const response = await axios.post("http://localhost:3001/CreateClient", {
          clientId,
          clientName,
          email,
          phone,
          address,
          gender,
          billingAddress,
          status
        });
        console.log(response);
        setSuccessMessage('Client added successfully');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('../Client');
        }, 3000);
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!clientName.trim()) {
      errors.clientName = "Client Name is required";
      isValid = false;
    }

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

    if (!gender.trim()) {
      errors.gender = "Gender is required";
      isValid = false;
    }

    if (!billingAddress.trim()) {
      errors.billingAddress = "Billing Address is required";
      isValid = false;
    }

    if (!status.trim()) {
      errors.status = "Status is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Add Client</div>
            <div className="card-body">
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="clientName" className="form-label">Client Name</label>
                  <input type="text" className="form-control" id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} />
                  {errors.clientName && <div className="text-danger">{errors.clientName}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                  {errors.address && <div className="text-danger">{errors.address}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">Gender</label>
                  <select className="form-select" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <div className="text-danger">{errors.gender}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="billingAddress" className="form-label">Billing Address</label>
                  <textarea className="form-control" id="billingAddress" rows="3" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)}></textarea>
                  {errors.billingAddress && <div className="text-danger">{errors.billingAddress}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {errors.status && <div className="text-danger">{errors.status}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClient;
