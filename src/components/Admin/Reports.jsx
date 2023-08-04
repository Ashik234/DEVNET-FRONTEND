import React, { useEffect, useState } from 'react'
import { getReport, reportAction } from '../../services/adminApi';
import { toast } from 'react-toastify';

function Reports() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    getReport()
      .then((res) => {
        setReport(res.data.reportData);
      })
      .catch((error) => {
        console.error('Failed to fetch community data:', error);
      });
  }, []);

  const handleAction = (id) => {
    reportAction(id)
      .then((res) => {
        toast.success(res.data.message);
        getReport()
          .then((res) => {
            console.log(res.data.reportData);
            setReport(res.data.reportData);
          })
          .catch((error) => {
            console.error("Failed to fetch user data:", error);
          });
      })
      .catch((error) => {
        console.error("Error blocking/unblocking user:", error);
      });
  };

  return (
    <div>
    <h1 className="text-3xl font-bold mb-4">Reports</h1>
    <p className="mb-4">Home | Reports</p>
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-center">No</th>
          <th className="px-4 py-2 text-center">Question Title</th>
          <th className="px-4 py-2 text-center">Reason</th>
          <th className="px-4 py-2 text-center">Status</th>
          <th className="px-4 py-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {report.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            <td className="border px-4 py-2 text-center">{index + 1}</td>
            <td className="border px-4 py-2 text-center">{item.questionId.title}</td>
            <td className="border px-4 py-2 text-center">{item.reason}</td>
            <td className="border px-4 py-2 text-center">
              <div className="flex flex-col justify-center h-full">
                    {item.questionId.status ? 'Active' : 'Inactive'}
                  </div>
                </td>
            <td className="border px-4 py-2 text-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={()=> handleAction(item.questionId._id)}
              >
                {item.questionId.status ? "Unlist" : "List"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Reports