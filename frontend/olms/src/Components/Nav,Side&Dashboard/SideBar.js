import React from 'react';
import { FaHome, FaUser, FaUsers, FaClipboardList, FaTruck, FaBox, FaWarehouse, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideBar = ({ sidebarToggle }) => {
  return (
    <div className={`${sidebarToggle ? "hidden" : "block"} w-64 bg-gray-800 fixed h-full px-4 py-2`}>
      <div className='my-2'>
        <h1 className='text-2xl text-white font-bold'> -- Dashboard --</h1>
      </div>
      <hr />
      <br />
      <ul className='mt-4 text-white font-bold'>
        <li className='mb-4 rounded hover:shadow hover:bg-blue-500 '>
          <Link to="/home" className="flex items-center text-white px-2 py-2">
            <FaHome className='inline-block w-6 h-6 mr-4' />
            <div>Home</div>
          </Link>
        </li>
        <li className='mb-4 rounded hover:shadow hover:bg-blue-500'>
          <Link to="/client" className="flex items-center text-white px-2 py-2">
            <FaUser className='inline-block w-6 h-6 mr-4' />
            Client Management
          </Link>
        </li>
        <li className='mb-4 rounded hover:shadow hover:bg-blue-500'>
          <Link to="/supplier" className="flex items-center text-white px-2 py-2">
            <FaUsers className='inline-block w-6 h-6 mr-4' />
            Supplier Management
          </Link>
        </li>
        <li className='mb-4 rounded hover:shadow hover:bg-blue-500'>
          <Link to="/order" className="flex items-center text-white px-2 py-2">
            <FaClipboardList className='inline-block w-6 h-6 mr-4' />
            Orders
          </Link>
        </li>
        <li className='mb-4 rounded hover:shadow hover:bg-blue-500'>
          <Link to="/shipping" className="flex items-center text-white px-2 py-2">
            <FaTruck className='inline-block w-6 h-6 mr-4' />
            Shipping Management
          </Link>
        </li>
        <li className='mb-4 rounded hover:shadow hover:bg-blue-500'>
          <Link to="/inventory" className="flex items-center text-white px-2 py-2">
            <FaBox className='inline-block w-6 h-6 mr-4' />
            Inventory
          </Link>
        </li>
        <li className='mb-4 rounded hover:shadow hover:bg-blue-500'>
          <Link to="/warehouse" className="flex items-center text-white px-2 py-2">
            <FaWarehouse className='inline-block w-6 h-6 mr-4' />
            Warehouse
          </Link>
        </li>
        <li className='mb-4 rounded hover:shadow hover:bg-blue-500'>
          <Link to="/support" className="flex items-center text-white px-2 py-2">
            <FaHeadset className='inline-block w-6 h-6 mr-4' />
            Customer Support
          </Link>
        </li>    
      </ul>
    </div>
  );
};

export default SideBar;



