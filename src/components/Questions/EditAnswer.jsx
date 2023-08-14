import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editAnswer, getSingleAnswer } from "../../services/userApi";

function EditAnswer({ answerid, onClose ,onUpdate}) {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState({ answers: [{ answer: "" }] });

  useEffect(() => {
    getSingleAnswer(answerid).then((res) => {
      setAnswer(res.data.singleAnswer);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    editAnswer(answerid, answer)
      .then((res) => {
        setAnswer(res.data.updatedAnswer);
        onUpdate(res.data.updatedAnswer)
        toast.success(res.data.message);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating answer:", error);
      });
  };
  console.log(answer);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Answer</h2>
        <p className="mb-4">
          Update and Improve Response for Better Understanding
        </p>
        <textarea
          name="answer"
          onChange={(e) => {
            setAnswer({
              answer: e.target.value,
            });
          }}
          value={answer?.answers?.[0]?.answer}
          className="block w-full border rounded-md p-2 mb-4"
          placeholder="Enter your Answer here..."
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditAnswer;
