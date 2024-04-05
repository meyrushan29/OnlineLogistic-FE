import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [clientCount, setClientCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [complaintsCount, setComplaintsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [shipmentsCount, setShipmentsCount] = useState(0);
  const [currentDate, setCurrentDate] = useState('');

  // Function to get the current date
  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Simulated API call to fetch data
  useEffect(() => {
    // Simulated API call to fetch client count
    fetch('api/clients')
      .then(response => response.json())
      .then(data => setClientCount(data.count))
      .catch(error => console.error('Error fetching client count:', error));

    // Simulated API call to fetch supplier count
    fetch('api/suppliers')
      .then(response => response.json())
      .then(data => setSupplierCount(data.count))
      .catch(error => console.error('Error fetching supplier count:', error));

    // Simulated API call to fetch complaints count
    fetch('api/complaints')
      .then(response => response.json())
      .then(data => setComplaintsCount(data.count))
      .catch(error => console.error('Error fetching complaints count:', error));

    // Simulated API call to fetch orders count
    fetch('api/orders')
      .then(response => response.json())
      .then(data => setOrdersCount(data.count))
      .catch(error => console.error('Error fetching orders count:', error));

    // Simulated API call to fetch shipments count
    fetch('api/shipments')
      .then(response => response.json())
      .then(data => setShipmentsCount(data.count))
      .catch(error => console.error('Error fetching shipments count:', error));

    // Set current date
    setCurrentDate(getCurrentDate());
  }, []);

  return (
    <div className="flex justify-center">
      <div>
        <h3 className="text-base font-semibold leading-6 text-gray-900 text-center">{currentDate}</h3>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-5 mx-10">
          <DashboardCard title="Client Count" count={clientCount} color="bg-blue-500" />
          <DashboardCard title="Supplier Count" count={supplierCount} color="bg-green-500" />
          <DashboardCard title="Complaints Count" count={complaintsCount} color="bg-red-500" />
          <DashboardCard title="Orders Count" count={ordersCount} color="bg-yellow-500" />
          <DashboardCard title="Shipments Count" count={shipmentsCount} color="bg-purple-500" />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, count, color }) => {
  return (
    <div className={`rounded-lg ${color} px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6 border border-yellow-500`} style={{width: '300px', height: '200px'}}>
      <p className="text-sm font-medium text-gray-300 text-center">{title}</p>
      <p className="text-2xl font-semibold text-gray-100 text-center">{count}</p>
    </div>
  );
};

export default Dashboard;


