import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTruck, faBoxes, faClipboardList, faExclamationTriangle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [clientCount, setClientCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [complaintsCount, setComplaintsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [shipmentsCount, setShipmentsCount] = useState(0);
  const [warehouseCount, setWarehouseCount] = useState(0); // New state for warehouse count
  // eslint-disable-next-line no-unused-vars
  const [currentDate, setCurrentDate] = useState('');

  // Function to get the current date
  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Simulated API call to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientResponse = await fetch('api/clients');
        const clientData = await clientResponse.json();
        setClientCount(clientData.count);

        const supplierResponse = await fetch('api/suppliers');
        const supplierData = await supplierResponse.json();
        setSupplierCount(supplierData.count);

        const complaintsResponse = await fetch('api/complaints');
        const complaintsData = await complaintsResponse.json();
        setComplaintsCount(complaintsData.count);

        const ordersResponse = await fetch('api/orders');
        const ordersData = await ordersResponse.json();
        setOrdersCount(ordersData.count);

        const shipmentsResponse = await fetch('api/shipments');
        const shipmentsData = await shipmentsResponse.json();
        setShipmentsCount(shipmentsData.count);

        const warehouseResponse = await fetch('api/warehouse');
        const warehouseData = await warehouseResponse.json();
        setWarehouseCount(warehouseData.count);

        setCurrentDate(getCurrentDate());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center ml-10 mr-auto">
      <div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-5 mx-10">
          <DashboardCard title="Total Clients" count={clientCount} color="bg-blue-500" icon={faUser} size="300px" />
          <DashboardCard title="Total Suppliers" count={supplierCount} color="bg-green-500" icon={faTruck} size="300px" />
          <DashboardCard title="Total Complaints" count={complaintsCount} color="bg-red-500" icon={faExclamationTriangle} size="300px" />
          <DashboardCard title="Total Orders" count={ordersCount} color="bg-yellow-500" icon={faShoppingCart} size="300px" />
          <DashboardCard title="Total Shipments" count={shipmentsCount} color="bg-purple-500" icon={faClipboardList} size="300px" />
          <DashboardCard title="Total Warehouses" count={warehouseCount} color="bg-pink-500" icon={faBoxes} size="300px" /> {/* New card for warehouse count */}
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, count, color, icon, size }) => {
  return (
    <div className={`rounded-lg ${color} px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6 border border-yellow-500`} style={{width: size, height: '200px'}}>
      <FontAwesomeIcon icon={icon} className="text-4xl text-gray-100 mx-auto" />
      <p className="text-sm font-medium text-gray-300 text-center mt-2">{title}</p>
      <p className="text-2xl font-semibold text-gray-100 text-center">{count}</p>
    </div>
  );
};

export default Dashboard;
