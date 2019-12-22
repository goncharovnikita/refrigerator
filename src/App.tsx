import React, { useCallback } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./auth/Login";
import Authenticated from "./common/Authenticated";
import Home from "./home/Home";
import Header from "./header/Header";
import { RefrigeratorComponent } from "./refrigerators";

const App: React.FC = () => {
  const renderLogin = useCallback(
    p => (
      <Authenticated only="unauthenticated" redirect="/home">
        <Login {...p} />
      </Authenticated>
    ),
    []
  );

  const renderRefrigerator = useCallback(
    p => (
      <Authenticated redirect="/login">
        <RefrigeratorComponent {...p} />
      </Authenticated>
    ),
    []
  );

  const renderHome = useCallback(
    p => (
      <Authenticated redirect="/login">
        <Home {...p} />
      </Authenticated>
    ),
    []
  );

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" render={renderLogin} />
        <Route path="/home/r/:refId" render={renderRefrigerator} />
        <Route path="/home" render={renderHome} />
        <Route>
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
