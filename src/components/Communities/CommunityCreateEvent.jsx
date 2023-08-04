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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!event || !event.title || event.title.trim() === "") {
      return toast.warn("Title should not be empty");
    } else if (!event || !event.image || event.image === null) {
      return toast.warn("Image should not be empty");
    }else if(!event || !event.type || !event.type.trim()===""){
      return toast.warn("Type should not be empty");
    }else if(!event || !event.dateTime || !event.dateTime.trim()===""){
      return toast.warn("Date should not be empty");
    }else if (!event || !event.location || event.location.trim() === "") {
      return toast.warn("Location should not be empty");
    }else if (!event || !event.description || event.description.trim() === "") {
      return toast.warn("Description should not be empty");
    }
     else {
    try {
      const formData = new FormData();
      formData.append("title", event.title);
      formData.append("image", event.image);
      formData.append("type", event.type);
      formData.append("dateTime", event.dateTime);
      formData.append("location", event.location);
      formData.append("description", event.description);
      createEvent(id,formData).then((res)=>{
        setEvent(res.data)
        toast.success(res.data.message)
        navigate("/communities/viewcommunity/events")
      })
    } catch (error) {
      console.log(error );
    }
  };
}


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
            onChange={(e)=> {setEvent({...event,[e.target.name]:e.target.value})}}
            className="w-full border border-gray-400 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventImage" className="block font-semibold">Event Image:</label>
          <input
            type="file"
            name="image"
            onChange={(e)=> {setEvent({...event,[e.target.name]:e.target.files[0]})}}
            className="w-full border border-gray-400 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventType" className="block font-semibold">Event Type:</label>
          <input
            type="text"
            name="type"
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
            onChange={(e)=> {setEvent({...event,[e.target.name]:e.target.value})}}
            className="w-full border border-gray-400 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold">Description:</label>
          <textarea
            id="description"
            name="description"
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
