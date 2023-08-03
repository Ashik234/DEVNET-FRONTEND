import React, { useEffect, useState } from "react";

function ChatList({ data, userid, getUserData,online}) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = data.members.find((id) => id !== userid);
    getUserData(userId)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(userData);

  
  return (
    <>
      <div className="flex items-center shadow-lg border p-1 bg-slate-500 border-gray-300 mx-1 my-1 rounded-xl ">
        <div className="ms-2 relative my-1">
        {userData && userData.image &&(
          <img
            src={userData.image}
            alt="img"
            className="w-[35px] hidden sm:block h-[35px] rounded-md"
          />
          )}
        </div>
        <div className="md:text-lg  font-semibold">
          <h1 className="ms-3 text-white ">{userData?.username}</h1>
          <span>{online ?"Online":"Offline"}</span>
        </div>
      </div>
      <hr />
    </>
  );
}

export default ChatList;
