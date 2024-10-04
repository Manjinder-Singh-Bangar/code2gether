import React, { useEffect, useState } from 'react'
import "./SignUp.css"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const navigate = useNavigate();
  const [apiMsg, setApiMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let signUpData = {
      fullName,
      username,
      email,
      password,
      phoneNumber
    }

    

    fetch("http://localhost:5000/api/v1/users/signup",{
      method: "post",
      headers:{
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        ...signUpData
      })
    }).then((response) => {
      if (!response.ok) {
        // If the response is not OK, we want to parse the error message
        return response.json().then((errorData) => {
            console.log(errorData)
            return errorData
        });
      }
      console.log("ok")
      navigate("/success")
      return response.json(); // Otherwise, return the response as JSON
    })
    .then((response) => {
        setApiMsg(response.message);
    })
    .catch((error) => {
      setApiMsg(error.message)
    })
    
  }
  
    
    
  
  
  
  return (
    <section className='signup'>
      <form>
        <h1>{apiMsg ? apiMsg : ""}</h1>
        <input type="text" onChange={(e) => setFullName(e.target.value)} placeholder='Full name'/>
        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <input type="number" onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Mobile number'/>
        <button onClick={handleSubmit}  type='submit'>Sign Up</button>
      </form>
    </section>
  )
}

export default SignUp