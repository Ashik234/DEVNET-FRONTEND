import React, { useState } from 'react';
import DEVNET from "../../assets/DEVNET-bg.png";
import { FiUser, FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='bg-slate-100 h-20 text-white flex justify-between items-center'>
      <div className='pl-4'>
        <img src={DEVNET} className='w-24 sm:w-32 md:w-40' alt="" />
      </div>
      <div className="flex justify-center">
        <form className="max-w-sm px-4">
          <div className="relative">
            <BiSearch className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" />
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 pl-12 pr-3 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-stone-950 sm:w-64 md:w-80 lg:w-96"
            />
          </div>
        </form>
      </div>
      <div className="hidden sm:flex items-center">
      <Link to="/questions">
        <div className="mr-2 ml-2 flex items-center">
          <p className="text-gray-400 text-xs">Questions</p>
        </div>
      </Link>
      <Link to="/compiler"> 
        <div className="mr-2 ml-2 flex items-center">
          <p className="text-gray-400 text-xs">Compiler</p>
        </div>
      </Link>
      <Link to="/communities">  
        <div className="mr-2 ml-2 flex items-center">
          <p className="text-gray-400 text-xs">Communities</p>
        </div>
      </Link> 
      <Link to="/events">   
        <div className="mr-2 ml-2 flex items-center">
          <p className="text-gray-400 text-xs">Events</p>
        </div>
      </Link>  
      </div>
      <div className="flex items-center sm:hidden">
        <FiMenu
          className="text-gray-400 text-xl mx-4 cursor-pointer"
          onClick={toggleMenu}
        />
      </div>
      <div className={`${menuOpen ? 'block' : 'hidden'} sm:hidden absolute top-16 right-0 bg-white py-2 px-4 rounded-md shadow-md`}>
        <div className="mt-4 flex items-center">
          <Link to="/profile" className="text-gray-400 flex items-center">
            <FiUser className="text-gray-400 text-sm mr-2" />
            <span>Profile</span>
          </Link>
        </div>
          <hr className='' />
      <Link to="/questions">
        <div className="mr-2 ml-2 flex items-center">
          <p className="text-gray-400 text-xs">Questions</p>
        </div>
        <hr className='' />
      </Link>
      <Link to="/compiler">
        <div className="mr-2 ml-2 flex items-center">
          <p className="text-gray-400 text-xs">Compiler</p>
        </div>
        <hr className='' />
      </Link> 
      <Link to="/communities">     
        <div className="mr-2 ml-2 flex items-center">
          <p className="text-gray-400 text-xs">Communities</p>
        </div>
        <hr className='' />

      </Link>
      <Link to="/events">     
        <div className="mr-2 ml-2 flex items-center">
          <p className="text-gray-400 text-xs">Events</p>
        </div>
      </Link>
          
      </div>
      <div className='pr-4 hidden sm:block'>
        <Link to="/profile">
          <FiUser className="text-gray-400 text-xl mx-4" />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
