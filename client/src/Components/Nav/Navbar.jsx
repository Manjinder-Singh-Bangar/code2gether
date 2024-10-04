import React from 'react'
import {Link} from "react-router-dom"
import "./nav.css"

const Navbar = () => {
  return (
    <nav>
        <Link className='decoration-none' to={"/"}>
            <h3 className='logo'>CodeTogether :)</h3>
        </Link>
        <ul>
            <Link className='decoration-none' to={"/login"}>Login</Link>
            <Link className='decoration-none' to={"/signup"}>SignUp</Link>
        </ul>
    </nav>
  )
}

export default Navbar