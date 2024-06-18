import React from 'react'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'

function chatView() {
  return (
    <div className='chat-container' >
      <Sidebar />
      <ChatArea />
    </div>
  )
}

export default chatView