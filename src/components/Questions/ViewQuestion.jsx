import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getSingleQuestion } from "../../services/userApi";
import { submitAnswer, answerVerified } from "../../services/userApi";
import { useLocation } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { LuEdit2 } from "react-icons/lu";
import { useSelector } from "react-redux/es/hooks/useSelector";
import EditAnswer from "./EditAnswer";
import Articles from "../../components/Articles/Articles";

function ViewQuestion() {
  const location = useLocation();
  const id = location.state;
  const profiledata = useSelector((state) => state.user);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleUpdate = (updatedAnswer) => {
    setQuestion(updatedAnswer);
  };

  useEffect(() => {
    getSingleQuestion(id).then((res) => {
      setQuestion(res.data.singlequestion);
    });
  }, []);

  const AnswerVerified = (id) => {
    try {
      answerVerified(id).then((res) => {
        setQuestion(res.data.updatedAnswer);
        toast.success(res.data.message);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const SubmitAnswer = (e) => {
    e.preventDefault();
    if (!answer || !answer.answer || answer.answer.trim() === "") {
      return toast.warn("Answer should not be empty");
    } else {
      try {
        submitAnswer(id, answer).then((res) => {
          if (res.data.success) {
            getSingleQuestion(id).then((res) => {
              setQuestion(res.data.singlequestion);
            });
            toast.success(res.data.message);
          } else {
            toast.warn(res.data.message);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-3/4 p-4">
        {question ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400">
            <div className="max-w-4xl mt-8 w-full bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
              <p className="text-gray-500">
                Posted by {question.userId.username}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                ({question.createdAt})
              </p>
              <div className="bg-gray-200 p-4 rounded-md">
                <p>{question.description}</p>
              </div>
            </div>

            <div className="mt-6 max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold mb-2">Answers</h2>

              {question?.answers.map((item, index) => (
                <div key={index} className="bg-gray-200 p-4 rounded-md mb-4">
                  <div className="flex items-center mb-2 ml-10">
                    <div className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center mr-2">
                      <p className="text-white font-bold">JS</p>
                    </div>
                    <div className="flex">
                      <p className="text-gray-500 mb-1 mr-2">
                        Posted by {item.userId.username}
                      </p>
                      <p className="text-gray-500">Posted on (July 14, 2023)</p>
                    </div>
                    {profiledata.userId === item.userId._id && (
                      <button onClick={openEditModal}>
                        <LuEdit2 />
                      </button>
                    )}
                    {showEditModal && (
                      <div className="modal-overlay">
                        <EditAnswer
                          answerid={item._id}
                          onUpdate={handleUpdate}
                          onClose={closeEditModal}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex">
                    {profiledata.userId === item.userId._id && (
                      <TiTick
                        onClick={() => AnswerVerified(item._id)}
                        size={30}
                        className={`cursor-pointer ${
                          item.verified ? "text-green-600" : ""
                        }`}
                      />
                    )}
                    <p className="text-gray-800 ml-12">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold mb-2">Your Answer</h2>
              <div className="bg-gray-200 p-4 rounded-md">
                <textarea
                  className="w-full px-3 py-2 mb-2 rounded-md resize-none"
                  rows="4"
                  placeholder="Enter your answer..."
                  name="answer"
                  onChange={(e) => {
                    setAnswer({ ...answer, [e.target.name]: e.target.value });
                  }}
                ></textarea>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={SubmitAnswer}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        </div>
        <div className="w-full md:w-1/4 p-4 border-l">
          <Articles />
        </div>
      
    </div>
  );
}
export default ViewQuestion;
