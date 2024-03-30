import './App.css';
import React, { useState } from 'react';
import SideBar from './Components/Nav,Side&Dashboard/SideBar';
import DashBoard from './Components/Nav,Side&Dashboard/DashBoard';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Client from './Components/ClientManage/Client';
import CreateClient from './Components/ClientManage/CreateClient';
import UpdateClient from './Components/ClientManage/UpdateClient';

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
      <Route path='/update' element={<UpdateClient/>}></Route>
    </Routes>

  </BrowserRouter>

  );
}

export default App;
