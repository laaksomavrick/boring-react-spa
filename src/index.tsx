import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { App } from "./app";
import { appReducer } from "./app/app.reducer";

export const store = createStore(
  appReducer,
  applyMiddleware(thunkMiddleware, createLogger()),
);

const theme = createMuiTheme();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root"),
);
