import React from 'react';
import { FaBars} from 'react-icons/fa';

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <nav className='bg-gray-800  px-8 py-3 flex justify-between'>
  <div className='flex items-center text-xl'>
    <FaBars className='text-white me-4 cursor-pointer' onClick={toggleSidebar} />
    <span className='text-white font-semibold'>Sri Lanka Logistic Services</span>
  </div>
</nav>

  );
}

export default Navbar;


