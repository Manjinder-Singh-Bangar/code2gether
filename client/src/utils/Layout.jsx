import React from 'react'
import Navbar from '../Components/Nav/Navbar'
import Footer from '../Components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <Navbar />
            <Outlet />
        <Footer />
    </>
    
  )
}

export default Layout