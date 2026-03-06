import React from 'react'
import Header from '../components/Header'
import PropertyCard from '../components/PropertyCard'

const Favorites = () => {
  const favorites = [
    { price: 8000000, rent: false, place: 'Buea', amenities: ['parking','electricity'], uri: '../images/house3.jpg', t: 'Cozy 3BR Townhouse' },
    { price: 4500000, rent: true, place: 'Mile 4', amenities: ['water','parking'], uri: '../images/house2.jpg', t: '1BR Apartment' },
  ]

  return (
    <div>
      <Header />
      <div className="mt-6">
        <h1 className="text-2xl font-semibold mb-4">Your Favorites</h1>
        {favorites.length === 0 ? (
          <div className="p-6 bg-white rounded-lg shadow text-center">You haven't saved any properties yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((f, i) => (
              <PropertyCard
                key={i}
                propImage={f.uri}
                amenities={f.amenities.join(', ')}
                propTitle={f.t}
                price={f.price}
                isForRent={f.rent}
                located={f.place}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites