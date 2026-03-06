import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-12 w-full border-t border-gray-200 bg-white/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col lg:flex-row items-center justify-between text-sm text-gray-600">
        <div>© {year} Zilo Home. All rights reserved.</div>
        <div className="flex gap-4 mt-3 lg:mt-0">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
