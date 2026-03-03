import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'


const PropertyCard = ({propImage ,amenities ,redirect, propTitle  , price , isForRent , located}) => {

    const [favState , setFavState] = useState(false)


  return (
    <div className='flex items-start justify-center relative rounded-2xl w-full flex-col my-2 border'>
            <img src={propImage} alt="propImage" className='w-full h-70 rounded-t-2xl object-cover'/>
        <div className='flex flex-col items-start rounded-b-2xl justify-center gap-1 p-3 w-full bg-white'>
          <div className='flex justify-between items-center w-full'>
            <p className='text-xl text-blue-800 font-extrabold'>{price} {isForRent ? "Fcfa/month" : "Fcfa"} </p>
            <button onClick={redirect} className='rounded-2xl p-1.5 text-center text-white text-md  bg-violet-500 cursor'>details</button>
          </div>
            <p className='font-bold text-2xl'>{propTitle}</p>
            <p className='font-semibold text-md text-gray-800'>{amenities}</p>
            <p className='font-semibold text-md text-gray-800'>{located} </p>
        </div>
        <FaHeart  className={`w-8 h-8 rounded-full absolute right-4 top-4 ${favState ? "text-red-600" : "text-black/50"}`} onClick={() => setFavState(!favState)}/>
        <span className='w-auto p-1 h-10 rounded-xl border absolute bg-blue-700 text-lg text-white left-4 top-4'>{isForRent ? "For Rent" : "For Sale"}</span>
    </div>
  )
}

export default PropertyCard