import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import postService from '../../../../services/posts'
import { LoggedUser } from '../../../../types'
import styles from '../../../../styles'
import { initializeBoards } from '../../../../reducers/boardReducer'
import { initializePosts } from '../../../../reducers/postReducer'
import { initializeUsers } from '../../../../reducers/userReducer'
import { setNotification } from '../../../../reducers/notificationReducer'

type Types = { threadId: string, editing: string, setEditing: React.Dispatch<React.SetStateAction<string>>, imageUrl: string, setImageUrl: React.Dispatch<React.SetStateAction<string>>,  comment: string, setComment: React.Dispatch<React.SetStateAction<string>>, responseTo: string[], setResponseTo: React.Dispatch<React.SetStateAction<string[]>>, setPage: React.Dispatch<React.SetStateAction<number>> }

const MakePost = ({ threadId, editing, setEditing, imageUrl, setImageUrl, comment, setComment, responseTo, setResponseTo, setPage }: Types ) => {
  const [canPost, setCanPost] = useState(true)
  const dispatch = useDispatch()

  const user: LoggedUser = useSelector((state: RootState) => state.user)
  if (user.privileges === 'guest') return null

  const handlePost = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (!canPost) {
      dispatch(setNotification('Wait 30 seconds before posting again', 'negative'))
      return
    }

    editing
      ? await postService.editPost(imageUrl, comment, responseTo, editing, user.id, user.token)
      : await postService.makePost(imageUrl, comment, user.id, threadId, user.token, responseTo)

    setTimeout(() => dispatch(initializeBoards()), 500)
    dispatch(initializePosts())
    dispatch(initializeUsers())

    if (!editing) {
      setCanPost(false)
      setTimeout(() => setCanPost(true), 5000)
    }

    setComment('')
    setResponseTo([])
    setEditing('')
    setImageUrl('')
    if (!editing) setPage(-1) //To last page of thread
  }

  const cancelEditing = () => {
    setComment('')
    setResponseTo([])
    setEditing('')
    setImageUrl('')
  }

  return (
    <div  style={styles.submit}>
      {editing
        ? <> 
            <h2 style={styles.subHeader}><>Editing a Post </></h2>
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
