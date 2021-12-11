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

  const { boardName, threadName } = useParams()
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
      {thread.description && <p style={styles.board}>{thread.description}</p>}
      {thread.posts.map(post =>
        <Post 
          key={post.id} 
          post={post} 
          responseTo={responseTo}
          setResponseTo={setResponseTo} />
      )}
      <MakePost threadId={thread.id} responseTo={responseTo} setResponseTo={setResponseTo} />
    </div>
  )
}

const Post = ({ post, responseTo, setResponseTo }: { post: PostType, responseTo: string[], setResponseTo: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const dispatch = useDispatch()
  const user: LoggedUser = useSelector((state: RootState) => state.user)
  const users = useSelector((state: RootState) => state.users)

  const handlePostDeletion = () => {
    postService.deletePost(post.id, user.id, user.token)
    dispatch(initializeBoards())
    setResponseTo([])
  }

  const addToReplies = () => {
    const updatedResponseTo = responseTo.some(res => res === post.id)
      ? responseTo.filter(res => res !== post.id)
      : responseTo.concat(post.id)
    setResponseTo(updatedResponseTo)
  }

  return (
    <div style={styles.board}>
      <div style={styles.secondaryText}>{post.responseTo.join(', ')}</div>
      <strong>{users.find(user => user.id === post.user)?.username}</strong> <br />
      {post.content} <br />
      <button style={styles.postButton} onClick={addToReplies}>
        reply
      </button>
      {user.id === post.user && 
        <button style={styles.postButton} onClick={handlePostDeletion}>
          delete
        </button>}
        {post.repliesTo.length > 0 && <span style={styles.secondaryText}>replies: {post.repliesTo.join(', ')} <br /></span>}
    </div>
  )
}

export default Posts
