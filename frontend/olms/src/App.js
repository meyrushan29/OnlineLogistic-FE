import './App.css';
import React, { useState } from 'react';
import SideBar from './Components/Nav,Side&Dashboard/SideBar';
import DashBoard from './Components/Nav,Side&Dashboard/DashBoard';
import 'bootstrap/dist/css/bootstrap.min.css'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Client from './Components/ClientManage/Client';
import CreateClient from './Components/ClientManage/CreateClient';
import UpdateClient from './Components/ClientManage/UpdateClient';
import CreateSupplier from './Components/SupplierManage/CreateSupplier';
import UpdateSupplier from './Components/SupplierManage/UpdateSupplier';
import Supplier from './Components/SupplierManage/supplier';
import Home from './Components/Home/Home';
import MakeOrder from './Components/OrderManage/MakeOrder';
import OrderTable from './Components/OrderManage/OrderTable';
import EditOrder from './Components/OrderManage/EditOrder';
import Register from './Components/Login&Registation/Register';
import Login from './Components/Login&Registation/Login';
import Customersupport from './Components/CustomerManage/Customersupport';
import CreateTicket from './Components/CustomerManage/CreateTicket';
import UpdateTicket from './Components/CustomerManage/UpdateTicket';

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  return ( 
    <BrowserRouter>
      {/* Conditional rendering for Sidebar and Dashboard */}
      {window.location.pathname !== '/reg' && window.location.pathname !== '/' &&
        <>
          <div className='flex'>
          <SideBar sidebarToggle={sidebarToggle} />
          <DashBoard sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
          </div>
        </>
      }
      <Routes>
        <Route path='/client' element={<Client/>}></Route>
        <Route path='/create' element={<CreateClient/>}></Route>
        <Route path='/update/:id' element={<UpdateClient/>}></Route>
        <Route path='/supplier' element={<Supplier/>}></Route>
        <Route path='/createsp' element={<CreateSupplier/>}></Route>
        <Route path='/updatesp/:id' element={<UpdateSupplier/>}></Route>  
        <Route path='/order' element={<OrderTable/>}></Route>
        <Route path='/ordermake' element={<MakeOrder/>}></Route>
        <Route path='/editorder' element={<EditOrder/>}></Route>
        <Route path='/customersupport' element={<Customersupport/>}></Route>
        <Route path='/createTickect' element={<CreateTicket/>}></Route>
        <Route path='/updateTicket/:id' element={<UpdateTicket/>}></Route>

        {/* Redirect to Home if no matching route found */}
        {/* <Route path='*' element={<Navigate to="/home" />} /> */}
        <Route path='/reg' element={<Register/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
