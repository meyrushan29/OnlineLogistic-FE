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

  </BrowserRouter>

  );
}

export default App;
