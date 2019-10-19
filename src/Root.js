import React from 'react';
import { Provider } from 'react-redux';
// import reduxPromise from 'redux-promise';  will use our custom middleware instead
// import async from 'middlewares/async';  will keep our custome one here for reference
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import stateValidator from 'middlewares/stateValidator';
import reducers from 'reducers';

const Root = ({ children, initialState = {} }) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // do we need initial state?
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(reduxThunk, stateValidator))
    // composeEnhancers(applyMiddleware(async, stateValidator))
  );
  return <Provider store={store}>{children}</Provider>;
};

export default Root;
