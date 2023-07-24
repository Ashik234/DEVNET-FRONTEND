import React from 'react'

function Notifications() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>
      <p className="mb-4">Home | Notifications</p>
      <div className='flex justify-end mb-4'>
      <button className='bg-cyan-900 text-white font-semibold text-lg px-6 py-2 rounded-lg'>Create</button>
      </div>
      <div className='bg-gray-300 rounded-lg'>
        <h1 className='py-3 mb-4 ml-4'>Title : </h1>
        <h1 className='py-3 ml-4'>Description :</h1>
      </div>
    </div>
  )
}
export default Notifications