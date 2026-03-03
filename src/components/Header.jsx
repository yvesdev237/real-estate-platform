import React from 'react'
import { FaBell } from 'react-icons/fa'

const Header = () => {
  return (
    <div className='flex justify-between items-center w-full h-20 px-0 mx-0'>
      <div>
        <img src="../src/images/zilohomewb.png" alt="logo" className='w-30 h-25'/>
      </div>
      <div className='bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center'>
        <FaBell className='w-8 h-8 '/>
      </div>
    </div>
  )
}

export default Header