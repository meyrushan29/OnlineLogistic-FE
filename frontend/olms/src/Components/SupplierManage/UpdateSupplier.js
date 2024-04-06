import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function UpdateSupplier() {
    const { id } = useParams();
    const [SupplierID, setSupplierID] = useState('');
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [CompanyName, setCompanyName] = useState(''); 
    const [OrderID, setOrderID] = useState('');
    const[Country, setCountry]=useState('');

    const navigate = useNavigate();
    

    // Function to generate a random ID
    const generateRandomID = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    // Generate Supplier ID and Order ID when component mounts
    useEffect(() => {
        const newSupplierID = `SID${generateRandomID()}`;
        const newOrderID = `OID${generateRandomID()}`;
        setSupplierID(newSupplierID);
        setOrderID(newOrderID);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/getSupplier/' + id)
            .then(result => {
                console.log(result);
                setName(result.data.Name);
                setEmail(result.data.Email);
                setPhoneNumber(result.data.PhoneNumber);
                setCompanyName(result.data.CompanyName)
                setCountry(result.data.Country);
            })
            .catch(errr => console.log(errr));
    }, [id]);

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
    const validateName = (name) => {
      const re = /^[A-Za-z]+$/;
      return re.test(name);
    };
    const validateCountry = (country) => {
      const re = /^[A-Za-z]+$/;
      return re.test(country);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all required fields are filled
        if (!Name || !Email || !PhoneNumber || !CompanyName || !Country) {
            alert('Please fill in all required fields');
            return;
        }

        // Check if email is valid
        if (!validateEmail(Email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Check if PhoneNumber contains only numbers
        if (!/^\d+$/.test(PhoneNumber)) {
            alert('Phone Number should contain only numbers');
            return;
        }

        if (!validateName(Name)) {
          alert('Name should contain only letters');
          return;
        }
        if (!validateCountry(Country)) {
          alert('Country should contain only letters');
          return;
        }      

        axios.put(`http://localhost:3001/UpdateSupplier/${id}`, { Name, Email, PhoneNumber, CompanyName,Country })
            .then(result => {
                console.log(result);
                navigate('../supplier');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='flex h-75 justify-center items-center mt-10'>
            <div className='w-50 bg-gray-100 rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2 className='col-md-6 pl-14'>Edit Supplier Details</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder='Enter Name' className="form-control"
                            value={Name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="id">Supplier ID</label>
                        <input type="text" id="id" value={SupplierID} readOnly placeholder='Enter ID' className="form-control"  />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" id="phoneNumber" placeholder='Enter Phone number' className="form-control"
                            value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder='Enter Email' className="form-control"
                            value={Email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="companyName">Company Name</label>
                        <input type="text" id="companyName" placeholder='Enter Company Name' className="form-control"
                            value={CompanyName} onChange={(e) => setCompanyName(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="orderId">Order ID</label>
                        <input type="text" id="orderId" value={OrderID} readOnly placeholder='Enter Order ID' className="form-control" />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="Country">Country</label>
                        <input type="text" id="Country" placeholder='Enter Country' className="form-control"
                            value={Country} onChange={(e) => setCountry(e.target.value)} required />
                    </div>
                    <button type="submit" className="bg-cyan-800 text-white px-4 py-2 rounded mr-2">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateSupplier;