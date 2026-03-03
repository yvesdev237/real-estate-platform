
import React from 'react'
import BottomNav from '../components/BottomNav';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='min-h-screen flex flex-col w-full pb-19'>
        <main className='p-4 flex-1 w-full'>
            <Outlet />
        </main>
        <BottomNav />
    </div>
  )
}

export default Dashboard