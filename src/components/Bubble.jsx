import React from 'react'
import UserBubble from './bubbles/UserBubble'
import AssistantBubble from './bubbles/AssistantBubble'

const Bubble = () => {
  return (
    <div className="bubble-container">
      <UserBubble 
        message="Hello! How can I help you today?" 
        time="12:30 PM" 
      />
      <AssistantBubble 
        message="I'm here to assist you with any questions you might have." 
        time="12:31 PM" 
      />
    </div>
  )
}

export default Bubble