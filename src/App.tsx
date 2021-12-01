import React from 'react'
import { Routes, Route } from "react-router-dom";
import styles from './styles'

import Header from './components/Header'
import Boards from './components/Boards'
import Login from './components/Login'
import Footer from './components/Footer'


function App() {
  return (
    <div style={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/:boardName" element={<Placeholder />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  )
}

const Placeholder = () => {
  return (
    <div>heis</div>
  )
}

export default App
