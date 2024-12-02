import { useState, useEffect, useRef } from "react"
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import UseAuth from "../../Hooks/UseAuth";
import { useChatStore } from "../../Store/useChatStore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMessage } from '@fortawesome/free-solid-svg-icons'

const Users = () => {
  const {selectedUser, onlineUsers} = useChatStore()
  const [users, setUsers] = useState();
  const axiosPrivate = UseAxiosPrivate();
  const auth = UseAuth();

  const user = useRef(null)
  
  const setSelectedUser = useChatStore(state => state.setSelectedUser);

  
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
        console.log("users: ", response.data.data)
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
    console.log(selectedUser)
  }
  
  return (
    <>
  <div className="max-w-4xl mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Chat Users</h2>

    <div className="space-y-4">
      {users?.length ? (
        users.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={item.profilePicture} 
                  alt={item.username}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" 
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.username}</h3>
                  <p className="text-sm text-gray-600">{item.fullName}</p>
                </div>
              </div>
              <Link
                ref={user}
                onClick={() => handleChatLinkClick(item._id)}
                to={`/chat/${item._id}`}
                className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faMessage} className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No Users to display</p>
      )}
    </div>
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