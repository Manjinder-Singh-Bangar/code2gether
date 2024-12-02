import { useRef, useState, useEffect } from "react";
import axios from "../../utils/axios";
import UseAuth from "../../Hooks/UseAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { useChatStore } from "../../Store/useChatStore";

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const { setAuth } = UseAuth()
  const LOGIN_URL = "users/login"
  const {connectSocket, setUserId} = useChatStore();
  const setUserAuth = useChatStore((state) => state.setUserAuth);
  const setUserProfile = useChatStore((state) => state.setUserProfile);

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrorMsg("")
  }, [password, email])

  const submitHandler = async (e) => {
    e.preventDefault()
    const data = {
      email,
      password
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        data,
        {
          Headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      const accessToken = response?.data?.data?.accessToken
      const user = { accessToken, email }
      setUserAuth({user})
      setUserId(response.data.data.user._id)
      setUserProfile(response.data.data.user)
      connectSocket();
      setAuth({ user })
      navigate('/');
      setEmail("")
      setPassword("")
      return;
    } catch (error) {
      if(error.response?.data?.message){
        
        setErrorMsg(error.response.data.message)
      }
      else if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something else happened
        console.error("Error message:", error?.message);
      }
    }

  }
  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <p 
          ref={errRef} 
          className={errorMsg 
            ? "mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg"
            : "sr-only"
          } 
          aria-live="assertive"
        >
          {errorMsg}
        </p>

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Login
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="off"
              ref={userRef}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Log In
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login