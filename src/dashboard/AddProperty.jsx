import React, { useState } from 'react'
import Header from '../components/Header'
import toast from 'react-hot-toast'
import PropertyCard from '../components/PropertyCard'

const AddProperty = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [place, setPlace] = useState('')
  const [isRent, setIsRent] = useState(false)
  const [amenities, setAmenities] = useState([])

  const amenityOptions = [
    'WiFi', 'Parking', 'Pool', 'Gym', 'Balcony', 'Garden', 
    'Security', 'Elevator', 'Air Conditioning', 'Heating', 'Dishwasher', 'Washer'
  ]

  const handleAmenityChange = (amenity) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    )
  }
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [landlord, setLandlord] = useState('')

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) setImage(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // simple client-side validation
    if (!title || !price || !place || !landlord) {
      toast.error('Please fill required fields')
      return
    }
    // In a real app we'd POST to backend here
    console.log({ title, price, place, isRent, amenities, image, description, propertyType, bedrooms, bathrooms, landlord })
    toast.success('Property added (demo)')
    setTitle('')
    setPrice('')
    setPlace('')
    setAmenities([])
    setImage(null)
    setDescription('')
    setPropertyType('')
    setBedrooms('')
    setBathrooms('')
    setLandlord('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List your property</h1>
          <p className="text-gray-600">Fill in the details below to create your listing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Property Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Title *</label>
                  <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors" 
                    placeholder="e.g. Beautiful 2-bedroom apartment"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <select 
                    value={propertyType} 
                    onChange={e => setPropertyType(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                  >
                    <option value="">Select type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Room">Room</option>
                    <option value="Studio">Studio</option>
                    <option value="House">House</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <input 
                      value={bedrooms} 
                      onChange={e => setBedrooms(e.target.value)} 
                      type="number" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors" 
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                    <input 
                      value={bathrooms} 
                      onChange={e => setBathrooms(e.target.value)} 
                      type="number" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors" 
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    rows={4} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors resize-none" 
                    placeholder="Describe your property..."
                  />
                </div>
              </div>
            </div>

            {/* Location & Pricing */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location & Pricing</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input 
                    value={place} 
                    onChange={e => setPlace(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors" 
                    placeholder="e.g. Douala, Cameroon"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (Fcfa) *</label>
                  <input 
                    value={price} 
                    onChange={e => setPrice(e.target.value)} 
                    type="number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors" 
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={isRent} 
                    onChange={e => setIsRent(e.target.checked)} 
                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Available for rent</label>
                </div>
              </div>
            </div>

            {/* Amenities & Landlord */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities & Contact</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                  <div className="grid grid-cols-2 gap-3">
                    {amenityOptions.map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={amenities.includes(amenity)}
                          onChange={() => handleAmenityChange(amenity)}
                          className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Listed by *</label>
                  <input 
                    value={landlord} 
                    onChange={e => setLandlord(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors" 
                    placeholder="Your name or company"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Photos</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload property images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-violet-400 transition-colors">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImage} 
                    className="hidden" 
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="text-gray-500 mb-2">
                      <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </label>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full bg-violet-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-violet-700 transition-colors focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              List Property
            </button>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
              {title || image ? (
                <PropertyCard
                  propImage={image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'}
                  propTitle={title || 'Property Title'}
                  price={parseInt(price) || 0}
                  isForRent={isRent}
                  located={place || 'Location'}
                  amenities={amenities}
                  landlord={landlord || 'Landlord'}
                  id="preview"
                />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p>Fill in the details to see a preview</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tips for a great listing</h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-violet-600 text-xs font-bold">1</span>
                  </span>
                  Use high-quality photos that show your property in the best light.
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-violet-600 text-xs font-bold">2</span>
                  </span>
                  Be accurate with your pricing and include all relevant details.
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-violet-600 text-xs font-bold">3</span>
                  </span>
                  Highlight key amenities and features that make your property stand out.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProperty