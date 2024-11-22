import Home from "./pages/Home/Home"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "../public/Assets/CSS/index.css"
import Layout from "./utils/Layout"
import SignUp from "./Components/SignUp/SignUp"
import Login from "./Components/Login/Login"
import Success from "./Components/Responses/Success"
import VerifyingUser from "./Components/VerifyingUser/VerifyingUser"
import "./index.css"
import RequireAuth from "./Components/RequireAuth"
import Users from "./Components/Users/Users.jsx"
import Logout from "./Components/Logout/Logout.jsx"
import ChatContainer from "./Components/ChatContainer/ChatContainer.jsx"

function App() {
  const routes = [

    {
      path: "",
      element: <Layout />,
      children: [
        // Public Routes
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/verify/:token",
          element: <VerifyingUser />
        },
        {
          path: "/signup",
          element: <SignUp />
        },
        {
          path: "/success",
          element: <Success />
        },

        // Private Routes
        {
          
          element: <RequireAuth />,
          children: [
            
            {
              path: "/people",
              element: <Users />
            },
            {
              path: "/logout",
              element: <Logout />
            },
            {
              path: "/chat/:_id",
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
