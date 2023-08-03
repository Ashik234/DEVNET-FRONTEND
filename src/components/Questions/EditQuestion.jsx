import React, { useEffect, useState } from "react";
import { useLocation ,useNavigate } from "react-router-dom";
import { getSingleQuestion,editQuestion } from "../../services/userApi";
import { toast } from "react-toastify";

function EditQuestion() {
    const navigate = useNavigate();

  const location = useLocation();
  const id = location.state;

  const [question, setQuestion] = useState({
    title:"",
    description:"",
    tags:""
  });

  useEffect(() => {
    getSingleQuestion(id).then((res) => {
      console.log(res.data);
      setQuestion(res.data.singlequestion);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    editQuestion(id, question)
      .then((res) => {
        toast.success(res.data.message)
        navigate("/questions")

      })
      .catch((error) => {
        console.error("Error updating question:", error);
      });
  };



  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="modal">
        <h2 className="text-2xl mb-4">Edit Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-1">
              Title:
            </label>
            <input
              type="text"
              placeholder='Title Of The Question' 
              name='title'
              value={question.title}
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
              value={question.description}
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
              value={question.tags}
              onChange={(e)=>{setQuestion({...question,[e.target.name]:e.target.value})}}
              className="w-full px-3 py-2 border border-gray-300 rounded"/>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditQuestion;


 
 



 


