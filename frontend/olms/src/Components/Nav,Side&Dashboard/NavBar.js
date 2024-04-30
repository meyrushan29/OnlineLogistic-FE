/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [loginTime, setLoginTime] = useState(new Date()); // Initialize login time
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  // Function to format date as "Day, Month Date, Year"
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Function to format time as "HH:MM:SS AM/PM"
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US');
  };

  // Function to format login time
  const formatLoginTime = (date) => {
    return date.toLocaleTimeString('en-US');
  };

  return (
    <nav className='bg-[#215E88]  px-9 py-2 flex justify-between mx-auto'>
      <div className='flex items-center text-xl'>
        <FaBars className='text-white me-4 cursor-pointer' onClick={toggleSidebar} />
        <span className='text-white font-semibold'>Sri Lanka Logistic Services</span>
      </div>
      <div className='text-white text-sm ml-96'>
        <div>{`Login Time: ${formatLoginTime(loginTime)}`}</div> {/* Display login time */}
        <div>{`${formatDate(currentDateTime)} ${formatTime(currentDateTime)}`}</div>
      </div>
    </nav>
  );
};

export default Navbar;

