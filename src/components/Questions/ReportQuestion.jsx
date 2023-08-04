import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { reportQuestion } from "../../services/userApi";
import { toast } from "react-toastify";
function ReportQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;
  console.log(id);
  const [reportReason, setReportReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    reportQuestion(id, reportReason).then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        navigate("/questions");
    })
    .catch((error) => {
        console.error("Error updating question:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Report Question</h2>
        <p className="mb-4">
          Please provide a reason for reporting this question:
        </p>
        <textarea
          name="reason"
          onChange={(e) => {
            setReportReason({
              ...reportReason,
              [e.target.name]: e.target.value,
            });
          }}
          className="block w-full border rounded-md p-2 mb-4"
          placeholder="Enter your reason here..."
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
            onClick={handleSubmit}
          >
            Submit Report
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

export default ReportQuestion;
