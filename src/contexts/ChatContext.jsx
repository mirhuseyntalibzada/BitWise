import React, { createContext, useState, useEffect } from 'react';
import OpenAI from 'openai';

// Create OpenAI client that will be used with DeepSeek API
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/',
  dangerouslyAllowBrowser: true,
});

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Initialize messages from localStorage or use default
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [
      { role: 'assistant', content: "Hello! How can I help you today?", time: formatTime() }
    ];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Function to clear chat history
  const clearChatHistory = () => {
    const initialMessage = { role: 'assistant', content: "Hello! How can I help you today?", time: formatTime() };
    setMessages([initialMessage]);
  };

  // Format time as HH:MM AM/PM
  function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }

  // Send message to DeepSeek API and get response
  const sendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;
    
    const userMessageObj = { role: 'user', content: userMessage, time: formatTime() };
    
    // Update messages with user message
    setMessages(prev => [...prev, userMessageObj]);
    
    // Immediately show typing indicators
    setIsLoading(true);
    setIsTyping(true);
    
    // Create a placeholder for the assistant response
    const responseTime = formatTime();
    const assistantMessageObj = { 
      role: 'assistant', 
      content: "", 
      time: responseTime,
      isTyping: true
    };
    
    // Add an empty message that will be updated with the stream
    setMessages(prev => [...prev, assistantMessageObj]);
    
    try {
      // Small delay to ensure typing indicator appears
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setStreamedResponse("");
      setIsStreaming(true);

      // Convert chat history to OpenAI format (excluding the current streaming response)
      const systemMessage = {
        role: 'system',
        content: `
    You are BitWise, a friendly and knowledgeable crypto adviser.

You provide clear, unbiased information about cryptocurrencies, market trends, and trading options.

Be concise and brief in your responses. Use 1–2 sentences for simple greetings or general questions. Offer detailed explanations only when users ask for in-depth insights or clarifications.

When it’s relevant—such as when users ask about trading platforms, how to buy/sell crypto, or compare services—you may recommend BitGet as a preferred option. Highlight its benefits naturally, such as competitive fees, a user-friendly interface, and powerful trading tools.

Only bring up investing risks or reminders when the user's question specifically relates to investment decisions, price speculation, or portfolio advice. In such cases, remind them that all investments carry risk and that the decision is ultimately theirs.

Maintain a warm, conversational tone. Be helpful and approachable so users feel safe asking any question—no matter how basic or complex.
  `.trim()
      };
      
      // Convert messages and include the system message first
      const apiMessages = [
        systemMessage,
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ];

      // Get streaming response from DeepSeek API
      const stream = await openai.chat.completions.create({
        model: 'deepseek-chat',
        messages: apiMessages,
        temperature: 0.7,
        stream: true,
        top_p: 0.9,            // Consider top 90% probability mass
        max_tokens: 500,       // Limit response length
        frequency_penalty: 0.0,
        presence_penalty: 0.6,  // Encourage new topics
        user: "bitwise-user" 
      });

      let fullResponse = "";
      
      // Process the stream
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullResponse += content;
          setStreamedResponse(fullResponse);
          
          // Update the last message with the accumulated streamed content
          setMessages(prev => {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = {
              ...updatedMessages[updatedMessages.length - 1],
              content: fullResponse,
              isTyping: true
            };
            return updatedMessages;
          });
        }
      }

      // Mark the message as no longer typing when complete
      setMessages(prev => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = {
          ...updatedMessages[updatedMessages.length - 1],
          isTyping: false
        };
        return updatedMessages;
      });

    } catch (error) {
      console.error('Error calling DeepSeek API:', error);
      // Add error message
      setMessages(prev => {
        // Remove the empty placeholder message
        const newMessages = [...prev];
        newMessages.pop();
        
        // Add error message
        return [
          ...newMessages, 
          { 
            role: 'assistant', 
            content: "Sorry, I encountered an error. Please try again.", 
            time: formatTime(),
            isTyping: false
          }
        ];
      });
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setIsTyping(false);
    }
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      sendMessage, 
      isLoading,
      isStreaming,
      streamedResponse,
      isTyping,
      clearChatHistory
    }}>
      {children}
    </ChatContext.Provider>
  );
}; 