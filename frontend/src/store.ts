import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import boardReducer from './reducers/boardReducer'

const store = createStore(boardReducer, applyMiddleware(thunk))

export type AppDispatch = typeof store.dispatch

export default store