import React, { useEffect, useState } from 'react';
import { reportCount, userCount } from '../../services/adminApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function DashBoard() {
  const [userCounts, setUserCount] = useState(0);
  const [reportCounts, setReportCount] = useState(0);

  useEffect(() => {
    userCount().then((res) => {
      setUserCount(res.data.count);
    });
    reportCount().then((res) => {
      setReportCount(res.data.count);
    });
  }, []);

  const data = [
    {
      name: 'Counts',
      users: userCounts,
      reports: reportCounts,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold">Welcome, Admin!</h2>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 mt-4" style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h3>User Counts</h3>
          <BarChart width={400} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" name="Total Users" fill="rgba(54, 162, 235, 0.6)" />
          </BarChart>
        </div>
        <div style={{ flex: 1 }}>
          <h3>Report Counts</h3>
          <BarChart width={400} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="reports" name="Total Reports" fill="rgba(385, 15, 0, 0.6)" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
