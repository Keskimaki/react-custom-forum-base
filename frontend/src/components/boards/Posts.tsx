import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { PostType } from '../../types'
import styles from '../../styles'
import { BoardType } from '../../types'
import { RootState } from '../../store'

const Posts = () => {
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
      {thread.posts.map(post =>
        <Post key={post.id} post={post} />
      )}
    </div>
  )
}

const Post = ({ post }: { post: PostType }) => {
  return (
    <div style={styles.board}>
      {post.responseTo} <br/>
      {post.content} <br/>
      {post.repliesTo}
    </div>
  )
}

export default Posts