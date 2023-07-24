import React, { useState, useEffect } from "react";
import COMMUNITY from "../../assets/community.jpg";
import JAVASCRIPT from "../../assets/javascript-logo.png";
import { useNavigate, Link } from "react-router-dom";
import { getCommunity, joinCommunity } from "../../services/userApi";
import { toast } from "react-toastify";

function Communities() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    getCommunity().then((res) => {
      setData(res.data.communityData);
    });
  }, []);

  const navigateToView = (id) => {
    navigate(`/communities/viewcommunity`, { state: id });
  };

  const handleJoin = (id) => {
    joinCommunity(id).then((res) => {
      toast.success(res.data.message);
      navigate(`/communities/viewcommunity`, { state: id });
    });
  };

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
      </div>
      <div className="bg-white rounded-lg mt-6 p-6">
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <div className="flex-1 mb-2 sm:mb-0 sm:mr-2">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 lg:w-96"
            />
          </div>
          <Link to="/communities/createcommunity">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Create Community
            </button>
          </Link>
        </div>
        {data.length === 0 ? (
          <p className="font-bold text-xl text-center text-gray-500 mt-10">
            No Communities Found. Be The First One To Create One!
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {data.slice(0, 3).map((item, index) => (
                <div
                  className="mt-6 ml-2 sm:ml-16 relative z-10 p-4 bg-white shadow-md rounded-lg border border-gray-300"
                  key={index}
                >
                  <div className="flex items-center">
                    <img
                      src={JAVASCRIPT}
                      alt="Community Profile"
                      className="w-16 h-16"
                    />
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-gray-600">Number of Members</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleJoin(item._id)}
                    className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg ml-16"
                  >
                    Join
                  </button>
                  <button
                    onClick={() => navigateToView(item._id)}
                    className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg ml-16"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {data.slice(3).map((item, index) => (
                <div
                  className="mt-6 ml-2 sm:ml-16 relative z-10 p-4 bg-white shadow-md rounded-lg border border-gray-300"
                  key={index}
                >
                  <div className="flex items-center">
                    <img
                      src={JAVASCRIPT}
                      alt="Community Profile"
                      className="w-16 h-16 "
                    />
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-gray-600">Number of Members</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleJoin(item._id)}
                    className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg ml-16"
                  >
                    Join
                  </button>
                  <button
                    onClick={() => navigateToView(item._id)}
                    className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg ml-16"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Communities;
