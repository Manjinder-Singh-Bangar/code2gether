import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { AuthProvider } from './context/Auth.jsx'
import { Toaster } from "react-hot-toast";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster />
        <App/>
    </AuthProvider>
  </StrictMode>,
)
