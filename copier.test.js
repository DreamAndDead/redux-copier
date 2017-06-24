import { copifyReducer, copifyActionCreator } from './copier'

const simpleActionCreator = payload => ({
    type: 'simple',
    payload
});

test('an pure action creator', () => {
    const simpleAction = simpleActionCreator('pure');
    expect(simpleAction.payload).toBe('pure');
});

const firstActionCreator = copifyActionCreator(simpleActionCreator);
const secondActionCreator = copifyActionCreator(simpleActionCreator);
const first = firstActionCreator('first');
const second = secondActionCreator('second');

test('check key from copified action creator', () => {
    expect(first.meta.key).toBeDefined();
    expect(second.meta.key).toBeDefined();
});

test('actions owns different keys', () => {
    expect(first.meta.key).not.toBe(second.meta.key);
});


const simpleReducer = (action, state) => ({
    ...state,
    payload: action.payload
});

test('reducer works right', () => {
    const newState = simpleReducer( simpleActionCreator('pure'), {} );
    expect(newState).toEqual({ payload: 'pure' });
});

const copifiedReducer = copifyReducer(simpleReducer);

test('specific action modifies specific data', () => {
    const action = {
        meta: {
            key: 'onlyinside'
        },
        type: 'simple',
        payload: 'pure'
    };
    const newState = copifiedReducer(action, {});

    expect(newState.onlyinside).toBe('pure');
})

