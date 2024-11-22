import React,{useEffect, useState} from 'react'
import {useChatStore} from "../Store/useChatStore.js"
import UseAxiosPrivate from '../Hooks/UseAxiosPrivate.js';

const  ReceiverUserProfile = () => {
    const {receiverUser} = useChatStore();
    const [data, setData] = useState(null); // Use state to store data
    const axiosPrivate = UseAxiosPrivate();
    const gettingReceiver = async () => {
        try {
            const response = await receiverUser(axiosPrivate);
            setData(response); // Update state with the received data
        } catch (error) {
            console.error("Error fetching receiver user:", error);
        }
    };

    useEffect(() => {
        gettingReceiver(); // Fetch receiver user when the component mounts
    }, []);

  return (
    <section className="profile bg-gray-800 rounded-lg p-4 w-full shadow-lg hover:shadow-xl transition-all duration-300">
        {(data ? (
            <ul className='flex w-full items-center gap-3 p-2'>
                <div className="relative">
                    <img 
                        className='w-11 rounded-full border-4 border-indigo-500 object-cover shadow-md' 
                        src={data.profilePicture} 
                        alt={data.fullName} 
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                </div>
                <h3 className='text-white font-bold text-xl'>{data.fullName}</h3>
                <p className='text-indigo-300 text-sm bg-indigo-900/30 px-3 py-1 rounded-full'>@{data.username}</p>
            </ul>
        ) : (
            <div className='flex items-center justify-center h-40'>
                <h2 className='text-gray-400 animate-pulse'>Loading...</h2>
            </div>
        ))}
    </section>
  )
}

export default ReceiverUserProfile