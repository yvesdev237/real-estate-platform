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

  return (
    <div>
      <Header />

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-1/3 bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
            <img src={meta.avatar_url || '../images/zil.jpg'} alt="avatar" className="w-28 h-28 rounded-full object-cover mb-4" />
            <h2 className="text-xl font-semibold">{meta.full_name || 'Your name'}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <div className="mt-6 w-full">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-xs text-gray-500">Role</div>
                  <div className="font-medium">{meta.role || 'Tenant'}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-xs text-gray-500">Member since</div>
                  <div className="font-medium">{new Date(user?.created_at || Date.now()).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
            <button onClick={handleLogout} className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Logout</button>
          </aside>

          <section className="lg:w-2/3 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Profile</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full name</label>
                <input className="w-full p-2 border rounded" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input className="w-full p-2 border rounded bg-gray-50" value={user?.email || ''} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input className="w-full p-2 border rounded" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={saving} className="bg-violet-700 text-white px-4 py-2 rounded hover:bg-violet-800">
                  {saving ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </form>
          </section>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-3">Account activity</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded shadow-sm">
              <div className="text-sm text-gray-500">Properties saved</div>
              <div className="text-2xl font-bold">3</div>
            </div>
            <div className="p-4 bg-white rounded shadow-sm">
              <div className="text-sm text-gray-500">Recent views</div>
              <div className="text-2xl font-bold">24</div>
            </div>
            <div className="p-4 bg-white rounded shadow-sm">
              <div className="text-sm text-gray-500">Messages</div>
              <div className="text-2xl font-bold">2</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Profile