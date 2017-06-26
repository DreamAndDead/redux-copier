import React from 'react'
import getFooter from './Footer'
import getAddTodo from '../containers/AddTodo'
import getTodoList from '../containers/TodoList'

export default function getApp(key) {
  const AddTodo = getAddTodo(key)
  const TodoList = getTodoList(key)
  const Footer = getFooter(key)

  const App = () => (
    <div>
      <AddTodo />
      <TodoList />
      <Footer />
    </div>
  )

  return App
}
