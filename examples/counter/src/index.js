import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/Counter'
import reducer, * as actionCreators from './ducks'

import { copifyReducer, copifyActions } from '../../../copier'

let copifiedReducer = copifyReducer(reducer);
let { actionCreators: firstActionCreators, selector: firstSelector} = copifyActions(actionCreators);

const store = createStore(copifiedReducer);
const render = () => ReactDOM.render(
  <Counter
    value={firstSelector(store.getState())}
    onIncrement={() => store.dispatch( firstActionCreators.increase() )}
    onDecrement={() => store.dispatch( firstActionCreators.decrease() )}
  />,
  document.getElementById('root')
)

render()
store.subscribe(render)
