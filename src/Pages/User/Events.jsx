import React, { useEffect, useState } from 'react';
import EVENT from "../../assets/event.png";
import { useNavigate } from 'react-router-dom';
import { getAllEvents, searchEvents } from '../../services/userApi';
import { useLocation } from "react-router-dom";
import Loader from "../../Pages/Loader";

function Events() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize as true
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    getAllEvents()
      .then((res) => {
        setTimeout(() => {
          setData(res.data.eventData);
          setIsLoading(false); // Set isLoading to false after data is loaded
        }, 1000);
      })
      .catch((error) => {
        setIsLoading(false); // Handle loading state even in case of an error
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/events?search=${search}`);
  };

  useEffect(() => {
    if (searchQuery) {
      searchEvents(searchQuery)
        .then((res) => {
          setSearchResults(res.data.eventData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchQuery]);

  const navigateToDetails = (id) => {
    navigate(`/communities/viewcommunity/viewevent`, { state: id });
  };

  return (
    <div className="mx-auto p-4 px-28">
      {isLoading ? (
        <Loader /> 
      ) : (
        <div>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 rounded-lg mr-4"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Search
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1">
            {searchQuery && searchResults.length === 0 ? (
              <p className="text-center text-gray-600">
                No search results found.
              </p>
            ) : (
              <>
                {searchResults.length > 0
                  ? searchResults.map((item, index) => (
                      <div
                        key={index}
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
                          <button
                            onClick={() => navigateToDetails(item._id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          >
                            See Details
                          </button>
                        </div>
                      </div>
                    ))
                  : data.map((item, index) => (
                      <div
                        key={index}
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
                          <button
                            onClick={() => navigateToDetails(item._id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          >
                            See Details
                          </button>
                        </div>
                      </div>
                    ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
