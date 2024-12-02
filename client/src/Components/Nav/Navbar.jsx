import React from 'react'
import {Link} from "react-router-dom"
import UseAuth from '../../Hooks/UseAuth'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'



const Navbar = () => {

  const auth = UseAuth();
  return (
    <nav className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link className="text-2xl font-bold text-white hover:text-blue-400 transition-colors" to="/">
            CodeTogether
          </Link>

          {/* Navigation Links */}
          {auth?.auth?.user ? (
            <ul className="flex items-center space-x-6">
              <Link 
                className="hover:text-blue-400 transition-colors hidden md:block" 
                to="/people"
              >
                People
              </Link>
              <Link 
                className="text-xl hover:text-blue-400 transition-colors" 
                to="/profile"
              >
                <FontAwesomeIcon icon={faUser} />
              </Link>
              <Link 
                className="text-xl hover:text-blue-400 transition-colors" 
                to="/logout"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </Link>
            </ul>
          ) : (
            <ul className="flex items-center space-x-6">
              <Link 
                className="hover:text-blue-400 transition-colors" 
                to="/login"
              >
                Login
              </Link>
              <Link 
                className="hover:text-blue-400 transition-colors" 
                to="/signup"
              >
                SignUp
              </Link>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar