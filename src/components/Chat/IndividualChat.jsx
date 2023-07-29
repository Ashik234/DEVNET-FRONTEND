import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  userChat,
  userGetDetails,
  userGetMessages,
  userSendMessage,
} from "../../services/userApi";
import Messages from "./Messages";
import ChatList from "./ChatList";
import socketInstance from "../../Socket/Socket";
function IndividualChat() {
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const userData = useSelector((state) => state.user);
  console.log(userData);

  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const socket = useRef();

  useEffect(() => {
    userChat(userData.userId)
      .then((res) => {
        console.log(res.data);
        setChats(res.data.chat);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    socket.current = socketInstance;
    socket.current.emit("add-new-user", userData.userId);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log(onlineUsers,"hitgu");
    });
  }, [userData]);

  //send message to socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log(data, "SOCKET");
      setReceiveMessage(data);
    });
  }, []);

  return (
    <div className="flex h-96 px-12 mt-8">
      <div
        className="flex-1 bg-gray-100 p-4 space-y-4 rounded-md"
        style={{ maxWidth: "25%" }}
      >
        {chats.map((chat, index) => (
          <div key={index} onClick={() => setCurrentChat(chat)}>
            <ChatList
              data={chat}
              userid={userData._id}
              getUserData={userGetDetails}
            />
          </div>
        ))}
      </div>
      <Messages
        chat={currentChat}
        userid={userData._id}
        setSendMessage={setSendMessage}
        receiveMessage={receiveMessage}
        getUserData={userGetDetails}
        userGetMessages={userGetMessages}
        userSendMessage={userSendMessage}
      />
    </div>
  );
}

export default IndividualChat;
