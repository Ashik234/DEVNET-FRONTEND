import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  userChat,
  userGetDetails,
  userGetMessages,
  userSendMessage,
} from "../../services/userApi";
import Messages from "../../components/Chat/Messages";
import ChatList from "../../components/Chat/ChatList";
import socketInstance from "../../Socket/Socket";

function IndividualChat() {
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const userData = useSelector((state) => state.user);
  const socket = useRef();
  useEffect(() => {
    userChat(userData.userId)
      .then((res) => {
        setChats(res.data.chat);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    socket.current = socketInstance;
    console.log(socket.current);
    socket.current.emit("add-new-user", userData.userId);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [userData]);

  //send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

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
              userid={userData.userId}
              getUserData={userGetDetails}
            />
          </div>
        ))}
      </div>
      <Messages
        chat={currentChat}
        userid={userData.userId}
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
