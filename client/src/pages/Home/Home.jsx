import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className='main'>
      <section className="main-body">
        <section className="main-body-content px-4 md:px-8 lg:px-24 py-8 md:py-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <img 
                className='w-full h-auto rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 object-cover' 
                src="../../../public/Assets/Images/About-Us.jpg" 
                alt="Developers collaborating" 
              />
            </div>
            
            <div className="w-full md:w-1/2 space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Welcome to CodeTogether
              </h1>
              <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
                CodeTogether is an interactive platform designed for developers to connect, chat, and collaborate. Whether you're a seasoned professional or just starting your coding journey, this platform helps you meet like-minded developers, share insights, and work on projects together.
              </p>
              <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
                With a focus on creating meaningful connections, you can exchange ideas, seek advice, and form friendships with fellow developers.
              </p>
              <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
                If you're looking to connect with fellow developers or students, simply sign up and start your journey today. CodeTogether is the perfect space to grow your skills, expand your network, and build together.
              </p>
              <div className="pt-6">
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  )
}

export default Home