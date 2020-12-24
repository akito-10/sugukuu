import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MapGuide from "./components/MapGuide";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/map" component={MapGuide} />
          </Switch>
        </>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
