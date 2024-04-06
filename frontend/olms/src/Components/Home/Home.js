import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faBoxes, 
  faClipboardList, 
  faExclamationTriangle, 
  faShoppingCart, 
  faUsers, 
  faBell 
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [clientCount, setClientCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [supplierCount, setSupplierCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [complaintsCount, setComplaintsCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [ordersCount, setOrdersCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [shipmentsCount, setShipmentsCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [warehouseCount, setWarehouseCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [currencyRates, setCurrencyRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setCurrencyRates(response.data.rates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const filteredCurrencyRates = {
    USD: currencyRates['USD'],
    LKR: currencyRates['LKR']
  };

  return (
    <div className="flex justify-center ml-10 mr-auto mb-0">
      <div className='mt-0'>
        <div className=" mx-10 ml-10  ">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Currency Rates</h2>
          <div className="grid grid-cols-2 gap-2">
            {loading ? (
              <p>Loading...</p>
            ) : (
              Object.entries(filteredCurrencyRates).map(([currency, rate]) => (
                <div key={currency} className="bg-gray-100 p-2 rounded-lg">
                  <p className="text-sm font-semibold">{currency === 'USD' ? 'USD' : 'LKR'}</p>
                  <p className="text-xs text-gray-600">{currency === 'USD' ? '$' : '₹'}{rate.toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
        </div>
        {showNotification && <Notification />}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4 mx-10">
          <DashboardCard title="Total Clients" count={clientCount} color="bg-blue-500" icon={faUser} size="300px" hasUpdate={clientCount !== 0} />
          <DashboardCard title="Total Suppliers" count={supplierCount} color="bg-green-500" icon={faUsers} size="300px" hasUpdate={supplierCount !== 0} />
          <DashboardCard title="Total Complaints" count={complaintsCount} color="bg-red-500" icon={faExclamationTriangle} size="300px" hasUpdate={complaintsCount !== 0} />
          <DashboardCard title="Total Orders" count={ordersCount} color="bg-yellow-500" icon={faShoppingCart} size="300px" hasUpdate={ordersCount !== 0} />
          <DashboardCard title="Total Shipments" count={shipmentsCount} color="bg-purple-500" icon={faClipboardList} size="300px" hasUpdate={shipmentsCount !== 0} />
          <DashboardCard title="Total Warehouses" count={warehouseCount} color="bg-pink-500" icon={faBoxes} size="300px" hasUpdate={warehouseCount !== 0} />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, count, color, icon, size, hasUpdate }) => {
  return (
    <div className={`relative rounded-lg ${color} px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6 border border-yellow-500`} style={{ width: size, minWidth: '200px', maxWidth: '400px', height: '200px' }}>
      {hasUpdate && (
        <div className="absolute top-0 right-0 mr-2 mt-2">
          <FontAwesomeIcon icon={faBell} className="text-yellow-500 text-lg" />
        </div>
      )}
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


