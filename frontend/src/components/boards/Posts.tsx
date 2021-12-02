import React from 'react'
import { useParams } from 'react-router'
import boards from '../../mockdata/boards'
import { PostType } from '../../types'
import styles from '../../styles'

const Posts = () => {
  const { boardName, threadName } = useParams()
  const thread = boards.
    find(board => board.name === boardName)?.threads.
    find(thread => thread.name === threadName)

  if (!thread) {
    return null
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