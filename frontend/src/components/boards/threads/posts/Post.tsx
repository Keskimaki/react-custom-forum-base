import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostType } from '../../../../types'
import CSS from 'csstype'
import styles from '../../../../styles'
import { LoggedUser } from '../../../../types'
import { RootState } from '../../../../store'
import postService from '../../../../services/posts'
import userService from '../../../../services/users'
import { initializeBoards } from '../../../../reducers/boardReducer'
import { initializeUsers } from '../../../../reducers/userReducer'
import { initializePosts } from '../../../../reducers/postReducer'
import picture from '../../../../assets/default.png'
import env from '../../../../.env'

type Types = { post: PostType, editing: string, setEditing: React.Dispatch<React.SetStateAction<string>>, setComment: React.Dispatch<React.SetStateAction<string>>, responseTo: string[], setResponseTo: React.Dispatch<React.SetStateAction<string[]>>, setMouseover: React.Dispatch<React.SetStateAction<string[]>> }

const Post = ({ post, editing, setEditing, setComment, responseTo, setResponseTo, setMouseover }: Types) => {
  const dispatch = useDispatch()
  //Forces fetching the picture after each reload instead of using cache
  const [time, setTime] = useState('')
  //Set focus on image to make it full size
  const [focus, setFocus] = useState(false)

  const loginData: LoggedUser = useSelector((state: RootState) => state.user)
  const users = useSelector((state: RootState) => state.users)
  const user = users.find(user => user.username === loginData.username)

  const handlePostEditing = () => {
    setTime(String(new Date().getTime()))
    setComment(post.content)
    setResponseTo(post.responseTo)
    setEditing(post.id)
  }

  const handlePostDeletion = () => {
    if (!window.confirm('Delete post?')) return
    postService.deletePost(post.id, loginData.id, loginData.token)
    dispatch(initializeBoards())
    dispatch(initializePosts())
    setResponseTo([])
  }

  const handleUserFollowing = async (followId: string) => {
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
    await userService.editUser({ following }, loginData.id, loginData.token)
    dispatch(initializeUsers())
  }

  const addToReplies = () => {
    const updatedResponseTo = responseTo.some(res => res === post.id)
      ? responseTo.filter(res => res !== post.id)
      : responseTo.concat(post.id)
    setResponseTo(updatedResponseTo)
  }

  if (editing === post.id) return null

  let username: string | undefined
  let image: boolean | undefined
  const poster = users.find(user => user.id === post.user)
  poster ? { username, image } = poster : username = undefined
  
  const imageStyle: CSS.Properties = focus ? styles.postImageLarge : styles.postImageSmall

  return (
    <div style={styles.board}>
      <div style={{ display: 'flex'}}>
        <Link to={username ? `/${username}` : ''}>
          <img 
            src={image ? `${env.AWS_PROFILE_BASEURL}/${username}.png?${time}` : picture}
            style={styles.profilePictureSmall} />
        </Link>
        <div style={{ marginTop: 'auto', padding: '10px' }}>
          {post.responseTo.map(response => 
            <span style ={styles.secondaryText} key={response} onMouseEnter={(event) => setMouseover([response, `${event.clientX} ${event.clientY}`])} onMouseLeave={() => setMouseover(['', ''])}>
              <>{response} </>
            </span>)}
          {post.responseTo.length > 0 && <br />}
          <strong>{username ? username : <>deleted</>} </strong>
          <span style={styles.secondaryText}>{new Date(post.date).toLocaleString('ger', { day: 'numeric', month: 'numeric', year: '2-digit', hour: 'numeric', minute:'numeric', second:'numeric' })}</span>
          <br />
          {post.content}
          {post.image &&
            <>
              <br />
              <img 
                src={`${env.AWS_IMAGE_BASEURL}/${post.id}.png?${time}`}
                onClick={() => setFocus(!focus)}
                style={imageStyle} />
            </>}
        </div>
      </div>
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
        {post.repliesTo.length > 0 &&
          <span style ={styles.secondaryText}>
            <>replies: </> 
            {post.repliesTo.map(reply => 
              <span key={reply} onMouseEnter={(event) => setMouseover([reply, `${event.clientX} ${event.clientY}`])} onMouseLeave={() => setMouseover(['', ''])}>
                <>{reply} </>
              </span>)}
            </span>}
    </div>
  )
}

export default Post