import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import PROFILE from "../../assets/profile.jpeg";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import ProfileSaved from './ProfileSaved';
import { Link } from 'react-router-dom';
import ProfileAsked from './ProfileAsked';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [about, setAbout] = useState('');

  const [activeSection, setActiveSection] = useState("about");

  const profiledata = useSelector((state) => state.user)

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleAskedQuestions = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="bg-gray-100 px-4 py-10">
      <div className="container mx-auto max-w-5xl ">
        <h2 className="text-3xl font-semibold mb-4">Profile</h2>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={PROFILE}
                alt="Profile"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{profiledata.username}</h3>
              <p className="text-gray-600">{profiledata.email}</p>
              <div className="flex mt-2">
                <a
                  href={github}
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
                  href={linkedin}
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
          <p className="text-gray-600 mb-2">
            Joined: {profiledata.joinedDate}
          </p>
          <div className="flex justify-end">
            <Link to="/profile/edit">
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mr-2">
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
              onClick={()=>handleAskedQuestions("asked")}
            >
              Asked
            </button>
          </div>
        </div>
        {activeSection === "about" && (
          <div className="mt-4">
            <h3 className="text-2xl font-semibold mb-2">About</h3>
            <textarea
              className="w-full p-2 border rounded"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
              placeholder="Write something about yourself"
            />
          </div>
        )}
        {activeSection === "saved" && <ProfileSaved id={profiledata.id} />}
        {activeSection === "asked" && <ProfileAsked />}
      </div>
    </div>
  );
}

export default Profile;
