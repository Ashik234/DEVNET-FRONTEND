import React, { useEffect, useState } from "react";
import PROFILE from "../../assets/profile.jpeg";

function ChatList({ data, userid, getUserData }) {
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
      <div className="flex items-center shadow-lg border p-1 bg-slate-500 border-gray-300 mx-1 my-1 rounded-xl ">
        <div className="ms-2 relative my-1">
          {/* {checkOnlineStatus(data) ? (
          <div className="absolute left-3 z-[2] w-2 h-2 rounded-full bg-green-500"></div>
        ) : (
          ""
        )}{" "} */}
          <img
            src={PROFILE}
            alt="img"
            className="w-[35px] hidden sm:block h-[35px] rounded-lg"
          />
        </div>
        <div className="md:text-lg  font-semibold">
          <h1 className="ms-3 text-white ">{userData?.username}</h1>
          <span>Online</span>
        </div>
      </div>
      <hr />
    </>
  );
}

export default ChatList;
