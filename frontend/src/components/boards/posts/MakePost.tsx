import React, { useState }  from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import postService from '../../../services/posts'
import { LoggedUser } from '../../../types'
import styles from '../../../styles'


const MakePost = ({ threadId, responseTo }: { threadId: string, responseTo: string[]}) => {
  const [comment, setComment] = useState('')
  const user: LoggedUser = useSelector((state: RootState) => state.user)

  const handlePost = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const post = postService.makePost(comment, responseTo, user.id, threadId, user.token)
    window.location.reload() //don't leave this here longterm
    console.log(post)
  }

  return (
    <div>
      <form onSubmit={handlePost}>
        Replying to: {responseTo.join(', ')}
        <br />
        <textarea
        required
        style={styles.textArea}
        placeholder="Comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)} />
        <br />
        <button style={styles.postButton} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default MakePost
