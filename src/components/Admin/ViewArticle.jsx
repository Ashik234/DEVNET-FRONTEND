import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSingleArticle } from '../../services/userApi';
import Loader from '../../Pages/Loader';

function ViewArticle() {
  const [article, setArticle] = useState(null);
  const location = useLocation();
  const id = location.state;

  useEffect(() => {
    getSingleArticle(id)
      .then((res) => {
        setArticle(res.data.singleArticle);
      })
      .catch((error) => {
        console.error('Error fetching article:', error);
      });
  }, [id]);

  if (!article) {
    return <div><Loader/></div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="mb-4">
        <img
          className="max-w-full h-auto"
          src={article.image}
          alt="Article Image"
        />
      </div>
      <p className="text-gray-600 mb-4">{article.date}</p>
      <div className="text-lg mb-4">{article.description}</div>
    </div>
  );
}

export default ViewArticle;
