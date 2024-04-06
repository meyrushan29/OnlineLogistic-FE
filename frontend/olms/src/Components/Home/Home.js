import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBoxes, faClipboardList, faExclamationTriangle, faShoppingCart, faUsers } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [clientCount, setClientCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [complaintsCount, setComplaintsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [shipmentsCount, setShipmentsCount] = useState(0);
  const [warehouseCount, setWarehouseCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchClient = fetch('api/clients');
        const fetchSupplier = fetch('api/suppliers');
        const fetchComplaints = fetch('api/complaints');
        const fetchOrders = fetch('api/orders');
        const fetchShipments = fetch('api/shipments');
        const fetchWarehouse = fetch('api/warehouse');

        const [clientResponse, supplierResponse, complaintsResponse, ordersResponse, shipmentsResponse, warehouseResponse] =
          await Promise.all([fetchClient, fetchSupplier, fetchComplaints, fetchOrders, fetchShipments, fetchWarehouse]);

        const [clientData, supplierData, complaintsData, ordersData, shipmentsData, warehouseData] =
          await Promise.all([
            clientResponse.json(),
            supplierResponse.json(),
            complaintsResponse.json(),
            ordersResponse.json(),
            shipmentsResponse.json(),
            warehouseResponse.json(),
          ]);

        if (clientData.count !== clientCount ||
          supplierData.count !== supplierCount ||
          complaintsData.count !== complaintsCount ||
          ordersData.count !== ordersCount ||
          shipmentsData.count !== shipmentsCount ||
          warehouseData.count !== warehouseCount) {
          setShowNotification(true);
        }

        setClientCount(clientData.count);
        setSupplierCount(supplierData.count);
        setComplaintsCount(complaintsData.count);
        setOrdersCount(ordersData.count);
        setShipmentsCount(shipmentsData.count);
        setWarehouseCount(warehouseData.count);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [clientCount, supplierCount, complaintsCount, ordersCount, shipmentsCount, warehouseCount]);

  return (
    <div className="flex justify-center ml-10 mr-auto">
      <div>
        {showNotification && <Notification />}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-5 mx-10">
          <DashboardCard title="Total Clients" count={clientCount} color="bg-blue-500" icon={faUser} size="300px" />
          <DashboardCard title="Total Suppliers" count={supplierCount} color="bg-green-500" icon={faUsers} size="300px" />
          <DashboardCard title="Total Complaints" count={complaintsCount} color="bg-red-500" icon={faExclamationTriangle} size="300px" />
          <DashboardCard title="Total Orders" count={ordersCount} color="bg-yellow-500" icon={faShoppingCart} size="300px" />
          <DashboardCard title="Total Shipments" count={shipmentsCount} color="bg-purple-500" icon={faClipboardList} size="300px" />
          <DashboardCard title="Total Warehouses" count={warehouseCount} color="bg-pink-500" icon={faBoxes} size="300px" />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, count, color, icon, size }) => {
  return (
    <div className={`rounded-lg ${color} px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6 border border-yellow-500`} style={{ width: size, minWidth: '200px', maxWidth: '400px', height: '200px' }}>
      <FontAwesomeIcon icon={icon} className="text-4xl text-gray-100 mx-auto" />
      <p className="text-sm font-medium text-gray-300 text-center mt-2">{title}</p>
      <p className="text-2xl font-semibold text-gray-100 text-center">{count}</p>
    </div>
  );
};

const Notification = () => {
  return (
    <div className="fixed top-0 right-0 p-3 m-5 bg-blue-500 text-white font-bold">
      New Update Available!
    </div>
  );
};

export default Dashboard;


