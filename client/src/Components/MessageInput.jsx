import React, {useState} from 'react'
import {useChatStore} from '../Store/useChatStore';
import { axiosPrivate } from '../utils/axios';


const MessageInput = () => {
  const { sendMessage, getMessages ,selectedUser} = useChatStore();
  const [message, setMessage] = useState('');
  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      console.log('Sending message:', message);
      if (!message) {
        console.warn('Message is empty');
        return;
      }
      
      const response = await sendMessage(message, axiosPrivate);
      getMessages(selectedUser, axiosPrivate)
      console.log('Message sent successfully:', response);
      
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    
      <form className='flex w-full justify-end flex-row' onSubmit={handleSendMessage}>       
        <input
          type="text"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder="Type your message..."
        className=" p-2 w-4/5 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
        <button
          type="submit"
          className="px-4 w-1/5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
        Send
        </button>
      </form>
    
  )
}
export default MessageInput;