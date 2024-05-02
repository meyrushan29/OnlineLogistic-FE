import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const Home = () => {
  const [clientCount, setClientCount] = useState(null);
  const [supplierCount, setSupplierCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [complaintCount, setComplaintCount] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientResponse = await fetch('http://localhost:3001/api/admindashboard/clientcount');
        const supplierResponse = await fetch('http://localhost:3001/api/admindashboard/suppliercount');
        const orderResponse = await fetch('http://localhost:3001/api/admindashboard/ordercount');
        const complaintResponse = await fetch('http://localhost:3001/api/admindashboard/complientcount');

      //  if (!clientResponse.ok || !supplierResponse.ok || !orderResponse.ok || !complaintResponse.ok) {
      //    throw new Error('Failed to fetch data');
      //  }

        const clientData = await clientResponse.json();
        const supplierData = await supplierResponse.json();
        const orderData = await orderResponse.json();
        const complaintData = await complaintResponse.json();

        console.log('Client Data:', clientData); 
        console.log('Supplier Data:', supplierData); 
        console.log('Order Data:', orderData); 
        console.log('Complaint Data:', complaintData);

        setClientCount(clientData.count);
        setSupplierCount(supplierData.count);
        setOrderCount(orderData.count);
        setComplaintCount(complaintData.count);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Fetch data when component mounts
  }, []);

  const data = [
    { id: 0, value: clientCount, label: 'Clients' },
    { id: 1, value: supplierCount, label: 'Suppliers' },
    { id: 2, value: orderCount, label: 'Orders' },
    { id: 3, value: complaintCount, label: 'Complaints' }
  ];

  return (
    <div className="flex">
      <div className='w-[40%] h-[40%] bg-gradient-to-t from-cyan-50 bg-[#215E88] rounded-lg shadow-md  ml-72 '>
        <div className='flex flex-col justify-end items-center gap-28'>
          <div className='text-[32px] '>
            <label className='text-white font-serif mt-3'>Client, Supplier, Orders & Complaints</label>
          </div>
          <div className='mb-20'>
            <PieChart
              series={[
                {
                  data,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
              width={400}
              height={250}
            />
          </div>
        </div>
      </div>
      <div className='w-[40%] h-auto flex-wrap gap-16 ml-10 px-5'>
        <div className='grid grid-cols-2 gap-x-10 gap-y-2 font-serif'>
          <div className='flex flex-col gap-5 text-[20px] text-center justify-center rounded-lg items-center py-3 bg-green-500 shadow-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-green-300 duration-100 hover:text-white'>
            <label className='font-medium text-white'>Client Count</label>
            <label className='text-[26px] text-white'>{clientCount !== null ? clientCount : "Loading..."}</label>
          </div>
          <div className='flex flex-col gap-5 text-[20px] text-center justify-center rounded-lg items-center py-3 shadow-md bg-blue-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-blue-300 duration-100 hover:text-white'>
            <label className='font-medium text-white'>Supplier Count</label>
            <label className='text-[26px] text-white'>{supplierCount !== null ? supplierCount : "Loading..."}</label>
          </div>
          <div className='flex flex-col gap-5 mt-5 text-[20px] text-center justify-center rounded-lg items-center py-3 shadow-md bg-yellow-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-yellow-300 duration-100 hover:text-white'>
            <label className='font-medium text-white'>Order Count</label>
            <label className='text-[26px] text-white'>{orderCount !== null ? orderCount : "Loading..."}</label>
          </div>
          <div className='flex flex-col gap-5 mt-5 text-[20px] text-center justify-center rounded-lg items-center py-3 shadow-md bg-red-500 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-red-300 duration-100 hover:text-white'>
            <label className='font-medium text-white'>Complaint Count</label>
            <label className='text-[26px] text-white'>{complaintCount !== null ? complaintCount : "Loading..."}</label>
          </div>
        </div>
      </div>
    </div>  
  );
}

export default Home;
