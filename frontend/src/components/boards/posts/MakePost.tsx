import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import postService from '../../../services/posts'
import { LoggedUser } from '../../../types'
import styles from '../../../styles'
import { initializeBoards } from '../../../reducers/boardReducer'


const MakePost = ({ threadId, responseTo, setResponseTo }: { threadId: string, responseTo: string[], setResponseTo: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const user: LoggedUser = useSelector((state: RootState) => state.user)

  const handlePost = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    await postService.makePost(comment, responseTo, user.id, threadId, user.token)
    dispatch(initializeBoards())

    setComment('')
    setResponseTo([])
  }

  return (
    <div>
      <h2 style={{ marginBottom: '-5px'}}>Make a new Post</h2>
      <form onSubmit={handlePost}>
        {responseTo.length !== 0 && <>Replying to: {responseTo.join(', ')}</>}
        <br />
        <textarea
        required
        style={styles.textArea}
        placeholder="Comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)} />
        <br />
        <button style={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default MakePost
