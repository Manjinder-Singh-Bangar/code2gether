import React from 'react'
import {Link} from "react-router-dom"
import "./footer.css"

const Footer = () => {
  return (
    <footer>
        <h3>CodeTogether</h3>
        <section className="links">
            <ul>
                <Link to={"/signup"}>SignUp</Link>
                <Link to={"/login"}>Login</Link>
            </ul>
            <ul>
                <Link to={"https://instagram.com"}>Instagram Icon</Link>
                <Link to={"https://github.com"}>gitHub Icon</Link>
            </ul>
        </section>
        <p>2024 CodeTogether All rights reserved</p>
    </footer>
  )
}

export default Footer