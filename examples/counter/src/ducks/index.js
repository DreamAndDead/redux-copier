export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const increase = () => ({ type: 'INCREMENT' })
const decrease = () => ({ type: 'DECREMENT' })

export { increase, decrease }

