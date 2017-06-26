import { connect } from 'react-redux'
import { copifyReducer, copifyActions } from '../copier'
import todoReducer, * as todoActions from '../ducks/todos'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

export default function getTodoList(key) {
  const actions = copifyActions(todoActions, key)
  const selector = actions.selector
  const toggleTodo = actions.actionCreators.toggleTodo

  const mapStateToProps = (state) => ({
    todos: getVisibleTodos(selector(state.todos), selector(state.visibility))
  })

  const mapDispatchToProps = {
    onTodoClick: toggleTodo
  }

  return {
    component: connect(mapStateToProps, mapDispatchToProps)(TodoList),
    selector
  }
}

export const reducer = copifyReducer(todoReducer)
