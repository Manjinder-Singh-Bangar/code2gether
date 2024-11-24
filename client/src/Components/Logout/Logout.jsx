import React, { useState, useEffect, useContext} from 'react'
import UseAxiosPrivate from '../../Hooks/UseAxiosPrivate'
import { useNavigate } from 'react-router-dom';
import UseAuth from '../../Hooks/UseAuth';
import toast from 'react-hot-toast';
import { useChatStore } from '../../Store/useChatStore';

const Logout = () => {
  const axiosPrivate = UseAxiosPrivate();
  const [responseMsg, setResponseMsg] = useState("");
  const {setAuth} = UseAuth()
  const navigate = useNavigate()
  const {disconnectSocket} = useChatStore()

  useEffect(() =>{
    const handlingLogout = async() =>{
      try {
      const res = await axiosPrivate.post("users/logout",{
            headers:{
              "Content-Type":"application/json"
            },
            withCredentials: true
      })
      console.log(res)
      setResponseMsg(res.data.message)
      navigate("/login");
      toast.success("You have logged out successfully!");
      setAuth(null)
      disconnectSocket()
      } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
    }

    handlingLogout();
  },[])
  
   
  return (
    <section>
      {responseMsg ? responseMsg : 
    "Loading"}
    </section>
  )
}

export default Logout