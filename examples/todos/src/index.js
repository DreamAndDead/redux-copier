import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import { reducer as todoReducer } from './containers/AddTodo'
import { reducer as visReducer } from './containers/FilterLink'
import getApp from './components/App'

const reducer = combineReducers({
  todos: todoReducer,
  visibility: visReducer
})
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = getApp().component
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
