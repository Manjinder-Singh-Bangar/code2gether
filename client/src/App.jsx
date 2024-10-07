import Home from "./pages/Home/Home"
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import "../public/Assets/CSS/index.css"
import Layout from "./utils/Layout"
import SignUp from "./Components/SignUp/SignUp"
import Success from "./Components/Responses/Success"
import VerifyingUser from "./Components/VerifyingUser/VerifyingUser"

function App() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children:[
      {
          path: "",
          element: <Home />

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
