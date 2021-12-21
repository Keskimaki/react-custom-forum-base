import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store'
import { LoggedUser, UserType } from '../../types'
import { logoutUser } from '../../reducers/loginReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeUsers } from '../../reducers/userReducer'
import userService from '../../services/users'
import styles from '../../styles'
import picture from '../../assets/default.png'

const User = () => {
  const loginData: LoggedUser = useSelector((state: RootState) => state.user)
  const users: UserType[] = useSelector((state: RootState) => state.users)
  const { username } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const boards = useSelector((state: RootState) => state.boards)
  const threads = boards.map(board => board.threads).flat()

  const user = users.find(user => user.username === username/*loginData.username*/)
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
      <div style={{ ...styles.board, minHeight: '200px' }}>
        <ProfilePicture image={user.image} />
        <h1 style={styles.subHeader}>{user.username} </h1>
        {user.privileges !== 'user' && user.privileges}
        <br />
        {user.email && <>{user.email} <br /></>}
        <strong>Following:</strong> 
        <br />
        {user.following.length != 0
          ? user.following.map(following => 
            <Link to={`/${users.find(user => user.id === following)?.username}`} style={styles.link} key={following}>
              <>{users.find(user => user.id === following)?.username} </>
            </Link>)
          : <>not following</>}
        <br />
        <strong>Details:</strong>
        <br />
        {user.details
          ? 
            <>
              {user.details.name} {user.details.location}
              <br />
              {user.details.description}
            </>
          : 
            <>no details <br /></>}
        <br />
        {loginData.username === username &&
        <>
          <Link to="/user/edit">
            <button style={styles.postButton}>
              edit profile
            </button>
          </Link>
          <button style={styles.postButton} onClick={handleUserDeletion}>
            delete user
          </button>
        </>}
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

const ProfilePicture = ({ image }: { image: boolean | undefined }) => {
  const [imageUrl, setImageUrl] = useState('')
  //const dispatch = useDispatch()
  const loginData: LoggedUser = useSelector((state: RootState) => state.user)
  const { username } = useParams()

  const handleProfilePictureSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    await userService.updateUserImage(imageUrl, loginData.id, loginData.token)
    setTimeout(() => window.location.reload(), 500) //Maybe fix later
    //dispatch(setNotification('Profile picture updated', 'positive'))
  }

  return (
    <div style={{ float: 'right' }}>
      <img 
        src={image ? `https://forumbaseuserprofiles.s3.eu-central-1.amazonaws.com/${username}.png` : picture}
        style={styles.profilePictureLarge}
      />
      <br />
      {loginData.username === username && 
        <form onSubmit={handleProfilePictureSubmit}>
          <input
            required
            placeholder='image url'
            style={{ width: '150px'}}
            onChange={({ target }) => setImageUrl(target.value) } />
          <br />
          <button type="submit" style={styles.postButton}>
            submit
          </button>
      </form>}
    </div>
  )
}

export default User
