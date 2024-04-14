import React from 'react';
import NavBar from './NavBar';

const DashBoard = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <div className={`w-full ${sidebarToggle ? "" : "md:ml-64"}`}>
      <NavBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
      <div className="mt-2 text-center">
        <h1 className="text-4xl font-bold text-blue-700">Welcome to the Srilanka Logistice Services Dashboard!</h1>
        <p className="text-gray-600">Feel free to explore and manage your tasks.</p>
      </div>
    </div>
  );
};

export default DashBoard;

