import React, { useState } from 'react';
import DEVNET from '../../assets/DEVNET-bg.png';
import { FiUser, FiMenu } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { changeUserDetails } from '../../Redux/user/UserSlice'

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const profiledata = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = ()=>{
    dispatch(
      changeUserDetails({
        userId:"",
        username:"",
        email:"",
        joinedDate:""
      }),
      localStorage.removeItem("userJWT"),
      navigate("/")
    )
  }

  return (
    <div className="bg-slate-100 h-20 text-white flex justify-between items-center">
      <div className="pl-4">
        <img src={DEVNET} className="w-24 sm:w-32 md:w-40" alt="" />
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
      <div
        className={`${
          menuOpen ? 'block' : 'hidden'
        } sm:hidden absolute top-20 right-0 bg-white py-2 px-4 rounded-md shadow-md transition duration-300`}
      >
        {profiledata ? (
          <>
            <div className="mt-4 flex items-center">
              <Link
                to="/profile"
                className="text-gray-400 flex items-center transition duration-300 hover:text-gray-800"
              >
                <FiUser className="text-gray-400 text-sm mr-2" />
                <span>{profiledata.username}</span>
              </Link>
            </div>
            <hr className="my-2" />
            <button
              className="text-gray-400 flex items-center transition duration-300 hover:text-gray-800"
              onClick={handleLogout}
            >
            <FiUser className="text-gray-400 text-sm mr-2" />
              <span>Logout</span>
            </button>
            
          </>
        ) : (
          <div>
            <Link
              to="/login"
              className="text-gray-400 flex items-center transition duration-300 hover:text-gray-800"
            >
              <FiUser className="text-gray-400 text-sm mr-2" />
              <span>Login</span>
            </Link>
          </div>
        )}
        <hr className="my-2" />
        <Link
          to="/questions"
          className="mr-2 ml-2 flex items-center transition duration-300 hover:text-gray-800"
        >
          <p className="text-gray-400 text-xs">Questions</p>
        </Link>
        <hr className="my-2" />
        <Link
          to="/compiler"
          className="mr-2 ml-2 flex items-center transition duration-300 hover:text-gray-800"
        >
          <p className="text-gray-400 text-xs">Compiler</p>
        </Link>
        <hr className="my-2" />
        <Link
          to="/communities"
          className="mr-2 ml-2 flex items-center transition duration-300 hover:text-gray-800"
        >
          <p className="text-gray-400 text-xs">Communities</p>
        </Link>
        <hr className="my-2" />
        <Link
          to="/events"
          className="mr-2 ml-2 flex items-center transition duration-300 hover:text-gray-800"
        >
          <p className="text-gray-400 text-xs">Events</p>
        </Link>
      </div>
      <div className="pr-4 hidden sm:block">
        {profiledata ? (
          <>
            <div className="mt-4 flex items-center">
              <Link
                to="/profile"
                className="text-gray-400 flex items-center transition duration-300 hover:text-gray-800"
              >
                <FiUser className="text-gray-400 text-sm mr-2" />
                <span>{profiledata.username}</span>
              </Link>
            </div>
            <hr className="my-2" />
            <button
              className="text-gray-400 flex items-center transition duration-300 hover:text-gray-800"
              onClick={handleLogout}
            >
            <FiUser className="text-gray-400 text-sm mr-2" />
              <span>Logout</span>
            </button>

          </>
        ) : (
          <Link to="/login">
            <FiUser className="text-gray-400 text-xl mx-4 transition duration-300 hover:text-gray-800" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
