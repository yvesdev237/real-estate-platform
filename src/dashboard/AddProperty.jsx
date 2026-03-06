import React, { useState } from 'react'
import Header from '../components/Header'
import toast from 'react-hot-toast'

const AddProperty = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [place, setPlace] = useState('')
  const [isRent, setIsRent] = useState(false)
  const [amenities, setAmenities] = useState('')
  const [image, setImage] = useState(null)

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) setImage(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // simple client-side validation
    if (!title || !price || !place) {
      toast.error('Please fill required fields')
      return
    }
    // In a real app we'd POST to backend here
    console.log({ title, price, place, isRent, amenities, image })
    toast.success('Property added (demo)')
    setTitle('')
    setPrice('')
    setPlace('')
    setAmenities('')
    setImage(null)
  }

  return (
    <div>
      <Header />
      <div className="mt-6">
        <h1 className="text-2xl font-semibold mb-4">Add Property</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
            <label className="block mb-2 font-medium">Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded mb-4" />

            <label className="block mb-2 font-medium">Price (Fcfa) *</label>
            <input value={price} onChange={e => setPrice(e.target.value)} type="number" className="w-full p-2 border rounded mb-4" />

            <label className="block mb-2 font-medium">Location *</label>
            <input value={place} onChange={e => setPlace(e.target.value)} className="w-full p-2 border rounded mb-4" />

            <label className="block mb-2 font-medium">Amenities (comma separated)</label>
            <input value={amenities} onChange={e => setAmenities(e.target.value)} className="w-full p-2 border rounded mb-4" />

            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2"><input type="checkbox" checked={isRent} onChange={e => setIsRent(e.target.checked)} /> For Rent</label>
            </div>

            <label className="block mb-2 font-medium">Image</label>
            <input type="file" accept="image/*" onChange={handleImage} className="mb-4" />

            <button className="bg-violet-700 text-white px-4 py-2 rounded hover:bg-violet-800">Add Property</button>
          </form>

          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="font-semibold mb-2">Preview</h2>
              {image ? (
                <img src={image} alt="preview" className="w-full h-48 object-cover rounded mb-2" />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">No image selected</div>
              )}
              <p className="font-bold text-lg mt-2">{title || 'Property Title'}</p>
              <p className="text-gray-600">{place || 'Location'}</p>
              <p className="text-violet-700 font-semibold">{price ? `${price} Fcfa${isRent ? '/month' : ''}` : 'Price'}</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="font-semibold mb-2">Tips</h2>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Use clear, bright photos.</li>
                <li>Provide an accurate price and location.</li>
                <li>List important amenities (parking, electricity, water).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProperty