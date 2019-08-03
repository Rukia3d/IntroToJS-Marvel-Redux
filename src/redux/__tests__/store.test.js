import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { searchWordEntered, startSearch, addCharacter, removeCharacter } from '../actions';

import captain from '../../data/captain.json'
const nextTick = () => new Promise(r => process.nextTick(r));

function makeStore(initialState){
  return createStore(reducers, initialState, applyMiddleware(thunkMiddleware));
}

test('returns correct initial state', () => {
  const store = makeStore();
  const state = store.getState();
  expect(state).toEqual({query:"", loading:false, results:[], team:[]});
});

test('search word entered', () => {
  const store = makeStore();
  store.dispatch(searchWordEntered("Captain"));
  expect(store.getState()).toMatchObject({query: "Captain"});
});

test('search started', async () => {
  window.fetch = jest.fn();
  window.fetch.mockReturnValueOnce(
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(captain)
    })
  );

  const store = makeStore({query:"Captain"});
  store.dispatch(startSearch());
  expect(store.getState()).toMatchObject({query:"Captain", loading: true});

  await nextTick();

  expect(window.fetch).toBeCalledTimes(1);
  expect(store.getState()).toMatchObject({loading: false, results: captain.data.results});
});

test('add character to team', () => {
  const store = makeStore({query: "Captain", loading:false, results: captain.data.results, team:[]});
  store.dispatch(addCharacter(captain.data.results[0].id));
  expect(store.getState()).toMatchObject({team:[captain.data.results[0]]});
});

test('remove character from team', () =>{
  const store = makeStore({query: "Captain", loading:false, results: [], team: captain.data.results});
  store.dispatch(removeCharacter(captain.data.results[0].id));
  const updated = captain.data.results.slice(1,100);
  expect(store.getState()).toMatchObject({team:updated});
});
