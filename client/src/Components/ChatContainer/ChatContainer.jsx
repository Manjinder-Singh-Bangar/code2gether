import React from 'react'
import {useChatStore} from '../../Store/useChatStore.js'
import MessageInput from '../MessageInput.jsx';
import ChatHeader from '../ChatHeader.jsx';
import { useEffect } from 'react';

const ChatContainer = () => {
  const { selectedUser, messages, getMessages, setSelectedUser, unsubscribeFromMessages, isLoading } = useChatStore();
  
  // useEffect(() => {
  //   getMessages(selectedUser._id);
  // }, [selectedUser, getMessages])
  


  if (isLoading) return (<div>Loading...</div>)
  return (
    <section className='flex w-full h-[100vh] justify-center overflow-auto p-10'>
      <section className='w-full flex h-full flex-col bg-gray-700 rounded-lg shadow-xl'>
        <ChatHeader />
        
        {/* Messages Container */}
        <div className='flex-1 overflow-y-auto p-4 space-y-6'>
          {messages?.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.sender === selectedUser._id ? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`max-w-[70%] rounded-2xl px-6 py-3 shadow-md ${
                  message.sender === selectedUser._id 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-100' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                }`}
              >
                <p className='leading-relaxed'>{message.content}</p>
                <span className='text-xs opacity-75 mt-2 block'>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input at bottom */}
        <div className='p-4 border-t border-gray-600'>
          <MessageInput />
        </div>
      </section>
    </section>
  )
}

export default ChatContainer