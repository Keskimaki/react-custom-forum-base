import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostType } from '../../../types'
import styles from '../../../styles'
import { LoggedUser } from '../../../types'
import { RootState } from '../../../store'
import postService from '../../../services/posts'
import userService from '../../../services/users'
import { initializeBoards } from '../../../reducers/boardReducer'

type Types = { post: PostType, editing: string, setEditing: React.Dispatch<React.SetStateAction<string>>, setComment: React.Dispatch<React.SetStateAction<string>>, responseTo: string[], setResponseTo: React.Dispatch<React.SetStateAction<string[]>> }

const Post = ({ post, editing, setEditing, setComment, responseTo, setResponseTo }: Types) => {
  const dispatch = useDispatch()
  const loginData: LoggedUser = useSelector((state: RootState) => state.user)
  const users = useSelector((state: RootState) => state.users)
  const user = users.find(user => user.username === loginData.username)

  const handlePostEditing = () => {
    setComment(post.content)
    setResponseTo(post.responseTo)
    setEditing(post.id)
  }

  const handlePostDeletion = () => {
    postService.deletePost(post.id, loginData.id, loginData.token)
    dispatch(initializeBoards())
    setResponseTo([])
  }

  const handleUserFollowing = (followId: string) => {
    let following: string[]
    if (!user) {
      following = [followId]
    } else {
      if (user.following.some(id => id === followId)) {
        following = user.following.filter(id => id !== followId)
      } else {
        following = user.following.concat(followId)
      }
    }
    userService.editUser(following, loginData.id, loginData.token)
    window.location.reload() //Fix later
    //dispatch(initializeUsers())
  }

  const addToReplies = () => {
    const updatedResponseTo = responseTo.some(res => res === post.id)
      ? responseTo.filter(res => res !== post.id)
      : responseTo.concat(post.id)
    setResponseTo(updatedResponseTo)
  }

  if (editing === post.id) return null

  const username = users.find(user => user.id === post.user)?.username

  return (
    <div style={styles.board}>
      <div style={styles.secondaryText}>{post.responseTo.join(', ')}</div>
      <strong>{username ? username : <>deleted</>}</strong>
      <br />
      {post.content}
      <br />
      {loginData.privileges !== 'guest' && 
        <button style={styles.postButton} onClick={addToReplies}>
          reply
        </button>}
      {loginData.id === post.user
        ? <>
            <button style={styles.postButton} onClick={handlePostEditing}>
              edit
            </button>
            <button style={styles.postButton} onClick={handlePostDeletion}>
              delete
            </button>
          </>
        : username
          ?
            <> 
              <button style={styles.postButton} onClick={() => handleUserFollowing(post.user)}>
                {user?.following.some(following => following === post.user) ? <>unfollow</> : <>follow user</>}
              </button>
            </>
          : null}
        {post.repliesTo.length > 0 && <span style={styles.secondaryText}>replies: {post.repliesTo.join(', ')} <br /></span>}
    </div>
  )
}

export default Post