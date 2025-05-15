import React from 'react'
import Header from '../components/Header'
import Chat from '../components/Chat'
import { HamMenuProvider } from '../contexts/HamMenuContext'
import { ChatProvider } from '../contexts/ChatContext'

const Home = () => {
  return (
    <>
      <HamMenuProvider>
        <ChatProvider>
          <Header />
          <Chat />
        </ChatProvider>
      </HamMenuProvider>
    </>
  )
}

export default Home