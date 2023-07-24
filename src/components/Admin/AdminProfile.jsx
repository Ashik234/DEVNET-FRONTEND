import React from 'react';

function AdminProfile() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <div className="flex flex-col">
        <p className="mb-2">
          <span className="font-bold">Name:</span> Admin
        </p>
        <p>
          <span className="font-bold">Email:</span> admin@gmail.com
        </p>
      </div>
    </div>
  );
}

export default AdminProfile;
