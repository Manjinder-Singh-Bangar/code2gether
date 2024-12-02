import React from 'react'
import { Link } from "react-router-dom"
import { FaInstagram, FaGithub } from "react-icons/fa"

import UseAuth from '../../Hooks/UseAuth'

const Footer = () => {
  const auth = UseAuth();
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo Section */}
          <h3 className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            CodeTogether
          </h3>

          {/* Links Section */}
          <section className="links">
            {auth?.auth?.user ? (
              <ul className="flex items-center space-x-6">
                <a href="https://instagram.com" className="text-2xl hover:text-pink-500 transition-colors">
                  <FaInstagram />
                </a>
                <a href="https://github.com" className="text-2xl hover:text-white transition-colors">
                  <FaGithub />
                </a>
              </ul>
            ) : (
              <ul className="flex items-center space-x-6">
                <Link to="/signup" className="hover:text-blue-400 transition-colors">
                  SignUp
                </Link>
                <Link to="/login" className="hover:text-blue-400 transition-colors">
                  Login
                </Link>
                <a href="https://instagram.com" className="text-2xl hover:text-pink-500 transition-colors">
                  <FaInstagram />
                </a>
                <a href="https://github.com" className="text-2xl hover:text-white transition-colors">
                  <FaGithub />
                </a>
              </ul>
            )}
          </section>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2024 CodeTogether. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer