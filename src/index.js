import React from "react";
import ReactDOM from "react-dom";
import store from "../src/store";
import { Provider } from "react-redux";
import App from "../src/components/App";
import { Router } from "react-router-dom";
import history from "./history";

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
