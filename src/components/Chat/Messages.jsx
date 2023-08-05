import React, { useEffect, useRef, useState } from "react";
import { format } from "timeago.js";

function Messages({
  chat,
  userid,
  getUserData,
  setSendMessage,
  receiveMessage,
  userSendMessage,
  userGetMessages,
}) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  useEffect(() => {
    if (chat !== null) {
      const userId = chat?.members?.find((id) => id !== userid);
      getUserData(userId)
        .then((res) => {
          setUserData(res.data.userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [chat, userid]);

  useEffect(() => {
    if (chat !== null) {
      userGetMessages(chat._id)
        .then((res) => {
          setMessages(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [chat]);

  const handleSend = (e) => {
    e.preventDefault();
    const message = {
      senderId: userData._id,
      text: newMessage,
      chatId: chat._id,
    };
    userSendMessage(message)
      .then((res) => {
        setMessages([...messages, res.data.result]);
        setNewMessage("");
        console.log(messages, "msg");
      })
      .catch((err) => console.log(err));
    // send message to socket server
    const receiverId = chat?.members?.find((id) => id !== userid);
    setSendMessage({ ...message, receiverId });
  };
  // always scroll to last msg
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth", block: "end" }); // Scroll to the end of the messages
  }, [messages]);

  return (
    <div className="col-span-6 md:col-span-7 border md:ms-2 shadow-2xl bg-white border-gray-400 rounded-xl w-full">
      {chat ? (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-end shadow-lg bg-blue-950 border-gray-300 rounded-t-xl p-1">
            <div className="text-xl font-bold text-white">
              {userData?.username}
            </div>
            <div className="ms-3 my-1">
              {userData?.image && (
                <img
                  src={userData.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              )}
            </div>
          </div>

          <div className="overflow-y-auto px-4 py-2 flex-grow">
            {messages.map((msg, i) => (
              <div key={i}>
                <div
                  className={`flex ${
                    msg.senderId === userid ? "justify-start me-5" : "justify-end"
                  } mb-2`}
                >
                  <div
                    className={`py-2 px-3 rounded-xl ${
                      msg.senderId === userid
                        ? "bg-gray-700 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                        : "bg-blue-900 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
                <div className={`text-xs text-gray-500 ${msg.senderId === userid ? "text-left" : "text-right"}`}>
                  {format(msg.createdAt)}
                </div>
              </div>
            ))}
            <div ref={scroll}></div>
          </div>
          <div className="flex justify-center p-4">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full bg-gray-100 py-3 px-3 rounded-xl"
              type="text"
              placeholder="Type your message here..."
            />
            <button
              onClick={handleSend}
              className="py-2 px-3 ms-2 bg-blue-950 text-white text-lg font-bold rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-2 shadow-lg bg-blue-950 border-gray-300 rounded-t-xl p-4">
          <div className="text-xl font-bold text-white">Select a Connection</div>
        </div>
      )}
    </div>
  );
}

export default Messages;