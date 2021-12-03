import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import styles from './styles'

import { useDispatch } from 'react-redux'
import { initializeBoards } from './reducers/boardReducer'
import { initializeUsers } from './reducers/userReducer'

import Header from './components/Header'
import Boards from './components/boards'
import Threads from './components/boards/Threads'
import Posts from './components/boards/Posts'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import Footer from './components/Footer'
import InfoBar from './components/InfoBar'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBoards())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div style={styles.app}>
      <Header />
      <InfoBar />
      <Routes>
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:boardName" element={<Threads />} />
        <Route path="/boards/:boardName/:threadName" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<CreateAccount />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
