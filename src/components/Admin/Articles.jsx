import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { articleAction, getArticles } from "../../services/adminApi";
import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
function Articles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then((res) => {
        setArticles(res.data.articleData);
      })
      .catch((error) => {
        console.error("Failed to fetch article data:", error);
      });
  }, []);

  const handleAction = (id) => {
    articleAction(id)
      .then((res) => {
        toast.success(res.data.message);
        getArticles()
          .then((res) => {
            setArticles(res.data.articleData);
          })
          .catch((error) => {
            console.error("Failed to fetch article data:", error);
          });
      })
      .catch((error) => {
        console.error("Error blocking/unblocking Article:", error);
      });
  };

  const navigateToEdit = (id) => {
    navigate(`/admin/articles/edit`, { state: id });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Link to="/admin/articles/add">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Article
          </button>
        </Link>
      </div>
      <p className="mb-4">Home | Articles</p>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-center">No</th>
            <th className="px-4 py-2 text-center">Article Name</th>
            <th className="px-4 py-2 text-center">Image</th>
            <th className="px-4 py-2 text-center">Description</th>
            <th className="px-4 py-2 text-center">Status</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">{item.title}</td>
              <td className="border px-4 py-2 flex justify-center items-center">
                <img
                  className="h-10 w-10"
                  src={item.image}
                  alt="category image"
                />
              </td>

              <td className="border px-4 py-2 text-center">
                {item.description}
              </td>
              <td className="border px-4 py-2 text-center">
                <div className="flex flex-col justify-center h-full">
                  {item.status ? "Active" : "Inactive"}
                </div>
              </td>
              <td className="px-4 py-2 text-center flex justify-center items-center">
              <button onClick={() => navigateToEdit(item._id)}>
                <FiEdit2 className="mr-8" />
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAction(item._id)}
                >
                  {item.status ? "Unlist" : "List"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Articles;
