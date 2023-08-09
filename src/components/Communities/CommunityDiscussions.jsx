import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
const baseURL = import.meta.env.VITE_USER_BASE_URL;
import { addmessage, getAllMessage } from "../../services/userApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CommunityDiscussions({ id }) {
  const socket = useRef();
  const scroll = useRef();
  const [value, setValue] = useState("");
  const { userId } = useSelector((state) => state.user);
  console.log(userId);
  const params = useParams();
  const communityId = params.id;
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = { from: { _id: userId }, message: value };
    // Update local state with the new message instantly
    setMessages([...messages, newMessage]);
    // Emit the message to the server and let it broadcast to other users
    addmessage({ messages: value, communityId: id }).then((res) => {
      socket.current.emit("send_message", res.data.data);
    });
    setValue("");
  };

  const getMsg = () => {
    getAllMessage(id).then((res) => {
      setMessages(res.data.message);
    });
  };

  socket.current &&
    socket.current.on("received_msg", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    getMsg();
    socket.current = io(baseURL);
    socket.current.emit("join_room", id);
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <div className="w-full h-full border-2 bg-gray-200 rounded-md shadow p-2 px-8">
        <div className="h-[90%] border-b-2 bg-white rounded-md overflow-auto">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 p-4">Community Discussions</h2>
            <hr />
            <div className="flex flex-col h-full overflow-x-auto">
              <div ref={scroll} className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {messages.map((data, index) => (
                    <React.Fragment key={index}>
                      {data.from?._id === userId ? (
                        <div className="col-start-6 col-end-13 p-3 rounded-lg">
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 ml-2">
                              {data.from?.username}
                            </div>
                            <div>{data?.message}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-start-1 col-end-8 p-3 rounded-lg">
                          <div className="flex flex-row items-center">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 mr-2">
                              {data.from.username}
                            </div>
                            <div>{data.message}</div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-1 mt-2">
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <label htmlFor="chat" className="sr-only">
                Your message
              </label>
              <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <textarea
                  id="chat"
                  rows="1"
                  className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your message..."
                  name="message"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 rotate-90"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                  <span className="sr-only">Send message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommunityDiscussions;
