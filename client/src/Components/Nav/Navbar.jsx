import React from 'react'
import {Link} from "react-router-dom"
import "./nav.css"
import UseAuth from '../../Hooks/UseAuth'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket, faRocket } from '@fortawesome/free-solid-svg-icons'



const Navbar = () => {

  const auth = UseAuth();
  return (
    <nav>
        <Link className='decoration-none' to={"/"}>
            <h3 className='logo'>CodeTogether :)</h3>
        </Link>
        
          {auth?.auth?.user ? 
          (
            <ul>
            
            <Link to={"logout"}><FontAwesomeIcon icon={faRightFromBracket} /></Link>   
            <Link className='decoration-none' to={"/people"}>People</Link>
            <Link to={"/chat"}><FontAwesomeIcon icon={faRocket} /></Link>
            

          </ul>
          )
           : 
          (
          <ul> 
            <Link className='decoration-none' to={"/login"}>Login</Link>
            <Link className='decoration-none' to={"/signup"}>SignUp</Link>
          </ul>)
          }
            
        
    </nav>
  )
}

export default Navbar