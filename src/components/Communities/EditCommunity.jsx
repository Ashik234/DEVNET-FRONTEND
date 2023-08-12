import React, { useEffect, useState } from "react";
import {getSingleCommunity, editCommunity } from "../../services/userApi";
import { toast } from "react-toastify";

function EditCommunity({communityId, onClose }) {
    const [community, setCommunity] = useState("");

    useEffect(() => {
        getSingleCommunity(communityId).then((res) => {
          setCommunity(res.data.singlecommunity);
        });
      }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      editCommunity(communityId, community).then((res) => {
        setCommunity(res.data.updatedCommunity);
          toast.success(res.data.message);
          onClose()
      })
      .catch((error) => {
          console.error("Error Reporting question:", error);
        });
    };

  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
     <div className="bg-white p-6 rounded-lg shadow-lg">
       <h2 className="text-xl font-semibold mb-4">Edit Community</h2>
       <p className="mb-4">
       Enhance The Community: Through These Changes
       </p>
       <input
         name="title"
         onChange={(e) => {
            setCommunity({
             ...community,
             [e.target.name]: e.target.value,
           });
         }}
         className="block w-full border rounded-md p-2 mb-4"
         value={community.title}
       />
        <input
         name="description"
         onChange={(e) => {
            setCommunity({
             ...community,
             [e.target.name]: e.target.value,
           });
         }}
         className="block w-full border rounded-md p-2 mb-4"
         value={community.description}
       />
       <div className="flex justify-end">
         <button
           className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
           onClick={handleSubmit}
         >
           Save
         </button>
         <button
           className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
             onClick={onClose}           
         >
           Close
         </button>
       </div>
     </div>
   </div>
  )
}

export default EditCommunity