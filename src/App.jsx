/* eslint-disable no-unused-vars */
import React from 'react'
import './App.css'
import User from './components/User/user'

function App() {

  return (
    <>
      <div className="h-screen flex flex-col">
      <div className="h-[46%] bg-[#2b2b32] relative"></div>
      <div><User/></div>
      </div>
    </>
  )
}

export default App
