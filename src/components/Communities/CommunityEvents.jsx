import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../services/userApi";
import EVENT from "../../assets/event.png"

function CommunityEvents({ id }) {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);

  useEffect(() => {
    getEvents().then((res) => {
      setEvent(res.data.eventData);
    });
  }, []);

  console.log(event);

  const navigateToView = (id) => {
    navigate(`/communities/viewcommunity/create`, { state: id });
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <h4 className="text-3xl font-bold mt-4 mb-4">
          Events happening around our community
        </h4>
        <button
          onClick={() => navigateToView(id)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded float-right"
        >
          Create Event
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {event.map((item, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded-lg hover:shadow-md transition-shadow">
              <img
                src={EVENT}
                alt="Event 1"
                className="w-full h-44 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">
                {item.description}
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                See Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CommunityEvents;
