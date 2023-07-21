import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import Navbar from './Navbar'
function Layout() {
  return (
   <div>
    <Navbar/>
    <SideBar/>
    <div>{<Outlet/>}</div>
   </div>
  )
}

export default Layout