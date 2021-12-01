import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import styles from './styles'

import Header from './components/Header'
import Login from './components/Login'
import Footer from './components/Footer'


function App() {
  return (
    <div style={styles.app}>
      <Header />
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
