import React from "react";
import { Provider } from "react-redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { RootReducer } from "./reducers/root_reducer";
import { OwnAction } from "./reducers/actions";
import { RootReducerState } from "./reducers/root_reducer";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import Layout from "./presentational/layout";

// const store = createStore(
//   RootReducer,
//   applyMiddleware(thunk as ThunkMiddleware<RootReducerState, OwnAction>)
// );
const store = createStore(
  RootReducer,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<RootReducerState, OwnAction>)
  )
);

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
