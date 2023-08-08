import React, { useEffect, useState } from 'react';
import { reportCount, userCount } from '../../services/adminApi';

function DashBoard() {
  const [userCounts, setUserCount] = useState(0);
  const [reportCounts, setReportCount] = useState(0);
  useEffect(()=>{
    userCount().then((res)=>{
      setUserCount(res.data.count);
      console.log(res.data);
    })
    reportCount().then((res)=>{
      setReportCount(res.data.count)
      console.log(res.data);
    })
  },[])
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-3">Welcome, Admin!</h2>
        <p>
          Total users: {userCounts}
        </p>
        <p>
          Total reports: {reportCounts}
        </p>
      </div>
    </div>
  );
}

export default DashBoard;
