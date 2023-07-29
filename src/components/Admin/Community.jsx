import React, { useState, useEffect } from 'react';
import { getCommunity,communityAction } from '../../services/adminApi';
import { toast } from "react-toastify";

function Community() {
  const [community, setCommunity] = useState([]);

  useEffect(() => {
    getCommunity()
      .then((res) => {
        setCommunity(res.data.communityData);
      })
      .catch((error) => {
        console.error('Failed to fetch community data:', error);
      });
  }, []);

  const handleAction = (id) => {
    communityAction(id)
      .then((res) => {
        toast.success(res.data.message);
        getCommunity()
          .then((res) => {
            setCommunity(res.data.communityData);
          })
          .catch((error) => {
            console.error("Failed to fetch user data:", error);
          });
      })
      .catch((error) => {
        console.error("Error blocking/unblocking user:", error);
      });
  };

  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Communities</h1>
      <p className="mb-4">Home | Communities</p>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-center">No</th>
            <th className="px-4 py-2 text-center">Community Name</th>
            <th className="px-4 py-2 text-center">Type</th>
            <th className="px-4 py-2 text-center">Status</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {community.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">{item.title}</td>
              <td className="border px-4 py-2 text-center">{item.type}</td>
              <td className="border px-4 py-2 text-center">
              <div className="flex flex-col justify-center h-full">
                    {item.status ? 'Active' : 'Inactive'}
                  </div>
                </td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={()=> handleAction(item._id)}
                >
                  {item.status ? "Unlist" : "List"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Community;
