import React, { useEffect, useRef } from 'react'
import Header from '../components/Header'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import { UseAuth } from '../context/AuthContext'

const DashboardHome = () => {
  const { user } = UseAuth();
  const userName = user?.user_metadata?.full_name.split(" ")[0] || "User";
  const properties = [
    {
      t: 'Apartment for sale' ,
      price : 12000000 ,
      rent : false ,
      place : 'Mile 4 Nkwen' , 
      amenities : ['electricity ' , 'parking'] ,
      uri : '../src/images/house12.jpg',
    },
    {
      t: 'Apartment for sale' ,
      price : 12000000 ,
      rent : false ,
      place : 'Mile 4 Nkwen' , 
      amenities : ['electricity ' , 'parking'] ,
      uri : '../src/images/house12.jpg',
    },
    {
      t: 'Apartment for sale' ,
      price : 12000000 ,
      rent : false ,
      place : 'Mile 4 Nkwen' , 
      amenities : ['electricity ' , 'parking'] ,
      uri : '../src/images/house12.jpg',
    },
    {
      t: 'Apartment for sale' ,
      price : 12000000 ,
      rent : false ,
      place : 'Mile 4 Nkwen' , 
      amenities : ['electricity ' , 'parking'] ,
      uri : '../src/images/house12.jpg',
    },
    {
      t: 'Apartment for sale' ,
      price : 12000000 ,
      rent : false ,
      place : 'Mile 4 Nkwen' , 
      amenities : ['electricity ' , 'parking'] ,
      uri : '../src/images/house12.jpg',
    },
  ]

  const scrollRef = useRef(null)
  useEffect(() => {
    const container = scrollRef.current;
    const interval = setInterval(() => {
      if (container) {
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      }
    }, 20);
    return () => clearInterval(interval)
  }, [])
  const navigate = useNavigate()
  return (
    <div>
      <Header />
      <h1 className='font-bold text-4xl my-10 capitalize text-violet-500'>
        Welcome back , {userName} !
      </h1>
      {user.user_metadata?.role === "tenant" && <h2 className='font-extralight text-2xl text-gray-700'>
        Find your next home today
      </h2>}
      <button onClick={() => navigate('explore')} className=' mt-2 bg-blue-700 rounded-3xl hover:bg-blue-500 text-center flex gap-2 items-center cursor-pointer p-3 text-2xl shadow-2xl text-white'>
        Explore properties
        <FaArrowRight className=' transition-transform duration-300 transform:translate-x-2'/>
      </button>
      {user.user_metadata?.role === "tenant" && (<section>
        <h1 className='font-semibold text-4xl text-blue-700 capitalize mt-8'>recommended for you</h1>
        <div ref={scrollRef} className='overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 py-4 flex scroll-smooth px-2'>
        {properties.map((item , index) => (
          <div key={index} className='min-w-75 shrink-0 snap-start'>
            <PropertyCard price={item.price} located={item.place} amenities={item.amenities} propTitle={item.t} propImage={item.uri} isForRent={item.rent}/>
          </div>
        ))}
        </div>
      </section>)}
      {/* Role-based analytics */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(() => {
            const role = user.user_metadata?.role;
            const listedCount = properties.length;
            const avgPrice = listedCount ? Math.round(properties.reduce((s, p) => s + (p.price || 0), 0) / listedCount) : 0;
            if (role === 'landlord') {
              return (
                <>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Listed Properties</div>
                    <div className="text-2xl font-bold">{listedCount}</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Average Price</div>
                    <div className="text-2xl font-bold">{avgPrice.toLocaleString()}</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Total Inquiries</div>
                    <div className="text-2xl font-bold">{Math.max(0, listedCount * 3)}</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Estimated Revenue</div>
                    <div className="text-2xl font-bold">{(avgPrice * Math.max(0, listedCount)).toLocaleString()}</div>
                  </div>
                </>
              )
            }
            if (role === 'agent') {
              return (
                <>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Properties Managed</div>
                    <div className="text-2xl font-bold">{listedCount}</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Active Leads</div>
                    <div className="text-2xl font-bold">{Math.max(0, listedCount * 2)}</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Open Deals</div>
                    <div className="text-2xl font-bold">{Math.floor(listedCount / 2)}</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Commission Est.</div>
                    <div className="text-2xl font-bold">{(avgPrice * Math.floor(listedCount / 2)).toLocaleString()}</div>
                  </div>
                </>
              )
            }
            // tenant or default
            return (
              <>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500">Recommended</div>
                  <div className="text-2xl font-bold">{listedCount}</div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500">Saved Listings</div>
                  <div className="text-2xl font-bold">{Math.min(10, listedCount)}</div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500">Viewed</div>
                  <div className="text-2xl font-bold">{listedCount * 4}</div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500">Matches</div>
                  <div className="text-2xl font-bold">{Math.ceil(listedCount / 3)}</div>
                </div>
              </>
            )
          })()}
        </div>
      </section>
    </div>
  )
}

export default DashboardHome