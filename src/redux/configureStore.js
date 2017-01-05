import {createStore, bindActionCreators} from 'redux';
import * as searchResults from './modules/searchResults';
import 'whatwg-fetch';

/*
* This method uses fetch to fetch something from a single API
* I'll probably need this in the future to build up on it

const apiMiddleware = (store) => (next) => (action) => {
  if (!action.meta || action.meta.type !== 'api') {
    return next(action);
  }

  const {url} = action.meta;
  const fetchOptions = Object.assign({}, action.meta);

  fetch(url, fetchOptions)
    .then(resp => resp.json())
    .then(json => {
       if (typeof action.meta.onSuccess === 'function') {
        action.meta.onSuccess(json);
      }
      return json; // For the next promise in the chain
    })
    .then(json => {
      let newAction = Object.assign({}, action, {payload: json});
      delete newAction.meta;
      store.dispatch(newAction);
    });
};*/

// configure our store (not combining reducers because we only have one atm)
export const configureStore = () => {
  const store = createStore(searchResults.reducer);

  const actions = {
    searchResults: bindActionCreators(searchResults.actions, store.dispatch)
  };

  return {store, actions};
};

export default configureStore;
