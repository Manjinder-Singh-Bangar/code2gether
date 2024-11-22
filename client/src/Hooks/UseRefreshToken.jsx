import axios from '../utils/axios'
import UseAuth from './UseAuth'

const UseRefreshToken = () => {
    const {setAuth} = UseAuth();

    const refresh = async () =>{
        const response = await axios.get("users/refresh", {
            withCredentials: true
        })

        setAuth((prev) =>{
            console.log("prev ", prev)
            console.log(response.data.data)
            return {...prev, accessToken : response.data.data}
        })
        return response.data.data;
    }

  return refresh;
}

export default UseRefreshToken