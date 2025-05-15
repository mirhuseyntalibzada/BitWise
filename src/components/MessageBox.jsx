import { useContext } from 'react';
import { useState } from 'react'
import { FaPaperPlane } from "react-icons/fa";
import { HamMenuContext } from '../contexts/HamMenuContext';
import { ChatContext } from '../contexts/ChatContext';
import { BeatLoader } from 'react-spinners';

const MessageBox = () => {
  const [message, setMessage] = useState('')
  const [hamMenu] = useContext(HamMenuContext)
  const { sendMessage, isLoading, isStreaming, isTyping } = useContext(ChatContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      sendMessage(message)
      setMessage('')
    }
  }

  const placeholderText = isTyping 
    ? "DeepSeek is thinking..." 
    : isStreaming 
      ? "DeepSeek is typing..." 
      : "Type a message...";

  const inputClass = isTyping 
    ? 'ai-thinking' 
    : isStreaming 
      ? 'ai-typing' 
      : '';

  return (
    <form onSubmit={handleSubmit} className={`message-box ${hamMenu ? "open" : "close"}`}>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholderText}
          disabled={isLoading}
          className={inputClass}
        />
        <button type="submit" disabled={isLoading || !message.trim()}>
          {isLoading && !isStreaming && !isTyping ? (
            <BeatLoader size={8} color="#00b1bc" />
          ) : (
            <FaPaperPlane color={isLoading ? '#888888' : '#00b1bc'} size={16} />
          )}
        </button>
      </div>
    </form>
  )
}

export default MessageBox