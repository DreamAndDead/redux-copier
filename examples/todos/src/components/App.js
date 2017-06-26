import React from 'react'
import getFooter from './Footer'
import getAddTodo from '../containers/AddTodo'
import getTodoList from '../containers/TodoList'

export default function getApp(key) {
  const AddTodo = getAddTodo().component
  const TodoList = getTodoList().component
  const Footer = getFooter().component

  const App = () => (
    <div>
      <AddTodo />
      <TodoList />
      <Footer />
    </div>
  )

  return {
    component: App
  }
}
