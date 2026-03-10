import React from 'react'
import Header from '../components/Header'
import PropertyCard from '../components/PropertyCard'

const clients = [
  {
    name: 'Amina T.',
    email: 'amina@example.com',
    phone: '+237 650 123 456',
    saved: 4,
    lastActive: '2 hours ago',
  },
  {
    name: 'David M.',
    email: 'david@example.com',
    phone: '+237 670 987 321',
    saved: 2,
    lastActive: '1 day ago',
  },
  {
    name: 'Chloe N.',
    email: 'chloe@example.com',
    phone: '+237 690 456 789',
    saved: 6,
    lastActive: '3 days ago',
  },
]

const Clients = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Clients</h1>
            <p className="mt-2 text-sm text-slate-600">View your active clients and keep track of their preferences.</p>
          </div>
          <button className="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
            Add a client
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div key={client.email} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{client.name}</h2>
                  <p className="text-sm text-slate-600">{client.email}</p>
                </div>
                <span className="text-xs text-slate-500">{client.lastActive}</span>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Phone</span>
                  <span className="font-medium text-slate-800">{client.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Saved listings</span>
                  <span className="font-medium text-slate-800">{client.saved}</span>
                </div>
              </div>

              <button className="mt-6 w-full rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">
                View profile
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Clients
