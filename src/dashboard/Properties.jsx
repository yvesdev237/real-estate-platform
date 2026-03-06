import React, { useState, useMemo } from 'react'
import Header from '../components/Header'
import PropertyCard from '../components/PropertyCard'

const sample = [
  { price: 12000000, rent: false, place: 'Mile 4 Nkwen', amenities: ['electricity','parking'], uri: '../images/house12.jpg', t: 'Spacious 4BR Home' },
  { price: 6000000, rent: true, place: 'Buea', amenities: ['water','parking'], uri: '../images/house3.jpg', t: 'Modern 2BR' },
  { price: 8500000, rent: false, place: 'Limbe', amenities: ['electricity','garden'], uri: '../images/house1.jpg', t: 'Beachside Bungalow' },
  { price: 3000000, rent: true, place: 'Mokolo', amenities: ['parking'], uri: '../images/entry.jpg', t: 'Studio Apartment' },
]

const Properties = () => {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    return sample.filter(p => {
      if (filter === 'rent' && !p.rent) return false
      if (filter === 'sale' && p.rent) return false
      if (!query) return true
      return p.t.toLowerCase().includes(query.toLowerCase()) || p.place.toLowerCase().includes(query.toLowerCase())
    })
  }, [query, filter])

  return (
    <div>
      <Header />
      <div className="mt-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-2xl font-semibold">Properties</h1>
          <div className="flex gap-2 items-center w-full lg:w-auto">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by title or place" className="w-full lg:w-80 p-2 rounded-lg border" />
            <select value={filter} onChange={e => setFilter(e.target.value)} className="p-2 rounded-lg border">
              <option value="all">All</option>
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <PropertyCard
              key={i}
              propImage={p.uri}
              amenities={p.amenities.join(', ')}
              propTitle={p.t}
              price={p.price}
              isForRent={p.rent}
              located={p.place}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Properties