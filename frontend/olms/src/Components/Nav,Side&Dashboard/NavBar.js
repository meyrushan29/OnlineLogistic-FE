import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

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

  return (
    <nav className='bg-[#215E88] px-8 py-3 flex justify-between'>
      <div className='flex items-center text-xl'>
        <FaBars className='text-white me-4 cursor-pointer' onClick={toggleSidebar} />
        <span className='text-white font-semibold'>Sri Lanka Logistic Services</span>
      </div>
      <div className='text-white text-sm'>
        {formatDate(currentDateTime)} {formatTime(currentDateTime)}
      </div>
    </nav>
  );
};

export default Navbar;



