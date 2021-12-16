import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store'
import { LoggedUser, UserType } from '../../types'
import { logoutUser } from '../../reducers/loginReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeUsers } from '../../reducers/userReducer'
import userService from '../../services/users'
import styles from '../../styles'

const User = () => {
  const loginData: LoggedUser = useSelector((state: RootState) => state.user)
  const users: UserType[] = useSelector((state: RootState) => state.users)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const boards = useSelector((state: RootState) => state.boards)
  const threads = boards.map(board => board.threads).flat()

  const user = users.find(user => user.username === loginData.username)
  if (!user || user.username === "") return null

  const findThread = (threadId: string) => {
    const thread = threads.find(thread => thread.id === threadId)
    if (!thread) return null
    const boardName = boards.find(board => board.id === thread?.board)?.name
    return <><strong>{thread.name}</strong> in {boardName}</>
  }

  const handleUserDeletion = async () => {
    const password = window.prompt('Are you sure? Type password to confirm user deletion.')
    if (!password) return null
    try {
      await userService.deleteUser(loginData.id, password, loginData.token)
    } catch {
      dispatch(setNotification('Wrong Password', 'negative'))
      return null
    }
    window.localStorage.removeItem('loggedForumUser')
    dispatch(logoutUser())
    dispatch(initializeUsers())
    navigate('/boards')
    dispatch(setNotification('User deleted'))
  }

  return (
    <div>
      <div style={styles.board}>
        <h1 style={styles.subHeader}>{user.username} </h1>
        <img 
          src="https://forumbaseuserprofiles.s3.eu-central-1.amazonaws.com/blank-profile-picture.png"  
          style={{ width: '150px', float: 'right', padding: '10px' }} /> {/*placeholder*/}
        {user.privileges !== 'user' && user.privileges}
        <br />
        {user.email && <>{user.email} <br /></>}
        Following: {user.following.map(following => users.find(user => user.id === following)?.username).join(', ')}
        <br />
        {user.details
          ? 
            <>
              <strong>Details:</strong>
              <br />
              {user.details.name} {user.details.location}
              <br />
              {user.details.description}
            </>
          : 
            <>No details</>}
        <br />
        <Link to="/user/edit">
          <button style={styles.postButton}>
            edit profile
          </button>
        </Link>
        <button style={styles.postButton} onClick={handleUserDeletion}>
          delete user
        </button>
      </div>
      <h2 style={styles.subHeader}>Posts: </h2>
      {user.posts.slice().reverse().map(post => 
        <div key={post.id} style={styles.board}>
          {findThread(post.thread)}
          <br />
          {post.content}
        </div>)}
    </div>
  )
}

export default User