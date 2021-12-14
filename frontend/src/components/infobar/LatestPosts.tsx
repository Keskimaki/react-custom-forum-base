import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { PostExpanded, UserType } from '../../types'
import postService from '../../services/posts'
import styles from '../../styles'
import { RootState } from '../../store'

const LatestPosts = () => {
  const users = useSelector((state: RootState) => state.users)
  const [posts, setPosts] = useState<PostExpanded[]>([])
  //Switch to using redux state if posts used anywhere else
  useEffect( () => {
    const getPosts = async () => {
      const posts = await postService.getAll()
      setPosts(posts)
    }
    getPosts()
  }, [])
  
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
      <strong>{username}</strong>:
      {post.content.substring(0, 140)}{post.content.length > 140 && <>...</>}
      <> in {post.thread.name}</> 
    </div>
  )
}

export default LatestPosts