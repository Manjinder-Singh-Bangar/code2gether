import { useContext } from "react";
import AuthContext from "../context/Auth";

const UseAuth = () => {
  return useContext(AuthContext)
}

export default UseAuth