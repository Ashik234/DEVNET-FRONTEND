import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../services/userApi";

function CommunityEvents({ id }) {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);

  useEffect(() => {
    getEvents(id).then((res) => {
      setEvent(res.data.eventData);
    });
  }, []);

  const navigateToDetails = (id)=>{
    navigate(`/communities/viewcommunity/viewevent`,{state:id})
  }
  
  const navigateToCreate = (id) => {
    navigate(`/communities/viewcommunity/create`, { state: id });
  };

  return (
    <>
      <div className="container px-20">
        <div className="flex items-center justify-between">
          <h4 className="text-3xl font-bold mt-8 mb-4">
            Events happening around our community
          </h4>
          <button
            onClick={() => navigateToCreate(id)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Create Event
          </button>
        </div>
        <div className="grid grid-cols-1">
          {event.map((item, index) => (
            <div
              key={index}
              className="flex border border-gray-300 p-4 rounded-lg hover:shadow-md transition-shadow mb-4 mt-8"
            >
              <img
                src={item.image}
                alt="Event 1"
                className="w-72 h-44 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <h3 className="text-xl mb-2">{item.date}</h3>
                <button onClick={() => navigateToDetails(item._id)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CommunityEvents;
