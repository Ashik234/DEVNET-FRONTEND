import React from 'react'
import { LineWave } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex justify-center items-center">
    <LineWave
      height="100"
      width="100"
      color="#fffff"
      ariaLabel="line-wave"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />
  </div>
  )
}

export default Loader
