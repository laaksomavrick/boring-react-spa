import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import { applyMiddleware, compose, createStore, Store } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { ApplicationState, rootReducer } from "./store";

export default function configureStore(
  history: History,
  initialState: ApplicationState,
): Store<ApplicationState> {
  const store = createStore(
    rootReducer(history),
    initialState,
    compose(applyMiddleware(routerMiddleware(history), thunkMiddleware, createLogger())),
  );

  // Don't forget to run the root saga, and return the store object.
  return store;
}
