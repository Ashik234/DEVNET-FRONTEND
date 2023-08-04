import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { userGetDetails } from "../../services/userApi";
import { FiMessageSquare } from "react-icons/fi";

function CommunityMembersProfile() {
  const location = useLocation();
  const { id } = location.state || {};
  const [userData, setUserData] = useState();

  useEffect(() => {
    userGetDetails(id)
      .then((res) => {
        console.log(res.data.userData);
        setUserData(res.data.userData);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-gray-100 px-4 py-20">
      <div className="container mx-auto max-w-5xl ">
        <h2 className="text-3xl font-semibold mb-4">Profile</h2>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="mr-4">
                <img
                  className="w-20 h-20 rounded-full object-cover"
                  src={userData?.image}
                  alt="Profile"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">{userData?.username}</h3>
                <p className="text-gray-600">{userData?.email}</p>
                <div className="flex mt-2">
                  <a
                    href={userData?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-2"
                  >
                    <FontAwesomeIcon
                      icon={faGithub}
                      className="w-6 h-6 text-gray-600 hover:text-gray-800"
                    />
                  </a>
                  <a
                    href={userData?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="w-6 h-6 text-gray-600 hover:text-gray-800"
                    />
                  </a>
                </div>
              </div>
            </div>
            <Link
              to="/communitites/viewcommunity/members/individual"
              className="text-gray-400 flex items-center transition duration-300 hover:text-gray-800"
            >
              <FiMessageSquare className="text-black text-2xl" />
            </Link>
          </div>
          <p className="text-gray-600 mb-2">Joined: {userData?.joinedDate}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-semibold mb-2">About</h3>
          <div className="w-full bg-white p-2 border rounded-lg">
            {userData?.about}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityMembersProfile;
