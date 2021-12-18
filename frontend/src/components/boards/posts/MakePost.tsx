import React  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import postService from '../../../services/posts'
import { LoggedUser } from '../../../types'
import styles from '../../../styles'
import { initializeBoards } from '../../../reducers/boardReducer'
import { initializePosts } from '../../../reducers/postReducer'

type Types = { threadId: string, editing: string, setEditing: React.Dispatch<React.SetStateAction<string>>, imageUrl: string, setImageUrl: React.Dispatch<React.SetStateAction<string>>,  comment: string, setComment: React.Dispatch<React.SetStateAction<string>>, responseTo: string[], setResponseTo: React.Dispatch<React.SetStateAction<string[]>> }

const MakePost = ({ threadId, editing, setEditing, imageUrl, setImageUrl, comment, setComment, responseTo, setResponseTo }: Types ) => {
  const dispatch = useDispatch()
  const user: LoggedUser = useSelector((state: RootState) => state.user)

  const handlePost = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    editing
      ? await postService.editPost(imageUrl, comment, responseTo, editing, user.id, user.token)
      : await postService.makePost(imageUrl, comment, user.id, threadId, user.token, responseTo)

    setTimeout(() => dispatch(initializeBoards()), 500)
    dispatch(initializePosts())

    setComment('')
    setResponseTo([])
    setEditing('')
  }

  const cancelEditing = () => {
    setComment('')
    setResponseTo([])
    setEditing('')
  }

  if (user.privileges === 'guest') return null

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
        : <h2 style={styles.subHeader}>Make a new Post</h2>}
      <form onSubmit={handlePost}>
        {responseTo.length !== 0 && <>Replying to: {responseTo.join(', ')} <br /></>}
        <input
          placeholder='image url'
          onChange={({ target }) => setImageUrl(target.value) } />
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
