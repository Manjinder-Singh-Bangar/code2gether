import { useState, useEffect, useRef } from "react"
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import UseAuth from "../../Hooks/UseAuth";
import "./Users.css"
import { useChatStore } from "../../Store/useChatStore";
import { Link } from "react-router-dom";

const Users = () => {
  const {setSelectedUser} = useChatStore()
  const [users, setUsers] = useState();
  const axiosPrivate = UseAxiosPrivate();
  const auth = UseAuth();
  const user = useRef(null)
  
  // Getting User from the database
  useEffect(() => {
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("users/people", {
          signal: controller.signal,
          withCredentials: true
        })

        setUsers(response.data.data)
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("Request canceled:", error.message);
        } else if (error.response) {
          console.error("Server responded with an error:", error.response.data);
        } else {
          console.error("Error fetching users:", error.message);
        }
      }
    }
    getUsers();
    
    return () => {
      controller.abort();
    }
  }, [])

  const handleChatLinkClick = (userId) =>{
    setSelectedUser(userId)
  }
  
  return (
    <>
      <h2 className="center-text">All the Users</h2>

      <div className="users">
        {users?.length ? (
          users.map((item) => {

            return (
              <>
                <div  className="user" >
                  <div className="user-body">
                    <img src={item.profilePicture} alt="" />
                    <h1>{item.username}</h1>
                    <h2>{item.fullName}</h2>  
                  </div>
                  <Link ref={user} key={item._id} onClick={() => handleChatLinkClick(item._id)} to={`/chat/${item._id}`} className="btn">Chat</Link>
                </div>
              </>
            );
          })
        ) : (
          <p>No Users to display</p>
        )}
      </div>

    </>
  )
}

export default Users

/* {
        users?.length ? (
          <ul>{users.map((item) =>{
            return (<li key={item._id}>{item.fullName}</li>)
          })}</ul>
        ) : <p>No Users to display</p>
      } */