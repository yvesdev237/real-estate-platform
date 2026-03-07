import React from 'react'
import Header from '../components/Header'
import PropertyCard from '../components/PropertyCard'

const listings = [
  {
    id: '1',
    title: 'Modern 3BR Apartment',
    place: 'Buea',
    price: 5500000,
    rent: true,
    amenities: ['parking', 'electricity', 'water'],
    uri: '../images/house3.jpg',
  },
  {
    id: '2',
    title: 'Spacious 5BR Villa',
    place: 'Limbe',
    price: 22000000,
    rent: false,
    amenities: ['pool', 'garden', 'security'],
    uri: '../images/house1.jpg',
  },
  {
    id: '3',
    title: 'Cozy 2BR Apartment',
    place: 'Douala',
    price: 7800000,
    rent: true,
    amenities: ['wifi', 'parking', 'gym'],
    uri: '../images/house12.jpg',
  },
]

const Listings = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Your Listings</h1>
            <p className="mt-2 text-sm text-slate-600">Manage the properties you're representing and keep them up to date.</p>
          </div>
          <button className="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
            Add a listing
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <PropertyCard
              key={listing.id}
              propImage={listing.uri}
              propTitle={listing.title}
              price={listing.price}
              isForRent={listing.rent}
              located={listing.place}
              amenities={listing.amenities}
              id={listing.id}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Listings
