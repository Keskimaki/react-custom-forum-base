import React, { useState } from 'react'
import threadService from '../../../services/threads'
import postService from '../../../services/posts'
import { useDispatch, useSelector } from 'react-redux'
import { LoggedUser, UserType, BoardType } from '../../../types'
import { RootState } from '../../../store'
import styles from '../../../styles'
import { initializeBoards } from '../../../reducers/boardReducer'
import { initializePosts } from '../../../reducers/postReducer'
import { initializeUsers } from '../../../reducers/userReducer'
import { setNotification } from '../../../reducers/notificationReducer'

const MakeThread = ({ boardId }: { boardId: string}) => {
  const dispatch = useDispatch()
  const [ title, setTitle ] = useState('')
  const [ comment, setComment ] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const loginData: LoggedUser = useSelector((state: RootState) => state.user)
  const users: UserType[] = useSelector((state: RootState) => state.users)
  const user = users.find(user => user.username === loginData.username)

  if (!user || user.privileges === 'guest') return null
  
  const boards: BoardType[] = useSelector((state: RootState) => state.boards)
  const threads = boards.map(board => board.threads).flat()

  const handleThreadCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (title.includes('#')) {
      dispatch(setNotification("Thread title cannot include character '#'", 'negative'))
      return null
    } else if (title.length < 5) {
      dispatch(setNotification('Thread title must be at least five characters long', 'negative'))
      return null
    } else if (threads.find(thread => thread.name === title )){
      dispatch(setNotification('Thread title must be unique', 'negative'))
      return null
    } else if (user.posts.length > 0 && (+new Date() - +new Date(user.posts[user.posts.length - 1].date) < 30000)) {
      dispatch(setNotification('Wait 30 seconds before posting again', 'negative'))
      return null
    }
    const newThread = await threadService.makeThread(title, user.id, boardId, loginData.token)
    await postService.makePost(imageUrl, comment, user.id, newThread.id, loginData.token)

    dispatch(initializeBoards())
    dispatch(initializePosts())
    dispatch(initializeUsers())

    setTitle('')
    setComment('')
    setImageUrl('')
  }

  return (
    <div style={styles.submit}>
      <h2 style={{ margin: '0px' }}>Make a new thread</h2>
      <form onSubmit={handleThreadCreation}>
        <input
          placeholder='image url'
          onChange={({ target }) => setImageUrl(target.value) } />
        <br />
        <input 
          required
          style={styles.threadInput}
          placeholder="Thread title"
          value={title}
          onChange={({ target }) => setTitle(target.value)} />
        <br />
        <textarea
          required
          style={styles.textArea}
          placeholder="Comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <br />
        <button style={styles.submitButton} type="submit">
          Create Thread
        </button>
      </form>
    </div>
  )
}

export default MakeThread