import React, { useState } from 'react'
import threadService from '../../../services/threads'
import { useSelector } from 'react-redux'
import { LoggedUser } from '../../../types'
import { RootState } from '../../../store'
import styles from '../../../styles'

const MakeThread = ({ boardId }: { boardId: string}) => {
  const [ title, setTitle ] = useState('')
  const [ comment, setComment ] = useState('')
  const user: LoggedUser = useSelector((state: RootState) => state.user)

  const handleThreadCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const thread = threadService.makeThread(title, comment, user.id, boardId, user.token)
    window.location.reload() //don't leave this here longterm
    console.log(thread)
  }

  return (
    <div>
      <h2 style={{ marginBottom: '-5px'}}>Make a new Thread</h2>
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