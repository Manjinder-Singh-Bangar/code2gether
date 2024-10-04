import React from 'react'
import "./responses.css"
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <section className='success'>
        <h1>You have created your account successfully, Check the mail for verification</h1>
        <Link className='login-btn' to={"/login"}>Login</Link>
    </section>
  )
}

export default Success