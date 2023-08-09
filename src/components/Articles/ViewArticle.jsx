import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSingleArticle } from '../../services/userApi';
import Articles from '../../components/Articles/Articles';

function ViewArticle() {
  const location = useLocation();
  const id = location.state;
  const [article, setArticle] = useState([]);

  useEffect(() => {
    getSingleArticle(id).then((res) => {
      setArticle([res.data.singleArticle]);
    });
  }, [id]);

  return (
    <div className="flex flex-wrap h-full">
      <div className="w-full md:w-3/4 p-4">
        <div className="bg-gray-100 rounded-lg p-4">
          Explore our featured articles below to discover valuable insights and stay up-to-date with the latest trends in the industry.
        </div>
        <div className="w-full p-4">
          {article.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
              <h2 className="text-lg font-semibold mb-3">Featured Article</h2>
              <img src={item.image} alt="" className="w-full rounded-lg mb-2" />
              <p className="text-gray-700 text-2xl font-bold">{item?.title}</p>
              <p className="text-lg text-gray-700">{item?.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/4 p-4 border-l overflow-y-auto h-full">
        <Articles />
      </div>
    </div>
  );
}

export default ViewArticle;
