import './App.css';
import React, { useState } from 'react';
import SideBar from './Components/Nav,Side&Dashboard/SideBar';
import DashBoard from './Components/Nav,Side&Dashboard/DashBoard';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
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
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState (0)
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return ( 
  <BrowserRouter>
    <div className='flex'>
    <SideBar sidebarToggle={sidebarToggle} />
    <DashBoard sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />  
    </div>
    <Routes>
      <Route path='/client' element={<Client/>}></Route>
      <Route path='/create' element={<CreateClient/>}></Route>
      <Route path='/update/:id' element={<UpdateClient/>}></Route>
      
    </Routes>

    <Routes>
      <Route path='/supplier' element={<Supplier/>}></Route>
      <Route path='/createsp' element={<CreateSupplier/>}></Route>
      <Route path='/updatesp/:id' element={<UpdateSupplier/>}></Route>  
    </Routes>
    
    <Routes>
      <Route path='/order' element={<OrderTable/>}></Route>
      <Route path='/ordermake' element={<MakeOrder/>}></Route>
      <Route path='/editorder' element={<EditOrder/>}></Route>
    </Routes>


    <Routes>
      <Route path='/reg' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
    </Routes>

    <Routes> 
      <Route path='/customersupport' element={<Customersupport/>}></Route>
      <Route path='/createTickect' element={<CreateTicket/>}></Route>
      <Route path='/updateTicket/:id' element={<UpdateTicket/>}></Route>
    </Routes>
    
  </BrowserRouter>

  );
}

export default App;
