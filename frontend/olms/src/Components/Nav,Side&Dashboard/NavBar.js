import React from 'react';
import { FaBars,  FaSearch } from 'react-icons/fa';

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <nav className='bg-[#1CD2E1]  px-8 py-3 flex justify-between'>
  <div className='flex items-center text-xl'>
    <FaBars className='text-white me-4 cursor-pointer' onClick={toggleSidebar} />
    <span className='text-white font-semibold'>Sri Lanka Logistic Services</span>
  </div>
  <div className='relative md:w-65'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
            <button className='p-1 focus:outline-none text-white md:text-black'><FaSearch /></button>
          </span> 
          <input type="text" className='w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block' />  
  </div>
</nav>

  );
}

export default Navbar;


