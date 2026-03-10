import React, { useEffect, useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import { fetchProperties } from '../libs/propertyService'
import { useNavigate } from 'react-router-dom'

const Listings = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true

    fetchProperties()
      .then((data) => {
        if (!mounted) return
        setListings(data)
      })
      .catch((err) => {
        console.error('Unable to load listings', err)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Your Listings</h1>
            <p className="mt-2 text-sm text-slate-600">Manage the properties you're representing and keep them up to date.</p>
          </div>
          <button onClick={() => navigate('/dashboard/add')} className="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
            Add a listing
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading listings…</div>
        ) : listings.length ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <PropertyCard
                key={listing.id}
                propImage={listing.uri}
                propTitle={listing.t}
                price={listing.price}
                isForRent={listing.rent}
                located={listing.place}
                amenities={listing.amenities}
                landlord={listing.landlord}
                landlordRole={listing.landlordRole}
                id={listing.id}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-slate-500">No listings available yet.</div>
        )}
      </main>
    </div>
  )
}

export default Listings
