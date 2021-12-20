import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import styles from './styles'

import { useDispatch } from 'react-redux'
import { initializeBoards } from './reducers/boardReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializePosts } from './reducers/postReducer'
import { initializeUserData } from './reducers/loginReducer'

import Header from './components/Header'
import Boards from './components/boards'
import Threads from './components/boards/threads'
import Posts from './components/boards/posts'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import User from './components/user'
import EditUser from './components/user/EditUser'
import Footer from './components/Footer'
import InfoBar from './components/infobar'
import Notification from './components/Notification'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBoards())
    dispatch(initializeUsers())
    dispatch(initializePosts())
    
    const userData = window.localStorage.getItem('loggedForumUser')
    if (userData) dispatch(initializeUserData(userData))
  }, [dispatch])

  return (
    <div style={styles.app}>
      <Header />
      <div style={styles.main}>
        <div style={styles.body}>
          <Routes>
            <Route path="/boards" element={<Boards />} />
            <Route path="/boards/:boardName" element={<Threads />} />
            <Route path="/boards/:boardName/:threadName" element={<Posts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<CreateAccount />} />
            <Route path='/:username' element={<User />} />
            <Route path='/user/edit' element={<EditUser />} />
          </Routes>
          <Notification />
        </div>
        <InfoBar />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
