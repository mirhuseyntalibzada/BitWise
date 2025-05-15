import React, { useContext, useRef, useEffect } from 'react'
import UserBubble from './bubbles/UserBubble'
import AssistantBubble from './bubbles/AssistantBubble'
import { ChatContext } from '../contexts/ChatContext'

const Bubble = () => {
  const { messages, isStreaming, isTyping } = useContext(ChatContext)
  const messagesEndRef = useRef(null)

  // Auto-scroll to the bottom when new messages are added or during streaming
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming, isTyping])

  return (
    <div className="bubble-container">
      {messages.map((msg, index) => (
        msg.role === 'user' ? (
          <UserBubble 
            key={index}
            message={msg.content}
            time={msg.time}
          />
        ) : (
          <AssistantBubble 
            key={index}
            message={msg.content}
            time={msg.time}
            isTyping={msg.isTyping}
          />
        )
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Bubble