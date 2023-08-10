import React, { useEffect, useState } from "react";
import { getArticles } from "../../services/userApi";
import { useNavigate } from "react-router-dom";

function Articles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getArticles().then((res) => {
      setArticles(res.data.articleData);
    });
  }, []);

  const navigateToView = (id) => {
    navigate(`/viewarticle`, { state: id });
  };

  return (
    <div
      className="articles-container overflow-y-auto max-h-screen"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {articles.map((item, index) => (
        <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">Featured Article</h2>
          <img src={item.image} alt="" />
          <p className="text-black font-bold mb-4">{item?.title}</p>
          <p className="text-md text-semibold text-gray-700">
            {item?.description}
          </p>
          <button
            className="text-blue-500 hover:underline mt-3 inline-block font-semibold"
            onClick={() => navigateToView(item._id)}
          >
            Read more
          </button>
        </div>
      ))}
    </div>
  );
}

export default Articles;
