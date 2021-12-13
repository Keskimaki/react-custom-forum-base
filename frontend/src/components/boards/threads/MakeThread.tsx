import React, { useState } from 'react'
import threadService from '../../../services/threads'
import postService from '../../../services/posts'
import { useDispatch, useSelector } from 'react-redux'
import { LoggedUser } from '../../../types'
import { RootState } from '../../../store'
import styles from '../../../styles'
import { initializeBoards } from '../../../reducers/boardReducer'

const MakeThread = ({ boardId }: { boardId: string}) => {
  const dispatch = useDispatch()
  const [ title, setTitle ] = useState('')
  const [ comment, setComment ] = useState('')
  const user: LoggedUser = useSelector((state: RootState) => state.user)

  const handleThreadCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newThread = await threadService.makeThread(title/*, comment*/, user.id, boardId, user.token)
    await postService.makePost(comment, user.id, newThread.id, user.token)

    dispatch(initializeBoards())
    setTitle('')
    setComment('')
  }

  if (user.privileges === 'guest') return null

  return (
    <div style={styles.submit}>
      <h2 style={{ margin: '0px' }}>Make a new Thread</h2>
      <form onSubmit={handleThreadCreation}>
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
        <button style={styles.button} type="submit">
          Create Thread
        </button>
      </form>
    </div>
  )
}

export default MakeThread