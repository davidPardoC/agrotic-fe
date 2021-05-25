import React, { useContext } from "react";
import "./App.css";
import { Login } from "./views/login/login";
import { HashRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { Register } from "./views/register/register";
import { Home } from "./views/home/home";
function App() {
  const { token } = useContext(AuthContext);
  return (
    <HashRouter>
      {!token ? (
        <Switch>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path='*'>
            <Redirect to="/signin" />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path='/home'>
            <Home/>
          </Route>
          <Route path='*'>
            <Redirect to="/home" />
          </Route>
        </Switch>
      )}
    </HashRouter>
  );
}

export default App;
