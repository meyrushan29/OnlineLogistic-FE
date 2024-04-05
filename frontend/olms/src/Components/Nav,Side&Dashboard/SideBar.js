import React from 'react';
import { FaHome, FaUser, FaUsers, FaClipboardList, FaTruck, FaBox, FaWarehouse, FaHeadset, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const SideBar = ({ sidebarToggle }) => {
  return (
    <div className={`${sidebarToggle ? "hidden" : "block"} w-64 bg-gray-800 fixed h-full px-4 py-2`}>
      <div className='my-2 mb-4'>
        <h1 className='text-2xl text-white font-bold'>Admin Dashboard</h1>
      </div>
      <hr />
      <ul className='mt-3 text-white font-bold'>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <div>
            <FaHome className='inline-block w-6 h-6 mr-2 mt-2' />
            Home
          </div>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <Link to="/client" className="flex items-center">
            <FaUser className='inline-block w-6 h-6 mr-2 mt-2' />
            Client Management
          </Link>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
        <Link to="/supplier" className="flex items-center">
            <FaUsers className='inline-block w-6 h-6 mr-2 mt-2' />
            Supplier Management
          </Link>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <div>
            <FaClipboardList className='inline-block w-6 h-6 mr-2 mt-2' />
            Orders
          </div>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <div>
            <FaTruck className='inline-block w-6 h-6 mr-2 mt-2' />
            Shipping Management
          </div>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <div>
            <FaBox className='inline-block w-6 h-6 mr-2 mt-2' />
            Inventory
          </div>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <div>
            <FaWarehouse className='inline-block w-6 h-6 mr-2 mt-2' />
            Warehouse
          </div>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <div>
            <FaHeadset className='inline-block w-6 h-6 mr-2 mt-2' />
            Customer Support
          </div>
        </li>
        <hr />
        
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <div>
            {/* Assuming you want to use the FaSignOutAlt icon for logout */}
            <FaSignOutAlt className='inline-block w-6 h-6 mr-2 mt-2' />
            LogOut
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
