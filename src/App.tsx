import React from 'react'
import styles from './styles'

import Header from './components/Header'
import Login from './components/Login'
import Footer from './components/Footer'


function App() {
  return (
    <div style={styles.app}>
      <Header />
      <Login />
      <Footer />
    </div>
  )
}

export default App
