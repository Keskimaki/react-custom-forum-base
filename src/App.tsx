import React from 'react'
import { Routes, Route } from "react-router-dom";
import styles from './styles'

import Header from './components/Header'
import Boards from './components/boards'
import Login from './components/Login'
import Footer from './components/Footer'
import RightBar from './components/RightBar';

function App() {
  return (
    <div style={styles.app}>
      <Header />
      <RightBar />
      <Routes>
        <Route path="/boards" element={<Boards />} />
        {/*<Route path="/boards/:boardName" element={<Placeholder />} />*/}
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
