import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSingleArticle, likeArticle } from "../../services/userApi";
import Articles from "../../components/Articles/Articles";
import { FiHeart } from "react-icons/fi";
import { toast } from "react-toastify";
import Loader from "../../Pages/Loader";

function ViewArticle() {
  const location = useLocation();
  const id = location.state;
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSingleArticle(id)
      .then((res) => {
        setTimeout(() => {
          setArticle(res.data.singleArticle);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const LikeArticle = (id) => {
    try {
      likeArticle(id).then((res) => {
        if (res.data.user) {
          toast.warn(res.data.message);
        } else if (res.data.success) {
          toast.success(res.data.message);
          setArticle(res.data.article);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap h-full">
      <div className="w-full md:w-3/4 p-4">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="bg-gray-100 rounded-lg p-4">
              Explore our featured articles below to discover valuable insights and stay up-to-date with the latest trends in the industry.
            </div>
            <div className="w-full p-4">
              {article && (
                <div className="border border-gray-300 rounded-lg p-4 mb-4">
                  <h2 className="text-lg font-semibold mb-3">Featured Article</h2>
                  <img
                    src={article.image}
                    alt=""
                    className="w-full max-w-xl rounded-lg mb-6"
                  />
                  <p className="text-gray-700 text-2xl font-bold mb-6">
                    {article.title}
                  </p>
                  <p className="text-lg text-gray-700 mb-6">{article.description}</p>
                  <div className="flex items-center mt-4">
                    <button onClick={() => LikeArticle(article._id)}>
                      <FiHeart className="h-6 w-6 text-red-500 mr-1" />
                    </button>
                    <p className="text-gray-500">{article?.likes?.count}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="w-full md:w-1/4 p-4 border-l overflow-y-auto h-full">
        <Articles />
      </div>
    </div>
  );
}

export default ViewArticle;