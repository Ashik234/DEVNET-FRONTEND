import React, { useState, useEffect } from "react";
import PROFILE from "../../assets/profile.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FaBookmark } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { getQuestion, saveQuestion } from "../../services/userApi";
import { toast } from "react-toastify";

function Questions() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getQuestions = () => {
      getQuestion().then((res) => {
        setData(res.data.questionData);
      });
    };
    getQuestions();
  }, []);

  const navigateToView = (id) => {
    navigate(`/questions/viewquestion`, { state: id });
  };

  
    const saveQuestions = (id) => {
        saveQuestion(id).then((res) => {
          console.log(res.data);
          if (res.data.success) {
            toast.success(res.data.message);
          }
        });
    };
    saveQuestions();

  return (
    <div>
      {data.length === 0 ? (
        <div
          className="flex items-center justify-center"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="text-center text-gray-500">
            <p className="text-2xl font-bold mb-4">Oops! No questions found.</p>
            <p className="text-lg">
              Be the first to ask a question and start the conversation!
            </p>
            <div className="mt-6">
              <Link to="/questions/ask">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-lg">
                  Ask a Question
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-gray-400 mt-4 mx-auto max-w-4xl p-4 text-center rounded-lg">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center mb-2">
                <div className="relative mr-4">
                  <select className="bg-gray-300 text-gray-800 rounded-full py-1 px-2 focus:outline-none">
                    <option value="">Tags</option>
                    <option value="">JAVASCRIPT</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="mr-2">Sorted by:</div>
                <div className="relative">
                  <select className="bg-gray-300 text-gray-800 rounded-full py-1 px-2 focus:outline-none">
                    <option value="">Sort by</option>
                    <option value="">Highest Votes</option>
                  </select>
                </div>
              </div>
              <div className="ml-auto">
                <Link to="/questions/ask">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-1 px-4">
                    Ask a Question
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div>
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-400 mt-6 mx-auto max-w-4xl p-4 text-center rounded-lg relative"
                >
                  <div className="flex items-center justify-between mb-4 mr-4 ml-3">
                    <div className="flex items-center mr-4 ml-5">
                      <img
                        src={PROFILE}
                        alt="Profile"
                        className="w-10 h-10 rounded-full mr-4 ml-7"
                      />
                      <div className="font-bold mr-4">
                        {item.userId.username}
                      </div>
                      <div className="mr-4">({item.createdAt})</div>
                    </div>
                  </div>
                  <div className="">
                    {/* <BiUpvote size={30} className="mr-3 cursor-pointer" />
                    <BiDownvote size={30} className="cursor-pointer" /> */}
                  </div>
                  <div className="flex items-center font-bold ml-7 px-9">
                    {item.title}
                  </div>
                  <div className="flex items-center my-4 ml-7 px-9">
                    {item.description}
                  </div>

                  <div className="flex items-center text-left px-9">
                    <div className="bg-gray-300 text-gray-800 rounded-full py-1 px-2 mr-4 ml-5">
                      {item.tags}
                    </div>
                    <div className="bg-gray-300 text-gray-800 rounded-full py-1 px-2 mr-4 ml-3">
                      {item.tags}
                    </div>
                    <div className="bg-gray-300 text-gray-800 rounded-full py-1 px-2 mr-4 ml-3">
                      {item.tags}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mx-7 px-9">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faComment}
                        className="w-6 h-6 text-gray-600 hover:text-gray-800 mr-3"
                      />
                      <span className="text-left py-3">
                        {item.answers} 2 Answers
                      </span>
                    </div>

                    <div className="flex items-center">
                      <button onClick={() => navigateToView(item._id)}>
                        View Question
                      </button>
                      <button
                        onClick={() => saveQuestion(item._id)}
                        className="relative ml-3"
                      >
                        <FaBookmark className="w-6 h-6 text-gray-600 hover:text-gray-800 mr-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Questions;
