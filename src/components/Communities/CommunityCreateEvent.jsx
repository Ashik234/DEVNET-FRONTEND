import React, { useState } from 'react';
import { createEvent } from '../../services/userApi';
import { useLocation } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

function CommunityCreateEvent() {
  const [event, setEvent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;
  console.log(id,"iddddddd");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id);
    try {
      createEvent(id,event).then((res)=>{
        toast.success(res.data.message)
        navigate("/communities/viewcommunity/events")
      })
    } catch (error) {
      console.log(error );
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e)=> {setEvent({...event,[e.target.name]:e.target.value})}}
            className="w-full border border-gray-400 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventImage" className="block font-semibold">Event Image:</label>
          <input
            type="file"
            name="image"
            required
            onChange={(e)=> {setEvent({...event,[e.target.name]:e.target.value})}}
            className="w-full border border-gray-400 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventType" className="block font-semibold">Event Type:</label>
          <input
            type="text"
            name="type"
            required
            onChange={(e)=> {setEvent({...event,[e.target.name]:e.target.value})}}
            className="w-full border border-gray-400 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateTime" className="block font-semibold">Date and Time:</label>
          <input
            type="datetime-local"
            id="dateTime"
            name="dateTime"
            required
            onChange={(e)=> {setEvent({...event,[e.target.name]:e.target.value})}}
            className="w-full border border-gray-400 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block font-semibold">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            required
            onChange={(e)=> {setEvent({...event,[e.target.name]:e.target.value})}}
            className="w-full border border-gray-400 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold">Description:</label>
          <textarea
            id="description"
            name="description"
            required
            onChange={(e)=> {setEvent({...event,[e.target.name]:e.target.value})}}
            className="w-full border border-gray-400 rounded p-2"
            rows="4"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CommunityCreateEvent;
