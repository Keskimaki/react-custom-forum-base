import React, { useState } from 'react'
import users from '../mockdata/users' //placeholder until backend functional

const Login = () => {
  const [ username, setUsername] = useState('')
  const [ password, setPassword] = useState('')

  const handleLogin = (event: React.SyntheticEvent) => {
    event.preventDefault()
    //TODO authentication in backend
    const user = users.find(user => user.username === username)
    user && password === 'salasana'
      ? console.log('logged in')
      : console.log('incorrect username or password')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value) } />
        <br />
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value) } />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login