import React, { useState }  from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import boardService from '../../../services/boards'
import { LoggedUser } from '../../../types'


const MakePost = ({ thread }: { thread: string}) => {
  const [comment, setComment] = useState('')
  const user: LoggedUser = useSelector((state: RootState) => state.user)

  const handlePost = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const post = boardService.makePost(comment, user.id, thread)
    console.log(post)
  }

  return (
    <div>
      <form onSubmit={handlePost}>
        <input 
        required
        placeholder="Comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default MakePost
