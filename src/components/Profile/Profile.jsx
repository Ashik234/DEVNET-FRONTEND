import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Profile() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [about, setAbout] = useState('');

  const handleSave = () => {
    console.log('Profile saved');
  };

  const handleEdit = () => {
    console.log('Edit profile');
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-4">Profile</h2>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src="profile-image.jpg"
                alt="Profile"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{name}</h3>
              <p className="text-gray-600">{email}</p>
              <div className="flex mt-2">
                {/* {github && ( */}
                { (                 
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
                )}
                {/* {linkedin && ( */}
                {(
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
                )}
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-2">
            Joined: {new Date().toLocaleDateString()}
          </p>
          <div className="flex">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mr-2"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
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
      </div>
    </div>
  );
}

export default Profile;
