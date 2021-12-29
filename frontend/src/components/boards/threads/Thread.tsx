import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThreadType } from '../../../types'
import styles from '../../../styles'
import { UserType, PostType, ThreadStatus } from '../../../types'
import { RootState } from '../../../store'


const Thread = ({ thread }: { thread: ThreadType }) => {
  const { boardName } = useParams()
  const users = useSelector((state: RootState) => state.users)
  const username = users.find(user => user.id === thread.user)?.username
  
  let lastPoster: UserType | undefined
  let lastPost: PostType | undefined
  if (thread.posts.length > 0) {
    lastPoster = users.find(user => user.id === thread.posts[thread.posts.length - 1].user)
    lastPost  = thread.posts[thread.posts.length - 1]
  }

  return (
    <Link to={`/boards/${boardName}/${thread.name}`} style={styles.link}>
      <div style={styles.board}>
        {lastPoster && lastPost &&
          <LatestPost
            status={thread.status}
            lastPoster={lastPoster}
            lastPost={lastPost} />}
        <strong>{thread.name}</strong> <br />
        created by {username ? username : <>deleted</>} <br />
        posts: {thread.posts.length}
      </div>
    </Link>
  )
}

const LatestPost = ({ status, lastPoster, lastPost }: { status: ThreadStatus, lastPoster: UserType, lastPost: PostType }) => {
  if (status !== 'open') {
    return (
      <div style={styles.threadInfo}>
        <p>closed</p>
      </div>
    )
  }
  
  return (
    <div style={styles.threadInfo}>
      {lastPost.content.length > 15
        ? <>{lastPost.content.substring(0, 15)}...</>
        : lastPost.content}
      <br />
      at {new Date(lastPost.date)
        .toLocaleString('ger', { day: 'numeric', month: 'numeric', year: '2-digit', hour: 'numeric', minute:'numeric', second:'numeric' })}
      <br />
      by {lastPoster.username}
    </div>
  )
}

export default Thread
