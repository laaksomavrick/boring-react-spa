import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import Routes from "./routes";
import { ApplicationState } from "./store";

// tslint:disable-next-line
interface PropsFromState {
  // theme: ThemeColors
}

interface PropsFromDispatch {
  [key: string]: any;
}

// Any additional component props go here.
interface OwnProps {
  store: Store<ApplicationState>;
  history: History;
}

type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

class Main extends Component<AllProps> {
  public render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {/* <ThemeProvider theme={themes[theme]}> */}
          <Routes />
          {/* </ThemeProvider> */}
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Main;

// const mapStateToProps = ({ layout }: ApplicationState) => ({
//     theme: layout.theme
// })

// export default connect<PropsFromState, PropsFromDispatch, OwnProps, ApplicationState>(
//     mapStateToProps
// )(Main)
