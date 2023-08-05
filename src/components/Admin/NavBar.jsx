import React from 'react';
import DEVNET from "../../assets/DEVNET-bg.png";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='bg-gray-400 sm:bg-gray-400 h-20 text-white flex justify-between items-center px-4 sm:px-6 lg:px-8'>
      <div>
        <img src={DEVNET} className='w-24 sm:w-32 md:w-40'/>
      </div>
      <Link to="/admin/adminprofile">
        <div className='flex-grow text-right mr-4'>
          <h1>Admin</h1>
        </div>
      </Link>
    </div>
  );
}
export default Navbar;
