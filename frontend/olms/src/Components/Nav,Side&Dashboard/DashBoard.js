import React from 'react'
import NavBar from './NavBar'

const DashBoard = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <div className={`${sidebarToggle ? "" : " ml-64 "} w-full`}>
        <NavBar sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}/>
    </div>
  )
}

export default DashBoard