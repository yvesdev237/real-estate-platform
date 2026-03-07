import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PropertyDetail = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const property = state?.property

  if (!property) {
    return (
      <div>
        <main className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded p-6 shadow">No property data available.</div>
        </main>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <img src={property.propImage} alt={property.propTitle} className="w-full h-72 object-cover" />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{property.propTitle}</h1>
            <div className="text-violet-700 font-semibold mb-4">{property.price.toLocaleString()} Fcfa{property.isForRent ? '/month' : ''}</div>
            <p className="text-gray-700 mb-4">{property.amenities.join(' • ')}</p>
            <p className="text-gray-600 mb-4">Location: {property.located}</p>
            <div className="flex gap-3">
              <button className="bg-violet-700 text-white px-4 py-2 rounded">Contact Agent</button>
              <button className="border px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PropertyDetail
