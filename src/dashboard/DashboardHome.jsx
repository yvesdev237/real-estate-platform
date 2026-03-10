import React, { useEffect, useRef } from 'react'
import Header from '../components/Header'
import house12 from '../images/house12.jpg'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import { UseAuth } from '../context/AuthContext'

const DashboardHome = () => {
  const { user } = UseAuth();
  const userName = user?.user_metadata?.full_name.split(" ")[0] || "User";
  const properties = [
    {
      t: 'Apartment for sale',
      price: 12000000,
      rent: false,
      place: 'Mile 4 Nkwen',
      amenities: ['electricity', 'parking'],
      uri: house12,
      landlord: 'Samuel',
      landlordRole: 'Landlord',
    },
    {
      t: 'Apartment for sale',
      price: 12000000,
      rent: false,
      place: 'Mile 4 Nkwen',
      amenities: ['electricity', 'parking'],
      uri: house12,
      landlord: 'Julie',
      landlordRole: 'Landlord',
    },
    {
      t: 'Apartment for sale',
      price: 12000000,
      rent: false,
      place: 'Mile 4 Nkwen',
      amenities: ['electricity', 'parking'],
      uri: house12,
      landlord: 'Eric',
      landlordRole: 'Landlord',
    },
    {
      t: 'Apartment for sale',
      price: 12000000,
      rent: false,
      place: 'Mile 4 Nkwen',
      amenities: ['electricity', 'parking'],
      uri: house12,
      landlord: 'Amina',
      landlordRole: 'Landlord',
    },
    {
      t: 'Apartment for sale',
      price: 12000000,
      rent: false,
      place: 'Mile 4 Nkwen',
      amenities: ['electricity', 'parking'],
      uri: house12,
      landlord: 'James',
      landlordRole: 'Landlord',
    },
  ]

  const scrollRef = useRef(null)
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    // Only auto-scroll when the content overflows horizontally.
    const canScroll = container.scrollWidth > container.clientWidth
    if (!canScroll) return

    let direction = 1
    let animationFrame = null

    const step = () => {
      if (!container) return

      const maxScroll = container.scrollWidth - container.clientWidth
      const next = container.scrollLeft + direction

      // Reverse direction when we hit either end.
      if (next >= maxScroll) {
        direction = -1
      } else if (next <= 0) {
        direction = 1
      }

      container.scrollLeft += direction
      animationFrame = requestAnimationFrame(step)
    }

    animationFrame = requestAnimationFrame(step)

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-violet-600 via-indigo-600 to-cyan-500" />
        <div className="absolute inset-0 bg-[url('../images/house12.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="max-w-xl">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Welcome back, {userName}</h1>
              <p className="mt-4 text-lg text-white/80">Manage your listings, track performance, and discover recommended homes all in one place.</p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
                {user.user_metadata?.role === 'tenant' ? (
                  <>
                    <button
                      onClick={() => navigate('explore')}
                      className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow-md hover:bg-white/90 transition"
                    >
                      Explore listings
                      <FaArrowRight className="ml-2" />
                    </button>
                    <button
                      onClick={() => navigate('favorites')}
                      className="inline-flex items-center justify-center rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
                    >
                      Saved homes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate('/dashboard/add')}
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow-md hover:bg-white/90 transition"
                  >
                    Add a new listing
                  </button>
                )}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/10 backdrop-blur">
                <h2 className="text-lg font-semibold text-white">Quick actions</h2>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-white" />
                    View all your listings
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-white" />
                    See recent activity
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-white" />
                    Update profile & preferences
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {user.user_metadata?.role === 'tenant' && (
          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Recommended for you</h2>
                <p className="mt-1 text-sm text-slate-600">Based on your recent activity and saved preferences.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sort by</span>
                <select className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
                  <option>Recommended</option>
                  <option>Price (Low to High)</option>
                  <option>Price (High to Low)</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            <div ref={scrollRef} className="mt-6 flex gap-5 overflow-x-auto scroll-smooth pb-4 no-scrollbar">
              {properties.map((item, index) => (
                <div key={index} className="min-w-88 shrink-0 snap-start">
                  <PropertyCard
                    id={index}
                    price={item.price}
                    located={item.place}
                    amenities={item.amenities}
                    propTitle={item.t}
                    propImage={item.uri}
                    isForRent={item.rent}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Analytics</h2>
          <p className="mt-1 text-sm text-slate-600">Quick insights based on your current listings.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(() => {
              const role = user.user_metadata?.role
              const listedCount = properties.length
              const avgPrice = listedCount ? Math.round(properties.reduce((s, p) => s + (p.price || 0), 0) / listedCount) : 0

              const card = (label, value, accent) => (
                <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${accent}`}> 
                  <div className="text-sm text-slate-500">{label}</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">{value}</div>
                </div>
              )

              if (role === 'landlord') {
                return (
                  <>
                    {card('Listed properties', listedCount, 'ring-1 ring-violet-100')}
                    {card('Average price', avgPrice.toLocaleString(), 'ring-1 ring-indigo-100')}
                    {card('Total inquiries', Math.max(0, listedCount * 3), 'ring-1 ring-cyan-100')}
                    {card('Estimated revenue', (avgPrice * Math.max(0, listedCount)).toLocaleString(), 'ring-1 ring-emerald-100')}
                  </>
                )
              }

              if (role === 'agent') {
                return (
                  <>
                    {card('Properties managed', listedCount, 'ring-1 ring-violet-100')}
                    {card('Active leads', Math.max(0, listedCount * 2), 'ring-1 ring-indigo-100')}
                    {card('Open deals', Math.floor(listedCount / 2), 'ring-1 ring-cyan-100')}
                    {card('Commission est.', (avgPrice * Math.floor(listedCount / 2)).toLocaleString(), 'ring-1 ring-emerald-100')}
                  </>
                )
              }

              return (
                <>
                  {card('Recommended', listedCount, 'ring-1 ring-violet-100')}
                  {card('Saved listings', Math.min(10, listedCount), 'ring-1 ring-indigo-100')}
                  {card('Viewed', listedCount * 4, 'ring-1 ring-cyan-100')}
                  {card('Matches', Math.ceil(listedCount / 3), 'ring-1 ring-emerald-100')}
                </>
              )
            })()}
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardHome