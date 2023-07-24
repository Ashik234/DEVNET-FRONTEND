import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <div className="bg-gray-700 text-white w-full md:w-1/6 py-4">
      <nav>
        <ul>
          <li className="px-8 py-2">
            <Link to="/admin" className="block hover:text-blue-400">
              Dashboard
            </Link>
          </li>
          <li className="px-8 py-2">
            <Link to="/admin/users" className="block hover:text-blue-400">
              Users
            </Link>
          </li>
          <li className="px-8 py-2">
            <Link to="/admin/events" className="block hover:text-blue-400">
              Events
            </Link>
          </li>
          <li className="px-8 py-2">
            <Link to="/admin/communities" className="block hover:text-blue-400">
              Community
            </Link>
          </li>
          <li className="px-8 py-2">
            <Link to="/admin/notifications" className="block hover:text-blue-400">
              Notifications
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
