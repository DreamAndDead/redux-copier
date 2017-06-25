import { copifyReducer, copifyActions } from './copier'

// test actions
const simpleActionCreator = payload => ({
  type: 'simple',
  payload
});

test('an pure action creator', () => {
  const simpleAction = simpleActionCreator('pure');
  expect(simpleAction.payload).toBe('pure');
});


const actions = copifyActions({ simple: simpleActionCreator }, 'uniqueKey')

test('new action creators produce action with uniqueKey', () => {
  const simpleAction = actions.actionCreators.simple('pure');
  expect(simpleAction.key).toBe('uniqueKey');
})

test('selector select the data we want', () => {
  const state = {
    'uniqueKey': 'pure'
  }
  const selectedData = actions.selector(state);
  expect(selectedData).toBe('pure');
})


// test reducer
const simpleReducer = (state, action) => ({
  ...state,
  payload: action.payload
});

test('reducer works right', () => {
  const newState = simpleReducer( {}, simpleActionCreator('pure') );
  expect(newState).toEqual({ payload: 'pure' });
});

const copifiedReducer = copifyReducer(simpleReducer);

test('specific action modifies specific data', () => {
  const action = {
    key: 'onlyinside',
    type: 'simple',
    payload: 'pure'
  };
  const newState = copifiedReducer({}, action);

  expect(newState).toEqual({
    onlyinside: {
      payload: 'pure'
    }
  });
})


// test actions work with reducer
const anotherActions = copifyActions({ simple: simpleActionCreator })
const anotherReducer = copifyReducer(simpleReducer);

test('anonymous copified actions work with copified reducer', () => {
  const action = anotherActions.actionCreators.simple('another');
  const newState = anotherReducer({}, action);

  expect(anotherActions.selector(newState)).toEqual({
    payload: 'another'
  });
})
