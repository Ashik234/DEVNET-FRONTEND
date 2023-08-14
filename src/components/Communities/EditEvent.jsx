import React, { useEffect, useState } from 'react'
import { editEvent, getSingleEvent } from '../../services/userApi';
import { toast } from 'react-toastify';

function EditEvent({eventId,onClose}) {
    const [event, setEvent] = useState("");
    console.log(eventId);
    useEffect(() => {
        getSingleEvent(eventId)
          .then((res) => {
            setEvent(res.data.singleEvent);
          })
          .catch((error) => {
            toast.error('Failed to fetch event data.');
          });
      }, []);
      
    const handleSubmit = (e) => {
      e.preventDefault();
      editEvent(eventId, event).then((res) => {
        setEvent(res.data.updatedEvent);
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
       <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
       <p className="mb-4">
       Enhance The Event: Through These Changes
       </p>
       <input
         name="title"
         onChange={(e) => {
            setEvent({
             ...event,
             [e.target.name]: e.target.value,
           });
         }}
         className="block w-full border rounded-md p-2 mb-4"
         value={event.title}
       />
        <input
         name="description"
         onChange={(e) => {
            setEvent({
             ...event,
             [e.target.name]: e.target.value,
           });
         }}
         className="block w-full border rounded-md p-2 mb-4"
         value={event.description}
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

export default EditEvent