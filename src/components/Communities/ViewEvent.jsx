import React, { useState, useEffect } from 'react';
import { getSingleEvent } from '../../services/userApi';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import EVENT from "../../assets/event.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function ViewEvent() {
  const location = useLocation();
  const id = location.state;

  const [event, setEvent] = useState(null);

  useEffect(() => {
    getSingleEvent(id)
      .then((res) => {
        setEvent(res.data.singleEvent);
      })
      .catch((error) => {
        toast.error('Failed to fetch event data.');
      });
  }, [id]);

  return (
    <div className="container mx-auto mt-10 px-20">
      {event ? (
        
        <div className="bg-white rounded-lg shadow-lg p-8 flex">
          <div className="w-1/3 mr-6">
            <img
              src={EVENT}
              alt={event.title}
              className="w-full h-auto rounded"
            />
          </div>
          <div className="w-2/3">
            <h2 className="text-2xl font-bold mb-3">{event.title}</h2>
            <p className="text-gray-600 mb-4">Date: {event.date}</p>
            <div className="flex items-center text-gray-600 mb-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 mr-2" />
              <p>{event.location}</p>
            </div>
            <p className="text-gray-600">{event.description}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-32">
          <span className="text-gray-600 text-lg">Loading...</span>
        </div>
      )}

      {event?.communityId && (
        <div className="bg-white rounded-lg shadow-lg p-8 mt-4">
          <h3 className="text-lg font-bold mb-3">Conducted by {event.communityId.title}</h3>
          <p className="text-gray-600 mb-4">{event.communityId.description}</p>
        </div>
      )}
    </div>
  );
}

export default ViewEvent;
