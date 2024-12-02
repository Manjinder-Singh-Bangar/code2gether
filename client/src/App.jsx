import Home from "./pages/Home/Home"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "../public/Assets/CSS/index.css"
import Layout from "./utils/Layout"
import SignUp from "./Components/SignUp/SignUp.jsx"
import Login from "./Components/Login/Login.jsx"
import Success from "./Components/Responses/Success.jsx"
import VerifyingUser from "./Components/VerifyingUser/VerifyingUser.jsx"
import "./index.css"
import UserProfile from "./Components/UserProfile.jsx"
import RequireAuth from "./Components/RequireAuth.jsx"
import Users from "./Components/Users/Users.jsx"
import Logout from "./Components/Logout/Logout.jsx"
import ChatContainer from "./Components/ChatContainer/ChatContainer.jsx"

function App() {
  const routes = [

    {
      path: "/",
      element: <Layout />,
      children: [
        // Public Routes
        {
          path: "",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "verify/:token",
          element: <VerifyingUser />
        },
        {
          path: "signup",
          element: <SignUp />
        },
        {
          path: "success",
          element: <Success />
        },

        // Private Routes
        {  
          element: <RequireAuth />,
          children: [
            
            {
              path: "people",
              element: <Users />
            },
            {
              path: "profile",
              element: <UserProfile />
            },
            {
              path: "logout",
              element: <Logout />
            },
            {
              path: "chat/:_id",
              element: <ChatContainer />
            }
          ]
        }
        
      ]

    },


  ]
  const router = createBrowserRouter(routes)
return (
  <RouterProvider router={router} />
)
}
  




export default App
