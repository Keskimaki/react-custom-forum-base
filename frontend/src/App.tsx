import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import styles from './styles'

import { useDispatch } from 'react-redux'
import axios from 'axios'
import { BoardType } from './types'

import Header from './components/Header'
import Boards from './components/boards'
import Threads from './components/boards/Threads'
import Posts from './components/boards/Posts'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import Footer from './components/Footer'
import RightBar from './components/RightBar'

function App() {
  //Initialize boards in App at least for now
  const dispatch = useDispatch()

  useEffect(() => {
    const initializeBoards = async () => {
      const res = await axios.get('http://localhost:3003/api/boards')
      const resData: BoardType[]  = res.data
      dispatch({ type: 'GET_BOARDS', data: resData })
    }
    initializeBoards()
  }, [])

  return (
    <div style={styles.app}>
      <Header />
      <RightBar />
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
