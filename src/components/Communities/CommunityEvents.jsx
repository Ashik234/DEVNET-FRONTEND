import React from 'react';

function CommunityEvents() {
  return (
    <div className="container mx-auto px-4">
      <h4 className="text-3xl font-bold mt-4 mb-4">Events happening around our community</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border border-gray-300 p-4 rounded-lg hover:shadow-md transition-shadow">
          <img
            src="event1.jpg"
            alt="Event 1"
            className="w-full h-44 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-bold mb-2">Event 1 Title</h3>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget purus vel nulla dignissim finibus a ut lorem.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            See Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommunityEvents;
