import React from 'react'
import { useSelector } from 'react-redux'
import { PostType, UserType, BoardType } from '../../types'
import styles from '../../styles'
import { RootState } from '../../store'

const LatestPosts = () => {
  const users = useSelector((state: RootState) => state.users)
  const boards = useSelector((state: RootState) => state.boards)
  const posts = useSelector((state: RootState) => state.posts)
  
  const latestPosts = posts.slice(posts.length - 5)

  return (
    <div style={styles.infoBarItem}>
      <h3 style={styles.subHeader}>Latest posts:</h3>
      {latestPosts.slice().reverse().map(post => 
        <Post 
          key={post.id}
          post={post}
          boards={boards}
          users={users} />)}
    </div>
  )
}

const Post = ({ post, boards, users }: { post: PostType, boards: BoardType[], users: UserType[] }) => {
  const username = users.find(user => user.id === post.user)?.username
  return (
    <div>
      <strong>{username ? username : <>deleted</>}</strong>
      : {post.content.substring(0, 140)}{post.content.length > 140 && <>...</>}
      <> in {boards.map(board => board.threads).flat().find(thread => thread.id === post.thread)?.name} </>
      {new Date(post.date).toLocaleString('ger', { day: 'numeric', month: 'numeric', year: '2-digit', hour: 'numeric', minute:'numeric' })}.
    </div>
  )
}

export default LatestPosts