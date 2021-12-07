import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { PostType } from '../../../types'
import styles from '../../../styles'
import { BoardType, LoggedUser } from '../../../types'
import { RootState } from '../../../store'
import MakePost from './MakePost'
import postService from '../../../services/posts'

type Type = React.Dispatch<React.SetStateAction<string[]>>

const Posts = () => {
  const [responseTo, setResponseTo] = useState<string[]>([])

  const { boardName, threadName } = useParams()
  const boards: BoardType[] = useSelector((state: RootState) => state.boards)
  const thread = boards.
    find(board => board.url === boardName)?.threads.
    find(thread => thread.name === threadName)

  if (!thread) {
    return <p>{threadName}</p>
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
  const user: LoggedUser = useSelector((state: RootState) => state.user)
  const handlePostDeletion = () => {
    postService.deletePost(post.id, user.id, user.token)
    window.location.reload() //Don't leave this here permamently
  }
  const addToReplies = () => {
    const updatedResponseTo = responseTo.some(res => res === post.id)
      ? responseTo.filter(res => res !== post.id)
      : responseTo.concat(post.id)
    setResponseTo(updatedResponseTo)
  }

  return (
    <div style={styles.board} onClick={addToReplies}>
      {post.responseTo} <br />
      {post.content} <br />
      {post.repliesTo}
      {user.id === post.user && 
        <button onClick={handlePostDeletion}>
          delete
        </button>}
    </div>
  )
}

export default Posts
