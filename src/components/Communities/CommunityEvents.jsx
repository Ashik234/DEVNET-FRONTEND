import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents, getSingleCommunity } from "../../services/userApi";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { LuEdit2 } from "react-icons/lu";
import EditEvent from "./EditEvent";

function CommunityEvents({ id }) {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const [community, setCommunity] = useState(null);
  const profiledata = useSelector((state) => state.user);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    getEvents(id).then((res) => {
      setEvent(res.data.eventData);
    });
  }, []);

  useEffect(() => {
    getSingleCommunity(id).then((res) => {
      setCommunity(res.data.singlecommunity);
    });
  }, []);

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const navigateToDetails = (id) => {
    navigate(`/communities/viewcommunity/viewevent`, { state: id });
  };

  const navigateToCreate = (id) => {
    navigate(`/communities/viewcommunity/create`, { state: id });
  };

  const isCurrentUserAdmin = () => {
    if (!community || !community.members) {
      return false;
    }
    const currentUserID = profiledata.userId;
    for (const memberData of community.members) {
      const memberID = memberData.member._id;
      if (memberID === currentUserID && memberData.role === "Admin") {
        return true;
      }
    }
    return false;
  };

  const currentUserAdmin = isCurrentUserAdmin();

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
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  {currentUserAdmin && (
                    <button onClick={openEditModal}>
                      <LuEdit2
                        size={25}
                        className="text-gray-600 hover:text-gray-800"
                      />
                    </button>
                  )}
                  {showEditModal && (
                  <div className="modal-overlay">
                    <EditEvent
                    eventId = {item._id}
                    onClose={closeEditModal}
                    />
                  </div>
                )}
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <h3 className="text-xl mb-2">{item.date}</h3>
                <div className="flex justify-end">
                  <button
                    onClick={() => navigateToDetails(item._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CommunityEvents;
