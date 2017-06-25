import { mapValues, cloneDeep } from 'lodash'

function generateKey() {
  return Date.now().toString();
}
function copifyActions(actionCreators, customKey) {
  let key = generateKey();
  if (customKey)
    key = customKey;

  function copifyActionCreator(actionCreator) {
    return (...args) => ({
      ...actionCreator(...args),
      key: key,
    })
  }

  return {
    actionCreators: mapValues(actionCreators, copifyActionCreator),
    selector: state => state[key],
  }
}

const DEFAULT_STATE_STORE_KEY = '@@DEFAULT_STATE'
/*
 * separate different state scope using action's key
 */
function copifyReducer(reducer) {
  return (state, action) => {
    // every action has a specific key
    const { key } = action
    // MAYBE it's redux INIT action when in combineReducers, state is undefined
    // and reducer(state, action) will generate defaultState
    if (key == undefined) {
      /*
       * everytime when combineReducer is called, we receive a INIT action
       * we need the next line, or state will change to shape like
       * {
       *   DEFAULT_STATE_STORE_KEY: {
       *     DEFAULT_STATE_STORE_KEY: {
       *       DEFAULT_STATE_STORE_KEY: {
       *         ...state
       *     }
       *    }
       *   }
       */
      if ( !(DEFAULT_STATE_STORE_KEY in (state || {}/* INIT action, state is undefined */)) ) {
        return { [DEFAULT_STATE_STORE_KEY]: reducer(state, action) }
      }
      return state
    }

    // when encount a key doesn't exist, init scope state for it
    if ( !(key in state) ) {
      state = {
        ...state,
        [key]: cloneDeep( state[DEFAULT_STATE_STORE_KEY] )
      }
    }
    return {
      ...state,
      [key]: reducer(state[key], action)
    }
  }
}

export { copifyActions, copifyReducer }
