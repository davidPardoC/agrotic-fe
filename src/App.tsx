import React, { useContext } from "react";
import "./App.css";
import { Login } from "./views/login/login";
import { HashRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { Register } from "./views/register/register";
import { Home } from "./views/home/home";
import { PrivateRoute } from "./navigators/private-route";
function App() {
  return (
    <HashRouter>
        <Switch>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <PrivateRoute path='/home'>
            <Home/>
          </PrivateRoute>
          <Route path='*'>
            <Redirect to='/home'/>
          </Route>
        </Switch>
    </HashRouter>
  );
}

export default App;
