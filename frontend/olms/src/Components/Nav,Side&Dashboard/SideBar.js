import React from 'react';
import { FaHome, FaUser, FaUsers, FaClipboardList, FaTruck, FaBox, FaWarehouse,FaSignOutAlt, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideBar = ({ sidebarToggle }) => {
  const handleLogout = () => {

    console.log("Logout clicked"); 
  };

  return (
    <div className={`${sidebarToggle ? "hidden" : "block"} w-64 bg-[#215E88] fixed h-full px-4 py-2`}>
      <div className='my-2'>
        <h1 className='text-2xl text-white font-bold'>  - Dashboard - </h1>
      </div>
      <hr />
      <ul className='mt-3 text-white font-bold'>
        <li className='mb-3 rounded hover:shadow hover:bg-blue-400 '>
          <Link to="/home" className="flex items-center text-white px-2 py-2">
            <FaHome className='inline-block w-6 h-6 mr-4' />
            <div>Home</div>
          </Link>
        </li>
        <br />
        <li className='mb-3 rounded hover:shadow hover:bg-blue-400'>
          <Link to="/client" className="flex items-center text-white px-2 py-2">
            <FaUser className='inline-block w-6 h-6 mr-4' />
            Client
          </Link>
        </li>
        <br />
        <li className='mb-3 rounded hover:shadow hover:bg-blue-400'>
          <Link to="/supplier" className="flex items-center text-white px-2 py-2">
            <FaUsers className='inline-block w-6 h-6 mr-4' />
            Supplier 
          </Link>
        </li>
        <br />
        <li className='mb-3 rounded hover:shadow hover:bg-blue-400'>
          <Link to="/order" className="flex items-center text-white px-2 py-2">
            <FaClipboardList className='inline-block w-6 h-6 mr-4' />
            Orders
          </Link>
        </li>
        <br />
        <li className='mb-3 rounded hover:shadow hover:bg-blue-400'>
          <Link to="/shipping" className="flex items-center text-white px-2 py-2">
            <FaTruck className='inline-block w-6 h-6 mr-4' />
            Shipping 
          </Link>
        </li>
        <br />
        <li className='mb-3 rounded hover:shadow hover:bg-blue-400'>
          <Link to="/inventory" className="flex items-center text-white px-2 py-2">
            <FaBox className='inline-block w-6 h-6 mr-4' />
            Inventory
          </Link>
        </li>
        <br />
        <li className='mb-3 rounded hover:shadow hover:bg-blue-400'>
          <Link to="/warehouse" className="flex items-center text-white px-2 py-2">
            <FaWarehouse className='inline-block w-6 h-6 mr-4' />
            Warehouse
          </Link>
        </li>
        <br />
        <li className='mb-3 rounded hover:shadow hover:bg-blue-400'>
          <Link to="/customersupport" className="flex items-center text-white px-2 py-2">
          <FaHeadset className='inline-block w-6 h-6 mr-4' />
          Support
         </Link>
         <hr />
      </li>
        <li className='mb-3 rounded hover:shadow hover:bg-blue-400'>
          <button onClick={handleLogout} className="flex items-center text-white px-1 py-">
            <FaSignOutAlt className='inline-block w-6 h-6 mr-4' />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
