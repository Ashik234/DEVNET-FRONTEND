import React from "react";
import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaConnectdevelop } from "react-icons/fa";
import { BiCalendarEvent,BiErrorCircle } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
function SideBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminJWT");
    navigate("/admin/login");
  };
  return (
    <div className="bg-gray-700 text-white w-full md:w-1/6 py-4 flex flex-col ">
      <nav className="flex flex-col flex-grow">
        <ul>
          <li className="px-8 py-2 flex items-center">
            <LuLayoutDashboard className="mr-2" />
            <Link to="/admin" className="block hover:text-blue-400">
              Dashboard
            </Link>
          </li>
          <li className="px-8 py-2 flex items-center">
            <FiUsers className="mr-2" />
            <Link to="/admin/users" className="block hover:text-blue-400">
              Users
            </Link>
          </li>
          <li className="px-8 py-2 flex items-center">
            <BiCalendarEvent className="mr-2" />
            <Link to="/admin/events" className="block hover:text-blue-400">
              Events
            </Link>
          </li>
          <li className="px-8 py-2 flex items-center">
            <FaConnectdevelop className="mr-2" />
            <Link to="/admin/communities" className="block hover:text-blue-400">
              Community
            </Link>
          </li>
          <li className="px-8 py-2 flex items-center">
            <IoNotificationsOutline className="mr-2" />
            <Link
              to="/admin/notifications"
              className="block hover:text-blue-400"
            >
              Notifications
            </Link>
          </li>
          <li className="px-8 py-2 flex items-center">
            <BiErrorCircle className="mr-2" />
            <Link
              to="/admin/reports"
              className="block hover:text-blue-400"
            >
              Reports
            </Link>
          </li>
        </ul>
        <button onClick={logout} className="px-8 mt-60 py-2 flex items-center">
          <CiLogout className="text-white mr-2" />
          Logout
        </button>
      </nav>
    </div>
  );
}

export default SideBar;
