import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FaBookmark } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote, BiErrorCircle } from "react-icons/bi";
import { LuEdit2 } from "react-icons/lu";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  getQuestion,
  saveQuestion,
  searchQuestions,
} from "../../services/userApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Articles from "../../components/Articles/Articles";

function Questions() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");
  const profiledata = useSelector((state) => state.user);

  useEffect(() => {
    const getQuestions = () => {
      getQuestion().then((res) => {
        setData(res.data.questionData);
      });
    };
    getQuestions();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      searchQuestions(searchQuery)
        .then((res) => {
          setSearchResults(res.data.questionData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchQuery]);

  const navigateToView = (id) => {
    navigate(`/questions/viewquestion`, { state: id });
  };

  const navigateToEdit = (id) => {
    navigate(`/questions/edit`, { state: id });
  };

  const navigateToReport = (id) => {
    navigate(`/questions/report`, { state: id });
  };

  const saveQuestions = (id) => {
    saveQuestion(id).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.warn(res.data.message);
      }
    });
  };
  saveQuestions();

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  const filteredData = selectedTag
    ? data.filter((item) => item.tags.includes(selectedTag))
    : data;

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-3/4 p-4">
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-full md:w-1/3 mb-2 md:mb-0">
              <select
                className="w-full bg-gray-200 text-gray-700 rounded-full py-2 px-4 focus:outline-none border border-gray-400"
                value={selectedTag}
                onChange={(e) => handleTagSelect(e.target.value)}
              >
                <option value="">Select a Tag</option>
                {data.map((item) => (
                  <option key={item._id} value={item.tags}>
                    {item.tags}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/3 md:text-center">
              <Link to="/questions/ask">
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 px-4 font-semibold">
                  Ask a Question
                </button>
              </Link>
            </div>
            <div className="hidden md:block w-1/3 text-right">
              <Link to="/questions/ask">
                <button className="text-blue-500 hover:text-blue-700 font-semibold">
                  Need Help? Ask the Community
                </button>
              </Link>
            </div>
          </div>
        </div>

        {searchQuery && searchResults.length > 0 ? (
          searchResults.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 mb-4"
            >
              <div className="flex items-center justify-between mb-4 mr-4 ml-3">
                <div className="flex items-center mr-4 ml-5">
                  <img
                    src={item.userId.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-4 ml-7"
                  />
                  <div className="font-bold mr-4">{item.userId.username}</div>
                  <div className="mr-4">({item.createdAt})</div>
                </div>
                {profiledata.userId === item.userId._id && <LuEdit2 />}
                <BiErrorCircle />
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
                    {item.numAnswers} Answers
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
          ))
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-2xl font-bold mb-4">
                Oops! No questions found.
              </p>
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
          filteredData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 mb-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center mr-4 ml-5">
                  <img
                    src={item.userId.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-4 ml-7"
                  />
                  <div className="font-bold text-gray-700 mr-4">
                    {item.userId.username}
                  </div>
                  <div className="text-gray-600 mr-4">({item.createdAt})</div>
                </div>
                {profiledata.userId === item.userId._id && (
                  <button onClick={() => navigateToEdit(item._id)}>
                    <LuEdit2 className="text-gray-600 hover:text-gray-800" />
                  </button>
                )}
                <button onClick={() => navigateToReport(item._id)}>
                  <BiErrorCircle
                    size={25}
                    className="text-red-600 hover:text-red-800"
                  />
                </button>
              </div>
              <div className="font-semibold text-lg ml-7 px-9 text-gray-800">
                {item.title}
              </div>
              <div className="mt-2 ml-7 px-9 text-gray-700">
                {item.description}
              </div>
              <div className="flex items-center mt-3 ml-7 px-9">
                {item.tags.map((tag, tagIndex) => (
                  <div
                    key={tagIndex}
                    className="bg-blue-100 text-blue-600 rounded-full py-1 px-3 mr-2 text-sm"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mx-7 px-9 mt-3">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="w-6 h-6 text-gray-600 hover:text-gray-800 mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    {item.numAnswers} Answers
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => navigateToView(item._id)}
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    View Question
                  </button>
                  <button
                    onClick={() => saveQuestions(item._id)}
                    className="relative ml-3"
                  >
                    <FaBookmark className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="w-full md:w-1/4 p-4 border-l">
        <Articles />
      </div>
    </div>
  );
}
export default Questions;
