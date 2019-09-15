import React from 'react';
import { Provider } from 'react-redux';
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
    composeEnhancers(applyMiddleware(stateValidator))
  );
  return <Provider store={store}>{children}</Provider>;
};

export default Root;
