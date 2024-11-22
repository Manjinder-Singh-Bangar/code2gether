import React from 'react'

const MessageInput = () => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Send
      </button>
    </div>
  )
}

export default MessageInput