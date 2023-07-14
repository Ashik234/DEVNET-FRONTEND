import React, { useState } from 'react';

function CreateCommunity() {
  const [title, setTitle] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = () => {
    // Perform the create action here
    console.log('Create community:', {
      title,
      profileImage,
      type,
      description
    });

    // Reset the form
    setTitle('');
    setProfileImage('');
    setType('');
    setDescription('');

    // Close the modal
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Create Community
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white w-1/3 rounded p-6">
            <h2 className="text-lg font-bold mb-4">Create Community</h2>

            <div className="mb-4">
              <label htmlFor="title" className="block font-bold mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="border border-gray-400 p-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="profileImage" className="block font-bold mb-1">
                Profile Image
              </label>
              <input
                id="profileImage"
                type="text"
                className="border border-gray-400 p-2 w-full"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="block font-bold mb-1">
                Type
              </label>
              <input
                id="type"
                type="text"
                className="border border-gray-400 p-2 w-full"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block font-bold mb-1">
                Description
              </label>
              <textarea
                id="description"
                className="border border-gray-400 p-2 w-full"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleCreate}
              >
                Create
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateCommunity;
