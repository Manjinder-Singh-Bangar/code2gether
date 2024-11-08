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
  const [profilePicture, setFile] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profilePicture)
    // console.log(profilePicture)
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }


    try {
      fetch("http://localhost:5000/api/v1/users/signup",{
        method: "post",
        headers:{
         
        },
        body:formData
      }).then((response) => {
        if (!response.ok) {
          // If the response is not OK, we want to parse the error message
          return response.json().then((errorData) => {
              return errorData
          });
        }
        navigate("/success")
        return response.json(); // Otherwise, return the response as JSON
      })
      .then((response) => {
          setApiMsg(response.message);
      })
      .catch((error) => {
        setApiMsg(error.message)
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <section className='signup'>
      <form>
        <h1>{apiMsg ? apiMsg : "SignUp Here"}</h1>
        <input type="text" onChange={(e) => setFullName(e.target.value)} placeholder='Full name'/>
        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <label for="imageUpload">Profile Picture</label>
        <input type="file"onChange={(e) => setFile(e.target.files[0])} id="imageUpload" name="image" accept="image/*"></input>
        <input type="number" onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Mobile number'/>
        <button onClick={handleSubmit}  type='submit'>Sign Up</button>
      </form>
    </section>
  )
}

export default SignUp