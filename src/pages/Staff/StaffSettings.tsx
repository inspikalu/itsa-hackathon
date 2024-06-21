import React from 'react'

const StaffSettings:React.FC = function() {
  return (
    <>
      <div className='p-7'>
        <div className="flex gap-3">
          <div className="w-[7rem] h-[7rem] rounded-[50%] bg-white items-center justify-center"></div>
          <div className='flex flex-col tems-center justify-center gap-2'>
            <span className='font-bold text-4xl'>John Doe</span>
            <span>johndoe@gmail.com</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default StaffSettings
