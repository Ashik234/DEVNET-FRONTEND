import React from 'react';
import PROFILE from "../../assets/profile.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComment} from '@fortawesome/free-solid-svg-icons'
function Questions() {
  return (
    <div className='bg-gray-500 mt-32 mx-auto max-w-4xl p-4 text-center'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <img src={PROFILE} alt='Profile' className='w-10 h-10 rounded-full mr-2 ml-3' />
          <div className='font-bold ml-3'>User Name</div>
          <div className='ml-3'>Time</div>
        </div>
      </div>
      <div className='flex items-center font-bold'>Why is processing a sorted array faster than processing an unsorted array?</div>
      <div className='flex items-center my-4'>In this C++ code, sorting the data (before the timed region) makes the primary loop ~6x faster: #include #include</div>
      <div className='flex items-center'>
        <div className='bg-gray-300 text-gray-800 rounded-full py-1 px-2 mr-2'>JavaScript</div>
        <div className='bg-gray-300 text-gray-800 rounded-full py-1 px-2 mr-2'>Java</div>
        <div className='bg-gray-300 text-gray-800 rounded-full py-1 px-2 mr-2'>Python</div>
      </div>
      <div><FontAwesomeIcon
                    icon={faComment}
              className="w-6 h-6 text-gray-600 hover:text-gray-800"
              
                    />5 Answers</div>
    </div>
  );
}

export default Questions;
