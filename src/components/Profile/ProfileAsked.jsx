import React, { useEffect, useState } from 'react';
import { askedQuestions } from '../../services/userApi';
import PROFILE from "../../assets/profile.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
function ProfileAsked({ id }) {
  const [asked, setAsked] = useState([]);

  useEffect(() => {
    askedQuestions(id).then((res) => {
      console.log(res.data.askedQuestions.asked);
      setAsked(res.data.askedQuestions.asked);
    });
  }, []);

  return (
    <div>
      {asked.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-4 mt-8 text-center">
          <div className="text-lg font-bold mb-2">You have not asked any questions</div>
          <Link to="/questions/ask">
          
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Ask a question
          </button>
          </Link>
        </div>
      ) : (
        asked.map((question, index) => (
          <div className="bg-white rounded-lg shadow-lg p-4 mt-8" key={index}>
            <div className="flex items-center justify-between mb-3 mr-4">
              <div className="flex items-center mr-4 ml-3 mt-8">
                <img
                  src={question?.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-4 ml-7"
                />
                <div className="font-bold mr-4">{question.username}</div>
                <div className="mr-4">(Time)</div>
              </div>
            </div>
            <div className="flex items-center font-bold ml-7">
              {question.questionId.title}
            </div>
            <div className="flex items-center my-4 ml-7">
              {question.questionId.description}
            </div>

            <div className="flex items-center text-left">
              {question.questionId.tags.map((tag) => (
                <div
                  className="bg-gray-300 text-gray-800 rounded-full py-1 px-2 mr-4 ml-5"
                  key={tag}
                >
                  {tag}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between py-3 mr-4 ml-7">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faComment}
                  className="w-6 h-6 text-gray-600 hover:text-gray-800 mr-3"
                />
                <span className="text-sm text-gray-600">5 Answers</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProfileAsked;
