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

type Type = React.Dispatch<React.SetStateAction<string[]>>

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
      <MakePost threadId={thread.id} responseTo={responseTo} />
    </div>
  )
}

const Post = ({ post, responseTo, setResponseTo }: { post: PostType, responseTo: string[], setResponseTo: Type }) => {
  const dispatch = useDispatch()
  const user: LoggedUser = useSelector((state: RootState) => state.user)

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
      {post.responseTo} <br />
      {post.content} <br />
      {post.repliesTo}
      <button onClick={addToReplies}>
        reply
      </button>
      {user.id === post.user && 
        <button onClick={handlePostDeletion}>
          delete
        </button>}
    </div>
  )
}

export default Posts
