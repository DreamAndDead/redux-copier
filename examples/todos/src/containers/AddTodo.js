import React from 'react'
import { connect } from 'react-redux'
import { copifyReducer, copifyActions } from 'redux-copier'
import todoReducer, * as todoActions from '../ducks/todos'

export default function getAddTodo(key) {
  const actions = copifyActions(todoActions, key)
  const addTodo = actions.actionCreators.addTodo

  let AddTodo = ({ dispatch }) => {
    let input

    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}>
          <input ref={node => {
            input = node
          }} />
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    )
  }

  return connect()(AddTodo)
}

export const reducer = copifyReducer(todoReducer)
