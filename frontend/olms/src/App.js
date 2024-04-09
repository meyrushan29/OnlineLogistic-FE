import './App.css';
import React, { useState } from 'react';
import SideBar from './Components/Nav,Side&Dashboard/SideBar';
import DashBoard from './Components/Nav,Side&Dashboard/DashBoard';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Client from './Components/ClientManage/Client';
import CreateClient from './Components/ClientManage/CreateClient';
import UpdateClient from './Components/ClientManage/UpdateClient';
import CustomerSupport from './Components/CustomerManage/Customersupport';
import CreateTicket from './Components/CustomerManage/CreateTicket';
import UpdateTicket from './Components/CustomerManage/UpdateTicket';


function App() {
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
    <Route path='/Customersupport' element={<CustomerSupport/>}></Route>
    <Route path='/CreateTicket' element={<CreateTicket/>}></Route>
    <Route path='/UpdateTicket/:id' element={<UpdateTicket/>}></Route>
    
    </Routes>
    
  </BrowserRouter>

  );
}

export default App;
