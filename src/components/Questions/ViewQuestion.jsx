import React, { useState, useEffect } from 'react';
import { getSingleQuestion } from '../../services/userApi';
import { useLocation } from 'react-router-dom';

function ViewQuestion() {
  const location = useLocation();
  const id = location.state;

  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    getSingleQuestion(id).then((res) => {
      setQuestion(res.data);
    });
  }, []);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const submitAnswer = () => {
    
    console.log(answer);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400">
      <div className="max-w-4xl mt-8 w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">{question.singlequestion?.title}</h1>
        <p className="text-gray-500">Posted by {question.singlequestion?.userId.username}</p>
        <p className="text-gray-500 text-sm mb-4">Posted on July 14, 2023</p>
        <div className="bg-gray-200 p-4 rounded-md">
          <p>{question.singlequestion?.description}</p>
        </div>
      </div>

      <div className="mt-6 max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-2">Answers</h2>

        <div className="bg-gray-200 p-4 rounded-md">
          <div className="flex items-center mb-2">
            <div className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center mr-2">
              <p className="text-white font-bold">JS</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Posted by Jane Smith</p>
              <p className="text-gray-500 text-sm">Posted on July 14, 2023</p>
            </div>
          </div>
          <p className="text-gray-800">This is a description of the answer.</p>
        </div>
      </div>

      <div className="mt-6 max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-2">Your Answer</h2>

        <div className="bg-gray-200 p-4 rounded-md">
          <textarea
            className="w-full px-3 py-2 mb-2 rounded-md resize-none"
            rows="4"
            placeholder="Enter your answer..."
            value={answer}
            onChange={handleAnswerChange}
          ></textarea>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={submitAnswer}
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewQuestion;
