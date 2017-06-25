import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/Counter'
import reducer, * as actionCreators from './ducks'

import { copifyReducer, copifyActions } from './copier'

let copifiedReducer = copifyReducer(reducer);

const store = createStore(
  copifiedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

let { actionCreators: firstActionCreators, selector: firstSelector} = copifyActions(actionCreators);
let { actionCreators: secondActionCreators, selector: secondSelector} = copifyActions(actionCreators);

const render = () => ReactDOM.render(
  <div>
    <Counter
      value={firstSelector(store.getState())}
      onIncrement={() => store.dispatch( firstActionCreators.increase() )}
      onDecrement={() => store.dispatch( firstActionCreators.decrease() )}
    />
    <Counter
      value={secondSelector(store.getState())}
      onIncrement={() => store.dispatch( secondActionCreators.increase() )}
      onDecrement={() => store.dispatch( secondActionCreators.decrease() )}
    />
  </div>
  ,
  document.getElementById('root')
)

render()
store.subscribe(render)
