import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { PostType } from '../../../types'
import styles from '../../../styles'
import { BoardType, LoggedUser } from '../../../types'
import { RootState } from '../../../store'
import MakePost from './MakePost'
import postService from '../../../services/posts'
import { initializeBoards } from '../../../reducers/boardReducer'

const Posts = () => {
  const [responseTo, setResponseTo] = useState<string[]>([])
  const [comment, setComment] = useState('')
  const [editing, setEditing] = useState('')

  const { boardName, threadName } = useParams()
  const users = useSelector((state: RootState) => state.users)
  const boards: BoardType[] = useSelector((state: RootState) => state.boards)
  const thread = boards.
    find(board => board.url === boardName)?.threads.
    find(thread => thread.name === threadName)
  if (!thread) {
    return null
  }

  return (
    <div>
      <h1>{thread.name}</h1>
      {thread.description && 
        <div style={styles.board}>
          <strong>{users.find(user => user.id === thread.user)?.username}</strong> <br />
          {thread.description}
        </div>}
      {thread.posts.map(post =>
        <Post 
          key={post.id} 
          post={post}
          editing={editing}
          setEditing={setEditing}
          setComment={setComment}
          responseTo={responseTo}
          setResponseTo={setResponseTo} />
      )}
      <MakePost 
        threadId={thread.id}
        editing={editing}
        setEditing={setEditing}
        comment={comment}
        setComment={setComment}
        responseTo={responseTo}
        setResponseTo={setResponseTo} />
    </div>
  )
}

type Types = { post: PostType, editing: string, setEditing: React.Dispatch<React.SetStateAction<string>>, setComment: React.Dispatch<React.SetStateAction<string>>, responseTo: string[], setResponseTo: React.Dispatch<React.SetStateAction<string[]>> }

const Post = ({ post, editing, setEditing, setComment, responseTo, setResponseTo }: Types) => {
  const dispatch = useDispatch()
  const loginData: LoggedUser = useSelector((state: RootState) => state.user)
  const users = useSelector((state: RootState) => state.users)
  //const user = users.find(user => user.username === loginData.username)

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

  const handleUserFollowing = () => {
    return null
  }

  const addToReplies = () => {
    const updatedResponseTo = responseTo.some(res => res === post.id)
      ? responseTo.filter(res => res !== post.id)
      : responseTo.concat(post.id)
    setResponseTo(updatedResponseTo)
  }

  if (editing === post.id) {
    return null
  }

  return (
    <div style={styles.board}>
      <div style={styles.secondaryText}>{post.responseTo.join(', ')}</div>
      <strong>{users.find(user => user.id === post.user)?.username}</strong> <br />
      {post.content} <br />
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
        : <> 
            <button style={styles.postButton} onClick={handleUserFollowing}>
              follow user
            </button>
          </>}
        {post.repliesTo.length > 0 && <span style={styles.secondaryText}>replies: {post.repliesTo.join(', ')} <br /></span>}
    </div>
  )
}

export default Posts
