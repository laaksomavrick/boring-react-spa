import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./configureStore";
import Main from "./main";

const history = createBrowserHistory();
const store = configureStore(history, (window as any).initialReduxState);

ReactDOM.render(
  <Main store={store} history={history} />,
  document.getElementById("root"),
);
