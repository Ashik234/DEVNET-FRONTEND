import React, {useState, useEffect } from "react";
import PROFILE from "../../assets/profile.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getQuestion } from "../../services/userApi";

function Questions() {
  const [data, setData] = useState([])

  useEffect(() => {
    const getQuestions=()=>{
      getQuestion().then((res)=>{
        setData(res.data.questionData)
      })
    }
    getQuestions() 
  }, [])
  
  return (
    <div>
      <div className="bg-gray-400 mt-4 mx-auto max-w-4xl p-4 text-center rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-4 ml-4">
              <select className="bg-gray-300 text-gray-800 rounded-full py-1 px-2 focus:outline-none">
                <option value="">Tags</option>
                <option value="">JAVASCRIPT</option>
              </select>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-2 ml-4">Sorted by:</div>
            <div className="relative">
              <select className="bg-gray-300 text-gray-800 rounded-full py-1 px-2 focus:outline-none">
                <option value="">Sort by</option>
                <option value="">Highest Votes</option>
              </select>
            </div>
          </div>
          <Link to="/questions/ask">
            <button className="bg-blue-500 hover:bg-blue-600 text-white  rounded-full py-1 px-4 mr-4">
              Ask a Question
            </button>
          </Link>
        </div>
      </div>

    {data.map((item,index)=>{
      return(
      <div key={index} className="bg-gray-400 mt-6 mx-auto max-w-4xl p-4 text-center rounded-lg">
        <div className="flex items-center justify-between mb-4 mr-4">
          <div className="flex items-center mr-4 ml-3">
            <img
              src={PROFILE}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-4 ml-7"
            />
            <div className="font-bold mr-4">{item.userId.username}</div>
            <div className="mr-4">(Time)</div>
          </div>
        </div>
        <div className="flex items-center font-bold ml-7">
          {item.title}
        </div>
        <div className="flex items-center my-4 ml-7">
        {item.description}
        </div>

        <div className="flex items-center text-left">
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

        <div className="text-left py-3 mr-4 ml-7">
          <FontAwesomeIcon
            icon={faComment}
            className="w-6 h-6 text-gray-600 hover:text-gray-800 mr-3"
          />
          5 Answers
        </div>
      </div>
      )
    })}
    </div>
  );
}

export default Questions;
