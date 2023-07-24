import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./NavBar";

function Layout() {
  return (
    <div className="flex flex-col bg-neutral-100 w-full h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-1">
        <SideBar />
        <div className="flex flex-col flex-1 px-8 py-8 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
