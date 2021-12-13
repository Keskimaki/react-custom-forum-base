import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { BoardType } from '../../../types'
import { RootState } from '../../../store'
import MakePost from './MakePost'

import Post from './Post'

const Posts = () => {
  const [responseTo, setResponseTo] = useState<string[]>([])
  const [comment, setComment] = useState('')
  const [editing, setEditing] = useState('')

  const { boardName, threadName } = useParams()
  //const users = useSelector((state: RootState) => state.users)
  const boards: BoardType[] = useSelector((state: RootState) => state.boards)
  //Thread names with question marks don't work atm
  const thread = boards.
    find(board => board.url === boardName)?.threads.
    find(thread => thread.name === threadName)

  if (!thread) return <div>hei</div>//null

  return (
    <div>
      <h1>{thread.name}</h1>
      {/*thread.description && 
        <div style={styles.board}>
          <strong>{users.find(user => user.id === thread.user)?.username}</strong> <br />
          {thread.description}
        </div>*/}
      {thread.posts.map(post =>
        <Post 
          key={post.id} 
          post={post}
          editing={editing}
          setEditing={setEditing}
          setComment={setComment}
          responseTo={responseTo}
          setResponseTo={setResponseTo} />
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

export default Posts
