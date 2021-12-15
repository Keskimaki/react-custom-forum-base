import React from 'react'
import { useSelector } from 'react-redux'
import { PostExpanded, UserType } from '../../types'
import styles from '../../styles'
import { RootState } from '../../store'

const LatestPosts = () => {
  const users = useSelector((state: RootState) => state.users)
  const posts = useSelector((state: RootState) => state.posts)
  
  const latestPosts = posts.slice(posts.length - 5)

  return (
    <div style={styles.infoBarItem}>
      <h3 style={styles.subHeader}>Latest posts:</h3>
      {latestPosts.slice().reverse().map(post => 
        <Post 
          key={post.id}
          post={post}
          users={users} />)}
    </div>
  )
}

const Post = ({ post, users }: { post: PostExpanded, users: UserType[] }) => {
  const username = users.find(user => user.id === post.user)?.username
  return (
    <div>
      <strong>{username ? username : <>deleted</>}</strong>
      : {post.content.substring(0, 140)}{post.content.length > 140 && <>...</>}
      <> in {post.thread.name} </>
      {new Date(post.date).toLocaleString('ger', { day: 'numeric', month: 'numeric', year: '2-digit', hour: 'numeric', minute:'numeric' })}.
    </div>
  )
}

export default LatestPosts