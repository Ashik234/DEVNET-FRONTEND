import React, { useState } from 'react';

function CommunityDiscussions() {
  const [messages, setMessages] = useState([]); 
  const [newMessage, setNewMessage] = useState(''); 

  const handleInputChange = (e) => {

  };

  const handleSendMessage = () => {
    
  };

  return (
    <div className='container px-20 py-6'>
      <h2 className='text-2xl font-bold mb-4'>Chat Discussion</h2>
      <div className='chat-container bg-gray-100 p-4 rounded-lg'>
          <div  className='message'>
            <div className='bg-blue-500 text-black py-2 px-4 rounded-lg mb-2 max-w-md'>
            ashik
            </div>
            <div className='text-right text-gray-500 text-sm'>120</div>
          </div>
      </div>
      <div className='mt-4 flex'>
        <input
          type='text'
          className='flex-grow border rounded-l-lg p-2'
          placeholder='Type your message...'
          value={newMessage}
          onChange={handleInputChange}
        />
        <button
          className='bg-blue-500 text-white px-4 rounded-r-lg'
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default CommunityDiscussions;
