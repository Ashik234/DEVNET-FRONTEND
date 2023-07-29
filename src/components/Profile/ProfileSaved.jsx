import React, { useState, useEffect } from "react";
import PROFILE from "../../assets/profile.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { getSavedQuestions } from "../../services/userApi";

function ProfileSaved({ id }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getSavedQuestions(id).then((res) => {
      setQuestions(res.data.savedQuestions.saved);
    });
  }, []);

  return (
    <div>
      {questions.map((question) => (
        <div className="bg-white rounded-lg shadow-lg p-4 mt-8" key={question._id}>
          <div className="flex items-center justify-between mb-3 mr-4">
            <div className="flex items-center mr-4 ml-3 mt-8">
              <img
                src={PROFILE}
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
      ))}
    </div>
  );
}

export default ProfileSaved;
