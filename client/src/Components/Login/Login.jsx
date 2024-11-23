import { useRef, useState, useEffect } from "react";
import "./Login.css"
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
  const {connectSocket} = useChatStore();
  const setUserAuth = useChatStore((state) => state.setUserAuth);

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

      if (!response) {
        console.log(response)
        console.log("response is not ok")
        return;
      }

      const accessToken = response?.data?.data?.accessToken
      const user = { accessToken, email }
      setUserAuth({user})
      connectSocket();
      console.log(user)
      setAuth({ user })
      navigate('/');
      setEmail("")
      setPassword("")

    } catch (error) {
      if(error.response.data.message){
        
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
        console.error("Error message:", error.message);
      }
    }

  }
  return (
    <section className="login-section">
      <p ref={errRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoComplete="off"
          ref={userRef}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>Log In</button>
      </form>
    </section>
  )
}

export default Login