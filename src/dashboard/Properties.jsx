import React, { useState, useMemo, useEffect } from 'react'
import PropertyCard from '../components/PropertyCard'
import { UseAuth } from '../context/AuthContext'
import { fetchProperties } from '../libs/propertyService'

const Properties = () => {
  const { user } = UseAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let mounted = true

    fetchProperties({ ownerId: user?.id })
      .then((data) => {
        if (!mounted) return
        setProperties(data)
      })
      .catch((err) => {
        console.error('Failed to load properties', err)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [user])

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (filter === 'rent' && !p.rent) return false
      if (filter === 'sale' && p.rent) return false
      if (!query) return true
      return p.t.toLowerCase().includes(query.toLowerCase()) || p.place.toLowerCase().includes(query.toLowerCase())
    })
  }, [properties, query, filter])

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">My properties</h1>
              <p className="mt-2 text-sm text-slate-600">Manage listings you own and keep track of what’s available.</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414l-4.243-4.243zM10 16a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search listings"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {['all', 'rent', 'sale'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilter(option)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      filter === option
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {option === 'all' ? 'All' : option === 'rent' ? 'For Rent' : 'For Sale'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Available Listings</h2>
            <p className="mt-1 text-sm text-slate-600">Showing {filtered.length} results</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sort by</span>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm"
            >
              <option value="all">Recommended</option>
              <option value="rent">Price: Rent</option>
              <option value="sale">Price: Sale</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading your properties…</div>
        ) : filtered.length ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <PropertyCard
                key={p.id ?? i}
                propImage={p.uri}
                amenities={p.amenities}
                propTitle={p.t}
                price={p.price}
                isForRent={p.rent}
                located={p.place}
                landlord={p.landlord}
                landlordRole={p.landlordRole}
                id={p.id ?? String(i)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl bg-white px-8 py-10 shadow-sm border border-slate-200 text-center">
            <h3 className="text-xl font-semibold text-slate-900">No properties found</h3>
            <p className="mt-2 text-sm text-slate-500">Try adjusting your search or filters to discover more listings.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default Properties