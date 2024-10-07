import React, { useState, useEffect } from 'react'
import {useParams} from "react-router-dom"
import "./verifyinguser.css"

const VerifyingUser = () => {
    const [response, setResponse] = useState("")
    const {token} = useParams()
    useEffect(() =>{
        fetch("http://localhost:5000/api/v1/users/verify/" + token, {
            method: "get"
        }).then((res) =>{
            if(!res.ok){
                return res
            }
            return res.json()
        }).then((res)=>{
            setResponse(res.message)
        }).catch((error) =>{
            setResponse(error.message)
        })
    },[])
    

  return (
    <div className='verify-text'>{response}</div>
  )
}

export default VerifyingUser