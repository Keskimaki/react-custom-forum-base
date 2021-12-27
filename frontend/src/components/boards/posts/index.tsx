import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import CSS from 'csstype'
import { BoardType, PostType } from '../../../types'
import { RootState } from '../../../store'
import MakePost from './MakePost'
import NotFound from '../../NotFound'
import styles from '../../../styles'
import Post from './Post'

const Posts = () => {
  const [responseTo, setResponseTo] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState('')
  const [comment, setComment] = useState('')
  const [editing, setEditing] = useState('')
  const [mouseover, setMouseover] = useState(['', ''])
  const [page, setPage] = useState(0)
  const { boardName, threadName } = useParams()
  const boards: BoardType[] = useSelector((state: RootState) => state.boards)
  const thread = boards.
    find(board => board.url === boardName)?.threads.
    find(thread => thread.name.replace('?', '') === threadName)

  if (!thread) return <NotFound />
  if (page === -1) setPage(Math.ceil(thread.posts.length / 10) - 1)
  
  const mouseoverPost =  thread.posts.find(post => post.id === mouseover[0])

  return (
    <div>
      <PageButtons 
        page={page}
        setPage={setPage}
        posts={thread.posts.length} />
      <h1 style={styles.largeHeader}><>{thread.name} </></h1>
      {mouseoverPost && <Mouseover post={mouseoverPost} position={mouseover[1].split(' ')} />}
      {thread.posts.slice(10 * page, 10 + 10 * page).map(post =>
        <Post 
          key={post.id} 
          post={post}
          editing={editing}
          setEditing={setEditing}
          setComment={setComment}
          responseTo={responseTo}
          setResponseTo={setResponseTo}
          setMouseover={setMouseover} />
      )}
      <PageButtons 
        page={page}
        setPage={setPage}
        posts={thread.posts.length} />
      <MakePost 
        threadId={thread.id}
        editing={editing}
        setEditing={setEditing}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        comment={comment}
        setComment={setComment}
        responseTo={responseTo}
        setResponseTo={setResponseTo}
        setPage={setPage} />
    </div>
  )
}

const PageButtons = ({ page, setPage, posts}: { page: number, setPage: React.Dispatch<React.SetStateAction<number>>, posts: number }) => {
  if (posts < 11) return null

  const { boardName } = useParams()
  const navigate = useNavigate()

  const changePage = (i: number) => {
    setPage(i)
    window.scrollTo(0, 0)
  }

  const buttons = []
  for (let i = 0; i < Math.ceil(posts / 10); i++) {
    buttons.push(
      <button key={i} onClick={() => changePage(i)} style={page === i ? styles.postButtonFocus : styles.postButton}>
        {i + 1}
      </button>)
  }

  return (
    <div style={styles.board}>
      {buttons}
      {page != Math.ceil(posts / 10) - 1 &&
        <button onClick={() => changePage(page + 1)} style={styles.postButton}>
          next
        </button>}
      <button onClick={() => navigate(`/boards/${boardName}`)} style={styles.postButton}>
        close
      </button>
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
