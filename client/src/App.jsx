import Home from "./pages/Home/Home"
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import "../public/Assets/CSS/index.css"
import Layout from "./utils/Layout"
import SignUp from "./Components/SignUp/SignUp"
import Login from "./Components/Login/Login"
import Success from "./Components/Responses/Success"
import VerifyingUser from "./Components/VerifyingUser/VerifyingUser"
import UserHome from "./pages/UserHome/UserHome"


function App() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children:[
      {
        path:"home",
        element: <UserHome />
      }, 
      {
          path: "",
          element: <Home />

      },
      {
          path:"/login",
          element: <Login />
      },
      {
        path: "verify/:token",
        element: <VerifyingUser />
      },
      {
        path: "signup",
        element:<SignUp />
      },
      {
        path: "success",
        element: <Success />
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
