import React from "react";
import { FaGooglePlay } from "react-icons/fa";

function Compiler() {
 
  return (
    <div className="bg-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <select className="border rounded-lg p-2">
          <option value="">Select Language</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>

        <div className="text-xl font-semibold">DevNet Compiler</div>

        <button className="flex bg-green-600 text-white py-1 px-3 rounded">
          Run
          <FaGooglePlay size={13} className="mt-1 ml-2" />
        </button>
      </div>

      <textarea
        className="w-full h-40 border rounded-lg p-4 bg-stone-400 text-gray-800 resize-none"
        placeholder="Write your code here..."
      />

      <div className="bg-stone-400 rounded">Output</div>
   
     
    </div>
  );
}

export default Compiler;