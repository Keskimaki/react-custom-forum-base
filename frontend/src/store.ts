import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import boardReducer from './reducers/boardReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  boards: boardReducer,
  users: userReducer,
  user: loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store