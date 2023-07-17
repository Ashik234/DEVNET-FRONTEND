import React from "react";
import JAVASCRIPT from "../../assets/javascript-logo.png";
import COMMUNITY from "../../assets/community.jpg";

function ViewCommunity() {
  return (
    <div>
      <div className="relative">
        <img
          src={COMMUNITY}
          alt="Community Image"
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-bold">
            Building Bridges, Embracing Unity: Our Community, Our Strength.
          </h2>
        </div>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-3 absolute top-52 left-0 right-0 z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center">
              <div className="w-28 h-28 overflow-hidden">
                <img
                  src={JAVASCRIPT}
                  alt="Community Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold">Community Name</h3>
                <p className="text-gray-600">Members: 100</p>
                <p className="text-gray-600">Created At: July 1, 2023</p>
              </div>
            </div>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 sm:bottom-28 left-0 right-0 z-20">
        <nav className="bg-slate-100">
          <div className="max-w-3xl mx-auto px-8 py-2">
            <ul className="flex space-x-36">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Members</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">Discussions</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default ViewCommunity;
