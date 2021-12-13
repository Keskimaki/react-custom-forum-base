import React  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import postService from '../../../services/posts'
import { LoggedUser } from '../../../types'
import styles from '../../../styles'
import { initializeBoards } from '../../../reducers/boardReducer'

type Types = { threadId: string, editing: string, setEditing: React.Dispatch<React.SetStateAction<string>>, comment: string, setComment: React.Dispatch<React.SetStateAction<string>>, responseTo: string[], setResponseTo: React.Dispatch<React.SetStateAction<string[]>> }

const MakePost = ({ threadId, editing, setEditing, comment, setComment, responseTo, setResponseTo }: Types ) => {
  const dispatch = useDispatch()
  const user: LoggedUser = useSelector((state: RootState) => state.user)

  const handlePost = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    editing
      ? await postService.editPost(comment, responseTo, editing, user.id, user.token)
      : await postService.makePost(comment, responseTo, user.id, threadId, user.token)
    dispatch(initializeBoards())

    setComment('')
    setResponseTo([])
    setEditing('')
  }

  const cancelEditing = () => {
    setComment('')
    setResponseTo([])
    setEditing('')
  }

  if (user.privileges === 'guest') {
    return null
  }

  return (
    <div  style={styles.submit}>
      {editing
        ? <> 
            <h2 style={styles.subHeader}>
              <>Editing a Post </>
            </h2>
            <button style={styles.postButton} onClick={cancelEditing}>
              Cancel
            </button>
          </>
        : <h2 style={{ margin: '0px' }}>Make a new Post</h2>}
      <form onSubmit={handlePost}>
        {responseTo.length !== 0 && <>Replying to: {responseTo.join(', ')} <br /></>}
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
