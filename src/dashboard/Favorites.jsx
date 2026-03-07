import React from 'react'
import Header from '../components/Header'
import PropertyCard from '../components/PropertyCard'

const Favorites = () => {
  const favorites = [
    { price: 8000000, rent: false, place: 'Buea', amenities: ['parking','electricity'], uri: '../images/house3.jpg', t: 'Cozy 3BR Townhouse' },
    { price: 4500000, rent: true, place: 'Mile 4', amenities: ['water','parking'], uri: '../images/house2.jpg', t: '1BR Apartment' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <header className="relative bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500">
        <div className="absolute inset-0 opacity-25 bg-[url('../images/house12.jpg')] bg-cover bg-center" />
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Saved homes</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80">Quick access to your favorite properties. Tap any card to view details and contact the landlord.</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {favorites.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">No favorites yet</h2>
            <p className="mt-2 text-sm text-slate-600">Browse listings and tap the heart to save your favorites.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((f, i) => (
              <PropertyCard
                key={i}
                propImage={f.uri}
                amenities={f.amenities}
                propTitle={f.t}
                price={f.price}
                isForRent={f.rent}
                located={f.place}
                id={String(i)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Favorites