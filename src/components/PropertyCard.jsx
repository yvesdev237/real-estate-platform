import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


const PropertyCard = ({ propImage, amenities, propTitle, price, isForRent, located, id, landlord }) => {
  const [favState, setFavState] = useState(false)
  const navigate = useNavigate()

  const handleDetails = () => {
    // navigate to details page and pass property data in state
    const property = { propImage, amenities, propTitle, price, isForRent, located, id, landlord }
    navigate(`/dashboard/properties/${id ?? ''}`, { state: { property } })
  }

  return (
    <div
      onClick={handleDetails}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative overflow-hidden">
        <img
          src={propImage}
          alt={propTitle}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/20 to-transparent" />

        <button
          onClick={(e) => {
            e.stopPropagation()
            setFavState((prev) => !prev)
          }}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-sm backdrop-blur hover:bg-white"
        >
          <FaHeart className={`h-5 w-5 ${favState ? 'text-red-600' : 'text-slate-500'}`} />
        </button>

        <span className="absolute left-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
          {isForRent ? 'For rent' : 'For sale'}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-slate-900">{propTitle}</h3>
            <p className="truncate text-sm text-slate-500">{located}</p>
            <p className="text-xs text-slate-400">Listed by {landlord}</p>
          </div>
          <p className="whitespace-nowrap text-lg font-bold text-violet-700">
            {price.toLocaleString()} <span className="text-sm font-normal text-slate-500">{isForRent ? 'Fcfa/mo' : 'Fcfa'}</span>
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
          {(Array.isArray(amenities) ? amenities : typeof amenities === 'string' ? amenities.split(',') : []).map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
              {tag.trim ? tag.trim() : tag}
            </span>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            handleDetails()
          }}
          className="mt-5 w-full rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700"
        >
          View details
        </button>
      </div>
    </div>
  )
}

export default PropertyCard