import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSingleUser } from '../../services/userApi';

function EditProfile() {
  const location = useLocation();
  const id = location.state;
  console.log(id);
  const [data, setData] = useState({
    name: '',
    github: '',
    linkedin: '',
    about: '',
  });

  useEffect(() => {
    getSingleUser(id).then((res) => {
      console.log(res.data);
      setData(res.data.userData);
    });
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Assuming you have an updateUserData function in your userApi service
  //   updateUserData(id, data)
  //     .then((res) => {
  //       console.log(res.data);
  //       // Handle successful update
  //     })
  //     .catch((error) => {
  //       console.error('Error updating user data:', error);
  //       // Handle error
  //     });
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form className="max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.username}
            className="w-full border rounded-lg py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="github" className="block font-medium mb-1">
            GitHub:
          </label>
          <input
            type="text"
            id="github"
            name="github"
            className="w-full border rounded-lg py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="linkedin" className="block font-medium mb-1">
            LinkedIn:
          </label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            className="w-full border rounded-lg py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="about" className="block font-medium mb-1">
            About:
          </label>
          <textarea
            id="about"
            name="about"
            className="w-full border rounded-lg py-2 px-3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
