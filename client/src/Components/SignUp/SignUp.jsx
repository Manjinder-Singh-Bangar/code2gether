import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const navigate = useNavigate();
  const [apiMsg, setApiMsg] = useState('');
  const [profilePicture, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      toast.error("Passwords do not match")
      return
    }

    
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
        navigate("/login")
        toast.success("Account created successfully, Check your email for verification")
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

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Check if image is square
          if (img.width !== img.height) {
            toast('It is advised to upload a square image, but you can proceed', {
              icon: '⚠️',
              style: {
                background: 'orange',
                color: 'white',
              },
            });
          }
          
          // If image is square, proceed with setting the file
          setFile(file);
          // Optional: Show preview
          setPreviewUrl(event.target.result);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {apiMsg ? apiMsg : "Create Account"}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input 
              type="text" 
              onChange={(e) => setFullName(e.target.value)} 
              placeholder="Full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <input 
              type="text"
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <input 
              type="password" 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <input 
              type="password" 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="relative">
            <label 
              htmlFor="imageUpload" 
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"/>
              </svg>
              Upload Square Profile Picture
            </label>
            <input 
              type="file"
              onChange={handleImageSelect} 
              id="imageUpload" 
              name="image" 
              accept="image/*"
              className="hidden"
            />
          </div>
          
          {/* Optional: Image Preview */}
          {profilePicture && (
            <div className="mt-4 flex justify-center">
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Profile preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
            </div>
          )}
          
          <div>
            <input 
              type="number" 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              placeholder="Mobile number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <button 
              
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Account
          </button>
        </form>
      </div>
    </section>
  )
}

export default SignUp