import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PropertyDetail = () => {
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
    <div className="min-h-screen bg-slate-50">

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-3xl shadow-lg">
              <img
                src={property.propImage}
                alt={property.propTitle}
                className="h-80 w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-3xl font-bold leading-tight">{property.propTitle}</h1>
                <p className="mt-2 text-sm text-white/80">{property.located}</p>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-500">Price</div>
                    <div className="mt-1 text-3xl font-bold text-slate-900">
                      {property.price.toLocaleString()} Fcfa
                      <span className="text-lg font-medium text-slate-500">{property.isForRent ? '/month' : ''}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-slate-500">Listed by</div>
                    <div className="mt-1 text-lg font-semibold text-slate-900">
                      {property.landlord ?? 'Landlord'}{property.landlordRole ? ` (${property.landlordRole})` : ''}
                    </div>
                    <p className="text-sm text-slate-500">{property.isForRent ? 'Rent' : 'Sale'}</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-700">
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900">Location</div>
                    <div>{property.located}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900">Amenities</div>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">About this property</h2>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  This property is an excellent choice for those looking for a comfortable and convenient place to stay.
                  It features modern amenities, a great location, and a professional landlord to ensure your stay is smooth and stress-free.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs font-semibold text-slate-500">Type</div>
                    <div className="mt-1 text-sm font-medium text-slate-900">{property.isForRent ? 'Rent' : 'Sale'}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs font-semibold text-slate-500">Status</div>
                    <div className="mt-1 text-sm font-medium text-slate-900">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-violet-600 flex items-center justify-center text-white text-lg font-semibold">
                    {property.landlord?.[0] ?? 'L'}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{property.landlord ?? 'Landlord'}</div>
                    <div className="text-xs text-slate-500">Host</div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button className="w-full rounded-full bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
                    Contact host
                  </button>
                  <button className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Save to favorites
                  </button>
                  <button className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Share listing
                  </button>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Need help?</h3>
                <p className="mt-2 text-sm text-slate-600">Our support team is here if you have questions.</p>
                <button className="mt-4 w-full rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200">
                  Contact support
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

    </div>
  )
}

export default PropertyDetail
