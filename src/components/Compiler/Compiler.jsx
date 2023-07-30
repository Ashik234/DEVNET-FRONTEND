import React, { useState } from "react";
import { FaGooglePlay } from "react-icons/fa";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

function Compiler() {
  const [htmlcode, setHtmlCode] = useState("");
  const [csscode, setCssCode] = useState("");
  const [jscode, setJsCode] = useState("");

  const handleOutput = () => {
    const iframe = document.getElementById("output");
    const outputHTML = `
      <html>
        <head>
          <style>${csscode}</style>
        </head>
        <body>${htmlcode}</body>
        <script>${jscode}</script>
      </html>
    `;
    iframe.contentDocument.open();
    iframe.contentDocument.write(outputHTML);
    iframe.contentDocument.close();
  };

  return (
    <div className="bg-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xl font-semibold">DevNet Compiler</div>

        <button
          onClick={handleOutput}
          className="flex bg-green-600 text-white py-1 px-3 rounded"
        >
          Run
          <FaGooglePlay size={13} className="mt-1 ml-2" />
        </button>
      </div>

      <div className="flex">
      <div className="text-lg font-semibold mb-2">HTML</div>
        <AceEditor
          mode="html"
          theme="github"
          value={htmlcode}
          onChange={(newValue) => setHtmlCode(newValue)}
          name="html-code-editor"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          className="flex-1 mr-2"
        />
           <div className="text-lg font-semibold mb-2">CSS</div>

        <AceEditor
          mode="css"
          theme="github"
          value={csscode}
          onChange={(newValue) => setCssCode(newValue)}
          name="css-code-editor"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          className="flex-1 mr-2"
        />
           <div className="text-lg font-semibold mb-2">JAVASCRIPT</div>

        <AceEditor
          mode="javascript"
          theme="github"
          value={jscode}
          onChange={(newValue) => setJsCode(newValue)}
          name="js-code-editor"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          className="flex-1"
        />
      </div>

      <div className="mt-4">
        <div className="text-xl font-semibold mb-2">Output Preview</div>
        <iframe
          id="output"
          className="w-full h-64 border bg-white rounded-lg"
          title="Output Preview"
        ></iframe>
      </div>
    </div>
  );
}

export default Compiler;    