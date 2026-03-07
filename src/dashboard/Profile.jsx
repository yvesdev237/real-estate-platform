import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UseAuth } from '../context/AuthContext'
import { db } from '../libs/database'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user } = UseAuth()
  const meta = user?.user_metadata || {}
  const [name, setName] = useState(meta.full_name || '')
  const [phone, setPhone] = useState(meta.phone || '')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setName(meta.full_name || '')
    setPhone(meta.phone || '')
  }, [meta.full_name, meta.phone])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    // In a real app: call API to update profile. Here we just simulate.
    setTimeout(() => {
      setSaving(false)
      // could show toast here
      toast.success('Profile saved')
      console.log('Profile saved', { name, phone })
    }, 800)
  }

  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await db.auth.signOut()
      toast.success('Logged out')
      navigate('/' , { replace: true })
    } catch (err) {
      console.error('Logout failed', err)
      toast.error('Logout failed')
    }
  }

  const role = (meta.role || 'Tenant').toLowerCase()
  const isAgent = role === 'agent'
  const isLandlord = role === 'landlord'

  const activityItems = isAgent
    ? [
        { label: 'Managed properties', value: 12 },
        { label: 'Clients contacted', value: 34 },
        { label: 'Deals closed', value: 8 },
      ]
    : isLandlord
    ? [
        { label: 'Properties listed', value: 5 },
        { label: 'Total views', value: 612 },
        { label: 'Messages from tenants', value: 4 },
      ]
    : [
        { label: 'Saved properties', value: 3 },
        { label: 'Recently viewed homes', value: 24 },
        { label: 'Rental requests sent', value: 2 },
      ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-5xl mx-auto p-6">
        <div className="grid gap-6">
          {/* Profile card */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-semibold">
                  {meta.full_name ? meta.full_name.charAt(0) : 'Z'}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-semibold">{meta.full_name || 'Your name'}</h1>
                    <p className="text-sm text-gray-500">{meta.role || 'Tenant'}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-slate-50 p-4">
                    <div className="text-xs text-gray-400">Email</div>
                    <div className="font-medium">{user?.email || '—'}</div>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4">
                    <div className="text-xs text-gray-400">Member since</div>
                    <div className="font-medium">{new Date(user?.created_at || Date.now()).toLocaleDateString()}</div>
                  </div>
                </div>

                <form onSubmit={handleSave} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Full name</label>
                    <input
                      className="w-full rounded border border-slate-200 bg-white px-3 py-2 focus:border-violet-500 focus:outline-none"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Phone</label>
                    <input
                      className="w-full rounded border border-slate-200 bg-white px-3 py-2 focus:border-violet-500 focus:outline-none"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center justify-center rounded-md bg-violet-700 px-4 py-2 text-sm font-medium text-white hover:bg-violet-800 disabled:opacity-50"
                    >
                      {saving ? 'Saving…' : 'Save changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Activity + Verification */}
          <section className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="font-medium">New message from support</div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="font-medium">Property inquiry received</div>
                  <div className="text-xs text-gray-500">Yesterday</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="font-medium">Weekly summary is ready</div>
                  <div className="text-xs text-gray-500">3 days ago</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold">Activity</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activityItems.map((item) => (
                  <div key={item.label} className="rounded-lg bg-slate-50 p-4 text-center">
                    <div className="text-xs text-gray-400">{item.label}</div>
                    <div className="mt-2 text-2xl font-bold">{item.value}</div>
                  </div>
                ))}
              </div>

              {(isAgent || isLandlord) && (
                <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-full bg-amber-200 flex items-center justify-center text-amber-700">✓</div>
                    <div>
                      <div className="text-sm font-semibold">Account verification</div>
                      <p className="text-sm text-slate-600">Verified accounts get better matchmaking and trust from clients.</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-slate-600">Status: <span className="font-medium text-slate-800">Verified</span></div>
                    <button className="inline-flex items-center justify-center rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700">
                      View verification details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Profile