import { useContext } from 'react';
import { useState } from 'react'
import { FaPaperPlane } from "react-icons/fa";
import { HamMenuContext } from '../contexts/HamMenuContext';

const MessageBox = () => {
  const [message, setMessage] = useState('')
  const [hamMenu] = useContext(HamMenuContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      console.log('Message sent:', message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`message-box ${hamMenu ? "open" : "close"}`}>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">
          <FaPaperPlane color='#00b1bc' size={16} />
        </button>
      </div>
    </form>
  )
}

export default MessageBox