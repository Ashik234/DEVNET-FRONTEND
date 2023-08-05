import React, { useEffect, useState } from "react";

function ChatList({ data, userid, getUserData, online, unreadCount }) {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const userId = data.members.find((id) => id !== userid);
    getUserData(userId)
      .then((res) => {
        setUserData(res.data.userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="flex items-center shadow-lg border p-3 bg-white border-gray-300 mx-1 my-1 rounded-xl hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
        <div className="ms-2 relative my-1">
          {userData && userData.image && (
            <img
              src={userData.image}
              alt="img"
              className="w-10 h-10 hidden sm:block rounded-full"
            />
          )}
        </div>
        <div className="md:text-lg font-semibold">
          <h1 className="ms-3 text-gray-800">{userData?.username}</h1>
          <span className={online ? "text-green-500" : "text-red-500"}>
            {online ? "Online" : "Offline"}
          </span>
          {unreadCount > 0 && (
            <span className="ml-2 text-gray-500">{unreadCount} unread</span>
          )}
        </div>
      </div>
      <hr className="border-gray-200 mt-1" />
    </>
  );
}

export default ChatList;
