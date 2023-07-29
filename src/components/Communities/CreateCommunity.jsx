import React, { useState } from 'react';
import { createCommunity } from '../../services/userApi';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function CreateCommunity() {
  const [community, setCommunity] = useState('');
  const navigate = useNavigate()
  const location = useLocation();
  const id = location.state;

  const handleSubmit = (e) => {
   e.preventDefault()
   if (!community || !community.title || community.title.trim() === "") {
    return toast.warn("Title should not be empty");
  } else if (!community || !community.type || community.type.trim() === "") {
    return toast.warn("Type should not be empty");
  } else if (!community || !community.description || community.description.trim() === "") {
    return toast.warn("Description should not be empty");
  } else {
   try {
    const formData = new FormData();
      formData.append("title", community.title);
      formData.append("image", community.image);
      formData.append("type", community.type);
      formData.append("description", community.description);
      console.log(formData);
    createCommunity(id,formData).then((res)=>{
      setCommunity(res.data)
      if(res.data.success){
        toast.success(res.data.message)
        navigate("/communities")
      }
    })
   } catch (error) {
    console.log(error);
   }
  }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="rounded-lg shadow-md bg-white p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Create Community</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-1">
            Title
          </label>
          <input
            id="title"
            name='title'
            type="text"
            className="border border-gray-400 p-2 w-full"
            onChange={(e) => {setCommunity({...community,[e.target.name]:e.target.value})}}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="profileImage" className="block font-bold mb-1">
            Profile Image
          </label>
          <input
            id="profileImage"
            type="file"
            name='image'
            accept="image/*"
            className="border border-gray-400 p-2 w-full"
            onChange={(e) => {setCommunity({...community,[e.target.name]:e.target.files[0]})}}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block font-bold mb-1">
            Type
          </label>
          <input
            id="type"
            name='type'
            type="text"
            className="border border-gray-400 p-2 w-full"
            onChange={(e) => {setCommunity({...community,[e.target.name]:e.target.value})}}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-1">
            Description
          </label>
          <textarea
            id="description"
            name='description'
            className="border border-gray-400 p-2 w-full"
            onChange={(e) => {setCommunity({...community,[e.target.name]:e.target.value})}}
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create
        </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCommunity;
