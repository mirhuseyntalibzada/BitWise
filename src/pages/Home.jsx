import React from 'react'
import Header from '../components/Header'
import Chat from '../components/Chat'
import { HamMenuProvider } from '../contexts/HamMenuContext'

const Home = () => {
  return (
    <>
      <HamMenuProvider>
        <Header />
        <Chat />
      </HamMenuProvider>

    </>
  )
}

export default Home