import React, { useState, useEffect } from "react";
import { getUsers, userAction } from "../../services/adminApi";
import { toast } from "react-toastify";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res.data.userData);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  }, []);

  const handleAction = (id) => {
    userAction(id)
      .then((res) => {
        toast.success(res.data.message);
        getUsers()
          .then((res) => {
            setUsers(res.data.userData);
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
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <p className="mb-4">Home | Users</p>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-center">No</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Email</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex flex-col justify-center h-full">
                    {user.username}
                  </div>
                </td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex flex-col justify-center h-full">
                    {user.email}
                  </div>
                </td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex flex-col justify-center h-full">
                    {user.status ? "Active" : "Inactive"}
                  </div>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleAction(user._id)}
                  >
                    {user.status ? "Block" : "UnBlock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
