import React from 'react'

function MiniNavbar() {
    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
      };
  return (
    <div>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="w-full md:w-1/3 mb-2 md:mb-0">
              <select
                className="w-full bg-gray-200 text-gray-700 rounded-full py-2 px-4 focus:outline-none border border-gray-400"
                value={selectedTag}
                onChange={(e) => handleTagSelect(e.target.value)}
              >
                <option value="">Select a Tag</option>
                {data.map((item) => (
                  <option key={item._id} value={item.tags}>
                    {item.tags}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/3 md:text-center">
              <Link to="/questions/ask">
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 px-4 font-semibold">
                  Ask a Question
                </button>
              </Link>
            </div>
            <div className="hidden md:block w-1/3 text-right">
              <Link to="/questions/ask">
                <button className="text-blue-500 hover:text-blue-700 font-semibold">
                  Need Help? Ask the Community
                </button>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default MiniNavbar