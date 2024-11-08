import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./Login.css"

const Login =  () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [responseMsg, setResponseMsg] = useState("")
  const navigate = useNavigate();
  
  const handleLoginForm = (e) =>{
    e.preventDefault();
    const data = {email, password}
    try {
      
      fetch("http://localhost:5000/api/v1/users/login", {
        method: "post",
        headers:{
          "Content-Type": 'application/json'
        },
        body:JSON.stringify({
         ...data
        })
      }).then((response) => {
        if (!response.ok) {
          
          return response.json().then((result) => {
            throw new Error(result.message || "Error logging in.");
          });
        }
        return response.json();
      }).then((result) =>{
        setResponseMsg(result.message)
        navigate("/home");
        
      }).catch((errormsg) =>{
        setResponseMsg(errormsg.message)
      })
    } catch (error) {
      console.log(error)
    }
  
    
  }

  return (<div className='login-section'>
    <form action="" onSubmit={handleLoginForm} className='loginForm'>

      <h3>{responseMsg ? responseMsg : ""}</h3>
      <h1>Login Here</h1>
        <input
        id='email'
        onChange={(e) => setEmail(e.target.value)}
        className='loginInput'
        type="email"
        placeholder="Email"
        required
         />
        <input   
        id='password' 
        onChange={(e) => setPassword(e.target.value)}
        className='loginInput'
        type="password"
        placeholder="Password"
        required 
        />
        <button type='submit' className='logInButton'>Log In</button>
    </form>

  </div>
  )
}

export default Login


// import React from 'react'

// const Login = () => {
//   return (
//     <div>Login</div>
//   )
// }

// export default Login