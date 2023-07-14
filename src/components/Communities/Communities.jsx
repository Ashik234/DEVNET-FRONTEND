import React from 'react';
import COMMUNITY from "../../assets/community.jpg";
import JAVASCRIPT from "../../assets/javascript-logo.png"
import { Link } from 'react-router-dom';


function Communities() {
  return (
    <div>
      <div className="relative">
        <img src={COMMUNITY} alt="Community Image" className="w-full h-72 object-cover" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-bold">Building Bridges, Embracing Unity: Our Community, Our Strength.</h2>
        </div>
      </div>
      <div className="bg-white rounded-lg mt-6 p-6">
        <div className="flex items-center">
          <div className="flex-1 ml-16">
            <input type="text" placeholder="Search" className="px-4 py-2 border border-gray-300 rounded-lg w-96" />
          </div>
        <Link to="/communities/createcommunity">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-16">Create Community</button>
        </Link>
        </div>
        <div className="mt-6 ml-16">
          <div className="flex items-center">
            <img src={JAVASCRIPT} alt="Community Profile" className="w-16 h-16" />
            <div className="ml-4">
              <h3 className="text-xl font-bold">Community Name</h3>
              <p>Number of Members</p>
            </div>
          </div>
          <button className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg ml-48">Join</button>
        </div>
      </div>
    </div>
  );
}

export default Communities;
