import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateSupplier = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [CompanyName, setCompanyName] = useState('');
    const [SupplierID, setSupplierID] = useState('');
    const [OrderID, setOrderID] = useState('');
    const[Country, setCountry]=useState('');
    const navigate = useNavigate();

    // Function to generate a random ID
    const generateRandomID = () => {
       return Math.random().toString(36).substr(2, 9);
         
        
    };

    // Generate Supplier ID and Order ID when component mounts
    useState(() => {
        const newSupplierID = `SID${generateRandomID()}`;
        const newOrderID = `OID${generateRandomID()}`;
        setSupplierID(newSupplierID);
        setOrderID(newOrderID);
    }, []);

    // Function to validate email
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

        axios.post("http://localhost:3001/CreateSupplier", { SupplierID, Name, Email, PhoneNumber, CompanyName, OrderID,Country })
            .then(result => {
                console.log(result);
                navigate('../supplier');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="flex h-screen bg-indigo-100 justify-center items-center">
            <div className="w-full md:w-1/2 bg-gray-200 rounded p-4">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold col-md-6 pl-14">Add Supplier</h2>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2">Supplier Name</label>
                        <input type="text" id="name" placeholder="Enter Name" className="form-control"
                            onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
                        <input type="text" id="phoneNumber" placeholder="Enter Phone Number" className="form-control"
                            onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email Address</label>
                        <input type="email" id="email" placeholder="Enter Email" className="form-control"
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="companyName" className="block mb-2">Company Name</label>
                        <input type="text" id="companyName" placeholder="Enter Company Name" className="form-control"
                            onChange={(e) => setCompanyName(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="Country" className="block mb-2">Country</label>
                        <input type="text" id="Countery" placeholder="Enter Country" className="form-control"
                            onChange={(e) => setCountry(e.target.value)} required />
                    </div>
                    <button type="submit" className="bg-cyan-800 text-white px-4 py-2 rounded mr-2">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateSupplier;