import React, { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import { ChatContext } from '../../contexts/ChatContext'
import { BeatLoader } from 'react-spinners'

// Register languages for syntax highlighting
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('bash', bash)

const AssistantBubble = ({ message, time, isTyping }) => {
  const { isStreaming, messages } = useContext(ChatContext)
  
  // Check if this is the last message and currently streaming
  const isLastMessage = messages[messages.length - 1]?.content === message
  const showCursor = isStreaming && isLastMessage
  
  // Replace newlines with breaks to render properly in markdown
  const formattedMessage = message.replace(/\n/g, '  \n')

  return (
    <div className={`bubble assistant ${(showCursor || isTyping) ? 'streaming' : ''}`}>
      <div className="message-content">
        {message.length > 0 ? (
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {formattedMessage}
          </ReactMarkdown>
        ) : isTyping ? (
          <div className="typing-animation">
            <BeatLoader size={8} color="#00b1bc" />
            <span className="typing-text">Thinking...</span>
          </div>
        ) : null}
        {showCursor && <span className="cursor"></span>}
      </div>
      <span className="time">{time}</span>
    </div>
  )
}

export default AssistantBubble