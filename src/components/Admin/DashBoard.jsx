import React, { useEffect, useState } from "react";
import {
  articleMetrics,
  reportCount,
  userCount,
} from "../../services/adminApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";




function DashBoard() {
  const [userCounts, setUserCount] = useState(0);
  const [reportCounts, setReportCount] = useState(0);
  const [articleMetricsData, setArticleMetricsData] = useState({
    mostPopularTitle: "",
    totalArticles: 0,
  });
  const [sorted, setSortedArticles] = useState([]);
  useEffect(() => {
    userCount().then((res) => {
      setUserCount(res.data.count);
    });
    reportCount().then((res) => {
      setReportCount(res.data.count);
    });
  }, []);
  useEffect(() => {
    articleMetrics().then((res) => {
      const articleMetricsData = res.data.metrics;
      const sortedArticles = res.data.metrics.sortedArticles;
      setArticleMetricsData(articleMetricsData);
      setSortedArticles(sortedArticles);
    });
  }, []);

  const data = [
    {
      name: "Counts",
      users: userCounts,
      reports: reportCounts,
    },
  ];
  const likesChartData = sorted?.map((article) => ({
    title: article.title,
    likes: article.likes.count,
    
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold">Welcome, Admin!</h2>
      </div>
      <div
        className="bg-white rounded-lg shadow-lg p-4 mt-4"
        style={{ display: "flex" }}
      >
        <div style={{ flex: 1 }}>
          <h3 className="text-xl font-normal">User Counts</h3>
          <ResponsiveContainer width={"100%"} height={300}>
          <BarChart  data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="users"
              name="Total Users"
              fill="rgba(54, 162, 235, 0.6)"
            />
          </BarChart>
          </ResponsiveContainer >
        </div>
        <div style={{ flex: 1 }}>
          <h3 className="text-xl font-normal">Report Counts</h3>
          <ResponsiveContainer width={"100%"} height={300}>

          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="reports"
              name="Total Reports"
              fill="rgba(385, 15, 0, 0.6)"
            />
          </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
        <h3 className="text-xl font-normal mb-2">Article Metrics</h3>
        <p className="text-gray-600">
          Total number of articles: {articleMetricsData.totalArticles}
        </p>
        <p className="text-gray-600">
          Most popular article: {articleMetricsData.mostPopularTitle}
        </p>
      </div>
            <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
        <h3 className="text-xl font-normal">Most Liked Articles</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={likesChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="custom-tooltip">
                      <p className="label">{`${label} : ${payload[0].value}`}</p>
                      <p className="intro">{/* Add your own intro logic here */}</p>
                      {/* <p className="desc">Anything you want can be displayed here.</p> */}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Bar dataKey="likes" barSize={20} fill="rgba(255, 99, 132, 0.6)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default DashBoard;
