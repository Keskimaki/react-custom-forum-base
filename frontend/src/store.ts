import { createStore } from 'redux'
import boardReducer from './reducers/boardReducer'

const store = createStore(boardReducer)

export default store