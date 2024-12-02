import React, {useRef} from 'react'
import {useChatStore} from '../../Store/useChatStore.js'
import MessageInput from '../MessageInput.jsx';
import ChatHeader from '../ChatHeader.jsx';
import { useEffect } from 'react';
import { axiosPrivate } from '../../utils/axios.js';


const ChatContainer = () => {
  const { selectedUser, socket, messages, getMessages, setSelectedUser,sendMessage, isLoading,subscribeToMessage, unsubscribeToMessage } = useChatStore();
  const messageEndRef = useRef(null);

  // First useEffect for socket subscription and initial messages
  useEffect(() => {
   if (selectedUser && socket) {
        console.log("selectedUser: ", selectedUser)
        getMessages(selectedUser, axiosPrivate);
        subscribeToMessage();
    };
    
    return () => {
      unsubscribeToMessage()
    }
  }, [selectedUser, subscribeToMessage, unsubscribeToMessage]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      const lastMessage = messageEndRef.current.lastElementChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);
 

  if (isLoading) return (<div>Loading...</div>)
  return (


    <section className='flex w-full min-h-screen md:h-[100vh] justify-center p-2 md:p-10'>
      <section className='w-full max-w-6xl flex h-full flex-col bg-gray-700 rounded-lg shadow-xl'>
        <ChatHeader />
        
        {/* Messages Container */}
        <div ref={messageEndRef} className='flex-1 overflow-y-auto p-2 md:p-4 space-y-4 md:space-y-6'>
          {messages.length > 0 ? messages?.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.senderId === selectedUser? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 md:px-6 py-2 md:py-3 shadow-md transition-all hover:shadow-lg ${
                  message.receiverId === selectedUser._id 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-100' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                }`}
              >
                <p className='leading-relaxed text-sm md:text-base'>{message.text}</p>
                <span className='text-[10px] md:text-xs opacity-75 mt-1 md:mt-2 block'>
                  {message.createdAt ? new Date(message.createdAt).toLocaleTimeString() : 'Time unavailable'}
                </span>

              </div>
            </div>
          )) : (
            <div className='text-center text-gray-400 py-10'>
              <p className='text-sm md:text-base'>No messages yet</p>
              <p className='text-xs opacity-75 mt-2'>Start a conversation!</p>
            </div>
          )}
        </div>

        {/* Message Input at bottom */}
        <div className='p-2 md:p-4 border-t border-gray-600'>
          <MessageInput />
        </div>
      </section>

        
  </section>
  )
}

export default ChatContainer
