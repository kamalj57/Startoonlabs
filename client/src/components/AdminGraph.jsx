import React from 'react'

const AdminGraph = ({totalUsers,totalLoginCount}) => {
  return (
    <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
    
  <dl className="flex items-center mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-2">
    <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500">Total Users</dt>

      <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{totalUsers}</dd>
    </div>

    <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500">Total Clicks</dt>

      <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{totalLoginCount}</dd>
    </div>
  </dl>
</div>
  )
}

export default AdminGraph