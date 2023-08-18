import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import PROFILE from "../../assets/Profile-Logo.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ProfileSaved from "./ProfileSaved";
import { Link, useNavigate } from "react-router-dom";
import ProfileAsked from "./ProfileAsked";

function Profile() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("about");

  const profiledata = useSelector((state) => state.user);
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleAskedQuestions = (section) => {
    setActiveSection(section);
  };

  const editProfile = (id) => {
    navigate(`/profile/edit`, { state: id });
  };

  return (
    <div className="bg-gray-100 px-4 py-20">
      <div className="container mx-auto max-w-5xl ">
        <h2 className="text-3xl font-semibold mb-4">Profile</h2>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={profiledata.image}
                alt="Profile"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{profiledata.username}</h3>
              <p className="text-gray-600">{profiledata.email}</p>
              <div className="flex mt-2">
                <a
                  href={profiledata.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="w-6 h-6 text-gray-600 hover:text-gray-800"
                  />
                </a>
                <a href={profiledata.linkedin} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="w-6 h-6 text-gray-600 hover:text-gray-800"
                  />
                </a>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-2">Joined: {profiledata.joinedDate}</p>
          <div className="flex justify-end">
            <Link to="/profile/edit">
              <button
                onClick={() => editProfile(profiledata.userId)}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mr-2"
              >
                Edit
              </button>
            </Link>
            <button
              className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
              onClick={() => handleSectionChange("saved")}
            >
              Saved
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded px-4 py-2 ml-2"
              onClick={() => handleAskedQuestions("asked")}
            >
              Asked
            </button>
          </div>
        </div>
        {activeSection === "about" && (
          <div className="mt-4">
            <h3 className="text-2xl font-semibold mb-2">About</h3>
            <div className="w-full bg-white p-2 border rounded-lg">
              {profiledata.about}
            </div>
          </div>
        )}
        {activeSection === "saved" && <ProfileSaved id={profiledata.id} />}
        {activeSection === "asked" && <ProfileAsked id={profiledata.id} />}
      </div>
    </div>
  );
}

export default Profile;
