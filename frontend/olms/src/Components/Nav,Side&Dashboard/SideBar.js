import React from 'react';
import { FaHome, FaUser, FaUsers, FaClipboardList, FaTruck, FaBox, FaWarehouse, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const SideBar = ({ sidebarToggle }) => {
  return (
    <div className={`${sidebarToggle ? "hidden" : "block"} w-64 bg-gray-800 fixed h-full px-4 py-2`}>
      <div className='my-2 '>
        <h1 className='text-2xl text-white font-bold'> -- Dashboard --</h1>
      </div>
      <hr />
      <ul className='mt-3 text-white font-bold'>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
        <Link to="/home" className="flex items-center text-white">
            <FaHome className='inline-block w-6 h-6 mr-2 mt-2 text-white' />
            <div>Home</div>
          </Link>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <Link to="/client" className="flex items-center text-white">
            <FaUser className='inline-block w-6 h-6 mr-2 mt-2 text-white' />
            Client Management
          </Link>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
        <Link to="/supplier" className="flex items-center text-white">
            <FaUsers className='inline-block w-6 h-6 mr-2 mt-2 text-white' />
            Supplier Management
          </Link>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <div>
            <FaClipboardList className='inline-block w-6 h-6 mr-2 mt-2 text-white' />
            Orders
          </div>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <div>
            <FaTruck className='inline-block w-6 h-6 mr-2 mt-2 text-white' />
            Shipping Management
          </div>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <div>
            <FaBox className='inline-block w-6 h-6 mr-2 mt-2 text-white' />
            Inventory
          </div>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <div>
            <FaWarehouse className='inline-block w-6 h-6 mr-2 mt-2 text-white' />
            Warehouse
          </div>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <div>
            <FaHeadset className='inline-block w-6 h-6 mr-2 mt-2 text-white' />
            Customer Support
          </div>
        </li>    
      </ul>
    </div>
  );
};

export default SideBar;
