import React, { useState, useEffect, useMemo } from 'react'
import { FaSearch } from 'react-icons/fa'
import Header from '../components/Header'
import PropertyCard from '../components/PropertyCard'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'
import { fetchProperties } from '../libs/propertyService'

const Explore = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('latest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedAmenities, setSelectedAmenities] = useState([])

  useEffect(() => {
    let mounted = true

    fetchProperties()
      .then((data) => {
        if (!mounted) return
        setProperties(data)
      })
      .catch((err) => {
        console.error('Failed to load properties', err)
        toast.error('Failed to load properties from the database.')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const amenitiesList = ['parking','electricity','water','garden','washer ' , 'balcony']

  const toggleAmenity = (a) => {
    setSelectedAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])
  }

  const results = useMemo(() => {
    let list = properties.slice()
    if (filter === 'rent') list = list.filter(p => p.rent)
    if (filter === 'sale') list = list.filter(p => !p.rent)
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(p => p.t.toLowerCase().includes(q) || p.place.toLowerCase().includes(q))
    }
    if (minPrice) list = list.filter(p => p.price >= Number(minPrice))
    if (maxPrice) list = list.filter(p => p.price <= Number(maxPrice))
    if (selectedAmenities.length) {
      list = list.filter(p => selectedAmenities.every(a => p.amenities.includes(a)))
    }
    if (sort === 'price-asc') list.sort((a,b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a,b) => b.price - a.price)
    return list
  }, [properties, query, filter, sort, minPrice, maxPrice, selectedAmenities])

  return (
    <div className="min-h-screen bg-slate-50">

      <header className="relative bg-linear-to-br from-violet-600 via-indigo-600 to-cyan-500">
        <div className="absolute inset-0 opacity-30 bg-[url('../images/house12.jpg')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Find your next home</h1>
            <p className="mt-4 text-lg text-white/80">Browse verified listings in your area, filter by price, amenities, and more.</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by location, title, or neighborhood"
                  className="w-full rounded-full bg-white/20 py-3 pl-12 pr-4 text-white placeholder-white/70 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/40"
                />
              </div>

              <div className="flex gap-2">
                {['all', 'rent', 'sale'].map(option => (
                  <button
                    key={option}
                    onClick={() => setFilter(option)}
                    className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                      filter === option
                        ? 'bg-white text-violet-700 shadow-sm'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {option === 'all' ? 'All' : option === 'rent' ? 'For Rent' : 'For Sale'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-slate-700">Price range</div>
                      <div className="text-xs text-slate-500">Fcfa</div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <input
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                        placeholder="Min"
                        className="w-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                      />
                      <input
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                        placeholder="Max"
                        className="w-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-slate-700 mb-2">Property type</div>
                    <div className="grid grid-cols-2 gap-2">
                      {['Apartment', 'Room', 'Studio', 'House'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setFilter(type === 'Room' ? 'rent' : filter)}
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-slate-700 mb-2">Amenities</div>
                    <div className="flex flex-wrap gap-2">
                      {amenitiesList.map(a => (
                        <button
                          key={a}
                          onClick={() => toggleAmenity(a)}
                          className={`rounded-full px-3 py-1 text-sm transition ${
                            selectedAmenities.includes(a)
                              ? 'bg-violet-600 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Sort by</label>
                    <select
                      value={sort}
                      onChange={e => setSort(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="latest">Recommended</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Tips</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>Use filters to narrow down by price and amenities.</li>
                  <li>Click a listing to view full details and contact the landlord.</li>
                  <li>Save your favorite properties to return to later.</li>
                </ul>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Browse homes</h2>
                <p className="text-sm text-slate-600">Showing {results.length} properties</p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">View</span>
                <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">
                  Grid
                </button>
                <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">
                  Map
                </button>
              </div>
            </div>

            {loading ? (
              <div className="py-20 text-center text-slate-500">Loading properties…</div>
            ) : results.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((p, i) => (
                  <PropertyCard
                    key={p.id ?? i}
                    propImage={p.uri}
                    propTitle={p.t}
                    price={p.price}
                    isForRent={p.rent}
                    located={p.place}
                    amenities={p.amenities}
                    landlord={p.landlord}
                    landlordRole={p.landlordRole}
                    id={p.id ?? String(i)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-500">
                No properties found. Try adjusting your filters.
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Explore