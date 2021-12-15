import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import CSS from 'csstype'
import { BoardType, PostType } from '../../../types'
import { RootState } from '../../../store'
import MakePost from './MakePost'
import styles from '../../../styles'

import Post from './Post'

const Posts = () => {
  const [responseTo, setResponseTo] = useState<string[]>([])
  const [comment, setComment] = useState('')
  const [editing, setEditing] = useState('')
  const [mouseover, setMouseover] = useState(['', ''])

  const { boardName, threadName } = useParams()
  const boards: BoardType[] = useSelector((state: RootState) => state.boards)
  const thread = boards.
    find(board => board.url === boardName)?.threads.
    find(thread => thread.name.replace('?', '') === threadName)

  if (!thread) return null

  const mouseoverPost =  thread.posts.find(post => post.id === mouseover[0])

  return (
    <div>
      <h1>{thread.name}</h1>
      {mouseoverPost && <Mouseover post={mouseoverPost} position={mouseover[1].split(' ')} />}
      {thread.posts.map(post =>
        <Post 
          key={post.id} 
          post={post}
          editing={editing}
          setEditing={setEditing}
          setComment={setComment}
          responseTo={responseTo}
          setResponseTo={setResponseTo}
          setMouseover={setMouseover}/>
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

const Mouseover = ({ post, position }: { post: PostType, position: string[] }) => {
  const users = useSelector((state: RootState) => state.users)
  const username = users.find(user => user.id === post.user)?.username

  const style: CSS.Properties = {
    ...styles.mouseoverPost,
    left: `${Number(position[0]) + 10}px`,
    top: `${position[1]}px`
  }

  return (
    <div style={style}>
      <strong>{username ? username : <>deleted</>} </strong>
      <span style={styles.secondaryText}>{new Date(post.date).toLocaleString('ger', { day: 'numeric', month: 'numeric', year: '2-digit', hour: 'numeric', minute:'numeric', second:'numeric' })}</span>
      <br />
      {post.content}
    </div>
  )
}

export default Posts
