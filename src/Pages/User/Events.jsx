import React, { useEffect, useState } from 'react';
import EVENT from "../../assets/event.png";
import { useNavigate } from 'react-router-dom';
import { getAllEvents } from '../../services/userApi';

function Events() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllEvents().then((res) => {
      setData(res.data.eventData);
    });
  }, []);
console.log(data);

const navigateToDetails = (id)=>{
  navigate(`/communities/viewcommunity/viewevent`,{state:id})
}
  return (
    <div className="mx-auto p-4 px-28">
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <form>
          <input
            type="text"
            placeholder="Search by name"
            className="p-2 rounded-lg mr-4"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1">
      {data.map((item, index) => (
        <div
          className="flex border border-gray-300 p-4 rounded-lg hover:shadow-md transition-shadow mb-4 mt-8"
        >
          <img
            src={EVENT}
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
  );
}

export default Events;
