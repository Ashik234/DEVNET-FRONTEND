import React, { useState } from "react";
import { toast } from "react-toastify";
import { askQuestion } from "../../services/userApi";
import { useNavigate } from "react-router-dom";

function AskQuestion() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    title:"",
    description:"",
    tags:""
  });
 

  const handleSubmit = (e) => {
    e.preventDefault();
    if(question.title.trim()==""){
      return toast.warn("Title should not be empty");
    }else if(question.description.trim()==""){
      return toast.warn("Description Should Not Be Empty")
    }else if(question.tags.trim()==""){
      return toast.warn("Tags Should Not Be Empty")
    }else{
      try {
        askQuestion({...question}).then((res)=>{
          if(res.data.success){
            toast.success(res.data.message);
            navigate("/questions")
          }
        })
      } catch (error) {
        console.log(error);
      }
    } 
  };

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="modal">
        <h2 className="text-2xl mb-4">Ask a Question?</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-1">
              Title:
            </label>
            <input
              type="text"
              placeholder='Title Of The Question' 
              name='title'
              onChange={(e)=>{setQuestion({...question,[e.target.name]:e.target.value})}}
              className="w-full px-3 py-2 border border-gray-300 rounded"/>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-1">
              Description:
            </label>
            <textarea
              onChange={(e)=>{setQuestion({...question,[e.target.name]:e.target.value})}}
              placeholder='Write A Brief Description About The Question' 
              name='description'
              className="w-full px-3 py-2 border border-gray-300 rounded"
              rows={4}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block font-bold mb-1">
              Tags:
            </label>
            <input
              type="text"
              placeholder='Tags Related To The Question' 
              name='tags'
              onChange={(e)=>{setQuestion({...question,[e.target.name]:e.target.value})}}
              className="w-full px-3 py-2 border border-gray-300 rounded"/>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Post Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
