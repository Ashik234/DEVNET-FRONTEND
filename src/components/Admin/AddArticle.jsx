import React, { useState } from 'react';
import { addArticle } from '../../services/adminApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddArticle() {
  const [article, setArticle] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!article || !article.title || article.title.trim() === "") {
        return toast.warn("Title should not be empty");
      } else if (!article || !article.description || article.description.trim() === "") {
        return toast.warn("Description should not be empty");
      } else {
       try {
        const formData = new FormData();
          formData.append("title", article.title);
          formData.append("image", article.image);
          formData.append("description", article.description);
          addArticle(formData).then((res)=>{
            setArticle(res.data)
          if(res.data.success){
            toast.success(res.data.message)
            navigate("/admin/articles")
          }
        })
       } catch (error) {
        console.log(error);
       }
      }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Add Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            name="title"
            type="text"
            placeholder="Enter title"
            onChange={(e)=>{setArticle({...article,[e.target.name]:e.target.value})}}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            name='image'
            type="file"
            placeholder="Enter image URL"
            onChange={(e)=>{setArticle({...article,[e.target.name]:e.target.files[0]})}}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name='description'
            placeholder="Enter description"
            rows="4"
            onChange={(e)=>{setArticle({...article,[e.target.name]:e.target.value})}}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddArticle;
